#! /bin/bash
#
# dc-help.sh
#
# Usage: ./dc-help.sh [action]
#
# Script to help in container management (create / start / stop / delete / etc.)
# image(s).
#
# Available parameters:
#   - assert_docker_installed
#   - generate_yml
#   - create
#   - delete
#   - start
#   - stop
#   - status
#   - connect

set -o pipefail

IMAGE_TAG=":nightly"  # TODO should be replaced by latest asap (i.e. update latest to be stable)
PROJECT_NAME="osc-erbah"
CONTAINER_NAME="${PROJECT_NAME//-/_}"
CONTAINER_NETWORK_NAME="${CONTAINER_NAME}_net"
CONTAINER_WEB_NAME="${CONTAINER_NAME}_web"
CONTAINER_DB_NAME="${CONTAINER_NAME}_db"
BASE_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )/../" && pwd )"
SQL_FILE_VERSION=3
ROOT_PASSWORD=test


function assert_docker_available {
    echo -e "\n\e[36m - docker version\e[0m"
    if ! [ -x "$(command -v docker)" ];
    then
        echo -e "\e[31m   Need to install docker for running Tina 3 Manager tests\e[0m\n"
        yum install -y docker
        pip install docker-compose
    fi
    docker version
    docker-compose version
}

function find_port {
    port=$1
    threshold=$2
    rslt=0
    while [ $rslt -ne 1 ]
    do
        ((port++))
        if [ $port -eq $threshold ]
        then
            echo "Maximum iteration reached - unable to find a valid port"
            exit 1
        fi
        # lsof return 1 if the given port is used
        lsof -Pi :$port -sTCP:LISTEN &> /dev/null
        rslt=$?
    done
    echo $port
}

function generate_yml {
    echo "Find available ports..."
    #port_back_web="$(find_port 9000 9999)"
    port_back_web=80
    port_db="$(find_port 3000 3999)"

    echo "Find an available network..."
    chosen_ip=0
    threshold=100
    rslt=0
    USED_SUBNETS=$(docker network inspect $(docker network ls -q) --format '{{ .IPAM.Config }}')
    while [ $rslt -ne 1 ]
    do
        ((chosen_ip++))
        if [ $chosen_ip -eq $threshold ]
        then
            echo "Maximum iteration reached - unable to find a valid IP"
            exit 1
        fi
        subnet_ip=10.$chosen_ip.0.0
        gateway_ip=10.$chosen_ip.0.1
        # grep returns 1 if pattern not found
        echo "$USED_SUBNETS" | grep "$subnet_ip" &> /dev/null
        rslt=$?
    done

    echo "Generating /tmp/${PROJECT_NAME}-compose.yml"
    cat > /tmp/${PROJECT_NAME}-compose.yml << EOF
version: '2.2'

services:
    ${CONTAINER_WEB_NAME}:
        image: fahedouch/erbah:latest
        container_name: ${CONTAINER_WEB_NAME}
        privileged: true
        tty: true
        networks:
          - ${CONTAINER_NETWORK_NAME}
        ports:
          - "$port_back_web:9000"
        volumes:
          - ${BASE_PATH}:/home/ux/dev

    ${CONTAINER_DB_NAME}:
        image: mariadb
        container_name: ${CONTAINER_DB_NAME}
        privileged: true
        tty: true
        networks:
          - ${CONTAINER_NETWORK_NAME}
        ports: ["$port_db:3306"]
        environment:
          - MYSQL_ROOT_PASSWORD=${ROOT_PASSWORD}
        volumes:
          - ${BASE_PATH}:/home/ux/dev

networks:
    ${CONTAINER_NETWORK_NAME}:
        driver: bridge
        enable_ipv6: true
        driver_opts:
            com.docker.network.enable_ipv4: "true"
        ipam:
            driver: default
            config:
              - subnet: $subnet_ip/16
                gateway: $gateway_ip
              - subnet: 2001:3984:3989::/64
                gateway: 2001:3984:3989::1
EOF
}

function setup_db {
    db_ip=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ${CONTAINER_DB_NAME})
    if [ "$db_ip" != "" ]
    then
        schema_file="/home/ux/dev/scripts/schema.sql"
        data_file="/home/ux/dev/scripts/data.sql"
        conf_file="/home/ux/dev/conf/application.conf"

        echo "Make sur the database is running and reachable..."
        docker exec -t ${CONTAINER_WEB_NAME} bash -c "sed -i 's/jdbc:mysql:\/\/.*\/erbah/jdbc:mysql:\/\/$db_ip:3306\/erbah/' $conf_file"
        up=1
        loops=0
        while [ $up -ne 0 ]
        do
            ((loops++))
            if [ $loops -gt 120 ]
            then
                echo -e "\n\e[31m   Unable to reach the database.\e[0m"
                exit 1
            fi
            echo "Create database..."
            docker exec -t ${CONTAINER_WEB_NAME} bash -c "mysql -u root -h $db_ip -p${ROOT_PASSWORD} -e 'CREATE DATABASE erbah'"
            docker exec -t ${CONTAINER_WEB_NAME} bash -c "echo 'STATUS;' | mysql -u root -p${ROOT_PASSWORD} -h $db_ip -D erbah" | grep  "Server version"
            up=$?
        done
        CREATE DATABASE menagerie;
        echo "Fill the database with the tables..."
        docker exec -t ${CONTAINER_WEB_NAME} bash -c "mysql -u root -h $db_ip -p${ROOT_PASSWORD} -D erbah < $schema_file"
        echo "Fill the database with the data..."
        docker exec -t ${CONTAINER_WEB_NAME} bash -c "mysql -u root -h $db_ip -p${ROOT_PASSWORD} -D erbah < $data_file"
        echo "...done"
    else
        echo -e "\n\e[31m   Unable to reach the MariaDB container... Unable to set up the database.\e[0m"
        exit 1
    fi
}

function create {
    generate_yml
    docker-compose -f /tmp/${PROJECT_NAME}-compose.yml pull
    docker-compose -f /tmp/${PROJECT_NAME}-compose.yml create --force-recreate
    ret=$?
    if [ $ret -ne 0 ]
    then
        echo "Unable to create the container due to Docker error. Please see above for more information"
        exit $ret
    fi
    docker-compose -f /tmp/${PROJECT_NAME}-compose.yml up &
    start_pid=$!
    loops=0
    while $(sleep 1)
    do
        ((loops++))
        if [ $loops -gt 120 ]
        then
            echo -e "\n\e[31m   Unable to reach the containers\e[0m"
            exit 1
        fi
        start_status=$(docker ps -a --format "{{.Names}} {{.Status}}" | \
            grep ${CONTAINER_WEB_NAME} | awk '{ print tolower($2) }')
        if [ $start_status = "up" ]
        then
            fmt="Container {{.Names}} ({{.Image}}) created since {{.CreatedAt}} is {{.Status}} on {{.Ports}}"
            docker ps -a --format "$fmt" | grep ${CONTAINER_NAME}
            setup_db
            db_ip=$(docker exec -t ${CONTAINER_WEB_NAME} ifconfig | grep "inet 10." | awk '{ print $2; }')
            web_ip=$(docker exec -t ${CONTAINER_WEB_NAME} ifconfig | grep "inet 10." | awk '{ print $2; }')
            echo "The web container ip is $web_ip. The DB container ip is $db_ip."
            echo ""
            echo "You can use the web container as follow:"
            echo "  docker start ${CONTAINER_WEB_NAME} (to start the container)"
            echo "  docker stop ${CONTAINER_WEB_NAME} (to stop the container)"
            echo "  docker exec -ti ${CONTAINER_WEB_NAME} su ux (to connect to the container)"
            echo ""
            echo "You can use the db container as follow:"
            echo "  docker start ${CONTAINER_DB_NAME} (to start the container)"
            echo "  docker stop ${CONTAINER_DB_NAME} (to stop the container)"
            echo "  docker exec -ti ${CONTAINER_DB_NAME} bash (to connect to the container)"
            sleep 1
            break
        fi
    done
}

function delete {
    echo "Delete containers..."
    docker rm ${CONTAINER_WEB_NAME} ${CONTAINER_DB_NAME} ${CONTAINER_GTW_NAME}
    echo "Delete network..."
    docker network rm tmp_${CONTAINER_NETWORK_NAME}
}

function start {
    docker start ${CONTAINER_WEB_NAME} ${CONTAINER_DB_NAME} ${CONTAINER_GTW_NAME}
}

function stop {
    echo "Stop containers..."
    docker stop ${CONTAINER_WEB_NAME} ${CONTAINER_DB_NAME} ${CONTAINER_GTW_NAME}
}

function status {
    fmt="Container {{.Names}} ({{.Image}}) created since {{.CreatedAt}} is {{.Status}} on {{.Ports}}"
    for c in "${CONTAINER_WEB_NAME}" "${CONTAINER_DB_NAME}" "${CONTAINER_GTW_NAME}"
    do
        cstatus="$(docker ps -a --format "$fmt" | grep $c)"
        ret="$?"
        if [ $ret -gt 0 ]
        then
            echo "Container $c not found."
        else
            cip="$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $c)"
            echo "$cstatus with IP $cip"
        fi
    done
}

function get_ip {
    if [ "$1" = "" ]
    then
        for c in "${CONTAINER_WEB_NAME}" "${CONTAINER_DB_NAME}" "${CONTAINER_GTW_NAME}"
        do
            cip="$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $c)"
            echo "$c: $cip"
        done
    else
        c=$1
        cip="$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $c)"
        echo "$c: $cip"
    fi
}

function setup_sonar_properties {
    conf_path="${BASE_PATH}/sonar-project.properties"
    branch="develop"
    if [ "$1" != "" ]
    then
        branch="$1"
    fi
    sed -i "s#sonar\.branch=[a-z0-9./_]*#sonar.branch=$branch#g" $conf_path
    sed -i "s#sonar\.projectVersion=[a-z0-9./_]*#sonar.projectVersion=$(version)#g" $conf_path
}

function setup_conf {
    conf_path="${BASE_PATH}/conf/application.conf"
    #cip="$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ${CONTAINER_DB_NAME})"
    #echo "Setup database ip in conf: $cip"
    #sed -i "s#db.default.url.*=.*\"jdbc:mysql://.*:3306#db.default.url = \"jdbc:mysql://${cip}:3306#g" $conf_path

    cip="$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ${CONTAINER_GTW_NAME})"
    echo "Setup gateway ip in conf: $cip"
    sed -i "s#gateway.host.*=.*\"http://.*:14695#gateway.host = \"http://${cip}:14695#g" $conf_path
}

function connect {
    if [ "$1" != "" ]
    then
        container="$1"
    else
        container="${CONTAINER_WEB_NAME}"
    fi
    docker exec -ti ${container} su ux
}

function exec {
    docker exec -i ${CONTAINER_WEB_NAME} runuser -l ux -c "$@"
}

function version {
    (
        cd $BASE_PATH/
        echo "$(grep "version" build.sbt | cut -d'"' -f2)"
    )
}

function release {
    (
        cd $BASE_PATH/
        release="$(git tag | grep $(version))"
        if [ "$release" = "" ]
        then
            echo 0
        else
            release=$(echo "$release" | cut -d'.' -f4)
            #let "release=$release+1"
            echo "$release"
        fi
    )
}

function publish {
    (
        cd $BASE_PATH/
        VERSION=$(version)
        RELEASE=$(release)
        PROJECT_NAME="osc-erbah"
    )
}

action=$1
shift
$action "$@"

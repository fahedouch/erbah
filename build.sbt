name := "erbah"

version := "0.1.0"


lazy val root = (project in file(".")).enablePlugins(PlayJava,PlayEbean)


libraryDependencies ++= Seq(guice,
			    javaJdbc,
	         	evolutions,
			     ws,
			    "org.mockito" % "mockito-core" % "1.10.19",
			    "org.apache.httpcomponents"%"httpclient"%"4.5.4",
			    "org.json" % "json" % "20171018",
			    "org.scala-lang" % "scala-library" % "2.12.4",
			    "mysql" % "mysql-connector-java" % "5.1.41",
	        "com.auth0" % "java-jwt" % "3.3.0")
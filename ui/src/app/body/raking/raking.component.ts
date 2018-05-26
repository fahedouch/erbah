import {Component, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatTableDataSource , MatPaginatorIntl } from "@angular/material";
import {DataService} from "../../services/data.service";
import  {Tournement} from "../../models";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {UserTournement} from "../../models/user-tournement";


@Component({
  selector: 'app-raking',
  templateUrl: './raking.component.html',
  styleUrls: []
})
export class RakingComponent extends MatPaginatorIntl implements AfterViewInit , OnInit   {

  userTournement : UserTournement;
  tournaments : Tournement[];
  listUser = new BehaviorSubject<UserTournement[]>([this.userTournement]);
  dataSource: any;
  displayedColumns = ['userName', 'userPoint', 'userNull','userVictory','user_defeat','userGoalScored','userAcceptedGoal','userDifference','userGoalByMatch'];

  // TODO integrate paginator label in traduction system ng translate
  itemsPerPageLabel = "nombre ditem par page";
  nextPageLabel     = 'page suivante';
  previousPageLabel = 'Page precedente';
  lastPageLabel     = 'dernière page';
  firstPageLabel    = 'première page';


  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private dataService: DataService) {
    super();
  }



  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /**
   * load User Tournaments By Tournament Id
   * @returns {any}
   */
  loadUserTournamentsTournamentById(id) : any {
    this.dataService.get('/api/UserTournamentsTournament/'+id).subscribe((data) => {
      this.listUser.next(data);
      this.listUser.subscribe( res => {
        this.dataSource = new MatTableDataSource<UserTournement>(res);
        this.dataSource.paginator = this.paginator;
        this.paginator._changePageSize(this.paginator.pageSize);
      });
    }, (err) => {
      return false;
    }, () => {
      return true;
    });
  }

  /**
   * load Tournement list ( the last 2 tournement)
   * @returns {any}
   */
  loadTournement() : any {
    this.dataService.get('/api/Tournament').subscribe((data) => {
      this.tournaments = data;
    }, (err) => {
      return false;
    }, () => {
      return true;
    });
  }


  ngOnInit() {}

  ngAfterViewInit() {

    this.loadUserTournamentsTournamentById(1);
    this.loadTournement();

  }
}





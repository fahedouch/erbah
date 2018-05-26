import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl, MatTableDataSource} from "@angular/material";
import {DataService} from "../../services/data.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Footmatch, User} from "../../models";
import {UserFootmatch} from "../../models/user-footmatch";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: []
})
export class MatchComponent extends MatPaginatorIntl implements AfterViewInit   {

  displayedColumns = ['Player1', 'Result', 'Player2'];
  dataSource : any;
  footmatch : Footmatch;
  userFootmatch : UserFootmatch;
  user : User;

  element : Element = {Player1 : null , Player1Goal: null, Player2Goal : null ,Player2 : null} ;
  ELEMENT_DATA: Element[] = [this.element] ;

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

  ngAfterViewInit() {
    this.loadMatchsTournamentById(1);
    this.loadTournement();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  selected = 'Cycle10 / 04.11.2015 - 04.12.2015';
  tournaments = [
    {value: 'tournoi1', viewValue: 'Cycle10 / 04.11.2015 - 04.12.2015'}
  ];


  /**
   * load Match Tournaments By Tournament Id
   * @returns {any}
   */
  loadMatchsTournamentById(id) : any {
    this.ELEMENT_DATA = [];
    var listMatch = new BehaviorSubject<Footmatch[]>([this.footmatch]);
    var listUserMatch : [UserFootmatch[]] = [[this.userFootmatch]];
    this.dataService.get('/api/MatchTournament/' + id).subscribe((data) => {
      listMatch.next(data);
      listMatch.subscribe(res => {
      res.map(x => listUserMatch.push(x.userFootmatches));
        for (var j = 1 ; j < listUserMatch.length ; j++ ) {
          this.ELEMENT_DATA.push({Player1 : listUserMatch[j][0].user.userName , Player1Goal : listUserMatch[j][0].userGoal ,Player2 : listUserMatch[j][1].user.userName
          , Player2Goal : listUserMatch[j][1].userGoal});
        }
    });
      this.dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.paginator._changePageSize(this.paginator.pageSize);
  }, (err) => {
      return false;
    }, () => {
      return true;
    });
  }

  /**
   * load Tournement list ( the last  tournement)
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

}

interface Element {
  Player1: string;
  Player1Goal : number;
  Player2: string;
  Player2Goal : number;
}




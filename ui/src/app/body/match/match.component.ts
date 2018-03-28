import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: []
})
export class MatchComponent extends MatPaginatorIntl implements AfterViewInit {

  displayedColumns = ['Player1', 'Result', 'Player2'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  // TODO integrate paginator label in traduction system ng translate
  itemsPerPageLabel = "nombre ditem par page";
  nextPageLabel     = 'page suivante';
  previousPageLabel = 'Page precedente';
  lastPageLabel     = 'dernière page';
  firstPageLabel    = 'première page';


  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() {
    super();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

}

export interface Element {
  Player1: string;
  Player1Goal: number;
  Player2Goal: number;
  Player2: string;

}

const ELEMENT_DATA: Element[] = [
  {Player1: 'samir',  Player1Goal: 1, Player2Goal : 2 , Player2 :'fahed' },
  {Player1: 'kahled', Player1Goal: 1, Player2Goal : 1 , Player2 :'fahed' },
  {Player1: 'samir',  Player1Goal: 0, Player2Goal : 4 , Player2 :'khamed' },
  {Player1: 'amir',   Player1Goal: 0, Player2Goal : 4 , Player2 :'khaled' },
  {Player1: 'samir',  Player1Goal: 0, Player2Goal : 1 , Player2 :'amir' },
  {Player1: 'samir',  Player1Goal: 0, Player2Goal : 3 , Player2 :'amir' },

];



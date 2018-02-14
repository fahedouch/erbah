import {Component, AfterViewInit, ViewChild, } from '@angular/core';
import {MatPaginator, MatTableDataSource , MatPaginatorIntl } from "@angular/material";


@Component({
  selector: 'app-raking',
  templateUrl: './raking.component.html',
  styleUrls: []
})
export class RakingComponent extends MatPaginatorIntl implements AfterViewInit   {

  displayedColumns = ['raking', 'P', 'J', 'V','N','D','BP','BC','DF','P_pourcent'];
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
    {value: 'tournoi1', viewValue: 'Cycle10 / 04.11.2015 - 04.12.2015'},
    {value: 'tournoi2', viewValue: 'Cycle11 / 04.11.2015 - 04.12.2015'},
    {value: 'tournoi3', viewValue: 'Cycle12 / 04.11.2015 - 04.12.2015'}
  ];

}

export interface Element {
  raking: string;
  P: number;
  J: number;
  V: number;
  N: number;
  D: number;
  BP: number;
  BC : number;
  DF : number;
  P_pourcent: any;
}

const ELEMENT_DATA: Element[] = [
  {raking: 'samir', P: 5, J :2 , V: 3, N: 4 , D: 5, BP: 1 , BC : 4 , DF : 8 , P_pourcent :4.6  },
  {raking: 'adin', P: 7 , J :2 , V: 3, N: 4 , D: 5, BP: 1 , BC : 4 , DF : 8 , P_pourcent :4.6  },
  {raking: 'aude', P: 4, J :2 , V: 3, N: 4 , D: 5, BP: 1 , BC : 4 , DF : 8 , P_pourcent :4.6  },
  {raking: 'toto', P: 8, J :2 , V: 3, N: 4 , D: 5, BP: 1 , BC : 4 , DF : 8 , P_pourcent :4.6  },
  {raking: 'titi', P: 9, J :2 , V: 3, N: 4 , D: 5, BP: 1 , BC : 4 , DF : 8 , P_pourcent :4.6  },
  {raking: 'cresto', P: 23, J :2 , V: 3, N: 4 , D: 5, BP: 1 , BC : 4 , DF : 8 , P_pourcent :4.6  },
  {raking: 'alem', P: 0, J :2 , V: 3, N: 4 , D: 5, BP: 1 , BC : 4 , DF : 8 , P_pourcent :4.6  },
  {raking: 'ahmed', P: 6, J :2 , V: 3, N: 4 , D: 5, BP: 1 , BC : 4 , DF : 8 , P_pourcent :4.6  },

];



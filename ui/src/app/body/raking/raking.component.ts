import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource } from "@angular/material";

@Component({
  selector: 'app-raking',
  templateUrl: './raking.component.html',
  styleUrls: ['./raking.component.scss']
})
export class RakingComponent  {

  displayedColumns = ['classement', 'P', 'J', 'V','N','D','PD'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}

export interface Element {
  classement: string;
  P: string;
  J: string;
  V: string;
  N: string;
  D: string;
  PD: number;
}

const ELEMENT_DATA: Element[] = [
  {classement: 'samir', P: 'Hydrogen', J :'', V:'', N:'', D:'', PD: 1.0079},
{classement: 'ahmed', P: 'Hydrogen', J :'', V:'', N:'', D:'', PD: 1.0079},
{classement: 'karim', P: 'Hydrogen', J :'', V:'', N:'', D:'', PD: 1.0079},
{classement: 'aude', P: 'Hydrogen', J :'', V:'', N:'', D:'', PD : 1.0079},
{classement: 'alain', P: 'Hydrogen', J :'', V:'', N:'', D:'', PD: 1.0079},
{classement: 'tot', P: 'Hydrogen', J :'', V:'', N:'', D:'', PD : 1.0079},
{classement: 'tito', P: 'Hydrogen', J :'', V:'', N:'', D:'', PD : 1.0079},
{classement: 'iram', P: 'Hydrogen', J :'', V:'', N:'', D:'', PD : 1.0079},

];



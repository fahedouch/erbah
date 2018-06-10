import { Component , ViewEncapsulation,OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DataService} from "./services/";
import {MemoryService} from "./services";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None


})
export class AppComponent implements OnInit{

  constructor(private translate: TranslateService,
              private dataService: DataService,
              private memoryService : MemoryService ) {
    translate.setDefaultLang('en');
    translate.use('fr');
  }

  title = 'app';

  ngOnInit(){
    this.dataService.getCSRFToken('/api/CSRFToken/').subscribe((token) => {
      this.memoryService.getCSRFtoken().next(token);
    });
  }

}

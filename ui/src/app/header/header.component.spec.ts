import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {AuthenticationService,DataService,MemoryService} from '../services/index' ;
import { HeaderComponent } from './header.component';
import { MaterialModule } from '../material.module';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../app.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports : [MatDialogModule,MaterialModule,BrowserAnimationsModule,HttpClientModule,TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })],
      providers :[MatDialog,{provide: MatDialogRef, useValue: null},AuthenticationService,DataService,MemoryService],
      schemas : [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

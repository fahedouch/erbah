import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { RakingComponent } from './raking.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../../app.module";
import {HttpClient, HttpClientModule} from "@angular/common/http";

describe('RakingComponent', () => {
  let component: RakingComponent;
  let fixture: ComponentFixture<RakingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RakingComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports:[MaterialModule,BrowserAnimationsModule,HttpClientModule,TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

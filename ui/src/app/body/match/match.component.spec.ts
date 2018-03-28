import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatchComponent } from './match.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpLoaderFactory} from "../../app.module";
import {MaterialModule} from "../../material.module";

describe('MatchComponent', () => {
  let component: MatchComponent;
  let fixture: ComponentFixture<MatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchComponent ],
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
    fixture = TestBed.createComponent(MatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

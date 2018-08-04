import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesComponent } from './rules.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpLoaderFactory} from "../app.module";
import {MatDialogModule} from "@angular/material";
import {MaterialModule} from "../material.module";
import {FormsModule} from "@angular/forms";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('RulesComponent', () => {
  let component: RulesComponent;
  let fixture: ComponentFixture<RulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulesComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports :[BrowserAnimationsModule,HttpClientModule,MatDialogModule,MaterialModule,FormsModule,TranslateModule.forRoot({
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
    fixture = TestBed.createComponent(RulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

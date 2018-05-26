import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesDialogComponent } from './rules-dialog.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpLoaderFactory} from "../../app.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDialogModule,MAT_DIALOG_DATA} from "@angular/material";
import {MaterialModule} from "../../material.module";
import {RulesComponent} from "../rules.component";
import {FormsModule} from "@angular/forms";

describe('RulesDialogComponent', () => {
  let component: RulesDialogComponent;
  let fixture: ComponentFixture<RulesDialogComponent>;
  let topic = "topic";

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulesDialogComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers :[{provide: MAT_DIALOG_DATA, useValue: {name: topic}}],
      imports: [FormsModule,BrowserAnimationsModule,HttpClientModule,MatDialogModule,MaterialModule,TranslateModule.forRoot({
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
    fixture = TestBed.createComponent(RulesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

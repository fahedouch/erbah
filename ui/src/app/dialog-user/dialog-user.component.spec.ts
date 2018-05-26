import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogUserComponent } from './dialog-user.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {SocketService} from "../chat/shared/services/socket.service";
import {CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from "@angular/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpLoaderFactory} from "../app.module";
import {MaterialModule} from "../material.module";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {AuthenticationService} from "../services/index";
import {DataService} from "../services/index";

describe('DialogUserComponent', () => {
  let component: DialogUserComponent;
  let fixture: ComponentFixture<DialogUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUserComponent ],
      providers: [DataService,AuthenticationService,SocketService,MatDialog,{provide: MatDialogRef, useValue: {username: "toto",
          dialogType: "toto",
          previousUsername: "toto"}},
        {provide: MAT_DIALOG_DATA, useValue: {}}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
      imports :[ReactiveFormsModule,BrowserAnimationsModule,HttpClientModule,MatDialogModule,MaterialModule,FormsModule,TranslateModule.forRoot({
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
    fixture = TestBed.createComponent(DialogUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ChatComponent } from './chat.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpLoaderFactory} from "../../app.module";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {SocketService} from "./shared/services/socket.service";
import {MatDialog, MatDialogModule} from "@angular/material";
import {MaterialModule} from "../../material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatComponent ],
      providers: [SocketService,MatDialog],
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
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

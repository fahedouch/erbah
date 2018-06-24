import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RakingComponent } from './body/raking/raking.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { MatButtonModule,
  MatChipsModule,
  MatDialogModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatGridListModule,
  MatTableModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSelectModule,
  MatTabsModule,
  MatTooltipModule,
  MatToolbarModule,
  MatCardModule} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatPaginatorIntl } from "@angular/material";
import { MatchComponent } from './body/match/match.component';
import {DataService} from './services/data.service';
import "reflect-metadata";
import { RulesComponent } from './rules/rules.component';
import { RulesDialogComponent } from './rules/rules-dialog/rules-dialog.component';
import { ChatModule } from './chat/chat.module';
import {DialogUserComponent} from "./dialog-user/dialog-user.component";
import {AuthenticationService} from "./services/authentication.service";
import { MemoryService } from './services';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [

    AppComponent,
    RakingComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    MatchComponent,
    RulesComponent,
    RulesDialogComponent,
    DialogUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatChipsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule,
    MatToolbarModule,
    MatTableModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatCardModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ChatModule

  ],
  entryComponents: [RulesDialogComponent,DialogUserComponent],
  providers: [{ provide: MatPaginatorIntl, useClass: RakingComponent},DataService,AuthenticationService, MemoryService],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

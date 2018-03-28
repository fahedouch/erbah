import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

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
  MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatPaginatorIntl } from "@angular/material";
import { MatchComponent } from './body/match/match.component';
import {DataService} from './services/data.service';
import "reflect-metadata";


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
    MatchComponent
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
    HttpClientModule,
    MatPaginatorModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  providers: [{ provide: MatPaginatorIntl, useClass: RakingComponent},DataService],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

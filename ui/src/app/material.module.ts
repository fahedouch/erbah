import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule,MatFormFieldModule, MatTableModule, MatMenuModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatFormFieldModule , MatTableModule, MatMenuModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule],
  exports: [MatButtonModule, MatFormFieldModule , MatTableModule, MatMenuModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})

export class MaterialModule { }

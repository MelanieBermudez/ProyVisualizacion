import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxArcTextModule } from 'ngx-arc-text';
import { HttpClientModule } from '@angular/common/http'
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PrincipalComponent } from './principal/principal.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import { TitleDialogComponent } from './title-dialog/title-dialog.component';

import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';





@NgModule({
  declarations: [
    AppComponent,
    PeliculaComponent,
    PrincipalComponent,
    TitleDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatExpansionModule,
    MatInputModule,
    NgxArcTextModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatButtonToggleModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    NgxChartsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TitleDialogComponent]
})
export class AppModule { }

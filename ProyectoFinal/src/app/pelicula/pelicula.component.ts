import { Component, OnInit, ViewChild, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INgxArcTextComponent } from 'ngx-arc-text';
import { MatSlideToggleChange } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as echarts from 'echarts';
import { EChartOption } from 'echarts';

const single = [
  {
    "name": "Germany",
    "value": 8940000
  },
  {
    "name": "USA",
    "value": 5000000
  },
  {
    "name": "France",
    "value": 7200000
  },
  {
    "name": "UK",
    "value": 6200000
  }
];

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']

})


export class PeliculaComponent implements OnInit {
  options: Observable<any>;

  titulo = 'Estadisticas Generales'
  grafo: boolean
  grafico = false;

  single: any[];
  view: any[] = [700, 400];

  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';



  constructor(
    private http: HttpClient

  ) {
    // Object.assign(this, { single });

  }





  @ViewChild('letters', { static: true })
  letters: INgxArcTextComponent;


  ngAfterViewInit() {
    this.letters.text = 'Universo Netflix';
    this.letters.arc = 700;

  }



  ngOnInit() { }




}


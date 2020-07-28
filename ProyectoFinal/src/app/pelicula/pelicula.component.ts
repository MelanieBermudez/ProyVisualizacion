
import { Component, OnInit, ViewChild, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INgxArcTextComponent } from 'ngx-arc-text';
import { MatSlideToggleChange } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import { Router } from '@angular/router';

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

  constructor(
    private http: HttpClient,
    private router: Router,


  ) { }


  @ViewChild('letters', { static: true })
  letters: INgxArcTextComponent;


  ngAfterViewInit() {
    this.letters.text = 'Universo Netflix';
    this.letters.arc = 700;

  }

  toggle(event: MatSlideToggleChange) {
    this.grafo = event.checked;

  }

  onPelicula() {
    sessionStorage.setItem('tipo', 'pelicula');
    console.log(sessionStorage.getItem('tipo'))
    this.router.navigate(['peliculas']);
  }
  onSerie() {
    sessionStorage.setItem('tipo', 'serie');
    console.log(sessionStorage.getItem('tipo'))
    this.router.navigate(['peliculas']);

  }
  onPrincipal() {
    this.router.navigate(['principal']);
  }


  ngOnInit() {

  }


  OnGraph(): void {

    console.log(sessionStorage.getItem('tipo'))
    this.options = this.http
      .get<any>('./assets/data.json', { responseType: 'json' })
      .pipe(
        map((data) => {
          echarts.util.each(
            data.children,
            (datum, index) => index % 2 === 0 && (datum.collapsed = true),
          );
          return {
            tooltip: {
              trigger: 'item',
              triggerOn: 'mousemove',
            },
            series: [
              {
                type: 'tree',
                data: [data],
                top: '1%',
                left: '7%',
                bottom: '1%',
                right: '20%',
                symbolSize: 7,
                label: {
                  position: 'left',
                  verticalAlign: 'middle',
                  align: 'right',
                  fontSize: 9,
                },
                leaves: {
                  label: {
                    position: 'right',
                    verticalAlign: 'middle',
                    align: 'left',
                  },
                },
                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750,
              },
            ],
          };
        }),
      );
  }



}




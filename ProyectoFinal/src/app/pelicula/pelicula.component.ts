
import { Component, OnInit, ViewChild, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INgxArcTextComponent } from 'ngx-arc-text';
import { MatSlideToggleChange } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition, } from '@angular/animations';
import { ConnectedPositionStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('1000ms', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('1000ms', style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ]
    ),
    trigger(
      'enterAnimationx', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('1000ms', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ]
    ),
  ]

})
export class PeliculaComponent implements OnInit {

  options: Observable<any>;
  options1: Observable<any>;
  tipo= '';
  titulo = 'Estadisticas Generales'
  grafo: boolean
  grafico = false;
  categorias = ['Comedia', 'Drama'];
  paises = ['USA', 'Italia'];
  directores = ['Tarantino', 'Juan'];
  

  colorScheme = {
    domain: ['#060529', '#B10606']
  };

  view: any[] = [800, 400];
  gradient: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = true;

  opcionesFormGroup = new FormGroup(
    {
      categoria: new FormControl(null),
      pais: new FormControl(null),
    }
  );
  filtrosFormGroup = new FormGroup(
    {
      fechainicio: new FormControl(null),
      fechafinal: new FormControl(null),
      duracion: new FormControl(null),
      director: new FormControl(null),
    }
  );



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
  OnGraph(){
    this.leftToRigth();
    this.Radial();
  }

  single = [
    {
      "name": "Series",
      "value": 1240
    },
    {
      "name": "Peliculas",
      "value": 2000
    },

  ];

  onSelect(data): void {
    // if (data.name == 'Peliculas')
    //   sessionStorage.setItem('tipo', 'pelicula');

    // else
    //   sessionStorage.setItem('tipo', 'serie');

    // this.router.navigate(['peliculas']);

  }
  leftToRigth(): void {

    let categoria = this.opcionesFormGroup.get('categoria').value;
    let pais = this.opcionesFormGroup.get('pais').value;
    // let director = this.opcionesFormGroup.get('director').value;
    // // let duracion = this.opcionesFormGroup.get('duracion').value;
    // let fechainicio = this.opcionesFormGroup.get('fechainicio').value;
    // let fechafinal = this.opcionesFormGroup.get('fechafinal').value;

    // console.log(categoria,pais,director,fechafinal,fechainicio);

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
                layout: this.tipo,
              },
            ],
          };
        }),
      );

  }
  Radial(): void {

    let categoria = this.opcionesFormGroup.get('categoria').value;
    let pais = this.opcionesFormGroup.get('pais').value;

    this.options1 = this.http
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
                layout: 'radial',
              },
            ],
          };
        }),
      );

  }



}




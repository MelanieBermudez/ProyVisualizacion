
import { Component, OnInit, ViewChild, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INgxArcTextComponent } from 'ngx-arc-text';
import { MatSlideToggleChange } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
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
    // trigger(
    //   'enterAnimation', [
    //   transition(':enter', [
    //     style({  opacity: 0 }),
    //     animate('1000ms', style({  opacity: 1 }))
    //   ]),
    //   transition(':leave', [
    //     style({ opacity: 1 }),
    //     animate('400ms ease-out', style({ opacity: 0 }))
    //   ])
    // ]
    // ),
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
  status: boolean;
  tipo = 'peliculas';
  titulo = 'Estadisticas Generales'
  grafo: boolean
  grafico = false;
  categorias = ['Comedia', 'Drama'];
  paises = ['USA', 'Italia'];
  directores = ['Tarantino', 'Juan'];
  temporadas = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  duraciones = ['Menos de 30 min', '60 min', '90 min', 'Más de 90 min']
  categoria;
  pais;
  tituloG1;
  tituloG2;
  ratings=[]
  categories=[]

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
      actor: new FormControl(null),
      temporada: new FormControl(null),

    }
  );



  constructor(
    private http: HttpClient,
    private router: Router,
  ) 
  {
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };

  }


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
    sessionStorage.setItem('tipo', 'peliculas');
    this.router.navigate(['peliculas']);
  }
  onSerie() {
    sessionStorage.setItem('tipo', 'series');
    this.router.navigate(['peliculas']);

  }
  onPrincipal() {
    this.router.navigate(['principal']);
  }

  localStorage() {

    if (sessionStorage.getItem('tipo') === 'peliculas')
      return true
    else
      return false

  }

  ngOnInit() {
    this.categoria = sessionStorage.getItem('categoria');
    this.pais = sessionStorage.getItem('pais');

    this.titulo = `Grafico de ${this.categoria} en ${this.pais}`
    this.tituloG1 = `Cantidad de ${this.tipo} de ${this.categoria} en ${this.pais} por años`
    this.tituloG2 = `Cantidad de ${this.tipo} de ${this.categoria} en ${this.pais} por clasificación `

    this.status = this.localStorage();
    
    this.categories = [
      {
        "name": "Comedia",
        "value": 13
      },
      {
        "name": "Drama",
        "value": 44
      },
  
    ];
    this.ratings = [
      {
        "name": "TV7",
        "value": 12
      },
      {
        "name": "+18",
        "value": 56
      },
  
    ];
  }

  onGenerate() {
    this.categoria = this.opcionesFormGroup.get('categoria').value;
    this.pais = this.opcionesFormGroup.get('pais').value;
    this.tipo = sessionStorage.getItem('tipo')
    if (this.grafo == true) {
      this.titulo = `Grafo de ${this.pais}`
      this.leftToRigth();
      this.Radial();
    }
    else {
      this.titulo = `Grafico de ${this.categoria} en ${this.pais}`
      this.tituloG1 = `Cantidad de ${this.tipo} de ${this.categoria} en ${this.pais} por años`
      this.tituloG2 = `Cantidad de ${this.tipo} de ${this.categoria} en ${this.pais} por clasificación `


    }
  }

  onFilter() {
    let actor = this.filtrosFormGroup.get('actor').value;
    let inicio = this.filtrosFormGroup.get('fechainicio').value;
    let final = this.filtrosFormGroup.get('fechafinal').value;
    let duracion = this.filtrosFormGroup.get('duracion').value;
    let temporada = this.filtrosFormGroup.get('temporada').value;

    console.log(actor,inicio,final,duracion,temporada)
    

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





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
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({  opacity: 0 }),
        animate('1000ms', style({  opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('400ms ease-out', style({ opacity: 0 }))
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
  status: boolean;
  titulo = 'Estadisticas Generales'
  grafo: boolean
  grafico = false;
  categorias = ['Comedia', 'Dramas', 'Comedies'];
  paises = [];
  directores = ['Tarantino', 'Juan'];
  temporadas = ['1 Season', '2 Seasons', '3 Seasons', '4 Seasons', '5 Seasons', '6 Seasons', '7 Seasons', '8 Seasons', '9 Seasons']
  duraciones = ['Menos de 30 min', '60 min', '90 min', 'Más de 90 min']
  tituloG1;
  tituloG2;
  ratings=[]
  categories=[]
  
  tipo: string = 'Movie';
  categoria: string ='Spain';
  pais: string ='Comedies';
  duracion: string ='100';
  actor: string ='Brad Pitt';
  inicio=''
  final=''



  colorScheme = {
    domain: ['#060529', '#B10606']
  };

  view: any[] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Años';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad';
  showDataLabel = true;
  


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
 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

  }


  @ViewChild('letters', { static: true })
  letters: INgxArcTextComponent;


  // ngAfterViewInit() {
  //   this.letters.text = 'Universo Netflix';
  //   this.letters.arc = 700;

  // }

  toggle(event: MatSlideToggleChange) {
    this.grafo = event.checked;

  }

  onPelicula() {
    sessionStorage.setItem('tipo', 'Movie');
    this.router.navigate(['peliculas']);
  }
  onSerie() {
    sessionStorage.setItem('tipo', 'TV Show');
    console.log(sessionStorage.getItem('tipo'))
    this.router.navigate(['peliculas']);

  }
  onPrincipal() {
    this.router.navigate(['principal']);
  }

  localStorage() {

    if (sessionStorage.getItem('tipo') === 'Movie')
      return true
    else
      return false

  }

  ngOnInit() {
    this.status = this.localStorage();
    

    this.tipo= sessionStorage.getItem('tipo');
    this.http.post<any>('/router/ObtenerPaisesInit',{tipo:this.tipo}).subscribe(
      (respost) => {
        this.paises= respost[0];
      },
      );
    this.http.post<any>('/router/ObtenerCategoriasInit',{tipo:this.tipo}).subscribe(
      (respost) => {
        this.categorias= respost[0];
      },
      );
      
     this.graficar();
  }

  onGenerate() {
 
    this.tipo = sessionStorage.getItem('tipo')

    if (this.grafo == true) {
      this.titulo = `Grafo de ${this.pais}`
      this.leftToRigth();
      this.Radial();
    }
    else {

      this.categoria = this.opcionesFormGroup.get('categoria').value.categoria.toString();
      this.pais = this.opcionesFormGroup.get('pais').value.pais.toString();
      
      // this.actor = this.filtrosFormGroup.get('actor').value;
      // this.duracion = this.filtrosFormGroup.get('duracion').value;
      // this.inicio = this.filtrosFormGroup.get('fechainicio').value;
      // this.final = this.filtrosFormGroup.get('fechafinal').value;


      this.titulo = `Grafico de ${this.categoria} en ${this.pais}`
      this.tituloG1 = `Cantidad de ${this.tipo} de ${this.categoria} en ${this.pais} por años`
      this.tituloG2 = `Cantidad de ${this.tipo} de ${this.categoria} en ${this.pais} por clasificación `
      this.graficar();

    }
  }

  graficar(){


    const formData={
      tipo: this.tipo,
      categoria:this.categoria,
      pais:this.pais,
      duracion:this.duracion,
      actor:this.actor
      
    }
    
    console.log(formData);

    this.http.post<any>('/router/ObtenerYearFil',formData).subscribe(
      (respost) => {
        this.categories= respost[0];
        console.log("this.categories");
        console.log(this.categories);
      },
      );
      
      this.http.post<any>('/router/ObtenerClasificacionFil',formData).subscribe(
        (respost) => {
          this.ratings= respost[0]
          console.log("this.ratings");
          console.log(this.ratings);
        },
      );

      this.titulo = `Grafico de ${this.categoria} en ${this.pais}`
      this.tituloG1 = `Cantidad de ${this.tipo} de ${this.categoria} en ${this.pais} por años`
      this.tituloG2 = `Cantidad de ${this.tipo} de ${this.categoria} en ${this.pais} por clasificación `
  

  }
  onFilter() {
    // let actor = this.filtrosFormGroup.get('actor').value;
    // let inicio = this.filtrosFormGroup.get('fechainicio').value;
    // let final = this.filtrosFormGroup.get('fechafinal').value;
    // let duracion = this.filtrosFormGroup.get('duracion').value;
    // let temporada = this.filtrosFormGroup.get('temporada').value;

    // console.log(actor,inicio,final,duracion,temporada)
    

  }




  leftToRigth(): void {

    let categoria = this.opcionesFormGroup.get('categoria').value;
    let pais = this.opcionesFormGroup.get('pais').value;

    console.log(pais);

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




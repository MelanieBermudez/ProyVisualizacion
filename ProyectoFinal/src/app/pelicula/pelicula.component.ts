
import { Component, OnInit, ViewChild, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INgxArcTextComponent } from 'ngx-arc-text';
import { MatSlideToggleChange } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { map, retry, reduce } from 'rxjs/operators';
import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition, } from '@angular/animations';
import { ConnectedPositionStrategy } from '@angular/cdk/overlay';
import { ThrowStmt } from '@angular/compiler';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { TitleDialogComponent } from '../title-dialog/title-dialog.component';


@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 }))
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
  categorias = [];
  paises = [];
  directores = [];
  temporadas = ['1', '2', '3', '4', '5', '6', '7 ', '8 ', '9 ']
  duraciones = ['30', '60', '90', '100']
  tituloG1;
  tituloG2;
  ratings = []
  categories = []
  titles = []
  clasifications = []
  ButtonType = false;
  ButtonMovie = false;

  tipo: string = 'Movie';
  categoria: string = 'Comedies';
  pais: string = 'Spain';
  duracion: string = '';
  actor: string = '';
  inicio = ''
  final = ''
  temporada = ''
  filtroDuracion = ''
  filtroFechas = ''
  filtroActor = ''
  showDuracion = false
  showFechas = false
  showActor = false



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
    private dialog: MatDialog
  ) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

  }


  @ViewChild('letters', { static: true })
  letters: INgxArcTextComponent;




  toggle(event: MatSlideToggleChange) {
    this.grafo = event.checked;

  }


  onPelicula() {
    sessionStorage.setItem('tipo', 'Movie');
    this.ButtonType = true
    this.resetFilters()
    this.ngOnInit();
  }
  onSerie() {
    sessionStorage.setItem('tipo', 'TV Show');
    this.ButtonType = false;
    this.resetFilters()
    this.ngOnInit();

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



    this.tipo = sessionStorage.getItem('tipo');
    this.pais = sessionStorage.getItem('pais');
    this.categoria = sessionStorage.getItem('categoria');


    this.opcionesFormGroup.get('categoria').setValue(this.categoria);
    this.opcionesFormGroup.get('pais').setValue(this.pais);


    this.http.post<any>('/router/ObtenerPaisesInit', { tipo: this.tipo }).subscribe(
      (respost) => {
        this.paises = respost[0];
      },
    );
    this.http.post<any>('/router/ObtenerCategoriasInit', { tipo: this.tipo }).subscribe(
      (respost) => {
        this.categorias = respost[0];
      },
    );


    this.graficar();
    
    this.Radial();
    this.leftToRigth();
  }

  checkFilters() {
    console.log("check filters");
    if (this.tipo == 'Movie') {
      this.ButtonType = true;
      if (this.duracion != null || this.duracion != '') {
        this.filtroDuracion = `Peliculas  mayores a ${this.duracion} minutos`;
      }
    }
    else {
      this.ButtonType = false;
      if (this.temporada != null || this.temporada != '') {
        this.filtroDuracion = `Series  mayores a ${this.temporada}`;
      }
    }

    if (this.actor != null || this.actor != '') {

      this.filtroActor = `Actor: ${this.actor}`
    }
    if (this.inicio != null || this.inicio != '' && this.final != null || this.final != '') {

      this.filtroFechas = ` Desde ${this.inicio} hasta ${this.final}`
    }





  }
  resetFilters() {

    this.actor = ''
    this.duracion = ''
    this.temporada = ''
    this.inicio = ''
    this.final = ''


    this.showActor = false;
    this.showDuracion = false;
    this.showFechas = false;



    this.filtrosFormGroup.get('actor').setValue(null);
    this.filtrosFormGroup.get('duracion').setValue(null);
    this.filtrosFormGroup.get('fechainicio').setValue(null);
    this.filtrosFormGroup.get('fechafinal').setValue(null);
    this.filtrosFormGroup.get('temporada').setValue(null);


  }

  onGenerate() {

    this.tipo = sessionStorage.getItem('tipo')

    this.resetFilters();

    if (this.grafo == true) {
      this.titulo = `Grafo de ${this.pais}`
      this.leftToRigth();
      this.Radial();
    }
    else {

      this.categoria = this.opcionesFormGroup.get('categoria').value.toString();
      this.pais = this.opcionesFormGroup.get('pais').value.toString();

      sessionStorage.setItem('categoria', this.categoria)
      sessionStorage.setItem('pais', this.pais)
      // this.titulo = `Grafico de ${this.categoria} en ${this.pais}`
      // this.tituloG1 = `Cantidad de ${this.tipo} de ${this.categoria} en ${this.pais} por años`
      // this.tituloG2 = `Cantidad de ${this.tipo} de ${this.categoria} en ${this.pais} por clasificación `
      this.graficar();

    }
  }

  graficar() {

    this.checkFilters();

    if (this.duracion == null || this.duracion == '') {
      this.duracion = '0';
    }
    if (this.inicio == null || this.inicio == '') {
      this.inicio = '1925';
    }
    if (this.final == null || this.final == '') {
      this.final = '2020';
    }
    if (this.temporada == null || this.temporada == '') {
      this.temporada = '0';
    }


    console.log(this.showActor, this.showDuracion, this.showFechas);




    const formData = {
      tipo: this.tipo,
      categoria: this.categoria,
      pais: this.pais,
      duracion: this.duracion,
      actor: this.actor,
      fechaI: this.inicio,
      fechaF: this.final

    }

    console.log(formData);
    this.http.post<any>('/router/ObtenerYearFil', formData).subscribe(
      (respost) => {
        this.categories = respost[0];
        console.log(this.categories);
      },
    );

    this.http.post<any>('/router/ObtenerClasificacionFil', formData).subscribe(
      (respost) => {
        this.ratings = respost[0]

      },
    );

    this.titulo = `Grafico de ${this.categoria} en ${this.pais}`
    this.tituloG1 = `Cantidad de ${this.tipo} de ${this.categoria} en ${this.pais} por años`
    this.tituloG2 = `Cantidad de ${this.tipo} de ${this.categoria} en ${this.pais} por clasificación `


  }

  onFilter() {

    console.log(this.filtrosFormGroup.get('actor').value);
    console.log(this.filtrosFormGroup.get('duracion').value);
    console.log(this.filtrosFormGroup.get('temporada').value);

    if (this.filtrosFormGroup.get('actor').value != null) {
      this.actor = this.filtrosFormGroup.get('actor').value;
      console.log("entro actor");
      this.showActor = true;
    }
    else
      this.actor = ''

    if (this.filtrosFormGroup.get('duracion').value != null) {
      console.log("movie");
      this.duracion = this.filtrosFormGroup.get('duracion').value;
      console.log("entro duracion");

      this.showDuracion = true;
    }

    if (this.filtrosFormGroup.get('temporada').value != null) {
      console.log("temporada");
      this.duracion = this.filtrosFormGroup.get('temporada').value;
      this.temporada = this.filtrosFormGroup.get('temporada').value;
      // this.duracion = ''
      console.log("entro temporads");

      this.showDuracion = true;

    }

    if (this.filtrosFormGroup.get('fechainicio').value != null && this.filtrosFormGroup.get('fechafinal').value != null) {
      this.inicio = this.filtrosFormGroup.get('fechainicio').value;
      this.final = this.filtrosFormGroup.get('fechafinal').value;
      console.log("entro fechas");

      this.showFechas = true;

    }
    else {
      this.inicio = ''
      this.final = ''
    }
    this.graficar();

  }

  deleteFilter(type) {

    console.log(type);
    if (type == 1) {
      console.log(1);
      this.duracion = '0'
      this.showDuracion = false
      this.graficar();
      this.filtrosFormGroup.get('duracion').setValue('');


    }
    if (type == 2) {
      console.log(2);
      this.inicio = ''
      this.final = ''

      this.showFechas = false;
      this.filtrosFormGroup.get('fechainicio').setValue('');
      this.filtrosFormGroup.get('fechafinal').setValue('');
      console.log("this.showFechas");
      console.log(this.showFechas);
      this.graficar();

    }
    if (type == 3) {
      console.log(3);
      this.actor = ''
      this.showActor = false
      this.filtrosFormGroup.get('actor').setValue('');

      this.graficar();

    }



  }

  titlesYear(event) {

    const formData = {
      tipo: this.tipo,
      categoria: this.categoria,
      pais: this.pais,
      duracion: this.duracion,
      actor: this.actor,
      fecha: event.name


    }

    sessionStorage.setItem('moviesTitles', JSON.stringify(formData));
    sessionStorage.setItem('dialogType', 'year');

    this.http.post<any>('/router/ObtenerTituloYear', formData).subscribe(
      (respost) => {
        this.dialog.open(TitleDialogComponent, { data: { data: respost[0] } });
        this.titles = respost[0];
      },
    );

  }

  titlesClasification(event) {

    const formData = {
      tipo: this.tipo,
      categoria: this.categoria,
      pais: this.pais,
      duracion: this.duracion,
      actor: this.actor,
      fechaI: this.inicio,
      fechaF: this.final,
      clasificacion: event.name
    }

    console.log(formData);
    sessionStorage.setItem('moviesTitles', JSON.stringify(formData));
    sessionStorage.setItem('dialogType', 'clasification');

    this.http.post<any>('/router/ObtenerTituloClasificacion', formData).subscribe(
      (respost) => {
        this.dialog.open(TitleDialogComponent, { data: { data: respost[0] } });
        this.titles = respost[0];
      },
    );

  }

  leftToRigth(): void {

    let pais = this.opcionesFormGroup.get('pais').value;
    this.options = this.http.post<any>('/router/ObtenerPaisCategArbol', { tipo: this.tipo, pais: pais })
      .pipe(
        map((respost) => {
          echarts.util.each(
            respost.children,
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
                data: [respost[0]],
                top: '1%',
                left: '7%',
                bottom: '1%',
                right: '20%',
                symbolSize: 7,
                initialTreeDepth: 1,
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
    let pais = this.opcionesFormGroup.get('pais').value;
    this.options1 = this.http.post<any>('/router/ObtenerPaisCategArbol', { tipo: this.tipo, pais: pais })
      .pipe(
        map((respost) => {
          echarts.util.each(
            respost.children,
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
                data: [respost[0]],
                top: '1%',
                left: '7%',
                bottom: '1%',
                right: '20%',
                symbolSize: 9,
                initialTreeDepth: 1,
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




import { Component, OnInit, ViewChild, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INgxArcTextComponent } from 'ngx-arc-text';
import { MatSlideToggleChange } from '@angular/material';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';




@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  options: Observable<any>;

  titulo = 'General Data'
  grafo: boolean
  grafico = false;
  categorias = [];
  paises = [];
  totaltipos = [];
  totalcategorias = [];
  totalpaises = [];
  totalfechas = [];
  colorScheme = {
    domain: ['#060529', '#B10606']
  };

  viewNumbers: any[] = [1000, 1000];
  viewTree: any[] = [1000, 600];
  showLabels: boolean = true;
  isDoughnut: boolean = true;
  animations: boolean = true;
  colorScheme1 = {
    domain: [
      '#335c67',
      '#fff3b0',
      '#9e2a2b',
      '#540b0e',
      '#001524',
      '#15616d',
      '#ffecd1',
      '#003049',
      '#78290f',
      '#B10606',

    ]
  };

  opcionesFormGroup = new FormGroup(
    {
      categoria: new FormControl(null),
      pais: new FormControl(null),
    }
  );
  constructor(
    private http: HttpClient,
    private router: Router,

  ) { }


  @ViewChild('letters', { static: true })
  letters: INgxArcTextComponent;


  toggle(event: MatSlideToggleChange) {
    this.grafo = event.checked;
  }

  onSelect(data): void {
    if (data.name == 'Movie')
      sessionStorage.setItem('tipo', 'Movie');
    else
      sessionStorage.setItem('tipo', 'TV Show');
    this.router.navigate(['peliculas']);


  }


  onPelicula(): any {
    sessionStorage.setItem('tipo', 'Movie');
    this.router.navigate(['peliculas']);
  }
  onSerie() {
    sessionStorage.setItem('tipo', 'TV Show');
    this.router.navigate(['peliculas']);
  }

  onPrincipal() {
    this.router.navigate(['principal']);
  }
  ngOnInit() {

    this.http.get<any>('/router/ObtenerTipoTotal').subscribe(
      (respost) => {
        this.totaltipos = respost[0]
      },
    );
    this.http.get<any>('/router/ObtenerCategoriasTotal').subscribe(
      (respost) => {
        this.totalcategorias = respost[0]

      },
    );
    this.http.get<any>('/router/ObtenerPaisTotal').subscribe(
      (respost) => {
        this.totalpaises = respost[0]

      },
    );
    this.http.get<any>('/router/ObtenerYearTotal').subscribe(
      (respost) => {
        this.totalfechas = respost[0]

      },
    );

    this.http.post<any>('/router/ObtenerPaisesInit', { tipo: 'Movie' }).subscribe(
      (respost) => {
        this.paises = respost[0];
      },
    );
    this.http.post<any>('/router/ObtenerCategoriasInit', { tipo: 'Movie' }).subscribe(
      (respost) => {
        this.categorias = respost[0];
      },
    );


  }
  

  onGenerate() {
    let categori = this.opcionesFormGroup.get('categoria').value.categoria;
    let pai = this.opcionesFormGroup.get('pais').value.pais;
    sessionStorage.setItem('categoria', categori);
    sessionStorage.setItem('pais', pai);
    sessionStorage.setItem('tipo', 'Movie');


    this.router.navigate(['peliculas']);




  }



}


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

  titulo = 'Estadísticas Generales'
  grafo: boolean
  grafico = false;
  categorias = ['Comedia', 'Drama'];
  paises = ['United States', 'Italia'];
  totaltipos= [];
  totalcategorias=[];
  totalpaises=[];
  totalfechas=[];
  colorScheme = {
    domain: ['#060529', '#B10606']
  };

  view: any[] = [500, 400];
  viewNumbers: any[] = [1300, 800];
  viewTree: any[] = [1000, 600];
  showLabels: boolean = true;
  isDoughnut: boolean = true;

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


  ngAfterViewInit() {
    this.letters.text = 'Universo Netflix';
    this.letters.arc = 700;

  }

  toggle(event: MatSlideToggleChange) {
    this.grafo = event.checked;

  }

  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Años';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad';
  showDataLabel = true;
  

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
  
  
  
  

  
  
  
  
  
  onSelect(data): void {
    if (data.name == 'Películas')
      sessionStorage.setItem('tipo', 'Movie');

    else
      sessionStorage.setItem('tipo', 'TV Show');

    this.router.navigate(['peliculas']);

  }


  onPelicula():any{
    sessionStorage.setItem('tipo', 'Movie');
    this.router.navigate(['peliculas']);
  }
  onSerie(){
    console.log("dasdas")
    sessionStorage.setItem('tipo', 'TV Show');
    this.router.navigate(['peliculas']);
  }

  onPrincipal(){
    this.router.navigate(['principal']);
  }
  ngOnInit() {
    console.log( sessionStorage.getItem('tipo') );

    this.http.get<any>('/router/ObtenerTipoTotal').subscribe(
      (respost) => {
        this.totaltipos = respost[0]
        console.log("this.totaltipos");
        console.log(this.totaltipos);
      },
    );
    this.http.get<any>('/router/ObtenerCategoriasTotal').subscribe(
      (respost) => {
        this.totalcategorias= respost[0]
        console.log("this.totalcategorias");
        console.log(this.totalcategorias);
      },
    );
    this.http.get<any>('/router/ObtenerPaisTotal').subscribe(
      (respost) => {
        this.totalpaises= respost[0]
        console.log("this.totalpaises")
        console.log(this.totalpaises)
      },
    );
    this.http.get<any>('/router/ObtenerYearTotal').subscribe(
      (respost) => {
        this.totalfechas= respost[0]
        console.log("this.totalfechas");
        console.log(this.totalfechas);
      },
    );



   }


   onGenerate() {
    let categori = this.opcionesFormGroup.get('categoria').value;
    let pai = this.opcionesFormGroup.get('pais').value;

    sessionStorage.setItem('categoria', categori);
    sessionStorage.setItem('pais', pai);

    
    // this.tipo = sessionStorage.getItem('tipo')
    this.router.navigate(['peliculas']);
  
    


    }
  


}


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

  titulo = 'Estadisticas Generales'
  grafo: boolean
  grafico = false;
  categorias = ['Comedia', 'Drama'];
  paises = ['USA', 'Italia'];


  colorScheme = {
    domain: ['#060529', '#B10606']
  };

  view: any[] = [500, 400];
  gradient: boolean = true;
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
  single = [
    {
      "name": "Series",
      "value": 1973
    },
    {
      "name": "Peliculas",
      "value": 4244
    },

  ];

  onSelect(data): void {
    if (data.name == 'Peliculas')
      sessionStorage.setItem('tipo', 'peliculas');

    else
      sessionStorage.setItem('tipo', 'series');

    this.router.navigate(['peliculas']);

  }


  onPelicula():any{
    sessionStorage.setItem('tipo', 'peliculas');
    this.router.navigate(['peliculas']);
  }
  onSerie(){
    console.log("dasdas")
    sessionStorage.setItem('tipo', 'series');
    this.router.navigate(['peliculas']);
  }

  onPrincipal(){
    this.router.navigate(['principal']);
  }
  ngOnInit() {
    console.log( sessionStorage.getItem('tipo') )

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


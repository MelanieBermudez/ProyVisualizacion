import { Component, OnInit, ViewChild, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INgxArcTextComponent } from 'ngx-arc-text';
import { MatSlideToggleChange } from '@angular/material';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



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

  colorScheme = {
    domain: ['#060529', '#B10606']
  };

  view: any[] = [1400, 800];
  gradient: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = true;
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
      "value": 1240
    },
    {
      "name": "Peliculas",
      "value": 2000
    },

  ];

  onSelect(data): void {
    if (data.name == 'Peliculas')
      sessionStorage.setItem('tipo', 'pelicula');

    else
      sessionStorage.setItem('tipo', 'serie');

    this.router.navigate(['peliculas']);

  }


  onPelicula():any{
    sessionStorage.setItem('tipo', 'pelicula');
    this.router.navigate(['peliculas']);
  }
  onSerie(){
    console.log("dasdas")
    sessionStorage.setItem('tipo', 'serie');
    this.router.navigate(['peliculas']);
  }

  onPrincipal(){
    this.router.navigate(['principal']);
  }
  ngOnInit() {
    console.log( sessionStorage.getItem('tipo') )
   }




}


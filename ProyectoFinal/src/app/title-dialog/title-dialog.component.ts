import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-title-dialog',
  templateUrl: './title-dialog.component.html',
  styleUrls: ['./title-dialog.component.css']
})
export class TitleDialogComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  titles = ['Juan'];
  names;
  descripcion=[" max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px; max-height: 200px;"]

  ngOnInit() {

    let form = JSON.parse(sessionStorage.getItem('moviesTitles'))

    //  console.log(JSON.parse(form));

    let tipo = form["tipo"]
    let categoria = form["categoria"]
    let pais = form["pais"]
    let duracion = form["duracion"]
    let actor = form["actor"]
    let fecha = form["fecha"]

    const formData = {
      tipo: tipo,
      categoria: categoria,
      pais: pais,
      duracion: duracion,
      actor: actor,
      fecha: fecha


    }



    this.http.post<any>('/router/ObtenerTituloYear', formData).subscribe(
      (respost) => {
        this.titles = respost[0]; 
      },
    );



  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material';
import { PeliculaComponent } from '../pelicula/pelicula.component';

@Component({
  selector: 'app-title-dialog',
  templateUrl: './title-dialog.component.html',
  styleUrls: ['./title-dialog.component.css']
})
export class TitleDialogComponent implements OnInit {

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<PeliculaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) { }

  titles = [];
  names;
  descripcion = []

  

  ngOnInit() {

    this.titles=this.data['data'];

  }

}

import { Component, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';


import {MatSidenavModule} from '@angular/material/sidenav';


@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  addfile(event) {
    //checks uploading file 
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('Solo debe importar un archivo a la vez');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' })
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const dataJson = <XLSX.AOA2SheetOpts>(XLSX.utils.sheet_to_json(ws, { header: 1 }))

      const prueba = (XLSX.utils.sheet_to_json(ws, { header: 1 }))
      var size = prueba.length
      console.log(size)
      console.log(dataJson)
      var cont, col
      for (cont = 2; cont < size; cont++) {
        col = dataJson[cont]
        var keyType = '0', keyTitle = '1', keyDirector ='2', keyCast ='3', keyCountry = '4', keyYear= '5',
        keyRate='6', keyDuration ='7', keyListed = '8', keyDescrip='9'
        var listedAux = col[keyListed].split(',')
        let type = col[keyType]
        let title = col[keyTitle]
        let director = col[keyDirector]
        let cast = col[keyCast]
        let country = col[keyCountry]
        let year = col[keyYear]
        let rate = col[keyRate]
        let duration = col[keyDuration]
        let listed = listedAux[0]
        let descrip = col[keyDescrip]
        
     

        const formData = {type:type, title:title, director:director, cast:cast, country:country,
        year:year, rate:rate, duration:duration, descrip:descrip, listed:listed}

        console.log("formData")
        console.log(formData)

        this.http.post<any>('http://localhost:3000/router/CargarDatos', formData).subscribe(
          (res) => {
            console.log("importados")
          },
          (err) => console.log(err)
        );

      }

      



    
    };
    reader.readAsBinaryString(target.files[0]);

  }

}

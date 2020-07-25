import { Component, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';


import {MatSidenavModule} from '@angular/material/sidenav';

export interface Data {
  typeI:String;
  titleI:String;
  directorI:String;
  castI:String;
  countryI:String;
  yearI:String;
  rateI:String;
  durationI:String;
  listedI:String;
  descripI:Text;

}
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
      var cont, col
      for (cont = 2; cont < size; cont++) {
        col = dataJson[cont]
        var keyType = '1', keyTitle = '2', keyDirector ='3', keyCast ='4', keyCountry = '5', keyYear= '6',
        keyRate='7', keyDuration ='8', keyListed = '9', keyDescrip='10'

        let type = col[keyType]
        let title = col[keyTitle]
        let director = col[keyDirector]
        let cast = col[keyCast]
        let country = col[keyCountry]
        let year = col[keyYear]
        let rate = col[keyRate]
        let duration = col[keyDuration]
        let listed = col[keyListed]
        let descrip = col[keyDescrip]
        
        console.log("type in for")
        console.log(type)

        const formData = {typeI:type, titleI:title, directorI:director, castI:cast, countryI:country,
        yearI:year, rateI:rate, durationI:duration, listedI:listed,descripI:descrip}

        console.log("form data type")  
        console.log(formData.typeI)

        this.http.post<any>('/router/CargarDatos', formData).subscribe(
          (res) => {
            console.log("importados")
          },
          (err) => console.log(err)
        );

      }

      console.log(dataJson)



    
    };
    reader.readAsBinaryString(target.files[0]);

  }

}

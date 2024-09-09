import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ApiService  } from '../../../services/proxy.service';
import { ResponseJsonSuc } from '../../../interface/response-api';
import { StoresData } from '../../../interface/data-api';
/**
 * Componente de los ficheros de información de la sucursales
*/

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html'
})
export class BranchesComponent implements AfterViewInit {
  dataRequest? : ResponseJsonSuc;
  dataSource?: StoresData[];

//El constructor llama intreface Api
  constructor(private apiService:ApiService) {}
  
//Un método que obtiene los datos del API que se invoca inmediatamente después de que Angular haya completado la inicialización de la vista.
  ngAfterViewInit() {
    this.apiService.getBranches().subscribe(dataArt => {
      this.dataRequest=dataArt;
      this.Onfinish();
    });
  }

  //Al terminar el llamado de la API realiza el llenado del dataSource para que se capture los ficheros.
  Onfinish() {
    if(this.dataRequest != null && this.dataRequest.Success){
      this.dataSource = this.dataRequest.Response;
    }
  }

  
  
}
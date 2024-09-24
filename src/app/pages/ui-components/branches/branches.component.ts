import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ProxyGet  } from '../../../services/proxy.service';
import { ResponseJson } from '../../../interface/response-api';
import { StoresData } from '../../../interface/data-api';
/**
 * Componente de los ficheros de información de la sucursales
*/

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html'
})
export class BranchesComponent implements AfterViewInit {
  dataSource?: StoresData[];

//El constructor llama intreface Api
  constructor(private apiService:ProxyGet) {}
  
//Un método que obtiene los datos del API que se invoca inmediatamente después de que Angular haya completado la inicialización de la vista.
  async ngAfterViewInit() {

    const jsonDta = await this.apiService.callAPI("stores", "GET");
    const response = jsonDta as ResponseJson<StoresData>;
    if (response && response.Success && response.Response) {
      this.dataSource = response.Response;
    }
  }
 
  
}
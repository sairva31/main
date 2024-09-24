import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ProxyGet  } from '../../../services/proxy.service';
import { ResponseJson } from '../../../interface/response-api';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ArticlesData } from '../../../interface/data-api';
import { from } from 'rxjs';
import { distinct } from 'rxjs/operators';
import * as _ from "lodash";

/**
 * Componente de la tabla de inventario de artículos activos
*/

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
})

export class InventoryComponent implements AfterViewInit {
  displayedColumns: string[] = ['Name', 'Price', 'Total_in_shelf','Total_in_vault','Store_name'];
  dataSource:any;
  dataBranches:string[] = ["Todos"];
  apiResponse:any = [];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
//El constructor llama intreface Api
  constructor(private apiService:ProxyGet) {}

 //Un método que genera la tabla dinamica que se invoca inmediatamente después de que Angular haya completado la inicialización de la vista.
  async ngAfterViewInit() {
    const jsonDta = await this.apiService.callAPI("articles", "GET");
    const response = jsonDta as ResponseJson<ArticlesData>;
    if (response && response.Success && response.Response) {
      this.dataSource = new MatTableDataSource(response.Response);
      this.apiResponse = response.Response;
      from(response.Response)
        .pipe(distinct(e => e.Store_name)).subscribe(
          items => {
            this.dataBranches?.push(items.Store_name);
          }
        );
    }
    this.dataSource.paginator = this.paginator;
  }

//Si filtra con el Select de la vista este realiza el filtro en el dataSource de la tabla.
  applyFilter($event:any){
    if($event.value == "Todos"){
      this.dataSource= new MatTableDataSource(this.apiResponse);
    }else{
      let filterData= _.filter(this.apiResponse,(item)=>{
        return item.Store_name == $event.value
      })
      this.dataSource= new MatTableDataSource(filterData);
    }
    
  }
  
}

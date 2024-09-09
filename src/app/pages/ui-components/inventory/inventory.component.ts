import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ApiService  } from '../../../services/proxy.service';
import { ResponseJsonProd } from '../../../interface/response-api';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { from } from 'rxjs';
import { distinct } from 'rxjs/operators';
import * as _ from "lodash";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
})

export class InventoryComponent implements AfterViewInit {
  displayedColumns: string[] = ['Name', 'Price', 'Total_in_shelf','Total_in_vault','Store_name'];
  dataRequest? : ResponseJsonProd;
  dataSource:any;
  dataBranches:string[] = ["Todos"];
  apiResponse:any = [];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  

  constructor(private apiService:ApiService) {}
  
  ngAfterViewInit() {
    this.apiService.getArticles().subscribe(dataArt => {
      this.dataRequest=dataArt;
      this.Onfinish();
    });
    this.dataSource.paginator = this.paginator;
  }

  Onfinish() {
    if(this.dataRequest != null && this.dataRequest.Success){
      this.dataSource = new MatTableDataSource(this.dataRequest.Response);
      this.apiResponse = this.dataRequest.Response;
      from(this.dataRequest.Response)
        .pipe(distinct(e => e.Store_name)).subscribe(
          items => {
            this.dataBranches?.push(items.Store_name);
          }
        );
    }
  }

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

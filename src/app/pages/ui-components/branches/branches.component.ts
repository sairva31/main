import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ApiService  } from '../../../services/proxy.service';
import { ResponseJsonSuc } from '../../../interface/response-api';
import { StoresData } from '../../../interface/data-api';


@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html'
})
export class BranchesComponent implements AfterViewInit {
  dataRequest? : ResponseJsonSuc;
  dataSource?: StoresData[];


  constructor(private apiService:ApiService) {}
  
  ngAfterViewInit() {
    this.apiService.getBranches().subscribe(dataArt => {
      this.dataRequest=dataArt;
      this.Onfinish();
    });
  }

  Onfinish() {
    if(this.dataRequest != null && this.dataRequest.Success){
      this.dataSource = this.dataRequest.Response;
    }
  }

  
  
}
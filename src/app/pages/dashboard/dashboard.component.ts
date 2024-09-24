import { Component, ViewEncapsulation, ViewChild, OnInit  } from '@angular/core';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
} from 'ng-apexcharts';
import { ProxyGet  } from '../../services/proxy.service';
import { ResponseJson } from '../../interface/response-api';
import { StoresData, ArticlesData } from '../../interface/data-api';

/**
 * Componente del grafico total de artículos por sucursal
*/

//Interface necesaria para captura de gráficos
export interface salesOverviewChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class AppDashboardComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public salesOverviewChart!: Partial<salesOverviewChart> | any;
  dataRequest? : ResponseJson<StoresData>;
  dataRequest2? : ResponseJson<ArticlesData>;

  constructor(private apiService:ProxyGet) {}

  //Cuando se crea una instancia de la directiva, este consulta a la API par obtner los datos.
  ngOnInit() {
    this.OnBeginer();
  }

  async OnBeginer(){
    var jsonDta = await this.apiService.callAPI("stores", "GET");
    const response = jsonDta as ResponseJson<StoresData>;
    console.log(response);
    if (response && response.Success && response.Response) {
      this.dataRequest=response;
      var jsonDtaArt = await this.apiService.callAPI("articles", "GET");
      const responseArt = jsonDtaArt as ResponseJson<ArticlesData>;
      console.log(responseArt);
      if (responseArt && responseArt.Success && responseArt.Response) {  
        this.dataRequest2= responseArt;
        this.Onfinish();
      }
    }; 

  }
//Al terminar el llamado de la API realiza el llenado del salesOverviewChart para mostrar los gráficos.
  Onfinish() {
    var categoriesTemp = new Array();
    var categoriesCount = new Array();
    var maxValue = 0;
    console.log(this.dataRequest);
    if(this.dataRequest != null && this.dataRequest.Success && this.dataRequest2 != null && this.dataRequest2.Success){
      for(var i = 0; i < this.dataRequest.Response.length ; i++){
        var count = 0;
        for(var j = 0; j < this.dataRequest2.Response.length ; j++){
          if(this.dataRequest2?.Response[j].Store_id === this.dataRequest?.Response[i].Id){
            count++;
          }
        }
        if(maxValue < count){
          maxValue = count
        }
        categoriesCount.push(count);
        categoriesTemp.push(this.dataRequest.Response[i].Name);
      }
    }
    this.salesOverviewChart = {
      series: [
        {
          name: 'Total de productos',
          data: categoriesCount,
          color: '#5D87FF',
        }
      ],

      grid: {
        borderColor: 'rgba(0,0,0,0.1)',
        strokeDashArray: 3,
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      plotOptions: {
        bar: { horizontal: false, columnWidth: '35%', borderRadius: [4] },
      },
      chart: {
        type: 'bar',
        height: 390,
        offsetX: -15,
        toolbar: { show: true },
        foreColor: '#adb0bb',
        fontFamily: 'inherit',
        sparkline: { enabled: false },
      },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      legend: { show: false },
      xaxis: {
        type: 'category',
        categories: categoriesTemp,
        labels: {
          style: { cssClass: 'grey--text lighten-2--text fill-color' },
        },
      },
      yaxis: {
        show: true,
        min: 0,
        max: maxValue,
        tickAmount: 4,
        labels: {
          style: {
            cssClass: 'grey--text lighten-2--text fill-color',
          },
        },
      },
      stroke: {
        show: true,
        width: 3,
        lineCap: 'butt',
        colors: ['transparent'],
      },
      tooltip: { theme: 'light' },

      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 3,
              },
            },
          },
        },
      ],
    };
  }
  
  
}

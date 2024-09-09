import { Component, ViewEncapsulation, ViewChild, OnChanges  } from '@angular/core';
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
import { ApiService  } from '../../services/proxy.service';
import { ResponseJsonSuc,ResponseJsonProd } from '../../interface/response-api';

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

export class AppDashboardComponent implements OnChanges {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public salesOverviewChart!: Partial<salesOverviewChart> | any;
  dataRequest? : ResponseJsonSuc;
  dataRequest2? : ResponseJsonProd;

  //Cuando se crea una instancia de la directiva, este consulta a la API par obtner los datos.
  ngOnChanges() {
    this.apiService.getBranches()
      .subscribe(data => {
        this.dataRequest=data;
        this.apiService.getArticles().subscribe(dataArt => {
          this.dataRequest2=dataArt;
          this.Onfinish();
        });
      }); 

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
  
  constructor(private apiService:ApiService) {
 
  }

  
  
}

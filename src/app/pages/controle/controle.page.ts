import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-controle',
  templateUrl: './controle.page.html',
})
export class ControlePage implements OnInit{
  @ViewChild('barCanvas') barCanvas;

  ganhos = [
      {
        dia: "01/01",
        valor: 1200
      },
      {
        dia: "02/01",
        valor: 1900
      },
      {
        dia: "10/01",
        valor: 1000
      }
  ]
  barChart: any;
  meses = [];
  valores = [];
  total: number = 0;

  
  constructor(public navCtrl: NavController) {
    this.ganhos.forEach( res => {
        this.meses.push(res.dia);
        this.valores.push(res.valor);
        this.total += res.valor;
    })
  }

  ngOnInit() {

      this.barChart = new Chart(this.barCanvas.nativeElement, {
          //doughnut e o line
          type: 'line',
          data: {
              labels: this.meses,
              datasets: [{
                  label: 'R$',
                  data: this.valores,
                  backgroundColor: [
                    //  'rgba(255, 99, 132, 0.2)',
                    //  'rgba(54, 162, 235, 0.2)',
                    //  'rgba(255, 206, 86, 0.2)',
                    //  'rgba(75, 192, 192, 0.2)',
                    //  'rgba(153, 102, 255, 0.2)',
                      'rgba(80, 255, 80, 0.3)'
                  ],
                  borderColor: [
                    //  'rgba(255,99,132,1)',
                    //  'rgba(54, 162, 235, 1)',
                    //  'rgba(255, 206, 86, 1)',
                    //  'rgba(75, 192, 192, 1)',
                    //  'rgba(153, 102, 255, 1)',
                      'rgba(80, 255, 80, 1)'
                  ],
                  borderWidth: 1
              }],
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true
                      }
                  }]
              }
              //circumference: Math.PI,
              //rotation: 1.0 * Math.PI
          }

      });
  }
}

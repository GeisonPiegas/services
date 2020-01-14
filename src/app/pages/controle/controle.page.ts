import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js'
import { OrdemServicoService } from 'src/app/services/OrdemServico/ordem-servico.service';
import { DatePipe } from '@angular/common';
import { AtuacaoProfissionalService } from 'src/app/services/AtuacaoProfissional/atuacao-profissional.service';
import { OrdemServico } from 'src/app/services/OrdemServico/ordem-servico';


@Component({
  selector: 'app-controle',
  templateUrl: './controle.page.html',
  styleUrls: ['./controle.page.scss']
})


export class ControlePage implements OnInit, OnDestroy{
  @ViewChild('barCanvas') barCanvas;

  private uidUsuario: string;
  private subscription: Subscription;
  private chartjs2: any;
  public diasAtualGastos = new Array<any>();
  public valoresAtualGastos = new Array<any>();
  public diasValorAtualGastos = new Array<OrdemServico>();
  public diasValorAtualGanhos = new Array<OrdemServico>();
  public valoresAtualGanhos = new Array<any>();
  public diasAtualGanhos = new Array<any>();
  public totalGanho: number = 0;
  public totalGasto: number = 0;
  public totalAno: number = 0;
  public viewGanhos: Boolean = true;
  public viewGastos: Boolean = true;
  public viewMeses: Boolean = false;
  private mesesChart = new Array<any>();
  private valorChartGanhos = new Array<any>();
  private valorChartGastos = new Array<any>();
  public todosOsGanhos = new Array<OrdemServico>();
  public todosOsGastos = new Array<OrdemServico>();
  private dataAtual = new Date();
  public todosOsRestos = new Array<OrdemServico>();

  public valorMeses = [
    { id: this.datepipe.transform(this.dataAtual,'01/yyyy'), nome: 'Janeiro', valorGasto: 0, valorGanho: 0 },
    { id: this.datepipe.transform(this.dataAtual,'02/yyyy'), nome: 'Fevereiro', valorGasto: 0, valorGanho: 0 },
    { id: this.datepipe.transform(this.dataAtual,'03/yyyy'), nome: 'Março', valorGasto: 0, valorGanho: 0 },
    { id: this.datepipe.transform(this.dataAtual,'04/yyyy'), nome: 'Abril', valorGasto: 0, valorGanho: 0 },
    { id: this.datepipe.transform(this.dataAtual,'05/yyyy'), nome: 'Maio', valorGasto: 0, valorGanho: 0 },
    { id: this.datepipe.transform(this.dataAtual,'06/yyyy'), nome: 'Junho', valorGasto: 0, valorGanho: 0 },
    { id: this.datepipe.transform(this.dataAtual,'07/yyyy'), nome: 'Julho', valorGasto: 0, valorGanho: 0 },
    { id: this.datepipe.transform(this.dataAtual,'08/yyyy'), nome: 'Agosto', valorGasto: 0, valorGanho: 0 },
    { id: this.datepipe.transform(this.dataAtual,'09/yyyy'), nome: 'Setembro', valorGasto: 0, valorGanho: 0 },
    { id: this.datepipe.transform(this.dataAtual,'10/yyyy'), nome: 'Outubro', valorGasto: 0, valorGanho: 0 },
    { id: this.datepipe.transform(this.dataAtual,'11/yyyy'), nome: 'Novembro', valorGasto: 0, valorGanho: 0 },
    { id: this.datepipe.transform(this.dataAtual,'12/yyyy'), nome: 'Dezembro', valorGasto: 0, valorGanho: 0 }
  ];
  
  constructor(private ordemServicoService: OrdemServicoService,
              private auth: AngularFireAuth,
              public datepipe: DatePipe,
              private atuacaoProfissionalService: AtuacaoProfissionalService){;
  };

  // Busca e captura os dados referentes aos GASTOS da pessoa.
  buscaGastos(uidUsuario: string){
    this.subscription = this.ordemServicoService.getOrdemUsuario(uidUsuario, 4).subscribe(res => {
      this.totalGasto = 0;
    
      res.forEach( dados => {
        // Pega as ordem do mes em andamento;
        if (this.datepipe.transform(dados.dataHoraTermino,'MM/yyyy') == this.datepipe.transform(this.dataAtual,'MM/yyyy')) {
            this.diasValorAtualGastos.push(dados); 
            this.diasAtualGastos.push(this.datepipe.transform(dados.dataHoraTermino,'dd/MM'));
            this.valoresAtualGastos.push(dados.valor);
            this.somaMeses(2,this.datepipe.transform(dados.dataHoraTermino,'MM/yyyy'), dados.valor)
            this.totalGasto += dados.valor;
        }else{
          if(this.datepipe.transform(dados.dataHoraFinal,'yyyy') == this.datepipe.transform(this.dataAtual,'yyyy')){
            this.somaMeses(2,this.datepipe.transform(dados.dataHoraTermino,'MM/yyyy'), dados.valor)
            console.log("Mes "+this.datepipe.transform(dados.dataHoraTermino,'MM/yyyy'));
          }else{
            this.todosOsRestos.push(dados);
          };
        };
      });
    });
  };

  // Busca e captura os dados referentes aos GANHOS da pessoa.
  buscaGanhos(uidUsuario: string){
    this.subscription = this.atuacaoProfissionalService.getServicosProfissional(uidUsuario).subscribe( res => {
      this.totalGanho = 0;
      res.forEach(data => {
        this.subscription = this.ordemServicoService.getOrdemProfissional(data.id, 4).subscribe( ordem => {
          ordem.forEach( dados => {
           
            if (this.datepipe.transform(dados.dataHoraTermino,'MM/yyyy') == this.datepipe.transform(this.dataAtual,'MM/yyyy')) {
              this.diasValorAtualGanhos.push(dados); 
              this.diasAtualGanhos.push(this.datepipe.transform(dados.dataHoraTermino,'dd/MM'));
              this.valoresAtualGanhos.push(dados.valor);
              this.somaMeses(1,this.datepipe.transform(dados.dataHoraTermino,'MM/yyyy'), dados.valor)
              this.totalGanho += dados.valor;
            }else{
              if(this.datepipe.transform(dados.dataHoraFinal,'yyyy') == this.datepipe.transform(this.dataAtual,'yyyy')){
                this.somaMeses(1,this.datepipe.transform(dados.dataHoraTermino,'MM/yyyy'), dados.valor)
                console.log("Mes "+this.datepipe.transform(dados.dataHoraTermino,'MM/yyyy')+"/"+dados.valor);
              }else{
                this.todosOsRestos.push(dados);
              };
            };
          });
        });
      });
    });
  }

  somaMeses(ref: number, mes: string, valor: number){
    if (ref == 1) {
      this.valorMeses.forEach( res => {
        if(res.id == mes){
          res.valorGanho += valor;
        };
      });
      this.totalAno += valor;
    } else {
      this.valorMeses.forEach( res => {
        if(res.id == mes){
          res.valorGasto += valor;
        };
      });
      this.totalAno -= valor;
     
    };
  };

  // Mostra e esconde o Accordion List, referente se ele é do GASTO ou GANHO,
  // e junto o ID do icone para rotacionar o mesmo interagido. 
  accordionList(list: number, id: string){
    if(list == 1){
      if(this.viewGastos == false){
        this.viewGastos = true;
        this.rotate180(id);
      }else{
        this.viewGastos = false;
        this.rotate0(id);
      }
    }else if(list == 2){
      if(this.viewGanhos == false){
        this.viewGanhos = true;
        this.rotate180(id);
      }else{
        this.viewGanhos = false;
        this.rotate0(id);
      };
    }else{
      if(this.viewMeses == false){
        this.viewMeses = true;
        this.rotate180(id);
      }else{
        this.viewMeses = false;
        this.rotate0(id);
      };
    };
  };

  // Rotaciona 180 o icone do Accordion List
  rotate180(id: string){
    document.getElementById(id).style.transform = "rotate(180deg)";
  };

  // Rotaciona 0 o icone do Accordion List
  rotate0(id: string){
    document.getElementById(id).style.transform = "rotate(0deg)";
  };

  // Mostra o grafico com base em qual list é, GANHO ou GASTO
  showChart(list: number){
    if(list == 1){
      document.getElementById('showChart').style.display = 'block';
      this.createChart(this.diasAtualGanhos, this.valoresAtualGanhos, "rgba(0, 255, 0, 0.2)", "rgba(0, 255, 0, 1)");
    }else if(list == 2){
      document.getElementById('showChart').style.display = 'block';
      this.createChart(this.diasAtualGastos, this.valoresAtualGastos, "rgba(255, 0, 0, 0.2)", "rgba(255, 0, 0, 1)");
    }else{
      document.getElementById('showChart').style.display = 'block'; 
      this.agrupaDados();     
      this.createChartAno(this.mesesChart, this.valorChartGanhos, this.valorChartGastos, "rgba(255, 0, 0, 0.2)", "rgba(255, 0, 0, 1)");
    };
  };

  // Esconde o grafico.
  closeChart(){
    document.getElementById('showChart').style.display = 'none';
  };


  ngOnInit() {
    this.uidUsuario = this.auth.auth.currentUser.uid;
    this.closeChart();
    this.buscaGastos(this.uidUsuario);
    this.buscaGanhos(this.uidUsuario);  
  };

  agrupaDados(){
      this.mesesChart = [];
      this.valorChartGanhos = [];
      this.valorChartGastos = [];

      this.valorMeses.forEach(res => { 
      this.mesesChart.push(res.nome);
      this.valorChartGanhos.push(res.valorGanho);
      this.valorChartGastos.push(res.valorGasto);
    });
  }

  // Cria o grafico com os dados passados.
  createChart(labels: any, data: any, backgroung: string, border: string){
    new Chart(this.barCanvas.nativeElement, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "R$",
            data: data,
            backgroundColor: backgroung,
            borderColor: border,
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  };

  createChartAno(labels: any, ganhos: any, gastos: any, backgroung: string, border: string){
    this.chartjs2 = new Chart(this.barCanvas.nativeElement, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "R$",
            data: ganhos,
            backgroundColor: "rgba(0, 255, 0, 0.2)",
            borderColor: "rgba(0, 255, 0, 1)",
            borderWidth: 1
          },
          {
            label: "R$",
            data: gastos,
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            borderColor: "rgba(255, 0, 0, 1)",
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        title: {
          display: true,
          text: 'Controle do Ano'
        }
      }
    });
  };

  ngOnDestroy(){
    this.subscription.unsubscribe();
  };
}

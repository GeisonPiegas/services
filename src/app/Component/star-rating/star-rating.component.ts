import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AvaliacaoService } from 'src/app/services/Avaliacao/avaliacao.service';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent implements OnInit {
  @Input() numStars: number = 5;
  @Input() value: number = 0;
  @Input() readOnly: boolean = false;
  @Input() uidUsuario: string = '';
  @Input() idAtuacao: string = '';
  @Output() ionClick: EventEmitter<number> = new EventEmitter<number>();

  stars: String[] = [];
  avaliacaoSoma: number;
  avaliacaoQuant: number;
  tmp: number = 0;
  

  constructor(private avaliacaoService: AvaliacaoService) { }

  ngOnInit() {
    this.calc();
  }

  
  calc() {
    this.stars = [];
    if(this.readOnly){
      this.avaliacaoService.getTodos(this.idAtuacao).subscribe( res => {
        this.stars = [];
        this.avaliacaoSoma = 0;
        this.avaliacaoQuant = 0;
        res.forEach( x => {
          this.avaliacaoQuant += 1;
          this.avaliacaoSoma += x.valor;
        });
        this.montaStars(this.avaliacaoSoma / this.avaliacaoQuant);
      })
    }else{
      this.montaStars(this.value);
    }
  }

  montaStars(tmp){
    for (let i = 0; i < this.numStars; i++, tmp--) {
      if (tmp >= 1){
        this.stars.push("star");
      }else if(tmp > 0 && tmp < 1){
        this.stars.push("star-half");
      }else{
        this.stars.push("star-outline");
      }
    }
  }

  starClicked(index) {
    if(!this.readOnly){
      this.value = index + 1;
      this.ionClick.emit(this.value);
      this.add(this.uidUsuario, this.value);
      this.calc();
    }
  }

  add(usuario: string, valor: number){
    const avaliacaoFeita = {
      uidUsuario: usuario,
      valor: valor
    }
    this.avaliacaoService.addTodo(this.idAtuacao,avaliacaoFeita);
  }

}

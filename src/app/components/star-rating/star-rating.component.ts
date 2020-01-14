import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AvaliacaoService } from 'src/app/services/Avaliacao/avaliacao.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent implements OnInit, OnDestroy {
  @Input() numStars: number = 5;
  @Input() value: number = 0;
  @Input() idAtuacao: string = '';
  @Output() ionClick: EventEmitter<number> = new EventEmitter<number>();

  public stars: String[] = [];
  private avaliacaoSoma: number;
  private avaliacaoQuant: number;
  private subscription: Subscription;
  

  constructor(private avaliacaoService: AvaliacaoService) { }

  ngOnInit() {
    this.calc();
  }

  
  calc() {
    this.stars = [];
        this.subscription = this.avaliacaoService.getTodos(this.idAtuacao).subscribe( res => {
        this.stars = [];
        this.avaliacaoSoma = 0;
        this.avaliacaoQuant = 0;
        res.forEach( x => {
          this.avaliacaoQuant += 1;
          this.avaliacaoSoma += x.valor;
        });
        this.montaStars(this.avaliacaoSoma / this.avaliacaoQuant);
      })
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

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

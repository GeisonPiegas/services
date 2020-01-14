import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AvaliacaoService } from 'src/app/services/Avaliacao/avaliacao.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-star-rating-vote',
  templateUrl: './star-rating-vote.component.html',
  styleUrls: ['./star-rating-vote.component.scss'],
})
export class StarRatingVoteComponent implements OnInit, OnDestroy {
  @Input() numStars: number = 5;
  @Input() value: number = 0;
  @Input() idOrdem: string = '';
  @Input() idAtuacao: string = '';
  @Output() ionClick: EventEmitter<number> = new EventEmitter<number>();

  public stars: String[] = [];
  private subscription: Subscription;
  

  constructor(private avaliacaoService: AvaliacaoService) { }

  ngOnInit() {
    this.calc();
  }

  
  calc() {
    this.subscription = this.avaliacaoService.getTodo(this.idAtuacao,this.idOrdem).subscribe( res => {
      this.stars = [];
      this.montaStars(res.valor);
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

  starClicked(index) {
      this.value = index + 1;
      this.ionClick.emit(this.value);
      this.add(this.value);
      this.calc();
  }

  add(valor: number){
    const avaliacaoFeita = {
      valor: valor
    }

    this.avaliacaoService.addTodo(this.idAtuacao, this.idOrdem, avaliacaoFeita);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

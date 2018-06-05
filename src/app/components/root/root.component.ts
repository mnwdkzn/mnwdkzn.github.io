import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';

const slideInOut = trigger('slideInOut', [
  state('true' , style({ transform: 'translateX(0%)' })),
  state('false', style({ transform: 'translateX(-100%)' })),
  transition('* => *', animate('90ms ease-in'))
])

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  animations: [slideInOut]
})
export class RootComponent implements OnInit {
  input = '123';
  toggle = false;
  constructor(private cardsService: CardsService) { }

  ngOnInit() {
  }

  onCardClick() {
    this.toggle = true;
    let sub = this.cardsService.getCard(this.input).subscribe(s => {
      sub.unsubscribe();
    });
  }

  onBackwardClick() {
    console.log('back');
    this.toggle = false;
  }
}

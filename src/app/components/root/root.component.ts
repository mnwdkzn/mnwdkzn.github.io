import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';

const slideInOut = trigger('slideInOut', [
  state('true', style({ transform: 'translateX(0%)' })),
  state('false', style({ transform: 'translateX(-100%)' })),
  transition('* => *', animate('90ms ease-in'))
])

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss','./progress.scss'],
  animations: [slideInOut]
})
export class RootComponent implements OnInit {
  input = '';
  toggle = false;
  isPending = false;
  cardIsExists = false;
  card: any = null;

  constructor(private cardsService: CardsService) { }

  ngOnInit() {
  }

  async onCardClick() {
    if(!this.input) return;
    this.toggle = true;
    this.isPending = true;
    let card = await this.cardsService.getCard(this.input);
    this.card = card;
    this.cardIsExists = card != null;
    this.isPending = false;
  }

  onBackwardClick() {
    this.toggle = false;
    this.card = null;
    this.cardIsExists = false;
    this.isPending = false;
    this.input = '';
  }

  async onRegisterClick() {
    this.isPending = true;
    await this.cardsService.register(this.input);
    this.onBackwardClick();
    this.isPending = false;
  }
}

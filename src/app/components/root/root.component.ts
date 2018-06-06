import { Component, OnInit, ViewChild } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';
import { CardComponent } from '../card/card.component';

const slideInOut = trigger('slideInOut', [
  state('true', style({ transform: 'translateX(0%)' })),
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
  input = '';
  toggle = false;
  @ViewChild("card") card: CardComponent;
  constructor(private cardsService: CardsService) { }

  ngOnInit() {
  }

  async onCardClick(e) {
    if(!e) return;
    this.toggle = true;
    await this.card.load(e);
  }
}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  isPending: boolean = false;
  num: string = '';
  card: any = null;
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<any> = new EventEmitter();

  get cardIsExists() {
    return !!this.card
  }

  constructor(private cardsService: CardsService) { }

  ngOnInit() {
  }

  async load(num: string) {
    if (!num) return;
    this.isPending = true;
    this.num = num;
    let card = await this.cardsService.getCard(num);
    this.card = card;
    this.isPending = false;
  }

  clear() {
    this.card = null;
    this.num = '';
  }

  onCancel() {
    this.clear();
    this.cancel.emit();
  }

  async onSubmit() {
    this.isPending = true;
    await this.cardsService.register(this.num);
    this.clear();
    this.isPending = false;
    this.submit.emit();
  }
}

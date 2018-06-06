import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './searchInput.component.html',
  styleUrls: ['./searchInput.component.scss']
})
export class SearchInputComponent implements OnInit {

  @Output() value: string = '';
  @Output() submit: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClear() {
    this.value = '';
  }

  onSubmit() {
    this.submit.emit(this.value);
  }
}

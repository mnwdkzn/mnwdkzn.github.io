import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

export interface Card {
    id?: number;
    use_cnt: number;
}

@Injectable()
export class CardsService {

    constructor(private afs: AngularFirestore) {

    }

    getCard(num: any) {
        return this.afs.doc('cards/' + num).valueChanges();
        // return this.afs.collection('cards', ref => ref.where('id', '==', num * 1)).valueChanges()
    }
}

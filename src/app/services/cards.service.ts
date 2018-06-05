import { Injectable } from '@angular/core';
import { firestore } from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import { SetOptions, CollectionReference } from '@firebase/firestore-types';

export interface Card {
    id?: number;
    use_cnt: number;
}

@Injectable()
export class CardsService {

    cards: CollectionReference;

    constructor(private afs: AngularFirestore) {
        this.cards = afs.firestore.collection('cards');
    }

    async getCard(num: any) {
        let s = await this.cards.doc(num).get();
        let card = s.data();
        if (card) {
            let visitsColl = await s.ref.collection('visits').orderBy('date','desc').get();
            card.visits = visitsColl.docs.map(d => {
                return d.data().date
            });
        }
        return card;
    }

    async register(num: any) {
        let cardSp = await this.cards.doc(num).get();
        let card = cardSp.data();

        if (!card) {
            await this.cards.doc(num).set({ cnt_use: 0 });
        }

        const timestamp = firestore.FieldValue.serverTimestamp();
        await this.cards.doc(num).collection('visits').add({ date: timestamp });
    }
}

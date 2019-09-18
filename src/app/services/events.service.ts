import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Event {
  id?: string,
  name: string,
  details: string,
  location: string,
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string
}

@Injectable({
  providedIn: 'root'
})

export class EventsService {
  private events: Observable < Event[] > ;
  private eventCollection: AngularFirestoreCollection < Event > ;

  constructor(private afs: AngularFirestore) {
    this.eventCollection = this.afs.collection < Event > ('events');
    this.events = this.eventCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {
            id,
            ...data
          };
        });
      })
    );
  }

  getEvents(): Observable < Event[] > {
    return this.events;
  }

  getEvent(id: string): Observable < Event > {
    return this.eventCollection.doc < Event > (id).valueChanges().pipe(
      take(1),
      map(event => {
        event.id = id;
        return event
      })
    );
  }

  addEvent(event: Event): Promise < DocumentReference > {
    return this.eventCollection.add(event);
  }

  updateEvent(event: Event): Promise < void > {
    return this.eventCollection.doc(event.id).update({
      name: event.name,
      details: event.details,
      location: event.location,
      startDate: event.startDate,
      startTime: event.startTime,
      endDate: event.endDate,
      endTime: event.endTime
    });
  }

  deleteEvent(id: string): Promise < void > {
    return this.eventCollection.doc(id).delete();
  }
}
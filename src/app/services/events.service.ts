import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Event } from '../model/Event';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class EventsService {
  private events: Observable < Event[] > ;
  private eventCollection: AngularFirestoreCollection < Event > ;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
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
    var user = this.authService.getCurrentUser();
    event.createdBy = user.uid;
    event.participants = [];
    return this.eventCollection.add(event);
  }

  updateEvent(event: Event): Promise < void > {
    return this.eventCollection.doc(event.id).update(event);
  }

  deleteEvent(id: string): Promise < void > {
    return this.eventCollection.doc(id).delete();
  }

  addParticipant(event: Event, id: string) : Promise < void > {
    event.participants.push(id);
    return this.eventCollection.doc(event.id).update(event);
  }

  getEventByUser(): Observable < Event[] > {
    var user = this.authService.getCurrentUser();
    var query = this.afs.collection<Event>("events", ref => 
      ref.where("participants", "array-contains", user.uid));

    var events = query.snapshotChanges().pipe(
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
    
    return events;
  }
}
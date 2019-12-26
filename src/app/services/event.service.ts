import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Event } from '../model/Event';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class EventService {
  private events: Observable < Event[] > ;
  private eventCollection: AngularFirestoreCollection < Event > ;

  constructor(private afs: AngularFirestore, private userService: UserService) {
    this.eventCollection = this.afs.collection < Event > ('events');
  }

  getEvents(): Observable < Event[] > {
    return this.eventCollection.snapshotChanges().pipe(
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

  getEvent(id: string): Observable<Event> {
    return this.eventCollection.doc<Event>(id).valueChanges().pipe(
      take(1),
      map(event => {
        event.id = id;
        return event
      })
    );
  }

  getEventsByUser(): Observable < Event[] > {
    var user = this.userService.getCurrentUser();
    var query = this.afs.collection<Event>("events", ref => 
      ref.where("participants", "array-contains", user.uid));

    var myEvents = query.snapshotChanges().pipe(
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
    )
    
    return myEvents;
  }

  addEvent(event: Event): Promise < DocumentReference > {
    var user = this.userService.getCurrentUser();
    event.createdBy = user.uid;
    event.participants = [];
    event.participants.push(user.uid);
    return this.eventCollection.add(event);
  }

  updateEvent(event: Event): Promise < void > {
    return this.eventCollection.doc(event.id).update(event);
  }

  deleteEvent(id: string): Promise < void > {
    return this.eventCollection.doc(id).delete();
  }

  addParticipant(eventId: string, userId: string) : Promise < void > {
    this.getEvent(eventId).subscribe(event => {
      event.participants.push(userId);
      this.eventCollection.doc(eventId).update(event);
    });
    return;
  }

  removeParticipant(eventId: string, userId: string) : Promise < void > {
    this.getEvent(eventId).subscribe(event => {
      event.participants.splice(event.participants.indexOf(userId), 1);
      this.eventCollection.doc(eventId).update(event);
    });
    return;
  }

  isEventRegisteredByUser(event: Event): boolean {
    var user = this.userService.getCurrentUser();
    return event.participants.includes(user.uid);
  }
}
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { User } from '../../model/user.model';


/**
 * Matches the structure of a Firestore user.
 */
interface FirestoreUser
{
  id: string;
  email: string;
  shared_lists: string[];
  shopping_lists: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService 
{
  private readonly users: string = 'users';

  constructor(
    private readonly firestore: Firestore
  ) { }

  public getUserFromEmail(email: string): Observable<User>
  {
    // Construct the query
    const q = query(collection(this.firestore, this.users), where('email', '==', email));

    // Execute query
    return from(
      getDocs(q)
    ).pipe(
      filter(snap => !snap.empty),
      map(snap => {
        const data = snap.docs[0].data() as FirestoreUser;
        return this.mapToUser(data);
      })
    )
  }

  private mapToUser(firestoreUser: FirestoreUser): User
  {
    return new User(
      firestoreUser.email,
      firestoreUser.id,
      null,
      null
    );
  }
}

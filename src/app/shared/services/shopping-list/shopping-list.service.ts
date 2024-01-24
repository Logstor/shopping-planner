import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Unsubscribe, collection, doc, onSnapshot, query } from 'firebase/firestore';

import { ShoppingList } from '../../model/shopping-list';
import { Ingredient } from '../../model/Ingredient';
import { Unit } from '../../model/unit.enum';

/**
 * Matches the structure of a Firestore ingredient.
 */
interface FirestoreIngredient
{
  name: string;
  amount: number;
  unit: string;
}

/**
 * Matches the structure of a Firestore shopping list.
 */
interface FirestoreShoppingList
{
  id: string;
  name: string;
  owner: string;
  createdAt: string;
  ingredients: FirestoreIngredient[];
}

export enum FirestoreEvent
{
  ADDED,
  MODIFIED,
  REMOVED
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService 
{
  private readonly shoppingLists = 'shopping-list';

  constructor(
    private readonly firestore: Firestore,
  ) { }

  public observeShoppingLists(ids: string[], onEvent: (event: FirestoreEvent, list: ShoppingList) => void): Map<string, Unsubscribe>
  {
    // Create initial empty map
    let map = new Map<string, Unsubscribe>();

    // For each ID create an observer and put that into the map
    ids.forEach(id => {
      map.set(id, this.observeShoppingList(id, onEvent));
    });

    // Return the map
    return map;
  }

  public observeShoppingList(id: String, onEvent: (event: FirestoreEvent, list: ShoppingList) => void): Unsubscribe
  {
    // Query the shopping list
    const q = query(collection(this.firestore, `${ this.shoppingLists }/${ id }`));

    return onSnapshot(q, {
      next: (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const data = change.doc.data() as FirestoreShoppingList;
          const list = this.mapToShoppingList(data);

          switch (change.type) 
          {
            case 'added':
              onEvent(FirestoreEvent.ADDED, list);
              break;
            case 'modified':
              onEvent(FirestoreEvent.MODIFIED, list);
              break;
            case 'removed':
              onEvent(FirestoreEvent.REMOVED, list);
              break;
          }
        }
      )},
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        // Should never be called
      }
    })
  }

  private mapToShoppingList(data: FirestoreShoppingList): ShoppingList
  {
    return new ShoppingList(
      data.id,
      data.owner,
      data.name,
      new Date(Date.parse(data.createdAt)),
      data.ingredients.map(ingredient => 
        new Ingredient(
          ingredient.name,
          ingredient.amount,
          Unit[ingredient.unit as keyof typeof Unit]
        )  
      )
    );
  }
}

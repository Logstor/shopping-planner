import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Unsubscribe, addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, query, setDoc } from 'firebase/firestore';

import { ShoppingList } from '../../model/shopping-list';
import { Ingredient } from '../../model/Ingredient';
import { Unit } from '../../model/unit.enum';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

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
  id?: string;
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

  public addShoppingList(list: ShoppingList): Observable<any>
  {
    return from(
      addDoc(collection(this.firestore, this.shoppingLists), this.mapToFirestoreShoppingList(list))
    );
  }

  public updateShoppingList(list: ShoppingList): Observable<void>
  {
    return from(
      setDoc(doc(this.firestore, `${ this.shoppingLists }/${ list.id}`), this.mapToFirestoreShoppingList(list))
    );
  }

  public deleteShoppingList(id: string): Observable<void>
  {
    return from(
      deleteDoc(doc(this.firestore, `${ this.shoppingLists }/${ id }`))
    )
  }

  public addIngredient(listId: string, ingredient: Ingredient): Observable<void>
  {
    return this.retrieveShoppingList(listId)
      .pipe(
        // Add the ingredient to the shopping list
        switchMap((shoppingList: FirestoreShoppingList) => {
          // map
          const firestoreIngredient = this.mapToFirestoreIngredient(ingredient);

          // Modify the shopping list
          shoppingList.ingredients.push(firestoreIngredient);

          // Push the update
          return from(
            setDoc(doc(this.firestore, `${ this.shoppingLists }/${ listId }`), shoppingList)
          );
        })
    )
  }

  public deleteIngredient(listId: string, ingredientName: string): Observable<any>
  {
    return this.retrieveShoppingList(listId)
      .pipe(
        map((shoppingList: FirestoreShoppingList) => {
          // Find the index of the ingredient to delete
          const idx = shoppingList.ingredients.findIndex(ingredient => ingredient.name === ingredientName);

          // Delete the ingredient
          shoppingList.ingredients.splice(idx, 1);

          // Push the update
          return setDoc(doc(this.firestore, `${ this.shoppingLists }/${ listId }`), shoppingList);
        })
      )
  }

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

  /**
   * Retrieves a shopping list from the database.
   * 
   * @param id The ID of the Shopping List to retrieve.
   * @returns An observable that emits the shopping list.
   */
  private retrieveShoppingList(id: string): Observable<FirestoreShoppingList>
  {
    return from(
      getDoc(doc(this.firestore, `${ this.shoppingLists }/${ id }`))
    ).pipe(
      map(document => document.data() as FirestoreShoppingList)
    );
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

  private mapToFirestoreShoppingList(list: ShoppingList): FirestoreShoppingList
  {
    return {
      name: list.name,
      owner: list.owner,
      createdAt: list.createdAt.toISOString(),
      ingredients: list.ingredients.map(
        ingredient => this.mapToFirestoreIngredient(ingredient)
      )
    };
  }

  private mapToFirestoreIngredient(ingredient: Ingredient): FirestoreIngredient
  {
    return {
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit
    };
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

/**
 * A service that provides methods for displaying confirmation dialogs.
 */
@Injectable({
  providedIn: 'root'
})
export class DialogService 
{
  /**
   * Displays a confirmation dialog with an optional message.
   * The message should explain the action and its consequences.
   * Returns an observable that resolves to true if the user confirms the action
   * and false if the user cancels the action.
   * @param {string} [message] - An optional dialog message.
   * @returns {Observable<boolean>} An observable that resolves to either true or false.
   */
  confirm(message?: string): Observable<boolean> { return of(window.confirm(message)); }
}

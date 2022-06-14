import { Component } from '@angular/core';
import { HeaderState } from './header/HeaderState';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  headerState: HeaderState = HeaderState.Recipe;
  readonly HeaderStateType = HeaderState;

  onHeaderStateChange(nState: HeaderState)
  {
    this.headerState = nState;
  }
}

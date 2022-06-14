import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HeaderState } from './HeaderState';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit
{
  @Output('state')
  readonly currentState: EventEmitter<HeaderState> = new EventEmitter();

  readonly HeaderStateType = HeaderState;

  collapsed: boolean = true;

  constructor() { }

  ngOnInit(): void { }

}

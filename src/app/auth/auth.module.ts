import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([ 
      { path: 'auth', component: AuthComponent }
    ]),
    FormsModule,
    SharedModule
  ]
})
export class AuthModule { }

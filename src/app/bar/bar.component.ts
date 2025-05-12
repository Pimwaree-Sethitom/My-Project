import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-bar',
  imports: [RouterModule,
    LoginComponent,
    CommonModule,
    RegisterComponent,
  ],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.css'
})
export class BarComponent {


}

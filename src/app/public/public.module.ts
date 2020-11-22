import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { ComponentsModule } from '../shared/components/components.module';
import { BuyTicketComponent } from './buy-ticket/buy-ticket.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    BuyTicketComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    CarouselModule.forRoot(),
    NgxMaskModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule
  ]
})
export class PublicModule { }

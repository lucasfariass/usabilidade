import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentComponent } from './payment/payment.component';
import { ComponentsModule } from '../shared/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { CheckInComponent } from './check-in/check-in.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    DashboardComponent,
    PaymentComponent,
    CheckInComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    ModalModule.forRoot()
  ]
})
export class PrivateModule { }

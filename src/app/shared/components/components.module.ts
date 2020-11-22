import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { InputContainerComponent } from './input-container/input-container.component';
import { ModalConfirmationComponent } from './modal-confirmation/modal-confirmation.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    InputContainerComponent,
    ModalConfirmationComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    InputContainerComponent,
    ModalConfirmationComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }

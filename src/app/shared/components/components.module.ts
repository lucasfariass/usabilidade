import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { InputContainerComponent } from './input-container/input-container.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    InputContainerComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    InputContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }

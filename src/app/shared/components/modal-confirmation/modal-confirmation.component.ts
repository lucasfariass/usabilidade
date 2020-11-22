import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'ua-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.css']
})
export class ModalConfirmationComponent implements OnInit {

  mensagem: string;
  $confirmar: EventEmitter<any> = new EventEmitter();

  constructor(private modalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  close() {
    this.modalRef.hide();
  }

  confirm() {
    this.$confirmar.emit();
    this.modalRef.hide();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ModalConfirmationComponent } from 'src/app/shared/components/modal-confirmation/modal-confirmation.component';

@Component({
  selector: 'ua-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private modalService: BsModalService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      tipoPagamento: ['CARTAO'],
      numeroCartao: [null],
      titular: [null],
      validade: [null],
      codigoSeguranca: [null],
      parcelas: [null]
    });

    this.form.get('tipoPagamento').valueChanges.subscribe(
      (value) => {
        const { numeroCartao, titular, validade, codigoSeguranca, parcelas } = this.form.controls;
        if (value === 'CARTAO') {
          numeroCartao.setValidators(Validators.required);
          titular.setValidators(Validators.required);
          validade.setValidators(Validators.required);
          codigoSeguranca.setValidators(Validators.required);
          parcelas.setValidators(Validators.required);
        } else {
          numeroCartao.setValidators(null);
          titular.setValidators(null);
          validade.setValidators(null);
          codigoSeguranca.setValidators(null);
          parcelas.setValidators(null);
        }
      }
    )
  }

  public confirmarPagamento() {
    if (this.form.get('tipoPagamento').value === 'CARTAO') {
      Object.keys(this.form.controls).forEach(ctrl => {
        this.form.get(ctrl).updateValueAndValidity();
      });
      if (this.form.valid) {
        this.modalService.show(
          ModalConfirmationComponent,
          {
            class: 'modal-dialog modal-dialog-centered',
            initialState: {
              mensagem: 'Deseja mesmo efetuar a compra?'
            }
          }
        ).content.$confirmar.subscribe(() => {
          this.toastrService.success('Compra efetuada com sucesso!');
          this.router.navigate(['/public/home']);
        });
      }
    } else {
      this.toastrService.success('Boleto baixado');
      this.router.navigate(['/public/home']);
    }
  }

}

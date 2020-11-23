import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ModalConfirmationComponent } from 'src/app/shared/components/modal-confirmation/modal-confirmation.component';
import { CardTicketModel, ComboTicketsModel } from './models/tickets.model';

@Component({
  selector: 'ua-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css']
})
export class BuyTicketComponent implements OnInit {

  form: FormGroup;
  tipoPassagem: string = 'IDA_VOLTA';
  passagens: ComboTicketsModel[];
  exibirReultados = false;

  constructor(private fb: FormBuilder, private bsDatepickerConfig: BsDatepickerConfig, private modalService: BsModalService, private toastrService: ToastrService, private authService: AuthService, private router: Router) {
    this.bsDatepickerConfig.dateInputFormat = 'DD/MM/YYYY'
    this.bsDatepickerConfig.containerClass = 'theme-blue'
  }

  ngOnInit(): void {
    this.createForm();
    this.mock();
  }


  private createForm() {
    this.form = this.fb.group({
      tipo: [null],
      localSaida: [null],
      localDestino: [null],
      dataPartida: [null],
      dataChegada: [null],
      adultos: [0],
      criancas: [0],
      bebes: [0]
    });

    this.form.get('tipo').valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(value => {
      this.tipoPassagem = value;
    })
  }

  public atualizarValor(control: string, incrementar: boolean) {
    if (control) {
      var atual = parseInt(this.form.get(control).value);
      if (incrementar) {
        this.form.get(control).setValue(atual + 1);
      } else {
        if (atual - 1 >= 0) {
          this.form.get(control).setValue(atual - 1);
        }
      }
    }
  }

  public selecionarPassagem(passagem: CardTicketModel, premium: boolean) {
    if (premium) {
      passagem.selecionadoPremium = !passagem.selecionadoPremium;
      passagem.selecionadoUnion = false;
    } else {
      passagem.selecionadoUnion = !passagem.selecionadoUnion;
      passagem.selecionadoPremium = false;
    }
  }

  public fazerReserva() {
    this.modalService.show(
      ModalConfirmationComponent,
      {
        class: 'modal-dialog modal-dialog-centered',
        initialState: {
          mensagem: 'Deseja mesmo confirmar reserva para data 27/11/2020?'
        }
      }
    ).content.$confirmar.subscribe(() => {
      this.toastrService.success('Reserva efetuada com sucesso!');
      this.exibirReultados = false;
    });
  }

  public comprar() {
    if (this.authService.getUsuario()) {
      this.router.navigate(['/private/payment']);
    } else {
      this.router.navigate(['/public/login']);
    }
  }

  private mock() {
    this.passagens = [
      {
        ida: {
          numero: '043',
          conexoes: '2 conexões',
          duracao: '7:20h',
          horarioSaida: '11:00',
          horarioChegada: '18:25',
          aeroSaida: 'CVP',
          aeroChegada: 'CGH',
          data: '27/11/2020',
          precoPremium: 'R$ 2.266,68',
          precoUnion: 'R$ 2.107,38',
          selecionadoPremium: false,
          selecionadoUnion: false
        },
        volta: {
          numero: '103',
          conexoes: '2 conexões',
          duracao: '8:40h',
          horarioSaida: '6:30',
          horarioChegada: '15:10',
          aeroSaida: 'CGH',
          aeroChegada: 'CPV',
          data: '30/11/2020',
          precoPremium: 'R$ 1.266,68',
          precoUnion: 'R$ 1.083,18',
          selecionadoPremium: false,
          selecionadoUnion: false
        }
      },
      {
        ida: {
          numero: '043',
          conexoes: '2 conexões',
          duracao: '7:20h',
          horarioSaida: '11:00',
          horarioChegada: '18:25',
          aeroSaida: 'CVP',
          aeroChegada: 'CGH',
          data: '27/11/2020',
          precoPremium: 'R$ 2.266,68',
          precoUnion: 'R$ 2.107,38',
          selecionadoPremium: false,
          selecionadoUnion: false
        },
        volta: {
          numero: '103',
          conexoes: '2 conexões',
          duracao: '8:40h',
          horarioSaida: '6:30',
          horarioChegada: '15:10',
          aeroSaida: 'CGH',
          aeroChegada: 'CPV',
          data: '30/11/2020',
          precoPremium: 'R$ 1.266,68',
          precoUnion: 'R$ 1.083,18',
          selecionadoPremium: false,
          selecionadoUnion: false
        }
      }
    ]
  }


}

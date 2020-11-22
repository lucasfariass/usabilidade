import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { distinctUntilChanged } from 'rxjs/operators';
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

  constructor(private fb: FormBuilder, private bsDatepickerConfig: BsDatepickerConfig) {
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
      dataChegada: [null]
    });

    this.form.get('tipo').valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(value => {
      this.tipoPassagem = value;
    })
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

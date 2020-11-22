export interface ComboTicketsModel {
    ida: CardTicketModel,
    volta: CardTicketModel
}

export interface CardTicketModel extends TicketModel {
    selecionadoPremium: boolean;
    selecionadoUnion: boolean;
}

export interface TicketModel {
    numero: string;
    conexoes: string;
    duracao: string;
    horarioSaida: string;
    horarioChegada: string;
    aeroSaida: string;
    aeroChegada: string;
    data: string;
    precoPremium: string;
    precoUnion: string;
}
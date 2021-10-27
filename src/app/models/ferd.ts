export interface Ferd {
  //Husk å hente rute ved utskrift ved id.
  //Husk: Ved endring av Ferd må en drop down meny vises med alle ruter via et hentAlleRuter-kall
  //Det samme gjelder for Båt.
  //Når man sender inn endring av Ferd må man sende inn rute-id og båt-id
  id: number;
  baat: number;
  rute: number;
  avreisetid: string;
  ankomsttid: string;
}

export class AdminBruker {
  id: number;
  fornavn: string;
  etternavn: string;
  epost: string;
  telefonnr: string;

  constructor(
    fornavn: string,
    etternavn: string,
    epost: string,
    telefonnr: string
  ) {
    this.fornavn = fornavn;
    this.etternavn = etternavn;
    this.epost = epost;
    this.telefonnr = telefonnr;
  }
}

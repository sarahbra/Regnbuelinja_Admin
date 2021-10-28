import { Billett } from './billett';

export interface Bestilling {
  beId: number;
  kId: number;
  totalPris: number;
  betalt: boolean;
  //NB! må kjøre kall for å hente denne når knappen trykkes
  billettliste: Billett[];
}

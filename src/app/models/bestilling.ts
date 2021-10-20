import { Billett } from './billett';

export interface Bestilling {
  id: number;
  totalpris: number;
  billettliste: Billett[];
}

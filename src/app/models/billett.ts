export interface Billett {
  //Husk å hente ferd ved utskrift ved id.
  //En bestilling kan ha mange billetter. Billett er ikke en enhet i menyen
  biId: number;
  fId: number;
  voksen: boolean;
}

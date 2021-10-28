export interface Billett {
  //Husk å hente ferd ved utskrift ved id.
  //En bestilling kan ha mange billetter. Billett er ikke en enhet i menyen
  //bestillings-id = bId
  id: number;
  fId: number;
  bId: number;
  voksen: boolean;
}

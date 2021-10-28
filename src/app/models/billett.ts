export interface Billett {
  //Husk å hente ferd ved utskrift ved id.
  //En bestilling kan ha mange billetter. Billett er ikke en enhet i menyen
<<<<<<< HEAD
  biId: number;
  fId: number;
=======
  id: number;
  ferd: number;
>>>>>>> Henter ruter, båter , ferder og sletter  (#6)
  voksen: boolean;
}

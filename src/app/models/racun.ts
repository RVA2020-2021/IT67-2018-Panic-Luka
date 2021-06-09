import { Klijent } from "./klijent";
import { TipRacuna } from "./tip-racuna";


export class Racun {
    id!: number;
    naziv!: string;
    oznaka!: string;
    opis!: string;
    tipRacuna!: TipRacuna;
    klijent!: Klijent;
    
}
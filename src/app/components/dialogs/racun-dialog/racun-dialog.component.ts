import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Klijent } from 'src/app/models/klijent';
import { Racun } from 'src/app/models/racun';
import { TipRacuna } from 'src/app/models/tip-racuna';
import { KlijentService } from 'src/app/services/klijent.service';
import { RacunService } from 'src/app/services/racun.service';
import { TipRacunaService } from 'src/app/services/tip-racuna.service';

@Component({
  selector: 'app-racun-dialog',
  templateUrl: './racun-dialog.component.html',
  styleUrls: ['./racun-dialog.component.css']
})
export class RacunDialogComponent implements OnInit {

  tipoviRacuna!: TipRacuna[];
  public flag!: number;
  tipoviRacunaSubscription!: Subscription;



  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<RacunDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Racun,
              public racunService: RacunService,
              public tipRacunaService: TipRacunaService
            
              ) { }

  ngOnInit(): void {
    this.tipoviRacunaSubscription =  this.tipRacunaService.getAllTipRacunas()
      .subscribe(TipoviRacuna => {
        this.tipoviRacuna = TipoviRacuna;
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
        
      }

      
  }

  ngOnDestroy() {
    this.tipoviRacunaSubscription.unsubscribe();
  }

  compareTo(a: any, b: any) {
    return a.id === b.id;
  }

  public add(): void {
    this.racunService.addRacun(this.data)
      .subscribe( () => {
        this.snackBar.open('Uspesno dodat novi racun!', 'U redu', {
          duration: 2500
        })
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Dogodila se greska!' , 'Zatvori', {
          duration: 1500
        })
        
      }
  }

  public update(): void{
    this.racunService.updateRacun(this.data)
      .subscribe(() => {
        this.snackBar.open('Uspesno modifikovan racun!' , 'U redu', {
          duration: 2500
        })
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Dogodila se greska!' , 'Zatvori', {
          duration: 1500
        })
      }
  }


  public delete(): void{
    this.racunService.deleteRacun(this.data.id)
    .subscribe(() => {
      this.snackBar.open('Uspesno obrisan racun!' , 'U redu', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Dogodila se greska!' , 'Zatvori', {
        duration: 1500
      })
    };
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmena'  ,'U redu', {
      duration:1000
    });

  }

}

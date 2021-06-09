import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Klijent } from 'src/app/models/klijent';
import { Kredit } from 'src/app/models/kredit';
import { KlijentService } from 'src/app/services/klijent.service';
import { KreditService } from 'src/app/services/kredit.service';

@Component({
  selector: 'app-klijent-dialog',
  templateUrl: './klijent-dialog.component.html',
  styleUrls: ['./klijent-dialog.component.css']
})
export class KlijentDialogComponent implements OnInit {

  krediti!: Kredit[];
  public flag!: number;
  klijentSubscription!: Subscription;


  constructor(public snackBar: MatSnackBar,
             public dialogRef: MatDialogRef<KlijentDialogComponent>,
             @Inject(MAT_DIALOG_DATA) public data: Klijent,
             public klijentService: KlijentService,
             public kreditService: KreditService) { }

  ngOnInit(): void {
   this.klijentSubscription =  this.kreditService.getAllKredits()
      .subscribe(krediti => {
        this.krediti = krediti
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
        
      }
  }

  ngOnDestroy(): void {
    this.klijentSubscription.unsubscribe();
  }

  compareTo(a: any, b: any) {
    return a.id == b.id;
  }

  public add(): void {
    this.klijentService.addKlijent(this.data)
      .subscribe(()=> {
        this.snackBar.open('Uspesno dodat klijent', 'U redu', {
          duration: 2500
        })
      }),
      (error: Error) => {
        console.log(error.name + '--->' + error.message)
        this.snackBar.open('Dogodila se greska. Pokusajte ponovo! ' ,'Zatvori', {
          duration:2500
        });
      };
  }

  public update(): void {
    this.klijentService.updateKlijent(this.data)
      .subscribe(data => {
        this.snackBar.open('Uspesno modifikovan klijent ' + this.data.ime ,'U redu', {
          duration:2500
        });
      }),
      (error: Error) => {
        console.log(error.name + '--->' + error.message)
        this.snackBar.open('Dogodila se greska. Pokusajte ponovo! ' ,'Zatvori', {
          duration:2500
        });
      };
  } 

  public delete(): void {
    this.klijentService.deleteKlijent(this.data.id)
      .subscribe(data => {
        this.snackBar.open('Uspesno obrisan klijent ' + this.data.ime ,'U redu', {
          duration:2500
        });
      }),
      (error: Error) => {
        console.log(error.name + '--->' + error.message)
        this.snackBar.open('Dogodila se greska. Pokusajte ponovo! ' ,'Zatvori', {
          duration:2500
        });
      };
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmena'  ,'U redu', {
      duration:1000
    });

  }

}

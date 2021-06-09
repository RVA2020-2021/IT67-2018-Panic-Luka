import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipRacuna } from 'src/app/models/tip-racuna';
import { TipRacunaService } from 'src/app/services/tip-racuna.service';

@Component({
  selector: 'app-tip-racuna-dialog',
  templateUrl: './tip-racuna-dialog.component.html',
  styleUrls: ['./tip-racuna-dialog.component.css']
})
export class TipRacunaDialogComponent implements OnInit {

  public flag!: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<TipRacunaDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: TipRacuna,
              public tipRacunaService: TipRacunaService) { }

  ngOnInit(): void {
  }

  public add(): void {
    this.tipRacunaService.addTipRacuna(this.data)
      .subscribe(data => {
            this.snackBar.open('Uspesno dodat tip racuna: ' + this.data.naziv, 'U redu', {
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

  public update(): void {
    this.tipRacunaService.updateTipRacuna(this.data)
      .subscribe(data => {
        this.snackBar.open('Uspesno modifikovan tip racuna ' + data.naziv ,'U redu', {
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
    this.tipRacunaService.deleteTipRacuna(this.data.id)
      .subscribe(data => {
        this.snackBar.open('Uspesno obrisan tip racuna ' + data.naziv ,'U redu', {
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

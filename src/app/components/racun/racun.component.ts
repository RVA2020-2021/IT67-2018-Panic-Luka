import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Klijent } from 'src/app/models/klijent';
import { Racun } from 'src/app/models/racun';
import { TipRacuna } from 'src/app/models/tip-racuna';
import { KlijentService } from 'src/app/services/klijent.service';
import { RacunService } from 'src/app/services/racun.service';
import { RacunDialogComponent } from '../dialogs/racun-dialog/racun-dialog.component';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})
export class RacunComponent implements OnInit, OnChanges {

  displayedColumns = ['id', 'naziv', 'oznaka', 'opis',  'klijent', 'tipRacuna','actions'];
  dataSource!: MatTableDataSource<Racun>;
  subscription!: Subscription;

   @Input() selektovanKlijent!: Klijent;




  constructor(private racunService: RacunService,
                private dialog: MatDialog) { }

  ngOnInit(): void {
    //console.log('selektovan tip racuna: ' + this.selektovanTipRacuna);
    //this.loadData();

  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  ngOnChanges(): void {
    if(this.selektovanKlijent.id){
      this.loadData();
    }

   
  }

  public loadData() {
    this.subscription = this.racunService.getRacunZaKlijenta(this.selektovanKlijent.id)
     .subscribe(data => {
       console.log(data)
       this.dataSource = new MatTableDataSource(data);
     }),
     (error: Error) => {
       console.log(error.name + ' ' + error.message)
     }
   }
 

   public openDialog(flag: number, id?: number, naziv?: string, oznaka?: string, opis?: string, tipRacuna?: TipRacuna, klijent?: Klijent){
        const dialogRef = this.dialog.open(RacunDialogComponent,
          {data: {id, naziv, oznaka, opis, tipRacuna, klijent}
        });
        dialogRef.componentInstance.flag = flag;
        if(flag ===1)
        {
          dialogRef.componentInstance.data.klijent = this.selektovanKlijent
        }

        dialogRef.afterClosed()
        .subscribe(result => {
          if(result === 1){
            this.loadData();
          }
        })

   }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { TipRacuna } from 'src/app/models/tip-racuna';
import { TipRacunaService } from 'src/app/services/tip-racuna.service';
import { TipRacunaDialogComponent } from '../dialogs/tip-racuna-dialog/tip-racuna-dialog.component';

@Component({
  selector: 'app-tip-racuna',
  templateUrl: './tip-racuna.component.html',
  styleUrls: ['./tip-racuna.component.css']
})
export class TipRacunaComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'naziv', 'oznaka', 'opis', 'actions'];
  dataSource!: MatTableDataSource<TipRacuna>;
  tipRacunaSubscription!:  Subscription;

  constructor(private tipRacunaService: TipRacunaService,
                public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.tipRacunaSubscription.unsubscribe();

  }
 
  public loadData() {
    this.tipRacunaSubscription = this.tipRacunaService.getAllTipRacunas()
      .subscribe(data => {
      //console.log(data);
      this.dataSource = new MatTableDataSource(data);
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message)
    }
  }

  public openDialog(flag: number, id?: number, naziv?: string, oznaka?: string, opis?: string) {
    const dialogRef = this.dialog.open(TipRacunaDialogComponent, {data: {id, naziv, oznaka, opis}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
      .subscribe(result => {
        if(result === 1)
        {
          this.loadData();
        }
      }) 
  }

 

  // applyFilter(filterValue: string){
  //   filterValue = filterValue.trim();
  //   filterValue = filterValue.toLocaleLowerCase();
  //   this.dataSource.filter = filterValue;


  // }

  

}

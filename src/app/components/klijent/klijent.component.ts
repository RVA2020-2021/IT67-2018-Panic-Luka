import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Klijent } from 'src/app/models/klijent';
import { Kredit } from 'src/app/models/kredit';
import { KlijentService } from 'src/app/services/klijent.service';
import { KlijentDialogComponent } from '../dialogs/klijent-dialog/klijent-dialog.component';

@Component({
  selector: 'app-klijent',
  templateUrl: './klijent.component.html',
  styleUrls: ['./klijent.component.css']
})
export class KlijentComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'ime', 'prezime', 'broj_lk', 'kredit', 'actions'];
  selektovanKlijent!: Klijent;
  klijentSubscription!: Subscription;
  dataSource!: MatTableDataSource<Klijent>;


  constructor(public klijentService: KlijentService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.klijentSubscription.unsubscribe();
  }

  public loadData() {
   this.klijentSubscription =  this.klijentService.getAllKlijents()
      .subscribe((data) => {
          this.dataSource = new MatTableDataSource(data);
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message)
      }
  }

  public openDialog(flag: number, id?: number, ime?: string, prezime?: string, brojLk?: string, kredit?: Kredit) {
    const dialogRef = this.dialog.open(KlijentDialogComponent,
      {data: {id, ime, prezime, brojLk, kredit}});
      dialogRef.componentInstance.flag = flag;

      dialogRef.afterClosed().subscribe(result => {
        if(result === 1)
        {
          this.loadData();
        }
      })
  }

  selectRow(row: any){
    //console.log(row);
    this.selektovanKlijent = row;
    //console.log(this.selektovanKlijent);
  }

  // applyFilter(filterValue: string){
  //   filterValue = filterValue.trim();
  //   filterValue = filterValue.toLocaleLowerCase();
  //   this.dataSource.filter = filterValue;
  // }
}

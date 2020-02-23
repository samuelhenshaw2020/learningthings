import { Injectable } from '@angular/core';
import { MediaManagerComponent } from './media-manager/media-manager.component';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private dialog: MatDialog
  ) { }

  imageSelectDialog(){
    return this.dialog.open(MediaManagerComponent, {
       minWidth: '90%',
       minHeight: "500px",
       maxHeight: "500px",
       disableClose: true,
       panelClass: 'dialo'
     });
   }


   
 
}

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { MediaManagerComponent } from './components/users/media-manager/media-manager.component';
import { AddProductComponent } from './components/users/product/add-product/add-product.component';
import { LyDialog } from '@alyle/ui/dialog';
import { LyTheme2, Platform } from '@alyle/ui';
import { AddExperienceComponent } from './dialogs/add-experience/add-experience.component';
import { AddEducationComponent } from './dialogs/add-education/add-education.component';
import { AddProjectComponent } from './dialogs/add-project/add-project.component';
import { HttpClient } from '@angular/common/http';


const STYLES_DIALOG = ({
  width: '100vw',
  height: '100vh',
  borderRadius: 0
});

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private dialog: MatDialog,
    private _dialog: LyDialog,
    private _theme: LyTheme2,
    private http: HttpClient

  ) { }

  filterTable(val, index?){
     
    let tbody = document.getElementsByTagName('tbody')[0];
    let tr = tbody.getElementsByTagName('tr');
    let td;
    let textval: string;
    let inputtext = val.toUpperCase();
    for(var i=0; i<tr.length; i++){
      td = tr[i].getElementsByTagName('td')[index]
      if(td){
        textval = td.innerText.toUpperCase() || td.textContent.toUpperCase();
        if(textval.indexOf(inputtext) > -1){
          console.log('yes')
          tr[i].style.display = "";
        }else{
          console.log('no');
          tr[i].style.display = "none";
        }
      }
    }
    
  }

  get_color(){
    return this.http.get<any>("/assets/color.json");
  }

  get_nationality(){
    return this.http.get<any>('/assets/nationalities.json');
  }

  
    
  
  confirmDialog(text){
      return this.dialog.open(ConfirmDialogComponent, {
        width: "350px",
        panelClass: "dialog",
        disableClose: true,
        data: text
      })
  }



  mediaBox(){
    return this.dialog.open(MediaManagerComponent, {
      maxWidth: '1000px',
      minWidth: (window.innerWidth > 768 ? '1000px': '97%'),
      minHeight: "500px",
      maxHeight: "500px",
      disableClose: true,
      panelClass: ['dialog']
    });
  }

  experience(){
    return this.dialog.open(AddExperienceComponent, {
      minWidth: '350px',
      disableClose: true,
      data: {}
    });
  }

  project(){
    return this.dialog.open(AddProjectComponent, {
      minWidth: '350px',
      disableClose: true,
      data: {}
    });
  }

  education(){
    return this.dialog.open(AddEducationComponent, {
      minWidth: '350px',
      disableClose: true,
      data: {}
    });
  }




  addProduct(){
    // return this.dialog.open<AddProductComponent>(AddProductComponent, {
    //   width: "100%",
    //   panelClass: "dialog",
    //   disableClose: true,
    //   data: {}
    // })
    // return this._dialog.open<AddProductComponent>(AddProductComponent, {
    //   maxWidth: null, // current style overrides
    //   maxHeight: null, // current style overrides
    //   containerClass: this._theme.style(STYLES_DIALOG)
    // });
}
 


 


}


import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PostAnalysisComponent } from '../post-analysis/post-analysis.component';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {

  selected = "All Users";
  selectedPack = "All Pack";
  usersList = [];

  constructor(
    private service: UserserviceService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.service.getAllSiteInfo().subscribe(d => this.usersList = d.message );
  }

  

  // Filter Table model
  filterTable($event){
    let tbody = document.getElementsByTagName('tbody')[0];
    let tr = tbody.getElementsByTagName('tr');
    let td;
    let textval: string;
    let inputtext = $event.target.value.toUpperCase();
    
    for(var i=0; i<tr.length; i++){
      td = tr[i].getElementsByTagName('td')[0];
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



  advanceSearch(){
    this.service.postAdvanceSearch(null).subscribe(
      data => {
        this.usersList = data;
        console.log(this.usersList);
      },
      err => {

      }
      );
  }


  /*******************************
   * Show post analysis
   *******************************/

  postAnalysis(){
    this.dialog.open(PostAnalysisComponent, {
      maxWidth: '500px'
    })
  }
  

 

  

}

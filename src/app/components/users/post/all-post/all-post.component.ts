import { Component, OnInit, AfterContentInit } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PostAnalysisComponent } from '../post-analysis/post-analysis.component';
import { PostService } from '../post.service';
import { from, pipe, BehaviorSubject, Observable } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';
import { post_model } from '../post.model';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {

  


  isLoading = false;
  postList = [];
  postCat = [];
  q = '';
  ifSearch = false;
  sel_category = 'All Categories';
  firstPage = 1;
  lastPage;
  currentPage;
  totalPost =null;

 
  

  constructor(
    private service: UserserviceService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private postServ: PostService,
    private router: Router
  ) { }

  ngOnInit() {

    // this.fetch('current');
    
      this.postServ.blogall.subscribe( data => {
        this.postList = data.data;
        this.lastPage = this.postServ.blogall.value.last_page;
        this.totalPost = this.postServ.blogall.value.total;
        this.currentPage = this.postServ.blogall.value.current_page;
        console.log(data)

        if(data.data.length < 1){
          this.service.getAllPost().subscribe((nd:any) => {
           console.log(nd)
           this.postServ.blogall.next(nd)
          })

          console.log(3)
        }
        
      })

      this.postServ.category.subscribe(d => {
        this.postCat = d.categories;
      })

      
      
      
  }

  fetchPost(val){

    let nextUrl = this.postServ.blogall.value.next_page_url;
    let prevUrl = this.postServ.blogall.value.prev_page_url;
    let whereTo = this.postServ.blogall.value.current_page;
    let headerOption;

    if(val  === 'next'){
      whereTo++;
      if(nextUrl !== null ){
        this.fetch(whereTo);
      }
    }
    
    if(val === 'prev'){
      whereTo--;
      if(prevUrl !== null ){
        this.fetch(whereTo);
      }
    }

    if(val === 'first'){
      this.fetch(this.firstPage);
    }

    if(val === 'last'){
      this.fetch(this.lastPage);
    }

    if(val === 'current'){
      this.fetch(this.currentPage);
    }



    

  }

  fetch(pageNo){
    this.isLoading = true;
    let headerOption = {
      params: {
        'page': String(pageNo)
      }
    }
    this.service.getAllPost(headerOption).subscribe(
      async d=>{
      this.postServ.blogall.next(d);
     this.currentPage = this.postServ.blogall.value.current_page;
      console.log(d);
      window.location.href = "dash/post/all#table";
      this.isLoading = false;
    }, 
    err => {
      this.snackbar.open("Operation failed! please try again or contact admin via support", "close", {duration: 8000})
    })
  }



  

  

  // Filter Table model
  filterTable(val, index){
    this.sel_category = (val == ''? 'All Categories': val);  //checks if val is empty or not
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



  async advanceSearch(){
    await this.service.postAdvanceSearch(this.q).subscribe(
      data => {
        this.postList = data;
        this.postServ.blogall.next(data);
        console.log(this.postList);
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

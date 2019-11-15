import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {  ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  public info: any;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.activatedRoute.data.subscribe(
    //   data =>{
    //   // console.log(data.info.message)
    //   // this.info = data.info.message;
    // },
    // err => {

    // }
    
    // );
    
  }


}

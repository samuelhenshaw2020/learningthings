import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.css']
})
export class WebsitesComponent implements OnInit {

  sites = [];

  constructor(
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeRoute.data.subscribe(
      data => {
        console.log(data);
        this.sites = data.web.message;
      },
      err => {
        console.log(err)
      }
    );
  }

}

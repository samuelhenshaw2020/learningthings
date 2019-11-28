import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-manage-media',
  templateUrl: './manage-media.component.html',
  styleUrls: ['./manage-media.component.css']
})
export class ManageMediaComponent implements OnInit {

  medialist;
  base;

  constructor(
    private service: UserserviceService,
    private activeRoute: ActivatedRoute
  ) { 
    this.base = this.service.baseImgUrl;
  }

  ngOnInit() {
    this.activeRoute.data.subscribe( event =>{
      this.medialist = event.media;
      console.log(this.medialist)
      
    });
  }

  prev;
selectLink(index){
  this.prev = index;
}


}

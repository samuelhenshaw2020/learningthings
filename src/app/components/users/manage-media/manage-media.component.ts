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

  constructor(
    private service: UserserviceService
  ) { }

  ngOnInit() {
    this.service.postImageUpload(null).subscribe( event =>{
      this.medialist = event;
    });
  }

  prev;
selectLink(index){
  this.prev = index;
}


}

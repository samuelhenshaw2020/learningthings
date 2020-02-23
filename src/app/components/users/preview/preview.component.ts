import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  height = window.innerHeight;
  link:any ;
  constructor(
    private userS: UserserviceService,
    private domSanitize: DomSanitizer
  ) { }

  ngOnInit() {
    
  
    
    this.userS.siteData().subscribe(
      lk => {
        this.link = this.domSanitize.bypassSecurityTrustResourceUrl(decodeURI(lk.link))
        console.log(lk.link )
        
      }
    );

   

    
  }




}

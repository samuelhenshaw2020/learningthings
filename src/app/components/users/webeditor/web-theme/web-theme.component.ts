import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';
import { BehaviorSubject } from 'rxjs';
import { identity_model } from '../web.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-web-theme',
  templateUrl: './web-theme.component.html',
  styleUrls: ['./web-theme.component.css']
})
export class WebThemeComponent implements OnInit {

  theme;
  all_theme = new BehaviorSubject<any>([]);
  type;
  sel_theme;
  prev = 0;
  baseimg = ''

  constructor(
    private activeRoute: ActivatedRoute,
    private serv: UserserviceService,
    private snackbar: MatSnackBar
  ) { 
    this.baseimg =this.serv.baseImgUrl
  }

  ngOnInit() {
    this.type = this.serv.siteData().value.template_id;
    this.prev = this.serv.siteData().value.template_id;

    this.selected(this.type, 0);

    this.activeRoute.data.subscribe(d => {

      this.all_theme.next(d.theme);


      this.sel_theme = d.theme.filter(f => {
        return f.template_id == this.type;
      })


      this.all_theme.subscribe(s => {
        this.theme = s.filter(f => {
          return f.type == this.sel_theme[0].type
        })
        console.log(this.theme)
      })





    }, err => {

    })
  }

 

  submitted = false;
  selected(index, val) {
    
    if(val ===0){
      this.prev = index;
    }

    if(val ===1){
      this.submitted = true;
      let newData: identity_model = {
        // site_data: {
          about: {
              enabled: this.serv.siteData().value.about.enabled,
              about: this.serv.siteData().value.about.about
          },
          business_name: this.serv.siteData().value.business_name,
          color: this.serv.siteData().value.color,
          contact: {
              address: this.serv.siteData().value.contact.address,
              email: this.serv.siteData().value.contact.email,
              enabled: this.serv.siteData().value.contact.enabled,
              phone: this.serv.siteData().value.contact.phone
          },
          description: this.serv.siteData().value.description,
          gallery: {
              enabled: this.serv.siteData().value.gallery.enabled,
              gallery: this.serv.siteData().value.gallery.gallery
          },
          header_image:  this.serv.siteData().value.header_image,
          header_title: this.serv.siteData().value.header_title,
          link: this.serv.siteData().value.link,
          logo:  this.serv.siteData().value.link,
          mission: {
              enabled: this.serv.siteData().value.mission.enabled ,
              mission: this.serv.siteData().value.mission.mission
             
          },
          portfolio: {
              description:  this.serv.siteData().value.portfolio.description,
              image: this.serv.siteData().value.portfolio.image,
              profile: this.serv.siteData().value.portfolio.profile,
              skills: this.serv.siteData().value.portfolio.skills
      
          },
          service: {
              enabled: this.serv.siteData().value.service.enabled,
              services: this.serv.siteData().value.service.services
          },
          short: this.serv.siteData().value.short,
          id: this.serv.siteData().value.id,
          social_media: {
              enabled: this.serv.siteData().value.social_media.enabled,
              handles: this.serv.siteData().value.social_media.handles
          },
          template_id: index,
          user_id: this.serv.siteData().value.user_id,
          vission: {
              enabled: this.serv.siteData().value.vission.enabled,
              vission: this.serv.siteData().value.vission.vission
      
          }
      
      
        //  }
      }
  
      this.serv.postWebIdentityData(newData).subscribe((d) => {
        console.log(d);
        this.submitted = false;
        this.prev = index;
        this.serv.siteData().next(d);
        this.snackbar.open("Data saved Successfully!", '', {
          duration: 4000
        })
      }, err=>{
        this.submitted = false;
        this.snackbar.open("An error occured!", " close", {duration: 4000})
      })
    }
  
    }
   
  }



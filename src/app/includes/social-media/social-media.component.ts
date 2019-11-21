import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-social-media',
  template: `
    <div class="d-flex bg-secondary">
      <span class="bg-dark text-light p-2  ">
              <i [class]="soc_icon"></i>
      </span>
      <input type="text" class="w-100 text-center" [value]="soc_link">
    </div>

  `,
  styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent implements OnInit {

  @Input() soc_link = null;
  @Input() soc_icon = null;

  constructor() { }

  ngOnInit() {
  }

}

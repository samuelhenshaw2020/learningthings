import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader-block-one',
  template: `
  
  <div>
          <div class="theme1 p-5">

                  <div class="d-flex justify-content-center">
                          <div class="w-25 br-30 bg-light p-3"></div>
                          <div class=" br-30 bg-light p-3 mx-2" style="width: 10%"></div>
                          <div class="w-25 br-30 bg-light p-3"></div>
                  </div>
          </div>

          <br><br>

          <div class="card-columns">
                  <div class="card border-0 theme2 p-5">
                          <div class="d-flex justify-content-center">
                                  <div class=" br-30 bg-light p-3 mx-2" style="width: 10%"></div>

                          </div>
                  </div>
                  <div class="card border-0 theme2 p-5">
                          <div class="w-75 br-30 bg-light p-3"></div><br><br>
                          <div class="w-75 br-30 bg-light p-2"></div><br><br>
                          <div class="w-25 br-30 bg-light p-2"></div>

                  </div>
                  <div class="card border-0 theme2 p-5">
                          <div class=" br-30 bg-light p-3 mx-2" style="width: 10%"></div>
                  </div>
          </div>
  </div>
`,
  styleUrls: ['./loader-block-one.component.css']
})
export class LoaderBlockOneComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

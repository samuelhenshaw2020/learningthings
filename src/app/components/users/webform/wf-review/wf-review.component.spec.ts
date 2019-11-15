import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WfReviewComponent } from './wf-review.component';

describe('WfReviewComponent', () => {
  let component: WfReviewComponent;
  let fixture: ComponentFixture<WfReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WfReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WfReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

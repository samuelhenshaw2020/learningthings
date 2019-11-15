import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAnalysisComponent } from './post-analysis.component';

describe('PostAnalysisComponent', () => {
  let component: PostAnalysisComponent;
  let fixture: ComponentFixture<PostAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

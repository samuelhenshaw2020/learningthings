import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsitePendingComponent } from './website-pending.component';

describe('WebsitePendingComponent', () => {
  let component: WebsitePendingComponent;
  let fixture: ComponentFixture<WebsitePendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsitePendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsitePendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

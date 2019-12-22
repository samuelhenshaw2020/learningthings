import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteSuspendedComponent } from './website-suspended.component';

describe('WebsiteSuspendedComponent', () => {
  let component: WebsiteSuspendedComponent;
  let fixture: ComponentFixture<WebsiteSuspendedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteSuspendedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteSuspendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

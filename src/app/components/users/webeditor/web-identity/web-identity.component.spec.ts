import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebIdentityComponent } from './web-identity.component';

describe('WebIdentityComponent', () => {
  let component: WebIdentityComponent;
  let fixture: ComponentFixture<WebIdentityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebIdentityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

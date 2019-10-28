import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderdotComponent } from './loaderdot.component';

describe('LoaderdotComponent', () => {
  let component: LoaderdotComponent;
  let fixture: ComponentFixture<LoaderdotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderdotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderdotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

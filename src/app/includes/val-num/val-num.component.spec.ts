import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValNumComponent } from './val-num.component';

describe('ValNumComponent', () => {
  let component: ValNumComponent;
  let fixture: ComponentFixture<ValNumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValNumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValNumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

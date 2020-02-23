import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductDialogComponent } from './view-product-dialog.component';

describe('ViewProductDialogComponent', () => {
  let component: ViewProductDialogComponent;
  let fixture: ComponentFixture<ViewProductDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProductDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

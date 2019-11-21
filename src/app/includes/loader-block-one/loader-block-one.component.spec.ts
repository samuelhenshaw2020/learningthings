import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderBlockOneComponent } from './loader-block-one.component';

describe('LoaderBlockOneComponent', () => {
  let component: LoaderBlockOneComponent;
  let fixture: ComponentFixture<LoaderBlockOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderBlockOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderBlockOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

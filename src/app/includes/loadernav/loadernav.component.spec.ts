import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadernavComponent } from './loadernav.component';

describe('LoadernavComponent', () => {
  let component: LoadernavComponent;
  let fixture: ComponentFixture<LoadernavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadernavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdVariationComponent } from './prod-variation.component';

describe('ProdVariationComponent', () => {
  let component: ProdVariationComponent;
  let fixture: ComponentFixture<ProdVariationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdVariationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdVariationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

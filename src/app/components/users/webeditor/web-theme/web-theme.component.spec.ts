import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebThemeComponent } from './web-theme.component';

describe('WebThemeComponent', () => {
  let component: WebThemeComponent;
  let fixture: ComponentFixture<WebThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

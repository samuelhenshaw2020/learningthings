import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBadTokenComponent } from './delete-bad-token.component';

describe('DeleteBadTokenComponent', () => {
  let component: DeleteBadTokenComponent;
  let fixture: ComponentFixture<DeleteBadTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteBadTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBadTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

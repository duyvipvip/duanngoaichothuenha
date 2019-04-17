import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XemchitietnhaComponent } from './xemchitietnha.component';

describe('XemchitietnhaComponent', () => {
  let component: XemchitietnhaComponent;
  let fixture: ComponentFixture<XemchitietnhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XemchitietnhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XemchitietnhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

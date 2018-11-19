import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyhoahongComponent } from './quanlyhoahong.component';

describe('QuanlyhoahongComponent', () => {
  let component: QuanlyhoahongComponent;
  let fixture: ComponentFixture<QuanlyhoahongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanlyhoahongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanlyhoahongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

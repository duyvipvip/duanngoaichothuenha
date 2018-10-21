import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterclientComponent } from './footerclient.component';

describe('FooterclientComponent', () => {
  let component: FooterclientComponent;
  let fixture: ComponentFixture<FooterclientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterclientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

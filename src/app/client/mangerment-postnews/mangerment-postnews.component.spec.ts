import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MangermentPostnewsComponent } from './mangerment-postnews.component';

describe('MangermentPostnewsComponent', () => {
  let component: MangermentPostnewsComponent;
  let fixture: ComponentFixture<MangermentPostnewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangermentPostnewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangermentPostnewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabuserComponent } from './tabuser.component';

describe('TabuserComponent', () => {
  let component: TabuserComponent;
  let fixture: ComponentFixture<TabuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

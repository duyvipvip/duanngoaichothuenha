import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemduyetbaidangComponent } from './kiemduyetbaidang.component';

describe('KiemduyetbaidangComponent', () => {
  let component: KiemduyetbaidangComponent;
  let fixture: ComponentFixture<KiemduyetbaidangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemduyetbaidangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemduyetbaidangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

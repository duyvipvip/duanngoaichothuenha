import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiyeucauthuenhaComponent } from './guiyeucauthuenha.component';

describe('GuiyeucauthuenhaComponent', () => {
  let component: GuiyeucauthuenhaComponent;
  let fixture: ComponentFixture<GuiyeucauthuenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiyeucauthuenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiyeucauthuenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

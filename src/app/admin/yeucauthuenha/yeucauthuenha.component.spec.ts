import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YeucauthuenhaComponent } from './yeucauthuenha.component';

describe('YeucauthuenhaComponent', () => {
  let component: YeucauthuenhaComponent;
  let fixture: ComponentFixture<YeucauthuenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YeucauthuenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YeucauthuenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

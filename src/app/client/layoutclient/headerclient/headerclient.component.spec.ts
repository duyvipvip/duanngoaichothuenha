import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderclientComponent } from './headerclient.component';

describe('HeaderclientComponent', () => {
  let component: HeaderclientComponent;
  let fixture: ComponentFixture<HeaderclientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderclientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedPeopleComponent } from './connected-people.component';

describe('ConnectedPeopleComponent', () => {
  let component: ConnectedPeopleComponent;
  let fixture: ComponentFixture<ConnectedPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectedPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectedPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

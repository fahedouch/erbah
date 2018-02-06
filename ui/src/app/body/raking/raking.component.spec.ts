import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RakingComponent } from './raking.component';

describe('RakingComponent', () => {
  let component: RakingComponent;
  let fixture: ComponentFixture<RakingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RakingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOnServerComponent } from './user-on-server.component';

describe('UserOnServerComponent', () => {
  let component: UserOnServerComponent;
  let fixture: ComponentFixture<UserOnServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOnServerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOnServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

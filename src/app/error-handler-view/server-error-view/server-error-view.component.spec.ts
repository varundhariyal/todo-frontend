import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerErrorViewComponent } from './server-error-view.component';

describe('ServerErrorViewComponent', () => {
  let component: ServerErrorViewComponent;
  let fixture: ComponentFixture<ServerErrorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerErrorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerErrorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

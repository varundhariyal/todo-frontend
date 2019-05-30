import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiHistoryComponent } from './multi-history.component';

describe('MultiHistoryComponent', () => {
  let component: MultiHistoryComponent;
  let fixture: ComponentFixture<MultiHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

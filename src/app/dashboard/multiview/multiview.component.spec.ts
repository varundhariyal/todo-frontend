import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiviewComponent } from './multiview.component';

describe('MultiviewComponent', () => {
  let component: MultiviewComponent;
  let fixture: ComponentFixture<MultiviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

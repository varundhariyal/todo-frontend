import { TestBed } from '@angular/core/testing';

import { MultiTodoService } from './multi-todo.service';

describe('MultiTodoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MultiTodoService = TestBed.get(MultiTodoService);
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostAvailableComponent } from './new-post-available.component';

describe('NewPostAvailableComponent', () => {
  let component: NewPostAvailableComponent;
  let fixture: ComponentFixture<NewPostAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPostAvailableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPostAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

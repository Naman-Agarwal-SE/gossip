import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedbyDialogComponent } from './likedby-dialog.component';

describe('LikedbyDialogComponent', () => {
  let component: LikedbyDialogComponent;
  let fixture: ComponentFixture<LikedbyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikedbyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedbyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

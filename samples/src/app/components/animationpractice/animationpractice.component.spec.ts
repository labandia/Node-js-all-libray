import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationpracticeComponent } from './animationpractice.component';

describe('AnimationpracticeComponent', () => {
  let component: AnimationpracticeComponent;
  let fixture: ComponentFixture<AnimationpracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimationpracticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationpracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

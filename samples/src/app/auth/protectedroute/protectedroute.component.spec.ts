import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectedrouteComponent } from './protectedroute.component';

describe('ProtectedrouteComponent', () => {
  let component: ProtectedrouteComponent;
  let fixture: ComponentFixture<ProtectedrouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtectedrouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectedrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

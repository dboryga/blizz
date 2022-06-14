import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlizzButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: BlizzButtonComponent;
  let fixture: ComponentFixture<BlizzButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlizzButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlizzButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

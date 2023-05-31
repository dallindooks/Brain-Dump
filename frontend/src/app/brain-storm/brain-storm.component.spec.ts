import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrainStormComponent } from './brain-storm.component';

describe('BrainStormComponent', () => {
  let component: BrainStormComponent;
  let fixture: ComponentFixture<BrainStormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrainStormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrainStormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

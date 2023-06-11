import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmEventDialogComponent } from './alarm-event-dialog.component';

describe('AlarmEventDialogComponent', () => {
  let component: AlarmEventDialogComponent;
  let fixture: ComponentFixture<AlarmEventDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AlarmEventDialogComponent]
    });
    fixture = TestBed.createComponent(AlarmEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

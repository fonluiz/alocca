import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesSchedulesComponent } from './classes-schedules.component';

describe('ClassesSchedulesComponent', () => {
  let component: ClassesSchedulesComponent;
  let fixture: ComponentFixture<ClassesSchedulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesSchedulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorsContainerComponent } from './professors-container.component';

describe('ProfessorsContainerComponent', () => {
  let component: ProfessorsContainerComponent;
  let fixture: ComponentFixture<ProfessorsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

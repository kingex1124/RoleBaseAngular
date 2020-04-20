import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoCompetenceComponent } from './no-competence.component';

describe('NoCompetenceComponent', () => {
  let component: NoCompetenceComponent;
  let fixture: ComponentFixture<NoCompetenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoCompetenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

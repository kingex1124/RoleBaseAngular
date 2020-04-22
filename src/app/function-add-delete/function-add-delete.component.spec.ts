import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionAddDeleteComponent } from './function-add-delete.component';

describe('FunctionAddDeleteComponent', () => {
  let component: FunctionAddDeleteComponent;
  let fixture: ComponentFixture<FunctionAddDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionAddDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionAddDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

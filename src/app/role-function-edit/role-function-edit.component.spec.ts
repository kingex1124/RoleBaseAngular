import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleFunctionEditComponent } from './role-function-edit.component';

describe('RoleFunctionEditComponent', () => {
  let component: RoleFunctionEditComponent;
  let fixture: ComponentFixture<RoleFunctionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleFunctionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleFunctionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

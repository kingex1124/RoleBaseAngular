import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleUserEditComponent } from './role-user-edit.component';

describe('RoleUserEditComponent', () => {
  let component: RoleUserEditComponent;
  let fixture: ComponentFixture<RoleUserEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleUserEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

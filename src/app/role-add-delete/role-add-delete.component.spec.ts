import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAddDeleteComponent } from './role-add-delete.component';

describe('RoleAddDeleteComponent', () => {
  let component: RoleAddDeleteComponent;
  let fixture: ComponentFixture<RoleAddDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleAddDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleAddDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

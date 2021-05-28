import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentGroupsComponent } from './equipment-groups.component';

describe('EquipmentGroupsComponent', () => {
  let component: EquipmentGroupsComponent;
  let fixture: ComponentFixture<EquipmentGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

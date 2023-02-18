import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapLocationDialogComponent } from './map-location-dialog.component';

describe('MapLocationDialogComponent', () => {
  let component: MapLocationDialogComponent;
  let fixture: ComponentFixture<MapLocationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapLocationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapLocationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

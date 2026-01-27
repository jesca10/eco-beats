import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TracksModalPage } from './tracks-modal.page';

describe('TracksModalPage', () => {
  let component: TracksModalPage;
  let fixture: ComponentFixture<TracksModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

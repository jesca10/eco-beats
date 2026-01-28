import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerModalPage } from './player-modal.page';

describe('PlayerModalPage', () => {
  let component: PlayerModalPage;
  let fixture: ComponentFixture<PlayerModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

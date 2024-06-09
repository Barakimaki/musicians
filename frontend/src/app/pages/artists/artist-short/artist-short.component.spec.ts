import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistShortComponent } from './artist-short.component';

describe('ArtistShortComponent', () => {
  let component: ArtistShortComponent;
  let fixture: ComponentFixture<ArtistShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistShortComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtistShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationButtonComponent } from './information-button.component';
import {MatIconModule} from "@angular/material/icon";

describe('InformationButtonComponent', () => {
  let component: InformationButtonComponent;
  let fixture: ComponentFixture<InformationButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformationButtonComponent],
      imports: [MatIconModule]
    });
    fixture = TestBed.createComponent(InformationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

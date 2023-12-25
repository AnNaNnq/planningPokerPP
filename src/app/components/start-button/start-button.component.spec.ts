import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartButtonComponent } from './start-button.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('StartButtonComponent', () => {
  let component: StartButtonComponent;
  let fixture: ComponentFixture<StartButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartButtonComponent],
      imports: [RouterTestingModule]
    });
    fixture = TestBed.createComponent(StartButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

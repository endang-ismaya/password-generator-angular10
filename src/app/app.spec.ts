import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial empty password', () => {
    expect(component.password).toBe('');
  });

  it('should have all options initially false', () => {
    expect(component.includeLetters).toBe(false);
    expect(component.includeNumbers).toBe(false);
    expect(component.includeSymbols).toBe(false);
    expect(component.length).toBe(0);
  });

  it('should not generate when length is 0', () => {
    component.includeLetters = true;
    component.onGenerate();
    expect(component.password).toBe('');
  });

  it('should not generate when no options selected', () => {
    component.length = 10;
    component.onGenerate();
    expect(component.password).toBe('');
  });

  it('should generate password with letters only', () => {
    component.length = 10;
    component.includeLetters = true;
    component.onGenerate();
    expect(component.password.length).toBe(10);
    expect(component.password).toMatch(/^[a-z]+$/);
  });

  it('should generate password with numbers only', () => {
    component.length = 8;
    component.includeNumbers = true;
    component.onGenerate();
    expect(component.password.length).toBe(8);
    expect(component.password).toMatch(/^[0-9]+$/);
  });

  it('should generate password with symbols only', () => {
    component.length = 6;
    component.includeSymbols = true;
    component.onGenerate();
    expect(component.password.length).toBe(6);
    expect(component.password).toMatch(/^[!@#$%^&*()]+$/);
  });

  it('should generate password with mixed characters', () => {
    component.length = 15;
    component.includeLetters = true;
    component.includeNumbers = true;
    component.includeSymbols = true;
    component.onGenerate();
    expect(component.password.length).toBe(15);
    expect(component.password).toMatch(/[a-z]/);
    expect(component.password).toMatch(/[0-9]/);
  });

  it('canGenerate should be false when length is 0', () => {
    component.length = 0;
    component.includeLetters = true;
    expect(component.canGenerate).toBe(false);
  });

  it('canGenerate should be false when no options selected', () => {
    component.length = 10;
    expect(component.canGenerate).toBe(false);
  });

  it('canGenerate should be true when length > 0 and one option selected', () => {
    component.length = 10;
    component.includeLetters = true;
    expect(component.canGenerate).toBe(true);
  });
});
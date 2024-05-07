import { AbstractControl } from '@angular/forms';

export function ConfirmPassword(controls: AbstractControl): {
  [key: string]: boolean;
} | null {
  const password = controls.get('password');
  const confirmPassword = controls.get('confirmPassword');
  if (password?.pristine || confirmPassword?.pristine) {
    return null as any;
  }
  return password && confirmPassword && password.value !== confirmPassword.value
    ? { misMatch: true }
    : null;
}

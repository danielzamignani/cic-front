import { AbstractControl, ValidationErrors } from '@angular/forms';

export const ValidateCardExpiry = (
  control: AbstractControl,
): ValidationErrors | null => {
  const value = control.value;
  if (!value) {
    return null;
  }

  const [month, year] = value.split('/');
  if (!month || !year) {
    return { invalidFormat: true };
  }

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  if (year < currentYear || (year == currentYear && month < currentMonth)) {
    return { expired: true };
  }

  return null;
};

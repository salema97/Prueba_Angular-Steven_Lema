import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const CanActivate = () => {
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (token === null) {
    router.navigate(['Account/login']);
  }
};

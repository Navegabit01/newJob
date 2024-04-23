import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TPL';
  links = [
    { label: 'Men', path: '/men' },
    { label: 'Women', path: '/women' },
    { label: 'Kids', path: '/kids' },
    { label: 'Sale', path: '/sale' },
    { label: '3 Stripe Life', path: '/3-stripe-life' },
  ];
}

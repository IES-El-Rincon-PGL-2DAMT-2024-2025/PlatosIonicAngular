// app.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  currentView: 'platos' | 'ingredientes' = 'platos';

  constructor() {}

  showPlatos() {
    this.currentView = 'platos';
  }

  showIngredientes() {
    this.currentView = 'ingredientes';
  }
}

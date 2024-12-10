import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentView: string = 'platos'; // Vista predeterminada

  showPlatos() {
    this.currentView = 'platos';
  }

  showIngredientes() {
    this.currentView = 'ingredientes';
  }

  showCocineros() {
    this.currentView = 'cocineros';
  }
}



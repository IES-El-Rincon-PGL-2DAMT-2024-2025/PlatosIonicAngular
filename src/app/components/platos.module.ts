// src/app/components/platos.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // Importa IonicModule
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PlatoFormComponent } from './plato-form/plato-form.component';
import { PlatoListComponent } from './plato-list/plato-list.component';

@NgModule({
  declarations: [
    PlatoFormComponent,
    PlatoListComponent, // Si tienes otros componentes, decláralos aquí
  ],
  imports: [
    CommonModule,
    IonicModule, // Importa IonicModule aquí
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    PlatoFormComponent,
    PlatoListComponent, // Exporta los componentes si los usas en otros módulos
  ],
})
export class PlatosModule {}

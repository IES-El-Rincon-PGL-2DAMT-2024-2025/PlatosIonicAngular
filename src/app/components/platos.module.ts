// platos.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PlatoFormComponent } from './plato-form/plato-form.component';
import { PlatoListComponent } from './plato-list/plato-list.component';
import { IngredienteFormComponent } from './ingrediente-form/ingrediente-form.component';
import { IngredienteListComponent } from './ingrediente-list/ingrediente-list.component';

@NgModule({
  declarations: [
    PlatoFormComponent,
    PlatoListComponent,
    IngredienteFormComponent,
    IngredienteListComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    PlatoFormComponent,
    PlatoListComponent,
    IngredienteFormComponent,
    IngredienteListComponent,
  ],
})
export class PlatosModule {}

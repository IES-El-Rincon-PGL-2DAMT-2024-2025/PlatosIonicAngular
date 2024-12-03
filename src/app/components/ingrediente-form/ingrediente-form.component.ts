// ingrediente-form.component.ts

import { Component, OnInit, Input } from '@angular/core';
import { IngredienteService, Ingrediente } from '../../services/ingrediente.service';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingrediente-form',
  templateUrl: './ingrediente-form.component.html',
  styleUrls: ['./ingrediente-form.component.scss'],
})
export class IngredienteFormComponent implements OnInit {
  @Input() ingrediente?: Ingrediente;
  ingredienteForm!: FormGroup;

  constructor(
    private ingredienteService: IngredienteService,
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.ingredienteForm = this.formBuilder.group({
      nombre: [this.ingrediente?.nombre || '', Validators.required],
    });
  }

  saveIngrediente() {
    const data = this.ingredienteForm.value;

    if (this.ingrediente) {
      // Editar ingrediente existente
      const ingredienteActualizado: Ingrediente = {
        ...this.ingrediente,
        ...data,
      };

      this.ingredienteService.updateIngrediente(ingredienteActualizado).subscribe(() => {
        this.modalController.dismiss(true);
      });
    } else {
      // Crear nuevo ingrediente
      this.ingredienteService.addIngrediente(data).subscribe(() => {
        this.modalController.dismiss(true);
      });
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }
}

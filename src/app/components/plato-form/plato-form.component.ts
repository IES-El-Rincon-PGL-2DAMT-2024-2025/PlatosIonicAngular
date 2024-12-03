// plato-form.component.ts

import { Component, OnInit, Input } from '@angular/core';
import { PlatoService, Plato } from '../../services/plato.service';
import { IngredienteService, Ingrediente } from '../../services/ingrediente.service';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-plato-form',
  templateUrl: './plato-form.component.html',
  styleUrls: ['./plato-form.component.scss'],
})
export class PlatoFormComponent implements OnInit {
  @Input() plato?: Plato;
  platoForm!: FormGroup;
  ingredientesDisponibles: Ingrediente[] = [];

  constructor(
    private platoService: PlatoService,
    private ingredienteService: IngredienteService,
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loadIngredientes();

    this.platoForm = this.formBuilder.group({
      nombre: [this.plato?.nombre || '', Validators.required],
      descripcion: [this.plato?.descripcion || '', Validators.required],
      precio: [this.plato?.precio || '', [Validators.required, Validators.min(0)]],
      ingredientes: [this.plato?.ingredientes || []],
    });
  }

  loadIngredientes() {
    this.ingredienteService.getIngredientes().subscribe((ingredientes) => {
      this.ingredientesDisponibles = ingredientes;
    });
  }

  savePlato() {
    const data = this.platoForm.value;

    if (this.plato) {
      // Editar plato existente
      const platoActualizado: Plato = {
        ...this.plato,
        ...data,
      };

      this.platoService.updatePlato(platoActualizado).subscribe(() => {
        this.modalController.dismiss(true);
      });
    } else {
      // Crear nuevo plato
      this.platoService.addPlato(data).subscribe(() => {
        this.modalController.dismiss(true);
      });
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }
}

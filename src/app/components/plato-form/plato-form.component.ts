import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CocineroService, Cocinero } from '../../services/cocinero.service';
import { PlatoService, Plato } from '../../services/plato.service';

@Component({
  selector: 'app-plato-form',
  templateUrl: './plato-form.component.html'
})
export class PlatoFormComponent implements OnInit {

  platoForm!: FormGroup;
  cocineros: Cocinero[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cocineroService: CocineroService,
    private platoService: PlatoService
  ) {}

  ngOnInit() {
    this.platoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      cocineroId: [null, Validators.required]
    });

    this.loadCocineros();
  }

  loadCocineros() {
    this.cocineroService.getCocineros().subscribe(cocineros => {
      this.cocineros = cocineros;
    });
  }

  guardarPlato() {
    if (this.platoForm.valid) {
      const data = this.platoForm.value;
      const plato: Plato = {
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio,
        cocinero: { id: data.cocineroId, nombre: '' } // solo necesitas el id
      };

      this.platoService.crearPlato(plato).subscribe((platoCreado) => {
        console.log('Plato creado:', platoCreado);
        // Aquí puedes navegar o resetear el formulario
      });
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CocineroService, Cocinero } from '../../services/cocinero.service';

@Component({
  selector: 'app-cocinero-form',
  templateUrl: './cocinero-form.component.html'
})
export class CocineroFormComponent implements OnInit {
  @Input() cocinero!: Cocinero;
  cocineroForm!: FormGroup;

  constructor(
    private modalController: ModalController,
    private cocineroService: CocineroService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.cocineroForm = this.formBuilder.group({
      nombre: [this.cocinero?.nombre || '', Validators.required],
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  saveCocinero() {
    if (this.cocineroForm.valid) {
      const cocineroData = this.cocineroForm.value;
      if (this.cocinero && this.cocinero.id) {
        this.cocineroService.updateCocinero(this.cocinero.id, cocineroData).subscribe(() => {
          this.dismiss();
        });
      } else {
        this.cocineroService.addCocinero(cocineroData).subscribe(() => {
          this.dismiss();
        });
      }
    }
  }
}

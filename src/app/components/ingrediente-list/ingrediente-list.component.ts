// ingrediente-list.component.ts

import { Component, OnInit } from '@angular/core';
import { IngredienteService, Ingrediente } from '../../services/ingrediente.service';
import { AlertController, ModalController } from '@ionic/angular';
import { IngredienteFormComponent } from '../ingrediente-form/ingrediente-form.component';


@Component({
  selector: 'app-ingrediente-list',
  templateUrl: './ingrediente-list.component.html'
})
export class IngredienteListComponent implements OnInit {
  ingredientes: Ingrediente[] = [];

  constructor(
    private ingredienteService: IngredienteService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadIngredientes();
  }

  loadIngredientes() {
    this.ingredienteService.getIngredientes().subscribe((ingredientes) => {
      this.ingredientes = ingredientes;
    });
  }

  async addIngrediente() {
    const modal = await this.modalController.create({
      component: IngredienteFormComponent,
    });

    modal.onDidDismiss().then(() => {
      this.loadIngredientes();
    });

    return await modal.present();
  }

  async editIngrediente(ingrediente: Ingrediente) {
    const modal = await this.modalController.create({
      component: IngredienteFormComponent,
      componentProps: { ingrediente },
    });

    modal.onDidDismiss().then(() => {
      this.loadIngredientes();
    });

    return await modal.present();
  }

  async deleteIngrediente(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas eliminar este ingrediente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.ingredienteService.deleteIngrediente(id).subscribe(() => {
              this.loadIngredientes();
            });
          },
        },
      ],
    });

    await alert.present();
  }
}

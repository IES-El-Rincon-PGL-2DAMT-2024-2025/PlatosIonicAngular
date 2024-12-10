import { Component, OnInit } from '@angular/core';
import { CocineroService, Cocinero } from '../../services/cocinero.service';
import { AlertController, ModalController } from '@ionic/angular';
import { CocineroFormComponent } from '../cocinero-form/cocinero-form.component';

@Component({
  selector: 'app-cocinero-list',
  templateUrl: './cocinero-list.component.html',
})
export class CocineroListComponent implements OnInit {
  cocineros: Cocinero[] = [];

  constructor(
    private cocineroService: CocineroService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadCocineros();
  }

  loadCocineros() {
    this.cocineroService.getCocineros().subscribe((cocineros) => {
      this.cocineros = cocineros;
    });
  }

  async addCocinero() {
    const modal = await this.modalController.create({
      component: CocineroFormComponent,
    });

    modal.onDidDismiss().then(() => {
      this.loadCocineros();
    });

    return await modal.present();
  }

  async editCocinero(cocinero: Cocinero) {
    const modal = await this.modalController.create({
      component: CocineroFormComponent,
      componentProps: { cocinero },
    });

    modal.onDidDismiss().then(() => {
      this.loadCocineros();
    });

    return await modal.present();
  }

  async deleteCocinero(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas eliminar este cocinero?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.cocineroService.deleteCocinero(id).subscribe(() => {
              this.loadCocineros();
            });
          },
        },
      ],
    });

    await alert.present();
  }
}

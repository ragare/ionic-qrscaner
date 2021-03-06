import { Component } from '@angular/core';
import { DataLocalService } from '../../app/services/data-local.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public dataLocalService: DataLocalService) {}

  enviarCorreo() {
    console.log('Enviar correo');
    this.dataLocalService.enviarCorreo();
  }

  abrirRegistro(registro) {
    console.log('Registro abrir', registro);
    this.dataLocalService.abrirRegistro(registro);
  }

}

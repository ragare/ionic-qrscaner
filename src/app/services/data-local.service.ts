import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  guardados: Registro[] = [];

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private iab: InAppBrowser) {
    this.cargarRegistros();
  }

  guardarRegistro(format: string, text: string) {
    const nuevoRegistro = new Registro(format, text);
    this.guardados.unshift(nuevoRegistro);
    this.storage.set('registros', this.guardados);
    this.abrirRegistro(nuevoRegistro);
  }

  async cargarRegistros() {
    const registros = await this.storage.get('registros');
    this.guardados = registros || [];
  }

  abrirRegistro(registro: Registro) {
    this.navCtrl.navigateForward('/tabs/tab2');
    switch (registro.type) {
      case 'http':
        const browser = this.iab.create(registro.text, '_system');
        break;
      case 'geo':
        this.navCtrl.navigateForward('/tabs/tab2/mapa/' + registro.text );
        break;
    }
  }

  enviarCorreo() {
    const arrTemp = [];
    const titulos = 'Tipo, Formato, Creado en, Texto\n';
    arrTemp.push(titulos);
    this.guardados.forEach( registro => {
      const linea = `${registro.type}, ${registro.format}, ${registro.created}, ${registro.text.replace(',', ' ')}\n`;
      arrTemp.push(linea);
    });
    console.log(arrTemp.join(''));
  }
}

import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataLocalService } from '../../app/services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor(
    private barcodeScanner: BarcodeScanner,
    private dataLocalService: DataLocalService
  ) {}

  ionViewWillEnter() {
    this.scan();
  }

  ionViewDidEnter() {

  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
    if (!barcodeData.cancelled) {
      this.dataLocalService.guardarRegistro(barcodeData.format, barcodeData.text);
    }
    }).catch(err => {
        console.log('Error', err);
        // this.dataLocalService.guardarRegistro('QRCode', 'https://ibm.com');
        // this.dataLocalService.guardarRegistro('QRCode', 'geo:40.73151796986687,-74.06087294062502');
        this.dataLocalService.guardarRegistro('QRCode', 'geo:39.466808,-0.376100');
    });
  }

}

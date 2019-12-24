import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, AfterViewInit {

  lat: number;
  lng: number;

  constructor( private router: ActivatedRoute) { }

  ngOnInit() {
    let geo: any = this.router.snapshot.paramMap.get('geo');
    geo = geo.substr(4);
    geo = geo.split(',');
    this.lat = Number(geo[0]);
    this.lng = Number(geo[1]);
    console.log(this.lat, this.lng);
  }

  ngAfterViewInit() {
    mapboxgl.accessToken = 'pk.eyJ1IjoicmFmYS1hcmlhZG5hIiwiYSI6ImNrNGpwbTg1MjFpZWoza3F3OGYwYnNodzgifQ.JxKVxypzfEMisNLiQrh6WA';
    const  map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11'
    });
  }

}

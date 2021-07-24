import { Component } from '@angular/core';
import { parinstalacion } from '../environments/parinstalacion';
import IMask from 'imask';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'angular-nsinies';
  mascara: string = parinstalacion.siniestros.nsinies_mask;
  mascara_nsinies = IMask.createMask({
    mask: this.mascara,
  });

  nsinies: string = '';
}

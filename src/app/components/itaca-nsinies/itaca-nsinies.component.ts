import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { parinstalacion } from '../../../environments/parinstalacion';
import IMask from 'imask';

@Component({
  selector: 'itaca-nsinies',
  templateUrl: './itaca-nsinies.component.html',
  styleUrls: ['./itaca-nsinies.component.css'],
})
export class ItacaNsiniesComponent implements OnInit {
  // Segueix el patro de Binding [(x)] https://angular.io/guide/two-way-binding
  @Input() numSiniestro!: string;
  @Output() numSiniestroChange = new EventEmitter<string>();

  @Input() disabled: boolean = false;

  // Recuperem la mascara del fitxer de configuració
  mascara: string = parinstalacion.siniestros.nsinies_mask;
  mascara_nsinies = IMask.createMask({
    mask: this.mascara,
    // Sobreescriure les dades previes
    overwrite: true,
    // Configuració del place holder, sempre visible (lazy = false
    lazy: true,
    placeholderChar: ' ',
  });

  input_error: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onBlur(): void {
    /*
        revisem si podem completar el número de siniestre, per fer-ho comprovem
        si nomes falten introduir els ultims caracters
        El objectiu es que si hem introduit el número 2021-5 s'autocompleti a 2021-00000005
        aplicant la mascara
    */
    if (this.numSiniestro.length == 0) {
      return;
    }

    // Obtenim els diversos grups formats per 0s de la mascara
    let c: string[] = [];

    c = <string[]>this.mascara.match(/(\d+)/g);

    //Calculem la longitud de la part fixe i seqüencial del número de sinistre
    let f: number = 0;

    for (let i = 0; i < c.length - 1; i++) {
      f = f + c[i].length;
    }

    //extraiem la part fixe del número de sinsitre
    const nsinies1: string = this.numSiniestro.slice(0, f).trim();
    const nsinies2: string = this.numSiniestro.slice(f).trim();

    if (nsinies2.length > 0) {
      //completem la part seqüencial del número de siniestre

      this.numSiniestro = nsinies1.concat(
        nsinies2.padStart(c[c.length - 1].length, '0')
      );
      this.onComplete();
    } else {
      this.input_error = true;
    }
  }

  onFocus(): void {
    this.input_error = false;
  }

  onComplete(): void {
    this.numSiniestroChange.emit(this.numSiniestro);
  }
}

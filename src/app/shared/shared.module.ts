import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { ViewportComponent } from './viewport/viewport.component';
import { AuxiliaryPanelComponent } from './auxiliary-panel/auxiliary-panel.component';

@NgModule({
  declarations: [
      CardComponent,
      ViewportComponent,
      AuxiliaryPanelComponent],
  imports: [
    CommonModule,
  ],
  exports: [CardComponent, ViewportComponent]
})
export class SharedModule { }

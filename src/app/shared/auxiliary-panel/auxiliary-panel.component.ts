import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-aux-panel',
    templateUrl: './auxiliary-panel.component.pug',
    styleUrls: ['./auxiliary-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuxiliaryPanelComponent implements OnInit {
    auxOpen: boolean;
    hasContent = false;

    constructor() {
    }

    openAuxContent(): void {
        this.auxOpen = !this.auxOpen;
    }

    ngOnInit() {
    }

}

import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TabModel} from "../../../models/tab.model";

@Component({
    selector: 'app-aux-panel',
    templateUrl: './auxiliary-panel.component.pug',
    styleUrls: ['./auxiliary-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuxiliaryPanelComponent implements OnInit {
    @Input() auxOpen: boolean;
    @Input() tabs: Array<TabModel>;

    hasContent = true;
    currentPath: string[];
    constructor(private route: ActivatedRoute,
                private router: Router) {
        this.currentPath = this.router.url.split('/').slice(1);
    }

    openAuxContent(): void {
        this.auxOpen = !this.auxOpen;
        if (this.auxOpen) {
            this.router.navigate([
                this.currentPath.join('/'),
                {outlets: {
                    aside: [this.tabs[0].href ],
                }}]);
        } else {
            this.router.navigate([{outlets: {
                    aside: null,
                    primary: this.currentPath
                }}]);
        }
    }

    ngOnInit() {
    }

}

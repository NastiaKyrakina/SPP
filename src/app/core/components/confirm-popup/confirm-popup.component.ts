import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    OnInit,
    Output
} from '@angular/core';
import {PopUpOverlayRef} from '../../popup-ref';
import {POPUP_DATA} from './confirm-popup.tokens';
import {PopUpData} from '../../popup.service';

@Component({
    selector: 'app-confirm-popup',
    templateUrl: './confirm-popup.component.pug',
    styleUrls: ['./confirm-popup.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class ConfirmPopupComponent implements OnInit {
    @Output() confirmed = new EventEmitter<boolean>();

    constructor(
        public popUpRef: PopUpOverlayRef,
        @Inject(POPUP_DATA) public data: PopUpData) {
    }

    ngOnInit() {
    }

    cancel() {
        this.confirmed.emit(false);
        this.popUpRef.close();
    }

    confirm() {
        this.confirmed.emit(true);
        this.popUpRef.close();
    }
}

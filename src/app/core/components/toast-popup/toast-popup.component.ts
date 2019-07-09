import {Component, OnInit, ChangeDetectionStrategy, Inject, Output, EventEmitter} from '@angular/core';
import {PopUpOverlayRef} from '../../popup-ref';
import {POPUP_DATA} from '../confirm-popup/confirm-popup.tokens';
import {PopUpData} from '../../popup.service';

@Component({
    selector: 'app-toast-popup',
    templateUrl: './toast-popup.component.pug',
    styleUrls: ['./toast-popup.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastPopupComponent implements OnInit {

    @Output() confirmed = new EventEmitter<boolean>();

    constructor(public popUpRef: PopUpOverlayRef,
                @Inject(POPUP_DATA) public data: PopUpData) {
    }

    ngOnInit() {
        setTimeout(() => this.cancel(), 10 * 1000);
    }

    cancel() {
        this.popUpRef.close();
    }


}

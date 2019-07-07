import {ConfirmPopupComponent} from './confirm-popup/confirm-popup.component';
import {OverlayRef} from '@angular/cdk/overlay';
import {Observable} from 'rxjs';
import {ENTER, ESCAPE} from '@angular/cdk/keycodes';
import {filter, map} from 'rxjs/operators';
import {ToastPopupComponent} from './toast-popup/toast-popup.component';

export class PopUpOverlayRef {

    componentInstance: ConfirmPopupComponent | ToastPopupComponent;

    get overlayRef(): OverlayRef {
        return this._overlayRef;
    }

    keyDownEvent$: Observable<number> = this._overlayRef.keydownEvents()
        .pipe(
            map((event: KeyboardEvent) => event.keyCode),
            filter((keyCode: number) => keyCode === ESCAPE || keyCode === ENTER)
        );

    constructor(private _overlayRef: OverlayRef) {
    }

    close(): void {
        this.overlayRef.detachBackdrop();
        this.overlayRef.dispose();
        this.componentInstance = null;
    }

}

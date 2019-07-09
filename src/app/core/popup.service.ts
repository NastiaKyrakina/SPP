import {ComponentRef, Injectable, Injector} from '@angular/core';
import {Overlay, OverlayConfig, OverlayRef, PositionStrategy} from '@angular/cdk/overlay';
import {PopUpOverlayRef} from './popup-ref';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {ConfirmPopupComponent} from './components/confirm-popup/confirm-popup.component';
import {Observable} from 'rxjs';
import {POPUP_DATA} from './components/confirm-popup/confirm-popup.tokens';
import {filter, take} from 'rxjs/operators';
import {ToastPopupComponent} from './components/toast-popup/toast-popup.component';

export interface PopUpData {
    title?: string;
    text: string;
    cancelButton?: string;
    confirmButton?: string;
    type?: string;
}

export const CENTER = 'center';
export const TOP = 'top';

export const CONFIRM = 'confirm';
export const TOAST = 'toast';

export interface PopUpConfig {
    type: string;
    position: string;
    panelClass: string;
    backdropClass: string;
    hasBackdrop: boolean;
    data: Partial<PopUpData>;
}

const DEFAULT_CONFIRM_POPUP_CONFIG = {
    type: CONFIRM,
    position: CENTER,
    panelClass: 'standard-panel',
    backdropClass: 'dark-backdrop',
    hasBackdrop: true,
    data: {
        title: '',
        text: '',
        cancelButton: 'Cancel',
        confirmButton: 'Confirm',
    }
};

const DEFAULT_TOAST_POPUP_CONFIG = {
    type: TOAST,
    position: TOP,
    panelClass: 'standard-panel',
    hasBackdrop: false,
    data: {
        text: '',
        type: '',
    }
};


@Injectable({
    providedIn: 'root'
})
export class PopupService {

    constructor(private injector: Injector,
                private overlay: Overlay) {
    }

    private getPopUpConfig(config: Partial<PopUpConfig>): OverlayConfig {
        const scrollStrategy = this.overlay.scrollStrategies.block();
        let positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally();

        switch (config.position) {
            case CENTER: {
                positionStrategy = positionStrategy.centerVertically();
                break;
            }
            case TOP: {
                positionStrategy = positionStrategy.top('3em');
                break;
            }
        }
        return new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.panelClass,
            scrollStrategy,
            positionStrategy,
        });

    }

    confirm(config: Partial<PopUpConfig>): Observable<boolean> | null {
        const popUpRef = this.openPopUp({
            ...config,
            data: {
                ...(config.data ? config.data : {}),
            }
        });
        if (config.type === CONFIRM) {
            return popUpRef.confirmed.pipe(take(1), filter((confirmed => !!confirmed)));
        }
        return null;
    }

    private createPopUpOverlay(config: Partial<PopUpConfig>) {
        const overlayConfig = this.getPopUpConfig(config);
        return this.overlay.create(overlayConfig);
    }

    private createPopUpInjector(config: Partial<PopUpConfig>, popUpRef: PopUpOverlayRef): PortalInjector {
        const token = new WeakMap();
        token.set(PopUpOverlayRef, popUpRef);
        token.set(POPUP_DATA, config.data);

        return new PortalInjector(this.injector, token);
    }

    private attachPopUpContainer(overlayRef: OverlayRef,
                                 config: Partial<PopUpConfig>,
                                 popUpRef: PopUpOverlayRef): ConfirmPopupComponent | ToastPopupComponent {
        const injector = this.createPopUpInjector(config, popUpRef);
        let containerPortal;
        if (config.type === CONFIRM) {
            containerPortal = new ComponentPortal(ConfirmPopupComponent, null, injector);
        } else {
            containerPortal = new ComponentPortal(ToastPopupComponent, null, injector);
        }
        const containerRef: ComponentRef<ConfirmPopupComponent | ToastPopupComponent> = overlayRef.attach(containerPortal);

        containerRef.changeDetectorRef.detectChanges();
        return containerRef.instance;
    }

    private openPopUp(config: Partial<PopUpConfig>): ConfirmPopupComponent | ToastPopupComponent {
        const DEFAULT_CONFIG = config.type === 'confirm' ? DEFAULT_CONFIRM_POPUP_CONFIG : DEFAULT_TOAST_POPUP_CONFIG;
        const
            currentConfig = {
                ...DEFAULT_CONFIG,
                ...config,
            };
        const overlayRef = this.createPopUpOverlay(currentConfig);
        const popUpRef = new PopUpOverlayRef(overlayRef);
        currentConfig.data = {
            ...DEFAULT_CONFIG.data,
            ...(config.data ? config.data : {}),
        };

        const componentInstance = this.attachPopUpContainer(overlayRef, currentConfig, popUpRef);

        return componentInstance;

    }

}

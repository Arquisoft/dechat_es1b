import { Directive, ElementRef, NgModule, InjectionToken, Inject, Injectable, defineInjectable, inject, ComponentFactoryResolver, ApplicationRef, Component, NgZone, HostBinding, HostListener, SecurityContext, Injector, INJECTOR } from '@angular/core';
import { Subject } from 'rxjs';
import { __assign, __values, __extends } from 'tslib';
import { DOCUMENT, CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { animate, state, style, transition, trigger } from '@angular/animations';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ToastContainerDirective = /** @class */ (function () {
    function ToastContainerDirective(el) {
        this.el = el;
    }
    /**
     * @return {?}
     */
    ToastContainerDirective.prototype.getContainerElement = /**
     * @return {?}
     */
    function () {
        return this.el.nativeElement;
    };
    ToastContainerDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[toastContainer]',
                    exportAs: 'toastContainer',
                },] }
    ];
    /** @nocollapse */
    ToastContainerDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return ToastContainerDirective;
}());
var ToastContainerModule = /** @class */ (function () {
    function ToastContainerModule() {
    }
    ToastContainerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ToastContainerDirective],
                    exports: [ToastContainerDirective],
                },] }
    ];
    return ToastContainerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Everything a toast needs to launch
 */
var  /**
 * Everything a toast needs to launch
 */
ToastPackage = /** @class */ (function () {
    function ToastPackage(toastId, config, message, title, toastType, toastRef) {
        var _this = this;
        this.toastId = toastId;
        this.config = config;
        this.message = message;
        this.title = title;
        this.toastType = toastType;
        this.toastRef = toastRef;
        this._onTap = new Subject();
        this._onAction = new Subject();
        this.toastRef.afterClosed().subscribe(function () {
            _this._onAction.complete();
            _this._onTap.complete();
        });
    }
    /** Fired on click */
    /**
     * Fired on click
     * @return {?}
     */
    ToastPackage.prototype.triggerTap = /**
     * Fired on click
     * @return {?}
     */
    function () {
        this._onTap.next();
        if (this.config.tapToDismiss) {
            this._onTap.complete();
        }
    };
    /**
     * @return {?}
     */
    ToastPackage.prototype.onTap = /**
     * @return {?}
     */
    function () {
        return this._onTap.asObservable();
    };
    /** available for use in custom toast */
    /**
     * available for use in custom toast
     * @param {?=} action
     * @return {?}
     */
    ToastPackage.prototype.triggerAction = /**
     * available for use in custom toast
     * @param {?=} action
     * @return {?}
     */
    function (action) {
        this._onAction.next(action);
    };
    /**
     * @return {?}
     */
    ToastPackage.prototype.onAction = /**
     * @return {?}
     */
    function () {
        return this._onAction.asObservable();
    };
    return ToastPackage;
}());
/** @type {?} */
var DefaultNoComponentGlobalConfig = {
    maxOpened: 0,
    autoDismiss: false,
    newestOnTop: true,
    preventDuplicates: false,
    resetTimeoutOnDuplicate: false,
    iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning',
    },
    // Individual
    closeButton: false,
    disableTimeOut: false,
    timeOut: 5000,
    extendedTimeOut: 1000,
    enableHtml: false,
    progressBar: false,
    toastClass: 'toast',
    positionClass: 'toast-top-right',
    titleClass: 'toast-title',
    messageClass: 'toast-message',
    easing: 'ease-in',
    easeTime: 300,
    tapToDismiss: true,
    onActivateTick: false,
    progressAnimation: 'decreasing',
};
/** @type {?} */
var TOAST_CONFIG = new InjectionToken('ToastConfig');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 * @template T
 */
var  /**
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 * @template T
 */
ComponentPortal = /** @class */ (function () {
    function ComponentPortal(component, injector) {
        this.component = component;
        this.injector = injector;
    }
    /** Attach this portal to a host. */
    /**
     * Attach this portal to a host.
     * @param {?} host
     * @param {?} newestOnTop
     * @return {?}
     */
    ComponentPortal.prototype.attach = /**
     * Attach this portal to a host.
     * @param {?} host
     * @param {?} newestOnTop
     * @return {?}
     */
    function (host, newestOnTop) {
        this._attachedHost = host;
        return host.attach(this, newestOnTop);
    };
    /** Detach this portal from its host */
    /**
     * Detach this portal from its host
     * @return {?}
     */
    ComponentPortal.prototype.detach = /**
     * Detach this portal from its host
     * @return {?}
     */
    function () {
        /** @type {?} */
        var host = this._attachedHost;
        if (host) {
            this._attachedHost = undefined;
            return host.detach();
        }
    };
    Object.defineProperty(ComponentPortal.prototype, "isAttached", {
        /** Whether this portal is attached to a host. */
        get: /**
         * Whether this portal is attached to a host.
         * @return {?}
         */
        function () {
            return this._attachedHost != null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the PortalHost reference without performing `attach()`. This is used directly by
     * the PortalHost when it is performing an `attach()` or `detach()`.
     */
    /**
     * Sets the PortalHost reference without performing `attach()`. This is used directly by
     * the PortalHost when it is performing an `attach()` or `detach()`.
     * @param {?=} host
     * @return {?}
     */
    ComponentPortal.prototype.setAttachedHost = /**
     * Sets the PortalHost reference without performing `attach()`. This is used directly by
     * the PortalHost when it is performing an `attach()` or `detach()`.
     * @param {?=} host
     * @return {?}
     */
    function (host) {
        this._attachedHost = host;
    };
    return ComponentPortal;
}());
/**
 * Partial implementation of PortalHost that only deals with attaching a
 * ComponentPortal
 * @abstract
 */
var  /**
 * Partial implementation of PortalHost that only deals with attaching a
 * ComponentPortal
 * @abstract
 */
BasePortalHost = /** @class */ (function () {
    function BasePortalHost() {
    }
    /**
     * @param {?} portal
     * @param {?} newestOnTop
     * @return {?}
     */
    BasePortalHost.prototype.attach = /**
     * @param {?} portal
     * @param {?} newestOnTop
     * @return {?}
     */
    function (portal, newestOnTop) {
        this._attachedPortal = portal;
        return this.attachComponentPortal(portal, newestOnTop);
    };
    /**
     * @return {?}
     */
    BasePortalHost.prototype.detach = /**
     * @return {?}
     */
    function () {
        if (this._attachedPortal) {
            this._attachedPortal.setAttachedHost();
        }
        this._attachedPortal = undefined;
        if (this._disposeFn) {
            this._disposeFn();
            this._disposeFn = undefined;
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    BasePortalHost.prototype.setDisposeFn = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._disposeFn = fn;
    };
    return BasePortalHost;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * A PortalHost for attaching portals to an arbitrary DOM element outside of the Angular
 * application context.
 *
 * This is the only part of the portal core that directly touches the DOM.
 */
var /**
 * A PortalHost for attaching portals to an arbitrary DOM element outside of the Angular
 * application context.
 *
 * This is the only part of the portal core that directly touches the DOM.
 */
DomPortalHost = /** @class */ (function (_super) {
    __extends(DomPortalHost, _super);
    function DomPortalHost(_hostDomElement, _componentFactoryResolver, _appRef) {
        var _this = _super.call(this) || this;
        _this._hostDomElement = _hostDomElement;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this._appRef = _appRef;
        return _this;
    }
    /**
     * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
     * @param portal Portal to be attached
     */
    /**
     * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
     * @template T
     * @param {?} portal Portal to be attached
     * @param {?} newestOnTop
     * @return {?}
     */
    DomPortalHost.prototype.attachComponentPortal = /**
     * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
     * @template T
     * @param {?} portal Portal to be attached
     * @param {?} newestOnTop
     * @return {?}
     */
    function (portal, newestOnTop) {
        var _this = this;
        /** @type {?} */
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        /** @type {?} */
        var componentRef;
        // If the portal specifies a ViewContainerRef, we will use that as the attachment point
        // for the component (in terms of Angular's component tree, not rendering).
        // When the ViewContainerRef is missing, we use the factory to create the component directly
        // and then manually attach the ChangeDetector for that component to the application (which
        // happens automatically when using a ViewContainer).
        componentRef = componentFactory.create(portal.injector);
        // When creating a component outside of a ViewContainer, we need to manually register
        // its ChangeDetector with the application. This API is unfortunately not yet published
        // in Angular core. The change detector must also be deregistered when the component
        // is destroyed to prevent memory leaks.
        this._appRef.attachView(componentRef.hostView);
        this.setDisposeFn(function () {
            _this._appRef.detachView(componentRef.hostView);
            componentRef.destroy();
        });
        // At this point the component has been instantiated, so we move it to the location in the DOM
        // where we want it to be rendered.
        if (newestOnTop) {
            this._hostDomElement.insertBefore(this._getComponentRootNode(componentRef), this._hostDomElement.firstChild);
        }
        else {
            this._hostDomElement.appendChild(this._getComponentRootNode(componentRef));
        }
        return componentRef;
    };
    /** Gets the root HTMLElement for an instantiated component. */
    /**
     * Gets the root HTMLElement for an instantiated component.
     * @param {?} componentRef
     * @return {?}
     */
    DomPortalHost.prototype._getComponentRootNode = /**
     * Gets the root HTMLElement for an instantiated component.
     * @param {?} componentRef
     * @return {?}
     */
    function (componentRef) {
        return (/** @type {?} */ (((/** @type {?} */ (componentRef.hostView))).rootNodes[0]));
    };
    return DomPortalHost;
}(BasePortalHost));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Container inside which all toasts will render.
 */
var OverlayContainer = /** @class */ (function () {
    function OverlayContainer(_document) {
        this._document = _document;
    }
    /**
     * @return {?}
     */
    OverlayContainer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._containerElement && this._containerElement.parentNode) {
            this._containerElement.parentNode.removeChild(this._containerElement);
        }
    };
    /**
     * This method returns the overlay container element. It will lazily
     * create the element the first time  it is called to facilitate using
     * the container in non-browser environments.
     * @returns the container element
     */
    /**
     * This method returns the overlay container element. It will lazily
     * create the element the first time  it is called to facilitate using
     * the container in non-browser environments.
     * @return {?} the container element
     */
    OverlayContainer.prototype.getContainerElement = /**
     * This method returns the overlay container element. It will lazily
     * create the element the first time  it is called to facilitate using
     * the container in non-browser environments.
     * @return {?} the container element
     */
    function () {
        if (!this._containerElement) {
            this._createContainer();
        }
        return this._containerElement;
    };
    /**
     * Create the overlay container element, which is simply a div
     * with the 'cdk-overlay-container' class on the document body.
     */
    /**
     * Create the overlay container element, which is simply a div
     * with the 'cdk-overlay-container' class on the document body.
     * @return {?}
     */
    OverlayContainer.prototype._createContainer = /**
     * Create the overlay container element, which is simply a div
     * with the 'cdk-overlay-container' class on the document body.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var container = this._document.createElement('div');
        container.classList.add('overlay-container');
        this._document.body.appendChild(container);
        this._containerElement = container;
    };
    OverlayContainer.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    OverlayContainer.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    /** @nocollapse */ OverlayContainer.ngInjectableDef = defineInjectable({ factory: function OverlayContainer_Factory() { return new OverlayContainer(inject(DOCUMENT)); }, token: OverlayContainer, providedIn: "root" });
    return OverlayContainer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
var  /**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
OverlayRef = /** @class */ (function () {
    function OverlayRef(_portalHost) {
        this._portalHost = _portalHost;
    }
    /**
     * @param {?} portal
     * @param {?=} newestOnTop
     * @return {?}
     */
    OverlayRef.prototype.attach = /**
     * @param {?} portal
     * @param {?=} newestOnTop
     * @return {?}
     */
    function (portal, newestOnTop) {
        if (newestOnTop === void 0) { newestOnTop = true; }
        return this._portalHost.attach(portal, newestOnTop);
    };
    /**
     * Detaches an overlay from a portal.
     * @returns Resolves when the overlay has been detached.
     */
    /**
     * Detaches an overlay from a portal.
     * @return {?} Resolves when the overlay has been detached.
     */
    OverlayRef.prototype.detach = /**
     * Detaches an overlay from a portal.
     * @return {?} Resolves when the overlay has been detached.
     */
    function () {
        return this._portalHost.detach();
    };
    return OverlayRef;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
 * used as a low-level building building block for other components. Dialogs, tooltips, menus,
 * selects, etc. can all be built using overlays. The service should primarily be used by authors
 * of re-usable components rather than developers building end-user applications.
 *
 * An overlay *is* a PortalHost, so any kind of Portal can be loaded into one.
 */
var Overlay = /** @class */ (function () {
    function Overlay(_overlayContainer, _componentFactoryResolver, _appRef, _document) {
        this._overlayContainer = _overlayContainer;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._appRef = _appRef;
        this._document = _document;
        // Namespace panes by overlay container
        this._paneElements = new Map();
    }
    /**
     * Creates an overlay.
     * @returns A reference to the created overlay.
     */
    /**
     * Creates an overlay.
     * @param {?=} positionClass
     * @param {?=} overlayContainer
     * @return {?} A reference to the created overlay.
     */
    Overlay.prototype.create = /**
     * Creates an overlay.
     * @param {?=} positionClass
     * @param {?=} overlayContainer
     * @return {?} A reference to the created overlay.
     */
    function (positionClass, overlayContainer) {
        // get existing pane if possible
        return this._createOverlayRef(this.getPaneElement(positionClass, overlayContainer));
    };
    /**
     * @param {?=} positionClass
     * @param {?=} overlayContainer
     * @return {?}
     */
    Overlay.prototype.getPaneElement = /**
     * @param {?=} positionClass
     * @param {?=} overlayContainer
     * @return {?}
     */
    function (positionClass, overlayContainer) {
        if (positionClass === void 0) { positionClass = ''; }
        if (!this._paneElements.get(overlayContainer)) {
            this._paneElements.set(overlayContainer, {});
        }
        if (!this._paneElements.get(overlayContainer)[positionClass]) {
            this._paneElements.get(overlayContainer)[positionClass] = this._createPaneElement(positionClass, overlayContainer);
        }
        return this._paneElements.get(overlayContainer)[positionClass];
    };
    /**
     * Creates the DOM element for an overlay and appends it to the overlay container.
     * @returns Newly-created pane element
     */
    /**
     * Creates the DOM element for an overlay and appends it to the overlay container.
     * @param {?} positionClass
     * @param {?=} overlayContainer
     * @return {?} Newly-created pane element
     */
    Overlay.prototype._createPaneElement = /**
     * Creates the DOM element for an overlay and appends it to the overlay container.
     * @param {?} positionClass
     * @param {?=} overlayContainer
     * @return {?} Newly-created pane element
     */
    function (positionClass, overlayContainer) {
        /** @type {?} */
        var pane = this._document.createElement('div');
        pane.id = 'toast-container';
        pane.classList.add(positionClass);
        pane.classList.add('toast-container');
        if (!overlayContainer) {
            this._overlayContainer.getContainerElement().appendChild(pane);
        }
        else {
            overlayContainer.getContainerElement().appendChild(pane);
        }
        return pane;
    };
    /**
     * Create a DomPortalHost into which the overlay content can be loaded.
     * @param pane The DOM element to turn into a portal host.
     * @returns A portal host for the given DOM element.
     */
    /**
     * Create a DomPortalHost into which the overlay content can be loaded.
     * @param {?} pane The DOM element to turn into a portal host.
     * @return {?} A portal host for the given DOM element.
     */
    Overlay.prototype._createPortalHost = /**
     * Create a DomPortalHost into which the overlay content can be loaded.
     * @param {?} pane The DOM element to turn into a portal host.
     * @return {?} A portal host for the given DOM element.
     */
    function (pane) {
        return new DomPortalHost(pane, this._componentFactoryResolver, this._appRef);
    };
    /**
     * Creates an OverlayRef for an overlay in the given DOM element.
     * @param pane DOM element for the overlay
     */
    /**
     * Creates an OverlayRef for an overlay in the given DOM element.
     * @param {?} pane DOM element for the overlay
     * @return {?}
     */
    Overlay.prototype._createOverlayRef = /**
     * Creates an OverlayRef for an overlay in the given DOM element.
     * @param {?} pane DOM element for the overlay
     * @return {?}
     */
    function (pane) {
        return new OverlayRef(this._createPortalHost(pane));
    };
    Overlay.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    Overlay.ctorParameters = function () { return [
        { type: OverlayContainer },
        { type: ComponentFactoryResolver },
        { type: ApplicationRef },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    /** @nocollapse */ Overlay.ngInjectableDef = defineInjectable({ factory: function Overlay_Factory() { return new Overlay(inject(OverlayContainer), inject(ComponentFactoryResolver), inject(ApplicationRef), inject(DOCUMENT)); }, token: Overlay, providedIn: "root" });
    return Overlay;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Reference to a toast opened via the Toastr service.
 * @template T
 */
var  /**
 * Reference to a toast opened via the Toastr service.
 * @template T
 */
ToastRef = /** @class */ (function () {
    function ToastRef(_overlayRef) {
        this._overlayRef = _overlayRef;
        /**
         * Subject for notifying the user that the toast has finished closing.
         */
        this._afterClosed = new Subject();
        /**
         * triggered when toast is activated
         */
        this._activate = new Subject();
        /**
         * notifies the toast that it should close before the timeout
         */
        this._manualClose = new Subject();
        /**
         * notifies the toast that it should reset the timeouts
         */
        this._resetTimeout = new Subject();
    }
    /**
     * @return {?}
     */
    ToastRef.prototype.manualClose = /**
     * @return {?}
     */
    function () {
        this._manualClose.next();
        this._manualClose.complete();
    };
    /**
     * @return {?}
     */
    ToastRef.prototype.manualClosed = /**
     * @return {?}
     */
    function () {
        return this._manualClose.asObservable();
    };
    /**
     * @return {?}
     */
    ToastRef.prototype.timeoutReset = /**
     * @return {?}
     */
    function () {
        return this._resetTimeout.asObservable();
    };
    /**
     * Close the toast.
     */
    /**
     * Close the toast.
     * @return {?}
     */
    ToastRef.prototype.close = /**
     * Close the toast.
     * @return {?}
     */
    function () {
        this._overlayRef.detach();
        this._afterClosed.next();
        this._manualClose.next();
        this._afterClosed.complete();
        this._manualClose.complete();
        this._activate.complete();
        this._resetTimeout.complete();
    };
    /** Gets an observable that is notified when the toast is finished closing. */
    /**
     * Gets an observable that is notified when the toast is finished closing.
     * @return {?}
     */
    ToastRef.prototype.afterClosed = /**
     * Gets an observable that is notified when the toast is finished closing.
     * @return {?}
     */
    function () {
        return this._afterClosed.asObservable();
    };
    /**
     * @return {?}
     */
    ToastRef.prototype.isInactive = /**
     * @return {?}
     */
    function () {
        return this._activate.isStopped;
    };
    /**
     * @return {?}
     */
    ToastRef.prototype.activate = /**
     * @return {?}
     */
    function () {
        this._activate.next();
        this._activate.complete();
    };
    /** Gets an observable that is notified when the toast has started opening. */
    /**
     * Gets an observable that is notified when the toast has started opening.
     * @return {?}
     */
    ToastRef.prototype.afterActivate = /**
     * Gets an observable that is notified when the toast has started opening.
     * @return {?}
     */
    function () {
        return this._activate.asObservable();
    };
    /** Reset the toast timouts */
    /**
     * Reset the toast timouts
     * @return {?}
     */
    ToastRef.prototype.resetTimeout = /**
     * Reset the toast timouts
     * @return {?}
     */
    function () {
        this._resetTimeout.next();
    };
    return ToastRef;
}());
/**
 * Custom injector type specifically for instantiating components with a toast.
 */
var  /**
 * Custom injector type specifically for instantiating components with a toast.
 */
ToastInjector = /** @class */ (function () {
    function ToastInjector(_toastPackage, _parentInjector) {
        this._toastPackage = _toastPackage;
        this._parentInjector = _parentInjector;
    }
    /**
     * @template T
     * @param {?} token
     * @param {?=} notFoundValue
     * @param {?=} flags
     * @return {?}
     */
    ToastInjector.prototype.get = /**
     * @template T
     * @param {?} token
     * @param {?=} notFoundValue
     * @param {?=} flags
     * @return {?}
     */
    function (token, notFoundValue, flags) {
        if (token === ToastPackage) {
            return this._toastPackage;
        }
        return this._parentInjector.get(token, notFoundValue, flags);
    };
    return ToastInjector;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ToastrService = /** @class */ (function () {
    function ToastrService(token, overlay, _injector, sanitizer, ngZone) {
        this.overlay = overlay;
        this._injector = _injector;
        this.sanitizer = sanitizer;
        this.ngZone = ngZone;
        this.currentlyActive = 0;
        this.toasts = [];
        this.index = 0;
        this.toastrConfig = __assign({}, token.default, token.config);
        if (token.config.iconClasses) {
            this.toastrConfig.iconClasses = __assign({}, token.default.iconClasses, token.config.iconClasses);
        }
    }
    /** show toast */
    /**
     * show toast
     * @param {?=} message
     * @param {?=} title
     * @param {?=} override
     * @param {?=} type
     * @return {?}
     */
    ToastrService.prototype.show = /**
     * show toast
     * @param {?=} message
     * @param {?=} title
     * @param {?=} override
     * @param {?=} type
     * @return {?}
     */
    function (message, title, override, type) {
        if (override === void 0) { override = {}; }
        if (type === void 0) { type = ''; }
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
    };
    /** show successful toast */
    /**
     * show successful toast
     * @param {?=} message
     * @param {?=} title
     * @param {?=} override
     * @return {?}
     */
    ToastrService.prototype.success = /**
     * show successful toast
     * @param {?=} message
     * @param {?=} title
     * @param {?=} override
     * @return {?}
     */
    function (message, title, override) {
        if (override === void 0) { override = {}; }
        /** @type {?} */
        var type = this.toastrConfig.iconClasses.success || '';
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
    };
    /** show error toast */
    /**
     * show error toast
     * @param {?=} message
     * @param {?=} title
     * @param {?=} override
     * @return {?}
     */
    ToastrService.prototype.error = /**
     * show error toast
     * @param {?=} message
     * @param {?=} title
     * @param {?=} override
     * @return {?}
     */
    function (message, title, override) {
        if (override === void 0) { override = {}; }
        /** @type {?} */
        var type = this.toastrConfig.iconClasses.error || '';
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
    };
    /** show info toast */
    /**
     * show info toast
     * @param {?=} message
     * @param {?=} title
     * @param {?=} override
     * @return {?}
     */
    ToastrService.prototype.info = /**
     * show info toast
     * @param {?=} message
     * @param {?=} title
     * @param {?=} override
     * @return {?}
     */
    function (message, title, override) {
        if (override === void 0) { override = {}; }
        /** @type {?} */
        var type = this.toastrConfig.iconClasses.info || '';
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
    };
    /** show warning toast */
    /**
     * show warning toast
     * @param {?=} message
     * @param {?=} title
     * @param {?=} override
     * @return {?}
     */
    ToastrService.prototype.warning = /**
     * show warning toast
     * @param {?=} message
     * @param {?=} title
     * @param {?=} override
     * @return {?}
     */
    function (message, title, override) {
        if (override === void 0) { override = {}; }
        /** @type {?} */
        var type = this.toastrConfig.iconClasses.warning || '';
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
    };
    /**
     * Remove all or a single toast by id
     */
    /**
     * Remove all or a single toast by id
     * @param {?=} toastId
     * @return {?}
     */
    ToastrService.prototype.clear = /**
     * Remove all or a single toast by id
     * @param {?=} toastId
     * @return {?}
     */
    function (toastId) {
        var e_1, _a;
        try {
            // Call every toastRef manualClose function
            for (var _b = __values(this.toasts), _c = _b.next(); !_c.done; _c = _b.next()) {
                var toast = _c.value;
                if (toastId !== undefined) {
                    if (toast.toastId === toastId) {
                        toast.toastRef.manualClose();
                        return;
                    }
                }
                else {
                    toast.toastRef.manualClose();
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * Remove and destroy a single toast by id
     */
    /**
     * Remove and destroy a single toast by id
     * @param {?} toastId
     * @return {?}
     */
    ToastrService.prototype.remove = /**
     * Remove and destroy a single toast by id
     * @param {?} toastId
     * @return {?}
     */
    function (toastId) {
        /** @type {?} */
        var found = this._findToast(toastId);
        if (!found) {
            return false;
        }
        found.activeToast.toastRef.close();
        this.toasts.splice(found.index, 1);
        this.currentlyActive = this.currentlyActive - 1;
        if (!this.toastrConfig.maxOpened || !this.toasts.length) {
            return false;
        }
        if (this.currentlyActive < this.toastrConfig.maxOpened &&
            this.toasts[this.currentlyActive]) {
            /** @type {?} */
            var p = this.toasts[this.currentlyActive].toastRef;
            if (!p.isInactive()) {
                this.currentlyActive = this.currentlyActive + 1;
                p.activate();
            }
        }
        return true;
    };
    /**
     * Finds a duplicate toast if one exists
     */
    /**
     * Finds a duplicate toast if one exists
     * @param {?} message
     * @param {?} resetOnDuplicate
     * @return {?}
     */
    ToastrService.prototype.findDuplicate = /**
     * Finds a duplicate toast if one exists
     * @param {?} message
     * @param {?} resetOnDuplicate
     * @return {?}
     */
    function (message, resetOnDuplicate) {
        for (var i = 0; i < this.toasts.length; i++) {
            /** @type {?} */
            var toast = this.toasts[i];
            if (toast.message === message) {
                if (resetOnDuplicate && toast.toastRef.componentInstance.resetTimeout) {
                    toast.toastRef.resetTimeout();
                }
                return toast;
            }
        }
        return null;
    };
    /** create a clone of global config and apply individual settings */
    /**
     * create a clone of global config and apply individual settings
     * @param {?=} override
     * @return {?}
     */
    ToastrService.prototype.applyConfig = /**
     * create a clone of global config and apply individual settings
     * @param {?=} override
     * @return {?}
     */
    function (override) {
        if (override === void 0) { override = {}; }
        return __assign({}, this.toastrConfig, override);
    };
    /**
     * Find toast object by id
     */
    /**
     * Find toast object by id
     * @param {?} toastId
     * @return {?}
     */
    ToastrService.prototype._findToast = /**
     * Find toast object by id
     * @param {?} toastId
     * @return {?}
     */
    function (toastId) {
        for (var i = 0; i < this.toasts.length; i++) {
            if (this.toasts[i].toastId === toastId) {
                return { index: i, activeToast: this.toasts[i] };
            }
        }
        return null;
    };
    /**
     * Determines the need to run inside angular's zone then builds the toast
     */
    /**
     * Determines the need to run inside angular's zone then builds the toast
     * @param {?} toastType
     * @param {?} message
     * @param {?} title
     * @param {?} config
     * @return {?}
     */
    ToastrService.prototype._preBuildNotification = /**
     * Determines the need to run inside angular's zone then builds the toast
     * @param {?} toastType
     * @param {?} message
     * @param {?} title
     * @param {?} config
     * @return {?}
     */
    function (toastType, message, title, config) {
        var _this = this;
        if (config.onActivateTick) {
            return this.ngZone.run(function () {
                return _this._buildNotification(toastType, message, title, config);
            });
        }
        return this._buildNotification(toastType, message, title, config);
    };
    /**
     * Creates and attaches toast data to component
     * returns the active toast, or in case preventDuplicates is enabled the original/non-duplicate active toast.
     */
    /**
     * Creates and attaches toast data to component
     * returns the active toast, or in case preventDuplicates is enabled the original/non-duplicate active toast.
     * @param {?} toastType
     * @param {?} message
     * @param {?} title
     * @param {?} config
     * @return {?}
     */
    ToastrService.prototype._buildNotification = /**
     * Creates and attaches toast data to component
     * returns the active toast, or in case preventDuplicates is enabled the original/non-duplicate active toast.
     * @param {?} toastType
     * @param {?} message
     * @param {?} title
     * @param {?} config
     * @return {?}
     */
    function (toastType, message, title, config) {
        var _this = this;
        if (!config.toastComponent) {
            throw new Error('toastComponent required');
        }
        // max opened and auto dismiss = true
        if (message &&
            this.toastrConfig.preventDuplicates) {
            /** @type {?} */
            var duplicate = this.findDuplicate(message, this.toastrConfig.resetTimeoutOnDuplicate);
            if (duplicate !== null) {
                return duplicate;
            }
        }
        this.previousToastMessage = message;
        /** @type {?} */
        var keepInactive = false;
        if (this.toastrConfig.maxOpened &&
            this.currentlyActive >= this.toastrConfig.maxOpened) {
            keepInactive = true;
            if (this.toastrConfig.autoDismiss) {
                this.clear(this.toasts[0].toastId);
            }
        }
        /** @type {?} */
        var overlayRef = this.overlay.create(config.positionClass, this.overlayContainer);
        this.index = this.index + 1;
        /** @type {?} */
        var sanitizedMessage = message;
        if (message && config.enableHtml) {
            sanitizedMessage = this.sanitizer.sanitize(SecurityContext.HTML, message);
        }
        /** @type {?} */
        var toastRef = new ToastRef(overlayRef);
        /** @type {?} */
        var toastPackage = new ToastPackage(this.index, config, sanitizedMessage, title, toastType, toastRef);
        /** @type {?} */
        var toastInjector = new ToastInjector(toastPackage, this._injector);
        /** @type {?} */
        var component = new ComponentPortal(config.toastComponent, toastInjector);
        /** @type {?} */
        var portal = overlayRef.attach(component, this.toastrConfig.newestOnTop);
        toastRef.componentInstance = ((/** @type {?} */ (portal)))._component;
        /** @type {?} */
        var ins = {
            toastId: this.index,
            message: message || '',
            toastRef: toastRef,
            onShown: toastRef.afterActivate(),
            onHidden: toastRef.afterClosed(),
            onTap: toastPackage.onTap(),
            onAction: toastPackage.onAction(),
            portal: portal
        };
        if (!keepInactive) {
            setTimeout(function () {
                ins.toastRef.activate();
                _this.currentlyActive = _this.currentlyActive + 1;
            });
        }
        this.toasts.push(ins);
        return ins;
    };
    ToastrService.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    ToastrService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [TOAST_CONFIG,] }] },
        { type: Overlay },
        { type: Injector },
        { type: DomSanitizer },
        { type: NgZone }
    ]; };
    /** @nocollapse */ ToastrService.ngInjectableDef = defineInjectable({ factory: function ToastrService_Factory() { return new ToastrService(inject(TOAST_CONFIG), inject(Overlay), inject(INJECTOR), inject(DomSanitizer), inject(NgZone)); }, token: ToastrService, providedIn: "root" });
    return ToastrService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Toast = /** @class */ (function () {
    function Toast(toastrService, toastPackage, ngZone) {
        var _this = this;
        this.toastrService = toastrService;
        this.toastPackage = toastPackage;
        this.ngZone = ngZone;
        /**
         * width of progress bar
         */
        this.width = -1;
        /**
         * a combination of toast type and options.toastClass
         */
        this.toastClasses = '';
        /**
         * controls animation
         */
        this.state = {
            value: 'inactive',
            params: {
                easeTime: this.toastPackage.config.easeTime,
                easing: 'ease-in'
            }
        };
        this.message = toastPackage.message;
        this.title = toastPackage.title;
        this.options = toastPackage.config;
        this.originalTimeout = toastPackage.config.timeOut;
        this.toastClasses = toastPackage.toastType + " " + toastPackage.config.toastClass;
        this.sub = toastPackage.toastRef.afterActivate().subscribe(function () {
            _this.activateToast();
        });
        this.sub1 = toastPackage.toastRef.manualClosed().subscribe(function () {
            _this.remove();
        });
        this.sub2 = toastPackage.toastRef.timeoutReset().subscribe(function () {
            _this.resetTimeout();
        });
    }
    /**
     * @return {?}
     */
    Toast.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.sub.unsubscribe();
        this.sub1.unsubscribe();
        this.sub2.unsubscribe();
        clearInterval(this.intervalId);
        clearTimeout(this.timeout);
    };
    /**
     * activates toast and sets timeout
     */
    /**
     * activates toast and sets timeout
     * @return {?}
     */
    Toast.prototype.activateToast = /**
     * activates toast and sets timeout
     * @return {?}
     */
    function () {
        var _this = this;
        this.state = __assign({}, this.state, { value: 'active' });
        if (!this.options.disableTimeOut && this.options.timeOut) {
            this.outsideTimeout(function () { return _this.remove(); }, this.options.timeOut);
            this.hideTime = new Date().getTime() + this.options.timeOut;
            if (this.options.progressBar) {
                this.outsideInterval(function () { return _this.updateProgress(); }, 10);
            }
        }
    };
    /**
     * updates progress bar width
     */
    /**
     * updates progress bar width
     * @return {?}
     */
    Toast.prototype.updateProgress = /**
     * updates progress bar width
     * @return {?}
     */
    function () {
        if (this.width === 0 || this.width === 100 || !this.options.timeOut) {
            return;
        }
        /** @type {?} */
        var now = new Date().getTime();
        /** @type {?} */
        var remaining = this.hideTime - now;
        this.width = (remaining / this.options.timeOut) * 100;
        if (this.options.progressAnimation === 'increasing') {
            this.width = 100 - this.width;
        }
        if (this.width <= 0) {
            this.width = 0;
        }
        if (this.width >= 100) {
            this.width = 100;
        }
    };
    /**
     * @return {?}
     */
    Toast.prototype.resetTimeout = /**
     * @return {?}
     */
    function () {
        var _this = this;
        clearTimeout(this.timeout);
        clearInterval(this.intervalId);
        this.state = __assign({}, this.state, { value: 'active' });
        this.outsideTimeout(function () { return _this.remove(); }, this.originalTimeout);
        this.options.timeOut = this.originalTimeout;
        this.hideTime = new Date().getTime() + (this.options.timeOut || 0);
        this.width = -1;
        if (this.options.progressBar) {
            this.outsideInterval(function () { return _this.updateProgress(); }, 10);
        }
    };
    /**
     * tells toastrService to remove this toast after animation time
     */
    /**
     * tells toastrService to remove this toast after animation time
     * @return {?}
     */
    Toast.prototype.remove = /**
     * tells toastrService to remove this toast after animation time
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.state.value === 'removed') {
            return;
        }
        clearTimeout(this.timeout);
        this.state = __assign({}, this.state, { value: 'removed' });
        this.outsideTimeout(function () { return _this.toastrService.remove(_this.toastPackage.toastId); }, +this.toastPackage.config.easeTime);
    };
    /**
     * @return {?}
     */
    Toast.prototype.tapToast = /**
     * @return {?}
     */
    function () {
        if (this.state.value === 'removed') {
            return;
        }
        this.toastPackage.triggerTap();
        if (this.options.tapToDismiss) {
            this.remove();
        }
    };
    /**
     * @return {?}
     */
    Toast.prototype.stickAround = /**
     * @return {?}
     */
    function () {
        if (this.state.value === 'removed') {
            return;
        }
        clearTimeout(this.timeout);
        this.options.timeOut = 0;
        this.hideTime = 0;
        // disable progressBar
        clearInterval(this.intervalId);
        this.width = 0;
    };
    /**
     * @return {?}
     */
    Toast.prototype.delayedHideToast = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.options.disableTimeOut ||
            this.options.extendedTimeOut === 0 ||
            this.state.value === 'removed') {
            return;
        }
        this.outsideTimeout(function () { return _this.remove(); }, this.options.extendedTimeOut);
        this.options.timeOut = this.options.extendedTimeOut;
        this.hideTime = new Date().getTime() + (this.options.timeOut || 0);
        this.width = -1;
        if (this.options.progressBar) {
            this.outsideInterval(function () { return _this.updateProgress(); }, 10);
        }
    };
    /**
     * @param {?} func
     * @param {?} timeout
     * @return {?}
     */
    Toast.prototype.outsideTimeout = /**
     * @param {?} func
     * @param {?} timeout
     * @return {?}
     */
    function (func, timeout) {
        var _this = this;
        if (this.ngZone) {
            this.ngZone.runOutsideAngular(function () {
                return (_this.timeout = setTimeout(function () { return _this.runInsideAngular(func); }, timeout));
            });
        }
        else {
            this.timeout = setTimeout(function () { return func(); }, timeout);
        }
    };
    /**
     * @param {?} func
     * @param {?} timeout
     * @return {?}
     */
    Toast.prototype.outsideInterval = /**
     * @param {?} func
     * @param {?} timeout
     * @return {?}
     */
    function (func, timeout) {
        var _this = this;
        if (this.ngZone) {
            this.ngZone.runOutsideAngular(function () {
                return (_this.intervalId = setInterval(function () { return _this.runInsideAngular(func); }, timeout));
            });
        }
        else {
            this.intervalId = setInterval(function () { return func(); }, timeout);
        }
    };
    /**
     * @param {?} func
     * @return {?}
     */
    Toast.prototype.runInsideAngular = /**
     * @param {?} func
     * @return {?}
     */
    function (func) {
        if (this.ngZone) {
            this.ngZone.run(function () { return func(); });
        }
        else {
            func();
        }
    };
    Toast.decorators = [
        { type: Component, args: [{
                    selector: '[toast-component]',
                    template: "\n  <button *ngIf=\"options.closeButton\" (click)=\"remove()\" class=\"toast-close-button\" aria-label=\"Close\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n  <div *ngIf=\"title\" [class]=\"options.titleClass\" [attr.aria-label]=\"title\">\n    {{ title }}\n  </div>\n  <div *ngIf=\"message && options.enableHtml\" role=\"alertdialog\" aria-live=\"polite\"\n    [class]=\"options.messageClass\" [innerHTML]=\"message\">\n  </div>\n  <div *ngIf=\"message && !options.enableHtml\" role=\"alertdialog\" aria-live=\"polite\"\n    [class]=\"options.messageClass\" [attr.aria-label]=\"message\">\n    {{ message }}\n  </div>\n  <div *ngIf=\"options.progressBar\">\n    <div class=\"toast-progress\" [style.width]=\"width + '%'\"></div>\n  </div>\n  ",
                    animations: [
                        trigger('flyInOut', [
                            state('inactive', style({
                                display: 'none',
                                opacity: 0
                            })),
                            state('active', style({})),
                            state('removed', style({ opacity: 0 })),
                            transition('inactive => active', animate('{{ easeTime }}ms {{ easing }}')),
                            transition('active => removed', animate('{{ easeTime }}ms {{ easing }}'))
                        ])
                    ],
                    preserveWhitespaces: false
                }] }
    ];
    /** @nocollapse */
    Toast.ctorParameters = function () { return [
        { type: ToastrService },
        { type: ToastPackage },
        { type: NgZone }
    ]; };
    Toast.propDecorators = {
        toastClasses: [{ type: HostBinding, args: ['class',] }],
        state: [{ type: HostBinding, args: ['@flyInOut',] }],
        tapToast: [{ type: HostListener, args: ['click',] }],
        stickAround: [{ type: HostListener, args: ['mouseenter',] }],
        delayedHideToast: [{ type: HostListener, args: ['mouseleave',] }]
    };
    return Toast;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var DefaultGlobalConfig = __assign({}, DefaultNoComponentGlobalConfig, { toastComponent: Toast });
var ToastrModule = /** @class */ (function () {
    function ToastrModule() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    ToastrModule.forRoot = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: ToastrModule,
            providers: [
                {
                    provide: TOAST_CONFIG,
                    useValue: {
                        default: DefaultGlobalConfig,
                        config: config,
                    },
                },
            ],
        };
    };
    ToastrModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [Toast],
                    exports: [Toast],
                    entryComponents: [Toast],
                },] }
    ];
    return ToastrModule;
}());
var ToastrComponentlessModule = /** @class */ (function () {
    function ToastrComponentlessModule() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    ToastrComponentlessModule.forRoot = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: ToastrModule,
            providers: [
                {
                    provide: TOAST_CONFIG,
                    useValue: {
                        default: DefaultNoComponentGlobalConfig,
                        config: config,
                    },
                },
            ],
        };
    };
    ToastrComponentlessModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                },] }
    ];
    return ToastrComponentlessModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ToastNoAnimation = /** @class */ (function () {
    function ToastNoAnimation(toastrService, toastPackage, appRef) {
        var _this = this;
        this.toastrService = toastrService;
        this.toastPackage = toastPackage;
        this.appRef = appRef;
        /**
         * width of progress bar
         */
        this.width = -1;
        /**
         * a combination of toast type and options.toastClass
         */
        this.toastClasses = '';
        /**
         * controls animation
         */
        this.state = 'inactive';
        this.message = toastPackage.message;
        this.title = toastPackage.title;
        this.options = toastPackage.config;
        this.originalTimeout = toastPackage.config.timeOut;
        this.toastClasses = toastPackage.toastType + " " + toastPackage.config.toastClass;
        this.sub = toastPackage.toastRef.afterActivate().subscribe(function () {
            _this.activateToast();
        });
        this.sub1 = toastPackage.toastRef.manualClosed().subscribe(function () {
            _this.remove();
        });
        this.sub2 = toastPackage.toastRef.timeoutReset().subscribe(function () {
            _this.resetTimeout();
        });
    }
    Object.defineProperty(ToastNoAnimation.prototype, "displayStyle", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.state === 'inactive') {
                return 'none';
            }
            return 'inherit';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ToastNoAnimation.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.sub.unsubscribe();
        this.sub1.unsubscribe();
        this.sub2.unsubscribe();
        clearInterval(this.intervalId);
        clearTimeout(this.timeout);
    };
    /**
     * activates toast and sets timeout
     */
    /**
     * activates toast and sets timeout
     * @return {?}
     */
    ToastNoAnimation.prototype.activateToast = /**
     * activates toast and sets timeout
     * @return {?}
     */
    function () {
        var _this = this;
        this.state = 'active';
        if (!this.options.disableTimeOut && this.options.timeOut) {
            this.timeout = setTimeout(function () {
                _this.remove();
            }, this.options.timeOut);
            this.hideTime = new Date().getTime() + this.options.timeOut;
            if (this.options.progressBar) {
                this.intervalId = setInterval(function () { return _this.updateProgress(); }, 10);
            }
        }
        if (this.options.onActivateTick) {
            this.appRef.tick();
        }
    };
    /**
     * updates progress bar width
     */
    /**
     * updates progress bar width
     * @return {?}
     */
    ToastNoAnimation.prototype.updateProgress = /**
     * updates progress bar width
     * @return {?}
     */
    function () {
        if (this.width === 0 || this.width === 100 || !this.options.timeOut) {
            return;
        }
        /** @type {?} */
        var now = new Date().getTime();
        /** @type {?} */
        var remaining = this.hideTime - now;
        this.width = (remaining / this.options.timeOut) * 100;
        if (this.options.progressAnimation === 'increasing') {
            this.width = 100 - this.width;
        }
        if (this.width <= 0) {
            this.width = 0;
        }
        if (this.width >= 100) {
            this.width = 100;
        }
    };
    /**
     * @return {?}
     */
    ToastNoAnimation.prototype.resetTimeout = /**
     * @return {?}
     */
    function () {
        var _this = this;
        clearTimeout(this.timeout);
        clearInterval(this.intervalId);
        this.state = 'active';
        this.options.timeOut = this.originalTimeout;
        this.timeout = setTimeout(function () { return _this.remove(); }, this.originalTimeout);
        this.hideTime = new Date().getTime() + (this.originalTimeout || 0);
        this.width = -1;
        if (this.options.progressBar) {
            this.intervalId = setInterval(function () { return _this.updateProgress(); }, 10);
        }
    };
    /**
     * tells toastrService to remove this toast after animation time
     */
    /**
     * tells toastrService to remove this toast after animation time
     * @return {?}
     */
    ToastNoAnimation.prototype.remove = /**
     * tells toastrService to remove this toast after animation time
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.state === 'removed') {
            return;
        }
        clearTimeout(this.timeout);
        this.state = 'removed';
        this.timeout = setTimeout(function () {
            return _this.toastrService.remove(_this.toastPackage.toastId);
        });
    };
    /**
     * @return {?}
     */
    ToastNoAnimation.prototype.tapToast = /**
     * @return {?}
     */
    function () {
        if (this.state === 'removed') {
            return;
        }
        this.toastPackage.triggerTap();
        if (this.options.tapToDismiss) {
            this.remove();
        }
    };
    /**
     * @return {?}
     */
    ToastNoAnimation.prototype.stickAround = /**
     * @return {?}
     */
    function () {
        if (this.state === 'removed') {
            return;
        }
        clearTimeout(this.timeout);
        this.options.timeOut = 0;
        this.hideTime = 0;
        // disable progressBar
        clearInterval(this.intervalId);
        this.width = 0;
    };
    /**
     * @return {?}
     */
    ToastNoAnimation.prototype.delayedHideToast = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.options.disableTimeOut ||
            this.options.extendedTimeOut === 0 ||
            this.state === 'removed') {
            return;
        }
        this.timeout = setTimeout(function () { return _this.remove(); }, this.options.extendedTimeOut);
        this.options.timeOut = this.options.extendedTimeOut;
        this.hideTime = new Date().getTime() + (this.options.timeOut || 0);
        this.width = -1;
        if (this.options.progressBar) {
            this.intervalId = setInterval(function () { return _this.updateProgress(); }, 10);
        }
    };
    ToastNoAnimation.decorators = [
        { type: Component, args: [{
                    selector: '[toast-component]',
                    template: "\n  <button *ngIf=\"options.closeButton\" (click)=\"remove()\" class=\"toast-close-button\" aria-label=\"Close\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n  <div *ngIf=\"title\" [class]=\"options.titleClass\" [attr.aria-label]=\"title\">\n    {{ title }}\n  </div>\n  <div *ngIf=\"message && options.enableHtml\" role=\"alert\" aria-live=\"polite\"\n    [class]=\"options.messageClass\" [innerHTML]=\"message\">\n  </div>\n  <div *ngIf=\"message && !options.enableHtml\" role=\"alert\" aria-live=\"polite\"\n    [class]=\"options.messageClass\" [attr.aria-label]=\"message\">\n    {{ message }}\n  </div>\n  <div *ngIf=\"options.progressBar\">\n    <div class=\"toast-progress\" [style.width]=\"width + '%'\"></div>\n  </div>\n  "
                }] }
    ];
    /** @nocollapse */
    ToastNoAnimation.ctorParameters = function () { return [
        { type: ToastrService },
        { type: ToastPackage },
        { type: ApplicationRef }
    ]; };
    ToastNoAnimation.propDecorators = {
        toastClasses: [{ type: HostBinding, args: ['class',] }],
        displayStyle: [{ type: HostBinding, args: ['style.display',] }],
        tapToast: [{ type: HostListener, args: ['click',] }],
        stickAround: [{ type: HostListener, args: ['mouseenter',] }],
        delayedHideToast: [{ type: HostListener, args: ['mouseleave',] }]
    };
    return ToastNoAnimation;
}());
/** @type {?} */
var DefaultNoAnimationsGlobalConfig = __assign({}, DefaultNoComponentGlobalConfig, { toastComponent: ToastNoAnimation });
var ToastNoAnimationModule = /** @class */ (function () {
    function ToastNoAnimationModule() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    ToastNoAnimationModule.forRoot = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: ToastNoAnimationModule,
            providers: [
                {
                    provide: TOAST_CONFIG,
                    useValue: {
                        default: DefaultNoAnimationsGlobalConfig,
                        config: config,
                    },
                },
            ],
        };
    };
    ToastNoAnimationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [ToastNoAnimation],
                    exports: [ToastNoAnimation],
                    entryComponents: [ToastNoAnimation],
                },] }
    ];
    return ToastNoAnimationModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { ToastContainerDirective, ToastContainerModule, Toast, ToastrService, ToastPackage, DefaultNoComponentGlobalConfig, TOAST_CONFIG, DefaultGlobalConfig, ToastrModule, ToastrComponentlessModule, ToastRef, ToastInjector, ToastNoAnimation, DefaultNoAnimationsGlobalConfig, ToastNoAnimationModule, ComponentPortal, BasePortalHost, Overlay, OverlayContainer, OverlayRef };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRvYXN0ci5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LXRvYXN0ci90b2FzdHIvdG9hc3QuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtdG9hc3RyL3RvYXN0ci90b2FzdHItY29uZmlnLnRzIiwibmc6Ly9uZ3gtdG9hc3RyL3BvcnRhbC9wb3J0YWwudHMiLCJuZzovL25neC10b2FzdHIvcG9ydGFsL2RvbS1wb3J0YWwtaG9zdC50cyIsIm5nOi8vbmd4LXRvYXN0ci9vdmVybGF5L292ZXJsYXktY29udGFpbmVyLnRzIiwibmc6Ly9uZ3gtdG9hc3RyL292ZXJsYXkvb3ZlcmxheS1yZWYudHMiLCJuZzovL25neC10b2FzdHIvb3ZlcmxheS9vdmVybGF5LnRzIiwibmc6Ly9uZ3gtdG9hc3RyL3RvYXN0ci90b2FzdC1pbmplY3Rvci50cyIsIm5nOi8vbmd4LXRvYXN0ci90b2FzdHIvdG9hc3RyLnNlcnZpY2UudHMiLCJuZzovL25neC10b2FzdHIvdG9hc3RyL3RvYXN0LmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXRvYXN0ci90b2FzdHIvdG9hc3RyLm1vZHVsZS50cyIsIm5nOi8vbmd4LXRvYXN0ci90b2FzdHIvdG9hc3Qtbm9hbmltYXRpb24uY29tcG9uZW50LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgTmdNb2R1bGUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdG9hc3RDb250YWluZXJdJyxcbiAgZXhwb3J0QXM6ICd0b2FzdENvbnRhaW5lcicsXG59KVxuZXhwb3J0IGNsYXNzIFRvYXN0Q29udGFpbmVyRGlyZWN0aXZlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikgeyB9XG4gIGdldENvbnRhaW5lckVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbVG9hc3RDb250YWluZXJEaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbVG9hc3RDb250YWluZXJEaXJlY3RpdmVdLFxufSlcbmV4cG9ydCBjbGFzcyBUb2FzdENvbnRhaW5lck1vZHVsZSB7fVxuIiwiaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gJy4uL3BvcnRhbC9wb3J0YWwnO1xuaW1wb3J0IHsgVG9hc3RSZWYgfSBmcm9tICcuL3RvYXN0LWluamVjdG9yJztcblxuZXhwb3J0IHR5cGUgUHJvZ3Jlc3NBbmltYXRpb25UeXBlID0gJ2luY3JlYXNpbmcnIHwgJ2RlY3JlYXNpbmcnO1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIGFuIGluZGl2aWR1YWwgdG9hc3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5kaXZpZHVhbENvbmZpZyB7XG4gIC8qKlxuICAgKiBkaXNhYmxlIGJvdGggdGltZU91dCBhbmQgZXh0ZW5kZWRUaW1lT3V0XG4gICAqIGRlZmF1bHQ6IGZhbHNlXG4gICAqL1xuICBkaXNhYmxlVGltZU91dDogYm9vbGVhbjtcbiAgLyoqXG4gICAqIHRvYXN0IHRpbWUgdG8gbGl2ZSBpbiBtaWxsaXNlY29uZHNcbiAgICogZGVmYXVsdDogNTAwMFxuICAgKi9cbiAgdGltZU91dDogbnVtYmVyO1xuICAvKipcbiAgICogdG9hc3Qgc2hvdyBjbG9zZSBidXR0b25cbiAgICogZGVmYXVsdDogZmFsc2VcbiAgICovXG4gIGNsb3NlQnV0dG9uOiBib29sZWFuO1xuICAvKipcbiAgICogdGltZSB0byBjbG9zZSBhZnRlciBhIHVzZXIgaG92ZXJzIG92ZXIgdG9hc3RcbiAgICogZGVmYXVsdDogMTAwMFxuICAgKi9cbiAgZXh0ZW5kZWRUaW1lT3V0OiBudW1iZXI7XG4gIC8qKlxuICAgKiBzaG93IHRvYXN0IHByb2dyZXNzIGJhclxuICAgKiBkZWZhdWx0OiBmYWxzZVxuICAgKi9cbiAgcHJvZ3Jlc3NCYXI6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIGNoYW5nZXMgdG9hc3QgcHJvZ3Jlc3MgYmFyIGFuaW1hdGlvblxuICAgKiBkZWZhdWx0OiBkZWNyZWFzaW5nXG4gICAqL1xuICBwcm9ncmVzc0FuaW1hdGlvbjogUHJvZ3Jlc3NBbmltYXRpb25UeXBlO1xuXG4gIC8qKlxuICAgKiByZW5kZXIgaHRtbCBpbiB0b2FzdCBtZXNzYWdlIChwb3NzaWJseSB1bnNhZmUpXG4gICAqIGRlZmF1bHQ6IGZhbHNlXG4gICAqL1xuICBlbmFibGVIdG1sOiBib29sZWFuO1xuICAvKipcbiAgICogY3NzIGNsYXNzIG9uIHRvYXN0IGNvbXBvbmVudFxuICAgKiBkZWZhdWx0OiB0b2FzdFxuICAgKi9cbiAgdG9hc3RDbGFzczogc3RyaW5nO1xuICAvKipcbiAgICogY3NzIGNsYXNzIG9uIHRvYXN0IGNvbnRhaW5lclxuICAgKiBkZWZhdWx0OiB0b2FzdC10b3AtcmlnaHRcbiAgICovXG4gIHBvc2l0aW9uQ2xhc3M6IHN0cmluZztcbiAgLyoqXG4gICAqIGNzcyBjbGFzcyBvbiB0b2FzdCB0aXRsZVxuICAgKiBkZWZhdWx0OiB0b2FzdC10aXRsZVxuICAgKi9cbiAgdGl0bGVDbGFzczogc3RyaW5nO1xuICAvKipcbiAgICogY3NzIGNsYXNzIG9uIHRvYXN0IG1lc3NhZ2VcbiAgICogZGVmYXVsdDogdG9hc3QtbWVzc2FnZVxuICAgKi9cbiAgbWVzc2FnZUNsYXNzOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBhbmltYXRpb24gZWFzaW5nIG9uIHRvYXN0XG4gICAqIGRlZmF1bHQ6IGVhc2UtaW5cbiAgICovXG4gIGVhc2luZzogc3RyaW5nO1xuICAvKipcbiAgICogYW5pbWF0aW9uIGVhc2UgdGltZSBvbiB0b2FzdFxuICAgKiBkZWZhdWx0OiAzMDBcbiAgICovXG4gIGVhc2VUaW1lOiBzdHJpbmcgfCBudW1iZXI7XG4gIC8qKlxuICAgKiBjbGlja2luZyBvbiB0b2FzdCBkaXNtaXNzZXMgaXRcbiAgICogZGVmYXVsdDogdHJ1ZVxuICAgKi9cbiAgdGFwVG9EaXNtaXNzOiBib29sZWFuO1xuICAvKipcbiAgICogQW5ndWxhciB0b2FzdCBjb21wb25lbnQgdG8gYmUgc2hvd25cbiAgICogZGVmYXVsdDogVG9hc3RcbiAgICovXG4gIHRvYXN0Q29tcG9uZW50PzogQ29tcG9uZW50VHlwZTxhbnk+O1xuICAvKipcbiAgICogSGVscHMgc2hvdyB0b2FzdCBmcm9tIGEgd2Vic29ja2V0IG9yIGZyb20gZXZlbnQgb3V0c2lkZSBBbmd1bGFyXG4gICAqIGRlZmF1bHQ6IGZhbHNlXG4gICAqL1xuICBvbkFjdGl2YXRlVGljazogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUb2FzdHJJY29uQ2xhc3NlcyB7XG4gIGVycm9yOiBzdHJpbmc7XG4gIGluZm86IHN0cmluZztcbiAgc3VjY2Vzczogc3RyaW5nO1xuICB3YXJuaW5nOiBzdHJpbmc7XG59XG5cbi8qKlxuICogR2xvYmFsIFRvYXN0IGNvbmZpZ3VyYXRpb25cbiAqIEluY2x1ZGVzIGFsbCBJbmRpdmlkdWFsQ29uZmlnXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgR2xvYmFsQ29uZmlnIGV4dGVuZHMgSW5kaXZpZHVhbENvbmZpZyB7XG4gIC8qKlxuICAgKiBtYXggdG9hc3RzIG9wZW5lZC4gVG9hc3RzIHdpbGwgYmUgcXVldWVkXG4gICAqIFplcm8gaXMgdW5saW1pdGVkXG4gICAqIGRlZmF1bHQ6IDBcbiAgICovXG4gIG1heE9wZW5lZDogbnVtYmVyO1xuICAvKipcbiAgICogZGlzbWlzcyBjdXJyZW50IHRvYXN0IHdoZW4gbWF4IGlzIHJlYWNoZWRcbiAgICogZGVmYXVsdDogZmFsc2VcbiAgICovXG4gIGF1dG9EaXNtaXNzOiBib29sZWFuO1xuICBpY29uQ2xhc3NlczogUGFydGlhbDxUb2FzdHJJY29uQ2xhc3Nlcz47XG4gIC8qKlxuICAgKiBOZXcgdG9hc3QgcGxhY2VtZW50XG4gICAqIGRlZmF1bHQ6IHRydWVcbiAgICovXG4gIG5ld2VzdE9uVG9wOiBib29sZWFuO1xuICAvKipcbiAgICogYmxvY2sgZHVwbGljYXRlIG1lc3NhZ2VzXG4gICAqIGRlZmF1bHQ6IGZhbHNlXG4gICAqL1xuICBwcmV2ZW50RHVwbGljYXRlczogYm9vbGVhbjtcblxuICAvKipcbiAgICogUmVzZXQgdG9hc3QgdGltZW91dCB3aGVuIHRoZXJlJ3MgYSBkdXBsaWNhdGUgKHByZXZlbnREdXBsaWNhdGVzIG5lZWRzIHRvIGJlIHNldCB0byB0cnVlKVxuICAgKiBkZWZhdWx0OiBmYWxzZVxuICAgKi9cbiAgcmVzZXRUaW1lb3V0T25EdXBsaWNhdGU6IGJvb2xlYW47XG59XG5cbi8qKlxuICogRXZlcnl0aGluZyBhIHRvYXN0IG5lZWRzIHRvIGxhdW5jaFxuICovXG5leHBvcnQgY2xhc3MgVG9hc3RQYWNrYWdlIHtcbiAgcHJpdmF0ZSBfb25UYXAgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHByaXZhdGUgX29uQWN0aW9uID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyB0b2FzdElkOiBudW1iZXIsXG4gICAgcHVibGljIGNvbmZpZzogSW5kaXZpZHVhbENvbmZpZyxcbiAgICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nIHwgU2FmZUh0bWwgfCBudWxsIHwgdW5kZWZpbmVkLFxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIHB1YmxpYyB0b2FzdFR5cGU6IHN0cmluZyxcbiAgICBwdWJsaWMgdG9hc3RSZWY6IFRvYXN0UmVmPGFueT4sXG4gICkge1xuICAgIHRoaXMudG9hc3RSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5fb25BY3Rpb24uY29tcGxldGUoKTtcbiAgICAgIHRoaXMuX29uVGFwLmNvbXBsZXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogRmlyZWQgb24gY2xpY2sgKi9cbiAgdHJpZ2dlclRhcCgpIHtcbiAgICB0aGlzLl9vblRhcC5uZXh0KCk7XG4gICAgaWYgKHRoaXMuY29uZmlnLnRhcFRvRGlzbWlzcykge1xuICAgICAgdGhpcy5fb25UYXAuY29tcGxldGUoKTtcbiAgICB9XG4gIH1cblxuICBvblRhcCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9vblRhcC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKiBhdmFpbGFibGUgZm9yIHVzZSBpbiBjdXN0b20gdG9hc3QgKi9cbiAgdHJpZ2dlckFjdGlvbihhY3Rpb24/OiBhbnkpIHtcbiAgICB0aGlzLl9vbkFjdGlvbi5uZXh0KGFjdGlvbik7XG4gIH1cblxuICBvbkFjdGlvbigpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9vbkFjdGlvbi5hc09ic2VydmFibGUoKTtcbiAgfVxufVxuXG4vKiB0c2xpbnQ6ZGlzYWJsZTpuby1lbXB0eS1pbnRlcmZhY2UgKi9cbi8qKiBAZGVwcmVjYXRlZCB1c2UgR2xvYmFsQ29uZmlnICovXG5leHBvcnQgaW50ZXJmYWNlIEdsb2JhbFRvYXN0ckNvbmZpZyBleHRlbmRzIEdsb2JhbENvbmZpZyB7fVxuLyoqIEBkZXByZWNhdGVkIHVzZSBJbmRpdmlkdWFsQ29uZmlnICovXG5leHBvcnQgaW50ZXJmYWNlIEluZGl2aWR1YWxUb2FzdHJDb25maWcgZXh0ZW5kcyBJbmRpdmlkdWFsQ29uZmlnIHt9XG4vKiogQGRlcHJlY2F0ZWQgdXNlIEluZGl2aWR1YWxDb25maWcgKi9cbmV4cG9ydCBpbnRlcmZhY2UgVG9hc3RyQ29uZmlnIGV4dGVuZHMgSW5kaXZpZHVhbENvbmZpZyB7fVxuXG5leHBvcnQgY29uc3QgRGVmYXVsdE5vQ29tcG9uZW50R2xvYmFsQ29uZmlnOiBHbG9iYWxDb25maWcgPSB7XG4gIG1heE9wZW5lZDogMCxcbiAgYXV0b0Rpc21pc3M6IGZhbHNlLFxuICBuZXdlc3RPblRvcDogdHJ1ZSxcbiAgcHJldmVudER1cGxpY2F0ZXM6IGZhbHNlLFxuICByZXNldFRpbWVvdXRPbkR1cGxpY2F0ZTogZmFsc2UsXG4gIGljb25DbGFzc2VzOiB7XG4gICAgZXJyb3I6ICd0b2FzdC1lcnJvcicsXG4gICAgaW5mbzogJ3RvYXN0LWluZm8nLFxuICAgIHN1Y2Nlc3M6ICd0b2FzdC1zdWNjZXNzJyxcbiAgICB3YXJuaW5nOiAndG9hc3Qtd2FybmluZycsXG4gIH0sXG5cbiAgLy8gSW5kaXZpZHVhbFxuICBjbG9zZUJ1dHRvbjogZmFsc2UsXG4gIGRpc2FibGVUaW1lT3V0OiBmYWxzZSxcbiAgdGltZU91dDogNTAwMCxcbiAgZXh0ZW5kZWRUaW1lT3V0OiAxMDAwLFxuICBlbmFibGVIdG1sOiBmYWxzZSxcbiAgcHJvZ3Jlc3NCYXI6IGZhbHNlLFxuICB0b2FzdENsYXNzOiAndG9hc3QnLFxuICBwb3NpdGlvbkNsYXNzOiAndG9hc3QtdG9wLXJpZ2h0JyxcbiAgdGl0bGVDbGFzczogJ3RvYXN0LXRpdGxlJyxcbiAgbWVzc2FnZUNsYXNzOiAndG9hc3QtbWVzc2FnZScsXG4gIGVhc2luZzogJ2Vhc2UtaW4nLFxuICBlYXNlVGltZTogMzAwLFxuICB0YXBUb0Rpc21pc3M6IHRydWUsXG4gIG9uQWN0aXZhdGVUaWNrOiBmYWxzZSxcbiAgcHJvZ3Jlc3NBbmltYXRpb246ICdkZWNyZWFzaW5nJyxcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgVG9hc3RUb2tlbiB7XG4gIGRlZmF1bHQ6IEdsb2JhbENvbmZpZztcbiAgY29uZmlnOiBQYXJ0aWFsPEdsb2JhbENvbmZpZz47XG59XG5cbmV4cG9ydCBjb25zdCBUT0FTVF9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48VG9hc3RUb2tlbj4oJ1RvYXN0Q29uZmlnJyk7XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnRSZWYsXG4gIEluamVjdG9yLFxuICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbXBvbmVudFR5cGU8VD4ge1xuICBuZXcgKC4uLmFyZ3M6IGFueVtdKTogVDtcbn1cblxuXG4vKipcbiAqIEEgYENvbXBvbmVudFBvcnRhbGAgaXMgYSBwb3J0YWwgdGhhdCBpbnN0YW50aWF0ZXMgc29tZSBDb21wb25lbnQgdXBvbiBhdHRhY2htZW50LlxuICovXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50UG9ydGFsPFQ+IHtcbiAgcHJpdmF0ZSBfYXR0YWNoZWRIb3N0PzogQmFzZVBvcnRhbEhvc3Q7XG4gIC8qKiBUaGUgdHlwZSBvZiB0aGUgY29tcG9uZW50IHRoYXQgd2lsbCBiZSBpbnN0YW50aWF0ZWQgZm9yIGF0dGFjaG1lbnQuICovXG4gIGNvbXBvbmVudDogQ29tcG9uZW50VHlwZTxUPjtcblxuICAvKipcbiAgICogW09wdGlvbmFsXSBXaGVyZSB0aGUgYXR0YWNoZWQgY29tcG9uZW50IHNob3VsZCBsaXZlIGluIEFuZ3VsYXIncyAqbG9naWNhbCogY29tcG9uZW50IHRyZWUuXG4gICAqIFRoaXMgaXMgZGlmZmVyZW50IGZyb20gd2hlcmUgdGhlIGNvbXBvbmVudCAqcmVuZGVycyosIHdoaWNoIGlzIGRldGVybWluZWQgYnkgdGhlIFBvcnRhbEhvc3QuXG4gICAqIFRoZSBvcmlnaW4gbmVjZXNzYXJ5IHdoZW4gdGhlIGhvc3QgaXMgb3V0c2lkZSBvZiB0aGUgQW5ndWxhciBhcHBsaWNhdGlvbiBjb250ZXh0LlxuICAgKi9cbiAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZjtcblxuICAvKiogSW5qZWN0b3IgdXNlZCBmb3IgdGhlIGluc3RhbnRpYXRpb24gb2YgdGhlIGNvbXBvbmVudC4gKi9cbiAgaW5qZWN0b3I6IEluamVjdG9yO1xuXG4gIGNvbnN0cnVjdG9yKGNvbXBvbmVudDogQ29tcG9uZW50VHlwZTxUPiwgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgdGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgdGhpcy5pbmplY3RvciA9IGluamVjdG9yO1xuICB9XG5cbiAgLyoqIEF0dGFjaCB0aGlzIHBvcnRhbCB0byBhIGhvc3QuICovXG4gIGF0dGFjaChob3N0OiBCYXNlUG9ydGFsSG9zdCwgbmV3ZXN0T25Ub3A6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9hdHRhY2hlZEhvc3QgPSBob3N0O1xuICAgIHJldHVybiBob3N0LmF0dGFjaCh0aGlzLCBuZXdlc3RPblRvcCk7XG4gIH1cblxuICAvKiogRGV0YWNoIHRoaXMgcG9ydGFsIGZyb20gaXRzIGhvc3QgKi9cbiAgZGV0YWNoKCkge1xuICAgIGNvbnN0IGhvc3QgPSB0aGlzLl9hdHRhY2hlZEhvc3Q7XG4gICAgaWYgKGhvc3QpIHtcbiAgICAgIHRoaXMuX2F0dGFjaGVkSG9zdCA9IHVuZGVmaW5lZDtcbiAgICAgIHJldHVybiBob3N0LmRldGFjaCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoaXMgcG9ydGFsIGlzIGF0dGFjaGVkIHRvIGEgaG9zdC4gKi9cbiAgZ2V0IGlzQXR0YWNoZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dGFjaGVkSG9zdCAhPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIFBvcnRhbEhvc3QgcmVmZXJlbmNlIHdpdGhvdXQgcGVyZm9ybWluZyBgYXR0YWNoKClgLiBUaGlzIGlzIHVzZWQgZGlyZWN0bHkgYnlcbiAgICogdGhlIFBvcnRhbEhvc3Qgd2hlbiBpdCBpcyBwZXJmb3JtaW5nIGFuIGBhdHRhY2goKWAgb3IgYGRldGFjaCgpYC5cbiAgICovXG4gIHNldEF0dGFjaGVkSG9zdChob3N0PzogQmFzZVBvcnRhbEhvc3QpIHtcbiAgICB0aGlzLl9hdHRhY2hlZEhvc3QgPSBob3N0O1xuICB9XG59XG5cbi8qKlxuICogUGFydGlhbCBpbXBsZW1lbnRhdGlvbiBvZiBQb3J0YWxIb3N0IHRoYXQgb25seSBkZWFscyB3aXRoIGF0dGFjaGluZyBhXG4gKiBDb21wb25lbnRQb3J0YWxcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VQb3J0YWxIb3N0IHtcbiAgLyoqIFRoZSBwb3J0YWwgY3VycmVudGx5IGF0dGFjaGVkIHRvIHRoZSBob3N0LiAqL1xuICBwcml2YXRlIF9hdHRhY2hlZFBvcnRhbD86IENvbXBvbmVudFBvcnRhbDxhbnk+O1xuXG4gIC8qKiBBIGZ1bmN0aW9uIHRoYXQgd2lsbCBwZXJtYW5lbnRseSBkaXNwb3NlIHRoaXMgaG9zdC4gKi9cbiAgcHJpdmF0ZSBfZGlzcG9zZUZuPzogKCkgPT4gdm9pZDtcblxuICBhdHRhY2gocG9ydGFsOiBDb21wb25lbnRQb3J0YWw8YW55PiwgbmV3ZXN0T25Ub3A6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9hdHRhY2hlZFBvcnRhbCA9IHBvcnRhbDtcbiAgICByZXR1cm4gdGhpcy5hdHRhY2hDb21wb25lbnRQb3J0YWwocG9ydGFsLCBuZXdlc3RPblRvcCk7XG4gIH1cblxuICBhYnN0cmFjdCBhdHRhY2hDb21wb25lbnRQb3J0YWw8VD4ocG9ydGFsOiBDb21wb25lbnRQb3J0YWw8VD4sIG5ld2VzdE9uVG9wOiBib29sZWFuKTogQ29tcG9uZW50UmVmPFQ+O1xuXG4gIGRldGFjaCgpIHtcbiAgICBpZiAodGhpcy5fYXR0YWNoZWRQb3J0YWwpIHtcbiAgICAgIHRoaXMuX2F0dGFjaGVkUG9ydGFsLnNldEF0dGFjaGVkSG9zdCgpO1xuICAgIH1cblxuICAgIHRoaXMuX2F0dGFjaGVkUG9ydGFsID0gdW5kZWZpbmVkO1xuICAgIGlmICh0aGlzLl9kaXNwb3NlRm4pIHtcbiAgICAgIHRoaXMuX2Rpc3Bvc2VGbigpO1xuICAgICAgdGhpcy5fZGlzcG9zZUZuID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHNldERpc3Bvc2VGbihmbjogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMuX2Rpc3Bvc2VGbiA9IGZuO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBBcHBsaWNhdGlvblJlZixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBDb21wb25lbnRSZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXNlUG9ydGFsSG9zdCwgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnLi9wb3J0YWwnO1xuXG4vKipcbiAqIEEgUG9ydGFsSG9zdCBmb3IgYXR0YWNoaW5nIHBvcnRhbHMgdG8gYW4gYXJiaXRyYXJ5IERPTSBlbGVtZW50IG91dHNpZGUgb2YgdGhlIEFuZ3VsYXJcbiAqIGFwcGxpY2F0aW9uIGNvbnRleHQuXG4gKlxuICogVGhpcyBpcyB0aGUgb25seSBwYXJ0IG9mIHRoZSBwb3J0YWwgY29yZSB0aGF0IGRpcmVjdGx5IHRvdWNoZXMgdGhlIERPTS5cbiAqL1xuZXhwb3J0IGNsYXNzIERvbVBvcnRhbEhvc3QgZXh0ZW5kcyBCYXNlUG9ydGFsSG9zdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2hvc3REb21FbGVtZW50OiBFbGVtZW50LFxuICAgIHByaXZhdGUgX2NvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgX2FwcFJlZjogQXBwbGljYXRpb25SZWYsXG4gICkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIHRoZSBnaXZlbiBDb21wb25lbnRQb3J0YWwgdG8gRE9NIGVsZW1lbnQgdXNpbmcgdGhlIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5cbiAgICogQHBhcmFtIHBvcnRhbCBQb3J0YWwgdG8gYmUgYXR0YWNoZWRcbiAgICovXG4gIGF0dGFjaENvbXBvbmVudFBvcnRhbDxUPihcbiAgICBwb3J0YWw6IENvbXBvbmVudFBvcnRhbDxUPixcbiAgICBuZXdlc3RPblRvcDogYm9vbGVhbixcbiAgKTogQ29tcG9uZW50UmVmPFQ+IHtcbiAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5fY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxuICAgICAgcG9ydGFsLmNvbXBvbmVudCxcbiAgICApO1xuICAgIGxldCBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxUPjtcblxuICAgIC8vIElmIHRoZSBwb3J0YWwgc3BlY2lmaWVzIGEgVmlld0NvbnRhaW5lclJlZiwgd2Ugd2lsbCB1c2UgdGhhdCBhcyB0aGUgYXR0YWNobWVudCBwb2ludFxuICAgIC8vIGZvciB0aGUgY29tcG9uZW50IChpbiB0ZXJtcyBvZiBBbmd1bGFyJ3MgY29tcG9uZW50IHRyZWUsIG5vdCByZW5kZXJpbmcpLlxuICAgIC8vIFdoZW4gdGhlIFZpZXdDb250YWluZXJSZWYgaXMgbWlzc2luZywgd2UgdXNlIHRoZSBmYWN0b3J5IHRvIGNyZWF0ZSB0aGUgY29tcG9uZW50IGRpcmVjdGx5XG4gICAgLy8gYW5kIHRoZW4gbWFudWFsbHkgYXR0YWNoIHRoZSBDaGFuZ2VEZXRlY3RvciBmb3IgdGhhdCBjb21wb25lbnQgdG8gdGhlIGFwcGxpY2F0aW9uICh3aGljaFxuICAgIC8vIGhhcHBlbnMgYXV0b21hdGljYWxseSB3aGVuIHVzaW5nIGEgVmlld0NvbnRhaW5lcikuXG4gICAgY29tcG9uZW50UmVmID0gY29tcG9uZW50RmFjdG9yeS5jcmVhdGUocG9ydGFsLmluamVjdG9yKTtcblxuICAgIC8vIFdoZW4gY3JlYXRpbmcgYSBjb21wb25lbnQgb3V0c2lkZSBvZiBhIFZpZXdDb250YWluZXIsIHdlIG5lZWQgdG8gbWFudWFsbHkgcmVnaXN0ZXJcbiAgICAvLyBpdHMgQ2hhbmdlRGV0ZWN0b3Igd2l0aCB0aGUgYXBwbGljYXRpb24uIFRoaXMgQVBJIGlzIHVuZm9ydHVuYXRlbHkgbm90IHlldCBwdWJsaXNoZWRcbiAgICAvLyBpbiBBbmd1bGFyIGNvcmUuIFRoZSBjaGFuZ2UgZGV0ZWN0b3IgbXVzdCBhbHNvIGJlIGRlcmVnaXN0ZXJlZCB3aGVuIHRoZSBjb21wb25lbnRcbiAgICAvLyBpcyBkZXN0cm95ZWQgdG8gcHJldmVudCBtZW1vcnkgbGVha3MuXG4gICAgdGhpcy5fYXBwUmVmLmF0dGFjaFZpZXcoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcblxuICAgIHRoaXMuc2V0RGlzcG9zZUZuKCgpID0+IHtcbiAgICAgIHRoaXMuX2FwcFJlZi5kZXRhY2hWaWV3KGNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG4gICAgICBjb21wb25lbnRSZWYuZGVzdHJveSgpO1xuICAgIH0pO1xuXG4gICAgLy8gQXQgdGhpcyBwb2ludCB0aGUgY29tcG9uZW50IGhhcyBiZWVuIGluc3RhbnRpYXRlZCwgc28gd2UgbW92ZSBpdCB0byB0aGUgbG9jYXRpb24gaW4gdGhlIERPTVxuICAgIC8vIHdoZXJlIHdlIHdhbnQgaXQgdG8gYmUgcmVuZGVyZWQuXG4gICAgaWYgKG5ld2VzdE9uVG9wKSB7XG4gICAgICB0aGlzLl9ob3N0RG9tRWxlbWVudC5pbnNlcnRCZWZvcmUoXG4gICAgICAgIHRoaXMuX2dldENvbXBvbmVudFJvb3ROb2RlKGNvbXBvbmVudFJlZiksXG4gICAgICAgIHRoaXMuX2hvc3REb21FbGVtZW50LmZpcnN0Q2hpbGQsXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9ob3N0RG9tRWxlbWVudC5hcHBlbmRDaGlsZChcbiAgICAgICAgdGhpcy5fZ2V0Q29tcG9uZW50Um9vdE5vZGUoY29tcG9uZW50UmVmKSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbXBvbmVudFJlZjtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSByb290IEhUTUxFbGVtZW50IGZvciBhbiBpbnN0YW50aWF0ZWQgY29tcG9uZW50LiAqL1xuICBwcml2YXRlIF9nZXRDb21wb25lbnRSb290Tm9kZShjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+KTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiAoY29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KS5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKiBDb250YWluZXIgaW5zaWRlIHdoaWNoIGFsbCB0b2FzdHMgd2lsbCByZW5kZXIuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIE92ZXJsYXlDb250YWluZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgX2NvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByb3RlY3RlZCBfZG9jdW1lbnQ6IGFueSkge31cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fY29udGFpbmVyRWxlbWVudCAmJiB0aGlzLl9jb250YWluZXJFbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICAgIHRoaXMuX2NvbnRhaW5lckVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLl9jb250YWluZXJFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgb3ZlcmxheSBjb250YWluZXIgZWxlbWVudC4gSXQgd2lsbCBsYXppbHlcbiAgICogY3JlYXRlIHRoZSBlbGVtZW50IHRoZSBmaXJzdCB0aW1lICBpdCBpcyBjYWxsZWQgdG8gZmFjaWxpdGF0ZSB1c2luZ1xuICAgKiB0aGUgY29udGFpbmVyIGluIG5vbi1icm93c2VyIGVudmlyb25tZW50cy5cbiAgICogQHJldHVybnMgdGhlIGNvbnRhaW5lciBlbGVtZW50XG4gICAqL1xuICBnZXRDb250YWluZXJFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICBpZiAoIXRoaXMuX2NvbnRhaW5lckVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX2NyZWF0ZUNvbnRhaW5lcigpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fY29udGFpbmVyRWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgdGhlIG92ZXJsYXkgY29udGFpbmVyIGVsZW1lbnQsIHdoaWNoIGlzIHNpbXBseSBhIGRpdlxuICAgKiB3aXRoIHRoZSAnY2RrLW92ZXJsYXktY29udGFpbmVyJyBjbGFzcyBvbiB0aGUgZG9jdW1lbnQgYm9keS5cbiAgICovXG4gIHByb3RlY3RlZCBfY3JlYXRlQ29udGFpbmVyKCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdvdmVybGF5LWNvbnRhaW5lcicpO1xuICAgIHRoaXMuX2RvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICB0aGlzLl9jb250YWluZXJFbGVtZW50ID0gY29udGFpbmVyO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VQb3J0YWxIb3N0LCBDb21wb25lbnRQb3J0YWwgfSBmcm9tICcuLi9wb3J0YWwvcG9ydGFsJztcblxuLyoqXG4gKiBSZWZlcmVuY2UgdG8gYW4gb3ZlcmxheSB0aGF0IGhhcyBiZWVuIGNyZWF0ZWQgd2l0aCB0aGUgT3ZlcmxheSBzZXJ2aWNlLlxuICogVXNlZCB0byBtYW5pcHVsYXRlIG9yIGRpc3Bvc2Ugb2Ygc2FpZCBvdmVybGF5LlxuICovXG5leHBvcnQgY2xhc3MgT3ZlcmxheVJlZiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BvcnRhbEhvc3Q6IEJhc2VQb3J0YWxIb3N0KSB7fVxuXG4gIGF0dGFjaChcbiAgICBwb3J0YWw6IENvbXBvbmVudFBvcnRhbDxhbnk+LFxuICAgIG5ld2VzdE9uVG9wOiBib29sZWFuID0gdHJ1ZSxcbiAgKTogQ29tcG9uZW50UmVmPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9wb3J0YWxIb3N0LmF0dGFjaChwb3J0YWwsIG5ld2VzdE9uVG9wKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRhY2hlcyBhbiBvdmVybGF5IGZyb20gYSBwb3J0YWwuXG4gICAqIEByZXR1cm5zIFJlc29sdmVzIHdoZW4gdGhlIG92ZXJsYXkgaGFzIGJlZW4gZGV0YWNoZWQuXG4gICAqL1xuICBkZXRhY2goKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BvcnRhbEhvc3QuZGV0YWNoKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFwcGxpY2F0aW9uUmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIEluamVjdCxcbiAgSW5qZWN0YWJsZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERvbVBvcnRhbEhvc3QgfSBmcm9tICcuLi9wb3J0YWwvZG9tLXBvcnRhbC1ob3N0JztcbmltcG9ydCB7IFRvYXN0Q29udGFpbmVyRGlyZWN0aXZlIH0gZnJvbSAnLi4vdG9hc3RyL3RvYXN0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBPdmVybGF5Q29udGFpbmVyIH0gZnJvbSAnLi9vdmVybGF5LWNvbnRhaW5lcic7XG5pbXBvcnQgeyBPdmVybGF5UmVmIH0gZnJvbSAnLi9vdmVybGF5LXJlZic7XG5cbi8qKlxuICogU2VydmljZSB0byBjcmVhdGUgT3ZlcmxheXMuIE92ZXJsYXlzIGFyZSBkeW5hbWljYWxseSBhZGRlZCBwaWVjZXMgb2YgZmxvYXRpbmcgVUksIG1lYW50IHRvIGJlXG4gKiB1c2VkIGFzIGEgbG93LWxldmVsIGJ1aWxkaW5nIGJ1aWxkaW5nIGJsb2NrIGZvciBvdGhlciBjb21wb25lbnRzLiBEaWFsb2dzLCB0b29sdGlwcywgbWVudXMsXG4gKiBzZWxlY3RzLCBldGMuIGNhbiBhbGwgYmUgYnVpbHQgdXNpbmcgb3ZlcmxheXMuIFRoZSBzZXJ2aWNlIHNob3VsZCBwcmltYXJpbHkgYmUgdXNlZCBieSBhdXRob3JzXG4gKiBvZiByZS11c2FibGUgY29tcG9uZW50cyByYXRoZXIgdGhhbiBkZXZlbG9wZXJzIGJ1aWxkaW5nIGVuZC11c2VyIGFwcGxpY2F0aW9ucy5cbiAqXG4gKiBBbiBvdmVybGF5ICppcyogYSBQb3J0YWxIb3N0LCBzbyBhbnkga2luZCBvZiBQb3J0YWwgY2FuIGJlIGxvYWRlZCBpbnRvIG9uZS5cbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBPdmVybGF5IHtcbiAgLy8gTmFtZXNwYWNlIHBhbmVzIGJ5IG92ZXJsYXkgY29udGFpbmVyXG4gIHByaXZhdGUgX3BhbmVFbGVtZW50czogTWFwPFxuICAgIFRvYXN0Q29udGFpbmVyRGlyZWN0aXZlLFxuICAgIHsgc3RyaW5nPzogSFRNTEVsZW1lbnQgfVxuICA+ID0gbmV3IE1hcCgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX292ZXJsYXlDb250YWluZXI6IE92ZXJsYXlDb250YWluZXIsXG4gICAgcHJpdmF0ZSBfY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBfYXBwUmVmOiBBcHBsaWNhdGlvblJlZixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LFxuICApIHt9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIG92ZXJsYXkuXG4gICAqIEByZXR1cm5zIEEgcmVmZXJlbmNlIHRvIHRoZSBjcmVhdGVkIG92ZXJsYXkuXG4gICAqL1xuICBjcmVhdGUoXG4gICAgcG9zaXRpb25DbGFzcz86IHN0cmluZyxcbiAgICBvdmVybGF5Q29udGFpbmVyPzogVG9hc3RDb250YWluZXJEaXJlY3RpdmUsXG4gICk6IE92ZXJsYXlSZWYge1xuICAgIC8vIGdldCBleGlzdGluZyBwYW5lIGlmIHBvc3NpYmxlXG4gICAgcmV0dXJuIHRoaXMuX2NyZWF0ZU92ZXJsYXlSZWYoXG4gICAgICB0aGlzLmdldFBhbmVFbGVtZW50KHBvc2l0aW9uQ2xhc3MsIG92ZXJsYXlDb250YWluZXIpLFxuICAgICk7XG4gIH1cblxuICBnZXRQYW5lRWxlbWVudChcbiAgICBwb3NpdGlvbkNsYXNzOiBzdHJpbmcgPSAnJyxcbiAgICBvdmVybGF5Q29udGFpbmVyPzogVG9hc3RDb250YWluZXJEaXJlY3RpdmUsXG4gICk6IEhUTUxFbGVtZW50IHtcbiAgICBpZiAoIXRoaXMuX3BhbmVFbGVtZW50cy5nZXQob3ZlcmxheUNvbnRhaW5lcikpIHtcbiAgICAgIHRoaXMuX3BhbmVFbGVtZW50cy5zZXQob3ZlcmxheUNvbnRhaW5lciwge30pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fcGFuZUVsZW1lbnRzLmdldChvdmVybGF5Q29udGFpbmVyKVtwb3NpdGlvbkNsYXNzXSkge1xuICAgICAgdGhpcy5fcGFuZUVsZW1lbnRzLmdldChvdmVybGF5Q29udGFpbmVyKVtwb3NpdGlvbkNsYXNzXSA9IHRoaXMuX2NyZWF0ZVBhbmVFbGVtZW50KHBvc2l0aW9uQ2xhc3MsIG92ZXJsYXlDb250YWluZXIpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9wYW5lRWxlbWVudHMuZ2V0KG92ZXJsYXlDb250YWluZXIpW3Bvc2l0aW9uQ2xhc3NdO1xuICB9XG5cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgRE9NIGVsZW1lbnQgZm9yIGFuIG92ZXJsYXkgYW5kIGFwcGVuZHMgaXQgdG8gdGhlIG92ZXJsYXkgY29udGFpbmVyLlxuICAgKiBAcmV0dXJucyBOZXdseS1jcmVhdGVkIHBhbmUgZWxlbWVudFxuICAgKi9cbiAgcHJpdmF0ZSBfY3JlYXRlUGFuZUVsZW1lbnQoXG4gICAgcG9zaXRpb25DbGFzczogc3RyaW5nLFxuICAgIG92ZXJsYXlDb250YWluZXI/OiBUb2FzdENvbnRhaW5lckRpcmVjdGl2ZSxcbiAgKTogSFRNTEVsZW1lbnQge1xuICAgIGNvbnN0IHBhbmUgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIHBhbmUuaWQgPSAndG9hc3QtY29udGFpbmVyJztcbiAgICBwYW5lLmNsYXNzTGlzdC5hZGQocG9zaXRpb25DbGFzcyk7XG4gICAgcGFuZS5jbGFzc0xpc3QuYWRkKCd0b2FzdC1jb250YWluZXInKTtcblxuICAgIGlmICghb3ZlcmxheUNvbnRhaW5lcikge1xuICAgICAgdGhpcy5fb3ZlcmxheUNvbnRhaW5lci5nZXRDb250YWluZXJFbGVtZW50KCkuYXBwZW5kQ2hpbGQocGFuZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG92ZXJsYXlDb250YWluZXIuZ2V0Q29udGFpbmVyRWxlbWVudCgpLmFwcGVuZENoaWxkKHBhbmUpO1xuICAgIH1cblxuICAgIHJldHVybiBwYW5lO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIERvbVBvcnRhbEhvc3QgaW50byB3aGljaCB0aGUgb3ZlcmxheSBjb250ZW50IGNhbiBiZSBsb2FkZWQuXG4gICAqIEBwYXJhbSBwYW5lIFRoZSBET00gZWxlbWVudCB0byB0dXJuIGludG8gYSBwb3J0YWwgaG9zdC5cbiAgICogQHJldHVybnMgQSBwb3J0YWwgaG9zdCBmb3IgdGhlIGdpdmVuIERPTSBlbGVtZW50LlxuICAgKi9cbiAgcHJpdmF0ZSBfY3JlYXRlUG9ydGFsSG9zdChwYW5lOiBIVE1MRWxlbWVudCk6IERvbVBvcnRhbEhvc3Qge1xuICAgIHJldHVybiBuZXcgRG9tUG9ydGFsSG9zdChcbiAgICAgIHBhbmUsXG4gICAgICB0aGlzLl9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICB0aGlzLl9hcHBSZWYsXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIE92ZXJsYXlSZWYgZm9yIGFuIG92ZXJsYXkgaW4gdGhlIGdpdmVuIERPTSBlbGVtZW50LlxuICAgKiBAcGFyYW0gcGFuZSBET00gZWxlbWVudCBmb3IgdGhlIG92ZXJsYXlcbiAgICovXG4gIHByaXZhdGUgX2NyZWF0ZU92ZXJsYXlSZWYocGFuZTogSFRNTEVsZW1lbnQpOiBPdmVybGF5UmVmIHtcbiAgICByZXR1cm4gbmV3IE92ZXJsYXlSZWYodGhpcy5fY3JlYXRlUG9ydGFsSG9zdChwYW5lKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdG9yLCBJbmplY3RGbGFncyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgT3ZlcmxheVJlZiB9IGZyb20gJy4uL292ZXJsYXkvb3ZlcmxheS1yZWYnO1xuaW1wb3J0IHsgVG9hc3RQYWNrYWdlIH0gZnJvbSAnLi90b2FzdHItY29uZmlnJztcblxuLyoqXG4gKiBSZWZlcmVuY2UgdG8gYSB0b2FzdCBvcGVuZWQgdmlhIHRoZSBUb2FzdHIgc2VydmljZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFRvYXN0UmVmPFQ+IHtcbiAgLyoqIFRoZSBpbnN0YW5jZSBvZiBjb21wb25lbnQgb3BlbmVkIGludG8gdGhlIHRvYXN0LiAqL1xuICBjb21wb25lbnRJbnN0YW5jZTogVDtcblxuICAvKiogU3ViamVjdCBmb3Igbm90aWZ5aW5nIHRoZSB1c2VyIHRoYXQgdGhlIHRvYXN0IGhhcyBmaW5pc2hlZCBjbG9zaW5nLiAqL1xuICBwcml2YXRlIF9hZnRlckNsb3NlZCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgLyoqIHRyaWdnZXJlZCB3aGVuIHRvYXN0IGlzIGFjdGl2YXRlZCAqL1xuICBwcml2YXRlIF9hY3RpdmF0ZSA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgLyoqIG5vdGlmaWVzIHRoZSB0b2FzdCB0aGF0IGl0IHNob3VsZCBjbG9zZSBiZWZvcmUgdGhlIHRpbWVvdXQgKi9cbiAgcHJpdmF0ZSBfbWFudWFsQ2xvc2UgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIC8qKiBub3RpZmllcyB0aGUgdG9hc3QgdGhhdCBpdCBzaG91bGQgcmVzZXQgdGhlIHRpbWVvdXRzICovXG4gIHByaXZhdGUgX3Jlc2V0VGltZW91dCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9vdmVybGF5UmVmOiBPdmVybGF5UmVmKSB7fVxuXG4gIG1hbnVhbENsb3NlKCkge1xuICAgIHRoaXMuX21hbnVhbENsb3NlLm5leHQoKTtcbiAgICB0aGlzLl9tYW51YWxDbG9zZS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgbWFudWFsQ2xvc2VkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX21hbnVhbENsb3NlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgdGltZW91dFJlc2V0KCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX3Jlc2V0VGltZW91dC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZSB0aGUgdG9hc3QuXG4gICAqL1xuICBjbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgIHRoaXMuX2FmdGVyQ2xvc2VkLm5leHQoKTtcbiAgICB0aGlzLl9tYW51YWxDbG9zZS5uZXh0KCk7XG4gICAgdGhpcy5fYWZ0ZXJDbG9zZWQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9tYW51YWxDbG9zZS5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX2FjdGl2YXRlLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fcmVzZXRUaW1lb3V0LmNvbXBsZXRlKCk7XG4gIH1cblxuICAvKiogR2V0cyBhbiBvYnNlcnZhYmxlIHRoYXQgaXMgbm90aWZpZWQgd2hlbiB0aGUgdG9hc3QgaXMgZmluaXNoZWQgY2xvc2luZy4gKi9cbiAgYWZ0ZXJDbG9zZWQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fYWZ0ZXJDbG9zZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBpc0luYWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmF0ZS5pc1N0b3BwZWQ7XG4gIH1cblxuICBhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLl9hY3RpdmF0ZS5uZXh0KCk7XG4gICAgdGhpcy5fYWN0aXZhdGUuY29tcGxldGUoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGFuIG9ic2VydmFibGUgdGhhdCBpcyBub3RpZmllZCB3aGVuIHRoZSB0b2FzdCBoYXMgc3RhcnRlZCBvcGVuaW5nLiAqL1xuICBhZnRlckFjdGl2YXRlKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2YXRlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqIFJlc2V0IHRoZSB0b2FzdCB0aW1vdXRzICovXG4gIHJlc2V0VGltZW91dCgpIHtcbiAgICB0aGlzLl9yZXNldFRpbWVvdXQubmV4dCgpO1xuICB9XG59XG5cbi8qKiBDdXN0b20gaW5qZWN0b3IgdHlwZSBzcGVjaWZpY2FsbHkgZm9yIGluc3RhbnRpYXRpbmcgY29tcG9uZW50cyB3aXRoIGEgdG9hc3QuICovXG5leHBvcnQgY2xhc3MgVG9hc3RJbmplY3RvciBpbXBsZW1lbnRzIEluamVjdG9yIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfdG9hc3RQYWNrYWdlOiBUb2FzdFBhY2thZ2UsXG4gICAgcHJpdmF0ZSBfcGFyZW50SW5qZWN0b3I6IEluamVjdG9yXG4gICkge31cblxuICBnZXQ8VD4odG9rZW46IGFueSwgbm90Rm91bmRWYWx1ZT86IFQsIGZsYWdzPzogSW5qZWN0RmxhZ3MpOiBUIHwgVG9hc3RQYWNrYWdlIHtcbiAgICBpZiAodG9rZW4gPT09IFRvYXN0UGFja2FnZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3RvYXN0UGFja2FnZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3BhcmVudEluamVjdG9yLmdldDxUPih0b2tlbiwgbm90Rm91bmRWYWx1ZSwgZmxhZ3MpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5qZWN0YWJsZSxcbiAgSW5qZWN0b3IsXG4gIE5nWm9uZSxcbiAgU2VjdXJpdHlDb250ZXh0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE92ZXJsYXkgfSBmcm9tICcuLi9vdmVybGF5L292ZXJsYXknO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnLi4vcG9ydGFsL3BvcnRhbCc7XG5pbXBvcnQgeyBUb2FzdEluamVjdG9yLCBUb2FzdFJlZiB9IGZyb20gJy4vdG9hc3QtaW5qZWN0b3InO1xuaW1wb3J0IHsgVG9hc3RDb250YWluZXJEaXJlY3RpdmUgfSBmcm9tICcuL3RvYXN0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBHbG9iYWxDb25maWcsIEluZGl2aWR1YWxDb25maWcsIFRvYXN0UGFja2FnZSwgVG9hc3RUb2tlbiwgVE9BU1RfQ09ORklHIH0gZnJvbSAnLi90b2FzdHItY29uZmlnJztcblxuZXhwb3J0IGludGVyZmFjZSBBY3RpdmVUb2FzdDxDPiB7XG4gIC8qKiBZb3VyIFRvYXN0IElELiBVc2UgdGhpcyB0byBjbG9zZSBpdCBpbmRpdmlkdWFsbHkgKi9cbiAgdG9hc3RJZDogbnVtYmVyO1xuICAvKiogdGhlIG1lc3NhZ2Ugb2YgeW91ciB0b2FzdC4gU3RvcmVkIHRvIHByZXZlbnQgZHVwbGljYXRlcyAqL1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIC8qKiBhIHJlZmVyZW5jZSB0byB0aGUgY29tcG9uZW50IHNlZSBwb3J0YWwudHMgKi9cbiAgcG9ydGFsOiBDb21wb25lbnRSZWY8Qz47XG4gIC8qKiBhIHJlZmVyZW5jZSB0byB5b3VyIHRvYXN0ICovXG4gIHRvYXN0UmVmOiBUb2FzdFJlZjxDPjtcbiAgLyoqIHRyaWdnZXJlZCB3aGVuIHRvYXN0IGlzIGFjdGl2ZSAqL1xuICBvblNob3duOiBPYnNlcnZhYmxlPGFueT47XG4gIC8qKiB0cmlnZ2VyZWQgd2hlbiB0b2FzdCBpcyBkZXN0cm95ZWQgKi9cbiAgb25IaWRkZW46IE9ic2VydmFibGU8YW55PjtcbiAgLyoqIHRyaWdnZXJlZCBvbiB0b2FzdCBjbGljayAqL1xuICBvblRhcDogT2JzZXJ2YWJsZTxhbnk+O1xuICAvKiogYXZhaWxhYmxlIGZvciB5b3VyIHVzZSBpbiBjdXN0b20gdG9hc3QgKi9cbiAgb25BY3Rpb246IE9ic2VydmFibGU8YW55Pjtcbn1cblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBUb2FzdHJTZXJ2aWNlIHtcbiAgdG9hc3RyQ29uZmlnOiBHbG9iYWxDb25maWc7XG4gIGN1cnJlbnRseUFjdGl2ZSA9IDA7XG4gIHRvYXN0czogQWN0aXZlVG9hc3Q8YW55PltdID0gW107XG4gIG92ZXJsYXlDb250YWluZXI6IFRvYXN0Q29udGFpbmVyRGlyZWN0aXZlO1xuICBwcmV2aW91c1RvYXN0TWVzc2FnZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIGluZGV4ID0gMDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFRPQVNUX0NPTkZJRykgdG9rZW46IFRvYXN0VG9rZW4sXG4gICAgcHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LFxuICAgIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmVcbiAgKSB7XG4gICAgdGhpcy50b2FzdHJDb25maWcgPSB7XG4gICAgICAuLi50b2tlbi5kZWZhdWx0LFxuICAgICAgLi4udG9rZW4uY29uZmlnLFxuICAgIH07XG4gICAgaWYgKHRva2VuLmNvbmZpZy5pY29uQ2xhc3Nlcykge1xuICAgICAgdGhpcy50b2FzdHJDb25maWcuaWNvbkNsYXNzZXMgPSB7XG4gICAgICAgIC4uLnRva2VuLmRlZmF1bHQuaWNvbkNsYXNzZXMsXG4gICAgICAgIC4uLnRva2VuLmNvbmZpZy5pY29uQ2xhc3NlcyxcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIC8qKiBzaG93IHRvYXN0ICovXG4gIHNob3coXG4gICAgbWVzc2FnZT86IHN0cmluZyxcbiAgICB0aXRsZT86IHN0cmluZyxcbiAgICBvdmVycmlkZTogUGFydGlhbDxJbmRpdmlkdWFsQ29uZmlnPiA9IHt9LFxuICAgIHR5cGUgPSAnJ1xuICApIHtcbiAgICByZXR1cm4gdGhpcy5fcHJlQnVpbGROb3RpZmljYXRpb24oXG4gICAgICB0eXBlLFxuICAgICAgbWVzc2FnZSxcbiAgICAgIHRpdGxlLFxuICAgICAgdGhpcy5hcHBseUNvbmZpZyhvdmVycmlkZSlcbiAgICApO1xuICB9XG4gIC8qKiBzaG93IHN1Y2Nlc3NmdWwgdG9hc3QgKi9cbiAgc3VjY2VzcyhcbiAgICBtZXNzYWdlPzogc3RyaW5nLFxuICAgIHRpdGxlPzogc3RyaW5nLFxuICAgIG92ZXJyaWRlOiBQYXJ0aWFsPEluZGl2aWR1YWxDb25maWc+ID0ge31cbiAgKSB7XG4gICAgY29uc3QgdHlwZSA9IHRoaXMudG9hc3RyQ29uZmlnLmljb25DbGFzc2VzLnN1Y2Nlc3MgfHwgJyc7XG4gICAgcmV0dXJuIHRoaXMuX3ByZUJ1aWxkTm90aWZpY2F0aW9uKFxuICAgICAgdHlwZSxcbiAgICAgIG1lc3NhZ2UsXG4gICAgICB0aXRsZSxcbiAgICAgIHRoaXMuYXBwbHlDb25maWcob3ZlcnJpZGUpXG4gICAgKTtcbiAgfVxuICAvKiogc2hvdyBlcnJvciB0b2FzdCAqL1xuICBlcnJvcihcbiAgICBtZXNzYWdlPzogc3RyaW5nLFxuICAgIHRpdGxlPzogc3RyaW5nLFxuICAgIG92ZXJyaWRlOiBQYXJ0aWFsPEluZGl2aWR1YWxDb25maWc+ID0ge31cbiAgKSB7XG4gICAgY29uc3QgdHlwZSA9IHRoaXMudG9hc3RyQ29uZmlnLmljb25DbGFzc2VzLmVycm9yIHx8ICcnO1xuICAgIHJldHVybiB0aGlzLl9wcmVCdWlsZE5vdGlmaWNhdGlvbihcbiAgICAgIHR5cGUsXG4gICAgICBtZXNzYWdlLFxuICAgICAgdGl0bGUsXG4gICAgICB0aGlzLmFwcGx5Q29uZmlnKG92ZXJyaWRlKVxuICAgICk7XG4gIH1cbiAgLyoqIHNob3cgaW5mbyB0b2FzdCAqL1xuICBpbmZvKFxuICAgIG1lc3NhZ2U/OiBzdHJpbmcsXG4gICAgdGl0bGU/OiBzdHJpbmcsXG4gICAgb3ZlcnJpZGU6IFBhcnRpYWw8SW5kaXZpZHVhbENvbmZpZz4gPSB7fVxuICApIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy50b2FzdHJDb25maWcuaWNvbkNsYXNzZXMuaW5mbyB8fCAnJztcbiAgICByZXR1cm4gdGhpcy5fcHJlQnVpbGROb3RpZmljYXRpb24oXG4gICAgICB0eXBlLFxuICAgICAgbWVzc2FnZSxcbiAgICAgIHRpdGxlLFxuICAgICAgdGhpcy5hcHBseUNvbmZpZyhvdmVycmlkZSlcbiAgICApO1xuICB9XG4gIC8qKiBzaG93IHdhcm5pbmcgdG9hc3QgKi9cbiAgd2FybmluZyhcbiAgICBtZXNzYWdlPzogc3RyaW5nLFxuICAgIHRpdGxlPzogc3RyaW5nLFxuICAgIG92ZXJyaWRlOiBQYXJ0aWFsPEluZGl2aWR1YWxDb25maWc+ID0ge31cbiAgKSB7XG4gICAgY29uc3QgdHlwZSA9IHRoaXMudG9hc3RyQ29uZmlnLmljb25DbGFzc2VzLndhcm5pbmcgfHwgJyc7XG4gICAgcmV0dXJuIHRoaXMuX3ByZUJ1aWxkTm90aWZpY2F0aW9uKFxuICAgICAgdHlwZSxcbiAgICAgIG1lc3NhZ2UsXG4gICAgICB0aXRsZSxcbiAgICAgIHRoaXMuYXBwbHlDb25maWcob3ZlcnJpZGUpXG4gICAgKTtcbiAgfVxuICAvKipcbiAgICogUmVtb3ZlIGFsbCBvciBhIHNpbmdsZSB0b2FzdCBieSBpZFxuICAgKi9cbiAgY2xlYXIodG9hc3RJZD86IG51bWJlcikge1xuICAgIC8vIENhbGwgZXZlcnkgdG9hc3RSZWYgbWFudWFsQ2xvc2UgZnVuY3Rpb25cbiAgICBmb3IgKGNvbnN0IHRvYXN0IG9mIHRoaXMudG9hc3RzKSB7XG4gICAgICBpZiAodG9hc3RJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICh0b2FzdC50b2FzdElkID09PSB0b2FzdElkKSB7XG4gICAgICAgICAgdG9hc3QudG9hc3RSZWYubWFudWFsQ2xvc2UoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvYXN0LnRvYXN0UmVmLm1hbnVhbENsb3NlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBSZW1vdmUgYW5kIGRlc3Ryb3kgYSBzaW5nbGUgdG9hc3QgYnkgaWRcbiAgICovXG4gIHJlbW92ZSh0b2FzdElkOiBudW1iZXIpIHtcbiAgICBjb25zdCBmb3VuZCA9IHRoaXMuX2ZpbmRUb2FzdCh0b2FzdElkKTtcbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZvdW5kLmFjdGl2ZVRvYXN0LnRvYXN0UmVmLmNsb3NlKCk7XG4gICAgdGhpcy50b2FzdHMuc3BsaWNlKGZvdW5kLmluZGV4LCAxKTtcbiAgICB0aGlzLmN1cnJlbnRseUFjdGl2ZSA9IHRoaXMuY3VycmVudGx5QWN0aXZlIC0gMTtcbiAgICBpZiAoIXRoaXMudG9hc3RyQ29uZmlnLm1heE9wZW5lZCB8fCAhdGhpcy50b2FzdHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIHRoaXMuY3VycmVudGx5QWN0aXZlIDwgdGhpcy50b2FzdHJDb25maWcubWF4T3BlbmVkICYmXG4gICAgICB0aGlzLnRvYXN0c1t0aGlzLmN1cnJlbnRseUFjdGl2ZV1cbiAgICApIHtcbiAgICAgIGNvbnN0IHAgPSB0aGlzLnRvYXN0c1t0aGlzLmN1cnJlbnRseUFjdGl2ZV0udG9hc3RSZWY7XG4gICAgICBpZiAoIXAuaXNJbmFjdGl2ZSgpKSB7XG4gICAgICAgIHRoaXMuY3VycmVudGx5QWN0aXZlID0gdGhpcy5jdXJyZW50bHlBY3RpdmUgKyAxO1xuICAgICAgICBwLmFjdGl2YXRlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmRzIGEgZHVwbGljYXRlIHRvYXN0IGlmIG9uZSBleGlzdHNcbiAgICovXG4gIHByaXZhdGUgZmluZER1cGxpY2F0ZShtZXNzYWdlOiBzdHJpbmcsIHJlc2V0T25EdXBsaWNhdGU6IGJvb2xlYW4pIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudG9hc3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB0b2FzdCA9IHRoaXMudG9hc3RzW2ldO1xuICAgICAgaWYgKHRvYXN0Lm1lc3NhZ2UgPT09IG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHJlc2V0T25EdXBsaWNhdGUgJiYgdG9hc3QudG9hc3RSZWYuY29tcG9uZW50SW5zdGFuY2UucmVzZXRUaW1lb3V0KSB7XG4gICAgICAgICAgdG9hc3QudG9hc3RSZWYucmVzZXRUaW1lb3V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvYXN0O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKiBjcmVhdGUgYSBjbG9uZSBvZiBnbG9iYWwgY29uZmlnIGFuZCBhcHBseSBpbmRpdmlkdWFsIHNldHRpbmdzICovXG4gIHByaXZhdGUgYXBwbHlDb25maWcob3ZlcnJpZGU6IFBhcnRpYWw8SW5kaXZpZHVhbENvbmZpZz4gPSB7fSk6IEdsb2JhbENvbmZpZyB7XG4gICAgcmV0dXJuIHsgLi4udGhpcy50b2FzdHJDb25maWcsIC4uLm92ZXJyaWRlIH07XG4gIH1cblxuICAvKipcbiAgICogRmluZCB0b2FzdCBvYmplY3QgYnkgaWRcbiAgICovXG4gIHByaXZhdGUgX2ZpbmRUb2FzdChcbiAgICB0b2FzdElkOiBudW1iZXJcbiAgKTogeyBpbmRleDogbnVtYmVyOyBhY3RpdmVUb2FzdDogQWN0aXZlVG9hc3Q8YW55PiB9IHwgbnVsbCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRvYXN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMudG9hc3RzW2ldLnRvYXN0SWQgPT09IHRvYXN0SWQpIHtcbiAgICAgICAgcmV0dXJuIHsgaW5kZXg6IGksIGFjdGl2ZVRvYXN0OiB0aGlzLnRvYXN0c1tpXSB9O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHRoZSBuZWVkIHRvIHJ1biBpbnNpZGUgYW5ndWxhcidzIHpvbmUgdGhlbiBidWlsZHMgdGhlIHRvYXN0XG4gICAqL1xuICBwcml2YXRlIF9wcmVCdWlsZE5vdGlmaWNhdGlvbihcbiAgICB0b2FzdFR5cGU6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgdGl0bGU6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICBjb25maWc6IEdsb2JhbENvbmZpZ1xuICApOiBBY3RpdmVUb2FzdDxhbnk+IHwgbnVsbCB7XG4gICAgaWYgKGNvbmZpZy5vbkFjdGl2YXRlVGljaykge1xuICAgICAgcmV0dXJuIHRoaXMubmdab25lLnJ1bigoKSA9PlxuICAgICAgICB0aGlzLl9idWlsZE5vdGlmaWNhdGlvbih0b2FzdFR5cGUsIG1lc3NhZ2UsIHRpdGxlLCBjb25maWcpXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fYnVpbGROb3RpZmljYXRpb24odG9hc3RUeXBlLCBtZXNzYWdlLCB0aXRsZSwgY29uZmlnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuZCBhdHRhY2hlcyB0b2FzdCBkYXRhIHRvIGNvbXBvbmVudFxuICAgKiByZXR1cm5zIHRoZSBhY3RpdmUgdG9hc3QsIG9yIGluIGNhc2UgcHJldmVudER1cGxpY2F0ZXMgaXMgZW5hYmxlZCB0aGUgb3JpZ2luYWwvbm9uLWR1cGxpY2F0ZSBhY3RpdmUgdG9hc3QuXG4gICAqL1xuICBwcml2YXRlIF9idWlsZE5vdGlmaWNhdGlvbihcbiAgICB0b2FzdFR5cGU6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgdGl0bGU6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICBjb25maWc6IEdsb2JhbENvbmZpZ1xuICApOiBBY3RpdmVUb2FzdDxhbnk+IHwgbnVsbCB7XG4gICAgaWYgKCFjb25maWcudG9hc3RDb21wb25lbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndG9hc3RDb21wb25lbnQgcmVxdWlyZWQnKTtcbiAgICB9XG4gICAgLy8gbWF4IG9wZW5lZCBhbmQgYXV0byBkaXNtaXNzID0gdHJ1ZVxuICAgIGlmIChcbiAgICAgIG1lc3NhZ2UgJiZcbiAgICAgIHRoaXMudG9hc3RyQ29uZmlnLnByZXZlbnREdXBsaWNhdGVzXG4gICAgKSB7XG4gICAgICBjb25zdCBkdXBsaWNhdGUgPSB0aGlzLmZpbmREdXBsaWNhdGUobWVzc2FnZSwgdGhpcy50b2FzdHJDb25maWcucmVzZXRUaW1lb3V0T25EdXBsaWNhdGUpO1xuICAgICAgaWYgKGR1cGxpY2F0ZSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZHVwbGljYXRlO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnByZXZpb3VzVG9hc3RNZXNzYWdlID0gbWVzc2FnZTtcbiAgICBsZXQga2VlcEluYWN0aXZlID0gZmFsc2U7XG4gICAgaWYgKFxuICAgICAgdGhpcy50b2FzdHJDb25maWcubWF4T3BlbmVkICYmXG4gICAgICB0aGlzLmN1cnJlbnRseUFjdGl2ZSA+PSB0aGlzLnRvYXN0ckNvbmZpZy5tYXhPcGVuZWRcbiAgICApIHtcbiAgICAgIGtlZXBJbmFjdGl2ZSA9IHRydWU7XG4gICAgICBpZiAodGhpcy50b2FzdHJDb25maWcuYXV0b0Rpc21pc3MpIHtcbiAgICAgICAgdGhpcy5jbGVhcih0aGlzLnRvYXN0c1swXS50b2FzdElkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgb3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUoXG4gICAgICBjb25maWcucG9zaXRpb25DbGFzcyxcbiAgICAgIHRoaXMub3ZlcmxheUNvbnRhaW5lclxuICAgICk7XG4gICAgdGhpcy5pbmRleCA9IHRoaXMuaW5kZXggKyAxO1xuICAgIGxldCBzYW5pdGl6ZWRNZXNzYWdlOiBzdHJpbmcgfCBTYWZlSHRtbCB8IHVuZGVmaW5lZCB8IG51bGwgPSBtZXNzYWdlO1xuICAgIGlmIChtZXNzYWdlICYmIGNvbmZpZy5lbmFibGVIdG1sKSB7XG4gICAgICBzYW5pdGl6ZWRNZXNzYWdlID0gdGhpcy5zYW5pdGl6ZXIuc2FuaXRpemUoU2VjdXJpdHlDb250ZXh0LkhUTUwsIG1lc3NhZ2UpO1xuICAgIH1cbiAgICBjb25zdCB0b2FzdFJlZiA9IG5ldyBUb2FzdFJlZihvdmVybGF5UmVmKTtcbiAgICBjb25zdCB0b2FzdFBhY2thZ2UgPSBuZXcgVG9hc3RQYWNrYWdlKFxuICAgICAgdGhpcy5pbmRleCxcbiAgICAgIGNvbmZpZyxcbiAgICAgIHNhbml0aXplZE1lc3NhZ2UsXG4gICAgICB0aXRsZSxcbiAgICAgIHRvYXN0VHlwZSxcbiAgICAgIHRvYXN0UmVmXG4gICAgKTtcbiAgICBjb25zdCB0b2FzdEluamVjdG9yID0gbmV3IFRvYXN0SW5qZWN0b3IodG9hc3RQYWNrYWdlLCB0aGlzLl9pbmplY3Rvcik7XG4gICAgY29uc3QgY29tcG9uZW50ID0gbmV3IENvbXBvbmVudFBvcnRhbChjb25maWcudG9hc3RDb21wb25lbnQsIHRvYXN0SW5qZWN0b3IpO1xuICAgIGNvbnN0IHBvcnRhbCA9IG92ZXJsYXlSZWYuYXR0YWNoKGNvbXBvbmVudCwgdGhpcy50b2FzdHJDb25maWcubmV3ZXN0T25Ub3ApO1xuICAgIHRvYXN0UmVmLmNvbXBvbmVudEluc3RhbmNlID0gKDxhbnk+cG9ydGFsKS5fY29tcG9uZW50O1xuICAgIGNvbnN0IGluczogQWN0aXZlVG9hc3Q8YW55PiA9IHtcbiAgICAgIHRvYXN0SWQ6IHRoaXMuaW5kZXgsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlIHx8ICcnLFxuICAgICAgdG9hc3RSZWYsXG4gICAgICBvblNob3duOiB0b2FzdFJlZi5hZnRlckFjdGl2YXRlKCksXG4gICAgICBvbkhpZGRlbjogdG9hc3RSZWYuYWZ0ZXJDbG9zZWQoKSxcbiAgICAgIG9uVGFwOiB0b2FzdFBhY2thZ2Uub25UYXAoKSxcbiAgICAgIG9uQWN0aW9uOiB0b2FzdFBhY2thZ2Uub25BY3Rpb24oKSxcbiAgICAgIHBvcnRhbFxuICAgIH07XG5cbiAgICBpZiAoIWtlZXBJbmFjdGl2ZSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlucy50b2FzdFJlZi5hY3RpdmF0ZSgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRseUFjdGl2ZSA9IHRoaXMuY3VycmVudGx5QWN0aXZlICsgMTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMudG9hc3RzLnB1c2goaW5zKTtcbiAgICByZXR1cm4gaW5zO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBhbmltYXRlLFxuICBzdGF0ZSxcbiAgc3R5bGUsXG4gIHRyYW5zaXRpb24sXG4gIHRyaWdnZXJcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW5kaXZpZHVhbENvbmZpZywgVG9hc3RQYWNrYWdlIH0gZnJvbSAnLi90b2FzdHItY29uZmlnJztcbmltcG9ydCB7IFRvYXN0clNlcnZpY2UgfSBmcm9tICcuL3RvYXN0ci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW3RvYXN0LWNvbXBvbmVudF0nLFxuICB0ZW1wbGF0ZTogYFxuICA8YnV0dG9uICpuZ0lmPVwib3B0aW9ucy5jbG9zZUJ1dHRvblwiIChjbGljayk9XCJyZW1vdmUoKVwiIGNsYXNzPVwidG9hc3QtY2xvc2UtYnV0dG9uXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+XG4gICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cbiAgPC9idXR0b24+XG4gIDxkaXYgKm5nSWY9XCJ0aXRsZVwiIFtjbGFzc109XCJvcHRpb25zLnRpdGxlQ2xhc3NcIiBbYXR0ci5hcmlhLWxhYmVsXT1cInRpdGxlXCI+XG4gICAge3sgdGl0bGUgfX1cbiAgPC9kaXY+XG4gIDxkaXYgKm5nSWY9XCJtZXNzYWdlICYmIG9wdGlvbnMuZW5hYmxlSHRtbFwiIHJvbGU9XCJhbGVydGRpYWxvZ1wiIGFyaWEtbGl2ZT1cInBvbGl0ZVwiXG4gICAgW2NsYXNzXT1cIm9wdGlvbnMubWVzc2FnZUNsYXNzXCIgW2lubmVySFRNTF09XCJtZXNzYWdlXCI+XG4gIDwvZGl2PlxuICA8ZGl2ICpuZ0lmPVwibWVzc2FnZSAmJiAhb3B0aW9ucy5lbmFibGVIdG1sXCIgcm9sZT1cImFsZXJ0ZGlhbG9nXCIgYXJpYS1saXZlPVwicG9saXRlXCJcbiAgICBbY2xhc3NdPVwib3B0aW9ucy5tZXNzYWdlQ2xhc3NcIiBbYXR0ci5hcmlhLWxhYmVsXT1cIm1lc3NhZ2VcIj5cbiAgICB7eyBtZXNzYWdlIH19XG4gIDwvZGl2PlxuICA8ZGl2ICpuZ0lmPVwib3B0aW9ucy5wcm9ncmVzc0JhclwiPlxuICAgIDxkaXYgY2xhc3M9XCJ0b2FzdC1wcm9ncmVzc1wiIFtzdHlsZS53aWR0aF09XCJ3aWR0aCArICclJ1wiPjwvZGl2PlxuICA8L2Rpdj5cbiAgYCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2ZseUluT3V0JywgW1xuICAgICAgc3RhdGUoXG4gICAgICAgICdpbmFjdGl2ZScsXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHN0YXRlKCdhY3RpdmUnLCBzdHlsZSh7fSkpLFxuICAgICAgc3RhdGUoJ3JlbW92ZWQnLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpLFxuICAgICAgdHJhbnNpdGlvbihcbiAgICAgICAgJ2luYWN0aXZlID0+IGFjdGl2ZScsXG4gICAgICAgIGFuaW1hdGUoJ3t7IGVhc2VUaW1lIH19bXMge3sgZWFzaW5nIH19JylcbiAgICAgICksXG4gICAgICB0cmFuc2l0aW9uKCdhY3RpdmUgPT4gcmVtb3ZlZCcsIGFuaW1hdGUoJ3t7IGVhc2VUaW1lIH19bXMge3sgZWFzaW5nIH19JykpXG4gICAgXSlcbiAgXSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgVG9hc3QgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBtZXNzYWdlPzogc3RyaW5nIHwgU2FmZUh0bWwgfCBudWxsO1xuICB0aXRsZT86IHN0cmluZztcbiAgb3B0aW9uczogSW5kaXZpZHVhbENvbmZpZztcbiAgb3JpZ2luYWxUaW1lb3V0OiBudW1iZXI7XG4gIC8qKiB3aWR0aCBvZiBwcm9ncmVzcyBiYXIgKi9cbiAgd2lkdGggPSAtMTtcbiAgLyoqIGEgY29tYmluYXRpb24gb2YgdG9hc3QgdHlwZSBhbmQgb3B0aW9ucy50b2FzdENsYXNzICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSB0b2FzdENsYXNzZXMgPSAnJztcbiAgLyoqIGNvbnRyb2xzIGFuaW1hdGlvbiAqL1xuICBASG9zdEJpbmRpbmcoJ0BmbHlJbk91dCcpXG4gIHN0YXRlID0ge1xuICAgIHZhbHVlOiAnaW5hY3RpdmUnLFxuICAgIHBhcmFtczoge1xuICAgICAgZWFzZVRpbWU6IHRoaXMudG9hc3RQYWNrYWdlLmNvbmZpZy5lYXNlVGltZSxcbiAgICAgIGVhc2luZzogJ2Vhc2UtaW4nXG4gICAgfVxuICB9O1xuICBwcml2YXRlIHRpbWVvdXQ6IGFueTtcbiAgcHJpdmF0ZSBpbnRlcnZhbElkOiBhbnk7XG4gIHByaXZhdGUgaGlkZVRpbWU6IG51bWJlcjtcbiAgcHJpdmF0ZSBzdWI6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBzdWIxOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgc3ViMjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB0b2FzdHJTZXJ2aWNlOiBUb2FzdHJTZXJ2aWNlLFxuICAgIHB1YmxpYyB0b2FzdFBhY2thZ2U6IFRvYXN0UGFja2FnZSxcbiAgICBwcm90ZWN0ZWQgbmdab25lPzogTmdab25lXG4gICkge1xuICAgIHRoaXMubWVzc2FnZSA9IHRvYXN0UGFja2FnZS5tZXNzYWdlO1xuICAgIHRoaXMudGl0bGUgPSB0b2FzdFBhY2thZ2UudGl0bGU7XG4gICAgdGhpcy5vcHRpb25zID0gdG9hc3RQYWNrYWdlLmNvbmZpZztcbiAgICB0aGlzLm9yaWdpbmFsVGltZW91dCA9IHRvYXN0UGFja2FnZS5jb25maWcudGltZU91dDtcbiAgICB0aGlzLnRvYXN0Q2xhc3NlcyA9IGAke3RvYXN0UGFja2FnZS50b2FzdFR5cGV9ICR7XG4gICAgICB0b2FzdFBhY2thZ2UuY29uZmlnLnRvYXN0Q2xhc3NcbiAgICB9YDtcbiAgICB0aGlzLnN1YiA9IHRvYXN0UGFja2FnZS50b2FzdFJlZi5hZnRlckFjdGl2YXRlKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuYWN0aXZhdGVUb2FzdCgpO1xuICAgIH0pO1xuICAgIHRoaXMuc3ViMSA9IHRvYXN0UGFja2FnZS50b2FzdFJlZi5tYW51YWxDbG9zZWQoKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICB9KTtcbiAgICB0aGlzLnN1YjIgPSB0b2FzdFBhY2thZ2UudG9hc3RSZWYudGltZW91dFJlc2V0KCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMucmVzZXRUaW1lb3V0KCk7XG4gICAgfSk7XG4gIH1cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnN1YjEudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnN1YjIudW5zdWJzY3JpYmUoKTtcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJZCk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gIH1cbiAgLyoqXG4gICAqIGFjdGl2YXRlcyB0b2FzdCBhbmQgc2V0cyB0aW1lb3V0XG4gICAqL1xuICBhY3RpdmF0ZVRvYXN0KCkge1xuICAgIHRoaXMuc3RhdGUgPSB7IC4uLnRoaXMuc3RhdGUsIHZhbHVlOiAnYWN0aXZlJyB9O1xuICAgIGlmICghdGhpcy5vcHRpb25zLmRpc2FibGVUaW1lT3V0ICYmIHRoaXMub3B0aW9ucy50aW1lT3V0KSB7XG4gICAgICB0aGlzLm91dHNpZGVUaW1lb3V0KCgpID0+IHRoaXMucmVtb3ZlKCksIHRoaXMub3B0aW9ucy50aW1lT3V0KTtcbiAgICAgIHRoaXMuaGlkZVRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSArIHRoaXMub3B0aW9ucy50aW1lT3V0O1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5wcm9ncmVzc0Jhcikge1xuICAgICAgICB0aGlzLm91dHNpZGVJbnRlcnZhbCgoKSA9PiB0aGlzLnVwZGF0ZVByb2dyZXNzKCksIDEwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIHVwZGF0ZXMgcHJvZ3Jlc3MgYmFyIHdpZHRoXG4gICAqL1xuICB1cGRhdGVQcm9ncmVzcygpIHtcbiAgICBpZiAodGhpcy53aWR0aCA9PT0gMCB8fCB0aGlzLndpZHRoID09PSAxMDAgfHwgIXRoaXMub3B0aW9ucy50aW1lT3V0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGNvbnN0IHJlbWFpbmluZyA9IHRoaXMuaGlkZVRpbWUgLSBub3c7XG4gICAgdGhpcy53aWR0aCA9IChyZW1haW5pbmcgLyB0aGlzLm9wdGlvbnMudGltZU91dCkgKiAxMDA7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5wcm9ncmVzc0FuaW1hdGlvbiA9PT0gJ2luY3JlYXNpbmcnKSB7XG4gICAgICB0aGlzLndpZHRoID0gMTAwIC0gdGhpcy53aWR0aDtcbiAgICB9XG4gICAgaWYgKHRoaXMud2lkdGggPD0gMCkge1xuICAgICAgdGhpcy53aWR0aCA9IDA7XG4gICAgfVxuICAgIGlmICh0aGlzLndpZHRoID49IDEwMCkge1xuICAgICAgdGhpcy53aWR0aCA9IDEwMDtcbiAgICB9XG4gIH1cblxuICByZXNldFRpbWVvdXQoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpO1xuICAgIHRoaXMuc3RhdGUgPSB7IC4uLnRoaXMuc3RhdGUsIHZhbHVlOiAnYWN0aXZlJyB9O1xuXG4gICAgdGhpcy5vdXRzaWRlVGltZW91dCgoKSA9PiB0aGlzLnJlbW92ZSgpLCB0aGlzLm9yaWdpbmFsVGltZW91dCk7XG4gICAgdGhpcy5vcHRpb25zLnRpbWVPdXQgPSB0aGlzLm9yaWdpbmFsVGltZW91dDtcbiAgICB0aGlzLmhpZGVUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgKyAodGhpcy5vcHRpb25zLnRpbWVPdXQgfHwgMCk7XG4gICAgdGhpcy53aWR0aCA9IC0xO1xuICAgIGlmICh0aGlzLm9wdGlvbnMucHJvZ3Jlc3NCYXIpIHtcbiAgICAgIHRoaXMub3V0c2lkZUludGVydmFsKCgpID0+IHRoaXMudXBkYXRlUHJvZ3Jlc3MoKSwgMTApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB0ZWxscyB0b2FzdHJTZXJ2aWNlIHRvIHJlbW92ZSB0aGlzIHRvYXN0IGFmdGVyIGFuaW1hdGlvbiB0aW1lXG4gICAqL1xuICByZW1vdmUoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUudmFsdWUgPT09ICdyZW1vdmVkJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICB0aGlzLnN0YXRlID0geyAuLi50aGlzLnN0YXRlLCB2YWx1ZTogJ3JlbW92ZWQnIH07XG4gICAgdGhpcy5vdXRzaWRlVGltZW91dChcbiAgICAgICgpID0+IHRoaXMudG9hc3RyU2VydmljZS5yZW1vdmUodGhpcy50b2FzdFBhY2thZ2UudG9hc3RJZCksXG4gICAgICArdGhpcy50b2FzdFBhY2thZ2UuY29uZmlnLmVhc2VUaW1lXG4gICAgKTtcbiAgfVxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIHRhcFRvYXN0KCkge1xuICAgIGlmICh0aGlzLnN0YXRlLnZhbHVlID09PSAncmVtb3ZlZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy50b2FzdFBhY2thZ2UudHJpZ2dlclRhcCgpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMudGFwVG9EaXNtaXNzKSB7XG4gICAgICB0aGlzLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcbiAgc3RpY2tBcm91bmQoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUudmFsdWUgPT09ICdyZW1vdmVkJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICB0aGlzLm9wdGlvbnMudGltZU91dCA9IDA7XG4gICAgdGhpcy5oaWRlVGltZSA9IDA7XG5cbiAgICAvLyBkaXNhYmxlIHByb2dyZXNzQmFyXG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpO1xuICAgIHRoaXMud2lkdGggPSAwO1xuICB9XG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICBkZWxheWVkSGlkZVRvYXN0KCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMub3B0aW9ucy5kaXNhYmxlVGltZU91dCB8fFxuICAgICAgdGhpcy5vcHRpb25zLmV4dGVuZGVkVGltZU91dCA9PT0gMCB8fFxuICAgICAgdGhpcy5zdGF0ZS52YWx1ZSA9PT0gJ3JlbW92ZWQnXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMub3V0c2lkZVRpbWVvdXQoKCkgPT4gdGhpcy5yZW1vdmUoKSwgdGhpcy5vcHRpb25zLmV4dGVuZGVkVGltZU91dCk7XG4gICAgdGhpcy5vcHRpb25zLnRpbWVPdXQgPSB0aGlzLm9wdGlvbnMuZXh0ZW5kZWRUaW1lT3V0O1xuICAgIHRoaXMuaGlkZVRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSArICh0aGlzLm9wdGlvbnMudGltZU91dCB8fCAwKTtcbiAgICB0aGlzLndpZHRoID0gLTE7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5wcm9ncmVzc0Jhcikge1xuICAgICAgdGhpcy5vdXRzaWRlSW50ZXJ2YWwoKCkgPT4gdGhpcy51cGRhdGVQcm9ncmVzcygpLCAxMCk7XG4gICAgfVxuICB9XG5cbiAgb3V0c2lkZVRpbWVvdXQoZnVuYzogRnVuY3Rpb24sIHRpbWVvdXQ6IG51bWJlcikge1xuICAgIGlmICh0aGlzLm5nWm9uZSkge1xuICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoXG4gICAgICAgICgpID0+XG4gICAgICAgICAgKHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoXG4gICAgICAgICAgICAoKSA9PiB0aGlzLnJ1bkluc2lkZUFuZ3VsYXIoZnVuYyksXG4gICAgICAgICAgICB0aW1lb3V0XG4gICAgICAgICAgKSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gZnVuYygpLCB0aW1lb3V0KTtcbiAgICB9XG4gIH1cblxuICBvdXRzaWRlSW50ZXJ2YWwoZnVuYzogRnVuY3Rpb24sIHRpbWVvdXQ6IG51bWJlcikge1xuICAgIGlmICh0aGlzLm5nWm9uZSkge1xuICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoXG4gICAgICAgICgpID0+XG4gICAgICAgICAgKHRoaXMuaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKFxuICAgICAgICAgICAgKCkgPT4gdGhpcy5ydW5JbnNpZGVBbmd1bGFyKGZ1bmMpLFxuICAgICAgICAgICAgdGltZW91dFxuICAgICAgICAgICkpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKSA9PiBmdW5jKCksIHRpbWVvdXQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcnVuSW5zaWRlQW5ndWxhcihmdW5jOiBGdW5jdGlvbikge1xuICAgIGlmICh0aGlzLm5nWm9uZSkge1xuICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IGZ1bmMoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZ1bmMoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBUb2FzdCB9IGZyb20gJy4vdG9hc3QuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIERlZmF1bHROb0NvbXBvbmVudEdsb2JhbENvbmZpZyxcbiAgR2xvYmFsQ29uZmlnLFxuICBUT0FTVF9DT05GSUcsXG59IGZyb20gJy4vdG9hc3RyLWNvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0R2xvYmFsQ29uZmlnOiBHbG9iYWxDb25maWcgPSB7XG4gIC4uLkRlZmF1bHROb0NvbXBvbmVudEdsb2JhbENvbmZpZyxcbiAgdG9hc3RDb21wb25lbnQ6IFRvYXN0LFxufTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1RvYXN0XSxcbiAgZXhwb3J0czogW1RvYXN0XSxcbiAgZW50cnlDb21wb25lbnRzOiBbVG9hc3RdLFxufSlcbmV4cG9ydCBjbGFzcyBUb2FzdHJNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IFBhcnRpYWw8R2xvYmFsQ29uZmlnPiA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBUb2FzdHJNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFRPQVNUX0NPTkZJRyxcbiAgICAgICAgICB1c2VWYWx1ZToge1xuICAgICAgICAgICAgZGVmYXVsdDogRGVmYXVsdEdsb2JhbENvbmZpZyxcbiAgICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBUb2FzdHJDb21wb25lbnRsZXNzTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBQYXJ0aWFsPEdsb2JhbENvbmZpZz4gPSB7fSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogVG9hc3RyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBUT0FTVF9DT05GSUcsXG4gICAgICAgICAgdXNlVmFsdWU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IERlZmF1bHROb0NvbXBvbmVudEdsb2JhbENvbmZpZyxcbiAgICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXIvc3JjL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIEFwcGxpY2F0aW9uUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBIb3N0QmluZGluZyxcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgTmdNb2R1bGUsXHJcbiAgT25EZXN0cm95LFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gIERlZmF1bHROb0NvbXBvbmVudEdsb2JhbENvbmZpZyxcclxuICBHbG9iYWxDb25maWcsXHJcbiAgSW5kaXZpZHVhbENvbmZpZyxcclxuICBUb2FzdFBhY2thZ2UsXHJcbiAgVE9BU1RfQ09ORklHLFxyXG59IGZyb20gJy4vdG9hc3RyLWNvbmZpZyc7XHJcbmltcG9ydCB7IFRvYXN0clNlcnZpY2UgfSBmcm9tICcuL3RvYXN0ci5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnW3RvYXN0LWNvbXBvbmVudF0nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgPGJ1dHRvbiAqbmdJZj1cIm9wdGlvbnMuY2xvc2VCdXR0b25cIiAoY2xpY2spPVwicmVtb3ZlKClcIiBjbGFzcz1cInRvYXN0LWNsb3NlLWJ1dHRvblwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPlxyXG4gICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cclxuICA8L2J1dHRvbj5cclxuICA8ZGl2ICpuZ0lmPVwidGl0bGVcIiBbY2xhc3NdPVwib3B0aW9ucy50aXRsZUNsYXNzXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJ0aXRsZVwiPlxyXG4gICAge3sgdGl0bGUgfX1cclxuICA8L2Rpdj5cclxuICA8ZGl2ICpuZ0lmPVwibWVzc2FnZSAmJiBvcHRpb25zLmVuYWJsZUh0bWxcIiByb2xlPVwiYWxlcnRcIiBhcmlhLWxpdmU9XCJwb2xpdGVcIlxyXG4gICAgW2NsYXNzXT1cIm9wdGlvbnMubWVzc2FnZUNsYXNzXCIgW2lubmVySFRNTF09XCJtZXNzYWdlXCI+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiAqbmdJZj1cIm1lc3NhZ2UgJiYgIW9wdGlvbnMuZW5hYmxlSHRtbFwiIHJvbGU9XCJhbGVydFwiIGFyaWEtbGl2ZT1cInBvbGl0ZVwiXHJcbiAgICBbY2xhc3NdPVwib3B0aW9ucy5tZXNzYWdlQ2xhc3NcIiBbYXR0ci5hcmlhLWxhYmVsXT1cIm1lc3NhZ2VcIj5cclxuICAgIHt7IG1lc3NhZ2UgfX1cclxuICA8L2Rpdj5cclxuICA8ZGl2ICpuZ0lmPVwib3B0aW9ucy5wcm9ncmVzc0JhclwiPlxyXG4gICAgPGRpdiBjbGFzcz1cInRvYXN0LXByb2dyZXNzXCIgW3N0eWxlLndpZHRoXT1cIndpZHRoICsgJyUnXCI+PC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIFRvYXN0Tm9BbmltYXRpb24gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIG1lc3NhZ2U/OiBzdHJpbmcgfCBTYWZlSHRtbCB8IG51bGw7XHJcbiAgdGl0bGU/OiBzdHJpbmc7XHJcbiAgb3B0aW9uczogSW5kaXZpZHVhbENvbmZpZztcclxuICBvcmlnaW5hbFRpbWVvdXQ6IG51bWJlcjtcclxuICAvKiogd2lkdGggb2YgcHJvZ3Jlc3MgYmFyICovXHJcbiAgd2lkdGggPSAtMTtcclxuICAvKiogYSBjb21iaW5hdGlvbiBvZiB0b2FzdCB0eXBlIGFuZCBvcHRpb25zLnRvYXN0Q2xhc3MgKi9cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgdG9hc3RDbGFzc2VzID0gJyc7XHJcblxyXG4gIEBIb3N0QmluZGluZygnc3R5bGUuZGlzcGxheScpXHJcbiAgZ2V0IGRpc3BsYXlTdHlsZSgpIHtcclxuICAgIGlmICh0aGlzLnN0YXRlID09PSAnaW5hY3RpdmUnKSB7XHJcbiAgICAgIHJldHVybiAnbm9uZSc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJ2luaGVyaXQnO1xyXG4gIH1cclxuXHJcbiAgLyoqIGNvbnRyb2xzIGFuaW1hdGlvbiAqL1xyXG4gIHN0YXRlID0gJ2luYWN0aXZlJztcclxuICBwcml2YXRlIHRpbWVvdXQ6IGFueTtcclxuICBwcml2YXRlIGludGVydmFsSWQ6IGFueTtcclxuICBwcml2YXRlIGhpZGVUaW1lOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBzdWI6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIHN1YjE6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIHN1YjI6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcm90ZWN0ZWQgdG9hc3RyU2VydmljZTogVG9hc3RyU2VydmljZSxcclxuICAgIHB1YmxpYyB0b2FzdFBhY2thZ2U6IFRvYXN0UGFja2FnZSxcclxuICAgIHByb3RlY3RlZCBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLFxyXG4gICkge1xyXG4gICAgdGhpcy5tZXNzYWdlID0gdG9hc3RQYWNrYWdlLm1lc3NhZ2U7XHJcbiAgICB0aGlzLnRpdGxlID0gdG9hc3RQYWNrYWdlLnRpdGxlO1xyXG4gICAgdGhpcy5vcHRpb25zID0gdG9hc3RQYWNrYWdlLmNvbmZpZztcclxuICAgIHRoaXMub3JpZ2luYWxUaW1lb3V0ID0gdG9hc3RQYWNrYWdlLmNvbmZpZy50aW1lT3V0O1xyXG4gICAgdGhpcy50b2FzdENsYXNzZXMgPSBgJHt0b2FzdFBhY2thZ2UudG9hc3RUeXBlfSAke1xyXG4gICAgICB0b2FzdFBhY2thZ2UuY29uZmlnLnRvYXN0Q2xhc3NcclxuICAgIH1gO1xyXG4gICAgdGhpcy5zdWIgPSB0b2FzdFBhY2thZ2UudG9hc3RSZWYuYWZ0ZXJBY3RpdmF0ZSgpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuYWN0aXZhdGVUb2FzdCgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN1YjEgPSB0b2FzdFBhY2thZ2UudG9hc3RSZWYubWFudWFsQ2xvc2VkKCkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zdWIyID0gdG9hc3RQYWNrYWdlLnRvYXN0UmVmLnRpbWVvdXRSZXNldCgpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMucmVzZXRUaW1lb3V0KCk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5zdWIxLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLnN1YjIudW5zdWJzY3JpYmUoKTtcclxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKTtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBhY3RpdmF0ZXMgdG9hc3QgYW5kIHNldHMgdGltZW91dFxyXG4gICAqL1xyXG4gIGFjdGl2YXRlVG9hc3QoKSB7XHJcbiAgICB0aGlzLnN0YXRlID0gJ2FjdGl2ZSc7XHJcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5kaXNhYmxlVGltZU91dCAmJiB0aGlzLm9wdGlvbnMudGltZU91dCkge1xyXG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgICB9LCB0aGlzLm9wdGlvbnMudGltZU91dCk7XHJcbiAgICAgIHRoaXMuaGlkZVRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSArIHRoaXMub3B0aW9ucy50aW1lT3V0O1xyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnByb2dyZXNzQmFyKSB7XHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy51cGRhdGVQcm9ncmVzcygpLCAxMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0aGlzLm9wdGlvbnMub25BY3RpdmF0ZVRpY2spIHtcclxuICAgICAgdGhpcy5hcHBSZWYudGljaygpO1xyXG4gICAgfVxyXG4gIH1cclxuICAvKipcclxuICAgKiB1cGRhdGVzIHByb2dyZXNzIGJhciB3aWR0aFxyXG4gICAqL1xyXG4gIHVwZGF0ZVByb2dyZXNzKCkge1xyXG4gICAgaWYgKHRoaXMud2lkdGggPT09IDAgfHwgdGhpcy53aWR0aCA9PT0gMTAwIHx8ICF0aGlzLm9wdGlvbnMudGltZU91dCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgIGNvbnN0IHJlbWFpbmluZyA9IHRoaXMuaGlkZVRpbWUgLSBub3c7XHJcbiAgICB0aGlzLndpZHRoID0gKHJlbWFpbmluZyAvIHRoaXMub3B0aW9ucy50aW1lT3V0KSAqIDEwMDtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMucHJvZ3Jlc3NBbmltYXRpb24gPT09ICdpbmNyZWFzaW5nJykge1xyXG4gICAgICB0aGlzLndpZHRoID0gMTAwIC0gdGhpcy53aWR0aDtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLndpZHRoIDw9IDApIHtcclxuICAgICAgdGhpcy53aWR0aCA9IDA7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy53aWR0aCA+PSAxMDApIHtcclxuICAgICAgdGhpcy53aWR0aCA9IDEwMDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlc2V0VGltZW91dCgpIHtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xyXG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpO1xyXG4gICAgdGhpcy5zdGF0ZSA9ICdhY3RpdmUnO1xyXG5cclxuICAgIHRoaXMub3B0aW9ucy50aW1lT3V0ID0gdGhpcy5vcmlnaW5hbFRpbWVvdXQ7XHJcbiAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMucmVtb3ZlKCksIHRoaXMub3JpZ2luYWxUaW1lb3V0KTtcclxuICAgIHRoaXMuaGlkZVRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSArICh0aGlzLm9yaWdpbmFsVGltZW91dCB8fCAwKTtcclxuICAgIHRoaXMud2lkdGggPSAtMTtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMucHJvZ3Jlc3NCYXIpIHtcclxuICAgICAgdGhpcy5pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy51cGRhdGVQcm9ncmVzcygpLCAxMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiB0ZWxscyB0b2FzdHJTZXJ2aWNlIHRvIHJlbW92ZSB0aGlzIHRvYXN0IGFmdGVyIGFuaW1hdGlvbiB0aW1lXHJcbiAgICovXHJcbiAgcmVtb3ZlKCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGUgPT09ICdyZW1vdmVkJykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcclxuICAgIHRoaXMuc3RhdGUgPSAncmVtb3ZlZCc7XHJcbiAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+XHJcbiAgICAgIHRoaXMudG9hc3RyU2VydmljZS5yZW1vdmUodGhpcy50b2FzdFBhY2thZ2UudG9hc3RJZCksXHJcbiAgICApO1xyXG4gIH1cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXHJcbiAgdGFwVG9hc3QoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZSA9PT0gJ3JlbW92ZWQnKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMudG9hc3RQYWNrYWdlLnRyaWdnZXJUYXAoKTtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMudGFwVG9EaXNtaXNzKSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxyXG4gIHN0aWNrQXJvdW5kKCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGUgPT09ICdyZW1vdmVkJykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcclxuICAgIHRoaXMub3B0aW9ucy50aW1lT3V0ID0gMDtcclxuICAgIHRoaXMuaGlkZVRpbWUgPSAwO1xyXG5cclxuICAgIC8vIGRpc2FibGUgcHJvZ3Jlc3NCYXJcclxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKTtcclxuICAgIHRoaXMud2lkdGggPSAwO1xyXG4gIH1cclxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcclxuICBkZWxheWVkSGlkZVRvYXN0KCkge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLm9wdGlvbnMuZGlzYWJsZVRpbWVPdXQgfHxcclxuICAgICAgdGhpcy5vcHRpb25zLmV4dGVuZGVkVGltZU91dCA9PT0gMCB8fFxyXG4gICAgICB0aGlzLnN0YXRlID09PSAncmVtb3ZlZCdcclxuICAgICkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KFxyXG4gICAgICAoKSA9PiB0aGlzLnJlbW92ZSgpLFxyXG4gICAgICB0aGlzLm9wdGlvbnMuZXh0ZW5kZWRUaW1lT3V0LFxyXG4gICAgKTtcclxuICAgIHRoaXMub3B0aW9ucy50aW1lT3V0ID0gdGhpcy5vcHRpb25zLmV4dGVuZGVkVGltZU91dDtcclxuICAgIHRoaXMuaGlkZVRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSArICh0aGlzLm9wdGlvbnMudGltZU91dCB8fCAwKTtcclxuICAgIHRoaXMud2lkdGggPSAtMTtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMucHJvZ3Jlc3NCYXIpIHtcclxuICAgICAgdGhpcy5pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy51cGRhdGVQcm9ncmVzcygpLCAxMCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgRGVmYXVsdE5vQW5pbWF0aW9uc0dsb2JhbENvbmZpZzogR2xvYmFsQ29uZmlnID0ge1xyXG4gIC4uLkRlZmF1bHROb0NvbXBvbmVudEdsb2JhbENvbmZpZyxcclxuICB0b2FzdENvbXBvbmVudDogVG9hc3ROb0FuaW1hdGlvbixcclxufTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbVG9hc3ROb0FuaW1hdGlvbl0sXHJcbiAgZXhwb3J0czogW1RvYXN0Tm9BbmltYXRpb25dLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1RvYXN0Tm9BbmltYXRpb25dLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVG9hc3ROb0FuaW1hdGlvbk1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBQYXJ0aWFsPEdsb2JhbENvbmZpZz4gPSB7fSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IFRvYXN0Tm9BbmltYXRpb25Nb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHByb3ZpZGU6IFRPQVNUX0NPTkZJRyxcclxuICAgICAgICAgIHVzZVZhbHVlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IERlZmF1bHROb0FuaW1hdGlvbnNHbG9iYWxDb25maWcsXHJcbiAgICAgICAgICAgIGNvbmZpZyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fZXh0ZW5kcyIsInRzbGliXzEuX192YWx1ZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7SUFXRSxpQ0FBb0IsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7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
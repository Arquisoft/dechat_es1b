(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common'), require('@angular/platform-browser'), require('@angular/animations')) :
    typeof define === 'function' && define.amd ? define('ngx-toastr', ['exports', '@angular/core', 'rxjs', '@angular/common', '@angular/platform-browser', '@angular/animations'], factory) :
    (factory((global['ngx-toastr'] = {}),global.ng.core,global.rxjs,global.ng.common,global.ng.platformBrowser,global.ng.animations));
}(this, (function (exports,i0,rxjs,i1,i3,animations) { 'use strict';

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
            { type: i0.Directive, args: [{
                        selector: '[toastContainer]',
                        exportAs: 'toastContainer',
                    },] }
        ];
        /** @nocollapse */
        ToastContainerDirective.ctorParameters = function () {
            return [
                { type: i0.ElementRef }
            ];
        };
        return ToastContainerDirective;
    }());
    var ToastContainerModule = /** @class */ (function () {
        function ToastContainerModule() {
        }
        ToastContainerModule.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [ToastContainerDirective],
                        exports: [ToastContainerDirective],
                    },] }
        ];
        return ToastContainerModule;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Everything a toast needs to launch
     */
    var /**
     * Everything a toast needs to launch
     */ ToastPackage = /** @class */ (function () {
        function ToastPackage(toastId, config, message, title, toastType, toastRef) {
            var _this = this;
            this.toastId = toastId;
            this.config = config;
            this.message = message;
            this.title = title;
            this.toastType = toastType;
            this.toastRef = toastRef;
            this._onTap = new rxjs.Subject();
            this._onAction = new rxjs.Subject();
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
    var TOAST_CONFIG = new i0.InjectionToken('ToastConfig');

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
     * @template T
     */
    var /**
     * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
     * @template T
     */ ComponentPortal = /** @class */ (function () {
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
             */ function () {
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
    var /**
     * Partial implementation of PortalHost that only deals with attaching a
     * ComponentPortal
     * @abstract
     */ BasePortalHost = /** @class */ (function () {
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
     */ DomPortalHost = /** @class */ (function (_super) {
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
                return ( /** @type {?} */((( /** @type {?} */(componentRef.hostView))).rootNodes[0]));
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
            { type: i0.Injectable, args: [{ providedIn: 'root' },] }
        ];
        /** @nocollapse */
        OverlayContainer.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: i0.Inject, args: [i1.DOCUMENT,] }] }
            ];
        };
        /** @nocollapse */ OverlayContainer.ngInjectableDef = i0.defineInjectable({ factory: function OverlayContainer_Factory() { return new OverlayContainer(i0.inject(i1.DOCUMENT)); }, token: OverlayContainer, providedIn: "root" });
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
    var /**
     * Reference to an overlay that has been created with the Overlay service.
     * Used to manipulate or dispose of said overlay.
     */ OverlayRef = /** @class */ (function () {
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
                if (newestOnTop === void 0) {
                    newestOnTop = true;
                }
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
                if (positionClass === void 0) {
                    positionClass = '';
                }
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
            { type: i0.Injectable, args: [{ providedIn: 'root' },] }
        ];
        /** @nocollapse */
        Overlay.ctorParameters = function () {
            return [
                { type: OverlayContainer },
                { type: i0.ComponentFactoryResolver },
                { type: i0.ApplicationRef },
                { type: undefined, decorators: [{ type: i0.Inject, args: [i1.DOCUMENT,] }] }
            ];
        };
        /** @nocollapse */ Overlay.ngInjectableDef = i0.defineInjectable({ factory: function Overlay_Factory() { return new Overlay(i0.inject(OverlayContainer), i0.inject(i0.ComponentFactoryResolver), i0.inject(i0.ApplicationRef), i0.inject(i1.DOCUMENT)); }, token: Overlay, providedIn: "root" });
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
    var /**
     * Reference to a toast opened via the Toastr service.
     * @template T
     */ ToastRef = /** @class */ (function () {
        function ToastRef(_overlayRef) {
            this._overlayRef = _overlayRef;
            /**
             * Subject for notifying the user that the toast has finished closing.
             */
            this._afterClosed = new rxjs.Subject();
            /**
             * triggered when toast is activated
             */
            this._activate = new rxjs.Subject();
            /**
             * notifies the toast that it should close before the timeout
             */
            this._manualClose = new rxjs.Subject();
            /**
             * notifies the toast that it should reset the timeouts
             */
            this._resetTimeout = new rxjs.Subject();
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
    var /**
     * Custom injector type specifically for instantiating components with a toast.
     */ ToastInjector = /** @class */ (function () {
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
                if (override === void 0) {
                    override = {};
                }
                if (type === void 0) {
                    type = '';
                }
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
                if (override === void 0) {
                    override = {};
                }
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
                if (override === void 0) {
                    override = {};
                }
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
                if (override === void 0) {
                    override = {};
                }
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
                if (override === void 0) {
                    override = {};
                }
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
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return))
                            _a.call(_b);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
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
                if (override === void 0) {
                    override = {};
                }
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
                    sanitizedMessage = this.sanitizer.sanitize(i0.SecurityContext.HTML, message);
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
                toastRef.componentInstance = (( /** @type {?} */(portal)))._component;
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
            { type: i0.Injectable, args: [{ providedIn: 'root' },] }
        ];
        /** @nocollapse */
        ToastrService.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: i0.Inject, args: [TOAST_CONFIG,] }] },
                { type: Overlay },
                { type: i0.Injector },
                { type: i3.DomSanitizer },
                { type: i0.NgZone }
            ];
        };
        /** @nocollapse */ ToastrService.ngInjectableDef = i0.defineInjectable({ factory: function ToastrService_Factory() { return new ToastrService(i0.inject(TOAST_CONFIG), i0.inject(Overlay), i0.inject(i0.INJECTOR), i0.inject(i3.DomSanitizer), i0.inject(i0.NgZone)); }, token: ToastrService, providedIn: "root" });
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
            { type: i0.Component, args: [{
                        selector: '[toast-component]',
                        template: "\n  <button *ngIf=\"options.closeButton\" (click)=\"remove()\" class=\"toast-close-button\" aria-label=\"Close\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n  <div *ngIf=\"title\" [class]=\"options.titleClass\" [attr.aria-label]=\"title\">\n    {{ title }}\n  </div>\n  <div *ngIf=\"message && options.enableHtml\" role=\"alertdialog\" aria-live=\"polite\"\n    [class]=\"options.messageClass\" [innerHTML]=\"message\">\n  </div>\n  <div *ngIf=\"message && !options.enableHtml\" role=\"alertdialog\" aria-live=\"polite\"\n    [class]=\"options.messageClass\" [attr.aria-label]=\"message\">\n    {{ message }}\n  </div>\n  <div *ngIf=\"options.progressBar\">\n    <div class=\"toast-progress\" [style.width]=\"width + '%'\"></div>\n  </div>\n  ",
                        animations: [
                            animations.trigger('flyInOut', [
                                animations.state('inactive', animations.style({
                                    display: 'none',
                                    opacity: 0
                                })),
                                animations.state('active', animations.style({})),
                                animations.state('removed', animations.style({ opacity: 0 })),
                                animations.transition('inactive => active', animations.animate('{{ easeTime }}ms {{ easing }}')),
                                animations.transition('active => removed', animations.animate('{{ easeTime }}ms {{ easing }}'))
                            ])
                        ],
                        preserveWhitespaces: false
                    }] }
        ];
        /** @nocollapse */
        Toast.ctorParameters = function () {
            return [
                { type: ToastrService },
                { type: ToastPackage },
                { type: i0.NgZone }
            ];
        };
        Toast.propDecorators = {
            toastClasses: [{ type: i0.HostBinding, args: ['class',] }],
            state: [{ type: i0.HostBinding, args: ['@flyInOut',] }],
            tapToast: [{ type: i0.HostListener, args: ['click',] }],
            stickAround: [{ type: i0.HostListener, args: ['mouseenter',] }],
            delayedHideToast: [{ type: i0.HostListener, args: ['mouseleave',] }]
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
                if (config === void 0) {
                    config = {};
                }
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
            { type: i0.NgModule, args: [{
                        imports: [i1.CommonModule],
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
                if (config === void 0) {
                    config = {};
                }
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
            { type: i0.NgModule, args: [{
                        imports: [i1.CommonModule],
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
             */ function () {
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
            { type: i0.Component, args: [{
                        selector: '[toast-component]',
                        template: "\n  <button *ngIf=\"options.closeButton\" (click)=\"remove()\" class=\"toast-close-button\" aria-label=\"Close\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n  <div *ngIf=\"title\" [class]=\"options.titleClass\" [attr.aria-label]=\"title\">\n    {{ title }}\n  </div>\n  <div *ngIf=\"message && options.enableHtml\" role=\"alert\" aria-live=\"polite\"\n    [class]=\"options.messageClass\" [innerHTML]=\"message\">\n  </div>\n  <div *ngIf=\"message && !options.enableHtml\" role=\"alert\" aria-live=\"polite\"\n    [class]=\"options.messageClass\" [attr.aria-label]=\"message\">\n    {{ message }}\n  </div>\n  <div *ngIf=\"options.progressBar\">\n    <div class=\"toast-progress\" [style.width]=\"width + '%'\"></div>\n  </div>\n  "
                    }] }
        ];
        /** @nocollapse */
        ToastNoAnimation.ctorParameters = function () {
            return [
                { type: ToastrService },
                { type: ToastPackage },
                { type: i0.ApplicationRef }
            ];
        };
        ToastNoAnimation.propDecorators = {
            toastClasses: [{ type: i0.HostBinding, args: ['class',] }],
            displayStyle: [{ type: i0.HostBinding, args: ['style.display',] }],
            tapToast: [{ type: i0.HostListener, args: ['click',] }],
            stickAround: [{ type: i0.HostListener, args: ['mouseenter',] }],
            delayedHideToast: [{ type: i0.HostListener, args: ['mouseleave',] }]
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
                if (config === void 0) {
                    config = {};
                }
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
            { type: i0.NgModule, args: [{
                        imports: [i1.CommonModule],
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

    exports.ToastContainerDirective = ToastContainerDirective;
    exports.ToastContainerModule = ToastContainerModule;
    exports.Toast = Toast;
    exports.ToastrService = ToastrService;
    exports.ToastPackage = ToastPackage;
    exports.DefaultNoComponentGlobalConfig = DefaultNoComponentGlobalConfig;
    exports.TOAST_CONFIG = TOAST_CONFIG;
    exports.DefaultGlobalConfig = DefaultGlobalConfig;
    exports.ToastrModule = ToastrModule;
    exports.ToastrComponentlessModule = ToastrComponentlessModule;
    exports.ToastRef = ToastRef;
    exports.ToastInjector = ToastInjector;
    exports.ToastNoAnimation = ToastNoAnimation;
    exports.DefaultNoAnimationsGlobalConfig = DefaultNoAnimationsGlobalConfig;
    exports.ToastNoAnimationModule = ToastNoAnimationModule;
    exports.ComponentPortal = ComponentPortal;
    exports.BasePortalHost = BasePortalHost;
    exports.Overlay = Overlay;
    exports.OverlayContainer = OverlayContainer;
    exports.OverlayRef = OverlayRef;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRvYXN0ci51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC10b2FzdHIvdG9hc3RyL3RvYXN0LmRpcmVjdGl2ZS50cyIsIm5vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJuZzovL25neC10b2FzdHIvdG9hc3RyL3RvYXN0ci1jb25maWcudHMiLCJuZzovL25neC10b2FzdHIvcG9ydGFsL3BvcnRhbC50cyIsIm5nOi8vbmd4LXRvYXN0ci9wb3J0YWwvZG9tLXBvcnRhbC1ob3N0LnRzIiwibmc6Ly9uZ3gtdG9hc3RyL292ZXJsYXkvb3ZlcmxheS1jb250YWluZXIudHMiLCJuZzovL25neC10b2FzdHIvb3ZlcmxheS9vdmVybGF5LXJlZi50cyIsIm5nOi8vbmd4LXRvYXN0ci9vdmVybGF5L292ZXJsYXkudHMiLCJuZzovL25neC10b2FzdHIvdG9hc3RyL3RvYXN0LWluamVjdG9yLnRzIiwibmc6Ly9uZ3gtdG9hc3RyL3RvYXN0ci90b2FzdHIuc2VydmljZS50cyIsIm5nOi8vbmd4LXRvYXN0ci90b2FzdHIvdG9hc3QuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtdG9hc3RyL3RvYXN0ci90b2FzdHIubW9kdWxlLnRzIiwibmc6Ly9uZ3gtdG9hc3RyL3RvYXN0ci90b2FzdC1ub2FuaW1hdGlvbi5jb21wb25lbnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBOZ01vZHVsZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t0b2FzdENvbnRhaW5lcl0nLFxuICBleHBvcnRBczogJ3RvYXN0Q29udGFpbmVyJyxcbn0pXG5leHBvcnQgY2xhc3MgVG9hc3RDb250YWluZXJEaXJlY3RpdmUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7IH1cbiAgZ2V0Q29udGFpbmVyRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtUb2FzdENvbnRhaW5lckRpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtUb2FzdENvbnRhaW5lckRpcmVjdGl2ZV0sXG59KVxuZXhwb3J0IGNsYXNzIFRvYXN0Q29udGFpbmVyTW9kdWxlIHt9XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICcuLi9wb3J0YWwvcG9ydGFsJztcbmltcG9ydCB7IFRvYXN0UmVmIH0gZnJvbSAnLi90b2FzdC1pbmplY3Rvcic7XG5cbmV4cG9ydCB0eXBlIFByb2dyZXNzQW5pbWF0aW9uVHlwZSA9ICdpbmNyZWFzaW5nJyB8ICdkZWNyZWFzaW5nJztcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBhbiBpbmRpdmlkdWFsIHRvYXN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEluZGl2aWR1YWxDb25maWcge1xuICAvKipcbiAgICogZGlzYWJsZSBib3RoIHRpbWVPdXQgYW5kIGV4dGVuZGVkVGltZU91dFxuICAgKiBkZWZhdWx0OiBmYWxzZVxuICAgKi9cbiAgZGlzYWJsZVRpbWVPdXQ6IGJvb2xlYW47XG4gIC8qKlxuICAgKiB0b2FzdCB0aW1lIHRvIGxpdmUgaW4gbWlsbGlzZWNvbmRzXG4gICAqIGRlZmF1bHQ6IDUwMDBcbiAgICovXG4gIHRpbWVPdXQ6IG51bWJlcjtcbiAgLyoqXG4gICAqIHRvYXN0IHNob3cgY2xvc2UgYnV0dG9uXG4gICAqIGRlZmF1bHQ6IGZhbHNlXG4gICAqL1xuICBjbG9zZUJ1dHRvbjogYm9vbGVhbjtcbiAgLyoqXG4gICAqIHRpbWUgdG8gY2xvc2UgYWZ0ZXIgYSB1c2VyIGhvdmVycyBvdmVyIHRvYXN0XG4gICAqIGRlZmF1bHQ6IDEwMDBcbiAgICovXG4gIGV4dGVuZGVkVGltZU91dDogbnVtYmVyO1xuICAvKipcbiAgICogc2hvdyB0b2FzdCBwcm9ncmVzcyBiYXJcbiAgICogZGVmYXVsdDogZmFsc2VcbiAgICovXG4gIHByb2dyZXNzQmFyOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBjaGFuZ2VzIHRvYXN0IHByb2dyZXNzIGJhciBhbmltYXRpb25cbiAgICogZGVmYXVsdDogZGVjcmVhc2luZ1xuICAgKi9cbiAgcHJvZ3Jlc3NBbmltYXRpb246IFByb2dyZXNzQW5pbWF0aW9uVHlwZTtcblxuICAvKipcbiAgICogcmVuZGVyIGh0bWwgaW4gdG9hc3QgbWVzc2FnZSAocG9zc2libHkgdW5zYWZlKVxuICAgKiBkZWZhdWx0OiBmYWxzZVxuICAgKi9cbiAgZW5hYmxlSHRtbDogYm9vbGVhbjtcbiAgLyoqXG4gICAqIGNzcyBjbGFzcyBvbiB0b2FzdCBjb21wb25lbnRcbiAgICogZGVmYXVsdDogdG9hc3RcbiAgICovXG4gIHRvYXN0Q2xhc3M6IHN0cmluZztcbiAgLyoqXG4gICAqIGNzcyBjbGFzcyBvbiB0b2FzdCBjb250YWluZXJcbiAgICogZGVmYXVsdDogdG9hc3QtdG9wLXJpZ2h0XG4gICAqL1xuICBwb3NpdGlvbkNsYXNzOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBjc3MgY2xhc3Mgb24gdG9hc3QgdGl0bGVcbiAgICogZGVmYXVsdDogdG9hc3QtdGl0bGVcbiAgICovXG4gIHRpdGxlQ2xhc3M6IHN0cmluZztcbiAgLyoqXG4gICAqIGNzcyBjbGFzcyBvbiB0b2FzdCBtZXNzYWdlXG4gICAqIGRlZmF1bHQ6IHRvYXN0LW1lc3NhZ2VcbiAgICovXG4gIG1lc3NhZ2VDbGFzczogc3RyaW5nO1xuICAvKipcbiAgICogYW5pbWF0aW9uIGVhc2luZyBvbiB0b2FzdFxuICAgKiBkZWZhdWx0OiBlYXNlLWluXG4gICAqL1xuICBlYXNpbmc6IHN0cmluZztcbiAgLyoqXG4gICAqIGFuaW1hdGlvbiBlYXNlIHRpbWUgb24gdG9hc3RcbiAgICogZGVmYXVsdDogMzAwXG4gICAqL1xuICBlYXNlVGltZTogc3RyaW5nIHwgbnVtYmVyO1xuICAvKipcbiAgICogY2xpY2tpbmcgb24gdG9hc3QgZGlzbWlzc2VzIGl0XG4gICAqIGRlZmF1bHQ6IHRydWVcbiAgICovXG4gIHRhcFRvRGlzbWlzczogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEFuZ3VsYXIgdG9hc3QgY29tcG9uZW50IHRvIGJlIHNob3duXG4gICAqIGRlZmF1bHQ6IFRvYXN0XG4gICAqL1xuICB0b2FzdENvbXBvbmVudD86IENvbXBvbmVudFR5cGU8YW55PjtcbiAgLyoqXG4gICAqIEhlbHBzIHNob3cgdG9hc3QgZnJvbSBhIHdlYnNvY2tldCBvciBmcm9tIGV2ZW50IG91dHNpZGUgQW5ndWxhclxuICAgKiBkZWZhdWx0OiBmYWxzZVxuICAgKi9cbiAgb25BY3RpdmF0ZVRpY2s6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVG9hc3RySWNvbkNsYXNzZXMge1xuICBlcnJvcjogc3RyaW5nO1xuICBpbmZvOiBzdHJpbmc7XG4gIHN1Y2Nlc3M6IHN0cmluZztcbiAgd2FybmluZzogc3RyaW5nO1xufVxuXG4vKipcbiAqIEdsb2JhbCBUb2FzdCBjb25maWd1cmF0aW9uXG4gKiBJbmNsdWRlcyBhbGwgSW5kaXZpZHVhbENvbmZpZ1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEdsb2JhbENvbmZpZyBleHRlbmRzIEluZGl2aWR1YWxDb25maWcge1xuICAvKipcbiAgICogbWF4IHRvYXN0cyBvcGVuZWQuIFRvYXN0cyB3aWxsIGJlIHF1ZXVlZFxuICAgKiBaZXJvIGlzIHVubGltaXRlZFxuICAgKiBkZWZhdWx0OiAwXG4gICAqL1xuICBtYXhPcGVuZWQ6IG51bWJlcjtcbiAgLyoqXG4gICAqIGRpc21pc3MgY3VycmVudCB0b2FzdCB3aGVuIG1heCBpcyByZWFjaGVkXG4gICAqIGRlZmF1bHQ6IGZhbHNlXG4gICAqL1xuICBhdXRvRGlzbWlzczogYm9vbGVhbjtcbiAgaWNvbkNsYXNzZXM6IFBhcnRpYWw8VG9hc3RySWNvbkNsYXNzZXM+O1xuICAvKipcbiAgICogTmV3IHRvYXN0IHBsYWNlbWVudFxuICAgKiBkZWZhdWx0OiB0cnVlXG4gICAqL1xuICBuZXdlc3RPblRvcDogYm9vbGVhbjtcbiAgLyoqXG4gICAqIGJsb2NrIGR1cGxpY2F0ZSBtZXNzYWdlc1xuICAgKiBkZWZhdWx0OiBmYWxzZVxuICAgKi9cbiAgcHJldmVudER1cGxpY2F0ZXM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRvYXN0IHRpbWVvdXQgd2hlbiB0aGVyZSdzIGEgZHVwbGljYXRlIChwcmV2ZW50RHVwbGljYXRlcyBuZWVkcyB0byBiZSBzZXQgdG8gdHJ1ZSlcbiAgICogZGVmYXVsdDogZmFsc2VcbiAgICovXG4gIHJlc2V0VGltZW91dE9uRHVwbGljYXRlOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEV2ZXJ5dGhpbmcgYSB0b2FzdCBuZWVkcyB0byBsYXVuY2hcbiAqL1xuZXhwb3J0IGNsYXNzIFRvYXN0UGFja2FnZSB7XG4gIHByaXZhdGUgX29uVGFwID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBwcml2YXRlIF9vbkFjdGlvbiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgdG9hc3RJZDogbnVtYmVyLFxuICAgIHB1YmxpYyBjb25maWc6IEluZGl2aWR1YWxDb25maWcsXG4gICAgcHVibGljIG1lc3NhZ2U6IHN0cmluZyB8IFNhZmVIdG1sIHwgbnVsbCB8IHVuZGVmaW5lZCxcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICBwdWJsaWMgdG9hc3RUeXBlOiBzdHJpbmcsXG4gICAgcHVibGljIHRvYXN0UmVmOiBUb2FzdFJlZjxhbnk+LFxuICApIHtcbiAgICB0aGlzLnRvYXN0UmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuX29uQWN0aW9uLmNvbXBsZXRlKCk7XG4gICAgICB0aGlzLl9vblRhcC5jb21wbGV0ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEZpcmVkIG9uIGNsaWNrICovXG4gIHRyaWdnZXJUYXAoKSB7XG4gICAgdGhpcy5fb25UYXAubmV4dCgpO1xuICAgIGlmICh0aGlzLmNvbmZpZy50YXBUb0Rpc21pc3MpIHtcbiAgICAgIHRoaXMuX29uVGFwLmNvbXBsZXRlKCk7XG4gICAgfVxuICB9XG5cbiAgb25UYXAoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fb25UYXAuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKiogYXZhaWxhYmxlIGZvciB1c2UgaW4gY3VzdG9tIHRvYXN0ICovXG4gIHRyaWdnZXJBY3Rpb24oYWN0aW9uPzogYW55KSB7XG4gICAgdGhpcy5fb25BY3Rpb24ubmV4dChhY3Rpb24pO1xuICB9XG5cbiAgb25BY3Rpb24oKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fb25BY3Rpb24uYXNPYnNlcnZhYmxlKCk7XG4gIH1cbn1cblxuLyogdHNsaW50OmRpc2FibGU6bm8tZW1wdHktaW50ZXJmYWNlICovXG4vKiogQGRlcHJlY2F0ZWQgdXNlIEdsb2JhbENvbmZpZyAqL1xuZXhwb3J0IGludGVyZmFjZSBHbG9iYWxUb2FzdHJDb25maWcgZXh0ZW5kcyBHbG9iYWxDb25maWcge31cbi8qKiBAZGVwcmVjYXRlZCB1c2UgSW5kaXZpZHVhbENvbmZpZyAqL1xuZXhwb3J0IGludGVyZmFjZSBJbmRpdmlkdWFsVG9hc3RyQ29uZmlnIGV4dGVuZHMgSW5kaXZpZHVhbENvbmZpZyB7fVxuLyoqIEBkZXByZWNhdGVkIHVzZSBJbmRpdmlkdWFsQ29uZmlnICovXG5leHBvcnQgaW50ZXJmYWNlIFRvYXN0ckNvbmZpZyBleHRlbmRzIEluZGl2aWR1YWxDb25maWcge31cblxuZXhwb3J0IGNvbnN0IERlZmF1bHROb0NvbXBvbmVudEdsb2JhbENvbmZpZzogR2xvYmFsQ29uZmlnID0ge1xuICBtYXhPcGVuZWQ6IDAsXG4gIGF1dG9EaXNtaXNzOiBmYWxzZSxcbiAgbmV3ZXN0T25Ub3A6IHRydWUsXG4gIHByZXZlbnREdXBsaWNhdGVzOiBmYWxzZSxcbiAgcmVzZXRUaW1lb3V0T25EdXBsaWNhdGU6IGZhbHNlLFxuICBpY29uQ2xhc3Nlczoge1xuICAgIGVycm9yOiAndG9hc3QtZXJyb3InLFxuICAgIGluZm86ICd0b2FzdC1pbmZvJyxcbiAgICBzdWNjZXNzOiAndG9hc3Qtc3VjY2VzcycsXG4gICAgd2FybmluZzogJ3RvYXN0LXdhcm5pbmcnLFxuICB9LFxuXG4gIC8vIEluZGl2aWR1YWxcbiAgY2xvc2VCdXR0b246IGZhbHNlLFxuICBkaXNhYmxlVGltZU91dDogZmFsc2UsXG4gIHRpbWVPdXQ6IDUwMDAsXG4gIGV4dGVuZGVkVGltZU91dDogMTAwMCxcbiAgZW5hYmxlSHRtbDogZmFsc2UsXG4gIHByb2dyZXNzQmFyOiBmYWxzZSxcbiAgdG9hc3RDbGFzczogJ3RvYXN0JyxcbiAgcG9zaXRpb25DbGFzczogJ3RvYXN0LXRvcC1yaWdodCcsXG4gIHRpdGxlQ2xhc3M6ICd0b2FzdC10aXRsZScsXG4gIG1lc3NhZ2VDbGFzczogJ3RvYXN0LW1lc3NhZ2UnLFxuICBlYXNpbmc6ICdlYXNlLWluJyxcbiAgZWFzZVRpbWU6IDMwMCxcbiAgdGFwVG9EaXNtaXNzOiB0cnVlLFxuICBvbkFjdGl2YXRlVGljazogZmFsc2UsXG4gIHByb2dyZXNzQW5pbWF0aW9uOiAnZGVjcmVhc2luZycsXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIFRvYXN0VG9rZW4ge1xuICBkZWZhdWx0OiBHbG9iYWxDb25maWc7XG4gIGNvbmZpZzogUGFydGlhbDxHbG9iYWxDb25maWc+O1xufVxuXG5leHBvcnQgY29uc3QgVE9BU1RfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPFRvYXN0VG9rZW4+KCdUb2FzdENvbmZpZycpO1xuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50UmVmLFxuICBJbmplY3RvcixcbiAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBDb21wb25lbnRUeXBlPFQ+IHtcbiAgbmV3ICguLi5hcmdzOiBhbnlbXSk6IFQ7XG59XG5cblxuLyoqXG4gKiBBIGBDb21wb25lbnRQb3J0YWxgIGlzIGEgcG9ydGFsIHRoYXQgaW5zdGFudGlhdGVzIHNvbWUgQ29tcG9uZW50IHVwb24gYXR0YWNobWVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBvbmVudFBvcnRhbDxUPiB7XG4gIHByaXZhdGUgX2F0dGFjaGVkSG9zdD86IEJhc2VQb3J0YWxIb3N0O1xuICAvKiogVGhlIHR5cGUgb2YgdGhlIGNvbXBvbmVudCB0aGF0IHdpbGwgYmUgaW5zdGFudGlhdGVkIGZvciBhdHRhY2htZW50LiAqL1xuICBjb21wb25lbnQ6IENvbXBvbmVudFR5cGU8VD47XG5cbiAgLyoqXG4gICAqIFtPcHRpb25hbF0gV2hlcmUgdGhlIGF0dGFjaGVkIGNvbXBvbmVudCBzaG91bGQgbGl2ZSBpbiBBbmd1bGFyJ3MgKmxvZ2ljYWwqIGNvbXBvbmVudCB0cmVlLlxuICAgKiBUaGlzIGlzIGRpZmZlcmVudCBmcm9tIHdoZXJlIHRoZSBjb21wb25lbnQgKnJlbmRlcnMqLCB3aGljaCBpcyBkZXRlcm1pbmVkIGJ5IHRoZSBQb3J0YWxIb3N0LlxuICAgKiBUaGUgb3JpZ2luIG5lY2Vzc2FyeSB3aGVuIHRoZSBob3N0IGlzIG91dHNpZGUgb2YgdGhlIEFuZ3VsYXIgYXBwbGljYXRpb24gY29udGV4dC5cbiAgICovXG4gIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgLyoqIEluamVjdG9yIHVzZWQgZm9yIHRoZSBpbnN0YW50aWF0aW9uIG9mIHRoZSBjb21wb25lbnQuICovXG4gIGluamVjdG9yOiBJbmplY3RvcjtcblxuICBjb25zdHJ1Y3Rvcihjb21wb25lbnQ6IENvbXBvbmVudFR5cGU8VD4sIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xuICAgIHRoaXMuaW5qZWN0b3IgPSBpbmplY3RvcjtcbiAgfVxuXG4gIC8qKiBBdHRhY2ggdGhpcyBwb3J0YWwgdG8gYSBob3N0LiAqL1xuICBhdHRhY2goaG9zdDogQmFzZVBvcnRhbEhvc3QsIG5ld2VzdE9uVG9wOiBib29sZWFuKSB7XG4gICAgdGhpcy5fYXR0YWNoZWRIb3N0ID0gaG9zdDtcbiAgICByZXR1cm4gaG9zdC5hdHRhY2godGhpcywgbmV3ZXN0T25Ub3ApO1xuICB9XG5cbiAgLyoqIERldGFjaCB0aGlzIHBvcnRhbCBmcm9tIGl0cyBob3N0ICovXG4gIGRldGFjaCgpIHtcbiAgICBjb25zdCBob3N0ID0gdGhpcy5fYXR0YWNoZWRIb3N0O1xuICAgIGlmIChob3N0KSB7XG4gICAgICB0aGlzLl9hdHRhY2hlZEhvc3QgPSB1bmRlZmluZWQ7XG4gICAgICByZXR1cm4gaG9zdC5kZXRhY2goKTtcbiAgICB9XG4gIH1cblxuICAvKiogV2hldGhlciB0aGlzIHBvcnRhbCBpcyBhdHRhY2hlZCB0byBhIGhvc3QuICovXG4gIGdldCBpc0F0dGFjaGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9hdHRhY2hlZEhvc3QgIT0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBQb3J0YWxIb3N0IHJlZmVyZW5jZSB3aXRob3V0IHBlcmZvcm1pbmcgYGF0dGFjaCgpYC4gVGhpcyBpcyB1c2VkIGRpcmVjdGx5IGJ5XG4gICAqIHRoZSBQb3J0YWxIb3N0IHdoZW4gaXQgaXMgcGVyZm9ybWluZyBhbiBgYXR0YWNoKClgIG9yIGBkZXRhY2goKWAuXG4gICAqL1xuICBzZXRBdHRhY2hlZEhvc3QoaG9zdD86IEJhc2VQb3J0YWxIb3N0KSB7XG4gICAgdGhpcy5fYXR0YWNoZWRIb3N0ID0gaG9zdDtcbiAgfVxufVxuXG4vKipcbiAqIFBhcnRpYWwgaW1wbGVtZW50YXRpb24gb2YgUG9ydGFsSG9zdCB0aGF0IG9ubHkgZGVhbHMgd2l0aCBhdHRhY2hpbmcgYVxuICogQ29tcG9uZW50UG9ydGFsXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlUG9ydGFsSG9zdCB7XG4gIC8qKiBUaGUgcG9ydGFsIGN1cnJlbnRseSBhdHRhY2hlZCB0byB0aGUgaG9zdC4gKi9cbiAgcHJpdmF0ZSBfYXR0YWNoZWRQb3J0YWw/OiBDb21wb25lbnRQb3J0YWw8YW55PjtcblxuICAvKiogQSBmdW5jdGlvbiB0aGF0IHdpbGwgcGVybWFuZW50bHkgZGlzcG9zZSB0aGlzIGhvc3QuICovXG4gIHByaXZhdGUgX2Rpc3Bvc2VGbj86ICgpID0+IHZvaWQ7XG5cbiAgYXR0YWNoKHBvcnRhbDogQ29tcG9uZW50UG9ydGFsPGFueT4sIG5ld2VzdE9uVG9wOiBib29sZWFuKSB7XG4gICAgdGhpcy5fYXR0YWNoZWRQb3J0YWwgPSBwb3J0YWw7XG4gICAgcmV0dXJuIHRoaXMuYXR0YWNoQ29tcG9uZW50UG9ydGFsKHBvcnRhbCwgbmV3ZXN0T25Ub3ApO1xuICB9XG5cbiAgYWJzdHJhY3QgYXR0YWNoQ29tcG9uZW50UG9ydGFsPFQ+KHBvcnRhbDogQ29tcG9uZW50UG9ydGFsPFQ+LCBuZXdlc3RPblRvcDogYm9vbGVhbik6IENvbXBvbmVudFJlZjxUPjtcblxuICBkZXRhY2goKSB7XG4gICAgaWYgKHRoaXMuX2F0dGFjaGVkUG9ydGFsKSB7XG4gICAgICB0aGlzLl9hdHRhY2hlZFBvcnRhbC5zZXRBdHRhY2hlZEhvc3QoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hdHRhY2hlZFBvcnRhbCA9IHVuZGVmaW5lZDtcbiAgICBpZiAodGhpcy5fZGlzcG9zZUZuKSB7XG4gICAgICB0aGlzLl9kaXNwb3NlRm4oKTtcbiAgICAgIHRoaXMuX2Rpc3Bvc2VGbiA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBzZXREaXNwb3NlRm4oZm46ICgpID0+IHZvaWQpIHtcbiAgICB0aGlzLl9kaXNwb3NlRm4gPSBmbjtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQXBwbGljYXRpb25SZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBFbWJlZGRlZFZpZXdSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZVBvcnRhbEhvc3QsIENvbXBvbmVudFBvcnRhbCB9IGZyb20gJy4vcG9ydGFsJztcblxuLyoqXG4gKiBBIFBvcnRhbEhvc3QgZm9yIGF0dGFjaGluZyBwb3J0YWxzIHRvIGFuIGFyYml0cmFyeSBET00gZWxlbWVudCBvdXRzaWRlIG9mIHRoZSBBbmd1bGFyXG4gKiBhcHBsaWNhdGlvbiBjb250ZXh0LlxuICpcbiAqIFRoaXMgaXMgdGhlIG9ubHkgcGFydCBvZiB0aGUgcG9ydGFsIGNvcmUgdGhhdCBkaXJlY3RseSB0b3VjaGVzIHRoZSBET00uXG4gKi9cbmV4cG9ydCBjbGFzcyBEb21Qb3J0YWxIb3N0IGV4dGVuZHMgQmFzZVBvcnRhbEhvc3Qge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9ob3N0RG9tRWxlbWVudDogRWxlbWVudCxcbiAgICBwcml2YXRlIF9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIF9hcHBSZWY6IEFwcGxpY2F0aW9uUmVmLFxuICApIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCB0aGUgZ2l2ZW4gQ29tcG9uZW50UG9ydGFsIHRvIERPTSBlbGVtZW50IHVzaW5nIHRoZSBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIuXG4gICAqIEBwYXJhbSBwb3J0YWwgUG9ydGFsIHRvIGJlIGF0dGFjaGVkXG4gICAqL1xuICBhdHRhY2hDb21wb25lbnRQb3J0YWw8VD4oXG4gICAgcG9ydGFsOiBDb21wb25lbnRQb3J0YWw8VD4sXG4gICAgbmV3ZXN0T25Ub3A6IGJvb2xlYW4sXG4gICk6IENvbXBvbmVudFJlZjxUPiB7XG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuX2NvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcbiAgICAgIHBvcnRhbC5jb21wb25lbnQsXG4gICAgKTtcbiAgICBsZXQgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8VD47XG5cbiAgICAvLyBJZiB0aGUgcG9ydGFsIHNwZWNpZmllcyBhIFZpZXdDb250YWluZXJSZWYsIHdlIHdpbGwgdXNlIHRoYXQgYXMgdGhlIGF0dGFjaG1lbnQgcG9pbnRcbiAgICAvLyBmb3IgdGhlIGNvbXBvbmVudCAoaW4gdGVybXMgb2YgQW5ndWxhcidzIGNvbXBvbmVudCB0cmVlLCBub3QgcmVuZGVyaW5nKS5cbiAgICAvLyBXaGVuIHRoZSBWaWV3Q29udGFpbmVyUmVmIGlzIG1pc3NpbmcsIHdlIHVzZSB0aGUgZmFjdG9yeSB0byBjcmVhdGUgdGhlIGNvbXBvbmVudCBkaXJlY3RseVxuICAgIC8vIGFuZCB0aGVuIG1hbnVhbGx5IGF0dGFjaCB0aGUgQ2hhbmdlRGV0ZWN0b3IgZm9yIHRoYXQgY29tcG9uZW50IHRvIHRoZSBhcHBsaWNhdGlvbiAod2hpY2hcbiAgICAvLyBoYXBwZW5zIGF1dG9tYXRpY2FsbHkgd2hlbiB1c2luZyBhIFZpZXdDb250YWluZXIpLlxuICAgIGNvbXBvbmVudFJlZiA9IGNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKHBvcnRhbC5pbmplY3Rvcik7XG5cbiAgICAvLyBXaGVuIGNyZWF0aW5nIGEgY29tcG9uZW50IG91dHNpZGUgb2YgYSBWaWV3Q29udGFpbmVyLCB3ZSBuZWVkIHRvIG1hbnVhbGx5IHJlZ2lzdGVyXG4gICAgLy8gaXRzIENoYW5nZURldGVjdG9yIHdpdGggdGhlIGFwcGxpY2F0aW9uLiBUaGlzIEFQSSBpcyB1bmZvcnR1bmF0ZWx5IG5vdCB5ZXQgcHVibGlzaGVkXG4gICAgLy8gaW4gQW5ndWxhciBjb3JlLiBUaGUgY2hhbmdlIGRldGVjdG9yIG11c3QgYWxzbyBiZSBkZXJlZ2lzdGVyZWQgd2hlbiB0aGUgY29tcG9uZW50XG4gICAgLy8gaXMgZGVzdHJveWVkIHRvIHByZXZlbnQgbWVtb3J5IGxlYWtzLlxuICAgIHRoaXMuX2FwcFJlZi5hdHRhY2hWaWV3KGNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG5cbiAgICB0aGlzLnNldERpc3Bvc2VGbigoKSA9PiB7XG4gICAgICB0aGlzLl9hcHBSZWYuZGV0YWNoVmlldyhjb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuICAgICAgY29tcG9uZW50UmVmLmRlc3Ryb3koKTtcbiAgICB9KTtcblxuICAgIC8vIEF0IHRoaXMgcG9pbnQgdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBpbnN0YW50aWF0ZWQsIHNvIHdlIG1vdmUgaXQgdG8gdGhlIGxvY2F0aW9uIGluIHRoZSBET01cbiAgICAvLyB3aGVyZSB3ZSB3YW50IGl0IHRvIGJlIHJlbmRlcmVkLlxuICAgIGlmIChuZXdlc3RPblRvcCkge1xuICAgICAgdGhpcy5faG9zdERvbUVsZW1lbnQuaW5zZXJ0QmVmb3JlKFxuICAgICAgICB0aGlzLl9nZXRDb21wb25lbnRSb290Tm9kZShjb21wb25lbnRSZWYpLFxuICAgICAgICB0aGlzLl9ob3N0RG9tRWxlbWVudC5maXJzdENoaWxkLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faG9zdERvbUVsZW1lbnQuYXBwZW5kQ2hpbGQoXG4gICAgICAgIHRoaXMuX2dldENvbXBvbmVudFJvb3ROb2RlKGNvbXBvbmVudFJlZiksXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBjb21wb25lbnRSZWY7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgcm9vdCBIVE1MRWxlbWVudCBmb3IgYW4gaW5zdGFudGlhdGVkIGNvbXBvbmVudC4gKi9cbiAgcHJpdmF0ZSBfZ2V0Q29tcG9uZW50Um9vdE5vZGUoY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55Pik6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gKGNvbXBvbmVudFJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55Pikucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xuICB9XG59XG4iLCJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKiogQ29udGFpbmVyIGluc2lkZSB3aGljaCBhbGwgdG9hc3RzIHdpbGwgcmVuZGVyLiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBPdmVybGF5Q29udGFpbmVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIF9jb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcm90ZWN0ZWQgX2RvY3VtZW50OiBhbnkpIHt9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX2NvbnRhaW5lckVsZW1lbnQgJiYgdGhpcy5fY29udGFpbmVyRWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICB0aGlzLl9jb250YWluZXJFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5fY29udGFpbmVyRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIG92ZXJsYXkgY29udGFpbmVyIGVsZW1lbnQuIEl0IHdpbGwgbGF6aWx5XG4gICAqIGNyZWF0ZSB0aGUgZWxlbWVudCB0aGUgZmlyc3QgdGltZSAgaXQgaXMgY2FsbGVkIHRvIGZhY2lsaXRhdGUgdXNpbmdcbiAgICogdGhlIGNvbnRhaW5lciBpbiBub24tYnJvd3NlciBlbnZpcm9ubWVudHMuXG4gICAqIEByZXR1cm5zIHRoZSBjb250YWluZXIgZWxlbWVudFxuICAgKi9cbiAgZ2V0Q29udGFpbmVyRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgaWYgKCF0aGlzLl9jb250YWluZXJFbGVtZW50KSB7XG4gICAgICB0aGlzLl9jcmVhdGVDb250YWluZXIoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lckVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIHRoZSBvdmVybGF5IGNvbnRhaW5lciBlbGVtZW50LCB3aGljaCBpcyBzaW1wbHkgYSBkaXZcbiAgICogd2l0aCB0aGUgJ2Nkay1vdmVybGF5LWNvbnRhaW5lcicgY2xhc3Mgb24gdGhlIGRvY3VtZW50IGJvZHkuXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NyZWF0ZUNvbnRhaW5lcigpOiB2b2lkIHtcbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnb3ZlcmxheS1jb250YWluZXInKTtcbiAgICB0aGlzLl9kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgdGhpcy5fY29udGFpbmVyRWxlbWVudCA9IGNvbnRhaW5lcjtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXNlUG9ydGFsSG9zdCwgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnLi4vcG9ydGFsL3BvcnRhbCc7XG5cbi8qKlxuICogUmVmZXJlbmNlIHRvIGFuIG92ZXJsYXkgdGhhdCBoYXMgYmVlbiBjcmVhdGVkIHdpdGggdGhlIE92ZXJsYXkgc2VydmljZS5cbiAqIFVzZWQgdG8gbWFuaXB1bGF0ZSBvciBkaXNwb3NlIG9mIHNhaWQgb3ZlcmxheS5cbiAqL1xuZXhwb3J0IGNsYXNzIE92ZXJsYXlSZWYge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wb3J0YWxIb3N0OiBCYXNlUG9ydGFsSG9zdCkge31cblxuICBhdHRhY2goXG4gICAgcG9ydGFsOiBDb21wb25lbnRQb3J0YWw8YW55PixcbiAgICBuZXdlc3RPblRvcDogYm9vbGVhbiA9IHRydWUsXG4gICk6IENvbXBvbmVudFJlZjxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fcG9ydGFsSG9zdC5hdHRhY2gocG9ydGFsLCBuZXdlc3RPblRvcCk7XG4gIH1cblxuICAvKipcbiAgICogRGV0YWNoZXMgYW4gb3ZlcmxheSBmcm9tIGEgcG9ydGFsLlxuICAgKiBAcmV0dXJucyBSZXNvbHZlcyB3aGVuIHRoZSBvdmVybGF5IGhhcyBiZWVuIGRldGFjaGVkLlxuICAgKi9cbiAgZGV0YWNoKCkge1xuICAgIHJldHVybiB0aGlzLl9wb3J0YWxIb3N0LmRldGFjaCgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBcHBsaWNhdGlvblJlZixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBJbmplY3QsXG4gIEluamVjdGFibGUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEb21Qb3J0YWxIb3N0IH0gZnJvbSAnLi4vcG9ydGFsL2RvbS1wb3J0YWwtaG9zdCc7XG5pbXBvcnQgeyBUb2FzdENvbnRhaW5lckRpcmVjdGl2ZSB9IGZyb20gJy4uL3RvYXN0ci90b2FzdC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgT3ZlcmxheUNvbnRhaW5lciB9IGZyb20gJy4vb3ZlcmxheS1jb250YWluZXInO1xuaW1wb3J0IHsgT3ZlcmxheVJlZiB9IGZyb20gJy4vb3ZlcmxheS1yZWYnO1xuXG4vKipcbiAqIFNlcnZpY2UgdG8gY3JlYXRlIE92ZXJsYXlzLiBPdmVybGF5cyBhcmUgZHluYW1pY2FsbHkgYWRkZWQgcGllY2VzIG9mIGZsb2F0aW5nIFVJLCBtZWFudCB0byBiZVxuICogdXNlZCBhcyBhIGxvdy1sZXZlbCBidWlsZGluZyBidWlsZGluZyBibG9jayBmb3Igb3RoZXIgY29tcG9uZW50cy4gRGlhbG9ncywgdG9vbHRpcHMsIG1lbnVzLFxuICogc2VsZWN0cywgZXRjLiBjYW4gYWxsIGJlIGJ1aWx0IHVzaW5nIG92ZXJsYXlzLiBUaGUgc2VydmljZSBzaG91bGQgcHJpbWFyaWx5IGJlIHVzZWQgYnkgYXV0aG9yc1xuICogb2YgcmUtdXNhYmxlIGNvbXBvbmVudHMgcmF0aGVyIHRoYW4gZGV2ZWxvcGVycyBidWlsZGluZyBlbmQtdXNlciBhcHBsaWNhdGlvbnMuXG4gKlxuICogQW4gb3ZlcmxheSAqaXMqIGEgUG9ydGFsSG9zdCwgc28gYW55IGtpbmQgb2YgUG9ydGFsIGNhbiBiZSBsb2FkZWQgaW50byBvbmUuXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgT3ZlcmxheSB7XG4gIC8vIE5hbWVzcGFjZSBwYW5lcyBieSBvdmVybGF5IGNvbnRhaW5lclxuICBwcml2YXRlIF9wYW5lRWxlbWVudHM6IE1hcDxcbiAgICBUb2FzdENvbnRhaW5lckRpcmVjdGl2ZSxcbiAgICB7IHN0cmluZz86IEhUTUxFbGVtZW50IH1cbiAgPiA9IG5ldyBNYXAoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9vdmVybGF5Q29udGFpbmVyOiBPdmVybGF5Q29udGFpbmVyLFxuICAgIHByaXZhdGUgX2NvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgX2FwcFJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSxcbiAgKSB7fVxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBvdmVybGF5LlxuICAgKiBAcmV0dXJucyBBIHJlZmVyZW5jZSB0byB0aGUgY3JlYXRlZCBvdmVybGF5LlxuICAgKi9cbiAgY3JlYXRlKFxuICAgIHBvc2l0aW9uQ2xhc3M/OiBzdHJpbmcsXG4gICAgb3ZlcmxheUNvbnRhaW5lcj86IFRvYXN0Q29udGFpbmVyRGlyZWN0aXZlLFxuICApOiBPdmVybGF5UmVmIHtcbiAgICAvLyBnZXQgZXhpc3RpbmcgcGFuZSBpZiBwb3NzaWJsZVxuICAgIHJldHVybiB0aGlzLl9jcmVhdGVPdmVybGF5UmVmKFxuICAgICAgdGhpcy5nZXRQYW5lRWxlbWVudChwb3NpdGlvbkNsYXNzLCBvdmVybGF5Q29udGFpbmVyKSxcbiAgICApO1xuICB9XG5cbiAgZ2V0UGFuZUVsZW1lbnQoXG4gICAgcG9zaXRpb25DbGFzczogc3RyaW5nID0gJycsXG4gICAgb3ZlcmxheUNvbnRhaW5lcj86IFRvYXN0Q29udGFpbmVyRGlyZWN0aXZlLFxuICApOiBIVE1MRWxlbWVudCB7XG4gICAgaWYgKCF0aGlzLl9wYW5lRWxlbWVudHMuZ2V0KG92ZXJsYXlDb250YWluZXIpKSB7XG4gICAgICB0aGlzLl9wYW5lRWxlbWVudHMuc2V0KG92ZXJsYXlDb250YWluZXIsIHt9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX3BhbmVFbGVtZW50cy5nZXQob3ZlcmxheUNvbnRhaW5lcilbcG9zaXRpb25DbGFzc10pIHtcbiAgICAgIHRoaXMuX3BhbmVFbGVtZW50cy5nZXQob3ZlcmxheUNvbnRhaW5lcilbcG9zaXRpb25DbGFzc10gPSB0aGlzLl9jcmVhdGVQYW5lRWxlbWVudChwb3NpdGlvbkNsYXNzLCBvdmVybGF5Q29udGFpbmVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fcGFuZUVsZW1lbnRzLmdldChvdmVybGF5Q29udGFpbmVyKVtwb3NpdGlvbkNsYXNzXTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIERPTSBlbGVtZW50IGZvciBhbiBvdmVybGF5IGFuZCBhcHBlbmRzIGl0IHRvIHRoZSBvdmVybGF5IGNvbnRhaW5lci5cbiAgICogQHJldHVybnMgTmV3bHktY3JlYXRlZCBwYW5lIGVsZW1lbnRcbiAgICovXG4gIHByaXZhdGUgX2NyZWF0ZVBhbmVFbGVtZW50KFxuICAgIHBvc2l0aW9uQ2xhc3M6IHN0cmluZyxcbiAgICBvdmVybGF5Q29udGFpbmVyPzogVG9hc3RDb250YWluZXJEaXJlY3RpdmUsXG4gICk6IEhUTUxFbGVtZW50IHtcbiAgICBjb25zdCBwYW5lID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBwYW5lLmlkID0gJ3RvYXN0LWNvbnRhaW5lcic7XG4gICAgcGFuZS5jbGFzc0xpc3QuYWRkKHBvc2l0aW9uQ2xhc3MpO1xuICAgIHBhbmUuY2xhc3NMaXN0LmFkZCgndG9hc3QtY29udGFpbmVyJyk7XG5cbiAgICBpZiAoIW92ZXJsYXlDb250YWluZXIpIHtcbiAgICAgIHRoaXMuX292ZXJsYXlDb250YWluZXIuZ2V0Q29udGFpbmVyRWxlbWVudCgpLmFwcGVuZENoaWxkKHBhbmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdmVybGF5Q29udGFpbmVyLmdldENvbnRhaW5lckVsZW1lbnQoKS5hcHBlbmRDaGlsZChwYW5lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFuZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBEb21Qb3J0YWxIb3N0IGludG8gd2hpY2ggdGhlIG92ZXJsYXkgY29udGVudCBjYW4gYmUgbG9hZGVkLlxuICAgKiBAcGFyYW0gcGFuZSBUaGUgRE9NIGVsZW1lbnQgdG8gdHVybiBpbnRvIGEgcG9ydGFsIGhvc3QuXG4gICAqIEByZXR1cm5zIEEgcG9ydGFsIGhvc3QgZm9yIHRoZSBnaXZlbiBET00gZWxlbWVudC5cbiAgICovXG4gIHByaXZhdGUgX2NyZWF0ZVBvcnRhbEhvc3QocGFuZTogSFRNTEVsZW1lbnQpOiBEb21Qb3J0YWxIb3N0IHtcbiAgICByZXR1cm4gbmV3IERvbVBvcnRhbEhvc3QoXG4gICAgICBwYW5lLFxuICAgICAgdGhpcy5fY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgdGhpcy5fYXBwUmVmLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBPdmVybGF5UmVmIGZvciBhbiBvdmVybGF5IGluIHRoZSBnaXZlbiBET00gZWxlbWVudC5cbiAgICogQHBhcmFtIHBhbmUgRE9NIGVsZW1lbnQgZm9yIHRoZSBvdmVybGF5XG4gICAqL1xuICBwcml2YXRlIF9jcmVhdGVPdmVybGF5UmVmKHBhbmU6IEhUTUxFbGVtZW50KTogT3ZlcmxheVJlZiB7XG4gICAgcmV0dXJuIG5ldyBPdmVybGF5UmVmKHRoaXMuX2NyZWF0ZVBvcnRhbEhvc3QocGFuZSkpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RvciwgSW5qZWN0RmxhZ3MgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE92ZXJsYXlSZWYgfSBmcm9tICcuLi9vdmVybGF5L292ZXJsYXktcmVmJztcbmltcG9ydCB7IFRvYXN0UGFja2FnZSB9IGZyb20gJy4vdG9hc3RyLWNvbmZpZyc7XG5cbi8qKlxuICogUmVmZXJlbmNlIHRvIGEgdG9hc3Qgb3BlbmVkIHZpYSB0aGUgVG9hc3RyIHNlcnZpY2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBUb2FzdFJlZjxUPiB7XG4gIC8qKiBUaGUgaW5zdGFuY2Ugb2YgY29tcG9uZW50IG9wZW5lZCBpbnRvIHRoZSB0b2FzdC4gKi9cbiAgY29tcG9uZW50SW5zdGFuY2U6IFQ7XG5cbiAgLyoqIFN1YmplY3QgZm9yIG5vdGlmeWluZyB0aGUgdXNlciB0aGF0IHRoZSB0b2FzdCBoYXMgZmluaXNoZWQgY2xvc2luZy4gKi9cbiAgcHJpdmF0ZSBfYWZ0ZXJDbG9zZWQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIC8qKiB0cmlnZ2VyZWQgd2hlbiB0b2FzdCBpcyBhY3RpdmF0ZWQgKi9cbiAgcHJpdmF0ZSBfYWN0aXZhdGUgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIC8qKiBub3RpZmllcyB0aGUgdG9hc3QgdGhhdCBpdCBzaG91bGQgY2xvc2UgYmVmb3JlIHRoZSB0aW1lb3V0ICovXG4gIHByaXZhdGUgX21hbnVhbENsb3NlID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAvKiogbm90aWZpZXMgdGhlIHRvYXN0IHRoYXQgaXQgc2hvdWxkIHJlc2V0IHRoZSB0aW1lb3V0cyAqL1xuICBwcml2YXRlIF9yZXNldFRpbWVvdXQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfb3ZlcmxheVJlZjogT3ZlcmxheVJlZikge31cblxuICBtYW51YWxDbG9zZSgpIHtcbiAgICB0aGlzLl9tYW51YWxDbG9zZS5uZXh0KCk7XG4gICAgdGhpcy5fbWFudWFsQ2xvc2UuY29tcGxldGUoKTtcbiAgfVxuXG4gIG1hbnVhbENsb3NlZCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9tYW51YWxDbG9zZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHRpbWVvdXRSZXNldCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9yZXNldFRpbWVvdXQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2UgdGhlIHRvYXN0LlxuICAgKi9cbiAgY2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fb3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICB0aGlzLl9hZnRlckNsb3NlZC5uZXh0KCk7XG4gICAgdGhpcy5fbWFudWFsQ2xvc2UubmV4dCgpO1xuICAgIHRoaXMuX2FmdGVyQ2xvc2VkLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fbWFudWFsQ2xvc2UuY29tcGxldGUoKTtcbiAgICB0aGlzLl9hY3RpdmF0ZS5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX3Jlc2V0VGltZW91dC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgLyoqIEdldHMgYW4gb2JzZXJ2YWJsZSB0aGF0IGlzIG5vdGlmaWVkIHdoZW4gdGhlIHRvYXN0IGlzIGZpbmlzaGVkIGNsb3NpbmcuICovXG4gIGFmdGVyQ2xvc2VkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX2FmdGVyQ2xvc2VkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgaXNJbmFjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZhdGUuaXNTdG9wcGVkO1xuICB9XG5cbiAgYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5fYWN0aXZhdGUubmV4dCgpO1xuICAgIHRoaXMuX2FjdGl2YXRlLmNvbXBsZXRlKCk7XG4gIH1cblxuICAvKiogR2V0cyBhbiBvYnNlcnZhYmxlIHRoYXQgaXMgbm90aWZpZWQgd2hlbiB0aGUgdG9hc3QgaGFzIHN0YXJ0ZWQgb3BlbmluZy4gKi9cbiAgYWZ0ZXJBY3RpdmF0ZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmF0ZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKiBSZXNldCB0aGUgdG9hc3QgdGltb3V0cyAqL1xuICByZXNldFRpbWVvdXQoKSB7XG4gICAgdGhpcy5fcmVzZXRUaW1lb3V0Lm5leHQoKTtcbiAgfVxufVxuXG4vKiogQ3VzdG9tIGluamVjdG9yIHR5cGUgc3BlY2lmaWNhbGx5IGZvciBpbnN0YW50aWF0aW5nIGNvbXBvbmVudHMgd2l0aCBhIHRvYXN0LiAqL1xuZXhwb3J0IGNsYXNzIFRvYXN0SW5qZWN0b3IgaW1wbGVtZW50cyBJbmplY3RvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3RvYXN0UGFja2FnZTogVG9hc3RQYWNrYWdlLFxuICAgIHByaXZhdGUgX3BhcmVudEluamVjdG9yOiBJbmplY3RvclxuICApIHt9XG5cbiAgZ2V0PFQ+KHRva2VuOiBhbnksIG5vdEZvdW5kVmFsdWU/OiBULCBmbGFncz86IEluamVjdEZsYWdzKTogVCB8IFRvYXN0UGFja2FnZSB7XG4gICAgaWYgKHRva2VuID09PSBUb2FzdFBhY2thZ2UpIHtcbiAgICAgIHJldHVybiB0aGlzLl90b2FzdFBhY2thZ2U7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9wYXJlbnRJbmplY3Rvci5nZXQ8VD4odG9rZW4sIG5vdEZvdW5kVmFsdWUsIGZsYWdzKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50UmVmLFxuICBJbmplY3QsXG4gIEluamVjdGFibGUsXG4gIEluamVjdG9yLFxuICBOZ1pvbmUsXG4gIFNlY3VyaXR5Q29udGV4dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBPdmVybGF5IH0gZnJvbSAnLi4vb3ZlcmxheS9vdmVybGF5JztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCB9IGZyb20gJy4uL3BvcnRhbC9wb3J0YWwnO1xuaW1wb3J0IHsgVG9hc3RJbmplY3RvciwgVG9hc3RSZWYgfSBmcm9tICcuL3RvYXN0LWluamVjdG9yJztcbmltcG9ydCB7IFRvYXN0Q29udGFpbmVyRGlyZWN0aXZlIH0gZnJvbSAnLi90b2FzdC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgR2xvYmFsQ29uZmlnLCBJbmRpdmlkdWFsQ29uZmlnLCBUb2FzdFBhY2thZ2UsIFRvYXN0VG9rZW4sIFRPQVNUX0NPTkZJRyB9IGZyb20gJy4vdG9hc3RyLWNvbmZpZyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aXZlVG9hc3Q8Qz4ge1xuICAvKiogWW91ciBUb2FzdCBJRC4gVXNlIHRoaXMgdG8gY2xvc2UgaXQgaW5kaXZpZHVhbGx5ICovXG4gIHRvYXN0SWQ6IG51bWJlcjtcbiAgLyoqIHRoZSBtZXNzYWdlIG9mIHlvdXIgdG9hc3QuIFN0b3JlZCB0byBwcmV2ZW50IGR1cGxpY2F0ZXMgKi9cbiAgbWVzc2FnZTogc3RyaW5nO1xuICAvKiogYSByZWZlcmVuY2UgdG8gdGhlIGNvbXBvbmVudCBzZWUgcG9ydGFsLnRzICovXG4gIHBvcnRhbDogQ29tcG9uZW50UmVmPEM+O1xuICAvKiogYSByZWZlcmVuY2UgdG8geW91ciB0b2FzdCAqL1xuICB0b2FzdFJlZjogVG9hc3RSZWY8Qz47XG4gIC8qKiB0cmlnZ2VyZWQgd2hlbiB0b2FzdCBpcyBhY3RpdmUgKi9cbiAgb25TaG93bjogT2JzZXJ2YWJsZTxhbnk+O1xuICAvKiogdHJpZ2dlcmVkIHdoZW4gdG9hc3QgaXMgZGVzdHJveWVkICovXG4gIG9uSGlkZGVuOiBPYnNlcnZhYmxlPGFueT47XG4gIC8qKiB0cmlnZ2VyZWQgb24gdG9hc3QgY2xpY2sgKi9cbiAgb25UYXA6IE9ic2VydmFibGU8YW55PjtcbiAgLyoqIGF2YWlsYWJsZSBmb3IgeW91ciB1c2UgaW4gY3VzdG9tIHRvYXN0ICovXG4gIG9uQWN0aW9uOiBPYnNlcnZhYmxlPGFueT47XG59XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgVG9hc3RyU2VydmljZSB7XG4gIHRvYXN0ckNvbmZpZzogR2xvYmFsQ29uZmlnO1xuICBjdXJyZW50bHlBY3RpdmUgPSAwO1xuICB0b2FzdHM6IEFjdGl2ZVRvYXN0PGFueT5bXSA9IFtdO1xuICBvdmVybGF5Q29udGFpbmVyOiBUb2FzdENvbnRhaW5lckRpcmVjdGl2ZTtcbiAgcHJldmlvdXNUb2FzdE1lc3NhZ2U6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBpbmRleCA9IDA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChUT0FTVF9DT05GSUcpIHRva2VuOiBUb2FzdFRva2VuLFxuICAgIHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSxcbiAgICBwcml2YXRlIF9pbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lXG4gICkge1xuICAgIHRoaXMudG9hc3RyQ29uZmlnID0ge1xuICAgICAgLi4udG9rZW4uZGVmYXVsdCxcbiAgICAgIC4uLnRva2VuLmNvbmZpZyxcbiAgICB9O1xuICAgIGlmICh0b2tlbi5jb25maWcuaWNvbkNsYXNzZXMpIHtcbiAgICAgIHRoaXMudG9hc3RyQ29uZmlnLmljb25DbGFzc2VzID0ge1xuICAgICAgICAuLi50b2tlbi5kZWZhdWx0Lmljb25DbGFzc2VzLFxuICAgICAgICAuLi50b2tlbi5jb25maWcuaWNvbkNsYXNzZXMsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuICAvKiogc2hvdyB0b2FzdCAqL1xuICBzaG93KFxuICAgIG1lc3NhZ2U/OiBzdHJpbmcsXG4gICAgdGl0bGU/OiBzdHJpbmcsXG4gICAgb3ZlcnJpZGU6IFBhcnRpYWw8SW5kaXZpZHVhbENvbmZpZz4gPSB7fSxcbiAgICB0eXBlID0gJydcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ByZUJ1aWxkTm90aWZpY2F0aW9uKFxuICAgICAgdHlwZSxcbiAgICAgIG1lc3NhZ2UsXG4gICAgICB0aXRsZSxcbiAgICAgIHRoaXMuYXBwbHlDb25maWcob3ZlcnJpZGUpXG4gICAgKTtcbiAgfVxuICAvKiogc2hvdyBzdWNjZXNzZnVsIHRvYXN0ICovXG4gIHN1Y2Nlc3MoXG4gICAgbWVzc2FnZT86IHN0cmluZyxcbiAgICB0aXRsZT86IHN0cmluZyxcbiAgICBvdmVycmlkZTogUGFydGlhbDxJbmRpdmlkdWFsQ29uZmlnPiA9IHt9XG4gICkge1xuICAgIGNvbnN0IHR5cGUgPSB0aGlzLnRvYXN0ckNvbmZpZy5pY29uQ2xhc3Nlcy5zdWNjZXNzIHx8ICcnO1xuICAgIHJldHVybiB0aGlzLl9wcmVCdWlsZE5vdGlmaWNhdGlvbihcbiAgICAgIHR5cGUsXG4gICAgICBtZXNzYWdlLFxuICAgICAgdGl0bGUsXG4gICAgICB0aGlzLmFwcGx5Q29uZmlnKG92ZXJyaWRlKVxuICAgICk7XG4gIH1cbiAgLyoqIHNob3cgZXJyb3IgdG9hc3QgKi9cbiAgZXJyb3IoXG4gICAgbWVzc2FnZT86IHN0cmluZyxcbiAgICB0aXRsZT86IHN0cmluZyxcbiAgICBvdmVycmlkZTogUGFydGlhbDxJbmRpdmlkdWFsQ29uZmlnPiA9IHt9XG4gICkge1xuICAgIGNvbnN0IHR5cGUgPSB0aGlzLnRvYXN0ckNvbmZpZy5pY29uQ2xhc3Nlcy5lcnJvciB8fCAnJztcbiAgICByZXR1cm4gdGhpcy5fcHJlQnVpbGROb3RpZmljYXRpb24oXG4gICAgICB0eXBlLFxuICAgICAgbWVzc2FnZSxcbiAgICAgIHRpdGxlLFxuICAgICAgdGhpcy5hcHBseUNvbmZpZyhvdmVycmlkZSlcbiAgICApO1xuICB9XG4gIC8qKiBzaG93IGluZm8gdG9hc3QgKi9cbiAgaW5mbyhcbiAgICBtZXNzYWdlPzogc3RyaW5nLFxuICAgIHRpdGxlPzogc3RyaW5nLFxuICAgIG92ZXJyaWRlOiBQYXJ0aWFsPEluZGl2aWR1YWxDb25maWc+ID0ge31cbiAgKSB7XG4gICAgY29uc3QgdHlwZSA9IHRoaXMudG9hc3RyQ29uZmlnLmljb25DbGFzc2VzLmluZm8gfHwgJyc7XG4gICAgcmV0dXJuIHRoaXMuX3ByZUJ1aWxkTm90aWZpY2F0aW9uKFxuICAgICAgdHlwZSxcbiAgICAgIG1lc3NhZ2UsXG4gICAgICB0aXRsZSxcbiAgICAgIHRoaXMuYXBwbHlDb25maWcob3ZlcnJpZGUpXG4gICAgKTtcbiAgfVxuICAvKiogc2hvdyB3YXJuaW5nIHRvYXN0ICovXG4gIHdhcm5pbmcoXG4gICAgbWVzc2FnZT86IHN0cmluZyxcbiAgICB0aXRsZT86IHN0cmluZyxcbiAgICBvdmVycmlkZTogUGFydGlhbDxJbmRpdmlkdWFsQ29uZmlnPiA9IHt9XG4gICkge1xuICAgIGNvbnN0IHR5cGUgPSB0aGlzLnRvYXN0ckNvbmZpZy5pY29uQ2xhc3Nlcy53YXJuaW5nIHx8ICcnO1xuICAgIHJldHVybiB0aGlzLl9wcmVCdWlsZE5vdGlmaWNhdGlvbihcbiAgICAgIHR5cGUsXG4gICAgICBtZXNzYWdlLFxuICAgICAgdGl0bGUsXG4gICAgICB0aGlzLmFwcGx5Q29uZmlnKG92ZXJyaWRlKVxuICAgICk7XG4gIH1cbiAgLyoqXG4gICAqIFJlbW92ZSBhbGwgb3IgYSBzaW5nbGUgdG9hc3QgYnkgaWRcbiAgICovXG4gIGNsZWFyKHRvYXN0SWQ/OiBudW1iZXIpIHtcbiAgICAvLyBDYWxsIGV2ZXJ5IHRvYXN0UmVmIG1hbnVhbENsb3NlIGZ1bmN0aW9uXG4gICAgZm9yIChjb25zdCB0b2FzdCBvZiB0aGlzLnRvYXN0cykge1xuICAgICAgaWYgKHRvYXN0SWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAodG9hc3QudG9hc3RJZCA9PT0gdG9hc3RJZCkge1xuICAgICAgICAgIHRvYXN0LnRvYXN0UmVmLm1hbnVhbENsb3NlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b2FzdC50b2FzdFJlZi5tYW51YWxDbG9zZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICAvKipcbiAgICogUmVtb3ZlIGFuZCBkZXN0cm95IGEgc2luZ2xlIHRvYXN0IGJ5IGlkXG4gICAqL1xuICByZW1vdmUodG9hc3RJZDogbnVtYmVyKSB7XG4gICAgY29uc3QgZm91bmQgPSB0aGlzLl9maW5kVG9hc3QodG9hc3RJZCk7XG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3VuZC5hY3RpdmVUb2FzdC50b2FzdFJlZi5jbG9zZSgpO1xuICAgIHRoaXMudG9hc3RzLnNwbGljZShmb3VuZC5pbmRleCwgMSk7XG4gICAgdGhpcy5jdXJyZW50bHlBY3RpdmUgPSB0aGlzLmN1cnJlbnRseUFjdGl2ZSAtIDE7XG4gICAgaWYgKCF0aGlzLnRvYXN0ckNvbmZpZy5tYXhPcGVuZWQgfHwgIXRoaXMudG9hc3RzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICB0aGlzLmN1cnJlbnRseUFjdGl2ZSA8IHRoaXMudG9hc3RyQ29uZmlnLm1heE9wZW5lZCAmJlxuICAgICAgdGhpcy50b2FzdHNbdGhpcy5jdXJyZW50bHlBY3RpdmVdXG4gICAgKSB7XG4gICAgICBjb25zdCBwID0gdGhpcy50b2FzdHNbdGhpcy5jdXJyZW50bHlBY3RpdmVdLnRvYXN0UmVmO1xuICAgICAgaWYgKCFwLmlzSW5hY3RpdmUoKSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRseUFjdGl2ZSA9IHRoaXMuY3VycmVudGx5QWN0aXZlICsgMTtcbiAgICAgICAgcC5hY3RpdmF0ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kcyBhIGR1cGxpY2F0ZSB0b2FzdCBpZiBvbmUgZXhpc3RzXG4gICAqL1xuICBwcml2YXRlIGZpbmREdXBsaWNhdGUobWVzc2FnZTogc3RyaW5nLCByZXNldE9uRHVwbGljYXRlOiBib29sZWFuKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRvYXN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgdG9hc3QgPSB0aGlzLnRvYXN0c1tpXTtcbiAgICAgIGlmICh0b2FzdC5tZXNzYWdlID09PSBtZXNzYWdlKSB7XG4gICAgICAgIGlmIChyZXNldE9uRHVwbGljYXRlICYmIHRvYXN0LnRvYXN0UmVmLmNvbXBvbmVudEluc3RhbmNlLnJlc2V0VGltZW91dCkge1xuICAgICAgICAgIHRvYXN0LnRvYXN0UmVmLnJlc2V0VGltZW91dCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b2FzdDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKiogY3JlYXRlIGEgY2xvbmUgb2YgZ2xvYmFsIGNvbmZpZyBhbmQgYXBwbHkgaW5kaXZpZHVhbCBzZXR0aW5ncyAqL1xuICBwcml2YXRlIGFwcGx5Q29uZmlnKG92ZXJyaWRlOiBQYXJ0aWFsPEluZGl2aWR1YWxDb25maWc+ID0ge30pOiBHbG9iYWxDb25maWcge1xuICAgIHJldHVybiB7IC4uLnRoaXMudG9hc3RyQ29uZmlnLCAuLi5vdmVycmlkZSB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgdG9hc3Qgb2JqZWN0IGJ5IGlkXG4gICAqL1xuICBwcml2YXRlIF9maW5kVG9hc3QoXG4gICAgdG9hc3RJZDogbnVtYmVyXG4gICk6IHsgaW5kZXg6IG51bWJlcjsgYWN0aXZlVG9hc3Q6IEFjdGl2ZVRvYXN0PGFueT4gfSB8IG51bGwge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50b2FzdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLnRvYXN0c1tpXS50b2FzdElkID09PSB0b2FzdElkKSB7XG4gICAgICAgIHJldHVybiB7IGluZGV4OiBpLCBhY3RpdmVUb2FzdDogdGhpcy50b2FzdHNbaV0gfTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyB0aGUgbmVlZCB0byBydW4gaW5zaWRlIGFuZ3VsYXIncyB6b25lIHRoZW4gYnVpbGRzIHRoZSB0b2FzdFxuICAgKi9cbiAgcHJpdmF0ZSBfcHJlQnVpbGROb3RpZmljYXRpb24oXG4gICAgdG9hc3RUeXBlOiBzdHJpbmcsXG4gICAgbWVzc2FnZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIHRpdGxlOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgY29uZmlnOiBHbG9iYWxDb25maWdcbiAgKTogQWN0aXZlVG9hc3Q8YW55PiB8IG51bGwge1xuICAgIGlmIChjb25maWcub25BY3RpdmF0ZVRpY2spIHtcbiAgICAgIHJldHVybiB0aGlzLm5nWm9uZS5ydW4oKCkgPT5cbiAgICAgICAgdGhpcy5fYnVpbGROb3RpZmljYXRpb24odG9hc3RUeXBlLCBtZXNzYWdlLCB0aXRsZSwgY29uZmlnKVxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2J1aWxkTm90aWZpY2F0aW9uKHRvYXN0VHlwZSwgbWVzc2FnZSwgdGl0bGUsIGNvbmZpZyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbmQgYXR0YWNoZXMgdG9hc3QgZGF0YSB0byBjb21wb25lbnRcbiAgICogcmV0dXJucyB0aGUgYWN0aXZlIHRvYXN0LCBvciBpbiBjYXNlIHByZXZlbnREdXBsaWNhdGVzIGlzIGVuYWJsZWQgdGhlIG9yaWdpbmFsL25vbi1kdXBsaWNhdGUgYWN0aXZlIHRvYXN0LlxuICAgKi9cbiAgcHJpdmF0ZSBfYnVpbGROb3RpZmljYXRpb24oXG4gICAgdG9hc3RUeXBlOiBzdHJpbmcsXG4gICAgbWVzc2FnZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIHRpdGxlOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgY29uZmlnOiBHbG9iYWxDb25maWdcbiAgKTogQWN0aXZlVG9hc3Q8YW55PiB8IG51bGwge1xuICAgIGlmICghY29uZmlnLnRvYXN0Q29tcG9uZW50KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RvYXN0Q29tcG9uZW50IHJlcXVpcmVkJyk7XG4gICAgfVxuICAgIC8vIG1heCBvcGVuZWQgYW5kIGF1dG8gZGlzbWlzcyA9IHRydWVcbiAgICBpZiAoXG4gICAgICBtZXNzYWdlICYmXG4gICAgICB0aGlzLnRvYXN0ckNvbmZpZy5wcmV2ZW50RHVwbGljYXRlc1xuICAgICkge1xuICAgICAgY29uc3QgZHVwbGljYXRlID0gdGhpcy5maW5kRHVwbGljYXRlKG1lc3NhZ2UsIHRoaXMudG9hc3RyQ29uZmlnLnJlc2V0VGltZW91dE9uRHVwbGljYXRlKTtcbiAgICAgIGlmIChkdXBsaWNhdGUgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGR1cGxpY2F0ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5wcmV2aW91c1RvYXN0TWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgbGV0IGtlZXBJbmFjdGl2ZSA9IGZhbHNlO1xuICAgIGlmIChcbiAgICAgIHRoaXMudG9hc3RyQ29uZmlnLm1heE9wZW5lZCAmJlxuICAgICAgdGhpcy5jdXJyZW50bHlBY3RpdmUgPj0gdGhpcy50b2FzdHJDb25maWcubWF4T3BlbmVkXG4gICAgKSB7XG4gICAgICBrZWVwSW5hY3RpdmUgPSB0cnVlO1xuICAgICAgaWYgKHRoaXMudG9hc3RyQ29uZmlnLmF1dG9EaXNtaXNzKSB7XG4gICAgICAgIHRoaXMuY2xlYXIodGhpcy50b2FzdHNbMF0udG9hc3RJZCk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IG92ZXJsYXlSZWYgPSB0aGlzLm92ZXJsYXkuY3JlYXRlKFxuICAgICAgY29uZmlnLnBvc2l0aW9uQ2xhc3MsXG4gICAgICB0aGlzLm92ZXJsYXlDb250YWluZXJcbiAgICApO1xuICAgIHRoaXMuaW5kZXggPSB0aGlzLmluZGV4ICsgMTtcbiAgICBsZXQgc2FuaXRpemVkTWVzc2FnZTogc3RyaW5nIHwgU2FmZUh0bWwgfCB1bmRlZmluZWQgfCBudWxsID0gbWVzc2FnZTtcbiAgICBpZiAobWVzc2FnZSAmJiBjb25maWcuZW5hYmxlSHRtbCkge1xuICAgICAgc2FuaXRpemVkTWVzc2FnZSA9IHRoaXMuc2FuaXRpemVyLnNhbml0aXplKFNlY3VyaXR5Q29udGV4dC5IVE1MLCBtZXNzYWdlKTtcbiAgICB9XG4gICAgY29uc3QgdG9hc3RSZWYgPSBuZXcgVG9hc3RSZWYob3ZlcmxheVJlZik7XG4gICAgY29uc3QgdG9hc3RQYWNrYWdlID0gbmV3IFRvYXN0UGFja2FnZShcbiAgICAgIHRoaXMuaW5kZXgsXG4gICAgICBjb25maWcsXG4gICAgICBzYW5pdGl6ZWRNZXNzYWdlLFxuICAgICAgdGl0bGUsXG4gICAgICB0b2FzdFR5cGUsXG4gICAgICB0b2FzdFJlZlxuICAgICk7XG4gICAgY29uc3QgdG9hc3RJbmplY3RvciA9IG5ldyBUb2FzdEluamVjdG9yKHRvYXN0UGFja2FnZSwgdGhpcy5faW5qZWN0b3IpO1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IG5ldyBDb21wb25lbnRQb3J0YWwoY29uZmlnLnRvYXN0Q29tcG9uZW50LCB0b2FzdEluamVjdG9yKTtcbiAgICBjb25zdCBwb3J0YWwgPSBvdmVybGF5UmVmLmF0dGFjaChjb21wb25lbnQsIHRoaXMudG9hc3RyQ29uZmlnLm5ld2VzdE9uVG9wKTtcbiAgICB0b2FzdFJlZi5jb21wb25lbnRJbnN0YW5jZSA9ICg8YW55PnBvcnRhbCkuX2NvbXBvbmVudDtcbiAgICBjb25zdCBpbnM6IEFjdGl2ZVRvYXN0PGFueT4gPSB7XG4gICAgICB0b2FzdElkOiB0aGlzLmluZGV4LFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSB8fCAnJyxcbiAgICAgIHRvYXN0UmVmLFxuICAgICAgb25TaG93bjogdG9hc3RSZWYuYWZ0ZXJBY3RpdmF0ZSgpLFxuICAgICAgb25IaWRkZW46IHRvYXN0UmVmLmFmdGVyQ2xvc2VkKCksXG4gICAgICBvblRhcDogdG9hc3RQYWNrYWdlLm9uVGFwKCksXG4gICAgICBvbkFjdGlvbjogdG9hc3RQYWNrYWdlLm9uQWN0aW9uKCksXG4gICAgICBwb3J0YWxcbiAgICB9O1xuXG4gICAgaWYgKCFrZWVwSW5hY3RpdmUpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpbnMudG9hc3RSZWYuYWN0aXZhdGUoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50bHlBY3RpdmUgPSB0aGlzLmN1cnJlbnRseUFjdGl2ZSArIDE7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnRvYXN0cy5wdXNoKGlucyk7XG4gICAgcmV0dXJuIGlucztcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgYW5pbWF0ZSxcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICB0cmlnZ2VyXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEluZGl2aWR1YWxDb25maWcsIFRvYXN0UGFja2FnZSB9IGZyb20gJy4vdG9hc3RyLWNvbmZpZyc7XG5pbXBvcnQgeyBUb2FzdHJTZXJ2aWNlIH0gZnJvbSAnLi90b2FzdHIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1t0b2FzdC1jb21wb25lbnRdJyxcbiAgdGVtcGxhdGU6IGBcbiAgPGJ1dHRvbiAqbmdJZj1cIm9wdGlvbnMuY2xvc2VCdXR0b25cIiAoY2xpY2spPVwicmVtb3ZlKClcIiBjbGFzcz1cInRvYXN0LWNsb3NlLWJ1dHRvblwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPlxuICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XG4gIDwvYnV0dG9uPlxuICA8ZGl2ICpuZ0lmPVwidGl0bGVcIiBbY2xhc3NdPVwib3B0aW9ucy50aXRsZUNsYXNzXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJ0aXRsZVwiPlxuICAgIHt7IHRpdGxlIH19XG4gIDwvZGl2PlxuICA8ZGl2ICpuZ0lmPVwibWVzc2FnZSAmJiBvcHRpb25zLmVuYWJsZUh0bWxcIiByb2xlPVwiYWxlcnRkaWFsb2dcIiBhcmlhLWxpdmU9XCJwb2xpdGVcIlxuICAgIFtjbGFzc109XCJvcHRpb25zLm1lc3NhZ2VDbGFzc1wiIFtpbm5lckhUTUxdPVwibWVzc2FnZVwiPlxuICA8L2Rpdj5cbiAgPGRpdiAqbmdJZj1cIm1lc3NhZ2UgJiYgIW9wdGlvbnMuZW5hYmxlSHRtbFwiIHJvbGU9XCJhbGVydGRpYWxvZ1wiIGFyaWEtbGl2ZT1cInBvbGl0ZVwiXG4gICAgW2NsYXNzXT1cIm9wdGlvbnMubWVzc2FnZUNsYXNzXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJtZXNzYWdlXCI+XG4gICAge3sgbWVzc2FnZSB9fVxuICA8L2Rpdj5cbiAgPGRpdiAqbmdJZj1cIm9wdGlvbnMucHJvZ3Jlc3NCYXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwidG9hc3QtcHJvZ3Jlc3NcIiBbc3R5bGUud2lkdGhdPVwid2lkdGggKyAnJSdcIj48L2Rpdj5cbiAgPC9kaXY+XG4gIGAsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdmbHlJbk91dCcsIFtcbiAgICAgIHN0YXRlKFxuICAgICAgICAnaW5hY3RpdmUnLFxuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgICBzdGF0ZSgnYWN0aXZlJywgc3R5bGUoe30pKSxcbiAgICAgIHN0YXRlKCdyZW1vdmVkJywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oXG4gICAgICAgICdpbmFjdGl2ZSA9PiBhY3RpdmUnLFxuICAgICAgICBhbmltYXRlKCd7eyBlYXNlVGltZSB9fW1zIHt7IGVhc2luZyB9fScpXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbignYWN0aXZlID0+IHJlbW92ZWQnLCBhbmltYXRlKCd7eyBlYXNlVGltZSB9fW1zIHt7IGVhc2luZyB9fScpKVxuICAgIF0pXG4gIF0sXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIFRvYXN0IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgbWVzc2FnZT86IHN0cmluZyB8IFNhZmVIdG1sIHwgbnVsbDtcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIG9wdGlvbnM6IEluZGl2aWR1YWxDb25maWc7XG4gIG9yaWdpbmFsVGltZW91dDogbnVtYmVyO1xuICAvKiogd2lkdGggb2YgcHJvZ3Jlc3MgYmFyICovXG4gIHdpZHRoID0gLTE7XG4gIC8qKiBhIGNvbWJpbmF0aW9uIG9mIHRvYXN0IHR5cGUgYW5kIG9wdGlvbnMudG9hc3RDbGFzcyAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgdG9hc3RDbGFzc2VzID0gJyc7XG4gIC8qKiBjb250cm9scyBhbmltYXRpb24gKi9cbiAgQEhvc3RCaW5kaW5nKCdAZmx5SW5PdXQnKVxuICBzdGF0ZSA9IHtcbiAgICB2YWx1ZTogJ2luYWN0aXZlJyxcbiAgICBwYXJhbXM6IHtcbiAgICAgIGVhc2VUaW1lOiB0aGlzLnRvYXN0UGFja2FnZS5jb25maWcuZWFzZVRpbWUsXG4gICAgICBlYXNpbmc6ICdlYXNlLWluJ1xuICAgIH1cbiAgfTtcbiAgcHJpdmF0ZSB0aW1lb3V0OiBhbnk7XG4gIHByaXZhdGUgaW50ZXJ2YWxJZDogYW55O1xuICBwcml2YXRlIGhpZGVUaW1lOiBudW1iZXI7XG4gIHByaXZhdGUgc3ViOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgc3ViMTogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHN1YjI6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdG9hc3RyU2VydmljZTogVG9hc3RyU2VydmljZSxcbiAgICBwdWJsaWMgdG9hc3RQYWNrYWdlOiBUb2FzdFBhY2thZ2UsXG4gICAgcHJvdGVjdGVkIG5nWm9uZT86IE5nWm9uZVxuICApIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSB0b2FzdFBhY2thZ2UubWVzc2FnZTtcbiAgICB0aGlzLnRpdGxlID0gdG9hc3RQYWNrYWdlLnRpdGxlO1xuICAgIHRoaXMub3B0aW9ucyA9IHRvYXN0UGFja2FnZS5jb25maWc7XG4gICAgdGhpcy5vcmlnaW5hbFRpbWVvdXQgPSB0b2FzdFBhY2thZ2UuY29uZmlnLnRpbWVPdXQ7XG4gICAgdGhpcy50b2FzdENsYXNzZXMgPSBgJHt0b2FzdFBhY2thZ2UudG9hc3RUeXBlfSAke1xuICAgICAgdG9hc3RQYWNrYWdlLmNvbmZpZy50b2FzdENsYXNzXG4gICAgfWA7XG4gICAgdGhpcy5zdWIgPSB0b2FzdFBhY2thZ2UudG9hc3RSZWYuYWZ0ZXJBY3RpdmF0ZSgpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmFjdGl2YXRlVG9hc3QoKTtcbiAgICB9KTtcbiAgICB0aGlzLnN1YjEgPSB0b2FzdFBhY2thZ2UudG9hc3RSZWYubWFudWFsQ2xvc2VkKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgfSk7XG4gICAgdGhpcy5zdWIyID0gdG9hc3RQYWNrYWdlLnRvYXN0UmVmLnRpbWVvdXRSZXNldCgpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnJlc2V0VGltZW91dCgpO1xuICAgIH0pO1xuICB9XG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWIxLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWIyLnVuc3Vic2NyaWJlKCk7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICB9XG4gIC8qKlxuICAgKiBhY3RpdmF0ZXMgdG9hc3QgYW5kIHNldHMgdGltZW91dFxuICAgKi9cbiAgYWN0aXZhdGVUb2FzdCgpIHtcbiAgICB0aGlzLnN0YXRlID0geyAuLi50aGlzLnN0YXRlLCB2YWx1ZTogJ2FjdGl2ZScgfTtcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5kaXNhYmxlVGltZU91dCAmJiB0aGlzLm9wdGlvbnMudGltZU91dCkge1xuICAgICAgdGhpcy5vdXRzaWRlVGltZW91dCgoKSA9PiB0aGlzLnJlbW92ZSgpLCB0aGlzLm9wdGlvbnMudGltZU91dCk7XG4gICAgICB0aGlzLmhpZGVUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgKyB0aGlzLm9wdGlvbnMudGltZU91dDtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMucHJvZ3Jlc3NCYXIpIHtcbiAgICAgICAgdGhpcy5vdXRzaWRlSW50ZXJ2YWwoKCkgPT4gdGhpcy51cGRhdGVQcm9ncmVzcygpLCAxMCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiB1cGRhdGVzIHByb2dyZXNzIGJhciB3aWR0aFxuICAgKi9cbiAgdXBkYXRlUHJvZ3Jlc3MoKSB7XG4gICAgaWYgKHRoaXMud2lkdGggPT09IDAgfHwgdGhpcy53aWR0aCA9PT0gMTAwIHx8ICF0aGlzLm9wdGlvbnMudGltZU91dCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBjb25zdCByZW1haW5pbmcgPSB0aGlzLmhpZGVUaW1lIC0gbm93O1xuICAgIHRoaXMud2lkdGggPSAocmVtYWluaW5nIC8gdGhpcy5vcHRpb25zLnRpbWVPdXQpICogMTAwO1xuICAgIGlmICh0aGlzLm9wdGlvbnMucHJvZ3Jlc3NBbmltYXRpb24gPT09ICdpbmNyZWFzaW5nJykge1xuICAgICAgdGhpcy53aWR0aCA9IDEwMCAtIHRoaXMud2lkdGg7XG4gICAgfVxuICAgIGlmICh0aGlzLndpZHRoIDw9IDApIHtcbiAgICAgIHRoaXMud2lkdGggPSAwO1xuICAgIH1cbiAgICBpZiAodGhpcy53aWR0aCA+PSAxMDApIHtcbiAgICAgIHRoaXMud2lkdGggPSAxMDA7XG4gICAgfVxuICB9XG5cbiAgcmVzZXRUaW1lb3V0KCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKTtcbiAgICB0aGlzLnN0YXRlID0geyAuLi50aGlzLnN0YXRlLCB2YWx1ZTogJ2FjdGl2ZScgfTtcblxuICAgIHRoaXMub3V0c2lkZVRpbWVvdXQoKCkgPT4gdGhpcy5yZW1vdmUoKSwgdGhpcy5vcmlnaW5hbFRpbWVvdXQpO1xuICAgIHRoaXMub3B0aW9ucy50aW1lT3V0ID0gdGhpcy5vcmlnaW5hbFRpbWVvdXQ7XG4gICAgdGhpcy5oaWRlVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgKHRoaXMub3B0aW9ucy50aW1lT3V0IHx8IDApO1xuICAgIHRoaXMud2lkdGggPSAtMTtcbiAgICBpZiAodGhpcy5vcHRpb25zLnByb2dyZXNzQmFyKSB7XG4gICAgICB0aGlzLm91dHNpZGVJbnRlcnZhbCgoKSA9PiB0aGlzLnVwZGF0ZVByb2dyZXNzKCksIDEwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogdGVsbHMgdG9hc3RyU2VydmljZSB0byByZW1vdmUgdGhpcyB0b2FzdCBhZnRlciBhbmltYXRpb24gdGltZVxuICAgKi9cbiAgcmVtb3ZlKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLnZhbHVlID09PSAncmVtb3ZlZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgdGhpcy5zdGF0ZSA9IHsgLi4udGhpcy5zdGF0ZSwgdmFsdWU6ICdyZW1vdmVkJyB9O1xuICAgIHRoaXMub3V0c2lkZVRpbWVvdXQoXG4gICAgICAoKSA9PiB0aGlzLnRvYXN0clNlcnZpY2UucmVtb3ZlKHRoaXMudG9hc3RQYWNrYWdlLnRvYXN0SWQpLFxuICAgICAgK3RoaXMudG9hc3RQYWNrYWdlLmNvbmZpZy5lYXNlVGltZVxuICAgICk7XG4gIH1cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICB0YXBUb2FzdCgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS52YWx1ZSA9PT0gJ3JlbW92ZWQnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudG9hc3RQYWNrYWdlLnRyaWdnZXJUYXAoKTtcbiAgICBpZiAodGhpcy5vcHRpb25zLnRhcFRvRGlzbWlzcykge1xuICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICB9XG4gIH1cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gIHN0aWNrQXJvdW5kKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLnZhbHVlID09PSAncmVtb3ZlZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgdGhpcy5vcHRpb25zLnRpbWVPdXQgPSAwO1xuICAgIHRoaXMuaGlkZVRpbWUgPSAwO1xuXG4gICAgLy8gZGlzYWJsZSBwcm9ncmVzc0JhclxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKTtcbiAgICB0aGlzLndpZHRoID0gMDtcbiAgfVxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgZGVsYXllZEhpZGVUb2FzdCgpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLm9wdGlvbnMuZGlzYWJsZVRpbWVPdXQgfHxcbiAgICAgIHRoaXMub3B0aW9ucy5leHRlbmRlZFRpbWVPdXQgPT09IDAgfHxcbiAgICAgIHRoaXMuc3RhdGUudmFsdWUgPT09ICdyZW1vdmVkJ1xuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm91dHNpZGVUaW1lb3V0KCgpID0+IHRoaXMucmVtb3ZlKCksIHRoaXMub3B0aW9ucy5leHRlbmRlZFRpbWVPdXQpO1xuICAgIHRoaXMub3B0aW9ucy50aW1lT3V0ID0gdGhpcy5vcHRpb25zLmV4dGVuZGVkVGltZU91dDtcbiAgICB0aGlzLmhpZGVUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgKyAodGhpcy5vcHRpb25zLnRpbWVPdXQgfHwgMCk7XG4gICAgdGhpcy53aWR0aCA9IC0xO1xuICAgIGlmICh0aGlzLm9wdGlvbnMucHJvZ3Jlc3NCYXIpIHtcbiAgICAgIHRoaXMub3V0c2lkZUludGVydmFsKCgpID0+IHRoaXMudXBkYXRlUHJvZ3Jlc3MoKSwgMTApO1xuICAgIH1cbiAgfVxuXG4gIG91dHNpZGVUaW1lb3V0KGZ1bmM6IEZ1bmN0aW9uLCB0aW1lb3V0OiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5uZ1pvbmUpIHtcbiAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKFxuICAgICAgICAoKSA9PlxuICAgICAgICAgICh0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgKCkgPT4gdGhpcy5ydW5JbnNpZGVBbmd1bGFyKGZ1bmMpLFxuICAgICAgICAgICAgdGltZW91dFxuICAgICAgICAgICkpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IGZ1bmMoKSwgdGltZW91dCk7XG4gICAgfVxuICB9XG5cbiAgb3V0c2lkZUludGVydmFsKGZ1bmM6IEZ1bmN0aW9uLCB0aW1lb3V0OiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5uZ1pvbmUpIHtcbiAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKFxuICAgICAgICAoKSA9PlxuICAgICAgICAgICh0aGlzLmludGVydmFsSWQgPSBzZXRJbnRlcnZhbChcbiAgICAgICAgICAgICgpID0+IHRoaXMucnVuSW5zaWRlQW5ndWxhcihmdW5jKSxcbiAgICAgICAgICAgIHRpbWVvdXRcbiAgICAgICAgICApKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4gZnVuYygpLCB0aW1lb3V0KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJ1bkluc2lkZUFuZ3VsYXIoZnVuYzogRnVuY3Rpb24pIHtcbiAgICBpZiAodGhpcy5uZ1pvbmUpIHtcbiAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiBmdW5jKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmdW5jKCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgVG9hc3QgfSBmcm9tICcuL3RvYXN0LmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBEZWZhdWx0Tm9Db21wb25lbnRHbG9iYWxDb25maWcsXG4gIEdsb2JhbENvbmZpZyxcbiAgVE9BU1RfQ09ORklHLFxufSBmcm9tICcuL3RvYXN0ci1jb25maWcnO1xuXG5leHBvcnQgY29uc3QgRGVmYXVsdEdsb2JhbENvbmZpZzogR2xvYmFsQ29uZmlnID0ge1xuICAuLi5EZWZhdWx0Tm9Db21wb25lbnRHbG9iYWxDb25maWcsXG4gIHRvYXN0Q29tcG9uZW50OiBUb2FzdCxcbn07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtUb2FzdF0sXG4gIGV4cG9ydHM6IFtUb2FzdF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1RvYXN0XSxcbn0pXG5leHBvcnQgY2xhc3MgVG9hc3RyTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBQYXJ0aWFsPEdsb2JhbENvbmZpZz4gPSB7fSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogVG9hc3RyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBUT0FTVF9DT05GSUcsXG4gICAgICAgICAgdXNlVmFsdWU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IERlZmF1bHRHbG9iYWxDb25maWcsXG4gICAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgVG9hc3RyQ29tcG9uZW50bGVzc01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogUGFydGlhbDxHbG9iYWxDb25maWc+ID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFRvYXN0ck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogVE9BU1RfQ09ORklHLFxuICAgICAgICAgIHVzZVZhbHVlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBEZWZhdWx0Tm9Db21wb25lbnRHbG9iYWxDb25maWcsXG4gICAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9jb3JlJztcclxuaW1wb3J0IHtcclxuICBBcHBsaWNhdGlvblJlZixcclxuICBDb21wb25lbnQsXHJcbiAgSG9zdEJpbmRpbmcsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIE5nTW9kdWxlLFxyXG4gIE9uRGVzdHJveSxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHtcclxuICBEZWZhdWx0Tm9Db21wb25lbnRHbG9iYWxDb25maWcsXHJcbiAgR2xvYmFsQ29uZmlnLFxyXG4gIEluZGl2aWR1YWxDb25maWcsXHJcbiAgVG9hc3RQYWNrYWdlLFxyXG4gIFRPQVNUX0NPTkZJRyxcclxufSBmcm9tICcuL3RvYXN0ci1jb25maWcnO1xyXG5pbXBvcnQgeyBUb2FzdHJTZXJ2aWNlIH0gZnJvbSAnLi90b2FzdHIuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ1t0b2FzdC1jb21wb25lbnRdJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gIDxidXR0b24gKm5nSWY9XCJvcHRpb25zLmNsb3NlQnV0dG9uXCIgKGNsaWNrKT1cInJlbW92ZSgpXCIgY2xhc3M9XCJ0b2FzdC1jbG9zZS1idXR0b25cIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj5cclxuICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XHJcbiAgPC9idXR0b24+XHJcbiAgPGRpdiAqbmdJZj1cInRpdGxlXCIgW2NsYXNzXT1cIm9wdGlvbnMudGl0bGVDbGFzc1wiIFthdHRyLmFyaWEtbGFiZWxdPVwidGl0bGVcIj5cclxuICAgIHt7IHRpdGxlIH19XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiAqbmdJZj1cIm1lc3NhZ2UgJiYgb3B0aW9ucy5lbmFibGVIdG1sXCIgcm9sZT1cImFsZXJ0XCIgYXJpYS1saXZlPVwicG9saXRlXCJcclxuICAgIFtjbGFzc109XCJvcHRpb25zLm1lc3NhZ2VDbGFzc1wiIFtpbm5lckhUTUxdPVwibWVzc2FnZVwiPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgKm5nSWY9XCJtZXNzYWdlICYmICFvcHRpb25zLmVuYWJsZUh0bWxcIiByb2xlPVwiYWxlcnRcIiBhcmlhLWxpdmU9XCJwb2xpdGVcIlxyXG4gICAgW2NsYXNzXT1cIm9wdGlvbnMubWVzc2FnZUNsYXNzXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJtZXNzYWdlXCI+XHJcbiAgICB7eyBtZXNzYWdlIH19XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiAqbmdJZj1cIm9wdGlvbnMucHJvZ3Jlc3NCYXJcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJ0b2FzdC1wcm9ncmVzc1wiIFtzdHlsZS53aWR0aF09XCJ3aWR0aCArICclJ1wiPjwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIGAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUb2FzdE5vQW5pbWF0aW9uIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICBtZXNzYWdlPzogc3RyaW5nIHwgU2FmZUh0bWwgfCBudWxsO1xyXG4gIHRpdGxlPzogc3RyaW5nO1xyXG4gIG9wdGlvbnM6IEluZGl2aWR1YWxDb25maWc7XHJcbiAgb3JpZ2luYWxUaW1lb3V0OiBudW1iZXI7XHJcbiAgLyoqIHdpZHRoIG9mIHByb2dyZXNzIGJhciAqL1xyXG4gIHdpZHRoID0gLTE7XHJcbiAgLyoqIGEgY29tYmluYXRpb24gb2YgdG9hc3QgdHlwZSBhbmQgb3B0aW9ucy50b2FzdENsYXNzICovXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIHRvYXN0Q2xhc3NlcyA9ICcnO1xyXG5cclxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmRpc3BsYXknKVxyXG4gIGdldCBkaXNwbGF5U3R5bGUoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZSA9PT0gJ2luYWN0aXZlJykge1xyXG4gICAgICByZXR1cm4gJ25vbmUnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICdpbmhlcml0JztcclxuICB9XHJcblxyXG4gIC8qKiBjb250cm9scyBhbmltYXRpb24gKi9cclxuICBzdGF0ZSA9ICdpbmFjdGl2ZSc7XHJcbiAgcHJpdmF0ZSB0aW1lb3V0OiBhbnk7XHJcbiAgcHJpdmF0ZSBpbnRlcnZhbElkOiBhbnk7XHJcbiAgcHJpdmF0ZSBoaWRlVGltZTogbnVtYmVyO1xyXG4gIHByaXZhdGUgc3ViOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBzdWIxOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBzdWIyOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJvdGVjdGVkIHRvYXN0clNlcnZpY2U6IFRvYXN0clNlcnZpY2UsXHJcbiAgICBwdWJsaWMgdG9hc3RQYWNrYWdlOiBUb2FzdFBhY2thZ2UsXHJcbiAgICBwcm90ZWN0ZWQgYXBwUmVmOiBBcHBsaWNhdGlvblJlZixcclxuICApIHtcclxuICAgIHRoaXMubWVzc2FnZSA9IHRvYXN0UGFja2FnZS5tZXNzYWdlO1xyXG4gICAgdGhpcy50aXRsZSA9IHRvYXN0UGFja2FnZS50aXRsZTtcclxuICAgIHRoaXMub3B0aW9ucyA9IHRvYXN0UGFja2FnZS5jb25maWc7XHJcbiAgICB0aGlzLm9yaWdpbmFsVGltZW91dCA9IHRvYXN0UGFja2FnZS5jb25maWcudGltZU91dDtcclxuICAgIHRoaXMudG9hc3RDbGFzc2VzID0gYCR7dG9hc3RQYWNrYWdlLnRvYXN0VHlwZX0gJHtcclxuICAgICAgdG9hc3RQYWNrYWdlLmNvbmZpZy50b2FzdENsYXNzXHJcbiAgICB9YDtcclxuICAgIHRoaXMuc3ViID0gdG9hc3RQYWNrYWdlLnRvYXN0UmVmLmFmdGVyQWN0aXZhdGUoKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLmFjdGl2YXRlVG9hc3QoKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zdWIxID0gdG9hc3RQYWNrYWdlLnRvYXN0UmVmLm1hbnVhbENsb3NlZCgpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3ViMiA9IHRvYXN0UGFja2FnZS50b2FzdFJlZi50aW1lb3V0UmVzZXQoKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLnJlc2V0VGltZW91dCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuc3ViMS51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5zdWIyLnVuc3Vic2NyaWJlKCk7XHJcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJZCk7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogYWN0aXZhdGVzIHRvYXN0IGFuZCBzZXRzIHRpbWVvdXRcclxuICAgKi9cclxuICBhY3RpdmF0ZVRvYXN0KCkge1xyXG4gICAgdGhpcy5zdGF0ZSA9ICdhY3RpdmUnO1xyXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuZGlzYWJsZVRpbWVPdXQgJiYgdGhpcy5vcHRpb25zLnRpbWVPdXQpIHtcclxuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgICAgfSwgdGhpcy5vcHRpb25zLnRpbWVPdXQpO1xyXG4gICAgICB0aGlzLmhpZGVUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgKyB0aGlzLm9wdGlvbnMudGltZU91dDtcclxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5wcm9ncmVzc0Jhcikge1xyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCgpID0+IHRoaXMudXBkYXRlUHJvZ3Jlc3MoKSwgMTApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLm9uQWN0aXZhdGVUaWNrKSB7XHJcbiAgICAgIHRoaXMuYXBwUmVmLnRpY2soKTtcclxuICAgIH1cclxuICB9XHJcbiAgLyoqXHJcbiAgICogdXBkYXRlcyBwcm9ncmVzcyBiYXIgd2lkdGhcclxuICAgKi9cclxuICB1cGRhdGVQcm9ncmVzcygpIHtcclxuICAgIGlmICh0aGlzLndpZHRoID09PSAwIHx8IHRoaXMud2lkdGggPT09IDEwMCB8fCAhdGhpcy5vcHRpb25zLnRpbWVPdXQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICBjb25zdCByZW1haW5pbmcgPSB0aGlzLmhpZGVUaW1lIC0gbm93O1xyXG4gICAgdGhpcy53aWR0aCA9IChyZW1haW5pbmcgLyB0aGlzLm9wdGlvbnMudGltZU91dCkgKiAxMDA7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnByb2dyZXNzQW5pbWF0aW9uID09PSAnaW5jcmVhc2luZycpIHtcclxuICAgICAgdGhpcy53aWR0aCA9IDEwMCAtIHRoaXMud2lkdGg7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy53aWR0aCA8PSAwKSB7XHJcbiAgICAgIHRoaXMud2lkdGggPSAwO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMud2lkdGggPj0gMTAwKSB7XHJcbiAgICAgIHRoaXMud2lkdGggPSAxMDA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXNldFRpbWVvdXQoKSB7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcclxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKTtcclxuICAgIHRoaXMuc3RhdGUgPSAnYWN0aXZlJztcclxuXHJcbiAgICB0aGlzLm9wdGlvbnMudGltZU91dCA9IHRoaXMub3JpZ2luYWxUaW1lb3V0O1xyXG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlbW92ZSgpLCB0aGlzLm9yaWdpbmFsVGltZW91dCk7XHJcbiAgICB0aGlzLmhpZGVUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgKyAodGhpcy5vcmlnaW5hbFRpbWVvdXQgfHwgMCk7XHJcbiAgICB0aGlzLndpZHRoID0gLTE7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnByb2dyZXNzQmFyKSB7XHJcbiAgICAgIHRoaXMuaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCgpID0+IHRoaXMudXBkYXRlUHJvZ3Jlc3MoKSwgMTApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogdGVsbHMgdG9hc3RyU2VydmljZSB0byByZW1vdmUgdGhpcyB0b2FzdCBhZnRlciBhbmltYXRpb24gdGltZVxyXG4gICAqL1xyXG4gIHJlbW92ZSgpIHtcclxuICAgIGlmICh0aGlzLnN0YXRlID09PSAncmVtb3ZlZCcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XHJcbiAgICB0aGlzLnN0YXRlID0gJ3JlbW92ZWQnO1xyXG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PlxyXG4gICAgICB0aGlzLnRvYXN0clNlcnZpY2UucmVtb3ZlKHRoaXMudG9hc3RQYWNrYWdlLnRvYXN0SWQpLFxyXG4gICAgKTtcclxuICB9XHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxyXG4gIHRhcFRvYXN0KCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGUgPT09ICdyZW1vdmVkJykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnRvYXN0UGFja2FnZS50cmlnZ2VyVGFwKCk7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnRhcFRvRGlzbWlzcykge1xyXG4gICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcclxuICBzdGlja0Fyb3VuZCgpIHtcclxuICAgIGlmICh0aGlzLnN0YXRlID09PSAncmVtb3ZlZCcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XHJcbiAgICB0aGlzLm9wdGlvbnMudGltZU91dCA9IDA7XHJcbiAgICB0aGlzLmhpZGVUaW1lID0gMDtcclxuXHJcbiAgICAvLyBkaXNhYmxlIHByb2dyZXNzQmFyXHJcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJZCk7XHJcbiAgICB0aGlzLndpZHRoID0gMDtcclxuICB9XHJcbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXHJcbiAgZGVsYXllZEhpZGVUb2FzdCgpIHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5vcHRpb25zLmRpc2FibGVUaW1lT3V0IHx8XHJcbiAgICAgIHRoaXMub3B0aW9ucy5leHRlbmRlZFRpbWVPdXQgPT09IDAgfHxcclxuICAgICAgdGhpcy5zdGF0ZSA9PT0gJ3JlbW92ZWQnXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChcclxuICAgICAgKCkgPT4gdGhpcy5yZW1vdmUoKSxcclxuICAgICAgdGhpcy5vcHRpb25zLmV4dGVuZGVkVGltZU91dCxcclxuICAgICk7XHJcbiAgICB0aGlzLm9wdGlvbnMudGltZU91dCA9IHRoaXMub3B0aW9ucy5leHRlbmRlZFRpbWVPdXQ7XHJcbiAgICB0aGlzLmhpZGVUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgKyAodGhpcy5vcHRpb25zLnRpbWVPdXQgfHwgMCk7XHJcbiAgICB0aGlzLndpZHRoID0gLTE7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnByb2dyZXNzQmFyKSB7XHJcbiAgICAgIHRoaXMuaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCgpID0+IHRoaXMudXBkYXRlUHJvZ3Jlc3MoKSwgMTApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IERlZmF1bHROb0FuaW1hdGlvbnNHbG9iYWxDb25maWc6IEdsb2JhbENvbmZpZyA9IHtcclxuICAuLi5EZWZhdWx0Tm9Db21wb25lbnRHbG9iYWxDb25maWcsXHJcbiAgdG9hc3RDb21wb25lbnQ6IFRvYXN0Tm9BbmltYXRpb24sXHJcbn07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1RvYXN0Tm9BbmltYXRpb25dLFxyXG4gIGV4cG9ydHM6IFtUb2FzdE5vQW5pbWF0aW9uXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtUb2FzdE5vQW5pbWF0aW9uXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFRvYXN0Tm9BbmltYXRpb25Nb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogUGFydGlhbDxHbG9iYWxDb25maWc+ID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBUb2FzdE5vQW5pbWF0aW9uTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwcm92aWRlOiBUT0FTVF9DT05GSUcsXHJcbiAgICAgICAgICB1c2VWYWx1ZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBEZWZhdWx0Tm9BbmltYXRpb25zR2xvYmFsQ29uZmlnLFxyXG4gICAgICAgICAgICBjb25maWcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiRGlyZWN0aXZlIiwiRWxlbWVudFJlZiIsIk5nTW9kdWxlIiwiU3ViamVjdCIsIkluamVjdGlvblRva2VuIiwidHNsaWJfMS5fX2V4dGVuZHMiLCJJbmplY3RhYmxlIiwiSW5qZWN0IiwiRE9DVU1FTlQiLCJDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIiLCJBcHBsaWNhdGlvblJlZiIsInRzbGliXzEuX192YWx1ZXMiLCJTZWN1cml0eUNvbnRleHQiLCJJbmplY3RvciIsIkRvbVNhbml0aXplciIsIk5nWm9uZSIsIkNvbXBvbmVudCIsInRyaWdnZXIiLCJzdGF0ZSIsInN0eWxlIiwidHJhbnNpdGlvbiIsImFuaW1hdGUiLCJIb3N0QmluZGluZyIsIkhvc3RMaXN0ZW5lciIsIkNvbW1vbk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBV0UsaUNBQW9CLEVBQWM7WUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1NBQUs7Ozs7UUFDdkMscURBQW1COzs7WUFBbkI7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQzthQUM5Qjs7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
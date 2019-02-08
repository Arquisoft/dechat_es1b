/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Inject, Injectable, Injector, NgZone, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Overlay } from '../overlay/overlay';
import { ComponentPortal } from '../portal/portal';
import { ToastInjector, ToastRef } from './toast-injector';
import { ToastPackage, TOAST_CONFIG } from './toastr-config';
import * as i0 from "@angular/core";
import * as i1 from "./toastr-config";
import * as i2 from "../overlay/overlay";
import * as i3 from "@angular/platform-browser";
/**
 * @record
 * @template C
 */
export function ActiveToast() { }
if (false) {
    /**
     * Your Toast ID. Use this to close it individually
     * @type {?}
     */
    ActiveToast.prototype.toastId;
    /**
     * the message of your toast. Stored to prevent duplicates
     * @type {?}
     */
    ActiveToast.prototype.message;
    /**
     * a reference to the component see portal.ts
     * @type {?}
     */
    ActiveToast.prototype.portal;
    /**
     * a reference to your toast
     * @type {?}
     */
    ActiveToast.prototype.toastRef;
    /**
     * triggered when toast is active
     * @type {?}
     */
    ActiveToast.prototype.onShown;
    /**
     * triggered when toast is destroyed
     * @type {?}
     */
    ActiveToast.prototype.onHidden;
    /**
     * triggered on toast click
     * @type {?}
     */
    ActiveToast.prototype.onTap;
    /**
     * available for your use in custom toast
     * @type {?}
     */
    ActiveToast.prototype.onAction;
}
var ToastrService = /** @class */ (function () {
    function ToastrService(token, overlay, _injector, sanitizer, ngZone) {
        this.overlay = overlay;
        this._injector = _injector;
        this.sanitizer = sanitizer;
        this.ngZone = ngZone;
        this.currentlyActive = 0;
        this.toasts = [];
        this.index = 0;
        this.toastrConfig = tslib_1.__assign({}, token.default, token.config);
        if (token.config.iconClasses) {
            this.toastrConfig.iconClasses = tslib_1.__assign({}, token.default.iconClasses, token.config.iconClasses);
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
            for (var _b = tslib_1.__values(this.toasts), _c = _b.next(); !_c.done; _c = _b.next()) {
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
        return tslib_1.__assign({}, this.toastrConfig, override);
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
    /** @nocollapse */ ToastrService.ngInjectableDef = i0.defineInjectable({ factory: function ToastrService_Factory() { return new ToastrService(i0.inject(i1.TOAST_CONFIG), i0.inject(i2.Overlay), i0.inject(i0.INJECTOR), i0.inject(i3.DomSanitizer), i0.inject(i0.NgZone)); }, token: ToastrService, providedIn: "root" });
    return ToastrService;
}());
export { ToastrService };
if (false) {
    /** @type {?} */
    ToastrService.prototype.toastrConfig;
    /** @type {?} */
    ToastrService.prototype.currentlyActive;
    /** @type {?} */
    ToastrService.prototype.toasts;
    /** @type {?} */
    ToastrService.prototype.overlayContainer;
    /** @type {?} */
    ToastrService.prototype.previousToastMessage;
    /** @type {?} */
    ToastrService.prototype.index;
    /** @type {?} */
    ToastrService.prototype.overlay;
    /** @type {?} */
    ToastrService.prototype._injector;
    /** @type {?} */
    ToastrService.prototype.sanitizer;
    /** @type {?} */
    ToastrService.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3RyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdG9hc3RyLyIsInNvdXJjZXMiOlsidG9hc3RyL3RvYXN0ci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUVMLE1BQU0sRUFDTixVQUFVLEVBQ1YsUUFBUSxFQUNSLE1BQU0sRUFDTixlQUFlLEVBQ2hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUluRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDN0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFM0QsT0FBTyxFQUFrQyxZQUFZLEVBQWMsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7OztBQUV6RyxpQ0FpQkM7Ozs7OztJQWZDLDhCQUFnQjs7Ozs7SUFFaEIsOEJBQWdCOzs7OztJQUVoQiw2QkFBd0I7Ozs7O0lBRXhCLCtCQUFzQjs7Ozs7SUFFdEIsOEJBQXlCOzs7OztJQUV6QiwrQkFBMEI7Ozs7O0lBRTFCLDRCQUF1Qjs7Ozs7SUFFdkIsK0JBQTBCOztBQUc1QjtJQVNFLHVCQUN3QixLQUFpQixFQUMvQixPQUFnQixFQUNoQixTQUFtQixFQUNuQixTQUF1QixFQUN2QixNQUFjO1FBSGQsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ25CLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFDdkIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVh4QixvQkFBZSxHQUFHLENBQUMsQ0FBQztRQUNwQixXQUFNLEdBQXVCLEVBQUUsQ0FBQztRQUd4QixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBU2hCLElBQUksQ0FBQyxZQUFZLHdCQUNaLEtBQUss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TyxFQUFFLE9BQU8sSUFBSSxFQUFFO1lBQ3RCLFFBQVEsVUFBQTtZQUNSLE9BQU8sRUFBRSxRQUFRLENBQUMsYUFBYSxFQUFFO1lBQ2pDLFFBQVEsRUFBRSxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ2hDLEtBQUssRUFBRSxZQUFZLENBQUMsS0FBSyxFQUFFO1lBQzNCLFFBQVEsRUFBRSxZQUFZLENBQUMsUUFBUSxFQUFFO1lBQ2pDLE1BQU0sUUFBQTtTQUNQO1FBRUQsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNqQixVQUFVLENBQUM7Z0JBQ1QsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDeEIsS0FBSSxDQUFDLGVBQWUsR0FBRyxLQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztZQUNsRCxDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEIsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDOztnQkE1UUYsVUFBVSxTQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7OztnREFVN0IsTUFBTSxTQUFDLFlBQVk7Z0JBbkNmLE9BQU87Z0JBUmQsUUFBUTtnQkFJRCxZQUFZO2dCQUhuQixNQUFNOzs7d0JBTFI7Q0FrVEMsQUE3UUQsSUE2UUM7U0E1UVksYUFBYTs7O0lBQ3hCLHFDQUEyQjs7SUFDM0Isd0NBQW9COztJQUNwQiwrQkFBZ0M7O0lBQ2hDLHlDQUEwQzs7SUFDMUMsNkNBQXlDOztJQUN6Qyw4QkFBa0I7O0lBSWhCLGdDQUF3Qjs7SUFDeEIsa0NBQTJCOztJQUMzQixrQ0FBK0I7O0lBQy9CLCtCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudFJlZixcbiAgSW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBJbmplY3RvcixcbiAgTmdab25lLFxuICBTZWN1cml0eUNvbnRleHRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgT3ZlcmxheSB9IGZyb20gJy4uL292ZXJsYXkvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICcuLi9wb3J0YWwvcG9ydGFsJztcbmltcG9ydCB7IFRvYXN0SW5qZWN0b3IsIFRvYXN0UmVmIH0gZnJvbSAnLi90b2FzdC1pbmplY3Rvcic7XG5pbXBvcnQgeyBUb2FzdENvbnRhaW5lckRpcmVjdGl2ZSB9IGZyb20gJy4vdG9hc3QuZGlyZWN0aXZlJztcbmltcG9ydCB7IEdsb2JhbENvbmZpZywgSW5kaXZpZHVhbENvbmZpZywgVG9hc3RQYWNrYWdlLCBUb2FzdFRva2VuLCBUT0FTVF9DT05GSUcgfSBmcm9tICcuL3RvYXN0ci1jb25maWcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFjdGl2ZVRvYXN0PEM+IHtcbiAgLyoqIFlvdXIgVG9hc3QgSUQuIFVzZSB0aGlzIHRvIGNsb3NlIGl0IGluZGl2aWR1YWxseSAqL1xuICB0b2FzdElkOiBudW1iZXI7XG4gIC8qKiB0aGUgbWVzc2FnZSBvZiB5b3VyIHRvYXN0LiBTdG9yZWQgdG8gcHJldmVudCBkdXBsaWNhdGVzICovXG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgLyoqIGEgcmVmZXJlbmNlIHRvIHRoZSBjb21wb25lbnQgc2VlIHBvcnRhbC50cyAqL1xuICBwb3J0YWw6IENvbXBvbmVudFJlZjxDPjtcbiAgLyoqIGEgcmVmZXJlbmNlIHRvIHlvdXIgdG9hc3QgKi9cbiAgdG9hc3RSZWY6IFRvYXN0UmVmPEM+O1xuICAvKiogdHJpZ2dlcmVkIHdoZW4gdG9hc3QgaXMgYWN0aXZlICovXG4gIG9uU2hvd246IE9ic2VydmFibGU8YW55PjtcbiAgLyoqIHRyaWdnZXJlZCB3aGVuIHRvYXN0IGlzIGRlc3Ryb3llZCAqL1xuICBvbkhpZGRlbjogT2JzZXJ2YWJsZTxhbnk+O1xuICAvKiogdHJpZ2dlcmVkIG9uIHRvYXN0IGNsaWNrICovXG4gIG9uVGFwOiBPYnNlcnZhYmxlPGFueT47XG4gIC8qKiBhdmFpbGFibGUgZm9yIHlvdXIgdXNlIGluIGN1c3RvbSB0b2FzdCAqL1xuICBvbkFjdGlvbjogT2JzZXJ2YWJsZTxhbnk+O1xufVxuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFRvYXN0clNlcnZpY2Uge1xuICB0b2FzdHJDb25maWc6IEdsb2JhbENvbmZpZztcbiAgY3VycmVudGx5QWN0aXZlID0gMDtcbiAgdG9hc3RzOiBBY3RpdmVUb2FzdDxhbnk+W10gPSBbXTtcbiAgb3ZlcmxheUNvbnRhaW5lcjogVG9hc3RDb250YWluZXJEaXJlY3RpdmU7XG4gIHByZXZpb3VzVG9hc3RNZXNzYWdlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgaW5kZXggPSAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoVE9BU1RfQ09ORklHKSB0b2tlbjogVG9hc3RUb2tlbixcbiAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxuICApIHtcbiAgICB0aGlzLnRvYXN0ckNvbmZpZyA9IHtcbiAgICAgIC4uLnRva2VuLmRlZmF1bHQsXG4gICAgICAuLi50b2tlbi5jb25maWcsXG4gICAgfTtcbiAgICBpZiAodG9rZW4uY29uZmlnLmljb25DbGFzc2VzKSB7XG4gICAgICB0aGlzLnRvYXN0ckNvbmZpZy5pY29uQ2xhc3NlcyA9IHtcbiAgICAgICAgLi4udG9rZW4uZGVmYXVsdC5pY29uQ2xhc3NlcyxcbiAgICAgICAgLi4udG9rZW4uY29uZmlnLmljb25DbGFzc2VzLFxuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgLyoqIHNob3cgdG9hc3QgKi9cbiAgc2hvdyhcbiAgICBtZXNzYWdlPzogc3RyaW5nLFxuICAgIHRpdGxlPzogc3RyaW5nLFxuICAgIG92ZXJyaWRlOiBQYXJ0aWFsPEluZGl2aWR1YWxDb25maWc+ID0ge30sXG4gICAgdHlwZSA9ICcnXG4gICkge1xuICAgIHJldHVybiB0aGlzLl9wcmVCdWlsZE5vdGlmaWNhdGlvbihcbiAgICAgIHR5cGUsXG4gICAgICBtZXNzYWdlLFxuICAgICAgdGl0bGUsXG4gICAgICB0aGlzLmFwcGx5Q29uZmlnKG92ZXJyaWRlKVxuICAgICk7XG4gIH1cbiAgLyoqIHNob3cgc3VjY2Vzc2Z1bCB0b2FzdCAqL1xuICBzdWNjZXNzKFxuICAgIG1lc3NhZ2U/OiBzdHJpbmcsXG4gICAgdGl0bGU/OiBzdHJpbmcsXG4gICAgb3ZlcnJpZGU6IFBhcnRpYWw8SW5kaXZpZHVhbENvbmZpZz4gPSB7fVxuICApIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy50b2FzdHJDb25maWcuaWNvbkNsYXNzZXMuc3VjY2VzcyB8fCAnJztcbiAgICByZXR1cm4gdGhpcy5fcHJlQnVpbGROb3RpZmljYXRpb24oXG4gICAgICB0eXBlLFxuICAgICAgbWVzc2FnZSxcbiAgICAgIHRpdGxlLFxuICAgICAgdGhpcy5hcHBseUNvbmZpZyhvdmVycmlkZSlcbiAgICApO1xuICB9XG4gIC8qKiBzaG93IGVycm9yIHRvYXN0ICovXG4gIGVycm9yKFxuICAgIG1lc3NhZ2U/OiBzdHJpbmcsXG4gICAgdGl0bGU/OiBzdHJpbmcsXG4gICAgb3ZlcnJpZGU6IFBhcnRpYWw8SW5kaXZpZHVhbENvbmZpZz4gPSB7fVxuICApIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy50b2FzdHJDb25maWcuaWNvbkNsYXNzZXMuZXJyb3IgfHwgJyc7XG4gICAgcmV0dXJuIHRoaXMuX3ByZUJ1aWxkTm90aWZpY2F0aW9uKFxuICAgICAgdHlwZSxcbiAgICAgIG1lc3NhZ2UsXG4gICAgICB0aXRsZSxcbiAgICAgIHRoaXMuYXBwbHlDb25maWcob3ZlcnJpZGUpXG4gICAgKTtcbiAgfVxuICAvKiogc2hvdyBpbmZvIHRvYXN0ICovXG4gIGluZm8oXG4gICAgbWVzc2FnZT86IHN0cmluZyxcbiAgICB0aXRsZT86IHN0cmluZyxcbiAgICBvdmVycmlkZTogUGFydGlhbDxJbmRpdmlkdWFsQ29uZmlnPiA9IHt9XG4gICkge1xuICAgIGNvbnN0IHR5cGUgPSB0aGlzLnRvYXN0ckNvbmZpZy5pY29uQ2xhc3Nlcy5pbmZvIHx8ICcnO1xuICAgIHJldHVybiB0aGlzLl9wcmVCdWlsZE5vdGlmaWNhdGlvbihcbiAgICAgIHR5cGUsXG4gICAgICBtZXNzYWdlLFxuICAgICAgdGl0bGUsXG4gICAgICB0aGlzLmFwcGx5Q29uZmlnKG92ZXJyaWRlKVxuICAgICk7XG4gIH1cbiAgLyoqIHNob3cgd2FybmluZyB0b2FzdCAqL1xuICB3YXJuaW5nKFxuICAgIG1lc3NhZ2U/OiBzdHJpbmcsXG4gICAgdGl0bGU/OiBzdHJpbmcsXG4gICAgb3ZlcnJpZGU6IFBhcnRpYWw8SW5kaXZpZHVhbENvbmZpZz4gPSB7fVxuICApIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy50b2FzdHJDb25maWcuaWNvbkNsYXNzZXMud2FybmluZyB8fCAnJztcbiAgICByZXR1cm4gdGhpcy5fcHJlQnVpbGROb3RpZmljYXRpb24oXG4gICAgICB0eXBlLFxuICAgICAgbWVzc2FnZSxcbiAgICAgIHRpdGxlLFxuICAgICAgdGhpcy5hcHBseUNvbmZpZyhvdmVycmlkZSlcbiAgICApO1xuICB9XG4gIC8qKlxuICAgKiBSZW1vdmUgYWxsIG9yIGEgc2luZ2xlIHRvYXN0IGJ5IGlkXG4gICAqL1xuICBjbGVhcih0b2FzdElkPzogbnVtYmVyKSB7XG4gICAgLy8gQ2FsbCBldmVyeSB0b2FzdFJlZiBtYW51YWxDbG9zZSBmdW5jdGlvblxuICAgIGZvciAoY29uc3QgdG9hc3Qgb2YgdGhpcy50b2FzdHMpIHtcbiAgICAgIGlmICh0b2FzdElkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHRvYXN0LnRvYXN0SWQgPT09IHRvYXN0SWQpIHtcbiAgICAgICAgICB0b2FzdC50b2FzdFJlZi5tYW51YWxDbG9zZSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9hc3QudG9hc3RSZWYubWFudWFsQ2xvc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFJlbW92ZSBhbmQgZGVzdHJveSBhIHNpbmdsZSB0b2FzdCBieSBpZFxuICAgKi9cbiAgcmVtb3ZlKHRvYXN0SWQ6IG51bWJlcikge1xuICAgIGNvbnN0IGZvdW5kID0gdGhpcy5fZmluZFRvYXN0KHRvYXN0SWQpO1xuICAgIGlmICghZm91bmQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm91bmQuYWN0aXZlVG9hc3QudG9hc3RSZWYuY2xvc2UoKTtcbiAgICB0aGlzLnRvYXN0cy5zcGxpY2UoZm91bmQuaW5kZXgsIDEpO1xuICAgIHRoaXMuY3VycmVudGx5QWN0aXZlID0gdGhpcy5jdXJyZW50bHlBY3RpdmUgLSAxO1xuICAgIGlmICghdGhpcy50b2FzdHJDb25maWcubWF4T3BlbmVkIHx8ICF0aGlzLnRvYXN0cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgdGhpcy5jdXJyZW50bHlBY3RpdmUgPCB0aGlzLnRvYXN0ckNvbmZpZy5tYXhPcGVuZWQgJiZcbiAgICAgIHRoaXMudG9hc3RzW3RoaXMuY3VycmVudGx5QWN0aXZlXVxuICAgICkge1xuICAgICAgY29uc3QgcCA9IHRoaXMudG9hc3RzW3RoaXMuY3VycmVudGx5QWN0aXZlXS50b2FzdFJlZjtcbiAgICAgIGlmICghcC5pc0luYWN0aXZlKCkpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50bHlBY3RpdmUgPSB0aGlzLmN1cnJlbnRseUFjdGl2ZSArIDE7XG4gICAgICAgIHAuYWN0aXZhdGUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogRmluZHMgYSBkdXBsaWNhdGUgdG9hc3QgaWYgb25lIGV4aXN0c1xuICAgKi9cbiAgcHJpdmF0ZSBmaW5kRHVwbGljYXRlKG1lc3NhZ2U6IHN0cmluZywgcmVzZXRPbkR1cGxpY2F0ZTogYm9vbGVhbikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50b2FzdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHRvYXN0ID0gdGhpcy50b2FzdHNbaV07XG4gICAgICBpZiAodG9hc3QubWVzc2FnZSA9PT0gbWVzc2FnZSkge1xuICAgICAgICBpZiAocmVzZXRPbkR1cGxpY2F0ZSAmJiB0b2FzdC50b2FzdFJlZi5jb21wb25lbnRJbnN0YW5jZS5yZXNldFRpbWVvdXQpIHtcbiAgICAgICAgICB0b2FzdC50b2FzdFJlZi5yZXNldFRpbWVvdXQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9hc3Q7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqIGNyZWF0ZSBhIGNsb25lIG9mIGdsb2JhbCBjb25maWcgYW5kIGFwcGx5IGluZGl2aWR1YWwgc2V0dGluZ3MgKi9cbiAgcHJpdmF0ZSBhcHBseUNvbmZpZyhvdmVycmlkZTogUGFydGlhbDxJbmRpdmlkdWFsQ29uZmlnPiA9IHt9KTogR2xvYmFsQ29uZmlnIHtcbiAgICByZXR1cm4geyAuLi50aGlzLnRvYXN0ckNvbmZpZywgLi4ub3ZlcnJpZGUgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRvYXN0IG9iamVjdCBieSBpZFxuICAgKi9cbiAgcHJpdmF0ZSBfZmluZFRvYXN0KFxuICAgIHRvYXN0SWQ6IG51bWJlclxuICApOiB7IGluZGV4OiBudW1iZXI7IGFjdGl2ZVRvYXN0OiBBY3RpdmVUb2FzdDxhbnk+IH0gfCBudWxsIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudG9hc3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy50b2FzdHNbaV0udG9hc3RJZCA9PT0gdG9hc3RJZCkge1xuICAgICAgICByZXR1cm4geyBpbmRleDogaSwgYWN0aXZlVG9hc3Q6IHRoaXMudG9hc3RzW2ldIH07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgdGhlIG5lZWQgdG8gcnVuIGluc2lkZSBhbmd1bGFyJ3Mgem9uZSB0aGVuIGJ1aWxkcyB0aGUgdG9hc3RcbiAgICovXG4gIHByaXZhdGUgX3ByZUJ1aWxkTm90aWZpY2F0aW9uKFxuICAgIHRvYXN0VHlwZTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICB0aXRsZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIGNvbmZpZzogR2xvYmFsQ29uZmlnXG4gICk6IEFjdGl2ZVRvYXN0PGFueT4gfCBudWxsIHtcbiAgICBpZiAoY29uZmlnLm9uQWN0aXZhdGVUaWNrKSB7XG4gICAgICByZXR1cm4gdGhpcy5uZ1pvbmUucnVuKCgpID0+XG4gICAgICAgIHRoaXMuX2J1aWxkTm90aWZpY2F0aW9uKHRvYXN0VHlwZSwgbWVzc2FnZSwgdGl0bGUsIGNvbmZpZylcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9idWlsZE5vdGlmaWNhdGlvbih0b2FzdFR5cGUsIG1lc3NhZ2UsIHRpdGxlLCBjb25maWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW5kIGF0dGFjaGVzIHRvYXN0IGRhdGEgdG8gY29tcG9uZW50XG4gICAqIHJldHVybnMgdGhlIGFjdGl2ZSB0b2FzdCwgb3IgaW4gY2FzZSBwcmV2ZW50RHVwbGljYXRlcyBpcyBlbmFibGVkIHRoZSBvcmlnaW5hbC9ub24tZHVwbGljYXRlIGFjdGl2ZSB0b2FzdC5cbiAgICovXG4gIHByaXZhdGUgX2J1aWxkTm90aWZpY2F0aW9uKFxuICAgIHRvYXN0VHlwZTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICB0aXRsZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIGNvbmZpZzogR2xvYmFsQ29uZmlnXG4gICk6IEFjdGl2ZVRvYXN0PGFueT4gfCBudWxsIHtcbiAgICBpZiAoIWNvbmZpZy50b2FzdENvbXBvbmVudCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd0b2FzdENvbXBvbmVudCByZXF1aXJlZCcpO1xuICAgIH1cbiAgICAvLyBtYXggb3BlbmVkIGFuZCBhdXRvIGRpc21pc3MgPSB0cnVlXG4gICAgaWYgKFxuICAgICAgbWVzc2FnZSAmJlxuICAgICAgdGhpcy50b2FzdHJDb25maWcucHJldmVudER1cGxpY2F0ZXNcbiAgICApIHtcbiAgICAgIGNvbnN0IGR1cGxpY2F0ZSA9IHRoaXMuZmluZER1cGxpY2F0ZShtZXNzYWdlLCB0aGlzLnRvYXN0ckNvbmZpZy5yZXNldFRpbWVvdXRPbkR1cGxpY2F0ZSk7XG4gICAgICBpZiAoZHVwbGljYXRlICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBkdXBsaWNhdGU7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucHJldmlvdXNUb2FzdE1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIGxldCBrZWVwSW5hY3RpdmUgPSBmYWxzZTtcbiAgICBpZiAoXG4gICAgICB0aGlzLnRvYXN0ckNvbmZpZy5tYXhPcGVuZWQgJiZcbiAgICAgIHRoaXMuY3VycmVudGx5QWN0aXZlID49IHRoaXMudG9hc3RyQ29uZmlnLm1heE9wZW5lZFxuICAgICkge1xuICAgICAga2VlcEluYWN0aXZlID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLnRvYXN0ckNvbmZpZy5hdXRvRGlzbWlzcykge1xuICAgICAgICB0aGlzLmNsZWFyKHRoaXMudG9hc3RzWzBdLnRvYXN0SWQpO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBvdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZShcbiAgICAgIGNvbmZpZy5wb3NpdGlvbkNsYXNzLFxuICAgICAgdGhpcy5vdmVybGF5Q29udGFpbmVyXG4gICAgKTtcbiAgICB0aGlzLmluZGV4ID0gdGhpcy5pbmRleCArIDE7XG4gICAgbGV0IHNhbml0aXplZE1lc3NhZ2U6IHN0cmluZyB8IFNhZmVIdG1sIHwgdW5kZWZpbmVkIHwgbnVsbCA9IG1lc3NhZ2U7XG4gICAgaWYgKG1lc3NhZ2UgJiYgY29uZmlnLmVuYWJsZUh0bWwpIHtcbiAgICAgIHNhbml0aXplZE1lc3NhZ2UgPSB0aGlzLnNhbml0aXplci5zYW5pdGl6ZShTZWN1cml0eUNvbnRleHQuSFRNTCwgbWVzc2FnZSk7XG4gICAgfVxuICAgIGNvbnN0IHRvYXN0UmVmID0gbmV3IFRvYXN0UmVmKG92ZXJsYXlSZWYpO1xuICAgIGNvbnN0IHRvYXN0UGFja2FnZSA9IG5ldyBUb2FzdFBhY2thZ2UoXG4gICAgICB0aGlzLmluZGV4LFxuICAgICAgY29uZmlnLFxuICAgICAgc2FuaXRpemVkTWVzc2FnZSxcbiAgICAgIHRpdGxlLFxuICAgICAgdG9hc3RUeXBlLFxuICAgICAgdG9hc3RSZWZcbiAgICApO1xuICAgIGNvbnN0IHRvYXN0SW5qZWN0b3IgPSBuZXcgVG9hc3RJbmplY3Rvcih0b2FzdFBhY2thZ2UsIHRoaXMuX2luamVjdG9yKTtcbiAgICBjb25zdCBjb21wb25lbnQgPSBuZXcgQ29tcG9uZW50UG9ydGFsKGNvbmZpZy50b2FzdENvbXBvbmVudCwgdG9hc3RJbmplY3Rvcik7XG4gICAgY29uc3QgcG9ydGFsID0gb3ZlcmxheVJlZi5hdHRhY2goY29tcG9uZW50LCB0aGlzLnRvYXN0ckNvbmZpZy5uZXdlc3RPblRvcCk7XG4gICAgdG9hc3RSZWYuY29tcG9uZW50SW5zdGFuY2UgPSAoPGFueT5wb3J0YWwpLl9jb21wb25lbnQ7XG4gICAgY29uc3QgaW5zOiBBY3RpdmVUb2FzdDxhbnk+ID0ge1xuICAgICAgdG9hc3RJZDogdGhpcy5pbmRleCxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UgfHwgJycsXG4gICAgICB0b2FzdFJlZixcbiAgICAgIG9uU2hvd246IHRvYXN0UmVmLmFmdGVyQWN0aXZhdGUoKSxcbiAgICAgIG9uSGlkZGVuOiB0b2FzdFJlZi5hZnRlckNsb3NlZCgpLFxuICAgICAgb25UYXA6IHRvYXN0UGFja2FnZS5vblRhcCgpLFxuICAgICAgb25BY3Rpb246IHRvYXN0UGFja2FnZS5vbkFjdGlvbigpLFxuICAgICAgcG9ydGFsXG4gICAgfTtcblxuICAgIGlmICgha2VlcEluYWN0aXZlKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaW5zLnRvYXN0UmVmLmFjdGl2YXRlKCk7XG4gICAgICAgIHRoaXMuY3VycmVudGx5QWN0aXZlID0gdGhpcy5jdXJyZW50bHlBY3RpdmUgKyAxO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy50b2FzdHMucHVzaChpbnMpO1xuICAgIHJldHVybiBpbnM7XG4gIH1cbn1cbiJdfQ==
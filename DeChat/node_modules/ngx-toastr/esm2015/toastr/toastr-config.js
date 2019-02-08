/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * Configuration for an individual toast.
 * @record
 */
export function IndividualConfig() { }
if (false) {
    /**
     * disable both timeOut and extendedTimeOut
     * default: false
     * @type {?}
     */
    IndividualConfig.prototype.disableTimeOut;
    /**
     * toast time to live in milliseconds
     * default: 5000
     * @type {?}
     */
    IndividualConfig.prototype.timeOut;
    /**
     * toast show close button
     * default: false
     * @type {?}
     */
    IndividualConfig.prototype.closeButton;
    /**
     * time to close after a user hovers over toast
     * default: 1000
     * @type {?}
     */
    IndividualConfig.prototype.extendedTimeOut;
    /**
     * show toast progress bar
     * default: false
     * @type {?}
     */
    IndividualConfig.prototype.progressBar;
    /**
     * changes toast progress bar animation
     * default: decreasing
     * @type {?}
     */
    IndividualConfig.prototype.progressAnimation;
    /**
     * render html in toast message (possibly unsafe)
     * default: false
     * @type {?}
     */
    IndividualConfig.prototype.enableHtml;
    /**
     * css class on toast component
     * default: toast
     * @type {?}
     */
    IndividualConfig.prototype.toastClass;
    /**
     * css class on toast container
     * default: toast-top-right
     * @type {?}
     */
    IndividualConfig.prototype.positionClass;
    /**
     * css class on toast title
     * default: toast-title
     * @type {?}
     */
    IndividualConfig.prototype.titleClass;
    /**
     * css class on toast message
     * default: toast-message
     * @type {?}
     */
    IndividualConfig.prototype.messageClass;
    /**
     * animation easing on toast
     * default: ease-in
     * @type {?}
     */
    IndividualConfig.prototype.easing;
    /**
     * animation ease time on toast
     * default: 300
     * @type {?}
     */
    IndividualConfig.prototype.easeTime;
    /**
     * clicking on toast dismisses it
     * default: true
     * @type {?}
     */
    IndividualConfig.prototype.tapToDismiss;
    /**
     * Angular toast component to be shown
     * default: Toast
     * @type {?|undefined}
     */
    IndividualConfig.prototype.toastComponent;
    /**
     * Helps show toast from a websocket or from event outside Angular
     * default: false
     * @type {?}
     */
    IndividualConfig.prototype.onActivateTick;
}
/**
 * @record
 */
export function ToastrIconClasses() { }
if (false) {
    /** @type {?} */
    ToastrIconClasses.prototype.error;
    /** @type {?} */
    ToastrIconClasses.prototype.info;
    /** @type {?} */
    ToastrIconClasses.prototype.success;
    /** @type {?} */
    ToastrIconClasses.prototype.warning;
}
/**
 * Global Toast configuration
 * Includes all IndividualConfig
 * @record
 */
export function GlobalConfig() { }
if (false) {
    /**
     * max toasts opened. Toasts will be queued
     * Zero is unlimited
     * default: 0
     * @type {?}
     */
    GlobalConfig.prototype.maxOpened;
    /**
     * dismiss current toast when max is reached
     * default: false
     * @type {?}
     */
    GlobalConfig.prototype.autoDismiss;
    /** @type {?} */
    GlobalConfig.prototype.iconClasses;
    /**
     * New toast placement
     * default: true
     * @type {?}
     */
    GlobalConfig.prototype.newestOnTop;
    /**
     * block duplicate messages
     * default: false
     * @type {?}
     */
    GlobalConfig.prototype.preventDuplicates;
    /**
     * Reset toast timeout when there's a duplicate (preventDuplicates needs to be set to true)
     * default: false
     * @type {?}
     */
    GlobalConfig.prototype.resetTimeoutOnDuplicate;
}
/**
 * Everything a toast needs to launch
 */
export class ToastPackage {
    /**
     * @param {?} toastId
     * @param {?} config
     * @param {?} message
     * @param {?} title
     * @param {?} toastType
     * @param {?} toastRef
     */
    constructor(toastId, config, message, title, toastType, toastRef) {
        this.toastId = toastId;
        this.config = config;
        this.message = message;
        this.title = title;
        this.toastType = toastType;
        this.toastRef = toastRef;
        this._onTap = new Subject();
        this._onAction = new Subject();
        this.toastRef.afterClosed().subscribe(() => {
            this._onAction.complete();
            this._onTap.complete();
        });
    }
    /**
     * Fired on click
     * @return {?}
     */
    triggerTap() {
        this._onTap.next();
        if (this.config.tapToDismiss) {
            this._onTap.complete();
        }
    }
    /**
     * @return {?}
     */
    onTap() {
        return this._onTap.asObservable();
    }
    /**
     * available for use in custom toast
     * @param {?=} action
     * @return {?}
     */
    triggerAction(action) {
        this._onAction.next(action);
    }
    /**
     * @return {?}
     */
    onAction() {
        return this._onAction.asObservable();
    }
}
if (false) {
    /** @type {?} */
    ToastPackage.prototype._onTap;
    /** @type {?} */
    ToastPackage.prototype._onAction;
    /** @type {?} */
    ToastPackage.prototype.toastId;
    /** @type {?} */
    ToastPackage.prototype.config;
    /** @type {?} */
    ToastPackage.prototype.message;
    /** @type {?} */
    ToastPackage.prototype.title;
    /** @type {?} */
    ToastPackage.prototype.toastType;
    /** @type {?} */
    ToastPackage.prototype.toastRef;
}
/**
 * @deprecated use GlobalConfig
 * @record
 */
export function GlobalToastrConfig() { }
/**
 * @deprecated use IndividualConfig
 * @record
 */
export function IndividualToastrConfig() { }
/**
 * @deprecated use IndividualConfig
 * @record
 */
export function ToastrConfig() { }
/** @type {?} */
export const DefaultNoComponentGlobalConfig = {
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
/**
 * @record
 */
export function ToastToken() { }
if (false) {
    /** @type {?} */
    ToastToken.prototype.default;
    /** @type {?} */
    ToastToken.prototype.config;
}
/** @type {?} */
export const TOAST_CONFIG = new InjectionToken('ToastConfig');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3RyLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC10b2FzdHIvIiwic291cmNlcyI6WyJ0b2FzdHIvdG9hc3RyLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUcvQyxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7OztBQVUzQyxzQ0FtRkM7Ozs7Ozs7SUE5RUMsMENBQXdCOzs7Ozs7SUFLeEIsbUNBQWdCOzs7Ozs7SUFLaEIsdUNBQXFCOzs7Ozs7SUFLckIsMkNBQXdCOzs7Ozs7SUFLeEIsdUNBQXFCOzs7Ozs7SUFNckIsNkNBQXlDOzs7Ozs7SUFNekMsc0NBQW9COzs7Ozs7SUFLcEIsc0NBQW1COzs7Ozs7SUFLbkIseUNBQXNCOzs7Ozs7SUFLdEIsc0NBQW1COzs7Ozs7SUFLbkIsd0NBQXFCOzs7Ozs7SUFLckIsa0NBQWU7Ozs7OztJQUtmLG9DQUEwQjs7Ozs7O0lBSzFCLHdDQUFzQjs7Ozs7O0lBS3RCLDBDQUFvQzs7Ozs7O0lBS3BDLDBDQUF3Qjs7Ozs7QUFHMUIsdUNBS0M7OztJQUpDLGtDQUFjOztJQUNkLGlDQUFhOztJQUNiLG9DQUFnQjs7SUFDaEIsb0NBQWdCOzs7Ozs7O0FBT2xCLGtDQTZCQzs7Ozs7Ozs7SUF2QkMsaUNBQWtCOzs7Ozs7SUFLbEIsbUNBQXFCOztJQUNyQixtQ0FBd0M7Ozs7OztJQUt4QyxtQ0FBcUI7Ozs7OztJQUtyQix5Q0FBMkI7Ozs7OztJQU0zQiwrQ0FBaUM7Ozs7O0FBTW5DLE1BQU0sT0FBTyxZQUFZOzs7Ozs7Ozs7SUFJdkIsWUFDUyxPQUFlLEVBQ2YsTUFBd0IsRUFDeEIsT0FBNkMsRUFDN0MsS0FBeUIsRUFDekIsU0FBaUIsRUFDakIsUUFBdUI7UUFMdkIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLFlBQU8sR0FBUCxPQUFPLENBQXNDO1FBQzdDLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBQ3pCLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFDakIsYUFBUSxHQUFSLFFBQVEsQ0FBZTtRQVR4QixXQUFNLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUM1QixjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQVVyQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFHRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDeEI7SUFDSCxDQUFDOzs7O0lBRUQsS0FBSztRQUNILE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNwQyxDQUFDOzs7Ozs7SUFHRCxhQUFhLENBQUMsTUFBWTtRQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0NBQ0Y7OztJQXJDQyw4QkFBb0M7O0lBQ3BDLGlDQUF1Qzs7SUFHckMsK0JBQXNCOztJQUN0Qiw4QkFBK0I7O0lBQy9CLCtCQUFvRDs7SUFDcEQsNkJBQWdDOztJQUNoQyxpQ0FBd0I7O0lBQ3hCLGdDQUE4Qjs7Ozs7O0FBZ0NsQyx3Q0FBMkQ7Ozs7O0FBRTNELDRDQUFtRTs7Ozs7QUFFbkUsa0NBQXlEOztBQUV6RCxNQUFNLE9BQU8sOEJBQThCLEdBQWlCO0lBQzFELFNBQVMsRUFBRSxDQUFDO0lBQ1osV0FBVyxFQUFFLEtBQUs7SUFDbEIsV0FBVyxFQUFFLElBQUk7SUFDakIsaUJBQWlCLEVBQUUsS0FBSztJQUN4Qix1QkFBdUIsRUFBRSxLQUFLO0lBQzlCLFdBQVcsRUFBRTtRQUNYLEtBQUssRUFBRSxhQUFhO1FBQ3BCLElBQUksRUFBRSxZQUFZO1FBQ2xCLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLE9BQU8sRUFBRSxlQUFlO0tBQ3pCOztJQUdELFdBQVcsRUFBRSxLQUFLO0lBQ2xCLGNBQWMsRUFBRSxLQUFLO0lBQ3JCLE9BQU8sRUFBRSxJQUFJO0lBQ2IsZUFBZSxFQUFFLElBQUk7SUFDckIsVUFBVSxFQUFFLEtBQUs7SUFDakIsV0FBVyxFQUFFLEtBQUs7SUFDbEIsVUFBVSxFQUFFLE9BQU87SUFDbkIsYUFBYSxFQUFFLGlCQUFpQjtJQUNoQyxVQUFVLEVBQUUsYUFBYTtJQUN6QixZQUFZLEVBQUUsZUFBZTtJQUM3QixNQUFNLEVBQUUsU0FBUztJQUNqQixRQUFRLEVBQUUsR0FBRztJQUNiLFlBQVksRUFBRSxJQUFJO0lBQ2xCLGNBQWMsRUFBRSxLQUFLO0lBQ3JCLGlCQUFpQixFQUFFLFlBQVk7Q0FDaEM7Ozs7QUFFRCxnQ0FHQzs7O0lBRkMsNkJBQXNCOztJQUN0Qiw0QkFBOEI7OztBQUdoQyxNQUFNLE9BQU8sWUFBWSxHQUFHLElBQUksY0FBYyxDQUFhLGFBQWEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICcuLi9wb3J0YWwvcG9ydGFsJztcbmltcG9ydCB7IFRvYXN0UmVmIH0gZnJvbSAnLi90b2FzdC1pbmplY3Rvcic7XG5cbmV4cG9ydCB0eXBlIFByb2dyZXNzQW5pbWF0aW9uVHlwZSA9ICdpbmNyZWFzaW5nJyB8ICdkZWNyZWFzaW5nJztcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBhbiBpbmRpdmlkdWFsIHRvYXN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEluZGl2aWR1YWxDb25maWcge1xuICAvKipcbiAgICogZGlzYWJsZSBib3RoIHRpbWVPdXQgYW5kIGV4dGVuZGVkVGltZU91dFxuICAgKiBkZWZhdWx0OiBmYWxzZVxuICAgKi9cbiAgZGlzYWJsZVRpbWVPdXQ6IGJvb2xlYW47XG4gIC8qKlxuICAgKiB0b2FzdCB0aW1lIHRvIGxpdmUgaW4gbWlsbGlzZWNvbmRzXG4gICAqIGRlZmF1bHQ6IDUwMDBcbiAgICovXG4gIHRpbWVPdXQ6IG51bWJlcjtcbiAgLyoqXG4gICAqIHRvYXN0IHNob3cgY2xvc2UgYnV0dG9uXG4gICAqIGRlZmF1bHQ6IGZhbHNlXG4gICAqL1xuICBjbG9zZUJ1dHRvbjogYm9vbGVhbjtcbiAgLyoqXG4gICAqIHRpbWUgdG8gY2xvc2UgYWZ0ZXIgYSB1c2VyIGhvdmVycyBvdmVyIHRvYXN0XG4gICAqIGRlZmF1bHQ6IDEwMDBcbiAgICovXG4gIGV4dGVuZGVkVGltZU91dDogbnVtYmVyO1xuICAvKipcbiAgICogc2hvdyB0b2FzdCBwcm9ncmVzcyBiYXJcbiAgICogZGVmYXVsdDogZmFsc2VcbiAgICovXG4gIHByb2dyZXNzQmFyOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBjaGFuZ2VzIHRvYXN0IHByb2dyZXNzIGJhciBhbmltYXRpb25cbiAgICogZGVmYXVsdDogZGVjcmVhc2luZ1xuICAgKi9cbiAgcHJvZ3Jlc3NBbmltYXRpb246IFByb2dyZXNzQW5pbWF0aW9uVHlwZTtcblxuICAvKipcbiAgICogcmVuZGVyIGh0bWwgaW4gdG9hc3QgbWVzc2FnZSAocG9zc2libHkgdW5zYWZlKVxuICAgKiBkZWZhdWx0OiBmYWxzZVxuICAgKi9cbiAgZW5hYmxlSHRtbDogYm9vbGVhbjtcbiAgLyoqXG4gICAqIGNzcyBjbGFzcyBvbiB0b2FzdCBjb21wb25lbnRcbiAgICogZGVmYXVsdDogdG9hc3RcbiAgICovXG4gIHRvYXN0Q2xhc3M6IHN0cmluZztcbiAgLyoqXG4gICAqIGNzcyBjbGFzcyBvbiB0b2FzdCBjb250YWluZXJcbiAgICogZGVmYXVsdDogdG9hc3QtdG9wLXJpZ2h0XG4gICAqL1xuICBwb3NpdGlvbkNsYXNzOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBjc3MgY2xhc3Mgb24gdG9hc3QgdGl0bGVcbiAgICogZGVmYXVsdDogdG9hc3QtdGl0bGVcbiAgICovXG4gIHRpdGxlQ2xhc3M6IHN0cmluZztcbiAgLyoqXG4gICAqIGNzcyBjbGFzcyBvbiB0b2FzdCBtZXNzYWdlXG4gICAqIGRlZmF1bHQ6IHRvYXN0LW1lc3NhZ2VcbiAgICovXG4gIG1lc3NhZ2VDbGFzczogc3RyaW5nO1xuICAvKipcbiAgICogYW5pbWF0aW9uIGVhc2luZyBvbiB0b2FzdFxuICAgKiBkZWZhdWx0OiBlYXNlLWluXG4gICAqL1xuICBlYXNpbmc6IHN0cmluZztcbiAgLyoqXG4gICAqIGFuaW1hdGlvbiBlYXNlIHRpbWUgb24gdG9hc3RcbiAgICogZGVmYXVsdDogMzAwXG4gICAqL1xuICBlYXNlVGltZTogc3RyaW5nIHwgbnVtYmVyO1xuICAvKipcbiAgICogY2xpY2tpbmcgb24gdG9hc3QgZGlzbWlzc2VzIGl0XG4gICAqIGRlZmF1bHQ6IHRydWVcbiAgICovXG4gIHRhcFRvRGlzbWlzczogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEFuZ3VsYXIgdG9hc3QgY29tcG9uZW50IHRvIGJlIHNob3duXG4gICAqIGRlZmF1bHQ6IFRvYXN0XG4gICAqL1xuICB0b2FzdENvbXBvbmVudD86IENvbXBvbmVudFR5cGU8YW55PjtcbiAgLyoqXG4gICAqIEhlbHBzIHNob3cgdG9hc3QgZnJvbSBhIHdlYnNvY2tldCBvciBmcm9tIGV2ZW50IG91dHNpZGUgQW5ndWxhclxuICAgKiBkZWZhdWx0OiBmYWxzZVxuICAgKi9cbiAgb25BY3RpdmF0ZVRpY2s6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVG9hc3RySWNvbkNsYXNzZXMge1xuICBlcnJvcjogc3RyaW5nO1xuICBpbmZvOiBzdHJpbmc7XG4gIHN1Y2Nlc3M6IHN0cmluZztcbiAgd2FybmluZzogc3RyaW5nO1xufVxuXG4vKipcbiAqIEdsb2JhbCBUb2FzdCBjb25maWd1cmF0aW9uXG4gKiBJbmNsdWRlcyBhbGwgSW5kaXZpZHVhbENvbmZpZ1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEdsb2JhbENvbmZpZyBleHRlbmRzIEluZGl2aWR1YWxDb25maWcge1xuICAvKipcbiAgICogbWF4IHRvYXN0cyBvcGVuZWQuIFRvYXN0cyB3aWxsIGJlIHF1ZXVlZFxuICAgKiBaZXJvIGlzIHVubGltaXRlZFxuICAgKiBkZWZhdWx0OiAwXG4gICAqL1xuICBtYXhPcGVuZWQ6IG51bWJlcjtcbiAgLyoqXG4gICAqIGRpc21pc3MgY3VycmVudCB0b2FzdCB3aGVuIG1heCBpcyByZWFjaGVkXG4gICAqIGRlZmF1bHQ6IGZhbHNlXG4gICAqL1xuICBhdXRvRGlzbWlzczogYm9vbGVhbjtcbiAgaWNvbkNsYXNzZXM6IFBhcnRpYWw8VG9hc3RySWNvbkNsYXNzZXM+O1xuICAvKipcbiAgICogTmV3IHRvYXN0IHBsYWNlbWVudFxuICAgKiBkZWZhdWx0OiB0cnVlXG4gICAqL1xuICBuZXdlc3RPblRvcDogYm9vbGVhbjtcbiAgLyoqXG4gICAqIGJsb2NrIGR1cGxpY2F0ZSBtZXNzYWdlc1xuICAgKiBkZWZhdWx0OiBmYWxzZVxuICAgKi9cbiAgcHJldmVudER1cGxpY2F0ZXM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRvYXN0IHRpbWVvdXQgd2hlbiB0aGVyZSdzIGEgZHVwbGljYXRlIChwcmV2ZW50RHVwbGljYXRlcyBuZWVkcyB0byBiZSBzZXQgdG8gdHJ1ZSlcbiAgICogZGVmYXVsdDogZmFsc2VcbiAgICovXG4gIHJlc2V0VGltZW91dE9uRHVwbGljYXRlOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEV2ZXJ5dGhpbmcgYSB0b2FzdCBuZWVkcyB0byBsYXVuY2hcbiAqL1xuZXhwb3J0IGNsYXNzIFRvYXN0UGFja2FnZSB7XG4gIHByaXZhdGUgX29uVGFwID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBwcml2YXRlIF9vbkFjdGlvbiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgdG9hc3RJZDogbnVtYmVyLFxuICAgIHB1YmxpYyBjb25maWc6IEluZGl2aWR1YWxDb25maWcsXG4gICAgcHVibGljIG1lc3NhZ2U6IHN0cmluZyB8IFNhZmVIdG1sIHwgbnVsbCB8IHVuZGVmaW5lZCxcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICBwdWJsaWMgdG9hc3RUeXBlOiBzdHJpbmcsXG4gICAgcHVibGljIHRvYXN0UmVmOiBUb2FzdFJlZjxhbnk+LFxuICApIHtcbiAgICB0aGlzLnRvYXN0UmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuX29uQWN0aW9uLmNvbXBsZXRlKCk7XG4gICAgICB0aGlzLl9vblRhcC5jb21wbGV0ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEZpcmVkIG9uIGNsaWNrICovXG4gIHRyaWdnZXJUYXAoKSB7XG4gICAgdGhpcy5fb25UYXAubmV4dCgpO1xuICAgIGlmICh0aGlzLmNvbmZpZy50YXBUb0Rpc21pc3MpIHtcbiAgICAgIHRoaXMuX29uVGFwLmNvbXBsZXRlKCk7XG4gICAgfVxuICB9XG5cbiAgb25UYXAoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fb25UYXAuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKiogYXZhaWxhYmxlIGZvciB1c2UgaW4gY3VzdG9tIHRvYXN0ICovXG4gIHRyaWdnZXJBY3Rpb24oYWN0aW9uPzogYW55KSB7XG4gICAgdGhpcy5fb25BY3Rpb24ubmV4dChhY3Rpb24pO1xuICB9XG5cbiAgb25BY3Rpb24oKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fb25BY3Rpb24uYXNPYnNlcnZhYmxlKCk7XG4gIH1cbn1cblxuLyogdHNsaW50OmRpc2FibGU6bm8tZW1wdHktaW50ZXJmYWNlICovXG4vKiogQGRlcHJlY2F0ZWQgdXNlIEdsb2JhbENvbmZpZyAqL1xuZXhwb3J0IGludGVyZmFjZSBHbG9iYWxUb2FzdHJDb25maWcgZXh0ZW5kcyBHbG9iYWxDb25maWcge31cbi8qKiBAZGVwcmVjYXRlZCB1c2UgSW5kaXZpZHVhbENvbmZpZyAqL1xuZXhwb3J0IGludGVyZmFjZSBJbmRpdmlkdWFsVG9hc3RyQ29uZmlnIGV4dGVuZHMgSW5kaXZpZHVhbENvbmZpZyB7fVxuLyoqIEBkZXByZWNhdGVkIHVzZSBJbmRpdmlkdWFsQ29uZmlnICovXG5leHBvcnQgaW50ZXJmYWNlIFRvYXN0ckNvbmZpZyBleHRlbmRzIEluZGl2aWR1YWxDb25maWcge31cblxuZXhwb3J0IGNvbnN0IERlZmF1bHROb0NvbXBvbmVudEdsb2JhbENvbmZpZzogR2xvYmFsQ29uZmlnID0ge1xuICBtYXhPcGVuZWQ6IDAsXG4gIGF1dG9EaXNtaXNzOiBmYWxzZSxcbiAgbmV3ZXN0T25Ub3A6IHRydWUsXG4gIHByZXZlbnREdXBsaWNhdGVzOiBmYWxzZSxcbiAgcmVzZXRUaW1lb3V0T25EdXBsaWNhdGU6IGZhbHNlLFxuICBpY29uQ2xhc3Nlczoge1xuICAgIGVycm9yOiAndG9hc3QtZXJyb3InLFxuICAgIGluZm86ICd0b2FzdC1pbmZvJyxcbiAgICBzdWNjZXNzOiAndG9hc3Qtc3VjY2VzcycsXG4gICAgd2FybmluZzogJ3RvYXN0LXdhcm5pbmcnLFxuICB9LFxuXG4gIC8vIEluZGl2aWR1YWxcbiAgY2xvc2VCdXR0b246IGZhbHNlLFxuICBkaXNhYmxlVGltZU91dDogZmFsc2UsXG4gIHRpbWVPdXQ6IDUwMDAsXG4gIGV4dGVuZGVkVGltZU91dDogMTAwMCxcbiAgZW5hYmxlSHRtbDogZmFsc2UsXG4gIHByb2dyZXNzQmFyOiBmYWxzZSxcbiAgdG9hc3RDbGFzczogJ3RvYXN0JyxcbiAgcG9zaXRpb25DbGFzczogJ3RvYXN0LXRvcC1yaWdodCcsXG4gIHRpdGxlQ2xhc3M6ICd0b2FzdC10aXRsZScsXG4gIG1lc3NhZ2VDbGFzczogJ3RvYXN0LW1lc3NhZ2UnLFxuICBlYXNpbmc6ICdlYXNlLWluJyxcbiAgZWFzZVRpbWU6IDMwMCxcbiAgdGFwVG9EaXNtaXNzOiB0cnVlLFxuICBvbkFjdGl2YXRlVGljazogZmFsc2UsXG4gIHByb2dyZXNzQW5pbWF0aW9uOiAnZGVjcmVhc2luZycsXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIFRvYXN0VG9rZW4ge1xuICBkZWZhdWx0OiBHbG9iYWxDb25maWc7XG4gIGNvbmZpZzogUGFydGlhbDxHbG9iYWxDb25maWc+O1xufVxuXG5leHBvcnQgY29uc3QgVE9BU1RfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPFRvYXN0VG9rZW4+KCdUb2FzdENvbmZpZycpO1xuIl19
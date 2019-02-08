/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
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
    /** @nocollapse */ OverlayContainer.ngInjectableDef = i0.defineInjectable({ factory: function OverlayContainer_Factory() { return new OverlayContainer(i0.inject(i1.DOCUMENT)); }, token: OverlayContainer, providedIn: "root" });
    return OverlayContainer;
}());
export { OverlayContainer };
if (false) {
    /** @type {?} */
    OverlayContainer.prototype._containerElement;
    /** @type {?} */
    OverlayContainer.prototype._document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1jb250YWluZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdG9hc3RyLyIsInNvdXJjZXMiOlsib3ZlcmxheS9vdmVybGF5LWNvbnRhaW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFHOUQ7SUFJRSwwQkFBd0MsU0FBYztRQUFkLGNBQVMsR0FBVCxTQUFTLENBQUs7SUFBRyxDQUFDOzs7O0lBRTFELHNDQUFXOzs7SUFBWDtRQUNFLElBQUksSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUU7WUFDL0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDdkU7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7SUFDSCw4Q0FBbUI7Ozs7OztJQUFuQjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDTywyQ0FBZ0I7Ozs7O0lBQTFCOztZQUNRLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDckQsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFNBQVMsQ0FBQztJQUNyQyxDQUFDOztnQkFsQ0YsVUFBVSxTQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7OztnREFJbkIsTUFBTSxTQUFDLFFBQVE7OzsyQkFSOUI7Q0F1Q0MsQUFuQ0QsSUFtQ0M7U0FsQ1ksZ0JBQWdCOzs7SUFDM0IsNkNBQXlDOztJQUU3QixxQ0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKiogQ29udGFpbmVyIGluc2lkZSB3aGljaCBhbGwgdG9hc3RzIHdpbGwgcmVuZGVyLiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBPdmVybGF5Q29udGFpbmVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIF9jb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcm90ZWN0ZWQgX2RvY3VtZW50OiBhbnkpIHt9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX2NvbnRhaW5lckVsZW1lbnQgJiYgdGhpcy5fY29udGFpbmVyRWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICB0aGlzLl9jb250YWluZXJFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5fY29udGFpbmVyRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIG92ZXJsYXkgY29udGFpbmVyIGVsZW1lbnQuIEl0IHdpbGwgbGF6aWx5XG4gICAqIGNyZWF0ZSB0aGUgZWxlbWVudCB0aGUgZmlyc3QgdGltZSAgaXQgaXMgY2FsbGVkIHRvIGZhY2lsaXRhdGUgdXNpbmdcbiAgICogdGhlIGNvbnRhaW5lciBpbiBub24tYnJvd3NlciBlbnZpcm9ubWVudHMuXG4gICAqIEByZXR1cm5zIHRoZSBjb250YWluZXIgZWxlbWVudFxuICAgKi9cbiAgZ2V0Q29udGFpbmVyRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgaWYgKCF0aGlzLl9jb250YWluZXJFbGVtZW50KSB7XG4gICAgICB0aGlzLl9jcmVhdGVDb250YWluZXIoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lckVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIHRoZSBvdmVybGF5IGNvbnRhaW5lciBlbGVtZW50LCB3aGljaCBpcyBzaW1wbHkgYSBkaXZcbiAgICogd2l0aCB0aGUgJ2Nkay1vdmVybGF5LWNvbnRhaW5lcicgY2xhc3Mgb24gdGhlIGRvY3VtZW50IGJvZHkuXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NyZWF0ZUNvbnRhaW5lcigpOiB2b2lkIHtcbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnb3ZlcmxheS1jb250YWluZXInKTtcbiAgICB0aGlzLl9kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgdGhpcy5fY29udGFpbmVyRWxlbWVudCA9IGNvbnRhaW5lcjtcbiAgfVxufVxuIl19
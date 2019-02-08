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
export class OverlayContainer {
    /**
     * @param {?} _document
     */
    constructor(_document) {
        this._document = _document;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._containerElement && this._containerElement.parentNode) {
            this._containerElement.parentNode.removeChild(this._containerElement);
        }
    }
    /**
     * This method returns the overlay container element. It will lazily
     * create the element the first time  it is called to facilitate using
     * the container in non-browser environments.
     * @return {?} the container element
     */
    getContainerElement() {
        if (!this._containerElement) {
            this._createContainer();
        }
        return this._containerElement;
    }
    /**
     * Create the overlay container element, which is simply a div
     * with the 'cdk-overlay-container' class on the document body.
     * @return {?}
     */
    _createContainer() {
        /** @type {?} */
        const container = this._document.createElement('div');
        container.classList.add('overlay-container');
        this._document.body.appendChild(container);
        this._containerElement = container;
    }
}
OverlayContainer.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
OverlayContainer.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
/** @nocollapse */ OverlayContainer.ngInjectableDef = i0.defineInjectable({ factory: function OverlayContainer_Factory() { return new OverlayContainer(i0.inject(i1.DOCUMENT)); }, token: OverlayContainer, providedIn: "root" });
if (false) {
    /** @type {?} */
    OverlayContainer.prototype._containerElement;
    /** @type {?} */
    OverlayContainer.prototype._document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1jb250YWluZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdG9hc3RyLyIsInNvdXJjZXMiOlsib3ZlcmxheS9vdmVybGF5LWNvbnRhaW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFJOUQsTUFBTSxPQUFPLGdCQUFnQjs7OztJQUczQixZQUF3QyxTQUFjO1FBQWQsY0FBUyxHQUFULFNBQVMsQ0FBSztJQUFHLENBQUM7Ozs7SUFFMUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUU7WUFDL0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDdkU7SUFDSCxDQUFDOzs7Ozs7O0lBUUQsbUJBQW1CO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNoQyxDQUFDOzs7Ozs7SUFNUyxnQkFBZ0I7O2NBQ2xCLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDckQsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFNBQVMsQ0FBQztJQUNyQyxDQUFDOzs7WUFsQ0YsVUFBVSxTQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7Ozs0Q0FJbkIsTUFBTSxTQUFDLFFBQVE7Ozs7O0lBRjVCLDZDQUF5Qzs7SUFFN0IscUNBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqIENvbnRhaW5lciBpbnNpZGUgd2hpY2ggYWxsIHRvYXN0cyB3aWxsIHJlbmRlci4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgT3ZlcmxheUNvbnRhaW5lciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByb3RlY3RlZCBfY29udGFpbmVyRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJvdGVjdGVkIF9kb2N1bWVudDogYW55KSB7fVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl9jb250YWluZXJFbGVtZW50ICYmIHRoaXMuX2NvbnRhaW5lckVsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgICAgdGhpcy5fY29udGFpbmVyRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuX2NvbnRhaW5lckVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBvdmVybGF5IGNvbnRhaW5lciBlbGVtZW50LiBJdCB3aWxsIGxhemlseVxuICAgKiBjcmVhdGUgdGhlIGVsZW1lbnQgdGhlIGZpcnN0IHRpbWUgIGl0IGlzIGNhbGxlZCB0byBmYWNpbGl0YXRlIHVzaW5nXG4gICAqIHRoZSBjb250YWluZXIgaW4gbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRzLlxuICAgKiBAcmV0dXJucyB0aGUgY29udGFpbmVyIGVsZW1lbnRcbiAgICovXG4gIGdldENvbnRhaW5lckVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgIGlmICghdGhpcy5fY29udGFpbmVyRWxlbWVudCkge1xuICAgICAgdGhpcy5fY3JlYXRlQ29udGFpbmVyKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jb250YWluZXJFbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSB0aGUgb3ZlcmxheSBjb250YWluZXIgZWxlbWVudCwgd2hpY2ggaXMgc2ltcGx5IGEgZGl2XG4gICAqIHdpdGggdGhlICdjZGstb3ZlcmxheS1jb250YWluZXInIGNsYXNzIG9uIHRoZSBkb2N1bWVudCBib2R5LlxuICAgKi9cbiAgcHJvdGVjdGVkIF9jcmVhdGVDb250YWluZXIoKTogdm9pZCB7XG4gICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ292ZXJsYXktY29udGFpbmVyJyk7XG4gICAgdGhpcy5fZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgIHRoaXMuX2NvbnRhaW5lckVsZW1lbnQgPSBjb250YWluZXI7XG4gIH1cbn1cbiJdfQ==
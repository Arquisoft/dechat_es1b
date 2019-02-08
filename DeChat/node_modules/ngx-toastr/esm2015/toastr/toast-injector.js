/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { ToastPackage } from './toastr-config';
/**
 * Reference to a toast opened via the Toastr service.
 * @template T
 */
export class ToastRef {
    /**
     * @param {?} _overlayRef
     */
    constructor(_overlayRef) {
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
    manualClose() {
        this._manualClose.next();
        this._manualClose.complete();
    }
    /**
     * @return {?}
     */
    manualClosed() {
        return this._manualClose.asObservable();
    }
    /**
     * @return {?}
     */
    timeoutReset() {
        return this._resetTimeout.asObservable();
    }
    /**
     * Close the toast.
     * @return {?}
     */
    close() {
        this._overlayRef.detach();
        this._afterClosed.next();
        this._manualClose.next();
        this._afterClosed.complete();
        this._manualClose.complete();
        this._activate.complete();
        this._resetTimeout.complete();
    }
    /**
     * Gets an observable that is notified when the toast is finished closing.
     * @return {?}
     */
    afterClosed() {
        return this._afterClosed.asObservable();
    }
    /**
     * @return {?}
     */
    isInactive() {
        return this._activate.isStopped;
    }
    /**
     * @return {?}
     */
    activate() {
        this._activate.next();
        this._activate.complete();
    }
    /**
     * Gets an observable that is notified when the toast has started opening.
     * @return {?}
     */
    afterActivate() {
        return this._activate.asObservable();
    }
    /**
     * Reset the toast timouts
     * @return {?}
     */
    resetTimeout() {
        this._resetTimeout.next();
    }
}
if (false) {
    /**
     * The instance of component opened into the toast.
     * @type {?}
     */
    ToastRef.prototype.componentInstance;
    /**
     * Subject for notifying the user that the toast has finished closing.
     * @type {?}
     */
    ToastRef.prototype._afterClosed;
    /**
     * triggered when toast is activated
     * @type {?}
     */
    ToastRef.prototype._activate;
    /**
     * notifies the toast that it should close before the timeout
     * @type {?}
     */
    ToastRef.prototype._manualClose;
    /**
     * notifies the toast that it should reset the timeouts
     * @type {?}
     */
    ToastRef.prototype._resetTimeout;
    /** @type {?} */
    ToastRef.prototype._overlayRef;
}
/**
 * Custom injector type specifically for instantiating components with a toast.
 */
export class ToastInjector {
    /**
     * @param {?} _toastPackage
     * @param {?} _parentInjector
     */
    constructor(_toastPackage, _parentInjector) {
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
    get(token, notFoundValue, flags) {
        if (token === ToastPackage) {
            return this._toastPackage;
        }
        return this._parentInjector.get(token, notFoundValue, flags);
    }
}
if (false) {
    /** @type {?} */
    ToastInjector.prototype._toastPackage;
    /** @type {?} */
    ToastInjector.prototype._parentInjector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QtaW5qZWN0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdG9hc3RyLyIsInNvdXJjZXMiOlsidG9hc3RyL3RvYXN0LWluamVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7QUFLL0MsTUFBTSxPQUFPLFFBQVE7Ozs7SUFhbkIsWUFBb0IsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7Ozs7UUFSbkMsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDOzs7O1FBRWxDLGNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDOzs7O1FBRS9CLGlCQUFZLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQzs7OztRQUVsQyxrQkFBYSxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7SUFFRyxDQUFDOzs7O0lBRS9DLFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDL0IsQ0FBQzs7OztJQUVELFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUMsQ0FBQzs7OztJQUVELFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0MsQ0FBQzs7Ozs7SUFLRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNoQyxDQUFDOzs7OztJQUdELFdBQVc7UUFDVCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUMsQ0FBQzs7OztJQUVELFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO0lBQ2xDLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBR0QsYUFBYTtRQUNYLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN2QyxDQUFDOzs7OztJQUdELFlBQVk7UUFDVixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzVCLENBQUM7Q0FDRjs7Ozs7O0lBOURDLHFDQUFxQjs7Ozs7SUFHckIsZ0NBQTBDOzs7OztJQUUxQyw2QkFBdUM7Ozs7O0lBRXZDLGdDQUEwQzs7Ozs7SUFFMUMsaUNBQTJDOztJQUUvQiwrQkFBK0I7Ozs7O0FBc0Q3QyxNQUFNLE9BQU8sYUFBYTs7Ozs7SUFDeEIsWUFDVSxhQUEyQixFQUMzQixlQUF5QjtRQUR6QixrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUMzQixvQkFBZSxHQUFmLGVBQWUsQ0FBVTtJQUNoQyxDQUFDOzs7Ozs7OztJQUVKLEdBQUcsQ0FBSSxLQUFVLEVBQUUsYUFBaUIsRUFBRSxLQUFtQjtRQUN2RCxJQUFJLEtBQUssS0FBSyxZQUFZLEVBQUU7WUFDMUIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQzNCO1FBQ0QsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBSSxLQUFLLEVBQUUsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2xFLENBQUM7Q0FDRjs7O0lBVkcsc0NBQW1DOztJQUNuQyx3Q0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RvciwgSW5qZWN0RmxhZ3MgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE92ZXJsYXlSZWYgfSBmcm9tICcuLi9vdmVybGF5L292ZXJsYXktcmVmJztcbmltcG9ydCB7IFRvYXN0UGFja2FnZSB9IGZyb20gJy4vdG9hc3RyLWNvbmZpZyc7XG5cbi8qKlxuICogUmVmZXJlbmNlIHRvIGEgdG9hc3Qgb3BlbmVkIHZpYSB0aGUgVG9hc3RyIHNlcnZpY2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBUb2FzdFJlZjxUPiB7XG4gIC8qKiBUaGUgaW5zdGFuY2Ugb2YgY29tcG9uZW50IG9wZW5lZCBpbnRvIHRoZSB0b2FzdC4gKi9cbiAgY29tcG9uZW50SW5zdGFuY2U6IFQ7XG5cbiAgLyoqIFN1YmplY3QgZm9yIG5vdGlmeWluZyB0aGUgdXNlciB0aGF0IHRoZSB0b2FzdCBoYXMgZmluaXNoZWQgY2xvc2luZy4gKi9cbiAgcHJpdmF0ZSBfYWZ0ZXJDbG9zZWQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIC8qKiB0cmlnZ2VyZWQgd2hlbiB0b2FzdCBpcyBhY3RpdmF0ZWQgKi9cbiAgcHJpdmF0ZSBfYWN0aXZhdGUgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIC8qKiBub3RpZmllcyB0aGUgdG9hc3QgdGhhdCBpdCBzaG91bGQgY2xvc2UgYmVmb3JlIHRoZSB0aW1lb3V0ICovXG4gIHByaXZhdGUgX21hbnVhbENsb3NlID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAvKiogbm90aWZpZXMgdGhlIHRvYXN0IHRoYXQgaXQgc2hvdWxkIHJlc2V0IHRoZSB0aW1lb3V0cyAqL1xuICBwcml2YXRlIF9yZXNldFRpbWVvdXQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfb3ZlcmxheVJlZjogT3ZlcmxheVJlZikge31cblxuICBtYW51YWxDbG9zZSgpIHtcbiAgICB0aGlzLl9tYW51YWxDbG9zZS5uZXh0KCk7XG4gICAgdGhpcy5fbWFudWFsQ2xvc2UuY29tcGxldGUoKTtcbiAgfVxuXG4gIG1hbnVhbENsb3NlZCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9tYW51YWxDbG9zZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHRpbWVvdXRSZXNldCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9yZXNldFRpbWVvdXQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2UgdGhlIHRvYXN0LlxuICAgKi9cbiAgY2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fb3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICB0aGlzLl9hZnRlckNsb3NlZC5uZXh0KCk7XG4gICAgdGhpcy5fbWFudWFsQ2xvc2UubmV4dCgpO1xuICAgIHRoaXMuX2FmdGVyQ2xvc2VkLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fbWFudWFsQ2xvc2UuY29tcGxldGUoKTtcbiAgICB0aGlzLl9hY3RpdmF0ZS5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX3Jlc2V0VGltZW91dC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgLyoqIEdldHMgYW4gb2JzZXJ2YWJsZSB0aGF0IGlzIG5vdGlmaWVkIHdoZW4gdGhlIHRvYXN0IGlzIGZpbmlzaGVkIGNsb3NpbmcuICovXG4gIGFmdGVyQ2xvc2VkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX2FmdGVyQ2xvc2VkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgaXNJbmFjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZhdGUuaXNTdG9wcGVkO1xuICB9XG5cbiAgYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5fYWN0aXZhdGUubmV4dCgpO1xuICAgIHRoaXMuX2FjdGl2YXRlLmNvbXBsZXRlKCk7XG4gIH1cblxuICAvKiogR2V0cyBhbiBvYnNlcnZhYmxlIHRoYXQgaXMgbm90aWZpZWQgd2hlbiB0aGUgdG9hc3QgaGFzIHN0YXJ0ZWQgb3BlbmluZy4gKi9cbiAgYWZ0ZXJBY3RpdmF0ZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmF0ZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKiBSZXNldCB0aGUgdG9hc3QgdGltb3V0cyAqL1xuICByZXNldFRpbWVvdXQoKSB7XG4gICAgdGhpcy5fcmVzZXRUaW1lb3V0Lm5leHQoKTtcbiAgfVxufVxuXG4vKiogQ3VzdG9tIGluamVjdG9yIHR5cGUgc3BlY2lmaWNhbGx5IGZvciBpbnN0YW50aWF0aW5nIGNvbXBvbmVudHMgd2l0aCBhIHRvYXN0LiAqL1xuZXhwb3J0IGNsYXNzIFRvYXN0SW5qZWN0b3IgaW1wbGVtZW50cyBJbmplY3RvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3RvYXN0UGFja2FnZTogVG9hc3RQYWNrYWdlLFxuICAgIHByaXZhdGUgX3BhcmVudEluamVjdG9yOiBJbmplY3RvclxuICApIHt9XG5cbiAgZ2V0PFQ+KHRva2VuOiBhbnksIG5vdEZvdW5kVmFsdWU/OiBULCBmbGFncz86IEluamVjdEZsYWdzKTogVCB8IFRvYXN0UGFja2FnZSB7XG4gICAgaWYgKHRva2VuID09PSBUb2FzdFBhY2thZ2UpIHtcbiAgICAgIHJldHVybiB0aGlzLl90b2FzdFBhY2thZ2U7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9wYXJlbnRJbmplY3Rvci5nZXQ8VD4odG9rZW4sIG5vdEZvdW5kVmFsdWUsIGZsYWdzKTtcbiAgfVxufVxuIl19
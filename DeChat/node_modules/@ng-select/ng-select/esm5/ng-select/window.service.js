/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
var WindowService = /** @class */ (function () {
    function WindowService() {
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    WindowService.prototype.requestAnimationFrame = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        return window.requestAnimationFrame(fn);
    };
    /**
     * @param {?} handler
     * @param {?} timeout
     * @return {?}
     */
    WindowService.prototype.setTimeout = /**
     * @param {?} handler
     * @param {?} timeout
     * @return {?}
     */
    function (handler, timeout) {
        return window.setTimeout(handler, timeout);
    };
    WindowService.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ WindowService.ngInjectableDef = i0.defineInjectable({ factory: function WindowService_Factory() { return new WindowService(); }, token: WindowService, providedIn: "root" });
    return WindowService;
}());
export { WindowService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmctc2VsZWN0L25nLXNlbGVjdC8iLCJzb3VyY2VzIjpbIm5nLXNlbGVjdC93aW5kb3cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7O0lBSXZDLDZDQUFxQjs7OztJQUFyQixVQUFzQixFQUFFO1FBQ3BCLE9BQU8sTUFBTSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzNDOzs7Ozs7SUFFRCxrQ0FBVTs7Ozs7SUFBVixVQUFXLE9BQWlDLEVBQUUsT0FBZTtRQUN6RCxPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzlDOztnQkFSSixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7d0JBRmxDOztTQUdhLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgV2luZG93U2VydmljZSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZuKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZuKTtcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KGhhbmRsZXI6ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCwgdGltZW91dDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KGhhbmRsZXIsIHRpbWVvdXQpO1xuICAgIH1cbn1cbiJdfQ==
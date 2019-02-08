/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @record
 */
export function ItemsDimensions() { }
/** @type {?} */
ItemsDimensions.prototype.itemsLength;
/** @type {?} */
ItemsDimensions.prototype.viewWidth;
/** @type {?} */
ItemsDimensions.prototype.viewHeight;
/** @type {?} */
ItemsDimensions.prototype.childWidth;
/** @type {?} */
ItemsDimensions.prototype.childHeight;
/** @type {?} */
ItemsDimensions.prototype.itemsPerCol;
/**
 * @record
 */
export function ItemsRangeResult() { }
/** @type {?} */
ItemsRangeResult.prototype.scrollHeight;
/** @type {?} */
ItemsRangeResult.prototype.topPadding;
/** @type {?} */
ItemsRangeResult.prototype.start;
/** @type {?} */
ItemsRangeResult.prototype.end;
var VirtualScrollService = /** @class */ (function () {
    function VirtualScrollService() {
    }
    /**
     * @param {?} d
     * @param {?} dropdownEl
     * @param {?} bufferAmount
     * @return {?}
     */
    VirtualScrollService.prototype.calculateItems = /**
     * @param {?} d
     * @param {?} dropdownEl
     * @param {?} bufferAmount
     * @return {?}
     */
    function (d, dropdownEl, bufferAmount) {
        /** @type {?} */
        var scrollHeight = d.childHeight * d.itemsLength;
        if (dropdownEl.scrollTop > scrollHeight) {
            dropdownEl.scrollTop = scrollHeight;
        }
        /** @type {?} */
        var scrollTop = Math.max(0, dropdownEl.scrollTop);
        /** @type {?} */
        var indexByScrollTop = scrollTop / scrollHeight * d.itemsLength;
        /** @type {?} */
        var end = Math.min(d.itemsLength, Math.ceil(indexByScrollTop) + (d.itemsPerCol + 1));
        /** @type {?} */
        var maxStartEnd = end;
        /** @type {?} */
        var maxStart = Math.max(0, maxStartEnd - d.itemsPerCol - 1);
        /** @type {?} */
        var start = Math.min(maxStart, Math.floor(indexByScrollTop));
        /** @type {?} */
        var topPadding = d.childHeight * Math.ceil(start) - (d.childHeight * Math.min(start, bufferAmount));
        topPadding = !isNaN(topPadding) ? topPadding : 0;
        start = !isNaN(start) ? start : -1;
        end = !isNaN(end) ? end : -1;
        start -= bufferAmount;
        start = Math.max(0, start);
        end += bufferAmount;
        end = Math.min(d.itemsLength, end);
        return {
            topPadding: topPadding,
            scrollHeight: scrollHeight,
            start: start,
            end: end
        };
    };
    /**
     * @param {?} itemsLength
     * @param {?} index
     * @param {?} panelEl
     * @param {?} contentEl
     * @return {?}
     */
    VirtualScrollService.prototype.calculateDimensions = /**
     * @param {?} itemsLength
     * @param {?} index
     * @param {?} panelEl
     * @param {?} contentEl
     * @return {?}
     */
    function (itemsLength, index, panelEl, contentEl) {
        /** @type {?} */
        var panelRect = panelEl.getBoundingClientRect();
        /** @type {?} */
        var itemRect = contentEl.children[index] ? contentEl.children[index].getBoundingClientRect() : {
            width: panelRect.width,
            height: panelRect.height,
            top: 0,
        };
        /** @type {?} */
        var itemsPerCol = Math.max(1, Math.floor(panelRect.height / itemRect.height));
        return {
            itemsLength: itemsLength,
            viewWidth: panelRect.width,
            viewHeight: panelRect.height,
            childWidth: itemRect.width,
            childHeight: itemRect.height,
            itemsPerCol: itemsPerCol,
        };
    };
    VirtualScrollService.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ VirtualScrollService.ngInjectableDef = i0.defineInjectable({ factory: function VirtualScrollService_Factory() { return new VirtualScrollService(); }, token: VirtualScrollService, providedIn: "root" });
    return VirtualScrollService;
}());
export { VirtualScrollService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zZWxlY3Qvbmctc2VsZWN0LyIsInNvdXJjZXMiOlsibmctc2VsZWN0L3ZpcnR1YWwtc2Nyb2xsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXFCdkMsNkNBQWM7Ozs7OztJQUFkLFVBQWUsQ0FBa0IsRUFBRSxVQUF1QixFQUFFLFlBQW9COztRQUM1RSxJQUFNLFlBQVksR0FBRyxDQUFDLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDbkQsSUFBSSxVQUFVLENBQUMsU0FBUyxHQUFHLFlBQVksRUFBRTtZQUNyQyxVQUFVLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztTQUN2Qzs7UUFFRCxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7O1FBQ3BELElBQU0sZ0JBQWdCLEdBQUcsU0FBUyxHQUFHLFlBQVksR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDOztRQUNsRSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOztRQUVyRixJQUFNLFdBQVcsR0FBRyxHQUFHLENBQUM7O1FBQ3hCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFdBQVcsR0FBRyxDQUFDLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDOztRQUM5RCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQzs7UUFFN0QsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ3BHLFVBQVUsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakQsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixLQUFLLElBQUksWUFBWSxDQUFDO1FBQ3RCLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzQixHQUFHLElBQUksWUFBWSxDQUFDO1FBQ3BCLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFbkMsT0FBTztZQUNILFVBQVUsRUFBRSxVQUFVO1lBQ3RCLFlBQVksRUFBRSxZQUFZO1lBQzFCLEtBQUssRUFBRSxLQUFLO1lBQ1osR0FBRyxFQUFFLEdBQUc7U0FDWCxDQUFBO0tBQ0o7Ozs7Ozs7O0lBRUQsa0RBQW1COzs7Ozs7O0lBQW5CLFVBQW9CLFdBQW1CLEVBQUUsS0FBYSxFQUFFLE9BQW9CLEVBQUUsU0FBc0I7O1FBQ2hHLElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDOztRQUNsRCxJQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzdGLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSztZQUN0QixNQUFNLEVBQUUsU0FBUyxDQUFDLE1BQU07WUFDeEIsR0FBRyxFQUFFLENBQUM7U0FDVCxDQUFDOztRQUNGLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUVoRixPQUFPO1lBQ0gsV0FBVyxFQUFFLFdBQVc7WUFDeEIsU0FBUyxFQUFFLFNBQVMsQ0FBQyxLQUFLO1lBQzFCLFVBQVUsRUFBRSxTQUFTLENBQUMsTUFBTTtZQUM1QixVQUFVLEVBQUUsUUFBUSxDQUFDLEtBQUs7WUFDMUIsV0FBVyxFQUFFLFFBQVEsQ0FBQyxNQUFNO1lBQzVCLFdBQVcsRUFBRSxXQUFXO1NBQzNCLENBQUM7S0FDTDs7Z0JBbkRKLFVBQVUsU0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7OzsrQkFsQmxDOztTQW1CYSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSXRlbXNEaW1lbnNpb25zIHtcbiAgICBpdGVtc0xlbmd0aDogbnVtYmVyO1xuICAgIHZpZXdXaWR0aDogbnVtYmVyO1xuICAgIHZpZXdIZWlnaHQ6IG51bWJlcjtcbiAgICBjaGlsZFdpZHRoOiBudW1iZXI7XG4gICAgY2hpbGRIZWlnaHQ6IG51bWJlcjtcbiAgICBpdGVtc1BlckNvbDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEl0ZW1zUmFuZ2VSZXN1bHQge1xuICAgIHNjcm9sbEhlaWdodDogbnVtYmVyO1xuICAgIHRvcFBhZGRpbmc6IG51bWJlcjtcbiAgICBzdGFydDogbnVtYmVyO1xuICAgIGVuZDogbnVtYmVyO1xufVxuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFZpcnR1YWxTY3JvbGxTZXJ2aWNlIHtcblxuICAgIGNhbGN1bGF0ZUl0ZW1zKGQ6IEl0ZW1zRGltZW5zaW9ucywgZHJvcGRvd25FbDogSFRNTEVsZW1lbnQsIGJ1ZmZlckFtb3VudDogbnVtYmVyKTogSXRlbXNSYW5nZVJlc3VsdCB7XG4gICAgICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IGQuY2hpbGRIZWlnaHQgKiBkLml0ZW1zTGVuZ3RoO1xuICAgICAgICBpZiAoZHJvcGRvd25FbC5zY3JvbGxUb3AgPiBzY3JvbGxIZWlnaHQpIHtcbiAgICAgICAgICAgIGRyb3Bkb3duRWwuc2Nyb2xsVG9wID0gc2Nyb2xsSGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2Nyb2xsVG9wID0gTWF0aC5tYXgoMCwgZHJvcGRvd25FbC5zY3JvbGxUb3ApO1xuICAgICAgICBjb25zdCBpbmRleEJ5U2Nyb2xsVG9wID0gc2Nyb2xsVG9wIC8gc2Nyb2xsSGVpZ2h0ICogZC5pdGVtc0xlbmd0aDtcbiAgICAgICAgbGV0IGVuZCA9IE1hdGgubWluKGQuaXRlbXNMZW5ndGgsIE1hdGguY2VpbChpbmRleEJ5U2Nyb2xsVG9wKSArIChkLml0ZW1zUGVyQ29sICsgMSkpO1xuXG4gICAgICAgIGNvbnN0IG1heFN0YXJ0RW5kID0gZW5kO1xuICAgICAgICBjb25zdCBtYXhTdGFydCA9IE1hdGgubWF4KDAsIG1heFN0YXJ0RW5kIC0gZC5pdGVtc1BlckNvbCAtIDEpO1xuICAgICAgICBsZXQgc3RhcnQgPSBNYXRoLm1pbihtYXhTdGFydCwgTWF0aC5mbG9vcihpbmRleEJ5U2Nyb2xsVG9wKSk7XG5cbiAgICAgICAgbGV0IHRvcFBhZGRpbmcgPSBkLmNoaWxkSGVpZ2h0ICogTWF0aC5jZWlsKHN0YXJ0KSAtIChkLmNoaWxkSGVpZ2h0ICogTWF0aC5taW4oc3RhcnQsIGJ1ZmZlckFtb3VudCkpO1xuICAgICAgICB0b3BQYWRkaW5nID0gIWlzTmFOKHRvcFBhZGRpbmcpID8gdG9wUGFkZGluZyA6IDA7XG4gICAgICAgIHN0YXJ0ID0gIWlzTmFOKHN0YXJ0KSA/IHN0YXJ0IDogLTE7XG4gICAgICAgIGVuZCA9ICFpc05hTihlbmQpID8gZW5kIDogLTE7XG4gICAgICAgIHN0YXJ0IC09IGJ1ZmZlckFtb3VudDtcbiAgICAgICAgc3RhcnQgPSBNYXRoLm1heCgwLCBzdGFydCk7XG4gICAgICAgIGVuZCArPSBidWZmZXJBbW91bnQ7XG4gICAgICAgIGVuZCA9IE1hdGgubWluKGQuaXRlbXNMZW5ndGgsIGVuZCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcFBhZGRpbmc6IHRvcFBhZGRpbmcsXG4gICAgICAgICAgICBzY3JvbGxIZWlnaHQ6IHNjcm9sbEhlaWdodCxcbiAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgICAgIGVuZDogZW5kXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxjdWxhdGVEaW1lbnNpb25zKGl0ZW1zTGVuZ3RoOiBudW1iZXIsIGluZGV4OiBudW1iZXIsIHBhbmVsRWw6IEhUTUxFbGVtZW50LCBjb250ZW50RWw6IEhUTUxFbGVtZW50KTogSXRlbXNEaW1lbnNpb25zIHtcbiAgICAgICAgY29uc3QgcGFuZWxSZWN0ID0gcGFuZWxFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3QgaXRlbVJlY3QgPSBjb250ZW50RWwuY2hpbGRyZW5baW5kZXhdID8gY29udGVudEVsLmNoaWxkcmVuW2luZGV4XS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSA6IHtcbiAgICAgICAgICAgIHdpZHRoOiBwYW5lbFJlY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHBhbmVsUmVjdC5oZWlnaHQsXG4gICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGl0ZW1zUGVyQ29sID0gTWF0aC5tYXgoMSwgTWF0aC5mbG9vcihwYW5lbFJlY3QuaGVpZ2h0IC8gaXRlbVJlY3QuaGVpZ2h0KSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGl0ZW1zTGVuZ3RoOiBpdGVtc0xlbmd0aCxcbiAgICAgICAgICAgIHZpZXdXaWR0aDogcGFuZWxSZWN0LndpZHRoLFxuICAgICAgICAgICAgdmlld0hlaWdodDogcGFuZWxSZWN0LmhlaWdodCxcbiAgICAgICAgICAgIGNoaWxkV2lkdGg6IGl0ZW1SZWN0LndpZHRoLFxuICAgICAgICAgICAgY2hpbGRIZWlnaHQ6IGl0ZW1SZWN0LmhlaWdodCxcbiAgICAgICAgICAgIGl0ZW1zUGVyQ29sOiBpdGVtc1BlckNvbCxcbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=
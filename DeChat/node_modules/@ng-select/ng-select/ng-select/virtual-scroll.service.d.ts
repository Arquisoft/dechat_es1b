export interface ItemsDimensions {
    itemsLength: number;
    viewWidth: number;
    viewHeight: number;
    childWidth: number;
    childHeight: number;
    itemsPerCol: number;
}
export interface ItemsRangeResult {
    scrollHeight: number;
    topPadding: number;
    start: number;
    end: number;
}
export declare class VirtualScrollService {
    calculateItems(d: ItemsDimensions, dropdownEl: HTMLElement, bufferAmount: number): ItemsRangeResult;
    calculateDimensions(itemsLength: number, index: number, panelEl: HTMLElement, contentEl: HTMLElement): ItemsDimensions;
}

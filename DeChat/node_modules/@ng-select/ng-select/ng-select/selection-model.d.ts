import { NgOption } from './ng-select.types';
export declare type SelectionModelFactory = () => SelectionModel;
export declare function DefaultSelectionModelFactory(): DefaultSelectionModel;
export interface SelectionModel {
    value: NgOption[];
    select(item: NgOption, multiple: boolean, selectableGroupAsModel: boolean): any;
    unselect(item: NgOption, multiple: boolean): any;
    clear(): any;
}
export declare class DefaultSelectionModel implements SelectionModel {
    private _selected;
    readonly value: NgOption[];
    select(item: NgOption, multiple: boolean, groupAsModel: boolean): void;
    unselect(item: NgOption, multiple: boolean): void;
    clear(): void;
    private _setChildrenSelectedState;
    private _removeChildren;
    private _removeParent;
}

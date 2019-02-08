import { ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
export declare class NgOptionComponent implements OnChanges {
    elementRef: ElementRef;
    value: any;
    disabled: any;
    readonly stateChange$: Subject<{
        value: any;
        disabled: boolean;
    }>;
    private _disabled;
    constructor(elementRef: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    private _isDisabled;
}

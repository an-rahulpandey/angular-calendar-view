import { OnInit, EventEmitter, TemplateRef } from "@angular/core";
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import * as ɵngcc0 from '@angular/core';
export declare class AngularCalendarYearViewComponent implements OnInit {
    sanitizer: DomSanitizer;
    readonly style: SafeStyle;
    themecolor: any;
    events: any[];
    viewDate: Date;
    nothingToshowText: string;
    popoverEnabled: boolean;
    customTemplate: TemplateRef<any>;
    eventClicked: EventEmitter<any>;
    actionClicked: EventEmitter<any>;
    dayClicked: EventEmitter<any>;
    loader: any;
    days: any;
    dayindex: any;
    daydetails: any;
    year: any;
    calendar: any;
    spinner: any;
    constructor(sanitizer: DomSanitizer);
    ngOnInit(): void;
    ngOnChanges(): void;
    initCalendar(date: any): void;
    generateCalendar(month: any, year: any): any[];
    getNbWeeks(month: any, year: any): number;
    dayClickedFn(day: any, month: any): void;
    getTodayEvents(day: any, month: any): void;
    getnbevents(day: any, month: any): {
        nb: number;
        color: string;
    };
    eventClickedFn(event: any): void;
    refresh(date: any): void;
    actionClickedFn(action: any, event?: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<AngularCalendarYearViewComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<AngularCalendarYearViewComponent, "angular-calendar-year-view", never, { "themecolor": "themecolor"; "events": "events"; "viewDate": "viewDate"; "nothingToshowText": "nothingToshowText"; "popoverEnabled": "popoverEnabled"; "customTemplate": "customTemplate"; }, { "eventClicked": "eventClicked"; "actionClicked": "actionClicked"; "dayClicked": "dayClicked"; }, never, never>;
}

//# sourceMappingURL=angular-calendar-year-view.component.d.ts.map
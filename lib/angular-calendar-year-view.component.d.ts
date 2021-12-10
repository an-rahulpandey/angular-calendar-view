import { OnInit, EventEmitter } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';
export declare class AngularCalendarYearViewComponent implements OnInit {
    sanitizer: DomSanitizer;
    readonly style: import("@angular/platform-browser").SafeStyle;
    themecolor: any;
    events: any[];
    viewDate: Date;
    eventClicked: EventEmitter<any>;
    actionClicked: EventEmitter<any>;
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
    getTodayEvents(day: any, month: any): void;
    getnbevents(day: any, month: any): {
        nb: number;
        color: string;
    };
    eventClickedFn(event: any): void;
    refresh(date: any): void;
    actionClickedFn(action: any, event?: any): void;
}

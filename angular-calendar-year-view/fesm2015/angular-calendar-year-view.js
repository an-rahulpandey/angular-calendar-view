import * as cloneDeep from 'lodash/cloneDeep';
import cloneDeep__default, {  } from 'lodash/cloneDeep';
import { DomSanitizer } from '@angular/platform-browser';
import { Injectable, NgModule, Component, Input, Output, EventEmitter, HostBinding, defineInjectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverModule } from 'ngx-bootstrap/popover';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AngularCalendarYearViewService {
    constructor() { }
}
AngularCalendarYearViewService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
AngularCalendarYearViewService.ctorParameters = () => [];
/** @nocollapse */ AngularCalendarYearViewService.ngInjectableDef = defineInjectable({ factory: function AngularCalendarYearViewService_Factory() { return new AngularCalendarYearViewService(); }, token: AngularCalendarYearViewService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const clone = cloneDeep__default || cloneDeep;
class AngularCalendarYearViewComponent {
    /**
     * @param {?} sanitizer
     */
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.themecolor = '#ff0000';
        this.events = [];
        this.viewDate = new Date();
        this.nothingToshowText = "There are no events scheduled that day.";
        this.popoverEnabled = true;
        this.eventClicked = new EventEmitter();
        this.actionClicked = new EventEmitter();
        this.dayClicked = new EventEmitter();
        this.loader = false;
        this.days = [new Date(2019, 1, 3), new Date(2019, 1, 4), new Date(2019, 1, 5), new Date(2019, 1, 6), new Date(2019, 1, 7), new Date(2019, 1, 8), new Date(2019, 1, 9)];
        this.daydetails = {};
        this.year = new Date().getFullYear();
        this.calendar = [];
        this.spinner = true;
    }
    /**
     * @return {?}
     */
    get style() {
        return this.sanitizer.bypassSecurityTrustStyle(`--themecolor: ${this.themecolor};`);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initCalendar(this.viewDate);
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.initCalendar(this.viewDate);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    initCalendar(date) {
        this.year = date.getFullYear();
        this.calendar = [];
        this.spinner = true;
        for (let index = 0; index < 12; index++) {
            this.calendar.push({
                date: new Date(this.year, index + 1, 0),
                days: this.generateCalendar(index + 1, this.year)
            });
        }
        /** @type {?} */
        let self = this;
        setTimeout((/**
         * @return {?}
         */
        () => {
            self.spinner = false;
        }), 2000);
    }
    /**
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    generateCalendar(month, year) {
        /** @type {?} */
        let monthList = [];
        /** @type {?} */
        let nbweeks = this.getNbWeeks(month, year);
        /** @type {?} */
        let dayone = new Date(year, month - 1, 1).getDay();
        /** @type {?} */
        let nbdaysMonth = new Date(year, month, 0).getDate();
        /** @type {?} */
        let lastdayindex = new Date(year, month - 1, nbdaysMonth).getDay();
        /** @type {?} */
        let lastday = 7;
        /** @type {?} */
        let day = 1;
        /** @type {?} */
        let today = new Date().toDateString();
        for (let indexweek = 0; indexweek < nbweeks; indexweek++) {
            monthList[indexweek] = [];
            if (nbweeks == indexweek + 1) {
                lastday = lastdayindex + 1;
            }
            if (indexweek > 0) {
                dayone = 0;
            }
            for (let indexday = dayone; indexday < lastday; indexday++) {
                /** @type {?} */
                let d1 = new Date(year, month - 1, day).toDateString();
                /** @type {?} */
                let istoday = d1 == today;
                /** @type {?} */
                let colorsEvents = this.getnbevents(day, month - 1);
                monthList[indexweek][indexday] = {
                    day: day,
                    istoday: istoday,
                    colors: colorsEvents.color,
                    events: [],
                    nb: colorsEvents.nb
                };
                day++;
            }
        }
        return monthList;
    }
    /**
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    getNbWeeks(month, year) {
        /** @type {?} */
        let dayone = new Date(year, month - 1, 1).getDay();
        /** @type {?} */
        let nbdaysMonth = new Date(year, month, 0).getDate();
        /** @type {?} */
        let lastday = new Date(year, month - 1, nbdaysMonth).getDay();
        return (nbdaysMonth + dayone + (6 - lastday)) / 7;
    }
    /**
     * @param {?} day
     * @param {?} month
     * @return {?}
     */
    dayClickedFn(day, month) {
        /** @type {?} */
        let date = new Date(this.year, month, day.day);
        this.daydetails = { events: [] };
        if (this.events.length > 0) {
            this.loader = true;
            this.daydetails = clone(day);
            /** @type {?} */
            let d1 = new Date(this.year, month, day.day).toDateString();
            for (let index = 0; index < this.events.length; index++) {
                /** @type {?} */
                const element = this.events[index];
                /** @type {?} */
                let d2 = element.start.toDateString();
                if (d2 == d1) {
                    this.daydetails.events.push(element);
                }
            }
        }
        this.dayClicked.emit({ date: date, events: this.daydetails.events });
    }
    /**
     * @param {?} day
     * @param {?} month
     * @return {?}
     */
    getTodayEvents(day, month) {
        this.daydetails = {};
        if (this.events.length > 0) {
            this.loader = true;
            this.daydetails = clone(day);
            /** @type {?} */
            let d1 = new Date(this.year, month, day.day).toDateString();
            for (let index = 0; index < this.events.length; index++) {
                /** @type {?} */
                const element = this.events[index];
                /** @type {?} */
                let d2 = element.start.toDateString();
                if (d2 == d1) {
                    this.daydetails.events.push(element);
                }
                if (index == this.events.length - 1) {
                    /** @type {?} */
                    let self = this;
                    setTimeout((/**
                     * @return {?}
                     */
                    () => {
                        self.loader = false;
                    }), 1000);
                }
            }
        }
    }
    /**
     * @param {?} day
     * @param {?} month
     * @return {?}
     */
    getnbevents(day, month) {
        /** @type {?} */
        let nb = 0;
        /** @type {?} */
        let colors = [];
        if (this.events.length > 0) {
            /** @type {?} */
            let d1 = new Date(this.year, month, day).toDateString();
            for (let index = 0; index < this.events.length; index++) {
                /** @type {?} */
                const element = this.events[index];
                /** @type {?} */
                let d2 = element.start.toDateString();
                if (d2 == d1) {
                    nb++;
                    colors.push(element.color.secondary);
                }
            }
            return ({ nb: nb, color: colors.toString() });
        }
        else {
            return { color: "", nb: 0 };
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    eventClickedFn(event) {
        this.eventClicked.emit(event);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    refresh(date) {
        this.initCalendar(date);
    }
    /**
     * @param {?} action
     * @param {?=} event
     * @return {?}
     */
    actionClickedFn(action, event) {
        this.actionClicked.emit({ action: action, event: event });
    }
}
AngularCalendarYearViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'angular-calendar-year-view',
                template: `
  <div class="calendarcontainer flexmonths">
  <div class="responsivecontainer" *ngFor="let Month of calendar;let m =index">
      <div  class="monthcontainer ">
        <p class="monthname">{{Month.date | date:'MMMM'}}</p>
        <div class="flexdays">
          <div class="day" *ngFor="let label of days">
            {{label | date:'EEEEEE'}}
          </div>
        </div>
        <div *ngFor="let week of Month.days" class="flexdays">
          <div *ngFor="let day of week;let i=index" [ngClass]="day?( day.istoday?'todayclass':(day.nb>0?'haveevents':'')):   'void_day'"
            [style.background-image]="day? ('linear-gradient(120deg, '+day.colors+',#fff)'):''" class="day" 
            [outsideClick]="true"
            [popover]="popoverEnabled?(customTemplate?customTemplate:yearcalendarpoptemplate):''" 
            placement="right" 
            (onShown)="dayindex=i;getTodayEvents(day,m)"
            (click)="dayClickedFn(day,m)">
            {{day?.day}}
          </div>
        </div>
      </div>
  </div>
</div>
<div *ngIf="spinner" class="calendar-loading">
  <svg class="spinner" viewBox="25 25 50 50">
    <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
  </svg>
</div>
<ng-template #yearcalendarpoptemplate>
  <div class="col-md-12 col-calendar">
    <p [ngClass]="daydetails.istoday?'todaytext':''" class="pop_year_day">{{days[dayindex]| date:'EEEEEE'}}.</p>
    <p [ngClass]="daydetails.istoday?'todaytext':''" class="pop_year_day_number">{{daydetails?.day}} </p>
    <div *ngIf="!loader">
      <div *ngFor="let event of daydetails.events">
          <a   [style.color]="event.color.primary+'!importants'" 
               class="icon-action-calendar" 
               *ngFor='let action of event.actions' 
                [innerHTML]='action.label' 
                (click)="actionClickedFn(action.name,event)"
                >
            
          </a>
        <div class="circle_day_color" [style.background]="event.color.secondary" [style.border-color]="event.color.primary"></div>
        <p class="pop_year_event_title" (click)="eventClickedFn(event)">
          <span>
            {{event.start| date:'HH:mm'}}
          </span>
          {{event.title}}
        </p>
        
      </div>
    </div>
    <div class="progressbar_popyear" *ngIf="!daydetails.events||(daydetails.events.length==0)&&!loader">
     {{nothingToshowText}} 
    </div>
    <div [hidden]="!loader" class="loader_popover_calendar"></div>
  </div>
</ng-template>
  `,
                styles: [".flexdays{display:flex}.flexmonths{display:flex;flex-wrap:wrap}.calendarcontainer{margin:auto;padding:15px}.col-calendar{min-width:250px}.monthcontainer{width:245px;margin:auto auto 25px;background:#fff;padding:10px;min-height:293px}.haveevents{background:linear-gradient(120deg,var(--primary),#fff);color:var(--textcolor)}.flexdays .day{padding:2px;width:28px!important;height:28px!important;border-radius:50%;margin:2px;text-align:center}.flexdays .day:hover,.yeardayactive{background:#eee;cursor:pointer}.monthname{text-align:center;font-size:18px;color:var(--themecolor);text-transform:capitalize}.title-calendar-year{margin-bottom:25px}.todayclass{background:var(--themecolor)!important;color:#fff}.eventclass{background:#4ab3cc!important;color:#fff}.todaytext{color:var(--themecolor)!important}.eventtext{color:#4ab3cc!important}.void_day{pointer-events:none}.pop_year_day{color:#6c6c6c;font-size:16px}.pop_year_day_number{font-size:38px;color:#b3b3b3;margin-left:6px;margin-top:-15px}.circle_day_color{width:10px;height:10px;border-radius:50%;float:left;margin-right:6px;margin-top:5px;border:1px solid}.pop_year_event_title{width:200px;color:#b7b7b6;margin-top:-8px}.progressbar_popyear{width:200px;padding:13px 0}.pop_year_event_title:hover{text-decoration:underline;cursor:pointer}.icon-action-calendar{float:right;color:#8a8989!important;cursor:pointer}.icon-action-calendar:hover{opacity:.4}.calendar-loading .spinner{height:200px;width:200px;-webkit-animation:2s linear infinite rotate;animation:2s linear infinite rotate;-webkit-transform-origin:center center;transform-origin:center center;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto}.calendar-loading .spinner .path{stroke-dasharray:1,200;stroke-dashoffset:0;-webkit-animation:1.5s ease-in-out infinite dash;animation:1.5s ease-in-out infinite dash;stroke-linecap:round;stroke:var(--themecolor)}@-webkit-keyframes rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}100%{stroke-dasharray:89,200;stroke-dashoffset:-124px}}@keyframes dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}100%{stroke-dasharray:89,200;stroke-dashoffset:-124px}}.loader_popover_calendar{height:6px;width:90%;margin-bottom:10px;overflow:hidden;background-color:#ffdede00;position:absolute}.loader_popover_calendar:before{display:block;position:absolute;content:\"\";left:-20px;width:20px;height:4px;background-color:var(--themecolor);-webkit-animation:1s linear infinite loading;animation:1s linear infinite loading}@-webkit-keyframes loading{from{left:-20px;width:30%}50%{width:30%}70%{width:70%}80%{left:50%}95%{left:120%}to{left:100%}}@keyframes loading{from{left:-20px;width:30%}50%{width:30%}70%{width:70%}80%{left:50%}95%{left:120%}to{left:100%}}.titles_calendar{font-weight:700;text-transform:capitalize}.responsivecontainer{width:25%}@media screen and (max-width:499px){.responsivecontainer{width:100%!important}}@media screen and (min-width:500px) and (max-width:749px){.responsivecontainer{width:50%!important}}@media screen and (min-width:750px) and (max-width:999px){.responsivecontainer{width:33%!important}}@media screen and (min-width:1000px){.responsivecontainer{width:25%!important}}"]
            }] }
];
/** @nocollapse */
AngularCalendarYearViewComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
AngularCalendarYearViewComponent.propDecorators = {
    style: [{ type: HostBinding, args: ['style',] }],
    themecolor: [{ type: Input }],
    events: [{ type: Input }],
    viewDate: [{ type: Input }],
    nothingToshowText: [{ type: Input }],
    popoverEnabled: [{ type: Input }],
    customTemplate: [{ type: Input }],
    eventClicked: [{ type: Output }],
    actionClicked: [{ type: Output }],
    dayClicked: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AngularCalendarYearViewModule {
}
AngularCalendarYearViewModule.decorators = [
    { type: NgModule, args: [{
                declarations: [AngularCalendarYearViewComponent],
                imports: [
                    CommonModule,
                    PopoverModule.forRoot()
                ],
                schemas: [],
                exports: [AngularCalendarYearViewComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AngularCalendarYearViewService, AngularCalendarYearViewComponent, AngularCalendarYearViewModule };

//# sourceMappingURL=angular-calendar-year-view.js.map
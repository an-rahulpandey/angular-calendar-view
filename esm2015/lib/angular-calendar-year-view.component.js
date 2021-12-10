/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, HostBinding } from "@angular/core";
import * as cloneDeep from "lodash/cloneDeep";
import { DomSanitizer } from '@angular/platform-browser';
/** @type {?} */
const clone = ((/** @type {?} */ (cloneDeep))).default || cloneDeep;
export class AngularCalendarYearViewComponent {
    /**
     * @param {?} sanitizer
     */
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.themecolor = '#ff0000';
        this.events = [];
        this.viewDate = new Date();
        this.eventClicked = new EventEmitter();
        this.actionClicked = new EventEmitter();
        this.loader = false;
        this.days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
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
                template: "<div class=\"calendarcontainer container\">\n  <div class=\"row\">\n    <div *ngFor=\"let Month of calendar;let m =index\" class=\"col-md-3  col-sm-6 col-xs-12 \">\n      <div class=\"monthcontainer \">\n        <p class=\"monthname\">{{Month.date | date:'MMMM'}}</p>\n        <div class=\"flexdays\">\n          <div class=\"day\" *ngFor=\"let label of days\">\n            {{label}}\n          </div>\n        </div>\n        <div *ngFor=\"let week of Month.days\" class=\"flexdays\">\n          <div *ngFor=\"let day of week;let i=index\" [ngClass]=\"day?( day.istoday?'todayclass':(day.nb>0?'haveevents':'')):   'void_day'\"\n            [style.background-image]=\"day? ('linear-gradient(120deg, '+day.colors+',#fff)'):''\" class=\"day\" [outsideClick]=\"true\"\n            [popover]=\"yearcalendarpoptemplate\" placement=\"right\" (onShown)=\"dayindex=i;getTodayEvents(day,m)\">\n            {{day?.day}}\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<div *ngIf=\"spinner\" class=\"calendar-loading\">\n  <svg class=\"spinner\" viewBox=\"25 25 50 50\">\n    <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"2\" stroke-miterlimit=\"10\" />\n  </svg>\n</div>\n<ng-template #yearcalendarpoptemplate>\n  <div class=\"col-md-12 col-calendar\">\n    <p [ngClass]=\"daydetails.istoday?'todaytext':''\" class=\"pop_year_day\">{{days[dayindex]}}.</p>\n    <p [ngClass]=\"daydetails.istoday?'todaytext':''\" class=\"pop_year_day_number\">{{daydetails?.day}} </p>\n    <div *ngIf=\"!loader\">\n      <div *ngFor=\"let event of daydetails.events\">\n          <a   [style.color]=\"event.color.primary+'!importants'\" \n               class=\"icon-action-calendar\" \n               *ngFor='let action of event.actions' \n                [innerHTML]='action.label' \n                (click)=\"actionClickedFn(action.name,event)\"\n                >\n            \n          </a>\n        <div class=\"circle_day_color\" [style.background]=\"event.color.secondary\" [style.border-color]=\"event.color.primary\"></div>\n        <p class=\"pop_year_event_title\" (click)=\"eventClickedFn(event)\">\n          <span>\n            {{event.start| date:'HH:mm'}}\n          </span>\n          {{event.title}}\n        </p>\n        \n      </div>\n    </div>\n    <div class=\"progressbar_popyear\" *ngIf=\"!daydetails.events||(daydetails.events.length==0)&&!loader\">\n      There are no events scheduled that day.\n    </div>\n    <div [hidden]=\"!loader\" class=\"loader_popover_calendar\"></div>\n  </div>\n</ng-template>",
                styles: [".flexdays{display:-webkit-box;display:flex}.calendarcontainer{margin:auto;padding:15px}.col-calendar{min-width:250px}.monthcontainer{width:245px;margin:auto auto 25px;background:#fff;padding:10px;min-height:293px}.haveevents{background:linear-gradient(120deg,var(--primary),#fff);color:var(--textcolor)}.flexdays .day{padding:2px;width:28px!important;height:28px!important;border-radius:50%;margin:2px;text-align:center}.flexdays .day:hover,.yeardayactive{background:#eee;cursor:pointer}.monthname{text-align:center;font-size:18px;color:var(--themecolor);text-transform:capitalize}.title-calendar-year{margin-bottom:25px}.todayclass{background:var(--themecolor)!important;color:#fff}.eventclass{background:#4ab3cc!important;color:#fff}.todaytext{color:var(--themecolor)!important}.eventtext{color:#4ab3cc!important}.void_day{pointer-events:none}.pop_year_day{color:#6c6c6c;font-size:16px}.pop_year_day_number{font-size:38px;color:#b3b3b3;margin-left:6px;margin-top:-15px}.circle_day_color{width:10px;height:10px;border-radius:50%;float:left;margin-right:6px;margin-top:5px;border:1px solid}.pop_year_event_title{width:200px;color:#b7b7b6;margin-top:-8px}.progressbar_popyear{width:200px;padding:13px 0}.pop_year_event_title:hover{text-decoration:underline;cursor:pointer}.icon-action-calendar{float:right;color:#8a8989!important;cursor:pointer}.icon-action-calendar:hover{opacity:.4}.calendar-loading .spinner{height:200px;width:200px;-webkit-animation:2s linear infinite rotate;animation:2s linear infinite rotate;-webkit-transform-origin:center center;transform-origin:center center;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto}.calendar-loading .spinner .path{stroke-dasharray:1,200;stroke-dashoffset:0;-webkit-animation:1.5s ease-in-out infinite dash;animation:1.5s ease-in-out infinite dash;stroke-linecap:round;stroke:var(--themecolor)}@-webkit-keyframes rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}100%{stroke-dasharray:89,200;stroke-dashoffset:-124px}}@keyframes dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}100%{stroke-dasharray:89,200;stroke-dashoffset:-124px}}.loader_popover_calendar{height:6px;width:90%;margin-bottom:10px;overflow:hidden;background-color:#ffdede00;position:absolute}.loader_popover_calendar:before{display:block;position:absolute;content:\"\";left:-20px;width:20px;height:4px;background-color:var(--themecolor);-webkit-animation:1s linear infinite loading;animation:1s linear infinite loading}@-webkit-keyframes loading{from{left:-20px;width:30%}50%{width:30%}70%{width:70%}80%{left:50%}95%{left:120%}to{left:100%}}@keyframes loading{from{left:-20px;width:30%}50%{width:30%}70%{width:70%}80%{left:50%}95%{left:120%}to{left:100%}}"]
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
    eventClicked: [{ type: Output }],
    actionClicked: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    AngularCalendarYearViewComponent.prototype.themecolor;
    /** @type {?} */
    AngularCalendarYearViewComponent.prototype.events;
    /** @type {?} */
    AngularCalendarYearViewComponent.prototype.viewDate;
    /** @type {?} */
    AngularCalendarYearViewComponent.prototype.eventClicked;
    /** @type {?} */
    AngularCalendarYearViewComponent.prototype.actionClicked;
    /** @type {?} */
    AngularCalendarYearViewComponent.prototype.loader;
    /** @type {?} */
    AngularCalendarYearViewComponent.prototype.days;
    /** @type {?} */
    AngularCalendarYearViewComponent.prototype.dayindex;
    /** @type {?} */
    AngularCalendarYearViewComponent.prototype.daydetails;
    /** @type {?} */
    AngularCalendarYearViewComponent.prototype.year;
    /** @type {?} */
    AngularCalendarYearViewComponent.prototype.calendar;
    /** @type {?} */
    AngularCalendarYearViewComponent.prototype.spinner;
    /** @type {?} */
    AngularCalendarYearViewComponent.prototype.sanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1jYWxlbmRhci15ZWFyLXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci15ZWFyLXZpZXcvIiwic291cmNlcyI6WyJsaWIvYW5ndWxhci1jYWxlbmRhci15ZWFyLXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RixPQUFPLEtBQUssU0FBUyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7TUFDbkQsS0FBSyxHQUFjLENBQUMsbUJBQUssU0FBUyxFQUFBLENBQUMsQ0FBQyxPQUFPLElBQUksU0FBUztBQU05RCxNQUFNLE9BQU8sZ0NBQWdDOzs7O0lBNEIzQyxZQUFpQyxTQUFzQjtRQUF0QixjQUFTLEdBQVQsU0FBUyxDQUFhO1FBcEJ2RCxlQUFVLEdBQUssU0FBUyxDQUFBO1FBRXhCLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFHWixhQUFRLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUc1QixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFHdkMsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBRXhDLFdBQU0sR0FBUSxLQUFLLENBQUM7UUFDcEIsU0FBSSxHQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFdkQsZUFBVSxHQUFRLEVBQUUsQ0FBQztRQUNyQixTQUFJLEdBQVEsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxhQUFRLEdBQVEsRUFBRSxDQUFDO1FBQ25CLFlBQU8sR0FBUSxJQUFJLENB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Q2Qsc0RBQXFCOztJQUNyQixnREFBcUM7O0lBQ3JDLG9EQUFtQjs7SUFDbkIsbURBQW9COztJQUNNLHFEQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCAqIGFzIGNsb25lRGVlcCBmcm9tIFwibG9kYXNoL2Nsb25lRGVlcFwiO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5jb25zdCBjbG9uZTogY2xvbmVEZWVwID0gKDxhbnk+Y2xvbmVEZWVwKS5kZWZhdWx0IHx8IGNsb25lRGVlcFxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYW5ndWxhci1jYWxlbmRhci15ZWFyLXZpZXcnLFxuICB0ZW1wbGF0ZVVybDogJy4vYW5ndWxhci1jYWxlbmRhci15ZWFyLXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9hbmd1bGFyLWNhbGVuZGFyLXllYXItdmlldy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJDYWxlbmRhclllYXJWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZScpXG4gIGdldCBzdHlsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKFxuICAgICAgYC0tdGhlbWVjb2xvcjogJHt0aGlzLnRoZW1lY29sb3J9O2BcbiAgICApO1xuICB9XG4gIEBJbnB1dCgpXG4gIHRoZW1lY29sb3I6YW55PScjZmYwMDAwJ1xuICBASW5wdXQoKVxuICBldmVudHMgPSBbXTtcblxuICBASW5wdXQoKVxuICB2aWV3RGF0ZTogRGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgQE91dHB1dCgpXG4gIGV2ZW50Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBcbiAgQE91dHB1dCgpXG4gIGFjdGlvbkNsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBsb2FkZXI6IGFueSA9IGZhbHNlO1xuICBkYXlzOiBhbnkgPSBbXCJTdVwiLCBcIk1vXCIsIFwiVHVcIiwgXCJXZVwiLCBcIlRoXCIsIFwiRnJcIiwgXCJTYVwiXTtcbiAgZGF5aW5kZXg6IGFueTtcbiAgZGF5ZGV0YWlsczogYW55ID0ge307XG4gIHllYXI6IGFueSA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcbiAgY2FsZW5kYXI6IGFueSA9IFtdO1xuICBzcGlubmVyOiBhbnkgPSB0cnVlO1xuICBjb25zdHJ1Y3RvciggICAgICAgICAgICAgIHB1YmxpYyBzYW5pdGl6ZXI6RG9tU2FuaXRpemVyLFxuXG4gICkgeyB9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaW5pdENhbGVuZGFyKHRoaXMudmlld0RhdGUpO1xuICB9XG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuaW5pdENhbGVuZGFyKHRoaXMudmlld0RhdGUpO1xuICB9XG4gIGluaXRDYWxlbmRhcihkYXRlKSB7XG4gICAgdGhpcy55ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIHRoaXMuY2FsZW5kYXIgPSBbXTtcbiAgICB0aGlzLnNwaW5uZXIgPSB0cnVlO1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCAxMjsgaW5kZXgrKykge1xuICAgICAgdGhpcy5jYWxlbmRhci5wdXNoKHtcbiAgICAgICAgZGF0ZTogbmV3IERhdGUodGhpcy55ZWFyLCBpbmRleCArIDEsIDApLFxuICAgICAgICBkYXlzOiB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoaW5kZXggKyAxLCB0aGlzLnllYXIpXG4gICAgICB9KTtcbiAgICB9XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2VsZi5zcGlubmVyID0gZmFsc2U7XG4gICAgfSwgMjAwMCk7XG4gIH1cbiAgZ2VuZXJhdGVDYWxlbmRhcihtb250aCwgeWVhcikge1xuICAgIGxldCBtb250aExpc3QgPSBbXTtcbiAgICBsZXQgbmJ3ZWVrcyA9IHRoaXMuZ2V0TmJXZWVrcyhtb250aCwgeWVhcik7XG4gICAgbGV0IGRheW9uZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgMSkuZ2V0RGF5KCk7XG4gICAgbGV0IG5iZGF5c01vbnRoID0gbmV3IERhdGUoeWVhciwgbW9udGgsIDApLmdldERhdGUoKTtcbiAgICBsZXQgbGFzdGRheWluZGV4ID0gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBuYmRheXNNb250aCkuZ2V0RGF5KCk7XG4gICAgbGV0IGxhc3RkYXkgPSA3O1xuICAgIGxldCBkYXkgPSAxO1xuICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCkudG9EYXRlU3RyaW5nKCk7XG5cbiAgICBmb3IgKGxldCBpbmRleHdlZWsgPSAwOyBpbmRleHdlZWsgPCBuYndlZWtzOyBpbmRleHdlZWsrKykge1xuICAgICAgbW9udGhMaXN0W2luZGV4d2Vla10gPSBbXTtcbiAgICAgIGlmIChuYndlZWtzID09IGluZGV4d2VlayArIDEpIHtcbiAgICAgICAgbGFzdGRheSA9IGxhc3RkYXlpbmRleCArIDE7XG4gICAgICB9XG4gICAgICBpZiAoaW5kZXh3ZWVrID4gMCkge1xuICAgICAgICBkYXlvbmUgPSAwO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaW5kZXhkYXkgPSBkYXlvbmU7IGluZGV4ZGF5IDwgbGFzdGRheTsgaW5kZXhkYXkrKykge1xuICAgICAgICBsZXQgZDEgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSkudG9EYXRlU3RyaW5nKCk7XG4gICAgICAgIGxldCBpc3RvZGF5ID0gZDEgPT0gdG9kYXk7XG4gICAgICAgIGxldCBjb2xvcnNFdmVudHMgPSB0aGlzLmdldG5iZXZlbnRzKGRheSwgbW9udGggLSAxKVxuICAgICAgICBtb250aExpc3RbaW5kZXh3ZWVrXVtpbmRleGRheV0gPSB7XG4gICAgICAgICAgZGF5OiBkYXksXG4gICAgICAgICAgaXN0b2RheTogaXN0b2RheSxcbiAgICAgICAgICBjb2xvcnM6IGNvbG9yc0V2ZW50cy5jb2xvcixcbiAgICAgICAgICBldmVudHM6IFtdLFxuICAgICAgICAgIG5iOiBjb2xvcnNFdmVudHMubmJcbiAgICAgICAgfTtcbiAgICAgICAgZGF5Kys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vbnRoTGlzdDtcbiAgfVxuICBnZXROYldlZWtzKG1vbnRoLCB5ZWFyKSB7XG4gICAgbGV0IGRheW9uZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgMSkuZ2V0RGF5KCk7XG4gICAgbGV0IG5iZGF5c01vbnRoID0gbmV3IERhdGUoeWVhciwgbW9udGgsIDApLmdldERhdGUoKTtcbiAgICBsZXQgbGFzdGRheSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgbmJkYXlzTW9udGgpLmdldERheSgpO1xuICAgIHJldHVybiAobmJkYXlzTW9udGggKyBkYXlvbmUgKyAoNiAtIGxhc3RkYXkpKSAvIDc7XG4gIH1cbiAgZ2V0VG9kYXlFdmVudHMoZGF5LCBtb250aCkge1xuICAgIHRoaXMuZGF5ZGV0YWlscyA9IHt9XG5cbiAgICBpZiAodGhpcy5ldmVudHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5sb2FkZXIgPSB0cnVlO1xuICAgICAgdGhpcy5kYXlkZXRhaWxzID0gY2xvbmUoZGF5KTtcbiAgICAgIGxldCBkMSA9IG5ldyBEYXRlKHRoaXMueWVhciwgbW9udGgsIGRheS5kYXkpLnRvRGF0ZVN0cmluZygpO1xuXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5ldmVudHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmV2ZW50c1tpbmRleF07XG4gICAgICAgIGxldCBkMiA9IGVsZW1lbnQuc3RhcnQudG9EYXRlU3RyaW5nKCk7XG4gICAgICAgIGlmIChkMiA9PSBkMSkge1xuICAgICAgICAgIHRoaXMuZGF5ZGV0YWlscy5ldmVudHMucHVzaChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPT0gdGhpcy5ldmVudHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHNlbGYubG9hZGVyID0gZmFsc2U7XG4gICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH1cblxuICAgICAgfVxuICAgIH1cbiAgfVxuICBnZXRuYmV2ZW50cyhkYXksIG1vbnRoKSB7XG4gICAgbGV0IG5iID0gMDtcbiAgICBsZXQgY29sb3JzID0gW11cbiAgICBpZiAodGhpcy5ldmVudHMubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IGQxID0gbmV3IERhdGUodGhpcy55ZWFyLCBtb250aCwgZGF5KS50b0RhdGVTdHJpbmcoKTtcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmV2ZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZXZlbnRzW2luZGV4XTtcbiAgICAgICAgbGV0IGQyID0gZWxlbWVudC5zdGFydC50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgaWYgKGQyID09IGQxKSB7XG4gICAgICAgICAgbmIrKztcbiAgICAgICAgICBjb2xvcnMucHVzaChlbGVtZW50LmNvbG9yLnNlY29uZGFyeSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuICh7IG5iOiBuYiwgY29sb3I6IGNvbG9ycy50b1N0cmluZygpIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7IGNvbG9yOiBcIlwiLCBuYjogMCB9XG4gICAgfVxuICB9XG4gIGV2ZW50Q2xpY2tlZEZuKGV2ZW50KSB7XG4gICAgdGhpcy5ldmVudENsaWNrZWQuZW1pdChldmVudCk7XG4gIH1cbiAgcmVmcmVzaChkYXRlKSB7XG4gICAgdGhpcy5pbml0Q2FsZW5kYXIoZGF0ZSk7XG4gIH1cbiAgYWN0aW9uQ2xpY2tlZEZuKGFjdGlvbixldmVudD8pe1xuICAgICAgIHRoaXMuYWN0aW9uQ2xpY2tlZC5lbWl0KHthY3Rpb246YWN0aW9uLGV2ZW50OmV2ZW50fSlcbiAgfVxufVxuIl19
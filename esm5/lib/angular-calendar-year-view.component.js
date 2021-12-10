/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, HostBinding } from "@angular/core";
import * as cloneDeep from "lodash/cloneDeep";
import { DomSanitizer } from '@angular/platform-browser';
/** @type {?} */
var clone = ((/** @type {?} */ (cloneDeep))).default || cloneDeep;
var AngularCalendarYearViewComponent = /** @class */ (function () {
    function AngularCalendarYearViewComponent(sanitizer) {
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
    Object.defineProperty(AngularCalendarYearViewComponent.prototype, "style", {
        get: /**
         * @return {?}
         */
        function () {
            return this.sanitizer.bypassSecurityTrustStyle("--themecolor: " + this.themecolor + ";");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AngularCalendarYearViewComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initCalendar(this.viewDate);
    };
    /**
     * @return {?}
     */
    AngularCalendarYearViewComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this.initCalendar(this.viewDate);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    AngularCalendarYearViewComponent.prototype.initCalendar = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this.year = date.getFullYear();
        this.calendar = [];
        this.spinner = true;
        for (var index = 0; index < 12; index++) {
            this.calendar.push({
                date: new Date(this.year, index + 1, 0),
                days: this.generateCalendar(index + 1, this.year)
            });
        }
        /** @type {?} */
        var self = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            self.spinner = false;
        }), 2000);
    };
    /**
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    AngularCalendarYearViewComponent.prototype.generateCalendar = /**
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    function (month, year) {
        /** @type {?} */
        var monthList = [];
        /** @type {?} */
        var nbweeks = this.getNbWeeks(month, year);
        /** @type {?} */
        var dayone = new Date(year, month - 1, 1).getDay();
        /** @type {?} */
        var nbdaysMonth = new Date(year, month, 0).getDate();
        /** @type {?} */
        var lastdayindex = new Date(year, month - 1, nbdaysMonth).getDay();
        /** @type {?} */
        var lastday = 7;
        /** @type {?} */
        var day = 1;
        /** @type {?} */
        var today = new Date().toDateString();
        for (var indexweek = 0; indexweek < nbweeks; indexweek++) {
            monthList[indexweek] = [];
            if (nbweeks == indexweek + 1) {
                lastday = lastdayindex + 1;
            }
            if (indexweek > 0) {
                dayone = 0;
            }
            for (var indexday = dayone; indexday < lastday; indexday++) {
                /** @type {?} */
                var d1 = new Date(year, month - 1, day).toDateString();
                /** @type {?} */
                var istoday = d1 == today;
                /** @type {?} */
                var colorsEvents = this.getnbevents(day, month - 1);
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
    };
    /**
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    AngularCalendarYearViewComponent.prototype.getNbWeeks = /**
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    function (month, year) {
        /** @type {?} */
        var dayone = new Date(year, month - 1, 1).getDay();
        /** @type {?} */
        var nbdaysMonth = new Date(year, month, 0).getDate();
        /** @type {?} */
        var lastday = new Date(year, month - 1, nbdaysMonth).getDay();
        return (nbdaysMonth + dayone + (6 - lastday)) / 7;
    };
    /**
     * @param {?} day
     * @param {?} month
     * @return {?}
     */
    AngularCalendarYearViewComponent.prototype.getTodayEvents = /**
     * @param {?} day
     * @param {?} month
     * @return {?}
     */
    function (day, month) {
        this.daydetails = {};
        if (this.events.length > 0) {
            this.loader = true;
            this.daydetails = clone(day);
            /** @type {?} */
            var d1 = new Date(this.year, month, day.day).toDateString();
            var _loop_1 = function (index) {
                /** @type {?} */
                var element = this_1.events[index];
                /** @type {?} */
                var d2 = element.start.toDateString();
                if (d2 == d1) {
                    this_1.daydetails.events.push(element);
                }
                if (index == this_1.events.length - 1) {
                    /** @type {?} */
                    var self_1 = this_1;
                    setTimeout((/**
                     * @return {?}
                     */
                    function () {
                        self_1.loader = false;
                    }), 1000);
                }
            };
            var this_1 = this;
            for (var index = 0; index < this.events.length; index++) {
                _loop_1(index);
            }
        }
    };
    /**
     * @param {?} day
     * @param {?} month
     * @return {?}
     */
    AngularCalendarYearViewComponent.prototype.getnbevents = /**
     * @param {?} day
     * @param {?} month
     * @return {?}
     */
    function (day, month) {
        /** @type {?} */
        var nb = 0;
        /** @type {?} */
        var colors = [];
        if (this.events.length > 0) {
            /** @type {?} */
            var d1 = new Date(this.year, month, day).toDateString();
            for (var index = 0; index < this.events.length; index++) {
                /** @type {?} */
                var element = this.events[index];
                /** @type {?} */
                var d2 = element.start.toDateString();
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    AngularCalendarYearViewComponent.prototype.eventClickedFn = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.eventClicked.emit(event);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    AngularCalendarYearViewComponent.prototype.refresh = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this.initCalendar(date);
    };
    /**
     * @param {?} action
     * @param {?=} event
     * @return {?}
     */
    AngularCalendarYearViewComponent.prototype.actionClickedFn = /**
     * @param {?} action
     * @param {?=} event
     * @return {?}
     */
    function (action, event) {
        this.actionClicked.emit({ action: action, event: event });
    };
    AngularCalendarYearViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'angular-calendar-year-view',
                    template: "<div class=\"calendarcontainer container\">\n  <div class=\"row\">\n    <div *ngFor=\"let Month of calendar;let m =index\" class=\"col-md-3  col-sm-6 col-xs-12 \">\n      <div class=\"monthcontainer \">\n        <p class=\"monthname\">{{Month.date | date:'MMMM'}}</p>\n        <div class=\"flexdays\">\n          <div class=\"day\" *ngFor=\"let label of days\">\n            {{label}}\n          </div>\n        </div>\n        <div *ngFor=\"let week of Month.days\" class=\"flexdays\">\n          <div *ngFor=\"let day of week;let i=index\" [ngClass]=\"day?( day.istoday?'todayclass':(day.nb>0?'haveevents':'')):   'void_day'\"\n            [style.background-image]=\"day? ('linear-gradient(120deg, '+day.colors+',#fff)'):''\" class=\"day\" [outsideClick]=\"true\"\n            [popover]=\"yearcalendarpoptemplate\" placement=\"right\" (onShown)=\"dayindex=i;getTodayEvents(day,m)\">\n            {{day?.day}}\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<div *ngIf=\"spinner\" class=\"calendar-loading\">\n  <svg class=\"spinner\" viewBox=\"25 25 50 50\">\n    <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"2\" stroke-miterlimit=\"10\" />\n  </svg>\n</div>\n<ng-template #yearcalendarpoptemplate>\n  <div class=\"col-md-12 col-calendar\">\n    <p [ngClass]=\"daydetails.istoday?'todaytext':''\" class=\"pop_year_day\">{{days[dayindex]}}.</p>\n    <p [ngClass]=\"daydetails.istoday?'todaytext':''\" class=\"pop_year_day_number\">{{daydetails?.day}} </p>\n    <div *ngIf=\"!loader\">\n      <div *ngFor=\"let event of daydetails.events\">\n          <a   [style.color]=\"event.color.primary+'!importants'\" \n               class=\"icon-action-calendar\" \n               *ngFor='let action of event.actions' \n                [innerHTML]='action.label' \n                (click)=\"actionClickedFn(action.name,event)\"\n                >\n            \n          </a>\n        <div class=\"circle_day_color\" [style.background]=\"event.color.secondary\" [style.border-color]=\"event.color.primary\"></div>\n        <p class=\"pop_year_event_title\" (click)=\"eventClickedFn(event)\">\n          <span>\n            {{event.start| date:'HH:mm'}}\n          </span>\n          {{event.title}}\n        </p>\n        \n      </div>\n    </div>\n    <div class=\"progressbar_popyear\" *ngIf=\"!daydetails.events||(daydetails.events.length==0)&&!loader\">\n      There are no events scheduled that day.\n    </div>\n    <div [hidden]=\"!loader\" class=\"loader_popover_calendar\"></div>\n  </div>\n</ng-template>",
                    styles: [".flexdays{display:-webkit-box;display:flex}.calendarcontainer{margin:auto;padding:15px}.col-calendar{min-width:250px}.monthcontainer{width:245px;margin:auto auto 25px;background:#fff;padding:10px;min-height:293px}.haveevents{background:linear-gradient(120deg,var(--primary),#fff);color:var(--textcolor)}.flexdays .day{padding:2px;width:28px!important;height:28px!important;border-radius:50%;margin:2px;text-align:center}.flexdays .day:hover,.yeardayactive{background:#eee;cursor:pointer}.monthname{text-align:center;font-size:18px;color:var(--themecolor);text-transform:capitalize}.title-calendar-year{margin-bottom:25px}.todayclass{background:var(--themecolor)!important;color:#fff}.eventclass{background:#4ab3cc!important;color:#fff}.todaytext{color:var(--themecolor)!important}.eventtext{color:#4ab3cc!important}.void_day{pointer-events:none}.pop_year_day{color:#6c6c6c;font-size:16px}.pop_year_day_number{font-size:38px;color:#b3b3b3;margin-left:6px;margin-top:-15px}.circle_day_color{width:10px;height:10px;border-radius:50%;float:left;margin-right:6px;margin-top:5px;border:1px solid}.pop_year_event_title{width:200px;color:#b7b7b6;margin-top:-8px}.progressbar_popyear{width:200px;padding:13px 0}.pop_year_event_title:hover{text-decoration:underline;cursor:pointer}.icon-action-calendar{float:right;color:#8a8989!important;cursor:pointer}.icon-action-calendar:hover{opacity:.4}.calendar-loading .spinner{height:200px;width:200px;-webkit-animation:2s linear infinite rotate;animation:2s linear infinite rotate;-webkit-transform-origin:center center;transform-origin:center center;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto}.calendar-loading .spinner .path{stroke-dasharray:1,200;stroke-dashoffset:0;-webkit-animation:1.5s ease-in-out infinite dash;animation:1.5s ease-in-out infinite dash;stroke-linecap:round;stroke:var(--themecolor)}@-webkit-keyframes rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}100%{stroke-dasharray:89,200;stroke-dashoffset:-124px}}@keyframes dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}100%{stroke-dasharray:89,200;stroke-dashoffset:-124px}}.loader_popover_calendar{height:6px;width:90%;margin-bottom:10px;overflow:hidden;background-color:#ffdede00;position:absolute}.loader_popover_calendar:before{display:block;position:absolute;content:\"\";left:-20px;width:20px;height:4px;background-color:var(--themecolor);-webkit-animation:1s linear infinite loading;animation:1s linear infinite loading}@-webkit-keyframes loading{from{left:-20px;width:30%}50%{width:30%}70%{width:70%}80%{left:50%}95%{left:120%}to{left:100%}}@keyframes loading{from{left:-20px;width:30%}50%{width:30%}70%{width:70%}80%{left:50%}95%{left:120%}to{left:100%}}"]
                }] }
    ];
    /** @nocollapse */
    AngularCalendarYearViewComponent.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    AngularCalendarYearViewComponent.propDecorators = {
        style: [{ type: HostBinding, args: ['style',] }],
        themecolor: [{ type: Input }],
        events: [{ type: Input }],
        viewDate: [{ type: Input }],
        eventClicked: [{ type: Output }],
        actionClicked: [{ type: Output }]
    };
    return AngularCalendarYearViewComponent;
}());
export { AngularCalendarYearViewComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1jYWxlbmRhci15ZWFyLXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci15ZWFyLXZpZXcvIiwic291cmNlcyI6WyJsaWIvYW5ndWxhci1jYWxlbmRhci15ZWFyLXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RixPQUFPLEtBQUssU0FBUyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7SUFDbkQsS0FBSyxHQUFjLENBQUMsbUJBQUssU0FBUyxFQUFBLENBQUMsQ0FBQyxPQUFPLElBQUksU0FBUztBQUM5RDtJQWlDRSwwQ0FBaUMsU0FBc0I7UUFBdEIsY0FBUyxHQUFULFNBQVMsQ0FBYTtRQXBCdkQsZUFBVSxHQUFLLFNBQVMsQ0FBQTtRQUV4QixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBR1osYUFBUSxHQUFTLElBQUksSUFBSSxFQUFFLENBQUM7UUFHNUIsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBR3ZDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUV4QyxXQUFNLEdBQVEsS0FBSyxDQUFDO1FBQ3BCLFNBQUksR0FBUSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXZELGVBQVUsR0FBUSxFQUFFLENBQUM7UUFDckIsU0FBSSxHQUFRLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckMsYUFBUSxHQUFRLEVBQUUsQ0FBQztRQUNuQixZQUFPLEdBQVEsSUFBSSxDQUFDO0lBR2hCLENBQUM7SUE3Qkws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OztJQU8zQyxzREFDd0I7O0lBQ3hCLGtEQUNZOztJQUVaLG9EQUM0Qjs7SUFFNUIsd0RBQ3VDOztJQUV2Qyx5REFDd0M7O0lBRXhDLGtEQUFvQjs7SUFDcEIsZ0RBQXVEOztJQUN2RCxvREFBYzs7SUFDZCxzREFBcUI7O0lBQ3JCLGdEQUFxQzs7SUFDckMsb0RBQW1COztJQUNuQixtREFBb0I7O0lBQ00scURBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgY2xvbmVEZWVwIGZyb20gXCJsb2Rhc2gvY2xvbmVEZWVwXCI7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmNvbnN0IGNsb25lOiBjbG9uZURlZXAgPSAoPGFueT5jbG9uZURlZXApLmRlZmF1bHQgfHwgY2xvbmVEZWVwXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhbmd1bGFyLWNhbGVuZGFyLXllYXItdmlldycsXG4gIHRlbXBsYXRlVXJsOiAnLi9hbmd1bGFyLWNhbGVuZGFyLXllYXItdmlldy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2FuZ3VsYXItY2FsZW5kYXIteWVhci12aWV3LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhckNhbGVuZGFyWWVhclZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlJylcbiAgZ2V0IHN0eWxlKCkge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoXG4gICAgICBgLS10aGVtZWNvbG9yOiAke3RoaXMudGhlbWVjb2xvcn07YFxuICAgICk7XG4gIH1cbiAgQElucHV0KClcbiAgdGhlbWVjb2xvcjphbnk9JyNmZjAwMDAnXG4gIEBJbnB1dCgpXG4gIGV2ZW50cyA9IFtdO1xuXG4gIEBJbnB1dCgpXG4gIHZpZXdEYXRlOiBEYXRlID0gbmV3IERhdGUoKTtcblxuICBAT3V0cHV0KClcbiAgZXZlbnRDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIFxuICBAT3V0cHV0KClcbiAgYWN0aW9uQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGxvYWRlcjogYW55ID0gZmFsc2U7XG4gIGRheXM6IGFueSA9IFtcIlN1XCIsIFwiTW9cIiwgXCJUdVwiLCBcIldlXCIsIFwiVGhcIiwgXCJGclwiLCBcIlNhXCJdO1xuICBkYXlpbmRleDogYW55O1xuICBkYXlkZXRhaWxzOiBhbnkgPSB7fTtcbiAgeWVhcjogYW55ID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuICBjYWxlbmRhcjogYW55ID0gW107XG4gIHNwaW5uZXI6IGFueSA9IHRydWU7XG4gIGNvbnN0cnVjdG9yKCAgICAgICAgICAgICAgcHVibGljIHNhbml0aXplcjpEb21TYW5pdGl6ZXIsXG5cbiAgKSB7IH1cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pbml0Q2FsZW5kYXIodGhpcy52aWV3RGF0ZSk7XG4gIH1cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5pbml0Q2FsZW5kYXIodGhpcy52aWV3RGF0ZSk7XG4gIH1cbiAgaW5pdENhbGVuZGFyKGRhdGUpIHtcbiAgICB0aGlzLnllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgdGhpcy5jYWxlbmRhciA9IFtdO1xuICAgIHRoaXMuc3Bpbm5lciA9IHRydWU7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDEyOyBpbmRleCsrKSB7XG4gICAgICB0aGlzLmNhbGVuZGFyLnB1c2goe1xuICAgICAgICBkYXRlOiBuZXcgRGF0ZSh0aGlzLnllYXIsIGluZGV4ICsgMSwgMCksXG4gICAgICAgIGRheXM6IHRoaXMuZ2VuZXJhdGVDYWxlbmRhcihpbmRleCArIDEsIHRoaXMueWVhcilcbiAgICAgIH0pO1xuICAgIH1cbiAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZWxmLnNwaW5uZXIgPSBmYWxzZTtcbiAgICB9LCAyMDAwKTtcbiAgfVxuICBnZW5lcmF0ZUNhbGVuZGFyKG1vbnRoLCB5ZWFyKSB7XG4gICAgbGV0IG1vbnRoTGlzdCA9IFtdO1xuICAgIGxldCBuYndlZWtzID0gdGhpcy5nZXROYldlZWtzKG1vbnRoLCB5ZWFyKTtcbiAgICBsZXQgZGF5b25lID0gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCAxKS5nZXREYXkoKTtcbiAgICBsZXQgbmJkYXlzTW9udGggPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgMCkuZ2V0RGF0ZSgpO1xuICAgIGxldCBsYXN0ZGF5aW5kZXggPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIG5iZGF5c01vbnRoKS5nZXREYXkoKTtcbiAgICBsZXQgbGFzdGRheSA9IDc7XG4gICAgbGV0IGRheSA9IDE7XG4gICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKTtcblxuICAgIGZvciAobGV0IGluZGV4d2VlayA9IDA7IGluZGV4d2VlayA8IG5id2Vla3M7IGluZGV4d2VlaysrKSB7XG4gICAgICBtb250aExpc3RbaW5kZXh3ZWVrXSA9IFtdO1xuICAgICAgaWYgKG5id2Vla3MgPT0gaW5kZXh3ZWVrICsgMSkge1xuICAgICAgICBsYXN0ZGF5ID0gbGFzdGRheWluZGV4ICsgMTtcbiAgICAgIH1cbiAgICAgIGlmIChpbmRleHdlZWsgPiAwKSB7XG4gICAgICAgIGRheW9uZSA9IDA7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpbmRleGRheSA9IGRheW9uZTsgaW5kZXhkYXkgPCBsYXN0ZGF5OyBpbmRleGRheSsrKSB7XG4gICAgICAgIGxldCBkMSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgbGV0IGlzdG9kYXkgPSBkMSA9PSB0b2RheTtcbiAgICAgICAgbGV0IGNvbG9yc0V2ZW50cyA9IHRoaXMuZ2V0bmJldmVudHMoZGF5LCBtb250aCAtIDEpXG4gICAgICAgIG1vbnRoTGlzdFtpbmRleHdlZWtdW2luZGV4ZGF5XSA9IHtcbiAgICAgICAgICBkYXk6IGRheSxcbiAgICAgICAgICBpc3RvZGF5OiBpc3RvZGF5LFxuICAgICAgICAgIGNvbG9yczogY29sb3JzRXZlbnRzLmNvbG9yLFxuICAgICAgICAgIGV2ZW50czogW10sXG4gICAgICAgICAgbmI6IGNvbG9yc0V2ZW50cy5uYlxuICAgICAgICB9O1xuICAgICAgICBkYXkrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbW9udGhMaXN0O1xuICB9XG4gIGdldE5iV2Vla3MobW9udGgsIHllYXIpIHtcbiAgICBsZXQgZGF5b25lID0gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCAxKS5nZXREYXkoKTtcbiAgICBsZXQgbmJkYXlzTW9udGggPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgMCkuZ2V0RGF0ZSgpO1xuICAgIGxldCBsYXN0ZGF5ID0gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBuYmRheXNNb250aCkuZ2V0RGF5KCk7XG4gICAgcmV0dXJuIChuYmRheXNNb250aCArIGRheW9uZSArICg2IC0gbGFzdGRheSkpIC8gNztcbiAgfVxuICBnZXRUb2RheUV2ZW50cyhkYXksIG1vbnRoKSB7XG4gICAgdGhpcy5kYXlkZXRhaWxzID0ge31cblxuICAgIGlmICh0aGlzLmV2ZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmxvYWRlciA9IHRydWU7XG4gICAgICB0aGlzLmRheWRldGFpbHMgPSBjbG9uZShkYXkpO1xuICAgICAgbGV0IGQxID0gbmV3IERhdGUodGhpcy55ZWFyLCBtb250aCwgZGF5LmRheSkudG9EYXRlU3RyaW5nKCk7XG5cbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmV2ZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZXZlbnRzW2luZGV4XTtcbiAgICAgICAgbGV0IGQyID0gZWxlbWVudC5zdGFydC50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgaWYgKGQyID09IGQxKSB7XG4gICAgICAgICAgdGhpcy5kYXlkZXRhaWxzLmV2ZW50cy5wdXNoKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA9PSB0aGlzLmV2ZW50cy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgc2VsZi5sb2FkZXIgPSBmYWxzZTtcbiAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGdldG5iZXZlbnRzKGRheSwgbW9udGgpIHtcbiAgICBsZXQgbmIgPSAwO1xuICAgIGxldCBjb2xvcnMgPSBbXVxuICAgIGlmICh0aGlzLmV2ZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgZDEgPSBuZXcgRGF0ZSh0aGlzLnllYXIsIG1vbnRoLCBkYXkpLnRvRGF0ZVN0cmluZygpO1xuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuZXZlbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5ldmVudHNbaW5kZXhdO1xuICAgICAgICBsZXQgZDIgPSBlbGVtZW50LnN0YXJ0LnRvRGF0ZVN0cmluZygpO1xuICAgICAgICBpZiAoZDIgPT0gZDEpIHtcbiAgICAgICAgICBuYisrO1xuICAgICAgICAgIGNvbG9ycy5wdXNoKGVsZW1lbnQuY29sb3Iuc2Vjb25kYXJ5KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gKHsgbmI6IG5iLCBjb2xvcjogY29sb3JzLnRvU3RyaW5nKCkgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHsgY29sb3I6IFwiXCIsIG5iOiAwIH1cbiAgICB9XG4gIH1cbiAgZXZlbnRDbGlja2VkRm4oZXZlbnQpIHtcbiAgICB0aGlzLmV2ZW50Q2xpY2tlZC5lbWl0KGV2ZW50KTtcbiAgfVxuICByZWZyZXNoKGRhdGUpIHtcbiAgICB0aGlzLmluaXRDYWxlbmRhcihkYXRlKTtcbiAgfVxuICBhY3Rpb25DbGlja2VkRm4oYWN0aW9uLGV2ZW50Pyl7XG4gICAgICAgdGhpcy5hY3Rpb25DbGlja2VkLmVtaXQoe2FjdGlvbjphY3Rpb24sZXZlbnQ6ZXZlbnR9KVxuICB9XG59XG4iXX0=
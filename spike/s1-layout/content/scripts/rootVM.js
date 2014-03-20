/// <reference path="profilevm.ts" />
/// <reference path="homevm.ts" />
/// <reference path="routing.ts" />
var ko;

var RootVM = (function () {
    function RootVM() {
        this.activeTemplate = ko.observable("");
        this.homeVM = new HomeVM();
    }
    return RootVM;
})();

var rootVM = new RootVM();

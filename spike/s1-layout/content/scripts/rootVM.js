/// <reference path="routing.ts" />
var ko;

var RootVM = (function () {
    function RootVM() {
        this.activeTemplate = ko.observable("");
    }
    return RootVM;
})();

var rootVM = new RootVM();

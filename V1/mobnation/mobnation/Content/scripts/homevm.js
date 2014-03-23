/// <reference path="profileVM.ts" />
/// <reference path="../../Scripts/typings/common.d.ts" />
var HomeVM = (function () {
    function HomeVM() {
        this.searchText = ko.observable('');
        this.profiles = ko.observableArray([]);
        this.newProfile = ko.observable(new ProfileVM(""));
    }
    return HomeVM;
})();

/// <reference path="profileVM.ts" />
/// <reference path="../../Scripts/typings/common.d.ts" />
/*
mobnation.org homepage viewmodel
By Angelo Perera March 2014
HomeVM - Maintain the state for the home page
*/
var HomeVM = (function () {
    function HomeVM() {
        this.searchText = ko.observable('');
        this.profiles = ko.observableArray([]);
        this.newProfile = ko.observable(new ProfileVM(""));
    }
    return HomeVM;
})();

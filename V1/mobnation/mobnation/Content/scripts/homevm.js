/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
var HomeVM = (function () {
    function HomeVM() {
        this.searchText = ko.observable('');
    }
    return HomeVM;
})();

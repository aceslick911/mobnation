var ko;

var HomeVM = (function () {
    function HomeVM() {
        this.searchText = ko.observable('');
    }
    return HomeVM;
})();

/// <reference path="profileVM.ts" />
/// <reference path="../../Scripts/typings/common.d.ts" />



class HomeVM {

    public searchText = ko.observable('');

    profiles: KnockoutObservableArray<ProfileVM> = ko.observableArray<ProfileVM>([]);

    newProfile: KnockoutObservable< ProfileVM> = ko.observable(new ProfileVM(""));

    constructor() {
       

    }
}
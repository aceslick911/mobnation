/// <reference path="profileVM.ts" />
/// <reference path="../../Scripts/typings/common.d.ts" />

/*

mobnation.org homepage viewmodel
By Angelo Perera March 2014

HomeVM - Maintain the state for the home page

*/

class HomeVM {

    public searchText = ko.observable('');

    profiles: KnockoutObservableArray<ProfileVM> = ko.observableArray<ProfileVM>([]);

    newProfile: KnockoutObservable< ProfileVM> = ko.observable(new ProfileVM(""));

    constructor() {
       

    }
}
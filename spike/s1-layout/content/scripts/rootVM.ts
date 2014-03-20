/// <reference path="profilevm.ts" />
/// <reference path="homevm.ts" />
/// <reference path="routing.ts" />


var ko: any;

class RootVM{

    activeTemplate = ko.observable("");

    profileVM: ProfileVM;
    homeVM: HomeVM;

    constructor(){

        this.homeVM = new HomeVM();

        }

}

var rootVM= new RootVM();                                       
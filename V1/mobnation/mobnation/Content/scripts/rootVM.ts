/// <reference path="../../Scripts/typings/modernizr/modernizr.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/crossroads/crossroads.d.ts" />
/// <reference path="profilevm.ts" />
/// <reference path="homevm.ts" />



declare var hasher: any;

class RootVM {

    activeTemplate = ko.observable("");

    profileVM: KnockoutObservable<ProfileVM> = ko.observable(null);
    homeVM: HomeVM;

    isMobile: boolean = false;

    constructor() {

        this.homeVM = new HomeVM();

        var mkb = new ProfileVM("monashkickboxing");
        mkb.profileLogo("https://mobnation.s3-ap-southeast-2.amazonaws.com/assets/profiles/monashkickboxing/case-monKickboxing-logo-large.png");

        this.homeVM.profiles.push(mkb);

    }

    initialize() {
        this.initializeEnvironment();
        this.setupRoutes();
        this.loadTemplates();
    }

    initializeEnvironment() {

        this.isMobile = Modernizr.touch;

    }

    setupRoutes() {

        //Setup Hash Routing

        //setup crossroads
        crossroads.addRoute('', () => {
            this.activeTemplate('home/homeTemplate');

            //update URL fragment generating new history record
            hasher.setHash('');
        });
        crossroads.addRoute('{id}', (id: any) => {
            var prof = _.find(this.homeVM.profiles(), profile=> {
                return profile.name == id;
            });

            this.profileVM(prof);

            this.activeTemplate('profile/profileTemplate');
        });

        //crossroads.routed.add(console.log, console); //log all routes

        //setup hasher
        function parseHash(newHash) {
            crossroads.parse(newHash);
        }
        hasher.initialized.add(parseHash); //parse initial hash
        hasher.changed.add(parseHash); //parse hash changes
        hasher.init(); //start listening for history change


    }

    loadTemplates() {

        //Load Templates
        function preloadTemplates(list: string[]) {
            var loadedTemplates = [];
            ko.utils.arrayForEach(list, function (name:string) {
                $.get("Content/templates/" + name + ".html", function (template:string) {
                    $("body").append("<script id=\"" + name + "\" type=\"text/html\">" + template + "<\/script>");
                    loadedTemplates.push(name);

                    //Apply Knockout rootVM binding after all templates loaded
                    if (list.length === loadedTemplates.length) {
                        ko.applyBindings(rootVM);
                    }

                });
            });
        }

        //Insert templates when ready
        $(function () {
            preloadTemplates([
                "home/homeTemplate",
                "home/footerTemplate",
                "profile/profileTemplate",
            ]);
        });

    }

}

var rootVM = new RootVM();

rootVM.initialize();







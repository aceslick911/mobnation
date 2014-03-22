/// <reference path="../../Scripts/typings/modernizr/modernizr.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/crossroads/crossroads.d.ts" />
/// <reference path="profilevm.ts" />
/// <reference path="homevm.ts" />

var RootVM = (function () {
    function RootVM() {
        this.activeTemplate = ko.observable("");
        this.profileVM = ko.observable(null);
        this.isMobile = false;
        this.homeVM = new HomeVM();
    }
    RootVM.prototype.initialize = function () {
        this.initializeEnvironment();
        this.setupRoutes();
        this.loadTemplates();
    };

    RootVM.prototype.initializeEnvironment = function () {
        this.isMobile = Modernizr.touch;
    };

    RootVM.prototype.setupRoutes = function () {
        var _this = this;
        //Setup Hash Routing
        //setup crossroads
        crossroads.addRoute('', function () {
            _this.activeTemplate('home/homeTemplate');

            //update URL fragment generating new history record
            hasher.setHash('');
        });
        crossroads.addRoute('{id}', function (id) {
            _this.profileVM(new ProfileVM(id));
            _this.activeTemplate('profile/profileTemplate');
        });

        //crossroads.routed.add(console.log, console); //log all routes
        //setup hasher
        function parseHash(newHash) {
            crossroads.parse(newHash);
        }
        hasher.initialized.add(parseHash); //parse initial hash
        hasher.changed.add(parseHash); //parse hash changes
        hasher.init(); //start listening for history change
    };

    RootVM.prototype.loadTemplates = function () {
        //Load Templates
        function preloadTemplates(list) {
            var loadedTemplates = [];
            ko.utils.arrayForEach(list, function (name) {
                $.get("Content/templates/" + name + ".html", function (template) {
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
                "profile/profileTemplate"
            ]);
        });
    };
    return RootVM;
})();

var rootVM = new RootVM();

rootVM.initialize();

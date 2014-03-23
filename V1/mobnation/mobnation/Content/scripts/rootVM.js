/// <reference path="../../Scripts/typings/common.d.ts" />
/// <reference path="profilevm.ts" />
/// <reference path="homevm.ts" />

var RootVM = (function () {
    function RootVM() {
        this.activeTemplate = ko.observable("");
        this.profileVM = ko.observable(null);
        this.isMobile = false;
        this.generateTestingData();
    }
    RootVM.prototype.generateTestingData = function () {
        this.homeVM = new HomeVM();

        var mkb = new ProfileVM("monashkickboxing");
        mkb.title("Monash Kickboxing");
        mkb.header("Monash University Kickboxing Club");
        mkb.profileLogo("https://mobnation.s3-ap-southeast-2.amazonaws.com/assets/profiles/monashkickboxing/case-monKickboxing-logo-large.png");
        mkb.contactLogo("https://mobnation.s3-ap-southeast-2.amazonaws.com/assets/profiles/monashkickboxing/kacey-image.jpg");
        mkb.aboutLogo("https://mobnation.s3-ap-southeast-2.amazonaws.com/assets/profiles/monashkickboxing/class-image.jpg");
        mkb.about("Kickboxing & Muay Thai Classes in Melbourne! Learn Kickboxing & Muay Thai in a fun & safe environment. Join the Monash University Kickboxing Club today!<br/>" + "Our Instructors are experienced and fully qualified, and committed to helping our Members develop into well - rounded Martial Artists, confident individuals, and most importantly, contributing, responsible members of the community.<br/>" + "    We provide quality instruction in a safe environment, and aim to cater to your goals and needs, whether they relate to health and fitness, competition, self - defense or self - development.<br/>" + "   In keeping with the highest standards of Martial Arts qualifications, all Monash University Kickboxing Club Instructors have attended the Martial Arts Industry Association(MAIA) Accreditation Course, and are either accredited by the MAIA or are currently undergoing accreditation.<br/>" + "The MAIA is the peak industry body for Martial Arts in Australia, and the MAIA National Martial Arts Instructor Accreditation Scheme(NMAS) is a government - recognised accreditation scheme(like the NCAS accreditation).<br/>" + "MAIA Accredited Instructor Logo<br/>" + "MAIA Accredited Instructors have completed the Martial Arts Unit of Competency as certified by RABQSA(under International Standard ISO 17024 by the Joint Accreditation Scheme Australia and New Zealand), and must comply with the requirements, standards and conditions set by the MAIA.<br/>" + "As an MAIA Accredited Martial Arts Instructor, Kickboxing Club Instructors are bound by the MAIA National Code of Practice for Martial Arts Instructors and the MAIA Risk Management Policy.<br/>" + "Chief Instructor: Kacey Chong(MAIA Accredited Martial Arts Instructor)<br/>" + "Senior Instructor: Robert M.Halaijian(MAIA Accredited Martial Arts Instructor)<br/>" + "Instructor: Zheng Chong(MAIA Accredited Martial Arts Instructor)<br/>" + "Instructor: Fam Chong(MAIA Accredited Martial Arts Instructor)<br/>" + "Apprentice Instructor – Level 1: Daniel Whyte(undergoing MAIA Accreditation)<br/>" + "Apprentice Instructor – Level 1: Angelo Perera(undergoing MAIA Accreditation)<br/>" + "Apprentice Instructor – Level 1: Anthony Lam(undergoing MAIA Accreditation)<br/>");
        mkb.contact("Join the Monash University Kickboxing Group on Facebook to keep in touch with other Club Members, and get all the latest updates on Club News & Events.<br/>" + "http://www.monashkickboxing.com/ <br/>" + "Information, Photos and Kickboxing news <br/ > " + "Stay up - to - date with Monash Kickboxing! <br/ > " + "2013 Training Times:    <br/ > " + "2 classes per week over 40 weeks <br/ > " + "Tuesday	7:30pm - 9:00pm All Levels <br/ > " + "Thursday	7:30pm - 9:00pm All Levels <br/ >" + "2013 Fees: <br/ > " + "--Membership <br/ > " + "Monash Students: $265(Semester / 5mths) $480(Annual / 10mths) <br/ > " + "General Public: $385(Semester / 5mths) $699(Annual / 10mthsl) <br/ > " + "Club Equipment Provided: Focus mitts, Kickshields, Muay Thai pads, Headguards, skipping ropes.<br/ > " + "* POST HERE IF YOU WISH TO RESERVE EQUIPMENT TO PURCHASE IN CLASS.*<br/ > " + "2013 Training Venue:<br/ > " + "Martial Arts Hall, Sports and Recreation Centre <br/ > " + "Monash Unversity, Clayton VIC 3800 <br/ > " + "Melways 70 G11 <br/ > " + "For more info visit www.monashkickboxing.com or contact Chief Instructor Kacey Chong at kacey@monashkickboxing.com <br/ >");

        mkb.products.push(new ProductVM("7-Day Free Trial", "Free X Day trial available only to new students and for a limited time. Join now to find out the many benefits to offer at monash kickboxing!", "Free", "Special Offer", mkb.receipt));

        mkb.products.push(new ProductVM("1 Semester Student Membership", "For a Monash Student signing up for an Semester Membership, the training fee works out to be around $6 per class (based on 2 classes per week over 5 months). General Public Semester Membership would work out to be about $9 per class.", "$265", "Membership", mkb.receipt));

        mkb.products.push(new ProductVM("T-shirt / Singlet", "Please see a Committee Member in class to order and make payment for your Uniform within 2 weeks of signing up for your Semester or Annual Membership.", "$30", "Clothing", mkb.receipt));

        mkb.products.push(new ProductVM("Long Training Pants", "Please see a Committee Member in class to order and make payment for your Uniform within 2 weeks of signing up for your Semester or Annual Membership.", "$50", "Clothing", mkb.receipt));

        mkb.products.push(new ProductVM("Muay Thai Shorts", "Please see a Committee Member in class to order and make payment for your Uniform within 2 weeks of signing up for your Semester or Annual Membership.", "$50", "Clothing", mkb.receipt));

        this.homeVM.profiles.push(mkb);
    };

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
            var prof = _.find(_this.homeVM.profiles(), function (profile) {
                return profile.name == id;
            });

            _this.profileVM(prof);

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

/// <reference path="rootvm.ts" />
var ko,$:any;



function ensureTemplates(list) {
    var loadedTemplates = [];
    ko.utils.arrayForEach(list, function(name) {
        $.get("content/templates/" + name + ".html", function(template) {
            $("body").append("<script id=\"" + name + "\" type=\"text/html\">" + template + "<\/script>");
            loadedTemplates.push(name);
            if (list.length === loadedTemplates.length) {
                ko.applyBindings(rootVM);
            }
        });
    });
}
                                                                                            

$(function() {
    ensureTemplates([
        "home/homeTemplate",
        "home/footerTemplate",
        "profile/profileTemplate",
    ]);
});

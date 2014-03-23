/// <reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../../Scripts/typings/knockout/knockout.d.ts" />
ko.bindingHandlers['dropZone'] = {
    init: function (elem, valueAccessor) {
        $(elem).dropzone({
            url: "/api/upload",
            dictDefaultMessage: ""
        });
    }
};

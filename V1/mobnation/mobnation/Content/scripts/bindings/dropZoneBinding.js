/// <reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../../Scripts/typings/knockout/knockout.d.ts" />

Dropzone.autoDiscover = false;
ko.bindingHandlers['dropZone'] = {
    init: function (elem, valueAccessor) {
        $(elem).dropzone({
            url: "/api/upload",
            dictDefaultMessage: "",
            parallelUploads: true,
            uploadMultiple: false
        });
        var myDropzone = Dropzone.forElement(elem);
        myDropzone.on("complete", function (file) {
            var data = JSON.parse(file.xhr.response);

            $(valueAccessor()).attr("src", "https://mobnation.s3-ap-southeast-2.amazonaws.com/assets/profiles/monashkickboxing/" + data[0]);
        }).on("error", function () {
            alert("ERR");
        });
    }
};

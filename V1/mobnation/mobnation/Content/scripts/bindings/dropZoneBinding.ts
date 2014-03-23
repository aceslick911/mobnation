/// <reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../../Scripts/typings/knockout/knockout.d.ts" />
declare var Dropzone: any;



Dropzone.autoDiscover = false;
ko.bindingHandlers['dropZone'] = {
    init: function (elem, valueAccessor) {
        (<any> $(elem)).dropzone({
            url: "/api/upload",
            dictDefaultMessage: "",
            parallelUploads: true,
            uploadMultiple: false,


        });
        var myDropzone = Dropzone.forElement(elem);
        myDropzone.on("complete", (file) => {
            var data = JSON.parse(file.xhr.response);

            $(valueAccessor()).attr("src", "https://mobnation.s3-ap-southeast-2.amazonaws.com/assets/profiles/monashkickboxing/" + data[0]);

        }).on("error", () => {
                alert("ERR");
            });
    }
};
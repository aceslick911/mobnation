/// <reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../../Scripts/typings/knockout/knockout.d.ts" />
ko.bindingHandlers['signaturePad'] = {
    init: function (elem, valueAccessor) {
        $(elem).signaturePad({
            drawOnly: true,
            onDrawEnd: function () {
                if (valueAccessor) {
                    valueAccessor()($(elem).signaturePad().getSignature());
                }
            }
        });
    }
};

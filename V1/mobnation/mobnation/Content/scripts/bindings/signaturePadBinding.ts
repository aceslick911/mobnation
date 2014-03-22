/// <reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../../Scripts/typings/knockout/knockout.d.ts" />


ko.bindingHandlers['signaturePad'] = {
    init: function (elem, valueAccessor) {
        (<any> $(elem)).signaturePad({
            drawOnly: true,
            onDrawEnd: () => {
                if (valueAccessor) {
                    (<any>valueAccessor)()( (<any> $(elem)).signaturePad().getSignature());
                }            
            }
        });
    }
};
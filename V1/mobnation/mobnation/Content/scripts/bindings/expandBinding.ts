/// <reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../../Scripts/typings/knockout/knockout.d.ts" />

var _lastExpanded = null;
var _lastDummy = null;




ko.bindingHandlers['expandMore'] = {
    init: function (elem: HTMLElement, valueAccessor) {


        //Detect overflow
        if ($(elem)[0].scrollWidth > $(elem).width() || $(elem)[0].scrollHeight > $(elem).height()) {
            $(elem).addClass("overflowed");
        }


        var parent = elem.parentNode;

        $(elem).find(".more-toggle").on("click", () => {

            var expanded = $(elem).attr("class").indexOf("expanded") != -1;

            if (_lastExpanded != null) {
                _lastExpanded.animate({
                    height: _lastDummy.height(),
                    width: _lastDummy.outerWidth(),
                    top: _lastDummy.offset().top - 5,
                    left: _lastDummy.offset().left - 5,
                }, (valueAccessor().duration == null ? 200 : valueAccessor().duration), () => {

                        _lastExpanded.detach().attr("style", "").insertAfter(_lastDummy).removeClass("expanded");
                        _lastDummy.remove();

                        _lastExpanded = null;
                        _lastDummy = null;
                    });
            }

            if (!expanded) {


                //EXPAND
                var dummy = $(elem).clone().insertAfter($(elem)).css({"visibility":"hidden" });
                _lastDummy = dummy;


                var expander = $(elem).detach();
                _lastExpanded = expander;

                expander.css({
                    position: 'absolute',
                    top: dummy.offset().top - 5,
                    left: dummy.offset().left - 5,
                    width: dummy.outerWidth() ,
                    height: dummy.height(),
                }).animate({
                    height: _lastDummy.height() + (valueAccessor().height == null ? 0 : valueAccessor().height),
                    width: _lastDummy.width() + 2 + (valueAccessor().width == null ? 0 : valueAccessor().width),
                    top: _lastDummy.offset().top - 5 + (valueAccessor().top == null ? 0 : valueAccessor().top),
                    left: _lastDummy.offset().left - 5 + (valueAccessor().left == null ? 0 : valueAccessor().left),
                }, (valueAccessor().duration == null ? 200 : valueAccessor().duration)).addClass("expanded");

                $("body").append(expander);

            } else {
             //Contract


            }
        });
    }
};
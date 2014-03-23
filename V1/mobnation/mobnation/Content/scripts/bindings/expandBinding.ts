/// <reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../../Scripts/typings/knockout/knockout.d.ts" />

var _lastExpanded = null;
var _lastDummy = null;

var _aniExpand = null;
var _aniDummy = null;


function _collapseLast(duration, selectors) {
    if (_lastExpanded != null) {

        _aniExpand = _lastExpanded;
        _aniDummy = _lastDummy;
        _lastExpanded = null;
        _lastDummy = null;

        _aniExpand.animate({
            height: _aniDummy.height() + 15,
            width: _aniDummy.outerWidth(),
            top: _aniDummy.offset().top - 5,
            left: _aniDummy.offset().left - 5,
        }, duration, 'linear', () => {

            _aniExpand.detach().attr("style", "").insertAfter(_aniDummy).removeClass("expanded").find(selectors).focus();
                _aniDummy.remove();

            });
    }
}

function _expandActive(elem: HTMLElement, selectors:string, height: number, width: number, top: number, left: number, duration: number) {


        var expanded = $(elem).attr("class").indexOf("expanded") != -1;
        if (!expanded) {

            //EXPAND
            var dummy = $(elem).clone().insertAfter($(elem)).css({ "visibility": "hidden" });
            _lastDummy = dummy;


            var expander = $(elem).detach();
            _lastExpanded = expander;

            expander.css({
                position: 'absolute',
                top: dummy.offset().top - 5,
                left: dummy.offset().left - 5,
                width: dummy.outerWidth(),
                height: dummy.height(),
            }).animate({
                    height: _lastDummy.height() + height,
                    width: _lastDummy.width() + 2 + width,
                    top: _lastDummy.offset().top - 5 + top,
                    left: _lastDummy.offset().left - 5 + left,
                }, duration, 'linear', () => {
                    $(elem).find(selectors).focus();
                    expander.addClass("expanded");
                });

            $("body").append(expander);

        };
}

function _toggleExpand(elem: HTMLElement, selectors:string, height: number, width: number, top: number, left: number, duration: number) {

    _collapseLast(duration, selectors);

    $(elem).on("click", selectors, () => {
        _collapseLast(duration, selectors);
        _expandActive(elem, selectors,height, width, top, left, duration);

    });

}


ko.bindingHandlers['expandMore'] = {
    init: function (elem: HTMLElement, valueAccessor) {


        //Detect overflow
        if ($(elem)[0].scrollWidth > $(elem).width() || $(elem)[0].scrollHeight > $(elem).height()) {
            $(elem).addClass("overflowed");
        }

        var target = valueAccessor().target != null ? valueAccessor().target() : "";

        _toggleExpand(elem, (valueAccessor().selectors == null ? ".more-toggle" : valueAccessor().selectors),
            (valueAccessor().height == null ? 0 : valueAccessor().height),
            (valueAccessor().width == null ? 0 : valueAccessor().width),
            (valueAccessor().top == null ? 0 : valueAccessor().top),
            (valueAccessor().left == null ? 0 : valueAccessor().left),
            (valueAccessor().duration == null ? 200 : valueAccessor().duration));
        
    },
    update: function (elem: HTMLElement, valueAccessor) {
       
    }
};
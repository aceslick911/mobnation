/// <reference path="../../Scripts/typings/underscore/underscore.d.ts" />
var ProfileVM = (function () {
    function ProfileVM(profileId) {
        this.ProfileID = profileId;

        this.receipt = new ReceiptVM();
    }
    return ProfileVM;
})();

var ReceiptVM = (function () {
    function ReceiptVM() {
        var _this = this;
        this.receiptActive = ko.observable(false);
        this.receiptExpanded = ko.observable(false);
        this.recName = ko.observable("");
        this.recEmail = ko.observable("");
        this.isName = ko.observable("");
        this.sigData = ko.observable("");
        this.items = ko.observableArray([]);
        this.items([new receiptItem("Test", 5)]);

        this.totalQty = ko.computed(function () {
            var val = 0;
            _.forEach(_this.items(), function (item) {
                val = val + item.qty();
            });
            return val;
        });
        this.totalCost = ko.computed(function () {
            var val = 0;
            _.forEach(_this.items(), function (item) {
                val = val + item.cost();
            });
            return val;
        });
    }
    ReceiptVM.prototype.clearReceipt = function () {
        this.recName("");
        this.recEmail("");
        this.isName("");
        this.sigData("");
        this.items([]);
    };

    ReceiptVM.prototype.sendReceipt = function () {
    };
    return ReceiptVM;
})();

var receiptItem = (function () {
    function receiptItem(name, cost) {
        var _this = this;
        this.qty = ko.observable(1);
        this.price = cost;
        this.name = name;

        this.cost = ko.computed(function () {
            return _this.qty() * _this.price;
        });
    }
    return receiptItem;
})();

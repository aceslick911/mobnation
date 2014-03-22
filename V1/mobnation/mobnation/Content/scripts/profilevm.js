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
                val = Number(val + item.qty());
            });
            return val;
        });
        this.totalCost = ko.computed(function () {
            var val = 0;
            _.forEach(_this.items(), function (item) {
                val = Number(val + item.cost());
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
        this.receiptExpanded(false);
        this.receiptActive(false);
    };

    ReceiptVM.prototype.receiptData = function () {
        return {
            items: _.map(this.items(), function (item) {
                return {
                    name: item.name,
                    qty: item.qty(),
                    price: item.price,
                    cost: item.cost()
                };
            }),
            recName: this.recName(),
            recEmail: this.recEmail(),
            isName: this.isName(),
            isSig: this.sigData()
        };
    };

    ReceiptVM.prototype.sendReceipt = function () {
        var _this = this;
        $.ajax({
            url: "/api/values",
            cache: false,
            type: 'POST',
            data: JSON.stringify(this.receiptData()),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (response) {
                alert("Done!");
                _this.clearReceipt();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("Error sending receipt");
            }
        });
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
    receiptItem.prototype.minusOne = function () {
        this.qty(Math.max(1, Number(this.qty() - 1)));
    };
    receiptItem.prototype.plusOne = function () {
        this.qty(Number(this.qty() + 1));
    };
    return receiptItem;
})();

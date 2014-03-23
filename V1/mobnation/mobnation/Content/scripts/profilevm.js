/// <reference path="rootVM.ts" />
/// <reference path="../../Scripts/typings/common.d.ts" />
/*
mobnation.org profile viewmodel
By Angelo Perera March 2014
ProfileVM - Stores the profile state including active receipts and available products.
*/
var ProfileVM = (function () {
    function ProfileVM(name) {
        this.receipt = new ReceiptVM();
        this.newProduct = ko.observable(new ProductVM("", "", "", "", this.receipt));
        this.title = ko.observable("");
        this.header = ko.observable("");
        this.profileLogo = ko.observable("");
        this.aboutLogo = ko.observable("");
        this.contactLogo = ko.observable("");
        this.about = ko.observable("");
        this.contact = ko.observable("");
        this.products = ko.observableArray([]);
        this.name = name;
    }
    ProfileVM.prototype.addProduct = function () {
        this.products.push(this.newProduct());
        this.newProduct(new ProductVM("", "", "", "", this.receipt));
    };

    ProfileVM.prototype.editProduct = function (product) {
        this.newProduct(product);
        this.products.remove(product);
    };

    ProfileVM.prototype.addToReceipt = function (product) {
        var theProduct = _.find(this.receipt.items(), function (receipt) {
            return receipt.product === product;
        });

        if (theProduct != null) {
            theProduct.plusOne();
        } else {
            this.receipt.items.push(new receiptItem(product));
        }
    };
    ProfileVM.prototype.removeFromReceipt = function (product) {
        var theProduct = _.find(this.receipt.items(), function (receipt) {
            return receipt.product === product;
        });

        if (theProduct != null) {
            theProduct.minusOne();
            if (theProduct.qty() == 0) {
                this.receipt.items.remove(theProduct);
            }
        } else {
            this.receipt.items.push(new receiptItem(product));
        }
    };
    return ProfileVM;
})();
var ProductVM = (function () {
    function ProductVM(aName, aDesc, aPrice, aProductType, receipt) {
        var _this = this;
        this.productType = ko.observable("");
        this.name = ko.observable("");
        this.desc = ko.observable("");
        this.price = ko.observable("");
        this.isMode = ko.observable(false);
        this.name(aName);
        this.desc(aDesc);
        this.price(aPrice);
        this.productType(aProductType);

        this.badgeNumber = ko.computed(function () {
            var theProduct = _.find(receipt.items(), function (rec) {
                return rec.product === _this;
            });

            if (theProduct == null) {
                return 0;
            } else {
                return theProduct.qty();
            }
        });
    }
    return ProductVM;
})();

var ReceiptVM = (function () {
    function ReceiptVM() {
        var _this = this;
        this.receiptExpanded = ko.observable(false);
        this.recName = ko.observable("");
        this.recEmail = ko.observable("");
        this.isName = ko.observable("");
        this.sigData = ko.observable([]);
        this.items = ko.observableArray([]);
        this.items([]);

        this.totalQty = ko.computed(function () {
            var val = 0;
            _.forEach(_this.items(), function (item) {
                val = Number(val + parseInt("0" + item.qty(), 10));
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
        this.receiptActive = ko.computed(function () {
            return _this.totalQty() > 0;
        });
    }
    ReceiptVM.prototype.clearReceipt = function () {
        this.recName("");
        this.recEmail("");
        this.isName("");
        this.sigData([]);
        this.items([]);
        this.receiptExpanded(false);
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
            isSig: this.sigData(),
            clubName: rootVM.profileVM().name,
            profileLogo: rootVM.profileVM().profileLogo(),
            total: String(this.totalCost())
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
    function receiptItem(aProduct) {
        var _this = this;
        this.qty = ko.observable(1);
        this.product = aProduct;
        this.price = isNaN(parseFloat(aProduct.price().replace("$", ""))) ? 0 : parseFloat(aProduct.price().replace("$", ""));
        this.name = aProduct.name();

        this.cost = ko.computed(function () {
            return parseInt(String(_this.qty()), 10) * parseFloat(String(_this.price));
        });
    }
    receiptItem.prototype.minusOne = function () {
        this.qty(Math.max(0, Number(this.qty() - 1)));
    };
    receiptItem.prototype.plusOne = function () {
        this.qty(Number(this.qty() + 1));
    };
    return receiptItem;
})();

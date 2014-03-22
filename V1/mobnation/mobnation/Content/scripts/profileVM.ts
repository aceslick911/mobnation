/// <reference path="../../Scripts/typings/underscore/underscore.d.ts" />
class ProfileVM {

    public ProfileID: string;

    public receipt: ReceiptVM;

    constructor(profileId: any) {

        this.ProfileID = profileId;

        this.receipt = new ReceiptVM();


    }
}


class ReceiptVM {

    receiptActive = ko.observable(false);
    receiptExpanded = ko.observable(false);
    

    recName = ko.observable("");
    recEmail = ko.observable("");
    isName = ko.observable("");
    sigData = ko.observable("");

    items = ko.observableArray<receiptItem>([]);

    totalQty: KnockoutComputed<number>;
    totalCost: KnockoutComputed<number>;

    constructor() {
        this.items([new receiptItem("Test", 5)]);

        this.totalQty = ko.computed(() => {
            var val = 0;
            _.forEach(this.items(), (item: receiptItem) => {
                val = val + item.qty();
            });
            return val;
        });
        this.totalCost = ko.computed(() => {
            var val = 0;
            _.forEach(this.items(), (item: receiptItem) => {
                val = val + item.cost();
            });
            return val;
        });
    }

    clearReceipt() {
        this.recName("");
        this.recEmail("");
        this.isName("");
        this.sigData("");
        this.items([]);
    }

    sendReceipt() {
    }
}

class receiptItem {
    name: string;
    qty = ko.observable(1);
    price: number;
    cost: KnockoutComputed<number>;


    constructor(name: string, cost: number) {
        this.price = cost;
        this.name = name;


        this.cost = ko.computed(() => {
            return this.qty() * this.price;
        });
    }

}
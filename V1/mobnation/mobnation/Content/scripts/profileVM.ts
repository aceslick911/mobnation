/// <reference path="../../Scripts/typings/common.d.ts" />

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
    sigData: KnockoutObservable< MNE.SigData[]> = ko.observable([]);

    items = ko.observableArray<receiptItem>([]);

    totalQty: KnockoutComputed<number>;
    totalCost: KnockoutComputed<number>;

    constructor() {
        this.items([new receiptItem("Test", 5)]);

        this.totalQty = ko.computed(() => {
            var val = 0;
            _.forEach(this.items(), (item: receiptItem) => {
                val = Number(val + item.qty());
            });
            return val;
        });
        this.totalCost = ko.computed(() => {
            var val = 0;
            _.forEach(this.items(), (item: receiptItem) => {
                val = Number(val + item.cost());
            });
            return val;
        });
    }

    clearReceipt() {
        this.recName("");
        this.recEmail("");
        this.isName("");
        this.sigData([]);
        this.items([]);
        this.receiptExpanded(false);
        this.receiptActive(false);
    }

    receiptData(): MNE.ReceiptData {
        return {
            items: _.map(this.items(), (item: receiptItem) => {
                return <MNE.ReceiptItem>{
                    name: item.name,
                    qty: item.qty(),
                    price: item.price,
                    cost: item.cost()
                };
            } ),
            recName: this.recName(),
            recEmail: this.recEmail(),
            isName: this.isName(),
            isSig: this.sigData()
        };
    }

    sendReceipt() {

        $.ajax({
            url: "/api/values",
            cache: false,
            type: 'POST',
            data: JSON.stringify(this.receiptData()),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success:  (response)=> {
                alert("Done!");
                this.clearReceipt();
            },
            error:  (xhr, ajaxOptions, thrownError)=> {

                alert("Error sending receipt");
            }
        });


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

    minusOne() {
        this.qty(Math.max(1, Number(this.qty() - 1)));
    }
    plusOne() {
        this.qty(Number(this.qty() + 1));

    }

}
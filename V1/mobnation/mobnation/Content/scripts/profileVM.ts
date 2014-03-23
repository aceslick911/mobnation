/// <reference path="rootVM.ts" />
/// <reference path="../../Scripts/typings/common.d.ts" />
        
/*

mobnation.org profile viewmodel
By Angelo Perera March 2014

ProfileVM - Stores the profile state including active receipts and available products.

*/
class ProfileVM {

    public name: string;

    public receipt: ReceiptVM = new ReceiptVM();

    public newProduct = ko.observable( new ProductVM("", "", "", "", this.receipt) );

    public title = ko.observable("");
    public header = ko.observable("");
    public profileLogo = ko.observable("");
    public aboutLogo = ko.observable("");
    public contactLogo = ko.observable("");

    public about = ko.observable("");

    public contact = ko.observable("");

    public products: KnockoutObservableArray<ProductVM> = ko.observableArray<ProductVM>([]);

    constructor(name: string) {

        this.name = name;

        
    }

    addProduct() {
        this.products.push(this.newProduct());
        this.newProduct(new ProductVM("", "", "", "", this.receipt));
    }

    editProduct(product: ProductVM) {
        this.newProduct(product);                                       
        this.products.remove(product);
    }

    addToReceipt(product: ProductVM) {

        var theProduct = _.find(this.receipt.items(), receipt=> receipt.product === product);

        if (theProduct != null) {
            theProduct.plusOne();
        } else {

            this.receipt.items.push( new receiptItem( product));
        }

    }
    removeFromReceipt(product: ProductVM) {

        var theProduct = _.find(this.receipt.items(), receipt=> receipt.product === product);

        if (theProduct != null) {
            theProduct.minusOne();
            if(theProduct.qty()==0){

                this.receipt.items.remove(theProduct);

            }
        } else {

            this.receipt.items.push(new receiptItem(product));
        }
    }


}
class ProductVM {

    public productType = ko.observable("");
    public name = ko.observable("");
    public desc = ko.observable("");
    public price = ko.observable("");
    public isMode = ko.observable(false);

    public badgeNumber: KnockoutComputed<number>;

    constructor(aName:string, aDesc:string, aPrice:string, aProductType:string, receipt:ReceiptVM) {
        this.name(aName);
        this.desc(aDesc);
        this.price(aPrice);
        this.productType(aProductType);

        this.badgeNumber = ko.computed(() => {
            var theProduct = _.find(receipt.items(), rec=> rec.product === this);

            if (theProduct == null) {
                return 0;
            } else {
                return theProduct.qty();
            }

        });
    }
}

class ReceiptVM {

    receiptActive: KnockoutComputed<boolean>;
    receiptExpanded = ko.observable(false);
    

    recName = ko.observable("");
    recEmail = ko.observable("");
    isName = ko.observable("");
    sigData: KnockoutObservable< MNE.SigData[]> = ko.observable([]);

    items = ko.observableArray<receiptItem>([]);

    totalQty: KnockoutComputed<number>;
    totalCost: KnockoutComputed<number>;

    constructor() {
        this.items([]);

        this.totalQty = ko.computed(() => {
            var val = 0;
            _.forEach(this.items(), (item: receiptItem) => {
                val = Number(val + parseInt("0" + item.qty(), 10));
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
        this.receiptActive = ko.computed(() => {
            return this.totalQty() > 0;
        });
    }

    clearReceipt() {
        this.recName("");
        this.recEmail("");
        this.isName("");
        this.sigData([]);
        this.items([]);
        this.receiptExpanded(false);
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
            isSig: this.sigData(),
            clubName: rootVM.profileVM().name,
            profileLogo: rootVM.profileVM().profileLogo(),
            total: String(this.totalCost()),
            
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

    product: ProductVM;


    constructor(aProduct: ProductVM) {
        this.product = aProduct;
        this.price = isNaN(parseFloat(aProduct.price().replace("$", "")) ) ? 0 : parseFloat(aProduct.price().replace("$",""));
        this.name = aProduct.name();


        this.cost = ko.computed(() => {
            return parseInt(String(this.qty()), 10) * parseFloat(String(this.price));
        });
    }

    minusOne() {
        this.qty(Math.max(0, Number(this.qty() - 1)));
    }
    plusOne() {
        this.qty(Number(this.qty() + 1));

    }

}
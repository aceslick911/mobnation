using System.Collections.Generic;
using T4TS;

namespace EmailEntities
{

 
    [TypeScriptInterface]
    public class ReceiptItem 
    {
        public string name { get; set; }
        public double qty { get; set; }
        public double price { get; set; }
        public double cost { get; set; }
    }

    [TypeScriptInterface]
    public class SigData 
    {
        public int lx { get; set; }
        public int ly { get; set; }
        public int mx { get; set; }
        public int my { get; set; }
    }

 
    [TypeScriptInterface]
    public class ReceiptData
    {
        public List<ReceiptItem> items { get; set; }
        public string recName { get; set; }
        public string recEmail { get; set; }
        public string isName { get; set; }
        public List<SigData> isSig { get; set; }


        public string profileLogo { get; set; }
        public string clubName { get; set; }
        public string total { get; set; }
    }
}

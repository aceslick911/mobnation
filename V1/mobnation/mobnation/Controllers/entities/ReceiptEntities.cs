using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using T4TS;

namespace mobnation
{

    public interface IReceiptItem
    {
        string name { get; set; }

        double qty { get; set; }
        double price { get; set; }
        double cost { get; set; }
    }
    [TypeScriptInterface]
    public class ReceiptItem : IReceiptItem
    {
        public string name { get; set; }
        public double qty { get; set; }
        public double price { get; set; }
        public double cost { get; set; }
    }

    public interface ISigData
    {
        int lx { get; set; }
        int ly { get; set; }
        int mx { get; set; }
        int my { get; set; }
    }
    [TypeScriptInterface]
    public class SigData : ISigData
    {
        public int lx { get; set; }
        public int ly { get; set; }
        public int mx { get; set; }
        public int my { get; set; }
    }

    public interface IReceiptData
    {

        List<ReceiptItem> items { get; set; }
        string recName { get; set; }
        string recEmail { get; set; }
        string isName { get; set; }
        List<SigData> isSig { get; set; }

    }
    [TypeScriptInterface]
    public class ReceiptData : IReceiptData
    {
        public List<ReceiptItem> items { get; set; }
        public string recName { get; set; }
        public string recEmail { get; set; }
        public string isName { get; set; }
        public List<SigData> isSig { get; set; }
    }
}

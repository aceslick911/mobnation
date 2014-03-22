using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace EmailEntities
{

    public interface IReceiptItem
    {
        string name { get; set; }

        string qty { get; set; }
        string price { get; set; }
        string cost { get; set; }
    }

    public class ReceiptItem : IReceiptItem
    {
        public string name { get; set; }
        public string qty { get; set; }
        public string price { get; set; }
        public string cost { get; set; }
    }

    public interface ISigData
    {
        int lx { get; set; }
        int ly { get; set; }
        int mx { get; set; }
        int my { get; set; }
    }

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

    public class ReceiptData : IReceiptData
    {
        public List<ReceiptItem> items { get; set; }
        public string recName { get; set; }
        public string recEmail { get; set; }
        public string isName { get; set; }
        public List<SigData> isSig { get; set; }
    }
}

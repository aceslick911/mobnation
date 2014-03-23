using System;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace mobnation.Tests.Helpers
{
    [TestClass]
    public class PDF
    {
        [TestMethod]
        public void TestPDFGenerate()
        {
            var error = "";
            var result = false;
            try
            {
                var vals = new List<KeyValuePair<string, string>>();
                
                vals.Add(new KeyValuePair<string, string>("ReceiptDate","123"));
                vals.Add(new KeyValuePair<string, string>("ReceiptNumber","123"));
                vals.Add(new KeyValuePair<string, string>("ClubLogo", @"https://mobnation.s3-ap-southeast-2.amazonaws.com/assets/profiles/monashkickboxing/kacey-image.jpg"));

                MobnationHelpers.PDF.WritePDFToFile(@"c:\Git\MobNation\V1\mobnation\MobnationHelpers\mobnation-receipt.rdl", vals, @"c:\Git\MobNation\V1\mobnation\MobnationHelpers\output.pdf");
                result = true;
            }
            catch (Exception e)
            {
                error = e.Message;
            }
            Assert.IsTrue(result, "Failed to generate PDF:" + error);
        }
    }
}

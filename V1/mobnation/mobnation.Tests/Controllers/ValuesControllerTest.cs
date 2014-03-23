using System;
using System.Collections.Generic;
using EmailEntities;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using mobnation.Controllers;

namespace mobnation.Tests.Controllers
{
    [TestClass]
    public class ValuesControllerTest
    {

        [TestMethod]
        public void Post()
        {

            var error = "";
            var result = false;
            try
            {

                // Arrange
                ValuesController controller = new ValuesController();

                // Act
                controller.Post(new ReceiptData()
                {
                    clubName = "TestClub",
                    isName = "Test Issuer",
                    recName = "Test Recipient",
                    recEmail = "angeloperera@gmail.com",
                    isSig = new List<SigData>(),
                    items = new List<ReceiptItem>()
                    {
                        new ReceiptItem()
                        {
                            cost = 1,
                            name = "a item",
                            price = 1,
                            qty = 1
                        }
                    }
                });
            }
            catch (Exception e)
            {
                error = e.Message;
            }    
        

        // Assert
            Assert.IsTrue(result, "Error with Receipt API " + error);
        }

        
    }
}

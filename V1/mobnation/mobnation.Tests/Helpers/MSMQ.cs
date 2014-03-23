using System;
using EmailEntities;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MobnationHelpers;

namespace mobnation.Tests.Helpers
{
    [TestClass]
    public class MSMQ
    {
        [TestMethod]
        public void QueueMessage()
        {
            var error = "";
            var result = false;
            try
            {
                result = MSMQHelpers.QueueMessage(new EmailMessage()
                {
                    To = "test",
                    From = "test",
                    Subject = "test",
                    Body = "test",
                });
            }
            catch (Exception e)
            {
                error = e.Message;
            }
            Assert.IsTrue(result,"Failed to queue message to MSMQ:"+ error);
        }
    }
}

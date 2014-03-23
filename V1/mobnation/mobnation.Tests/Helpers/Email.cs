using System;
using EmailEntities;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MobnationHelpers;

namespace mobnation.Tests.Helpers
{
    [TestClass]
    public class Email
    {
        [TestMethod]
        public void SendEmail()
        {
            var error = "";
            var result = false;
            try
            {
                result = MobnationHelpers.Email.SendEmail(new EmailMessage()
                {
                    To = "angeloperera@gmail.com",
                    From = "angeloperera@gmail.com",
                    Subject = "test email",
                    Body = "test email",
                });
            }
            catch (Exception e)
            {
                error = e.Message;
            }
            Assert.IsTrue(result, "Failed to send email: "+error);
        }
    }
}

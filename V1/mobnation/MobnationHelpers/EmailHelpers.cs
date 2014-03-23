using System;
using System.Configuration;
using System.Net;
using System.Net.Mail;
using EmailEntities;

namespace MobnationHelpers
{
    public static class Email
    {
        public static bool SendTestEmail()
        {
            var error = "";
            var result = false;
            try
            {
                result = MobnationHelpers.Email.SendEmail(new EmailMessage()
                {
                    To = "angeloperera@gmail.com",
                    From = "angeloperera@gmail.com",
                    Subject = "Email Service Test Email",
                    Body = "System is booting up and verifying email capability",
                });
            }
            catch (Exception e)
            {
                error = e.Message;
            }

            if (!result)
            {
                Console.WriteLine("Failed to send email: " + error);
            }
            else
            {
                Console.WriteLine("Sent successfully");
            }
            return result;

        }

        public static bool SendEmail(EmailEntities.EmailMessage emailMsg)
        {
            MailMessage MyMailMessage = new MailMessage();

            MyMailMessage.From = new MailAddress("angeloperera@gmail.com");
            MyMailMessage.Sender = new MailAddress("angeloperera@gmail.com");
            MyMailMessage.To.Add(emailMsg.To);
            MyMailMessage.Subject = emailMsg.Subject;
            MyMailMessage.IsBodyHtml = true;
            MyMailMessage.Body = emailMsg.Body;

            SmtpClient SMTPServer = new SmtpClient("smtp.gmail.com", 587);
            SMTPServer.Port = 587;
            SMTPServer.EnableSsl = true;
            SMTPServer.Timeout = 10000;
            SMTPServer.DeliveryMethod = SmtpDeliveryMethod.Network;
            SMTPServer.UseDefaultCredentials = false;
            SMTPServer.Credentials = new NetworkCredential(ConfigurationManager.AppSettings["Username"], ConfigurationManager.AppSettings["Password"]);
            Console.WriteLine("Authentication:"+ConfigurationManager.AppSettings["Username"]+ ConfigurationManager.AppSettings["Password"]);

            SMTPServer.Send(MyMailMessage);

            return true;
        }


    }


}

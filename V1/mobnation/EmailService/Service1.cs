using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Messaging;
using System.ServiceProcess;
using System.Text;
using System.Threading;
using EmailEntities;

namespace EmailService
{
    public partial class Service1 : ServiceBase
    {
        public Service1()
        {
            InitializeComponent();

            this.ServiceName = "MobnationEmailService";
            this.EventLog.Log = "Application";

            // These Flags set whether or not to handle that specific
            //  type of event. Set to true if you need it, false otherwise.
            this.CanHandlePowerEvent = true;
            this.CanHandleSessionChangeEvent = true;
            this.CanPauseAndContinue = true;
            this.CanShutdown = true;
            this.CanStop = true;
        }

        protected override void OnStart(string[] args)
        {
            sendEmail();


        }

        protected override void OnStop()
        {
        }


        private void sendEmail()
        {
            //fill mail message obj with TO,From,Body sub etc
            //Assuming user enters mail id's in proper format.
            //MailMessage emailMesage = new MailMessage();
            //emailMesage.To.Add(new MailAddress(txtTo.Text));
            //emailMesage.From = new MailAddress(txtFrom.Text);
            //emailMesage.Subject = txtSubject.Text;
            //emailMesage.Body = txtBody.Text;
            EmailEntities.EmailMessage objEmail = new EmailMessage();
            objEmail.To = "test1";
            objEmail.From = "test2";
            objEmail.Subject = "test3";
            objEmail.Body = "test4";

            QueueMessage(objEmail);
        }

        public void QueueMessage(EmailEntities.EmailMessage emailMessage)
        {
            try
            {
                if (emailMessage == null)
                {
                    return;
                }
                string msmqQueuePath = @".\Private$\EmailQueue";
                Message msmqMsg = new Message();
                msmqMsg.Body = emailMessage;
                msmqMsg.Recoverable = true;
                msmqMsg.Formatter = new BinaryMessageFormatter();
                MessageQueue msmqQueue = new MessageQueue();
                //If the Message queue does not exists at specified location create it
                if (!MessageQueue.Exists(msmqQueuePath))
                {
                    msmqQueue = MessageQueue.Create(msmqQueuePath);
                }
                else
                {
                    msmqQueue = new MessageQueue(msmqQueuePath);
                }
                msmqQueue.Formatter = new BinaryMessageFormatter();
                msmqQueue.Send(msmqMsg);

            }
            catch (Exception oEx)
            {
                throw oEx;
            }


        }

        private static MessageQueue _msmqQueue = null;
        private static object _objLock = new object();

        private static void GetMailMessages()
        {
            try
            {
                string messageQueuePath = @".\private$\EmailQueue";
                _msmqQueue = new MessageQueue(messageQueuePath);
                _msmqQueue.Formatter = new BinaryMessageFormatter();
                _msmqQueue.MessageReadPropertyFilter.SetAll();
                _msmqQueue.ReceiveCompleted += new ReceiveCompletedEventHandler(msmqQueue_ReceiveCompleted);
                _msmqQueue.BeginReceive();
                Console.WriteLine("Enter 'A' to Exit ");
                while (Console.ReadKey().Key != ConsoleKey.A)
                {
                    Thread.Sleep(0);
                }

            }
            catch (Exception oEx)
            {
                Console.WriteLine(oEx.Message);
                Console.ReadKey();
            }
        }

        /// <summary>
        /// Handles the ReceiveCompleted event of the msmq Queue request.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.Messaging.ReceiveCompletedEventArgs"/> instance containing the event data.</param>
        static void msmqQueue_ReceiveCompleted(object sender, ReceiveCompletedEventArgs e)
        {
            try
            {
                lock (_objLock)
                {
                    EmailEntities.EmailMessage emailMsg = (EmailEntities.EmailMessage)e.Message.Body;
                    Console.WriteLine("Received message is " + emailMsg.Body);
                    //fill mail message obj with TO,From,Body sub etc
                    //Assuming user enters mail id's in proper format.
                    //MailMessage mailMesage = new MailMessage();
                    //mailMesage.To.Add(new MailAddress(emailMsg.To));
                    //mailMesage.From = new MailAddress(emailMsg.From);
                    //mailMesage.Subject = emailMsg.Subject;
                    //mailMesage.Body = emailMsg.Body;
                    //try
                    //{
                    //    SmtpClient oclient = new SmtpClient();
                    //    oclient.DeliveryMethod = SmtpDeliveryMethod.SpecifiedPickupDirectory;
                    //    oclient.Send(mailMesage);
                    //}
                    //catch (Exception oEx)
                    //{
                    //    Console.WriteLine(oEx.Message);
                    //}

                }
            }
            catch (Exception oEx)
            {
                Console.WriteLine(oEx.Message);
            }


        }

    }
}

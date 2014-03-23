using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Messaging;
using System.Net;
using System.Net.Mail;
using System.ServiceProcess;
using System.Text;
using System.Threading;
using EmailEntities;
using MobnationHelpers;

namespace EmailService
{
    public partial class MobNationEmailService : ServiceBase
    {


        private static MessageQueue _msmqQueue = null;
        private static object _objLock = new object();

        public MobNationEmailService()
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
            initializeLogging();
            Email.SendTestEmail();
            MonitorMailQueue();


        }

        protected override void OnStop()
        {
        }


        private static void initializeLogging()
        {
            FileStream filestream = new FileStream(@"c:\inetpub\log.txt", FileMode.OpenOrCreate);
            var streamwriter = new StreamWriter(filestream);
            streamwriter.AutoFlush = true;
            Console.SetOut(streamwriter);
        }

        /// <summary>
        /// Monitors for New items in the emailqueue
        /// </summary>
        private static void MonitorMailQueue()
        {

          

            try
            {

                MSMQHelpers.InitializeQueue();
                
                Console.WriteLine("Queue Initialized");

                MSMQHelpers.MonitorQueue(msmqQueue_ReceiveCompleted);

                Console.WriteLine("Monitoring Service Active");

               

            }
            catch (Exception oEx)
            {
                Console.WriteLine("Monitoring FAILED");
                Console.WriteLine(oEx.InnerException);
                Console.WriteLine( oEx.Message);
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
                Console.WriteLine("New Queue Message Recieved");
                lock (_objLock)
                {
                    EmailEntities.EmailMessage emailMsg = (EmailEntities.EmailMessage)e.Message.Body;
                    Console.WriteLine("Received message: " + emailMsg.Body);


                    try
                    {

                        Console.WriteLine("Sending Email..");
                        MobnationHelpers.Email.SendEmail(emailMsg);
                        Console.WriteLine("Email Successfully sent");

                    }
                    catch (Exception oEx)
                    {
                        Console.WriteLine("Error sending email. " + oEx.Message);
                    }

                }
            }
            catch (Exception oEx)
            {
                Console.WriteLine(oEx.Message);
            }


        }

    }
}

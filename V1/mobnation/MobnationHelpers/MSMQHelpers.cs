using System;
using System.Messaging;

namespace MobnationHelpers
{
    public static class MSMQHelpers
    {
        private static MessageQueue msmqQueue = new MessageQueue();
        private static bool queueLoaded = false;

        public static bool InitializeQueue()
        {
            if (queueLoaded == false)
            {
                string msmqQueuePath = @".\Private$\EmailQueue";


                //If the Message queue does not exists at specified location create it
                if (!MessageQueue.Exists(msmqQueuePath))
                {
                    msmqQueue = MessageQueue.Create(msmqQueuePath);
                    msmqQueue.SetPermissions("Everyone", MessageQueueAccessRights.FullControl);
                }
                else
                {
                    msmqQueue = new MessageQueue(msmqQueuePath);
                }
                queueLoaded = true;
            }

            return true;
        }

        public static bool MonitorQueue(ReceiveCompletedEventHandler handler)
        {
            Console.Write("1");
            InitializeQueue();
            Console.Write("2");
            
            msmqQueue.Formatter = new BinaryMessageFormatter();
            Console.Write("3");
            msmqQueue.MessageReadPropertyFilter.SetAll();
            Console.Write("4");
            msmqQueue.ReceiveCompleted += new ReceiveCompletedEventHandler(handler);
            Console.Write("5");
            msmqQueue.BeginReceive();
            Console.Write("6");
            return true;
        }

        public static bool QueueMessage(EmailEntities.EmailMessage emailMessage)
        {
            if (emailMessage == null)
            {
                return false;
            }
            Message msmqMsg = new Message();
            msmqMsg.Body = emailMessage;
            msmqMsg.Recoverable = true;
            msmqMsg.Formatter = new BinaryMessageFormatter();


            InitializeQueue();

            msmqQueue.Formatter = new BinaryMessageFormatter();
            msmqQueue.Send(msmqMsg);

            return true;
        }
    }
}

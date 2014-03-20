using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace EmailEntities
{
    /// <summary>
    /// 
    /// </summary>    
    [Serializable()]
    public class EmailMessage
    {
        private string _to;

        public string To
        {
            get { return _to; }
            set { _to = value; }
        }
        private string _from;

        public string From
        {
            get { return _from; }
            set { _from = value; }
        }
        private string _subject;

        public string Subject
        {
            get { return _subject; }
            set { _subject = value; }
        }
        private string _body;

        public string Body
        {
            get { return _body; }
            set { _body = value; }
        }

    }
}

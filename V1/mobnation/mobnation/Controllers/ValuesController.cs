using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EmailEntities;
using MobnationHelpers;

namespace mobnation.Controllers
{


    public class ValuesController : ApiController
    {
        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post( ReceiptData value)
        {

            MSMQHelpers.QueueMessage(new EmailMessage()
            {
                Body = String.Format("Thankyou, {0} for purchasing from MobNation",value.recName) ,
                From = "angeloperera@gmail.com",
                Subject = "MobNation Receipt",
                To = String.Format("{0}, {1}",value.recEmail,"angeloperera@gmail.com")
            });

            

        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
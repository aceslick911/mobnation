using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Net.Mime;
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
        public async void Post(ReceiptData value)
        {
            var localBinFolder = System.IO.Path.Combine(System.AppDomain.CurrentDomain.BaseDirectory, "bin");

            //Upload the signature to S3

            var sig = new SignatureToImage();
            var stream = sig.SigJsonToStream(value.isSig);
            var sigFilename = Guid.NewGuid() + ".png";
            await AmazonWebServices.uploadToS3(stream, "assets/profiles/monashkickboxing/" + sigFilename);

            //Prepare the PF

            var vals = new List<KeyValuePair<string, string>>();

            vals.Add(new KeyValuePair<string, string>("ReceiptDate", new DateTime().ToShortDateString()));
            vals.Add(new KeyValuePair<string, string>("ReceiptNumber", "123"));
            vals.Add(new KeyValuePair<string, string>("ClubLogo", @"https://mobnation.s3-ap-southeast-2.amazonaws.com/assets/profiles/monashkickboxing/"+sigFilename));

            var pdfReport = MobnationHelpers.PDF.RenderPDF(localBinFolder + @"\mobnation-receipt.rdl", vals);

            var pdfStream = new MemoryStream();
            
            pdfStream.Write(pdfReport, 0, pdfReport.Length);
            

            //Upload PDF to S3
            var pdfFilename = Guid.NewGuid() + ".pdf";
            await AmazonWebServices.uploadToS3(pdfStream, @"assets/profiles/monashkickboxing/" + pdfFilename);


            MSMQHelpers.QueueMessage(new EmailMessage()
            {
                Body = String.Format("Thankyou, {0} for purchasing from MobNation. Receipt: {1}",value.recName,@"https://mobnation.s3-ap-southeast-2.amazonaws.com/assets/profiles/monashkickboxing/"+pdfFilename ) ,
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
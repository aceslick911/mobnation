using System;
using System.Collections.Generic;

using System.IO;

using System.Web.Http;
using EmailEntities;
using MobnationHelpers;

namespace mobnation.Controllers
{

    /// <summary>
    /// Receipts Values Submission API - Receipt data is submitted here, signatures and PDF reports are submitted to S3 then a email message is queued.
    /// </summary>
    public class ValuesController : ApiController
    {
   

        // POST api/values
        /// <summary>
        /// Recieve Receipts data, produce PDF receipt and email to the recipient.
        /// </summary>
        /// <param name="value"></param>
        public async void Post(ReceiptData value)
        {
            var localBinFolder = System.IO.Path.Combine(System.AppDomain.CurrentDomain.BaseDirectory, "bin");

            //Upload the signature vector to S3
            var sig = new SignatureToImage();
            var stream = sig.SigJsonToStream(value.isSig);
            var sigFilename = Guid.NewGuid() + ".png";
            await AmazonWebServices.uploadToS3(stream, "assets/profiles/monashkickboxing/" + sigFilename);

            //Prepare the PDF
            var vals = new List<KeyValuePair<string, string>>();
            vals.Add(new KeyValuePair<string, string>("ReceiptDate", DateTime.Now.ToShortDateString()));
            vals.Add(new KeyValuePair<string, string>("ReceiptNumber", "RCP"+new Random().Next(5000).ToString()));
            vals.Add(new KeyValuePair<string, string>("total", "$"+value.total));
            var items = "";
            foreach (var item in value.items)
            {
                items = items + String.Format("{0}\t          {1}   x   \t${2} = \t${3}\n", item.name, item.qty, item.price, item.cost);
            }
            vals.Add(new KeyValuePair<string, string>("ReceiptItems", items));
            vals.Add(new KeyValuePair<string, string>("ClubName", value.clubName));
            vals.Add(new KeyValuePair<string, string>("signName", value.isName));
            vals.Add(new KeyValuePair<string, string>("clubLogoUrl", value.profileLogo ));
            vals.Add(new KeyValuePair<string, string>("ClubLogo", @"https://mobnation.s3-ap-southeast-2.amazonaws.com/assets/profiles/monashkickboxing/" + sigFilename));

            //Write PDF
            var pdfReport = MobnationHelpers.PDF.RenderPDF(localBinFolder + @"\mobnation-receipt.rdl", vals);
            var pdfStream = new MemoryStream();
            pdfStream.Write(pdfReport, 0, pdfReport.Length);
            

            //Upload PDF to S3
            var pdfFilename = Guid.NewGuid() + ".pdf";
            await AmazonWebServices.uploadToS3(pdfStream, @"assets/profiles/monashkickboxing/" + pdfFilename);


            //Queue the email message
            MSMQHelpers.QueueMessage(new EmailMessage()
            {
                Body = String.Format("Thankyou, {0} for purchasing from {2}. To view your receipt, click the following link: {1}",value.recName,@"https://mobnation.s3-ap-southeast-2.amazonaws.com/assets/profiles/monashkickboxing/"+pdfFilename, value.clubName ) ,
                From = "angeloperera@gmail.com",
                Subject = "MobNation Receipt",
                To = String.Format("{0}, {1}",value.recEmail,"angeloperera@gmail.com")
            });

            

        }

    }
}
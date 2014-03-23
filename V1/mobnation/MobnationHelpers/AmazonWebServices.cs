using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Amazon.S3.Model;

namespace MobnationHelpers
{
    public static class AmazonWebServices
    {

        public static async Task uploadToS3(Stream stream, string bucketPath)
        {
            using (var client = Amazon.AWSClientFactory.CreateAmazonS3Client(ConfigurationManager.AppSettings["amazonAccess"], ConfigurationManager.AppSettings["amazonKey"]))
            {
                try
                {

                    stream.Position = 0;

                    PutObjectRequest request = new PutObjectRequest();
                    request.InputStream = stream;
                    request.BucketName = "mobnation";
                    request.CannedACL = S3CannedACL.PublicRead;
                    request.Key = bucketPath;
                    S3Response response = client.PutObject(request);
                }
                catch (Exception e)
                {
                    Console.WriteLine("Error Uploading: " + e.Message);
                }
            }
        }

        public static async Task uploadFileToS3(string aFilename, string bucketPath)
        {
            var stream = new FileStream(aFilename, FileMode.Open);
            try
            {


                await uploadToS3(stream, bucketPath);
            }
            finally
            {
                stream.Close();
            }
        }
    }
}

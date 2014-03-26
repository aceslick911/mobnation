using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Helpers;
using System.Web.Script.Serialization;
using Newtonsoft.Json;


namespace mobnation.Models
{
    public class Mobnationdb : MobnationEntitiesContainer
    {

    }

    public static class Repository
    {
        public static List<Product> GetProducts()
        {
            using (var db = new Mobnationdb())
            {

                /*

                var recs = from data in db.Products.ToList()
                    select new
                    {
                        id = data.Id,
                        name = data.ProductName,

                    };
                
        JavaScriptSerializer serializer = new JavaScriptSerializer();
        return serializer.Serialize (db.Products.ToList());*/

                //return JsonConvert.SerializeObject(db.Products.ToList(), Formatting.Indented);
                return db.Products.ToList();
            }


        }
    }
}
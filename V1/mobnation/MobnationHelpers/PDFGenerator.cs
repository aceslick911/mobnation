using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using Microsoft.Reporting.WinForms;

namespace MobnationHelpers
{
    public static class PDF
    {
        public static byte[] RenderPDF(string RDLpath, List<KeyValuePair<string, string>> ReplaceData)
        {



            var localReport = new LocalReport();
            localReport.EnableExternalImages = true;

            using (StreamReader rdlcSR = new StreamReader(RDLpath))
            {
                localReport.LoadReportDefinition(rdlcSR);

                localReport.Refresh();
            }


            List<ReportParameter> param = new List<ReportParameter>();

            foreach (var item in ReplaceData)
            {
                param.Add(new ReportParameter(item.Key , item.Value));
            }


            localReport.SetParameters(param);

            var renderedBytes = localReport.Render("PDF");


            return renderedBytes;
        }

        public static void WritePDFToFile(string RDLpath, List<KeyValuePair<string, string>> ReplaceData, string Filename)
        {
            if (File.Exists(Filename))
            {
                File.Delete(Filename);
            }
            var bits = PDF.RenderPDF(RDLpath, ReplaceData);

            using (FileStream fs = new FileStream(Filename, FileMode.Create))
            {
                fs.Write(bits, 0, bits.Length);
            }
        }
    }




}
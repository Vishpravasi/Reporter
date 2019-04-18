<%@ WebHandler Language="C#" Class="UploadImages" %>

using System;
using System.Web;
using System.IO;

public class UploadImages : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {

        string strTmpFileName = context.Request.QueryString["filename"];
           string path = "";
           string strFileToDelete = "";
            path = System.Configuration.ConfigurationSettings.AppSettings["ArticlePath"].ToString();
        
            if (context.Request.QueryString["ToDelete"] !=null && context.Request.QueryString["ToDelete"].ToString() != "")
            {
                strFileToDelete = path + context.Request.QueryString["ToDelete"].ToString();
                FileInfo filetoDelete = new FileInfo(strFileToDelete);
                if (filetoDelete.Exists)
                {
                    filetoDelete.Delete();
                }
            }
            else
            {

                if (context.Request.QueryString["blnEditOrCreate"] == "false")
                {
                    strTmpFileName = "Temp" + strTmpFileName;
                }
                else
                {
                    strTmpFileName = strTmpFileName;
                }

                if (context.Request.QueryString["blnEditOrCreate"] == "true")
                {
                    if (!Directory.Exists(path + strTmpFileName + "\\TempWhenEdit\\"))
                        Directory.CreateDirectory(path + strTmpFileName + "\\TempWhenEdit\\");
                    
                    if (!Directory.Exists(path + strTmpFileName + "\\HighRes\\"))
                        Directory.CreateDirectory(path + strTmpFileName + "\\HighRes\\");

                    if (!Directory.Exists(path + strTmpFileName + "\\LowRes\\"))
                        Directory.CreateDirectory(path + strTmpFileName + "\\LowRes\\");
                    //if (!Directory.Exists(path + strTmpFileName + "\\LowRes\\"))
                    //    Directory.CreateDirectory(path + strTmpFileName + "\\LowRes\\");
                    path = path + strTmpFileName ;
                }
                else
                {
                    path = path + strTmpFileName;
                    if (!Directory.Exists(path))
                        Directory.CreateDirectory(path);
                }
                
               
               
                int fileCount = Directory.GetFiles(path, "*.*", SearchOption.AllDirectories).Length;
                if (fileCount != 0)
                    fileCount = fileCount - 1;
                if (context.Request.Files.Count > 0)
                {
                    HttpFileCollection files = context.Request.Files;

                    string fileName;

                    for (int i = 0; i < files.Count; i++)
                    {
                        HttpPostedFile file = files[i];
                        string strFileName = file.FileName;
                        string strExt = file.FileName;
                        string[] strextval = strExt.Split('.');
                       
                        if (context.Request.QueryString["blnEditOrCreate"] == "true")
                        {
                            strFileName = strTmpFileName + "_" + (i + fileCount) + "." + strextval[strextval.Length - 1];
                            fileName = Path.Combine(path + "\\TempWhenEdit\\", strFileName);
                            file.SaveAs(fileName);
                            //fileName = Path.Combine(path + "\\LowRes\\", strFileName);
                            //file.SaveAs(fileName);
                        }
                        else
                        {
                            strFileName = strTmpFileName + "_" + (i + fileCount) + "." + strextval[strextval.Length - 1];

                            fileName = Path.Combine(path, strFileName);
                            file.SaveAs(fileName);
                        }
                       
                    }
                    context.Response.ContentType = "application/json";
                    context.Response.Write("{}");
                }
            }
    }
    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}
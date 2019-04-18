using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Odbc;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        ////try
        ////{
        ////    using (OdbcConnection connection = new OdbcConnection(ConfigurationManager.ConnectionStrings["MySQLConnStr"].ConnectionString))
        ////    {
        ////        connection.Open();


        ////        string command = "insert into ip_mapping(Zone,SERVER_IP) values('Pavithra','MINI') ";
        ////        OdbcCommand cmdd = new OdbcCommand(command, connection);
        ////        cmdd.ExecuteNonQuery();  

        ////        //using (OdbcCommand command = new OdbcCommand("SELECT Product FROM news_details", connection))
        ////        //using (OdbcDataReader dr = command.ExecuteReader())
        ////        //{
        ////        //    while (dr.Read())
        ////        //        Response.Write(dr["Product"].ToString() + "<br />");
        ////        //    dr.Close();
        ////        //}
        ////        connection.Close();
        ////    }
        ////}
        ////catch (Exception ex)
        ////{
        ////    Response.Write("An error occured: " + ex.Message);
        ////}
    }
}
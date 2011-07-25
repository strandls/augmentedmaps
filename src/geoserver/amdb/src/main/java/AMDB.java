import java.io.IOException;
import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class AMDB {

    public AMDB() {
        // Do nothing
    }
   
    private Connection getConnection() {
            Connection c = null;

            try {
                Class.forName("org.postgresql.Driver");
            } catch (ClassNotFoundException cnfe) {
                System.out.println("Couldn't find the driver!");
                cnfe.printStackTrace();
                return null;
            }

            try {
                // The second and third arguments are the username and password,
                // respectively. They should be whatever is necessary to connect
                // to the database.
                c = DriverManager.getConnection("jdbc:postgresql://localhost/ibp",
                        "postgres", "postgres123");
            } catch (SQLException se) {
                System.out.println("Couldn't connect: print out a stack trace and exit.");
                se.printStackTrace();
            }

            return c;
    }

    /**
     *  get column description (the display title for column) for 
     *  a column name in the layer table
     */
    public void getColumnTitle(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {


            Connection c = getConnection();

            if (c == null)
                return;

            String layer = request.getParameter("layer");
            String columnName = request.getParameter("columnName");

            if (layer == null || columnName == null)
                return;

            try {
                Statement st = c.createStatement();
                ResultSet rs = st.executeQuery("select col_description((select oid from pg_class where relname = '" + layer + "'), (select ordinal_position from information_schema.columns where table_name='" + layer + "' and column_name='" + columnName + "'))");
                while (rs.next()) {
                    response.getOutputStream().write(rs.getString(1).getBytes());
                }
                rs.close();
                st.close();
            } catch (SQLException se) {
                se.printStackTrace();
            }
        }
       
    /**
     * get summary columns for given layer
     */
    public void getSummaryColumns(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {

            Connection c = getConnection();

            if (c == null)
                return;
        
            String layer = request.getParameter("layer");

            if (layer == null)
                return;

            try {
                Statement st = c.createStatement();
                ResultSet rs = st.executeQuery("select summary_columns from \"Meta_Layer\" where layer_tablename = '" +layer +"';");
                while (rs.next()) {
                    response.getOutputStream().write(rs.getString(1).getBytes());
                }
                rs.close();
                st.close();
            
            } catch (SQLException se) {
                se.printStackTrace();
            
            }

        }
}

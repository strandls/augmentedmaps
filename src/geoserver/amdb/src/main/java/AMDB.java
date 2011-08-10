import java.io.IOException;
import javax.sql.DataSource;
import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Simple GeoServer OWS service for various custom operations
 */
public class AMDB {

    public static String FIELD_SEP = "///";

    private DataSource datasource;

    public void init() {

        try {
            // Look up the JNDI data source only once at init time
            Context envCtx = (Context) new InitialContext();
            datasource = (DataSource) envCtx.lookup("java:comp/env/jdbc/jettyds");
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    private Connection getConnection() throws SQLException {
        return datasource.getConnection();
    }

    public AMDB() {
        init();
    }

    /**
     * Utility method to close resources
     */
    private void closeResources(ResultSet rs, Statement st, Connection c) {

        if (rs != null){ 
            try {rs.close();} catch (SQLException e) {
                e.printStackTrace();
            }
        }

        if (st != null){ 
            try {st.close();} catch (SQLException e) {
                e.printStackTrace();
            }
        }

        if (c != null){ 
            try {c.close();} catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     *  get column description (the display title for column) for 
     *  a column name in the layer table
     */
    public void getColumnTitle(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {

            Connection c = null;
            Statement st = null;
            ResultSet rs = null;
            
            String layer = request.getParameter("layer");
            String columnName = request.getParameter("columnName");

            if (layer == null || columnName == null)
                return;

            try {
                c = getConnection();

                if (c == null)
                    return;

                st = c.createStatement();
                rs = st.executeQuery("select col_description((select oid from pg_class where relname = '" + layer + "'), (select ordinal_position from information_schema.columns where table_name='" + layer + "' and column_name='" + columnName + "'))");
                while (rs.next()) {
                    response.getOutputStream().write(rs.getString(1).getBytes());
                }
            } catch (SQLException se) {
                se.printStackTrace();
            }
            finally { //to ensure that the connection is closed even if an exception occurs during JDBC processing
                closeResources(rs, st, c);
            }
        }
       
    /**
     * get summary columns for given layer
     */
    public void getSummaryColumns(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {

            Connection c = null;
            Statement st = null;
            ResultSet rs = null;
        
            String layer = request.getParameter("layer");

            if (layer == null)
                return;

            try {
                c = getConnection();

                if (c == null)
                    return;

                st = c.createStatement();
                rs = st.executeQuery("select summary_columns from \"Meta_Layer\" where layer_tablename = '" +layer +"';");
                while (rs.next()) {
                    response.getOutputStream().write("[".getBytes());
                    response.getOutputStream().write(rs.getString(1).getBytes());
                    response.getOutputStream().write("]".getBytes());
                }
            
            } catch (SQLException se) {
                se.printStackTrace();
            
            }
            finally { //to ensure that the connection is closed even if an exception occurs during JDBC processing
                closeResources(rs, st, c);
            }
        }

    /**
     * get column name and column title mapping
     */
    public void getLayerColumns(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            
            Connection c = null;
            Statement st = null;
            ResultSet rs = null;
        
            String layer = request.getParameter("layer");

            if (layer == null)
                return;

            try {
                c = getConnection();

                if (c == null)
                    return;

                st = c.createStatement();
                rs = st.executeQuery("select column_name, col_description((select oid from pg_class where relname = '" + layer + "'), ordinal_position) from information_schema.columns where table_name='" + layer + "';");
                response.getOutputStream().write("{".getBytes());
                while (rs.next()) {
                    response.getOutputStream().write("'".getBytes());
                    response.getOutputStream().write(rs.getString(1).getBytes());
                    response.getOutputStream().write("'".getBytes());
                    response.getOutputStream().write(":".getBytes());
                    response.getOutputStream().write("'".getBytes());

                    if (rs.getString(2) != null)
                        response.getOutputStream().write(rs.getString(2).getBytes());
                    else
                        response.getOutputStream().write(rs.getString(1).getBytes());

                    response.getOutputStream().write("'".getBytes());

                    if (!rs.isLast())
                        response.getOutputStream().write(",".getBytes());
                }
                response.getOutputStream().write("}".getBytes());
            
            } catch (SQLException se) {
                se.printStackTrace();
            
            }
            finally { //to ensure that the connection is closed even if an exception occurs during JDBC processing
                closeResources(rs, st, c);
            }

    }

    /**
     * get access information for all layers
     */
    public void getLayersAccessStatus(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            
            Connection c = null;
            Statement st = null;
            ResultSet rs = null;
        
            try {
                c = getConnection();

                if (c == null)
                    return;

                st = c.createStatement();
                rs = st.executeQuery("select layer_tablename, access from \"Meta_Layer\"");
                response.getOutputStream().write("{".getBytes());
                while (rs.next()) {
                    response.getOutputStream().write(rs.getString(1).getBytes());
                    response.getOutputStream().write(":".getBytes());
                    response.getOutputStream().write(rs.getString(2).getBytes());

                    if (!rs.isLast())
                        response.getOutputStream().write(",".getBytes());
                }
                response.getOutputStream().write("}".getBytes());
            
            } catch (SQLException se) {
                se.printStackTrace();
            
            }
            finally { //to ensure that the connection is closed even if an exception occurs during JDBC processing
                closeResources(rs, st, c);
            }

    }

    /**
     * get themes names for theme_type
     *
     * theme_type is 1 from Themes and 2 for Geography
     */
    public void getThemeNames(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            
            Connection c = null;
            Statement st = null;
            ResultSet rs = null;
        
            String theme_type = request.getParameter("theme_type");

            if (theme_type == null)
                return;

            try {
                c = getConnection();

                if (c == null)
                    return;

                st = c.createStatement();
                rs = st.executeQuery("select theme_name from \"Theme\" where theme_type=" + theme_type);
                while (rs.next()) {
                    response.getOutputStream().write(rs.getString(1).getBytes());
                    response.getOutputStream().write(FIELD_SEP.getBytes());
                }
            
            } catch (SQLException se) {
                se.printStackTrace();
            
            }
            finally { //to ensure that the connection is closed even if an exception occurs during JDBC processing
                closeResources(rs, st, c);
            }

    }

    /**
     * get all layers for given theme
     */
    public void getLayersByTheme(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            
            Connection c = null;
            Statement st = null;
            ResultSet rs = null;
        
            String theme = request.getParameter("theme");

            if (theme == null)
                return;

            try {
                c = getConnection();

                if (c == null)
                    return;

                st = c.createStatement();
                rs = st.executeQuery("select (select layer_tablename from \"Meta_Layer\" where layer_id=tlm.layer_id) from \"Theme_Layer_Mapping\" as tlm where theme_id=(select theme_id from \"Theme\" where theme_name='" + theme + "');");
                while (rs.next()) {
                    response.getOutputStream().write(rs.getString(1).getBytes());
                    response.getOutputStream().write(FIELD_SEP.getBytes());
                }
            
            } catch (SQLException se) {
                se.printStackTrace();
            
            }
            finally { //to ensure that the connection is closed even if an exception occurs during JDBC processing
                closeResources(rs, st, c);
            }

    }

    /**
     * get attribution for given layer
     */
    public void getLayerAttribution(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            
            Connection c = null;
            Statement st = null;
            ResultSet rs = null;
        
            String layer = request.getParameter("layer");

            if (layer == null)
                return;

            try {
                c = getConnection();

                if (c == null)
                    return;

                st = c.createStatement();
                rs = st.executeQuery("select license, attribution from \"Meta_Layer\" where layer_tablename = '" + layer + "'");
                while (rs.next()) {
                    response.getOutputStream().write(rs.getString(1).getBytes());
                    response.getOutputStream().write(FIELD_SEP.getBytes());
                    response.getOutputStream().write(rs.getString(2).getBytes());
                }
            
            } catch (SQLException se) {
                se.printStackTrace();
            
            }
            finally { //to ensure that the connection is closed even if an exception occurs during JDBC processing
                closeResources(rs, st, c);
            }

    }

    /**
     * get layer details
     */
    public void getLayerDetails(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            
            Connection c = null;
            Statement st = null;
            ResultSet rs = null;
        
            String layer = request.getParameter("layer");

            if (layer == null)
                return;

            try {
                c = getConnection();

                if (c == null)
                    return;

                st = c.createStatement();
                rs = st.executeQuery("select title, body from node_revisions where nid=(select m.nid from \"Meta_Layer\" as m where m.layer_tablename='" + layer + "') order by vid desc limit 1");
                while (rs.next()) {
                    response.getOutputStream().write("<span class='layer_details_title'>".getBytes());
                    response.getOutputStream().write(rs.getString(1).getBytes());
                    response.getOutputStream().write("</span>".getBytes());
                    response.getOutputStream().write(rs.getString(2).getBytes());
                }
            
            } catch (SQLException se) {
                se.printStackTrace();
            
            }
            finally { //to ensure that the connection is closed even if an exception occurs during JDBC processing
                closeResources(rs, st, c);
            }

    }

    /**
     * get layer summary in json
     */
    public void getLayerSummary(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            
            Connection c = null;
            Statement st = null;
            ResultSet rs = null;
        
            String layer = request.getParameter("layer");

            if (layer == null)
                return;

            try {
                c = getConnection();

                if (c == null)
                    return;

                st = c.createStatement();
                rs = st.executeQuery("select layer_name, layer_description, status, pdf_link, url, comments, created_by, created_date, modified_by, modified_date from \"Meta_Layer\" where layer_tablename=\'" + layer + "\'");

                ResultSetMetaData rsmetadata = rs.getMetaData();
                int column_count = rsmetadata.getColumnCount();
                response.getOutputStream().write("{".getBytes());
                while (rs.next()) {

                    for (int i = 1; i <= column_count; ++i) {
                        String columnName = rsmetadata.getColumnName(i);
                        response.getOutputStream().write((columnName + ":'").getBytes());
                        if (rs.getString(i) != null)
                            response.getOutputStream().write(rs.getString(i).getBytes());
                        response.getOutputStream().write("'".getBytes());
                        
                        if (i < column_count)
                            response.getOutputStream().write(",".getBytes());
                    }
                }
                response.getOutputStream().write("}".getBytes());
            
            } catch (SQLException se) {
                se.printStackTrace();
            
            }
            finally { //to ensure that the connection is closed even if an exception occurs during JDBC processing
                closeResources(rs, st, c);
            }

    }



    /**
     * get layer link tables
     */
    public void getLayerLinkTables(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
            
            Connection c = null;
            Statement st = null;
            ResultSet rs = null;
        
            String layer = request.getParameter("layer");

            if (layer == null)
                return;

            try {
                c = getConnection();

                if (c == null)
                    return;

                st = c.createStatement();
                rs = st.executeQuery("select mlt.link_tablename, mlt.link_name from \"Meta_LinkTable\" mlt join \"Meta_Layer\" ml on mlt.layer_id = ml.layer_id and ml.layer_tablename = \'" + layer + "\'");

                response.getOutputStream().write("{".getBytes());
                while (rs.next()) {
                    response.getOutputStream().write(rs.getString(1).getBytes());
                    response.getOutputStream().write(":'".getBytes());
                    response.getOutputStream().write(rs.getString(2).getBytes());
                    response.getOutputStream().write("'".getBytes());
                    
                    if (!rs.isLast())
                        response.getOutputStream().write(",".getBytes());
                }
                response.getOutputStream().write("}".getBytes());
            
            } catch (SQLException se) {
                se.printStackTrace();
            
            }
            finally { //to ensure that the connection is closed even if an exception occurs during JDBC processing
                closeResources(rs, st, c);
            }
    }
}

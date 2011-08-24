<?php
// $Id: page.tpl.php,v 1.18 2008/01/24 09:42:53 goba Exp $
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language ?>" lang="<?php print $language->language ?>" dir="<?php print $language->dir ?>">
	<head>
		<title>Western Ghats Portal</title>
    <meta name="robots" content="noarchive"> <!-- No caching of page in Google. http://www.google.com/support/webmasters/bin/answer.py?answer=35306&topic=13511 -->
		<?php print $head; ?>
		<?php print $styles; ?>
		<?php print $scripts; ?>
		<?php flush(); ?>
    		<script type="text/javascript" src="/augmentedmaps/sites/all/themes/wg/js/jquery-1.3.2.min.js"></script>
                <script type="text/javascript" src="/augmentedmaps/sites/all/themes/wg/js/jquery.easing.1.3.js"></script>
                <script type="text/javascript" src="/augmentedmaps/sites/all/themes/wg/js/jquery.coda-slider-2.0.js"></script>

		<script type="text/javascript" src="/sites/all/themes/wg/js/wg.js"></script>
	</head>

	<body id="home">
		<!-- Wrapper -->
		<div id="homeWrapper">
		
			<!-- Main menu -->
			<div id="menus">
				<div id="mainMenu">
					<?php if($main_menu): ?>
					<?php print $main_menu; ?>
					<?php endif; ?>
				</div>
				<div id="homeUserMenu">
					<ul>
					<?php global $user; ?>
					<?php if($user->uid): ?>
					<li>Welcome <?php echo l($user->name, "user");?></li>
						<?php if($is_admin): ?>
						<li><a href="<?php print check_url($front_page);?>admin">Administration</a></li>
						<?php endif; ?>
					<li class="last"><a href="<?php print check_url($front_page);?>logout">Logout</a></li>
					<?php else: ?>
					<li><a href="<?php print check_url($front_page);?>user">Login</a></li>
					<li class="last"><a href="<?php print check_url($front_page);?>user/register">Register</a></li>
					<?php endif; ?>
					</ul>
				</div>
			</div>
			<!-- Main menu ends -->
			
			<!-- Branding -->
			<div id="homeBranding" style="width:100%;">
				<!-- Logo -->
				<div id="logo">
					<a href="<?php print check_url($front_page)?>">
						<img src="<?php print check_url($front_page)?><?php print check_url(path_to_theme())?>/images/map-logo.gif" alt="logo"/>
						<div></div>
					</a>
				</div>
				<!-- Logo ends -->
			</div>
			<!-- Branding ends -->
                       <div style="clear:both;"></div>
 <?php if ($show_messages && $messages): print $messages; endif; ?>
                        <div id="main-content">
                    	<div class="navbar">
                        		<div id="explore" onclick="location.href='<?php print check_url($front_page)?>map'";></div>
                                        <div id="checklists" onclick="location.href='<?php print check_url($front_page)?>browsechecklists'"></div>
                                        <div id="collaborate" onclick="location.href='<?php print check_url($front_page)?>collaborate-wg'"><div id="collaborate-links"></div></div>
                        </div><!-- navbar --> 

			<div class="navbar">
                        		<div id="species_entry" onclick="location.href='<?php print check_url($front_page)?>species'";></div>
                                        <div id="themes_entry"></div>
                                        <div id="aboutus_entry" onclick="location.href='<?php print check_url($front_page)?>about/western-ghats'"><div id="collaborate-links"></div></div>
                        </div><!-- navbar --> 


			</div><!-- main-content -->
 			
			<div>
			<ul id="whatsnew">
			<li id="new-whatsnew">New</li>
			<li>
			<a href="/cepf_grantee_database">Western Ghats CEPF Projects</a>
			</li>
			</ul>
			</div>

 
                       <div style="clear:both;"></div>
			
			
			<!-- Footer -->
			<div id="pageFooter">
				<?php if($footer): ?>
				<?php print $footer;?>
				<?php endif; ?>
			</div>
			<!-- Footer ends -->
			
		</div>
		<!-- Wrapper end -->
		<?php print $closure;?>
    <script language="javascript">
      // Only for the home page
      if(jQuery(window).width() > 1000) {
        jQuery("#homeContent").css("width",(jQuery(window).width() - 537));
      } else {
        jQuery("#homeContent").css("width", 500);
      }

      jQuery(document).ready(function(){
        //setMainDivSize();
        //chkBrowserCompatibility();
        //chkFlashVersion();
      });
    </script>
	</body>
</html>

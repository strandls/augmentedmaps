<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language ?>" lang="<?php print $language->language ?>" dir="<?php print $language->dir ?>">
	<head>
		<title>India Biodiversity Portal</title>
    <meta name="robots" content="noarchive"> 
		<?php print $head; ?>
		<?php print $styles; ?>
		<?php print $scripts; ?>
		<?php flush(); ?>
	</head>

	<body id="home">
		<!-- Wrapper -->
		<div id="homeWrapper">
		
			<!-- Main menu -->
			<div id="menus">

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

				<div id="mainMenu">
          <?php if(isset($primary_links)): ?>
            <?php print theme('links', $primary_links, array('class' => 'links primary-links')) ?>
          <?php endif;?>
				</div>

			</div>
			<!-- Main menu ends -->
			
			<!-- Branding -->
			<div id="homeBranding" style="width:0px;">
				<!-- Logo -->
				<div id="logo">
					<a href="<?php print check_url($front_page)?>">
						<!--<img src="<?php print check_url($front_page)?><?php print check_url(path_to_theme())?>/images/map-logo.gif" alt="logo"/>-->
						<div></div>
					</a>
				</div>
				<!-- Logo ends -->
			</div>
			<!-- Branding ends -->
		
			
			<!-- Home Container -->
			<div id="homeContainer">
				
		
				<!-- Left Sidebar -->
				<div id="homeLeft" class="column">
					<?php if($content_menu): ?>
						<?php print $content_menu; ?>
					<?php endif;?> 
				</div>
				<!-- Left Sidebar ends -->
				
				<!-- Content -->
				<div id="homeContent" class="column">
				
					
				
					<?php if ($tabs): print '<div id="tabs-wrapper" class="clear-block">'; endif; ?>
					<?php if ($tabs): print '<ul class="tabs primary">'. $tabs .'</ul></div>'; endif; ?>
					<?php if ($tabs2): print '<ul class="tabs secondary">'. $tabs2 .'</ul>'; endif; ?>
					<?php if ($show_messages && $messages): print $messages; endif; ?>
					<?php print $help; ?>
					
					<?php print $content;?>
				</div>
				</div>
				<!-- Content ends -->
				
				<!-- Right sidebar -->
				<div id="homeRight" class="column">
					<?php if($home_right): ?>
						<?php print $home_right;?>
					<?php endif; ?>
				</div>
				<!-- Right Sidebar ends -->
			
			</div>
			<!-- Home Container ends -->
			
			<!-- Footer -->
			<div id="pageFooter">
	
<div class="block_partner" id="p2">
<a href="http://www.altlawforum.org/"><img src="<?php print check_url($front_page)?><?php print check_url(path_to_theme())?>/images/partner_logos/alf.png" alt="Alternate Law Forum" /></a><a href="http://atree.org/"><img src="<?php print check_url($front_page)?><?php print check_url(path_to_theme())?>/images/partner_logos/atree.png" alt="ATREE" /></a><a href="http://fes.org.in/"><img src="<?php print check_url($front_page)?><?php print check_url(path_to_theme())?>/images/partner_logos/fes.png" alt="Foundation for Ecological Security (FES)" /></a><a href="http://www.frlht.org.in/"><img src="<?php print check_url($front_page)?><?php print check_url(path_to_theme())?>/images/partner_logos/frlht.png" alt="FRLHT" /></a><a href="http://www.ifpindia.org/"><img src="<?php print check_url($front_page)?><?php print check_url(path_to_theme())?>/images/partner_logos/ifp.png" alt="IFP" /></a><a href="http://www.ncbs.res.in/"><img src="<?php print check_url($front_page)?><?php print check_url(path_to_theme())?>/images/partner_logos/ncbs.png" alt="NCBS" /></a><a href="http://ncf-india.org/"><img src="<?php print check_url($front_page)?><?php print check_url(path_to_theme())?>/images/partner_logos/ncf.png" alt="Nature Conservation Foundation, (NCF)" /></a><a href="http://srishti.ac.in/"><img src="<?php print check_url($front_page)?><?php print check_url(path_to_theme())?>/images/partner_logos/srishti.png" alt="Srishti School of Art, Design and Technology" /></a><a href="http://strandls.com/"><img src="<?php print check_url($front_page)?><?php print check_url(path_to_theme())?>/images/partner_logos/strand.png" alt="Strand Life Sciences" /></a><a href="http://www.wcsindia.org/"><img src="<?php print check_url($front_page)?><?php print check_url(path_to_theme())?>/images/partner_logos/wcs.png" alt="WCS-India" /></a>
</div>
<div class="partner_text">
	<div id="p4">Managed by a <a href="/people/working_group">Consortium of Partners</a></div>
	<div style="clear:both"></div>


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
        jQuery("#homeContent").css("width",(jQuery(window).width() - 527));
      } else {
        jQuery("#homeContent").css("width", 500);
      }

      jQuery(document).ready(function(){
        setMainDivSize();
        //chkBrowserCompatibility();
        chkFlashVersion();
      });
    </script>
	</body>
</html>

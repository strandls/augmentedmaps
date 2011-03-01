<?php global $base_url;?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language ?>" lang="<?php print $language->language ?>" dir="<?php print $language->dir ?>">

	<head>
		<title><?php print $head_title ?></title>
		<?php print $head ?>
		<?php print $styles ?>
		<?php print $scripts ?>
	</head>
	<body>
		<div id="wrapper">
			<div id="main">
				<div id="contentNoPadding">
					<div id="contentArea">
					
						<?php if ($tabs): print '<div id="tabs-wrapper" class="clear-block">'; endif; ?>
						<?php if ($title): print '<h2'. ($tabs ? ' class="with-tabs"' : '') .'>'. $title .'</h2>'; endif; ?>
						<?php if ($tabs): print '<ul class="tabs primary">'. $tabs .'</ul></div>'; endif; ?>
						<?php if ($tabs2): print '<ul class="tabs secondary">'. $tabs2 .'</ul>'; endif; ?>
						<?php if ($show_messages && $messages): print $messages; endif; ?>
						<?php print $help; ?>
						
						<div class="cl"></div>

						<?php print $content;?>
					
					</div>
					
				</div>
				
				<div id="footer">
					<?php print $footer_message;?>
					<?php if($footer): ?>
						<?php print $footer; ?>
					<?php endif; ?>
				</div>

			</div>

		</div>
		
		<?php print $closure;?>
    <script language="javascript">
      jQuery(document).ready(function(){
        setMainDivSize();
      });
    </script>
	</body>
</html>
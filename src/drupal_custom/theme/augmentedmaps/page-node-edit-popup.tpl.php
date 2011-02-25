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
	<body id="popup">
		<div id="popupWrapper">
      <div id="divMessage"></div>
			<?php if($title):?>
				<h4><?php print $title; ?></h4>
			<?php endif; ?>
			<div id="popupContentArea">
				<?php print $content;?>
			</div>
		</div>
		<?php print $closure;?>
	</body>
</html>
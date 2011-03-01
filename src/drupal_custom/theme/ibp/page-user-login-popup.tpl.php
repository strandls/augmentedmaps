	<body id="popup">
		<div id="popupWrapper">
			<?php if($title):?>
				<h4><?php print $title; ?></h4>
			<?php endif; ?>
			<div id="popupContentArea">
				<?php print $content;?>
			</div>
		</div>
		<?php print $closure;?>
	</body>

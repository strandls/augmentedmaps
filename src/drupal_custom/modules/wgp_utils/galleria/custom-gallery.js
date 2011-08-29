if(Drupal.jsEnabled) {
  $(document).ready(function(){
            Galleria.loadTheme('/sites/all/modules/wgp_utils/galleria/themes/classic/galleria.classic.min.js');
            $("#gallery").galleria({
                width: 500,
                height: 500,
 		autoplay: 5000,
                transition: 'fade'
            });
  });
}

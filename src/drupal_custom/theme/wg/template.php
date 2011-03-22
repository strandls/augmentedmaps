<?php
function phptemplate_preprocess_page(&$vars) {
  include_once("readConfig.php");
  $config = readConfig();
  $vars['scripts'] = $config['scripts'] . $vars['scripts'];
  $vars['styles'] = $config['styles'] . $vars['styles'];

  $suggestions = array();
  if (module_exists('path')) {
    $alias = drupal_get_path_alias(str_replace('/edit','',$_GET['q']));

    if(stristr($alias, "layer/")) {
      $suggestions = array();
      $suggestions[] = "page-layer";
      $vars['template_files'] = $suggestions;
    }

    //if(stristr($alias, "map")) {
    if($alias == "map") {
      $suggestions = array();
      $suggestions[] = "page-map";
      $vars['template_files'] = $suggestions;
    }
  }
}
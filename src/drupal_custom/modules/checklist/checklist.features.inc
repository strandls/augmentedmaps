<?php

/**
 * Implementation of hook_node_info().
 */
function checklist_node_info() {
  $items = array(
    'checklist' => array(
      'name' => t('Checklist'),
      'module' => 'features',
      'description' => t('Checklist created for India biodiversity portal'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'has_body' => '0',
      'body_label' => '',
      'min_word_count' => '0',
      'help' => '',
    ),
  );
  return $items;
}

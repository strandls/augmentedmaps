<?php

/**
 * Implementation of hook_fieldgroup_default_groups().
 */
function checklist_fieldgroup_default_groups() {
  $groups = array();

  // Exported group: group_checklist
  $groups['checklist-group_checklist'] = array(
    'group_type' => 'standard',
    'type_name' => 'checklist',
    'group_name' => 'group_checklist',
    'label' => 'Checklist',
    'settings' => array(
      'form' => array(
        'style' => 'fieldset',
        'description' => '',
      ),
      'display' => array(
        'weight' => '4',
        'label' => 'above',
        'teaser' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        'full' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        'description' => '',
        '4' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        '2' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        '3' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        '5' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
      ),
    ),
    'weight' => '4',
    'fields' => array(
      '0' => 'field_clinfo',
      '1' => 'field_rawchecklist',
      '2' => 'field_processedchecklist',
      '3' => 'field_references',
    ),
  );

  // Exported group: group_credit
  $groups['checklist-group_credit'] = array(
    'group_type' => 'standard',
    'type_name' => 'checklist',
    'group_name' => 'group_credit',
    'label' => 'Credits',
    'settings' => array(
      'form' => array(
        'style' => 'fieldset',
        'description' => '',
      ),
      'display' => array(
        'weight' => '3',
        'label' => 'above',
        'teaser' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        'full' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        'description' => '',
        '4' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        '2' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        '3' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        '5' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
      ),
    ),
    'weight' => '3',
    'fields' => array(
      '0' => 'field_cclicense',
      '1' => 'field_attribution',
      '2' => 'field_source',
    ),
  );

  // Exported group: group_location
  $groups['checklist-group_location'] = array(
    'group_type' => 'standard',
    'type_name' => 'checklist',
    'group_name' => 'group_location',
    'label' => 'Location',
    'settings' => array(
      'form' => array(
        'style' => 'fieldset',
        'description' => '',
      ),
      'display' => array(
        'weight' => '1',
        'label' => 'above',
        'teaser' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        'full' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        'description' => '',
        '4' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        '2' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        '3' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        '5' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
      ),
    ),
    'weight' => '1',
    'fields' => array(
      '0' => 'field_allindia',
      '1' => 'field_place',
      '2' => 'field_biogeography',
      '3' => 'field_states',
      '4' => 'field_districts',
      '5' => 'field_taluks',
    ),
  );

  // Exported group: group_timeperiod
  $groups['checklist-group_timeperiod'] = array(
    'group_type' => 'standard',
    'type_name' => 'checklist',
    'group_name' => 'group_timeperiod',
    'label' => 'Time Period',
    'settings' => array(
      'form' => array(
        'style' => 'fieldset',
        'description' => '',
      ),
      'display' => array(
        'weight' => '2',
        'label' => 'above',
        'teaser' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        'full' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        'description' => '',
        '4' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        '2' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        '3' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
        '5' => array(
          'format' => 'fieldset',
          'exclude' => 0,
        ),
      ),
    ),
    'weight' => '2',
    'fields' => array(
      '0' => 'field_fromdate',
      '1' => 'field_todate',
      '2' => 'field_publicationdate',
      '3' => 'field_updateddate',
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Checklist');
  t('Credits');
  t('Location');
  t('Time Period');

  return $groups;
}

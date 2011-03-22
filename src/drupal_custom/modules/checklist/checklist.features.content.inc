<?php

/**
 * Implementation of hook_content_default_fields().
 */
function checklist_content_default_fields() {
  $fields = array();

  // Exported field: field_allindia
  $fields['checklist-field_allindia'] = array(
    'field_name' => 'field_allindia',
    'type_name' => 'checklist',
    'display_settings' => array(
      'weight' => 0,
      'parent' => 'group_location',
      'label' => array(
        'format' => 'inline',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '2' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '3' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '5' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'number_integer',
    'required' => '0',
    'multiple' => '0',
    'module' => 'number',
    'active' => '1',
    'prefix' => '',
    'suffix' => '',
    'min' => '',
    'max' => '',
    'allowed_values' => '0|NO
1|YES',
    'allowed_values_php' => '',
    'widget' => array(
      'default_value' => array(
        '0' => array(
          'value' => 'NO',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'All India?',
      'weight' => 0,
      'description' => 'Is this an all India list?',
      'type' => 'optionwidgets_onoff',
      'module' => 'optionwidgets',
    ),
  );

  // Exported field: field_attribution
  $fields['checklist-field_attribution'] = array(
    'field_name' => 'field_attribution',
    'type_name' => 'checklist',
    'display_settings' => array(
      'weight' => '14',
      'parent' => 'group_credit',
      'label' => array(
        'format' => 'inline',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '2' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '3' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '5' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'text',
    'required' => '0',
    'multiple' => '0',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '0',
    'max_length' => '',
    'allowed_values' => '',
    'allowed_values_php' => '',
    'widget' => array(
      'rows' => '5',
      'size' => 60,
      'default_value' => array(
        '0' => array(
          'value' => '',
          '_error_element' => 'default_value_widget][field_attribution][0][value',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Attribution:',
      'weight' => '14',
      'description' => 'The name of the author/organization OR write the citation if the checklist is from a book or a paper',
      'type' => 'text_textarea',
      'module' => 'text',
    ),
  );

  // Exported field: field_biogeography
  $fields['checklist-field_biogeography'] = array(
    'field_name' => 'field_biogeography',
    'type_name' => 'checklist',
    'display_settings' => array(
      'weight' => '2',
      'parent' => 'group_location',
      'label' => array(
        'format' => 'above',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '2' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '3' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '5' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'text',
    'required' => '0',
    'multiple' => '1',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '0',
    'max_length' => '',
    'allowed_values' => '',
    'allowed_values_php' => 'return _get_biogeographic_regions();',
    'widget' => array(
      'default_value' => array(
        '0' => array(
          'value' => '',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Biogeographic Region:',
      'weight' => '2',
      'description' => 'Choose a bio-geographic region in which your location falls in (more than one can be chosen using CTRL)',
      'type' => 'optionwidgets_select',
      'module' => 'optionwidgets',
    ),
  );

  // Exported field: field_cclicense
  $fields['checklist-field_cclicense'] = array(
    'field_name' => 'field_cclicense',
    'type_name' => 'checklist',
    'display_settings' => array(
      'weight' => '13',
      'parent' => 'group_credit',
      'label' => array(
        'format' => 'inline',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '2' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '3' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '5' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'text',
    'required' => '1',
    'multiple' => '0',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '0',
    'max_length' => '',
    'allowed_values' => '',
    'allowed_values_php' => 'return _get_cc_types();',
    'widget' => array(
      'default_value' => array(
        '0' => array(
          'value' => '',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Creative commons License',
      'weight' => '13',
      'description' => 'Choose conditions for sharing checklist. For details: CC weblink (CC logo)',
      'type' => 'optionwidgets_select',
      'module' => 'optionwidgets',
    ),
  );

  // Exported field: field_clinfo
  $fields['checklist-field_clinfo'] = array(
    'field_name' => 'field_clinfo',
    'type_name' => 'checklist',
    'display_settings' => array(
      'weight' => '12',
      'parent' => 'group_checklist',
      'label' => array(
        'format' => 'above',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '2' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '3' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '5' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'text',
    'required' => '0',
    'multiple' => '0',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '0',
    'max_length' => '',
    'allowed_values' => '',
    'allowed_values_php' => '',
    'widget' => array(
      'rows' => '5',
      'size' => 60,
      'default_value' => array(
        '0' => array(
          'value' => '',
          '_error_element' => 'default_value_widget][field_clinfo][0][value',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Checklist Information:',
      'weight' => '12',
      'description' => 'This box can be used to give extra information about the checklist, location, biodiversity and climate. Please include the key to symbols you may have used in the checklist.',
      'type' => 'text_textarea',
      'module' => 'text',
    ),
  );

  // Exported field: field_districts
  $fields['checklist-field_districts'] = array(
    'field_name' => 'field_districts',
    'type_name' => 'checklist',
    'display_settings' => array(
      'weight' => '4',
      'parent' => 'group_location',
      'label' => array(
        'format' => 'above',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '2' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '3' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '5' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'text',
    'required' => '0',
    'multiple' => '1',
    'module' => 'text',
    'active' => '1',
    'text_processing' => 0,
    'max_length' => '',
    'allowed_values' => '',
    'allowed_values_php' => 'return getDistrictsMap();',
    'widget' => array(
      'rows' => 5,
      'size' => '30',
      'default_value' => array(
        '0' => array(
          'value' => '',
          '_error_element' => 'default_value_widget][field_districts][0][value',
        ),
      ),
      'default_value_php' => NULL,
      'autocomplete_match' => 'contains',
      'autocomplete_case' => '0',
      'i18n_flddata' => 0,
      'label' => 'District(s)',
      'weight' => '4',
      'description' => 'The name of the District your location falls into.',
      'type' => 'autocomplete_widgets_allowvals',
      'module' => 'autocomplete_widgets',
    ),
  );

  // Exported field: field_fromdate
  $fields['checklist-field_fromdate'] = array(
    'field_name' => 'field_fromdate',
    'type_name' => 'checklist',
    'display_settings' => array(
      'weight' => '9',
      'parent' => 'group_timeperiod',
      'label' => array(
        'format' => 'inline',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '2' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '3' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '5' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'date',
    'required' => '0',
    'multiple' => '0',
    'module' => 'date',
    'active' => '1',
    'granularity' => array(
      'year' => 'year',
      'month' => 'month',
      'day' => 'day',
    ),
    'timezone_db' => '',
    'tz_handling' => 'none',
    'todate' => '',
    'repeat' => 0,
    'repeat_collapsed' => '',
    'default_format' => 'medium',
    'widget' => array(
      'default_value' => 'blank',
      'default_value_code' => '',
      'default_value2' => 'same',
      'default_value_code2' => '',
      'input_format' => 'M j Y',
      'input_format_custom' => '',
      'increment' => '1',
      'text_parts' => array(),
      'year_range' => '-10000:+0',
      'label_position' => 'above',
      'label' => 'From Date:',
      'weight' => '9',
      'description' => 'The start of the time period of checklist survey',
      'type' => 'date_popup',
      'module' => 'date',
    ),
  );

  // Exported field: field_numentities
  $fields['checklist-field_numentities'] = array(
    'field_name' => 'field_numentities',
    'type_name' => 'checklist',
    'display_settings' => array(
      'label' => array(
        'format' => 'above',
        'exclude' => 0,
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '2' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '3' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '5' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'number_integer',
    'required' => '0',
    'multiple' => '0',
    'module' => 'number',
    'active' => '1',
    'prefix' => '',
    'suffix' => '',
    'min' => '',
    'max' => '',
    'allowed_values' => '',
    'allowed_values_php' => '',
    'widget' => array(
      'default_value' => array(
        '0' => array(
          'value' => '',
          '_error_element' => 'default_value_widget][field_numentities][0][value',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Number of entities in the Checklist:',
      'weight' => '-3',
      'description' => '',
      'type' => 'number',
      'module' => 'number',
    ),
  );

  // Exported field: field_place
  $fields['checklist-field_place'] = array(
    'field_name' => 'field_place',
    'type_name' => 'checklist',
    'display_settings' => array(
      'weight' => '1',
      'parent' => 'group_location',
      'label' => array(
        'format' => 'inline',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '2' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '3' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '5' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'text',
    'required' => '0',
    'multiple' => '0',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '0',
    'max_length' => '',
    'allowed_values' => '',
    'allowed_values_php' => '',
    'widget' => array(
      'rows' => 5,
      'size' => '30',
      'default_value' => array(
        '0' => array(
          'value' => '',
          '_error_element' => 'default_value_widget][field_place][0][value',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Place Name',
      'weight' => '1',
      'description' => 'The name of the location/region',
      'type' => 'text_textfield',
      'module' => 'text',
    ),
  );

  // Exported field: field_processedchecklist
  $fields['checklist-field_processedchecklist'] = array(
    'field_name' => 'field_processedchecklist',
    'type_name' => 'checklist',
    'display_settings' => array(
      'weight' => '14',
      'parent' => 'group_checklist',
      'label' => array(
        'format' => 'above',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '2' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '3' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '5' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'text',
    'required' => '0',
    'multiple' => '0',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '1',
    'max_length' => '',
    'allowed_values' => '',
    'allowed_values_php' => '',
    'widget' => array(
      'rows' => '5',
      'size' => 60,
      'default_value' => array(
        '0' => array(
          'value' => '',
          '_error_element' => 'default_value_widget][field_processedchecklist][0][value',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Processed Checklist',
      'weight' => '14',
      'description' => '',
      'type' => 'text_textarea',
      'module' => 'text',
    ),
  );

  // Exported field: field_publicationdate
  $fields['checklist-field_publicationdate'] = array(
    'field_name' => 'field_publicationdate',
    'type_name' => 'checklist',
    'display_settings' => array(
      'weight' => '11',
      'parent' => 'group_timeperiod',
      'label' => array(
        'format' => 'inline',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '2' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '3' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '5' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'date',
    'required' => '0',
    'multiple' => '0',
    'module' => 'date',
    'active' => '1',
    'granularity' => array(
      'year' => 'year',
      'month' => 'month',
      'day' => 'day',
    ),
    'timezone_db' => '',
    'tz_handling' => 'none',
    'todate' => '',
    'repeat' => 0,
    'repeat_collapsed' => '',
    'default_format' => 'medium',
    'widget' => array(
      'default_value' => 'blank',
      'default_value_code' => '',
      'default_value2' => 'same',
      'default_value_code2' => '',
      'input_format' => 'F j, Y',
      'input_format_custom' => '',
      'increment' => '1',
      'text_parts' => array(),
      'year_range' => '-1000:+0',
      'label_position' => 'above',
      'label' => 'Date of Publication:',
      'weight' => '11',
      'description' => 'The date when this checklist was published',
      'type' => 'date_popup',
      'module' => 'date',
    ),
  );

  // Exported field: field_rawchecklist
  $fields['checklist-field_rawchecklist'] = array(
    'field_name' => 'field_rawchecklist',
    'type_name' => 'checklist',
    'display_settings' => array(
      'weight' => '13',
      'parent' => 'group_checklist',
      'label' => array(
        'format' => 'above',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '2' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '3' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '5' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'text',
    'required' => '0',
    'multiple' => '0',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '0',
    'max_length' => '',
    'allowed_values' => '',
    'allowed_values_php' => '',
    'widget' => array(
      'rows' => '25',
      'size' => 60,
      'default_value' => array(
        '0' => array(
          'value' => '',
          '_error_element' => 'default_value_widget][field_rawchecklist][0][value',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Raw Checklist:',
      'weight' => '13',
      'description' => 'The checklist in csv format can be pasted here from a note pad. For more details on format: raw checklist format.',
      'type' => 'text_textarea',
      'module' => 'text',
    ),
  );

  // Exported field: field_references
  $fields['checklist-field_references'] = array(
    'field_name' => 'field_references',
    'type_name' => 'checklist',
    'display_settings' => array(
      'weight' => '15',
      'parent' => 'group_checklist',
      'label' => array(
        'format' => 'above',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '2' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '3' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '5' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'text',
    'required' => '0',
    'multiple' => '0',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '0',
    'max_length' => '',
    'allowed_values' => '',
    'allowed_values_php' => '',
    'widget' => array(
      'rows' => '5',
      'size' => 60,
      'default_value' => array(
        '0' => array(
          'value' => '',
          '_error_element' => 'default_value_widget][field_references][0][value',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'References',
      'weight' => '15',
      'description' => 'Some reference material (books, papers or web-links) of relevance to the checklist can be listed here.',
      'type' => 'text_textarea',
      'module' => 'text',
    ),
  );

  // Exported field: field_resources
  $fields['checklist-field_resources'] = array(
    'field_name' => 'field_resources',
    'type_name' => 'checklist',
    'display_settings' => array(
      'weight' => '-1',
      'parent' => '',
      'label' => array(
        'format' => 'inline',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '2' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '3' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '5' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'text',
    'required' => '0',
    'multiple' => '1',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '0',
    'max_length' => '',
    'allowed_values' => '',
    'allowed_values_php' => 'return  _get_resource_tables();',
    'widget' => array(
      'default_value' => array(
        '0' => array(
          'value' => '',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Resource Tables',
      'weight' => '-1',
      'description' => 'Select one of the taxa group if any your checklist taxa falls in these groups',
      'type' => 'optionwidgets_select',
      'module' => 'optionwidgets',
    ),
  );

  // Exported field: field_source
  $fields['checklist-field_source'] = array(
    'field_name' => 'field_source',
    'type_name' => 'checklist',
    'display_settings' => array(
      'weight' => '15',
      'parent' => 'group_credit',
      'label' => array(
        'format' => 'inline',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '2' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '3' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '5' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'text',
    'required' => '0',
    'multiple' => '0',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '0',
    'max_length' => '',
    'allowed_values' => '',
    'allowed_values_php' => '',
    'widget' => array(
      'rows' => '5',
      'size' => 60,
      'default_value' => array(
        '0' => array(
          'value' => '',
          '_error_element' => 'default_value_widget][field_source][0][value',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Source',
      'weight' => '15',
      'description' => 'The name of the source from which the checklist is taken or web-links to it.',
      'type' => 'text_textarea',
      'module' => 'text',
    ),
  );

  // Exported field: field_states
  $fields['checklist-field_states'] = array(
    'field_name' => 'field_states',
    'type_name' => 'checklist',
    'display_settings' => array(
      'weight' => '3',
      'parent' => 'group_location',
      'label' => array(
        'format' => 'above',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '2' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '3' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '5' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'text',
    'required' => '0',
    'multiple' => '1',
    'module' => 'text',
    'active' => '1',
    'text_processing' => 0,
    'max_length' => '',
    'allowed_values' => '',
    'allowed_values_php' => 'return getStatesMap();',
    'widget' => array(
      'rows' => 5,
      'size' => '30',
      'default_value' => array(
        '0' => array(
          'value' => '',
          '_error_element' => 'default_value_widget][field_states][0][value',
        ),
      ),
      'default_value_php' => NULL,
      'autocomplete_match' => 'contains',
      'autocomplete_case' => '0',
      'i18n_flddata' => 0,
      'label' => 'State(s)',
      'weight' => '3',
      'description' => 'The name of the State your location falls into.',
      'type' => 'autocomplete_widgets_allowvals',
      'module' => 'autocomplete_widgets',
    ),
  );

  // Exported field: field_taluks
  $fields['checklist-field_taluks'] = array(
    'field_name' => 'field_taluks',
    'type_name' => 'checklist',
    'display_settings' => array(
      'weight' => '5',
      'parent' => 'group_location',
      'label' => array(
        'format' => 'above',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '2' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '3' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '5' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'text',
    'required' => '0',
    'multiple' => '1',
    'module' => 'text',
    'active' => '1',
    'text_processing' => 0,
    'max_length' => '',
    'allowed_values' => '',
    'allowed_values_php' => 'return getTahsilsMap();',
    'widget' => array(
      'rows' => 5,
      'size' => '60',
      'default_value' => array(
        '0' => array(
          'value' => '',
          '_error_element' => 'default_value_widget][field_taluks][0][value',
        ),
      ),
      'default_value_php' => NULL,
      'autocomplete_match' => 'contains',
      'autocomplete_case' => '0',
      'i18n_flddata' => 0,
      'label' => 'Taluk(s)',
      'weight' => '5',
      'description' => 'The name of the Taluk your location falls into.',
      'type' => 'autocomplete_widgets_allowvals',
      'module' => 'autocomplete_widgets',
    ),
  );

  // Exported field: field_taxa
  $fields['checklist-field_taxa'] = array(
    'field_name' => 'field_taxa',
    'type_name' => 'checklist',
    'display_settings' => array(
      'weight' => '-2',
      'parent' => '',
      'label' => array(
        'format' => 'inline',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '2' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '3' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '5' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'text',
    'required' => '1',
    'multiple' => '1',
    'module' => 'text',
    'active' => '1',
    'text_processing' => '0',
    'max_length' => '',
    'allowed_values' => '',
    'allowed_values_php' => 'return  _ibpcl_get_taxa_names();',
    'widget' => array(
      'default_value' => array(
        '0' => array(
          'value' => '',
        ),
      ),
      'default_value_php' => NULL,
      'label' => 'Taxa',
      'weight' => '-2',
      'description' => 'Choose the taxa group from the dropdown',
      'type' => 'optionwidgets_select',
      'module' => 'optionwidgets',
    ),
  );

  // Exported field: field_todate
  $fields['checklist-field_todate'] = array(
    'field_name' => 'field_todate',
    'type_name' => 'checklist',
    'display_settings' => array(
      'weight' => '10',
      'parent' => 'group_timeperiod',
      'label' => array(
        'format' => 'inline',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '2' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '3' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '5' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'date',
    'required' => '0',
    'multiple' => '0',
    'module' => 'date',
    'active' => '1',
    'granularity' => array(
      'year' => 'year',
      'month' => 'month',
      'day' => 'day',
    ),
    'timezone_db' => '',
    'tz_handling' => 'none',
    'todate' => '',
    'repeat' => 0,
    'repeat_collapsed' => '',
    'default_format' => 'medium',
    'widget' => array(
      'default_value' => 'blank',
      'default_value_code' => '',
      'default_value2' => 'same',
      'default_value_code2' => '',
      'input_format' => 'F j, Y',
      'input_format_custom' => '',
      'increment' => '1',
      'text_parts' => array(),
      'year_range' => '-1000:+0',
      'label_position' => 'above',
      'label' => 'To Date:',
      'weight' => '10',
      'description' => 'The end of the time period of checklist survey',
      'type' => 'date_popup',
      'module' => 'date',
    ),
  );

  // Exported field: field_updateddate
  $fields['checklist-field_updateddate'] = array(
    'field_name' => 'field_updateddate',
    'type_name' => 'checklist',
    'display_settings' => array(
      'weight' => '12',
      'parent' => 'group_timeperiod',
      'label' => array(
        'format' => 'inline',
      ),
      'teaser' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      'full' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '4' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '2' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '3' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
      '5' => array(
        'format' => 'default',
        'exclude' => 0,
      ),
    ),
    'widget_active' => '1',
    'type' => 'date',
    'required' => '0',
    'multiple' => '0',
    'module' => 'date',
    'active' => '1',
    'granularity' => array(
      'year' => 'year',
      'month' => 'month',
      'day' => 'day',
    ),
    'timezone_db' => '',
    'tz_handling' => 'none',
    'todate' => '',
    'repeat' => 0,
    'repeat_collapsed' => '',
    'default_format' => 'medium',
    'widget' => array(
      'default_value' => 'blank',
      'default_value_code' => '',
      'default_value2' => 'same',
      'default_value_code2' => '',
      'input_format' => 'F j, Y',
      'input_format_custom' => '',
      'increment' => '1',
      'text_parts' => array(),
      'year_range' => '-3:+3',
      'label_position' => 'above',
      'label' => 'Date Updated',
      'weight' => '12',
      'description' => 'The date when this checklist was last updated',
      'type' => 'date_popup',
      'module' => 'date',
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('All India?');
  t('Attribution:');
  t('Biogeographic Region:');
  t('Checklist Information:');
  t('Creative commons License');
  t('Date Updated');
  t('Date of Publication:');
  t('District(s)');
  t('From Date:');
  t('Number of entities in the Checklist:');
  t('Place Name');
  t('Processed Checklist');
  t('Raw Checklist:');
  t('References');
  t('Resource Tables');
  t('Source');
  t('State(s)');
  t('Taluk(s)');
  t('Taxa');
  t('To Date:');

  return $fields;
}

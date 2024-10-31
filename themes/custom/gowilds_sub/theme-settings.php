<?php
use Drupal\Core\Extension\Extension;
use Drupal\Core\Extension\ExtensionDiscovery;

use Drupal\system\Controller\ThemeController;
use Drupal\Core\Theme\ThemeManagerInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Implementation of hook_form_system_theme_settings_alter()
 *
 * @param $form
 *   Nested array of form elements that comprise the form.
 *
 * @param $form_state
 *   A keyed array containing the current state of the form.
 */
function gowilds_sub_form_system_theme_settings_alter(&$form, &$form_state) {
	$form['#attached']['library'][] = 'gowilds_sub/gowilds-admin';  
	// Get the build info for the form
	$build_info = $form_state->getBuildInfo();
	// Get the theme name we are editing
	$theme = \Drupal::theme()->getActiveTheme()->getName();
	// Create Omega Settings Object



	// Create Omega Settings Object
	$form['opcje'] = array(
		'#type' => 'vertical_tabs',
		'#attributes' => array('class' => array('entity-meta')),
		'#weight' => -1000,
		'#default_tab' => 'edit-variables',
		'#open' => FALSE, // Set this to FALSE to collapse the vertical tab by default
	);

	$form['homepage_news'] = [
		'#type' => 'details',
		'#title' => t('Ilość wpisów na stronie głównej'),
		'#open' => TRUE,
		'#group' => 'opcje',
	];
	
	$form['homepage_news']['news_list_field'] = [
		'#type' => 'select',
		'#title' => t('Ilość:'),			
		'#default_value' => theme_get_setting('news_list_field'),
		'#options' => array(
			'5' => 5,
			'8' => 8,
			'11' => 11,
		),
		'#description' => t('wybierz ilość'),
	];

	$form['events_count'] = [
        '#type' => 'details',
        '#title' => t('Ilość wpisów Aktualności'),
        '#open' => FALSE,
        '#group' => 'opcje',
    ];

	$form['events_count']['events_list_field'] = [
		'#type' => 'textfield',
		'#title' => t('Ilość:'),
		'#default_value' => theme_get_setting('events_list_field') ? theme_get_setting('events_list_field'): '',		
		'#description' => 'Podaj ilość np 10',
	];
	



	$form['actions']['submit']['#value'] = t('Save');
} 

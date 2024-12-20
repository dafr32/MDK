<?php

namespace  Drupal\calendar_events\Plugin\Block;

use Drupal;
use Drupal\node\Entity\Node;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\Path\PathAliasManagerInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;


/**
 * @Block(
 *   id = "events_calendar_block",
 *   admin_label = @Translation("Events Calendar Block"),
 *   category = @Translation("Drupal Block")
 * )
 */

class CalendarEventsBlock extends BlockBase{
  /**
  * {@inheritdoc}
  */
  public function defaultConfiguration() {            
      $message = 'Calendar Events Block';
      // Drupal::logger('calendar_events::blockForm')->debug('<pre><code>' . print_r($message, TRUE) . '</code></pre>');
      return [
        'calendar_events' => [
            'numCal'          => 1,
            'bgColor'         => '#FFFFFF',
            'bgColorEvent'    => '#00AAE4',
            'bgColorSelected' => '',
            'bgColorToday'    => '#FFFFFF',
            'color'           => '#111111',
            'colorEvent'      => '#20603D',
            'colorOther'      => '#666666',
            'colorMonth'      => '#000000',
            'textInitialDate' => 'Initial date',
            'textEndDate'     => 'End date',
            'textInitialTime' => 'Initial time',
            'textEndTime'     => 'End time',
            'textInModal'     => 1,
            'borderRadius'    => '70',
        ]
      ] + parent::defaultConfiguration();


  }

  /**
   * {@inheritdoc }
   */

  private function getFirstWeekDay(): int{
    $system_date =  \Drupal::config('system.date');
    return $message =$system_date->get('first_day');
  } 

  public function build(){
    $language = Drupal::languageManager()->getCurrentLanguage()->getId();
    $output = [
      '#theme' => 'calendar_events',
      '#attached' => [
        'library' => [
                        'calendar_events/calendar_events_library',
                        'core/drupal.dialog.ajax',
        ],
       'drupalSettings' => [
                            'calendar_events' => [
                                        'eventsjson' => $this->getEvents(),
                                        'lang' => $language,
                                        'num_cal' => $this->configuration['calendar_events']['numCal'],
                                        'bg_color' => $this->configuration['calendar_events']['bgColor'],
                                        'bg_color_selected' => $this->configuration['calendar_events']['bgColorSelected'],
                                        'bg_color_today' => $this->configuration['calendar_events']['bgColorToday'],
                                        'bg_color_event' => $this->configuration['calendar_events']['bgColorEvent'],
                                        'color' => $this->configuration['calendar_events']['color'],
                                        'color_event' => $this->configuration['calendar_events']['colorEvent'],
                                        'color_other' => $this->configuration['calendar_events']['colorOther'],
                                        'color_month' => $this->configuration['calendar_events']['colorMonth'],
                                        'border_radius' => sprintf("%d%s", $this->configuration['calendar_events']['borderRadius'], "%"),
                                        'text_in_modal' => $this->configuration['calendar_events']['textInModal'],
                                        'text_initial_date' => $this->configuration['calendar_events']['textInitialDate'],
                                        'text_end_date' => $this->configuration['calendar_events']['textEndDate'],
                                        'text_initial_time' => $this->configuration['calendar_events']['textInitialTime'],
                                        'text_end_time' => $this->configuration['calendar_events']['textEndTime'],
                                        'week_first_day' => $this->getFirstWeekDay(),
                            ]
       ]
      ],
      '#cache' => [
        'max-age' => 0,
      ]
    ];
    return $output;
  }

   private function getEvents(){
    // $query = Drupal::entityTypeManager()->getStorage('node')->getQuery();
    // $query->condition('type', 'wydarzenie');
    // $query->accessCheck(TRUE);
    // $nids = $query->execute();
    
    
    /** @var \Drupal\Core\Entity\EntityTypeManagerInterface $entityTypeManager */
    $entityTypeManager = \Drupal::entityTypeManager();

    // Create the query to get published nodes of type 'wydarzenie'
    $query = $entityTypeManager->getStorage('node')->getQuery();
    $query->condition('type', 'wydarzenie')
          // ->condition('status', 1) // Status 1 means the node is published
          ->accessCheck(TRUE);
    $nids = $query->execute();
    
    $events = [];
    $alias_manager = \Drupal::service('path_alias.manager');
    // Retrieve the session variable.
    
    // $is_logged_in = \Drupal::service('session')->get('user_login');
    // \Drupal::messenger()->addMessage('User logged in: ' . ($is_logged_in ? 'TRUE' : 'FALSE'));

    // Ustaw odpowiednią ścieżkę bazową w zależności od roli.    
    // $sc = $is_logged_in ? 'kalendarz' : 'kalendarz';    
    
    // \Drupal::messenger()->addMessage('User logged in: ' . ($is_logged_in ? 'kalendarz' : 'kalendarz2'));
    
    // Pobierz bieżącą systemową ścieżkę
    $current_path = \Drupal::service('path.current')->getPath();

    // Przetłumacz na alias
    $alias_manager = \Drupal::service('path_alias.manager');
    $current_alias = $alias_manager->getAliasByPath($current_path);


    // Sprawdź, czy alias kończy się na '/planer'

    foreach($nids as $nid){
        $node = Node::load($nid);  
        // \Drupal::messenger()->addMessage('status'. $node->status->value);      
        $data = $node->field_event_start_date->value;		
        //$path = sprintf('/drupal_10/web/node/%d', $node->id());
		    // $path = sprintf('/kalendarz/%s', $data);
        // $path = sprintf('/kalendarz?day=%s', $data);
        if (strpos($current_alias, '/planer') !== false) {
            // \Drupal::messenger()->addMessage('Alias kończy się na "/planer".');
            $path_url = sprintf('/planer_day?day=%s', $data);
        } else {
            // \Drupal::messenger()->addMessage('Alias nie kończy się na "/planer".');
              $path_url = sprintf('/kalendarz?day=%s', $data);
        }
        $path = $path_url;
        // $path = sprintf('/%s/%s',$sc, $data);
        $alias = $alias_manager->getAliasByPath($path);
        $url = $alias != null ? $alias : $path;
                
        array_push($events, [
            'url' => $url,
            'title' => $node->title->value,
            'body' => $node->body->value,
            'start' => $node->field_event_start_date->value,
            'end' => $node->field_event_start_date->value,
            'status' => $node->status->value ? 'Published' : 'Unpublished',            
            // 'end' => $node->field_event_end_date->value,
            // 'end' => !empty($node->field_event_end_date->value) ? $node->field_event_end_date->value : $node->field_event_start_date->value,
            //'only' => $node->field_only_day->value,
        ]);

        
    }
    return json_encode($events);
   
    }

    /**
    * {@inheritdoc}
    */
    public function blockForm($form, FormStateInterface $form_state) {
        $form = parent::blockForm($form, $form_state);
        $form['#tree'] = TRUE;
	      $config = $this->getConfiguration();
        
        $default = $this->defaultConfiguration();        
        
        $theme_options = [
                            1 =>  $this->t('One Months'),
                            2 =>  $this->t('Two Months'),
                            3 =>  $this->t('Three Months'),
                            4 =>  $this->t('Four Months'),
                            5 =>  $this->t('Five Months'),
                            6 =>  $this->t('Six Months'),
                            7 =>  $this->t('Seven Months'),
                            8 =>  $this->t('Eight Months'),
                            9 =>  $this->t('Nine Months'),
                            10 => $this->t('Ten Months'),
                            11 => $this->t('Eleven Months'),
                            12 => $this->t('Twuelve Months'),
        ];
        $text_modal = [
          1 =>'Yes',
          0 => 'No',
        ];
        $form['calendar_events'] = [
          'numCal' => [
              '#type' => 'select',
              '#options' => $theme_options,
              '#title' => $this->t('Choose view'),
              '#description' => $this->t('Choose 1,2,3 views'),
              '#default_value' => $config['calendar_events']['numCal'],
              '#weight' => '1',
          ],
          'bgColor' => [
              '#type' => 'textfield',
              '#maxlength' => 7, 
              '#title' => $this->t('Bg color calendar'),
              '#description' => $this->t('Choose hex background color for all calendar'),
              '#default_value' => $this->validate_color($config['calendar_events']['bgColor']) ? $config['calendar_events']['bgColor'] : $default['calendar_events']['bgColor'],
              '#weight' => '3',
          ],
          'bgColorEvent' => [
            '#type' => 'textfield',
            '#maxlength' => 7, 
            '#title' => $this->t('BgColor Event Day'),
            '#description' => $this->t('Choose hex background color for event day'),
            '#default_value' => ($this->validate_color($config['calendar_events']['bgColorEvent']) == true) ? $config['calendar_events']['bgColorEvent'] : $default['calendar_events']['bgColorEvent'],
            '#weight' => '3',
          ],
          'bgColorSelected' => [
            '#type' => 'textfield',
            '#maxlength' => 7, 
            '#title' => $this->t('Bg color selected text'),
            '#description' => $this->t('Choose hex background color for selected text'),
            '#default_value' => $this->validate_color($config['calendar_events']['bgColorSelected']) ? $config['calendar_events']['bgColorSelected'] : $default['calendar_events']['bgColorSelected'],
            '#weight' => '3',
          ],
          'bgColorToday' => [
            '#type' => 'textfield',
            '#maxlength' => 7, 
            '#title' => $this->t('Bg color today'),
            '#description' => $this->t('Choose hex background color for today'),
            '#default_value' => $this->validate_color($config['calendar_events']['bgColorToday']) ? $config['calendar_events']['bgColorToday'] : $default['calendar_events']['bgColorToday'],
            '#weight' => '3',
          ],
          'color' => [
            '#type' => 'textfield',
            '#maxlength' => 7,
            '#title' => $this->t('Color days'),
            '#description' => $this->t('Choose hex color for all days'),
            '#default_value' => $this->validate_color($config['calendar_events']['color']) ? $config['calendar_events']['color'] : $default['calendar_events']['color'],
            '#weight' => '3',
          ],
          'colorEvent' => [
            '#type' => 'textfield',
            '#maxlength' => 7,
            '#title' => $this->t('Color event day'),
            '#description' => $this->t('Choose text color for event day'),
            '#default_value' => $this->validate_color($config['calendar_events']['colorEvent']) ? $config['calendar_events']['colorEvent'] : $default['calendar_events']['colorEvent'],
            '#weight' => '3',
          ],
          'colorOther' => [
            '#type' => 'textfield',
            '#maxlength' => 7,
            '#title' => $this->t('Color other text'),
            '#description' => $this->t('Choose text color for other text'),
            '#default_value' => $this->validate_color($config['calendar_events']['colorOther']) ? $config['calendar_events']['colorOther'] : $default['calendar_events']['colorOther'],
            '#weight' => '3',
          ],
          'colorMonth' => [
            '#type' => 'textfield',
            '#maxlength' => 7,
            '#title' => $this->t('Color months text'),
            '#description' => $this->t('Choose text color for months text'),
            '#default_value' => $this->validate_color($config['calendar_events']['colorMonth']) ? $config['calendar_events']['colorMonth'] : $default['calendar_events']['colorMonth'],
            '#weight' => '3',
          ],
          'borderRadius' => [
            '#type' => 'number',
            '#maxlength' => 3,
            '#title' => $this->t('Border Radius'),
            '#description' => $this->t('Type a percent in 0-100 range. Default 70%'),
            '#default_value' => $config['calendar_events']['borderRadius'],
            '#weight' => '3',
          ],
          'textInitialDate' => [ 
            '#type' => 'textfield',
            '#maxlength' => 50,
            '#title' => $this->t('Initial date text'),
            '#description' => $this->t('Text with initial date'),
            '#default_value' => $this->t($config['calendar_events']['textInitialDate']),
            '#weight' => '2',
          ],
          'textEndDate' => [
            '#type' => 'textfield',
            '#maxlength' => 50,
            '#title' => $this->t('End date text'),
            '#description' => $this->t('Text with End date'),
            '#default_value' => $this->t($config['calendar_events']['textEndDate']),
            '#weight' => '2',
          ],
          'textInitialTime' => [ 
            '#type' => 'textfield',
            '#maxlength' => 50,
            '#title' => $this->t('Initial time text'),
            '#description' => $this->t('Text with initial time'),
            '#default_value' => $this->t($config['calendar_events']['textInitialTime']),
            '#weight' => '2',
          ],
          'textEndTime' => [
            '#type' => 'textfield',
            '#maxlength' => 50,
            '#title' => $this->t('End time text'),
            '#description' => $this->t('Text with End time'),
            '#default_value' => $this->t($config['calendar_events']['textEndTime']),
            '#weight' => '2',
          ],
          'textInModal' => [
            '#type' => 'select',
            '#options' => $text_modal,
            '#title' => $this->t('Text in modal'),
            '#description' => $this->t('Choose text in modal or jump to event content'),
            '#default_value' =>  $config['calendar_events']['textInModal'],
            '#weight' => '1',
            ],
        ];
        return $form;
    }

    /**
     * @return Boolean
     */
    private function validate_color( $str_color ){
      $str_len = strlen($str_color);
      $first   = $str_len > 3 ? $str_color[0] : false;
      return ($str_len <= 7 && $str_len > 3 && $first == '#') ? true : false;
    }

    /**
    * {@inheritdoc}
    */
    public function blockSubmit($form, FormStateInterface $form_state) {
        parent::blockSubmit($form, $form_state);
        $config = $this->getConfiguration();   
        $this->setConfigurationValue('calendar_events', $form_state->getValue('calendar_events'));
      }


}






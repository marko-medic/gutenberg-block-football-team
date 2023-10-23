<?php
function custom_block_plugin_register_pattern_cat()
{
    register_block_pattern_category('custom_block', array(
        'label' => __('Custom Block', 'custom_block')
    ));
}

// add_action('init', 'custom_block_plugin_register_pattern_cat');

function custom_block_plugin_register_pattern()
{
    register_block_pattern('custom_block/my-patterns', array(
        'title' => __('My Pattern', 'custom_block'),
        'description' => __('Some description', 'custom_block'),
        'categories' => array('custom_block'),
        'keywords' => array('my pattern'),
        'content' => '<!-- wp:create-block/boilerplate -->
        <p class="wp-block-create-block-boilerplate">Boilerplate – hello from the saved content!</p>
        <!-- /wp:create-block/boilerplate -->
        
        <!-- wp:create-block/tsblock -->
        <p class="wp-block-create-block-tsblock">Tsblock – hello from the saved content :)</p>
        <!-- /wp:create-block/tsblock -->
        
        <!-- wp:custom-block/football-team {"teamData":[{"name":"Hey","age":"12","position":"center","tshirtSize":"SM"}],"teamCount":1,"initialFormSubmitted":true,"membersFormSubmitted":true,"className":"is-style-rounded"} -->
        <div class="wp-block-custom-block-football-team is-style-rounded" style="color:red;font-size:1.1rem"><div style="margin-bottom:0.5rem;border:2px dotted red"><p>Name: Hey</p><p>Age: 12</p><p>Position: center</p><p>Tshirt Size: SM</p></div><section class="wp-block-custom-block-football-team is-style-rounded" style="background-color:lightgreen"></section></div>
        <!-- /wp:custom-block/football-team -->
        
        <!-- wp:custom-block/football-team {"teamData":[{"name":"ww","age":"12","position":"center","tshirtSize":"SM"}],"teamCount":1,"initialFormSubmitted":true,"membersFormSubmitted":true,"className":"is-style-opaque"} -->
        <div class="wp-block-custom-block-football-team is-style-opaque" style="color:red;font-size:1.1rem"><div style="margin-bottom:0.5rem;border:2px dotted red"><p>Name: ww</p><p>Age: 12</p><p>Position: center</p><p>Tshirt Size: SM</p></div><section class="wp-block-custom-block-football-team is-style-opaque" style="background-color:lightgreen"></section></div>
        <!-- /wp:custom-block/football-team -->'
    ));
}
// add_action('init', 'custom_block_plugin_register_pattern');

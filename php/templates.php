<?php

function custom_block_plugin_register_template()
{
    $post_type_object = get_post_type_object('post');
    $post_type_object->template_lock = 'insert';
    $post_type_object->template = array(
        array('core/heading', array('content' => 'Some heading')),
        array('core/paragraph', array('content' => 'Some text content')),
        array('custom-block/football-team', array('teamCount' => 3, "initialFormSubmitted" => true, "membersFormSubmitted" => true, "teamData" => array(
            array("name" => "MAX", "age" => 15, "position" => "defender", "tshirtSize" => "XL"),
            array("name" => "BEN", "age" => 25, "position" => "center", "tshirtSize" => "XXL"),
        )), array(
            array('custom-block/football-player', array()),
            array('custom-block/football-player', array())
        ))
    );
}
// add_action('init', 'custom_block_plugin_register_template');

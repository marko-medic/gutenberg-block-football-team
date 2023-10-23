<?php

function custom_block_filter_metadata($metadata)
{
    if ($metadata['name'] == 'core/paragraph') {
        $metadata['title'] = 'Text Block';
        $metadata['supports']['color'] = array(
            'link' => true,
            'gradients' => true
        );
    }
    return $metadata;
}

// add_filter('block_type_metadata', 'custom_block_filter_metadata');

function custom_block_filter_allowed_blocks($allowed_block_types, $editor_context)
{
    if (!empty($editor_context->post) && $editor_context->post->post_type === 'post') {
        return array('core/paragraph');
    }
    return $allowed_block_types;
}

// add_filter('allowed_block_types_all', 'custom_block_filter_allowed_blocks', 10, 2);

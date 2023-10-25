<?php

/**
 * Plugin Name:       Football Team
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       footbal-team
 *
 * @package           custom-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 * 
 * 
 */

require_once('php/patterns.php');
require_once('php/filters.php');
require_once('php/templates.php');
require_once('php/metabox.php');

final class FootballTeamBlock
{
	public static function init()
	{
		$asset_file = include(plugin_dir_path(__FILE__) . 'build/main.asset.php');

		wp_register_script(
			'custom-block-footbal-team-editor',
			plugins_url('build/main.js', __FILE__),
			$asset_file['dependencies'],
			$asset_file['version']
		);
		wp_register_style('custom-block-footbal-team-style', plugins_url('build/style-main.css', __FILE__), array(), $asset_file['version']);
		wp_register_style('custom-block-footbal-team-editor-style', plugins_url('build/main.css', __FILE__), array(), $asset_file['version']);

		register_block_type('custom-block/football-team-block', array(
			'editor_script' => 'custom-block-footbal-team-editor',
			'editor_style' => 'custom-block-footbal-team-editor-style',
			'style' => 'custom-block-footbal-team-style',
		));
	}
}

add_action("init", array("FootballTeamBlock", "init"));

<?php

/**
 * Get social media item
*/
function get_social_media($data = array()) {

	$social_media = array();

	if (!empty($data)):
		foreach ($data as $key => $value):
			if (preg_match('/^[a-zA-Z]+_url$/', $key) && $value[0] !== ''):
				$social_media[$key] = $value[0]; 
			endif;
		endforeach;
	endif;

	return $social_media;
}

/**
 * Generates social media
*/
function generateSocialMedia($data = array(), $is_highlight = false) {

	if (!empty($data)): ?>
		<div class="authors__item-contact-info <?php if($is_highlight) echo 'authors__item-contact-info--highlight' ?> js-ellipsis-more-options-container js-ellipsis-more-options-group">
			<i class="authors__item-contact-info-icon fa fa-ellipsis-h js-ellipsis"></i>
			<div class="social-icons authors__item-contact-info-list <?php if($is_highlight) echo 'authors__item-contact-info-list--highlight' ?> js-ellipsis-more-options fade-out">
				
				<?php foreach ($data as $key => $value): ?>
					<a class="social-icons__item authors__item-contact-info-link <?php if ($key === 'other_url') echo 'social-icons__item-other-url' ?>" 
						rel="noopener" 
						target="_blank" 
						href="<?= $value ?>"></a>
				<?php endforeach; ?>

			</div>
		</div>
	<?php endif;
}

function admin_author_notice__error()
{
	global $post;

	$post_title = $post->post_title;
	$author = get_the_author_meta('display_name', $post->post_author);
	
	if (is_admin() && get_post_type() == POST_TYPE_AUTHOR) {
		if ($post_title != $author) {
			$screen = get_current_screen();
			// Only render this notice in the post editor.
			if ( ! $screen || 'post' !== $screen->base ) {
				return;
			}
				
			$class = 'notice notice-error';
			$message = __( 'Title and the selected Author in the Author dropdown list should be the same. Otherwise, author and their details will not be shown in their corresponding law library articles page.' );
		
			printf( '<div class="%1$s"><p>%2$s</p></div>', esc_attr( $class ), ( $message ) );
		}
	}

}
add_action('admin_notices', 'admin_author_notice__error');
?>
<?php
	global $post;

	//Global args
	$args = array(
		'posts_per_page'	=> -1,
		'post_type'			=> POST_TYPE_AUTHOR,
		'post__not_in'		=> array($post->ID),
		'order'				=> 'ASC'
	);

	$author_type = 'current';
	if(!empty($_GET['_type'])) {
		$author_type = $_GET['_type'];
	}

	//Authors with type and not highlight args
	$args['meta_key'] = 'author_type';
	$args['meta_value'] = $author_type;
	$args['meta_compare'] = '=';

	$args['meta_query'] = array(
		'relation'	=> 'AND',
		array(
			'key'     => 'author_type',
			'value'   => $author_type,
			'compare' => '='
		),
		array(
			'key'     => 'is_highlight',
			'value'   => '0',
			'compare' => '='
		),
	);
	
	//Authors with highlight args
	$args_highlight = array(
		'post_type'			=> POST_TYPE_AUTHOR,
		'post__not_in'		=> array($post->ID),
		'meta_query'		=> array(
			'relation'		=> 'AND',
				array(
					'key'     => 'author_type',
					'value'   => $author_type,
					'compare' => '='
				),
				array(
					'key'     => 'is_highlight',
					'value'   => '1',
					'compare' => '='
				)
		),
		'order'				=> 'ASC'
	);
	
	$post_highlight_query = new WP_Query($args_highlight);
	$authors_highlight = $post_highlight_query->posts;

	$post_query = new WP_Query($args);
	
	$authors = $post_query->posts;

	use LM\Post\LawLibrary;
	$lawLibrary = new LawLibrary();
?>
<form class="js-filter-form" method="get" action="<?= wp_make_link_relative(get_permalink()) ?>">
<input type="hidden" name="_type" value="<?= $author_type ?>" />
</form>
<div class="authors__tab js-sticky-banner-trigger js-sticky-banner-trigger-mobile">
	<?php 
		$current_url = add_query_arg( 
			array(
				'_type' => 'current'
			),
			wp_make_link_relative(get_permalink())
		);
		$previous_url = add_query_arg( 
			array(
				'_type' => 'previous'
			),
			wp_make_link_relative(get_permalink())
		);
	?>

	<a href="<?= $current_url ?>" class="authors__tab-item author__current-tab <?= $author_type === 'current' ? 'is-selected' : ''; ?>">
		Current Authors
	</a>
	<a href="<?= $previous_url ?>" class="authors__tab-item author__previous-tab <?= $author_type === 'previous' ? 'is-selected' : ''; ?>">
		Previous Authors
	</a>
</div>
<ul class="page__ul authors__list js-author-list">
	<?php 
	if($page < 2 && is_array($authors_highlight)):
		foreach($authors_highlight as $author_h):

			$post_h_id = $author_h->ID;
			$post_h_meta = get_post_meta($post_h_id);
			$profile_h_pic = $lawLibrary->getAuthorPic($post_h_meta['profile_picture'][0], 'authors__item-profile-pic');
			$social_media_items = get_social_media($post_h_meta);

			$anchor_name = str_replace(' ', '_', $author_h->post_title);
	?>
		<li class="authors__item authors__item--highlight">
			<a id="<?= $anchor_name ?>" class="authors__item-anchor-name"></a>
			<div class="authors__item-profile-pic-info authors__item-profile-pic-info--highlight">
				<img class="authors__item-profile-pic authors__item-profile-pic--highlight" src="<?= $profile_h_pic ?>" alt="<?= $author_h->post_title ?>" />
			</div>
			<div class="authors__item-name-role authors__item-name-role--highlight">
				<span class="authors__item-name"><?= $author_h->post_title ?></span>
				<span class="authors__item-role"><?= $post_h_meta['position'][0] ?></span>
			</div>

			<?php generateSocialMedia($social_media_items, true); ?>
			
			<div class="authors__item-biographical-info js-author-bio-container">
				<p class="page__p authors_p js-authors-bio"></p>
				<p class="readmore-readless__raw js-authors-bio-raw"><?= $post_h_meta['content'][0] ?></p>
			</div>
		</li>
	<?php
		endforeach;
	endif;

	if(is_array($authors)):
		foreach($authors as $author):
			$post_id = $author->ID;
			$post_meta = get_post_meta($post_id);
			$profile_pic = $lawLibrary->getAuthorPic($post_meta['profile_picture'][0], 'authors__item-profile-pic');
			$social_media_items = get_social_media($post_meta);

			$anchor_name = str_replace(' ', '_', $author->post_title);
	?>

			<li class="authors__item">
				<a id="<?= $anchor_name ?>" class="authors__item-anchor-name"></a>
				<div class="authors__item-profile-pic-info">
					<img class="authors__item-profile-pic" src="<?= $profile_pic ?>" alt="<?= $author->post_title ?>" />
				</div>
				<div class="authors__item-name-role">
					<span class="authors__item-name"><?= $author->post_title ?></span>
					<span class="authors__item-role"><?= $post_meta['position'][0] ?></span>
				</div>

				<?php generateSocialMedia($social_media_items); ?>

				<div class="authors__item-biographical-info js-author-bio-container">
					<p class="page__p authors_p js-authors-bio"></p>
					<p class="readmore-readless__raw js-authors-bio-raw"><?= $post_meta['content'][0] ?></p>
				</div>
			</li>
		<?php 
		endforeach;
	endif;
	?>
</ul>
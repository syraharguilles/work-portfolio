<?php

/**
 * @link https://legalmatch.atlassian.net/browse/LMS-13296
*/

namespace LM;

class PostAuthor
{

    const ORIGINAL_AUTHOR = 'article_author';
	const UPDATING_AUTHOR = 'updating_article_author';
	const MANAGING_AUTHOR = 'Jose Rivera';

	/**
	 * @param string $key
	 * @return object
	*/
	public function getAuthor($key = '') {
		$author_keys = array(self::ORIGINAL_AUTHOR, self::UPDATING_AUTHOR);

		if (!$key && !in_array($key, $author_keys)) {
			return;
		}

		$post = get_post();
		$author = null;
		$author_id = get_post_meta($post->ID, $key, true);

		if($author_id) {
			$author = get_post($author_id);
		}

		return $author;
	}

	/**
	 * @param string $key
	 * @return string
	*/
	public function getAuthorName($key = '') {
		$author_keys = array(self::ORIGINAL_AUTHOR, self::UPDATING_AUTHOR);

		if (!$key && !in_array($key, $author_keys)) {
			return;
		}

		$post = get_post();

		$author = $this->getAuthor($key);

		return $author ? $author->post_title : get_the_author_meta('display_name', $post->post_author);
	}
	
	/**
	 * @param string $key
	 * @param string $author_status
	 * @return string
	*/
	public function generatePostAuthor($key = '', $author_status = '') {
		$author_keys = array(self::ORIGINAL_AUTHOR, self::UPDATING_AUTHOR);

		if ((!$key && !in_array($key, $author_keys)) && !$author_status) {
			return;
		}

		$lawlibrary = new Post\LawLibrary();
		$author = $this->getAuthor($key);

		$author_meta = get_post_meta($author->ID);
		$author_profile_pic = $lawlibrary->getAuthorPic($author_meta['profile_picture'][0]);
		$author_type = $author_meta['author_type'][0] ?? '';
		$author_anchor_name = str_replace(' ', '_', $author->post_title) ?? '';
		?>

		<div class='article-authors__item'>
			<div class='article-authors__userpic'>
				<a href="/law-library/authors.html?_type=<?= $author_type?>#<?= $author_anchor_name ?>">
					<img class="js-author-pic" src='<?= $author_profile_pic ?>'
						alt='Photo of page author <?= $author->post_title ?>'
						/>
				</a>
			</div>
			<div class='article-authors__name-position'>
				<p class='article-authors__name'>
					<a href="/law-library/authors.html?_type=<?= $author_type?>#<?= $author_anchor_name ?>"><?= $author->post_title ?></a>
				</p>
				<p class='article-authors__position'>
					<?= $author_meta['position'][0] ?>
				</p>
				<p class="article-authors__status">
					<?php
						if ($author_status == 'original') 
						{ ?>Original Author<?php }
					
						if ($author_status == 'updating')
						{ ?>Updating Author<?php }
					?>
				</p>
			</div>
			<div class="article-authors__bio js-author-bio-container">
				<p class="js-authors-bio"></p>
				<p class="readmore-readless__raw js-authors-bio-raw"><?= $author_meta['content'][0] ?></p>
			</div>
		</div>

	<?php
	}

	/**
	 * @param string $key
	 * @param string $author_status
	 * @return string
	*/
	public function generatePostAuthorNoBio($key = '', $author_status = '') {
		$author_keys = array(self::ORIGINAL_AUTHOR, self::UPDATING_AUTHOR);

		if ((!$key && !in_array($key, $author_keys)) && !$author_status) {
			return;
		}

		$lawlibrary = new Post\LawLibrary();

		if (!empty($key)) {
			$author = $this->getAuthor($key);
		}

		if ($author_status == 'managing') {
			$author = get_page_by_title(self::MANAGING_AUTHOR, OBJECT, 'authors');
		}

		$author_meta = get_post_meta($author->ID);
		$author_profile_pic = $lawlibrary->getAuthorPic($author_meta['profile_picture'][0]);
		$author_type = $author_meta['author_type'][0] ?? '';
		$author_anchor_name = str_replace(' ', '_', $author->post_title) ?? '';
		
		?>
			<div class="col-md-5 article-authors__item article-authors__editor">
				<div class='article-authors__userpic'>
					<a href="/law-library/authors.html?_type=<?= $author_type?>#<?= $author_anchor_name ?>">
						<img class="js-author-pic" src='<?= $author_profile_pic ?>'
							alt='Photo of page author <?= $author->post_title ?>'
							title=''/>
					</a>
				</div>
				<div class='article-authors__name-position'>
					<p class='article-authors__name'>
						<a href="/law-library/authors.html?_type=<?= $author_type?>#<?= $author_anchor_name ?>"><?= $author->post_title ?></a>
					</p>
					<p class='article-authors__position'>
						<?= $author_meta['position'][0] ?>
					</p>
					<p class="article-authors__status">
						<?php
							if ($author_status == 'original') 
							{ ?>Original Editor<?php }

							if ($author_status == 'managing') 
							{ ?>Editor<?php }
						?>
					</p>
				</div>

				<hr class="article-authors__separator">
			</div>
	<?php
	}
}
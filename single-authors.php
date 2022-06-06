<?php

/** @var WP_Post $post */
$post = get_post();

if ( ! $post instanceof WP_Post ) {
	wp_die( '', 404 );
}

$post_meta = get_post_meta($post->ID);

$is_index_page = $post->post_name == POST_TYPE_AUTHOR;

$canonicalUrl = !$is_index_page ? sprintf('https://www.legalmatch.com/law-library/%s.html', $post->post_name) : 'https://www.legalmatch.com/law-library/authors.html';

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title><?= esc_attr( $post->post_title ) ?> | LegalMatch Authors</title>
    <meta name="description" content="<?= esc_attr( get_post_field( 'MetaD' ) ) ?>">
    <meta name="keywords" content="<?= esc_attr( get_post_field( 'MetaKW' ) ) ?>">
    <meta http-equiv='X-UA-Compatible' content='IE=edge'/>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'/>

    <link rel='canonical' href='<?= $canonicalUrl ?>'/>

    <?= pseudo_ssi_include( '/ssi/universal-include-head.inc', true ) ?>

	<link inline rel="stylesheet" href="/dist/css/authors.vendor.css" type="text/css" />
	<link inline rel="stylesheet" href="/dist/css/authors.entry.css" type="text/css" />

    <script>
        (function() {
            if(/Trident/.test(navigator.userAgent) === false) {
                return;
			}
			
			var s = document.createElement('script');
			s.src = 'https://cdn.jsdelivr.net/npm/bootstrap.native@2.0.21/dist/polyfill.min.js';
			s.async = false;
			document.head.appendChild(s);

			var link = document.createElement('link');
			link.href = '/dist/css/bs4.law-library-article-ie.entry.css';
			link.rel = 'stylesheet';
			link.type = 'text/css';
			document.head.appendChild(link);
        })();
	</script>

    <!--# include virtual="/ssi/polyfills.php?mode=js" wait="yes" -->
</head>

<body class="page authors">

    <?= pseudo_ssi_include( '/ssi/google-tag-manager-body.inc', true ) ?>

    <?php locate_template('components/header.php', true); ?>

    <div class="sticky-header__trigger js-sticky-banner-trigger js-sticky-banner-trigger-mobile"></div>
    <div class="main container authors__container">
		<?php cmswp_display_bem_block( 'breadcrumbs/_authors', $breadcrumbs_mixes ); ?>

		<?php if ($is_index_page):?>
			<h1 class="page__h1 authors__h1">
			<?php 
				if ($post->post_title):
					echo $post->post_title;
				endif;
			?>
			
			</h1>
			<p class="page__p authors__p">		
			<?php 
				if ($post_meta['content'][0]):
					echo $post_meta['content'][0]; 
				endif;
			?>
			</p>
		<?php endif;?>
		
		<?php get_template_part('components/bem/author-listing'); ?>

	</div>

	<?php cmswp_display_bem_block( 'footer/_base', $footer_mixes ); ?>

	<?php locate_template('components/bem/explore-lm/_base.php', true); ?>
	<?php cmswp_display_bem_block('other-categories/_base'); ?>

    <?php #START include virtual='/bd/bs4/_modal-iframe.html' ?>
    <div class='modal fade modal-iframe js-modal-iframe-close' data-target='modal-iframe' id='modal-iframe' tabindex='-1' role='dialog' aria-hidden='true'>
        <div class='modal-dialog modal-lg modal-dialog-centered' role='document'>
            <div class='modal-content'>
                <div class='modal-body modal-iframe__body'>
                    <iframe class='modal-iframe__content'></iframe>
                </div>
                <div class='modal-footer modal-iframe__footer'>
                    <button type='button' class='modal-iframe__close js-modal-iframe-close' data-target='modal-iframe' data-dismiss='modal'>Close</button>
                </div>
            </div>
        </div>
    </div>
    <?php #END include virtual='/bd/bs4/_modal-iframe.html' ?>

    <?php cmswp_display_bem_block( 'sticky-header/_lawlib', 'sticky-header--blue' ); ?>

    <script>
        (function() {
            var embedScripts = function() {
                [
                    '/dist/js/authors.vendor.js',
                    '/dist/js/authors.entry.js'
                ].forEach(function(uri) {
                    var s = document.createElement('script');
                    s.src = uri;
                    s.async = false;
                    document.body.appendChild(s);
                });
            };

            if(typeof noPolyfillsToLoad == 'boolean' && noPolyfillsToLoad) {
                embedScripts();
            } else {
                document.addEventListener('LM_Polyfills_Done', embedScripts);
            }
        })();
    </script>

    <script inline src='/scripts/cookies.js'></script>

    <?= pseudo_ssi_include( '/ssi/universal-include.inc', true ) ?>
    <?php #END include virtual='/bd/bs4/_assets-bottom.inc' ?>

    <script>
        setMasterCookie();
        setIntelligentCookie("affId", "<?= get_aff_id() ?>");
    </script>

</body>
</html>
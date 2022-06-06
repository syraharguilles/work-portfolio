
<?php # START include virtual='/bd/bs4/_header.html' ?>
<header class='header header--mobile js-menu-state'>
    <div class='container'>
        <div class='row'>

            <div class='logo header__logo col-xs-12 col-ss-12 col-sm-5'>
                <div class='row logo--mobile'>
                    <a href='/' class='logo__link'>
                    <?php if($isLawLibCA): ?>
                        <img inline src='/images/logo/LegalmatchCA.svg' alt="LegalMatch California Logo"/>
                    <?php else: ?>
                        <img inline src='/images/logo/md.svg' alt="LegalMatch Logo"/>
                    <?php endif; ?>
                    </a>
                    <div class='logo__tagline'>
                        Find the right lawyer now
                    </div>
                    <div class="logo__hamburger-menu js-hamburger-menu">
                        <span class="logo__hamburger-menu-icon" data-hamburger aria-label="Open Menu">
                            <span class="logo__hamburger-menu-icon-cont">	
                                <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            <div class='top-menu col-xs-12 col-ss-12 col-sm-7'>
                <div class='explore-lm top-menu__item js-disabled'>
                    <span
                            class='explore-lm__toggle overlay__toggle js-overlay-toggle top-menu__link'
                            data-target='explore-lm__overlay'>Explore LegalMatch</span>
                </div>

                <div
                    class="user-nav-menu user-nav-menu--loading"
                    data-mixes='{ "logged-in": "header__nav-item header__dropdown top-menu__item", "logged-out": "header__nav-item top-menu__item" }'></div>

                <div class='search top-menu__item js-disabled'>
                    <span class='search__toggle fa fa-search js-search-toggle'
                          data-target='search__form--top-menu'></span>
                    <form id='search__form--top-menu' class='search__form js-search-form' method='get'
                        action='/search.html'>
                        <div class="search__wrapper">
                            <input title='Search query input' name='q' type='text' class='search__input js-search-input'
                                value=''/>
                            <button type='submit' disabled class='search__submit js-search-submit'>Go</button>
                        </div>
                    </form>
                </div>
            </div>

            <?php cmswp_display_bem_block('mobile-menu/_base', 'header__nav--mobile'); ?>
            
        </div>
    </div>
</header>
<?php # END include virtual='/bd/bs4/_header.html' ?>
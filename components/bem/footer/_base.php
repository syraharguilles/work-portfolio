<?php 
    $is_ca_page = defined('IS_CA_PAGE') && IS_CA_PAGE; 
?>

<footer class="footer <?= $mixes ?>">
        <div class="footer__container container">
            <div class="footer__grid <?php if($is_ca_page): ?>footer__grid--ca<?php endif; ?>">
                <? if( is_Old_Safari() ) { ?>
                <div class="footer__menu-logo-trust-container">
                <? } ?>
                <?php cmswp_display_bem_block('logo/_footer', 'footer__logo logo__image--inpage-authors logo__tagline--inpage-authors'); ?>
                
                <div class="footer__menu">
                    <ul class='service-menu'>
                        <li class='service-menu__item'>
                            <a href='/company/user_agreement.html'
                               data-toggle='modal'
                               data-target='#modal-iframe'
                               class='service-menu__link js-modal-iframe-toggle'>User Agreement</a>
                        </li>
                        <li class='service-menu__item'>
                            <a href='/company/privacy_statement.html'
                               data-toggle='modal'
                               data-target='#modal-iframe'
                               class='service-menu__link js-modal-iframe-toggle'>Privacy Policy</a>
                        </li>
                        <li class='service-menu__item'>
                            <a href='/sitemap.html'
                               data-toggle='modal'
                               data-target='#modal-iframe'
                               class='service-menu__link js-modal-iframe-toggle'>Site Map</a>
                        </li>
                    </ul>
    
                    <ul class='service-menu mt-4'>
                        <li class='service-menu__item'>
                            <a href='https://www.legalmatchcareers.com/'
                               class='service-menu__link'
                               title='LegalMatch Careers'
                               target='_blank'>LegalMatch Careers</a>
                        </li>
                    </ul>
                    <?php if($is_ca_page): ?>
                    <div class="ca-referral">
                        LegalMatch California is a CA Bar Certified Lawyer Referral Service #0140, 
                        <span class="ca-referral__nowrap ca-referral__nowrap--lg">dedicated to providing quality, affordable attorneys. Serving all California Counties.</span> 
                        <br/>For technical help call (415) 946-3744.
                    </div>
                    <?php endif; ?>
                </div>
    
                <?php cmswp_display_bem_block('trust-icons/_base', 'footer__icons'); ?>
                <? if( is_Old_Safari() ) { ?>
                </div>
                <? } ?>
                <div class='copyright footer__copyright'>
                    Copyright 1999-<?= date('Y') ?> LegalMatch. All rights reserved.
                </div>
            </div>
        </div>
    </footer>

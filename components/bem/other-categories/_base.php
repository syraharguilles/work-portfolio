
<div class='modal fade other-categories__modal js-other-categories' tabindex='-1' role='dialog' aria-hidden='true'>
    <div class='other-categories__modal-dialog modal-dialog modal-lg modal-dialog-centered' role='document'>
        <div class='other-categories__modal-content modal-content'>
            <div class='other-categories__modal-body  modal-generic modal-body js-other-categories-body'>
                <button type="button" data-dismiss="modal" aria-label="Close" class="modal-generic__close">
                    <span aria-hidden="true">X</span>
                </button>
                <h5 class="other-categories__title">Other categories</h5>
                <h6 class="other-categories__subtitle">Choose the category that best fits your case</h6>

                <?php cmswp_display_bem_block(
                    'other-categories/other-category-list',
                    '', 
                    array(
                        'otherCategoriesEmbed' => '', 
                        'otherCategoriesClasses' => '' )); ?>
            </div>
            <div class="other-categories__modal-footer">
                <i class="other-categories__modal-footer-icon fa fa-chevron-down js-other-categories-modal-footer-icon"></i>
                Scroll <span class="js-other-categories-modal-footer-scroll-text">down</span> for more categories
            </div>
        </div>
    </div>
</div>
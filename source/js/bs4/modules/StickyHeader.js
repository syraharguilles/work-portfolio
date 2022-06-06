'use strict';

if('IntersectionObserver' in window) {
    const header = document.querySelector('.js-sticky-header'),
        startingWidth = 768,
        mobileTarget = document.querySelector('.js-sticky-banner-trigger-mobile, .js-sticky-header-mobile-trigger'),
        desktopTarget = document.querySelector('.js-sticky-banner-trigger, .js-sticky-header-trigger');
    let observer;
    
    if(header) {
        observer = new IntersectionObserver(entries => {    
            entries.forEach(entry => {
                if((desktopTarget && !mobileTarget)
                    || (!desktopTarget && mobileTarget)
                    || (window.innerWidth < startingWidth && mobileTarget && entry.target.isEqualNode(mobileTarget))
                    || (window.innerWidth >= startingWidth && desktopTarget && entry.target.isEqualNode(desktopTarget))) {
        
                    if(entry.boundingClientRect.top < 0) {
                        header.style.display = 'block';
						document.body.classList.add("sticky-header-visible");
                    }
                    else {
                        header.style.display = 'none';
						document.body.classList.remove("sticky-header-visible");
                    }
                }
            });
        },
        { threshold: 1.0 });

        if(mobileTarget) {
            observer.observe(mobileTarget);
        }

        if(desktopTarget) {
            observer.observe(desktopTarget);
        }
    }
}
else {
    console.log('Browser does not support IntersectionObserver');
}

<?php
    /** LMS-6768 */
    list( $isAttorneyLoggedIn, $isClientLoggedIn ) = login_type_checker();
?>
<div class='explore-lm__overlay overlay <?= $mixes ?>' id='explore-lm__overlay'>
    <div class='container'>
        <div class='explore-lm__grid'>
			<h6 class='explore-lm__title'>
				Choose Your Legal Category:
			</h6>
            <div class='explore-lm__categories'>
                <div class='explore-lm__categories-item'>
                    <a class='explore-lm__categories-link' href='/family-law-lawyers.html'>Family</a>
                </div>
                <div class='explore-lm__categories-item'>
                    <a class='explore-lm__categories-link' href='/employment-lawyers.html'>Employment</a>
                </div>
                <div class='explore-lm__categories-item'>
                    <a class='explore-lm__categories-link' href='/criminal-lawyers.html'>Criminal Defense</a>
                </div>
                <div class='explore-lm__categories-item'>
                    <a class='explore-lm__categories-link' href='/real-estate-lawyers.html'>Real Estate</a>
                </div>
                <div class='explore-lm__categories-item'>
                    <a class='explore-lm__categories-link' href='/business-lawyers.html'>Business</a>
                </div>
                <div class='explore-lm__categories-item'>
                    <a class='explore-lm__categories-link' href='/immigration-lawyers.html'>Immigration</a>
                </div>
                <div class='explore-lm__categories-item'>
                    <a class='explore-lm__categories-link' href='/personal-injury-lawyers.html'>Personal Injury</a>
                </div>
                <div class='explore-lm__categories-item'>
                    <a class='explore-lm__categories-link' href='/estate-lawyers.html'>Wills, Trust &amp; Estates</a>
                </div>
				<div class='explore-lm__categories-item'>
					<a class='explore-lm__categories-link' href='/bankruptcy-lawyers.html'>Bankruptcy</a>
				</div>
				<div class='explore-lm__categories-item'>
					<a class='explore-lm__categories-link' href='/financial-lawyers.html'> Finances</a>
				</div>
                <div class='explore-lm__categories-item'>
                    <a class='explore-lm__categories-link' href='/government-lawyers.html'>Government</a>
                </div>
                <div class='explore-lm__categories-item'>
                    <a class='explore-lm__categories-link' href='/defective-products-lawyers.html'>Products &amp; Services</a>
                </div>
                <div class='explore-lm__categories-item'>
                    <a class='explore-lm__categories-link' href='/intellectual-property-lawyers.html'>Intellectual Property</a>
                </div>
                <div class='explore-lm__categories-item'>
                    <a class='explore-lm__categories-link' href='/foreclosure-lawyers.html'>Foreclosure</a>
                </div>
                <div class='explore-lm__categories-item'>
                    <a class='explore-lm__categories-link' href='/child-support-lawyers.html'>Child Support</a>
                </div>
                <div class='explore-lm__categories-item'>
                    <a class='explore-lm__categories-link' href='/dui-dwi-lawyers.html'>DUI/DWI</a>
                </div>
                <div class='explore-lm__categories-item'>
                    <a class='explore-lm__categories-link' href='/divorce-lawyers.html'>Divorce</a>
                </div>
                <div class='explore-lm__categories-item'>
                    <a class='explore-lm__categories-link' href='/wills-probate-lawyers.html'>Probate</a>
                </div>
				<div class='explore-lm__categories-item'>
					<a class='explore-lm__categories-link' href='/contract-lawyers.html'>Contract</a>
				</div>
				<div class='explore-lm__categories-item'>
					<a class='explore-lm__categories-link' href='/property-lawyers.html'>Property</a>
				</div>
                <div class='explore-lm__categories-item'>
                    <span class='explore-lm__categories-link explore-lm__categories-link--pointer' href="#" data-toggle="modal" data-target=".other-categories__modal">Other Legal Categories</span>
                </div>
            </div>

			<h6 class='explore-lm__other-title'>LegalMatch Resources</h6>
            <div class='explore-lm__other'>

                <div class='explore-lm__other-ddown dropdown'>
                    <button
                            data-toggle='dropdown'
                            aria-haspopup='true'
                            aria-expanded='false'
                            id='explore-lm__other-ddown-need'
                            class='explore-lm__other-ddown-title dropdown-toggle'>
                        Law Library
                    </button>
                    <div class='explore-lm__other-ddown-content dropdown-menu'
                         aria-labelledby='explore-lm__other-ddown-need'>
                         <a class='explore-lm__other-ddown-item dropdown-item' href='/law-library/'>Online Law
                            Library</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                           href='/law-library/article/business.html'>&nbsp;&nbsp;Business
                            Law</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                           href='/law-library/article/civil.html'>&nbsp;&nbsp;Civil
                            Law</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                           href='/law-library/article/criminal.html'>&nbsp;&nbsp;Criminal
                            Law</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                           href='/law-library/article/jobs-and-employment.html'>&nbsp;&nbsp;Employment
                            Law</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                           href='/law-library/article/family.html'>&nbsp;&nbsp;Family
                            Law</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                           href='/law-library/article/finances.html'>&nbsp;&nbsp;Finance
                            Law</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                           href='/law-library/article/government.html'>&nbsp;&nbsp;Government
                            Law</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                           href='/law-library/article/immigration.html'>&nbsp;&nbsp;Immigration
                            Law</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                           href='/law-library/article/insurance.html'>&nbsp;&nbsp;Insurance
                            Law</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                            href='/law-library/article/intellectual-property.html'>&nbsp;&nbsp;Intellectual
                            Property Law</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                            href='/law-library/article/personal-injury.html'>&nbsp;&nbsp;Personal Injury
                            Law</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                           href='/law-library/article/products-and-services.html'>&nbsp;&nbsp;Products
                            &amp;
                            Services Law</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                           href='/law-library/article/real-estate.html'>&nbsp;&nbsp;Real
                            Estate
                            Law</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                            href='/law-library/article/wills-trusts-and-estates.html'>&nbsp;&nbsp;Wills, Trusts & Estates Law</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                            href='/law-library/article/attorney-referral-services.html'>&nbsp;&nbsp;Attorney Referral Services</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                            href='/top-ten/'>&nbsp;&nbsp;Top 10 Most Popular Articles</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                             href='/legal-dictionary/'>&nbsp;&nbsp;Legal Dictionary</a>
                    </div>
                </div>

                <div class='explore-lm__other-ddown dropdown'>
                    <button
                        data-toggle='dropdown'
                        id='explore-lm__other-ddown-explore'
                        class='explore-lm__other-ddown-title dropdown-toggle'>
						Company Information
                    </button>
                    <div class='explore-lm__other-ddown-content dropdown-menu'
                            aria-labelledby='explore-lm__other-ddown-explore'>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                            href='/how-it-works.html'>How It Works - Clients</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                            href='https://lawblog.legalmatch.com/' target='_blank'>Law
                            Blog</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                            href='/company/news.html'>Legal News</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                            href='/legalcenter.html'>Legal Center</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                            href='/company/about_us.html'>About
                            LegalMatch</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                           href='/company/customer_testimonials.html'>Consumer Satisfaction</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                            href='https://www.legalmatchcareers.com/' target='_blank'>Careers</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                            href='/company/contactus.html'>Contact Us</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                            href='/company/policies.html'>Policies</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                            href='/help_faq.html'>FAQs</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                            href='/company/execteam.html'>Executive Team</a>
                    </div>
                </div>

                <div class='explore-lm__other-ddown dropdown'>
                    <button
                            data-toggle='dropdown'
                            id='explore-lm__other-ddown-attorneys'
                            class='explore-lm__other-ddown-title dropdown-toggle'>
                        For Attorneys
                    </button>
                    <div class='explore-lm__other-ddown-content dropdown-menu js-explore-lm-attoney-dropdown'
                         aria-labelledby='explore-lm__other-ddown-attorneys'>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                           href='/attorneys/'>Market
                            Your
                            Law Practice</a>
                        <?php if ( $isAttorneyLoggedIn === true ){ ?>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                           href='/home/ia/home.do'>Attorney Dashboard</a>
                        <?php } else { ?>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                           href='/attorneys/sign_in.html'>Attorney
                            Login</a>
                        <?php } ?>
                        <a class='explore-lm__other-ddown-item dropdown-item'
                           href='/attorneys/attorney-need.html'>Did
                            LegalMatch Call You Recently?</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
							href='/attorneys/how-it-works.html'>How It Works - Attorneys</a>
                        <a class='explore-lm__other-ddown-item dropdown-item'
							href='/attorneys/resources/'>Attorney Resources</a>
						<a class='explore-lm__other-ddown-item dropdown-item'
							href='/attorneys/attorney-success-stories.html'>Attorney Success Stories</a>
                        <?php if (  $isAttorneyLoggedIn === false ){ ?>
						<a class='explore-lm__other-ddown-item dropdown-item'
                            href='/home/info/infoLP3.do'>View Cases</a>
                        <?php } ?>
                    </div>
                </div>
            </div>

        </div>

    </div>
</div>

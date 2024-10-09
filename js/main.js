'use strict';

$(window).on('load', function() {
    /*------------------
        Preloder
    --------------------*/
    $(".loader").fadeOut();
    $("#preloder").delay(400).fadeOut("slow");
    

    var masonryLayout = function () {
        $('.portfolios-area').masonry({
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true
        });
    }
    
    /*------------------
        Mixitup js
    --------------------*/
    masonryLayout();
    if($('.portfolios-area').length > 0 ) {
        var containerEl = document.querySelector('.portfolios-area');
        var mixer = mixitup(containerEl, {
            callbacks: {
                onMixEnd: function() {
                    masonryLayout();
                }
            }
        });
    }

});

(function($) {
    /*------------------
        Navigation
    --------------------*/
    $('.nav-switch').on('click', function () {
        $('.main-menu').slideToggle();
    });
    
    $(document).ready(function() {
        // Initialize Magnific Popup for gallery
        $('.image-gallery').magnificPopup({
            delegate: 'a', // child items selector, by clicking on it popup will open
            type: 'image',
            gallery: {
                enabled: true // Enables the gallery mode for navigation
            },
            mainClass: 'mfp-fade', // Fade animation
            removalDelay: 300, // Delay in milliseconds before removing the popup
            closeOnContentClick: true
        });
    });
    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function() {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });


    /*------------------
        Hero Slider
    --------------------*/
    var hero_s = $(".hero-slider");
    hero_s.owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        items: 1,
        dots: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        navText: ['', '<img src="img/icons/arrow-right.png" alt="">'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: false,
        onInitialized: function() {
            var a = this.items().length;
            $("#snh-1").html("<span>1</span>/<span>" + a + "</span>");
        }
    }).on("changed.owl.carousel", function(a) {
        var b = --a.item.index, a = a.item.count;
        $("#snh-1").html("<span> "+ (1 > b ? b + a : b > a ? b - a : b) + "</span>/<span>" + a + "</span>");
    });
    

    /*------------------
        Portfolio Slider
    --------------------*/
    $('.portfolio-slider').owlCarousel({
        loop: true,
        margin: 0,
        dots: false,
        margin: 0,
        nav:true,
        center: true,
        startPosition: 1,
        navText: ['', '<img src="img/icons/arrow-right.png" alt="">'],
        responsive : {
            0 : {
                items: 1
            },
            480 : {
                items: 3
            }
        },
        onInitialized: function() {
            var a = this.items().length;
            $("#snh-1").html("<span>2</span>/<span>" + a + "</span>");
        }
    }).on("changed.owl.carousel", function(a) {
        var b = --a.item.index, a = a.item.count;
        $("#snh-1").html("<span> "+ (1 > b ? b + a : b > a ? b - a : b) + "</span>/<span>" + a + "</span>");
    });
    

    /*----------------------
        Portfolio item size
    ------------------------*/
    var PorfolioItemFix = function () {
        $( ".portfolio-item" ).each(function( index ) {
            var portfolioItem = $(this);
            var PIheight = portfolioItem.width();
            portfolioItem.css('height',PIheight);
        });

        var portfolioIntro = $( ".portfolio-item.__wide");
        var Introheight = portfolioIntro.width() / 2;
        if($(window).width() > 768) {
            portfolioIntro.css('height', Introheight);
        }
        $('.portfolios-area').css('minHeight', Introheight)
    }
    PorfolioItemFix();
    $(window).on('resize',function(){
        PorfolioItemFix();
    });


    /*------------------
        Fullpage js
    --------------------*/
    if($('#fullpage').length > 0 ) {
        $('#fullpage').fullpage({
            //options here
            autoScrolling:false,
            scrollHorizontally: true,
            easing: 'easeInOutCubic',
            easingcss3: 'ease',
            fitToSection: false,
            scrollBar: true,
            navigation: true,
            navigationPosition: 'right',
            responsiveWidth: 991,
        });
    }

  // Initialize EmailJS
emailjs.init("KEY GOES HERE");

$(document).ready(function() {
    // Date validation
    $('#bookingDate').on('change', function() {
        const selectedDate = new Date($(this).val());
        const today = new Date();
        
        // Set time to 00:00:00 for date comparison
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            alert("The date must be in the future.");
            $(this).val(''); // Clear the invalid date
        }
    });

    // Form submission with EmailJS
    $(".contact-form").on("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        var form = $(this);

        // Collect form data
        var formData = {
            from_name: form.find('input[name="name"]').val(),
            from_email: form.find('input[name="email"]').val(),
            subject: form.find('input[name="subject"]').val(),
            date: form.find('input[name="date"]').val(),
            message: form.find('textarea[name="message"]').val()
        };

        // Send the email using EmailJS
        emailjs.send("SERVICE NUMBER GOES HERE", "EMAIL TEMPLATE GOES HERE", formData)
            .then(function(response) {
                console.log("Email sent successfully:", response);
                alert("Booking details sent successfully!");
                form[0].reset(); // Reset form fields
            }, function(error) {
                console.error("Error sending email:", error);
                alert("There was a problem sending your booking details. Please try again.");
            });
    });
});

})(jQuery);

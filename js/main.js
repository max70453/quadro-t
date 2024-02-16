(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $('.testimonial-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    
    //send message
    $( document ).ready(function() {
        $.validator.setDefaults({
            errorClass: 'text-danger'
        })

        let contactForm = $('.ajax-contact-form');

        contactForm.validate({
            rules: {
                name: {
                    required: true,
                    minlength: 4
                },
                email: {
                    required: true
                },
                tel: {
                    required: true
                }
            },
            messages: {
                name: {
                    required: "Имя обязательно для заполнения",
                    minlength: jQuery.validator.format("Необходимо ввести как минимум {0} символовы")
                },
                email: {
                    required: "Email обязательн для заполнения"
                },
                tel: {
                    required: "Телефон обязательн для заполнения"
                }
            },
            submitHandler: function(form){
                var str = $(form).serialize();
                $.ajax({
                    type: "POST",
                    url: "http://localhost/contact.php",
                    //headers: {  "Access-Control-Allow-Origin:": "*"},
                    data: str,
                    success: function(xml, textStatus, xhr){
                        if(xhr.status === 200){
                            $("#exampleModal").modal("show");
                        }
                    },
                    error: function (jqXHR, exception) {
                        if (jqXHR.status === 0) {
                            alert('Not connect. Verify Network.');
                        } else if (jqXHR.status == 404) {
                            alert('Requested page not found (404).');
                        } else if (jqXHR.status == 500) {
                            alert('Internal Server Error (500).');
                        } else if (exception === 'parsererror') {
                            alert('Requested JSON parse failed.');
                        } else if (exception === 'timeout') {
                            alert('Time out error.');
                        } else if (exception === 'abort') {
                            alert('Ajax request aborted.');
                        } else {
                            alert('Uncaught Error. ' + jqXHR.responseText);
                        }
                    }
                });
                form.reset();
                return false;
            }
        });

    });

    // active navmenu
   $(".navbar-nav").find(".nav-item").on('click', (e) => {
        $(".navbar-nav").find(".nav-item").removeClass('active');
        $(e.currentTarget).addClass("active");
    });

})(jQuery);


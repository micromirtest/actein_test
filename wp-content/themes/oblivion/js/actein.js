(function ($)
{

    function eh(selector)
    {
        var mh = 0;
        $(selector).each(function(k,v)
        {
           if(mh<$(v).outerHeight()) 
           {
               mh = $(v).outerHeight();
           }
        });
        $(selector).css('min-height',mh+10);
    }

    function calculateAge(birthMonth, birthDay, birthYear) {
        console.log(birthMonth);
        console.log(birthDay);
        console.log(birthYear);

        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var currentMonth = currentDate.getMonth();
        var currentDay = currentDate.getDate();
        age = currentYear - birthYear;

        if (currentMonth < birthMonth - 1) {
            age--;
        }
        if (birthMonth - 1 == currentMonth && currentDay < birthDay) {
            age--;
        }
        return age;
    }

    $(document).ready(function ()
    {   
        eh('.eh4');

        $('#signature').signature({syncField: '#signatureJSON'});
        $('#clearButton').click(function () {
            $('#signature').signature('clear');
        });

        $('#change_location').change(function ()
        {
            console.log('test');
            $(this).closest('form').submit();
        })

        $('.menu-new-top-menu-container a').off('click');
        $('#hidden_18 span,#hidden_13 span').click(function ()
        {
            $(this).parent().parent().fadeOut(300);
        });

        $('#enlist').click(function ()
        {
            $('#register-form').fadeIn(300);
            $('#login-form').css('display', 'none');
        });

        $('#register-form').submit(function ()
        {
            if ($(this).hasClass('blocked'))
            {
                $('#hidden_13').css('display', 'block');
                return false;
            }
        });

        $('#birth_date,#parent_birth_date,#emergency_birth_date').datepicker(
                {
                    dateFormat: "yy-mm-dd",
                    changeMonth: true,
                    changeYear: true,
                    yearRange: "-100:-11",
                    maxDate: '-11y',
                    onSelect: function (date, object)
                    {
                        /*
                         * selectedDay: "11"
                         selectedMonth: 7
                         selectedYear: 1966
                         * 
                         */

                        if (object.id === 'birth_date')
                        {
                            var calc = calculateAge(object.selectedMonth, object.selectedDay, object.selectedYear);

                          /*  if (calc >= 18)
                            {
                                $('#hidden_18').css('display', 'none');
                                $('#hidden_13').css('display', 'none');
                                $('#register-form').removeClass('blocked');
                                $('#parent').css('display', 'none');
                                $('#parent input').attr('required', false);
                            } else if (calc < 13)
                            {
                                $('#parent input').attr('required', true);
                                $('#parent').css('display', 'block');
                                $('#hidden_13').css('display', 'block');
                                $('#hidden_18').css('display', 'none');
                                $('#register-form').addClass('blocked');
                            } else
                            {
                                $('#parent input').attr('required', true);
                                $('#parent').css('display', 'block');
                                $('#register-form').removeClass('blocked');
                                $('#hidden_13').css('display', 'none');
                                $('#hidden_18').css('display', 'block');
                            } */
                            /* Disabled blocking when user under 18 years */
                            $('#hidden_18').css('display', 'none');
                            $('#hidden_13').css('display', 'none');
                            $('#register-form').removeClass('blocked');
                            $('#parent').css('display', 'none');
                            $('#parent input').attr('required', false);
                        }
                    }
                }
        );

        $('#set-photo').click(function (e)
        {


            if (typeof wp !== 'undefined' && wp.media && wp.media.editor) {

                e.preventDefault();
                var button = $(this);
                var id = button.prev();

                wp.media.editor.send.attachment = function (props, attachment) {
                    console.log(attachment);
                    $('#preview').html('<img src="' + attachment.url + '"  />');
                    $('#photo-id').val(attachment.id);
                };
                wp.media.editor.open();
                return false;

            }

        });

        $('#buyout').click(function ()
        {
            var min = parseInt($('#min-to-buyout').val());
            var current = parseInt($('input[name="quantity"]').val());
            if (current < min)
            {
                alert('You need to buy at least ' + min + ' timeslots');
                return false;
            }
        });

        $('.one-event-showcase').click(function (e)
        {
            e.preventDefault();
            if (!$(this).hasClass('no-redirect'))
            {
                if (typeof $(this).attr('rel') !== 'undefined' && $(this).attr('rel') !== '')
                {
                    window.location = $(this).attr('rel');
                }

            }

        });

        $('#switch-it').click(function (e)
        {
            e.preventDefault();
            $('#welcome-soldier').css('display', 'none');
            $('#register-form').fadeIn(300);
        });

        $('#login-form input').keydown(function (e)
        {
            if (e.keyCode === 13)
            {
                $('#login-form').submit();
            }
        });

        $('#next-events-table tr').click(function (e)
        {
            e.preventDefault();
            var t = $(this).attr('rel');
            if (typeof t !== 'undefined')
            {
                window.location = t;
            }
        });


        //Cufon.replace('.col-xs-4 p,.no-no,.location-name,.summary.entry-summary > h1,#other-info, .one-event-showcase,.prevnext,.date-current,.the-days a,.other-day,.booking-top,.check-out,#click-here,#stats-column .span4,#hi,#register-button,#register-form label, #register-form h3,#form-itself label,#customer_login h2,.normal-page h4,.gform_title,.widget h3, .title_wrapper h1,#wanna,.menu-new-top-menu-container li a,.widget-title,.newsb-title a,.fancy-font,.with-font,.font-footer');

        setTimeout(function ()
        {
            $('#next-events-table td,#next-events-table th,.col-xs-4 p,.no-no,.location-name,.summary.entry-summary > h1,#other-info, .one-event-showcase,.prevnext,.date-current,.the-days a,.other-day,.booking-top,.check-out,#click-here,#stats-column .span4,#hi,#register-button,#register-form label, #register-form h3,#form-itself label,#customer_login h2,.normal-page h4,.gform_title,.widget h3, .title_wrapper h1,#wanna,.menu-new-top-menu-container li a,.widget-title,.newsb-title a,.fancy-font,.with-font,.font-footer').css('visibility', 'visible');
        }, 500);

        $('.row-b').click(function (e)
        {
            if ($(this).attr('rel') !== 'undefined')
            {
                window.location = $(this).attr('rel');
            }
        });

        if ($('#search-map').length > 0)
        {


            var latlng = {lat: 51.5073298, lng: -0.1274475};
            if ($("#lat").length > 0)
            {
                var latlng = {lat: parseFloat($('#lat').val()), lng: parseFloat($('#lng').val())};
            }
            var map = new google.maps.Map(document.getElementById('search-map'), {
                center: latlng,
                zoom: 15
            });

            var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                icon: marker_icon
            });
        }

    });
})(jQuery);

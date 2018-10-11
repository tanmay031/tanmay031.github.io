// Create a clone of the menu, right next to original.
$('#header').addClass('original').clone().insertAfter('#header').addClass('cloned').css('position','fixed').css('top','0').css('margin-top','0').css('z-index','500').removeClass('original').hide();

scrollIntervalID = setInterval(stickIt, 10);


function stickIt() {

  var orgElementPos = $('.original').offset();
  orgElementTop = orgElementPos.top;               

  if ($(window).scrollTop() >= (orgElementTop)) {
    // scrolled past the original position; now only show the cloned, sticky element.

    // Cloned element should always have same left position and width as original element.     
    orgElement = $('.original');
    coordsOrgElement = orgElement.offset();
    leftOrgElement = coordsOrgElement.left;  
    widthOrgElement = orgElement.css('width');
    $('.cloned').css('left',leftOrgElement+'px').css('top',0).css('width',widthOrgElement).show();
    $('.original').css('visibility','hidden');
  } else {
    // not scrolled past the menu; only show the original menu.
    $('.cloned').hide();
    $('.original').css('visibility','visible');
  }
}

$(".clients-carousel").flexisel({
        visibleItems: 5,
        animationSpeed: 1000,
        autoPlay: true,
        autoPlaySpeed: 3000,            
        pauseOnHover: true,
        enableResponsiveBreakpoints: true,
        responsiveBreakpoints: { 
            portrait: { 
                changePoint:480,
                visibleItems: 1
            }, 
            landscape: { 
                changePoint:640,
                visibleItems: 2
            },
            tablet: { 
                changePoint:768,
                visibleItems: 3
            }
        }
});


function toggleChevron(e) {
    $(e.target)
        .prev('.panel-heading')
        .find("i.indicator")
        .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
}
$('#accordion').on('hidden.bs.collapse', toggleChevron);
$('#accordion').on('shown.bs.collapse', toggleChevron);


// Search Jobs
$('#jobs').submit(function(e){
    e.preventDefault();
    //var keywords = $('.form-inline').val();
    $.ajax({
        url: 'search',
        type: "get",
        data: {'keywords':$('input[name=keywords]').val()},
        success: function(data){
            $('.job-list').html(data);
        }
    });
});

// Search training
$('#training').submit(function (e) {
    e.preventDefault();
    $.ajax({
        url: 'search/training',
        type: "get",
        data: {'keywords': $('input[name=keywords]').val()},
        success: function (data) {
            $('.job-list').html(data);
        }
    });
});

// Search knowledge
$('#knowledge').submit(function(e){
    e.preventDefault();
    //var keywords = $('.form-inline').val();
    $.ajax({
        url: 'knowledge/search',
        type: "get",
        data: {'keywords':$('input[name=keywords]').val()},
        success: function(data){
            $('.job-list').html(data);
        }
    });
});

// Search resource
$('#resource').submit(function(e){
    e.preventDefault();
    //var keywords = $('.form-inline').val();
    $.ajax({
        url: 'resource/search',
        type: "get",
        data: {'keywords':$('input[name=keywords]').val()},
        success: function(data){
            $('.job-list').html(data);
        }
    });
});


$('img').bind('contextmenu', function(e){
    return false;
});


// Realtime feedback
$('#send-feedback').submit(function (e) {
    e.preventDefault();
    $.ajax({
        url: 'send/feedback',
        type: "get",
        data: {'email':$('input[name=email]').val(), 'feedback' : $('#textarea').val()},
        success: function(data){
            document.forms['feedback-form'].reset();
            if (data.status === 'success') {
                document.getElementById('message').innerHTML = "Thanks for your feedback!. We will get back to you very soon.";
            }else{
                document.getElementById('message')[0].innerHTML = "Something went wrong!";
            }
        }, error: function (error) {
            document.getElementById('message')[0].innerHTML = "Something went wrong!";
        }
    })
});


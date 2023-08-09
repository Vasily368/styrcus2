$(function(){
	/*Плавный переход по клику на пунктах меню в хедере*/
	$('.header__navigation ').on('click','a', function (e) {
      e.preventDefault();
      if($('.header__burger').hasClass('active')) {
      	$('.header__burger').removeClass('active');
			 	$('.header__navigation').removeClass('active');
		 		$('body').css('overflow','auto');
      }	      
	   var id  = $(this).attr('href'),
	       top = $(id).offset().top;
	   $('body,html').animate({scrollTop: (top - 50)}, 1500);	      
   });

  /*Настройка кликов по меню-гамбургеру*/
	$('.header__burger').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
	 	$('.header__navigation').toggleClass('active');
	 	if($('.header__burger').hasClass('active')) {
	 		$('body').css('overflow','hidden');
	 	}
	 	else {
	 		$('body').css('overflow','auto');
	 	}
	});	

	/*Переключение табов в блоке с услугами*/
  $('.services__trigger').on('click', function(e){
    e.preventDefault();
    var id = $(this).attr('data-tab');
    $('.services__trigger').removeClass('services__trigger--active');
    $('.services__tab').fadeOut(200);
    $(this).addClass('services__trigger--active');
    $('#' + id).fadeIn(300);
  });  

  /*Плавный переход по клику на пунктах меню в футере*/
	$('.footer__navigation ').on('click','a', function (e) {
		let id  = $(this).attr('href'),
	      top = $(id).offset().top;
	   $('body,html').animate({scrollTop: top}, 1500);
	});

	/*Работа с модальными окнами*/
	$('button[data-action="open-modal"]').on('click', function(e){
    e.preventDefault();
    let id = $(this).attr('data-modal');
    $('body').css('overflow','hidden');
    $('#' + id).find('.modal__thanks').hide();
    $('#' + id).find('.modal__main').show();
  	$('#' + id).addClass('open');
  	$('.modal__close, .modal__overlay').on('click', function(){
	  	$('#' + id).removeClass('open');
	  	$('body').css('overflow','auto');
	  });	
  }); 

  /*Действия при отправке форм*/
  $('form').submit(function(e) {
  	e.preventDefault();
  	let $form = $(this);
    //if (!$form.hasClass('modal__form--order')) {

        $.ajax({
            url: '/ajax/mail.php',
            data: $form.serialize(),
            type: 'post',
            success: function() {
                
                if ($form.attr('id') == 'credit-form') {
                    ym(75598777,'reachGoal','rass');
                }
                
                if ($form.attr('id') == 'get_price') {
                    ym(75598777,'reachGoal','getprice');
                }
                
                if ($form.attr('id') == 'callback-form') {
                    ym(75598777,'reachGoal','callback');
                }

                if ($form.hasClass('top__form')) {
                    ym(75598777,'reachGoal','home');
                }

                if ($form.attr('id') == 'warranty') {
                    ym(75598777,'reachGoal','dogovor');
                }
                
                if ($form.attr('id') == 'complaint') {
                    ym(75598777,'reachGoal','jaloba');
                }
                
                if ($form.attr('id') == 'dop') {
                    ym(75598777,'reachGoal','dop');
                }
                if ($form.attr('id') == 'order-form') {
                    ym(75598777,'reachGoal','order');
                }
                
                
                $form.closest('.modal').find('.modal__main').fadeOut(10);
                $form.closest('.modal').find('.modal__thanks').fadeIn(200);
                $form.trigger('reset');
            }
        })

    //}  	
  });

  $('#top-form, #order-form').submit(function(e) {
  	e.preventDefault();
  	$(this).trigger('reset');
    $('#order-modal').removeClass('open');
  	$('body').css('overflow','hidden');
  	$('#interest-modal').addClass('open');
  	$('#interest-modal .modal__close, #interest-modal .modal__overlay').on('click', function(){
	  	$('#interest-modal').removeClass('open');
	  	$('body').css('overflow','auto');
	  });	
	  
  });

  $('.interest__item-button').on('click', function(e){
    $('#interest-modal').removeClass('open');
    $('#additional-modal').find('.modal__thanks').hide();
    $('#additional-modal').find('.modal__main').show();
    $('#additional-modal').addClass('open');
    $('.modal__close, .modal__overlay').on('click', function(){
      $('#additional-modal').removeClass('open');
      $('body').css('overflow','auto');
    });
  });

  $('#credit-form').submit(function(e) {
  	e.preventDefault();
  	$(this).trigger('reset');
  	$('body').css('overflow','hidden');
  	$('#thanks-modal').addClass('open');
  	$('#thanks-modal .modal__close, #thanks-modal .modal__overlay').on('click', function(){
	  	$('#thanks-modal').removeClass('open');
	  	$('body').css('overflow','auto');
	  });	
  });

	let mapOffset = $('#map').offset().top,
			flag = 0;
	$(window).scroll(function() {
		/*Отложенная загрузка Гугл-карты*/
    let scrollY = $(window).scrollTop();
    if(scrollY >= (mapOffset - 300) && flag == 0) {
    	let dataAttribute = $('#map iframe').attr('data-original');
    	$('#map iframe').attr('src',dataAttribute);
    	flag++;
    }

    /*Приклеивание меню к верху экрана при скролле вниз*/
    if(scrollY > 400) {
    	$('.header').addClass('header--sticky');
    }
    else {
    	$('.header').removeClass('header--sticky');
    }
  });

  /*Установление маски на поле с телефоном*/
  if($('input[type=tel]')){   
    $('input[type=tel]').each(function(){
      $(this).mask("+7 (999) 999-99-99",{autoclear: false});
    });
  };

  /*Смотреть больше отзывов*/
  $('#reviews-more').on('click', function() {
    if($(this).hasClass('active')) {
      $(this).text('показать ещё');
      $(this).removeClass('active');
    } else {
        $(this).text('скрыть часть отзывов');
        $(this).addClass('active');
      }
    $(this).parent().siblings('#reviews-hidden').slideToggle(200);
  });
});

/*reviews-slider*/


$('.reviews-slider').slick({
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 2000,
  prevArrow:'<button type="button" class="slick-prev"><img src="images/arrow-left.png"></button>',
  nextArrow:'<button type="button" class="slick-next"><img src="images/arrow-right.png"></button>',
  responsive:[
  {

  breakpoint: 1137,
      settings: {
         slidesToShow: 4,
      }
    },
     {
      breakpoint: 997,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 760,
      settings: {
        slidesToShow: 3,
        
      }
    },
    {
      breakpoint: 676,
      settings: {
        slidesToShow: 2,
        
      }
    },
     {
      breakpoint: 535,
      settings: {
        slidesToShow: 1,
        
      }
    },
     
  ]
 

 
 

});

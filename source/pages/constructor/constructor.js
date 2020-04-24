
require("../../libs/matchMedia");
require("../../libs/libs").magnific_popup();
require("../../libs/libs").jqueryui();
require("../../libs/libs").touchPunch();
import './constructor.sass';
import Swiper from 'swiper';

//import '../../pages/constructor/constructor.pug'; //это для обновления страницы при hotreload - при npm build убрать

// функция throttle
function throttle(func, ms) {

	var isThrottled = false,
		savedArgs,
		savedThis;

	function wrapper() {

		if (isThrottled) { // (2)В этом состоянии все новые вызовы запоминаются в замыкании через savedArgs/savedThis. Обратим внимание, что и контекст вызова и аргументы для нас одинаково важны и запоминаются одновременно. Только зная и то и другое, можно воспроизвести вызов правильно.
			savedArgs = arguments;
			savedThis = this;
			return;
		}

		func.apply(this, arguments); // (1)Декоратор throttle возвращает функцию-обёртку wrapper, которая при первом вызове запускает func и переходит в состояние «паузы» (isThrottled = true).

		isThrottled = true;

		setTimeout(function () {
			isThrottled = false; // (3)Далее, когда пройдёт таймаут ms миллисекунд – пауза будет снята, а wrapper – запущен с последними аргументами и контекстом (если во время паузы были вызовы).
			if (savedArgs) {
				wrapper.apply(savedThis, savedArgs);
				savedArgs = savedThis = null;
			}
		}, ms);
	}

	return wrapper;
}
// табы tabs
function tabs(parent) {
	parent.on('click', '.tabs-item', function (event) { //ссылки которые будут переключать табы
		event.preventDefault();
    console.log('tabs click');

    parent.find(".tabs-items-wrap .tabs-item[data-tab]").removeClass('active'); //убираем активные состояния у ссылок
		parent.find(".ready-to-create__constructor-steps .ready-to-create__constructor-step[data-tab]").removeClass('active');
		let data = $(this).data('tab');
		let that = $(this);

		if(data == '1') {
			// связь между фреймом (конструктором) и сайтом
			if(window.matchMedia("(max-width: 767px)").matches) {
				// связь между фреймом (конструктором) и сайтом
				window.parent.postMessage("dataTab1", "*");
				window.parent.postMessage("scrollToConstructorPhonegroup", "*");
			}

			$('.ready-to-create__constructor-steps').removeClass('step3 step2');
			$('.ready-to-create__constructor-steps').addClass('step1');


		}
		if(data == '2') {
			// связь между фреймом (конструктором) и сайтом
			if(window.matchMedia("(max-width: 767px)").matches) {
				// связь между фреймом (конструктором) и сайтом
				window.parent.postMessage("dataTab2", "*")
			}
      setTimeout(function () {
        mySwiper.init();
      }, 100);

      setTimeout(function () {

        mySwiper.update();
        window.arrDeleted = [];
        $('.ready-to-create__constructor-design-option-toolbar-order.tabs-item').data('deleted', []);
      }, 200);

      let layout = parseInt($(this).attr('layout'));


      setTimeout(function () {

        if ($('.constructor-swiper .swiper-container-step3 .swiper-slide').hasClass('active-layout')) {
          if (!$('.constructor-swiper .swiper-container-step2 .swiper-slide').hasClass('active-layout')) {
            $('.constructor-swiper-wrap .swiper-container-step2 .swiper-slide').eq(layout).addClass('active-layout');
          }

          mySwiper.slideTo($('.constructor-swiper .swiper-container-step2 .swiper-slide.active-layout').index()  );
        } else {

          mySwiper.slideTo($('.constructor-swiper .swiper-container-step2 .swiper-slide').length  );
        }


        $('.ready-to-create__constructor-design-option-toolbar-order.tabs-item').attr('layout', $('.constructor-swiper .swiper-container-step2 .swiper-slide.active-layout').index());
      },220);


			$('.ready-to-create__constructor-steps').removeClass('step3 step1');
			$('.ready-to-create__constructor-steps').addClass('step2');
		}
		if(data == '3') {
			// связь между фреймом (конструктором) и сайтом
			if(window.matchMedia("(max-width: 767px)").matches) {
				// связь между фреймом (конструктором) и сайтом
				window.parent.postMessage("dataTab3", "*")
				window.parent.postMessage("scrollToConstructorPhonegroup", "*");
			}

      setTimeout(function () {
        mySwiperStep3.init();
      }, 100);

      setTimeout(function () {
        mySwiperStep3.update();

        that.data('deleted').forEach(i => {
          mySwiperStep3.removeSlide(i);
        });
        window.arrDeleted = [];
        $('.ready-to-create__constructor-design-option-toolbar-order.tabs-item').data('deleted', []);
      }, 110);

      let layout = parseInt($(this).attr('layout'));
      setTimeout(function () {
        if ($('.constructor-swiper .swiper-container-step2 .swiper-slide').hasClass('active-layout')) {
          $('.constructor-swiper-wrap .swiper-container-step3 .swiper-slide').eq(layout).addClass('active-layout');

          mySwiperStep3.slideTo($('.constructor-swiper .swiper-container-step2 .swiper-slide.active-layout').index()  );
        }
      },220);

			$('.ready-to-create__constructor-steps').removeClass('step1 step2');
			$('.ready-to-create__constructor-steps').addClass('step3');
		}
		parent.find('.ready-to-create__constructor-steps .ready-to-create__constructor-step[data-tab=' + data + ']').addClass('active');
		parent.find('.tabs-wrap[data-tab]').removeClass("active"); //убираем активные состояния у табов
		parent.find('.tabs-wrap[data-tab=' + data + ']').addClass('active'); //если таб соответствует тому, какой data

	});
}
// решаем вопрос с min-height 100% у safari до версии 11
function heightItemSafari(obj) {
	let heightItem =  $(obj.itemHeight).height();
	if(heightItem >= 270) {
		$(obj.item).css("height", heightItem - 90);
	} else {
		$(obj.item).css("height", 150);
	}

}

// создаём экземпляр Swiper
var mySwiper = new Swiper('.swiper-container-step2', {
  init: false,
  observer: true,
  centeredSlides: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
    },
    // when window width is >= 768px
    768: {
      slidesPerView: 3,
    },
    // when window width is >= 992px
    992: {
      slidesPerView: 3,
    },
    // when window width is >= 12--px
    1200: {
      slidesPerView: 5,
    }
  }
});

// создаём экземпляр Swiper
var mySwiperStep3 = new Swiper('.swiper-container-step3', {
  init: false,
  observer: true,
  centeredSlides: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
    },
    // when window width is >= 768px
    768: {
      slidesPerView: 3,
    },
    // when window width is >= 992px
    992: {
      slidesPerView: 3,
    },
    // when window width is >= 12--px
    1200: {
      slidesPerView: 5,
    }
  }
});

window.arrDeleted = [];

$(document).ready( function() {

  const slidesTpl = `
      <div class="swiper-slide" >
        <a class="overlay"></a>
        <p class="numb"></p>
        <p>Макет</p>
        <button class="close" type="button">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.97999 6.00041L11.6923 2.28806C12.1025 1.87788 12.1025 1.21288 11.6923 0.803344L11.1974 0.30844C10.7871 -0.101865 10.1221 -0.101865 9.7126 0.30844L6.00037 4.02067L2.28802 0.307671C1.87784 -0.102506 1.21284 -0.102506 0.803306 0.307671L0.307633 0.802575C-0.102544 1.21288 -0.102544 1.87788 0.307633 2.28741L4.02063 6.00041L0.308402 9.71264C-0.101903 10.1229 -0.101903 10.7879 0.308402 11.1975L0.803306 11.6924C1.21348 12.1026 1.87848 12.1026 2.28802 11.6924L6.00037 7.98003L9.7126 11.6924C10.1229 12.1026 10.7879 12.1026 11.1974 11.6924L11.6923 11.1975C12.1025 10.7872 12.1025 10.1222 11.6923 9.71264L7.97999 6.00041Z" fill="#383838"></path>
</svg>
         </button>
       </div>
    `;

  // отслеживаем клик на закрытие элемента слайдера (убрать макет и добавить)
  $('.constructor-swiper-title a').on('click', function () {

    if( ($('.constructor-swiper .swiper-container-step2 .swiper-slide').length + 1) <= 20) {

      mySwiper.appendSlide(slidesTpl);
      mySwiperStep3.appendSlide(slidesTpl);

      setTimeout(function () {
        let indexSliderActiveClass = $('.constructor-swiper .swiper-container-step2 .swiper-slide').length - 1;

        mySwiper.slideTo(parseInt(indexSliderActiveClass));


        $('.constructor-swiper-wrap .constructor-swiper .swiper-slide').removeClass('active-layout');

        $('.constructor-swiper .swiper-container-step2 .swiper-slide').eq(indexSliderActiveClass).addClass('active-layout');
      }, 500);
      $('.constructor-swiper-title p').removeClass('limit').html('до 20 штук');
      $('.constructor-swiper-title a').removeClass('limit');
    } else {
      $('.constructor-swiper-title p').addClass('limit').html('Достигнут лимит чехлов!');
      $('.constructor-swiper-title a').addClass('limit');
    }

  });

  $(document).on('click', '.popup-constructor-checkout__link-to-first-step', function (e) {
    e.preventDefault();

    mySwiper.appendSlide(slidesTpl);
    mySwiperStep3.appendSlide(slidesTpl);

    let indexSliderActiveClass = $('.constructor-swiper .swiper-container-step2 .swiper-slide').length - 1;
    $('.constructor-swiper-wrap .constructor-swiper .swiper-slide').removeClass('active-layout');

    $('.constructor-swiper .swiper-container-step2 .swiper-slide').eq(indexSliderActiveClass).addClass('active-layout');

  });

  $(document).on('click', '.constructor-swiper-wrap .constructor-swiper .swiper-slide', function (e) {
    e.preventDefault();
    var slideIndex = $(this).index();
    $('.constructor-swiper-wrap .constructor-swiper .swiper-slide').removeClass('active-layout');
    $(this).addClass('active-layout');
    $('.ready-to-create__constructor-design-option-toolbar-order.tabs-item').attr('layout', slideIndex);
    $('.ready-to-create__constructor-design-option-toolbar-backward.tabs-item').attr('layout', slideIndex);
  });

  $(document).on('click', '.constructor-swiper .swiper-slide .close', function (e) {
    e.preventDefault();
    var slideIndex = $(this).parents('.swiper-slide').index();

    if (($(this).parents('.constructor-swiper').find('.swiper-slide').length ) == 1) {
      $('.constructor-swiper-title p').addClass('limit').html('Последний макет удалить нельзя.');
      $('.constructor-swiper-title a').addClass('limit');
    } else if ($(this).parents('.swiper-slide').hasClass('active-layout')) {
      $('.constructor-swiper-wrap .constructor-swiper .swiper-slide').removeClass('active-layout');
      mySwiper.removeSlide(slideIndex);
      $(this).parents('.swiper-slide').remove();
      window.arrDeleted.push(slideIndex);
      $('.ready-to-create__constructor-design-option-toolbar-order.tabs-item').data('deleted', window.arrDeleted);
    } else {
      $(this).parents('.swiper-slide').remove();
      mySwiper.removeSlide(slideIndex);
      window.arrDeleted.push(slideIndex);
      $('.ready-to-create__constructor-design-option-toolbar-order.tabs-item').data('deleted', window.arrDeleted);
    }
  });
	// связь между фреймом (конструктором) и сайтом
	window.parent.postMessage("ready", "*");

	$('.open-popup-link').click(function(){
		event.preventDefault();
		var blockId = $(this).data('mfp-src');
		window.parent.postMessage({"setBlockId": blockId}, "*");
		window.parent.postMessage("offsetTop", "*");
	});
	// вызов функции
	heightItemSafari({
		itemHeight: '.white-popup .popup-constructor__image-categories-wrap-img',
		item:  '.white-popup .popup-constructor__image-categories-desktop-list'
	});
	//Клик на ссылке promo
	$('.ready-to-create-promo .promo').on("click", function (e) {
		e.preventDefault();
		$(this).parents('.ready-to-create-promo').find(".enter_promo_wrap_link").hide();
		$(this).parents('.ready-to-create-promo').find("input[type=text]").show("fade", 500).addClass('active').add(this).hide();
		$(this).parents('.ready-to-create-promo').find("i.fa-times").show("fade", 500);

	});
	$('.ready-to-create-promo i.fa-times').on("click", function (e) {
		e.preventDefault();
		$(this).parents('.ready-to-create-promo').find(".promo").show("fade", 500);
		$(this).parents('.ready-to-create-promo').find("a.promo").show("fade", 500).add(this).siblings('input').hide().removeClass('active').add(this).hide();

	});
	// инициализация слайдера
	$( ".ui-slider" ).slider();
	// развёртывание прокси в header
	function dropdownUnfolding(obj) {
		const menu = $(obj.menu),
			toggle = menu.find(obj.toggle),
			current = toggle.first();
		toggle.click(function (e) {
			e.preventDefault();
			if ($(this).hasClass('m-open')) {
				$(this).siblings(obj.subMenu).slideUp();
				$(this).removeClass("m-open");
			} else {
				$(this).addClass('m-open').siblings(obj.subMenu).slideDown();
				toggle.filter('.m-open').removeClass('m-open').end().add($(this)).parent().removeClass('m-open');
				$(this).addClass("m-open");
			}
			toggle.not($(this)).siblings(obj.subMenu).stop(true,true).slideUp();
			$(this).parent().toggleClass('m-open');
		});
		if ($('.ready-to-create__constructor-design-dropdown-wrap').length) {
			current.addClass('m-open').next().stop(true,true).slideDown();
		}

	}
	dropdownUnfolding({
		menu: '.ready-to-create__constructor-design-option', // само меню или обёртка
		toggle: '.ready-to-create__constructor-design-link-toggle', // ссылки на которые навешиваем click
		subMenu: '.ready-to-create__constructor-design-dropdown-wrap' // подменю
	});
	// Модальные окна
	// Определения браузера
	function get_name_browser() {
		// получаем данные userAgent
		const ua = navigator.userAgent;
		// с помощью регулярок проверяем наличие текста,
		// соответствующие тому или иному браузеру
		if (ua.search(/Edge/) > 0) return 'Edge';
		if (ua.search(/Chrome/) > 0) return 'Google Chrome';
		if (ua.search(/Firefox/) > 0) return 'Firefox';
		if (ua.search(/Opera/) > 0) return 'Opera';
		if (ua.search(/Safari/) > 0) return 'Safari';
		if (ua.search(/MSIE/) > 0) return 'Internet Explorer';
		if (ua.search(/Trident/) > 0) return 'Trident';
		// условий может быть и больше.
		// сейчас сделаны проверки только
		// для популярных браузеров
		return 'Не определен';
	}

	// Вешаем обработочик на свою кнопку close
	$(document).on("click", ".mfp-close, .white-popup .popup-constructor__image-categories-wrap-img .popup-constructor__image-categories-item, #popup-constructor-checkout .tabs-item ", function () {
		let magnificPopup = $.magnificPopup.instance;
		magnificPopup.close();
	});
// 	// Открываем модальное окно
	$(document).on('click', '.open-popup-link', function () {
		let id = $(this).attr('href');
		let idBtn = $(this).data('mfp-src');
		let txt = $(this).data('info');
		// var title =  $(this).data('title'); // для изменения title в модалке
		if(id) {
			if(txt){
				$(`.popup${id} input[name=form_name]`).val(txt);
			}
		} else if(idBtn) {
			if(txt){
				$(`.popup${idBtn} input[name=form_name]`).val(txt);
			}
		}
		// $(`.popup${id} .modal-title`).html(title); // прописать в ссылку data-title="нужный title"
		if (window.matchMedia("(min-width: 992px)").matches) {
			if (get_name_browser() == "Google Chrome") {
				$("html").addClass("modal");
			}
		}
	});

	$(document).on('click', '.open-popup-link', function () {
		$(this).magnificPopup({
			type: 'inline',
			callbacks: {
				beforeOpen: function () {
				},
				close: function () {
					if (get_name_browser() == "Google Chrome") {
						$("html").removeClass("modal");
					}
				},
				open: function () {
					heightItemSafari({
						itemHeight: '.white-popup .popup-constructor__image-categories-wrap-img',
						item:  '.white-popup .popup-constructor__image-categories-desktop-list'
					});
					if(window.matchMedia("(max-width: 992px)").matches) (
						// связь между фреймом (конструктором) и сайтом
						window.addEventListener('message', function(event) {
							let anchor;
							if(anchor = event.data['findElement']) {
								var data = $(`#${anchor}`);

								window.parent.postMessage({"offset": data.offset().top}, "*");
							}
						})
					)
				}
			},
			closeOnBgClick: true,
			closeOnContentClick: false,
			closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="fa fa-close"></i></button>',
			tClose: 'Закрыть (Esc)',
		}).magnificPopup('open');
	});
	// Инициализация табов
	tabs($(".body-constructor"));

	$('.ready-to-create__constructor-step-info i').on('click', function () {
		$(this).parent().hide('300');
	});

	// Select он есть и на сайте (не знаю нужен он будет в итоге или нет)
	$(document).click(function (event) {
		if ($(event.target).closest(".select").length)
			return;
		$('.slct').removeClass('active');
		$('.slct_arrow').removeClass('active');
		$('.slct').parent().find('.drop').slideUp("fast");
		event.stopPropagation();
	});
	$('.slct_arrow').on('click', function () {
		$(this).siblings('.slct').trigger('click');
	});
	$('.slct').click(function () {
		/* Заносим выпадающий список в переменную */
		var dropBlock = $(this).parent().find('.drop'),
			self = $(this).not('.no-scroll');
		// делаем скролл к селекту
		if(self.length) {
			$('html, body').stop().animate({
				scrollTop: self.parents('.select').offset().top
			}, 500);
		}
		//  закрываем все открытые
		$('.slct').removeClass('active').parent().find('.drop').slideUp("fast");
		$('.slct').siblings('.slct_arrow').removeClass('active');
		/* Делаем проверку: Если выпадающий блок скрыт то делаем его видимым*/
		if (dropBlock.is(':hidden')) {
			dropBlock.slideDown();

			/* Выделяем ссылку открывающую select */
			$(this).addClass('active');
			$(this).siblings(".slct_arrow").addClass('active');


			/* Работаем с событием клика по элементам выпадающего списка */
			$('.drop').find('li').off("click").click(function () {

				/* Заносим в переменную HTML код элемента
				 списка по которому кликнули */
				var selectResult = $(this).html();

				/* Находим наш скрытый инпут и передаем в него
				 значение из переменной selectResult */
				$(this).parents(".select").find('input').val(selectResult);

				/* Передаем значение переменной selectResult в ссылку которая
				 открывает наш выпадающий список и удаляем активность */
				$(this).parents(".select").find(".slct").removeClass('active').html(selectResult);
				$(".slct_arrow").removeClass('active');

				/* Скрываем выпадающий блок */
				dropBlock.slideUp();
			});

			/* Продолжаем проверку: Если выпадающий блок не скрыт то скрываем его */
		} else {
			$(this).removeClass('active');
			$(".slct_arrow").removeClass('active');
			dropBlock.slideUp();
		}

		/* Предотвращаем обычное поведение ссылки при клике */
		return false;
	});
});
$(window).on('resize', throttle(function () {
	// здесь затормаживаем функции
	heightItemSafari({
		itemHeight: '.white-popup .popup-constructor__image-categories-wrap-img',
		item:  '.white-popup .popup-constructor__image-categories-desktop-list'
	});
}, 150));

$(window).scroll(function() {

});
setTimeout(function () {
	$(".loader_inner").fadeOut();
	$(".loader").fadeOut("slow");
}, 500);
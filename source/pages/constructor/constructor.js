
require("../../libs/matchMedia");
require("../../libs/libs").magnific_popup();
import './constructor.sass';

//import '../../pages/constructor/constructor.pug'; //это для обновления страницы при hotreload - при npm build убрать

// табы tabs
function tabs(parent) {
	parent.find(".tabs-item").on('click', function (event) { //ссылки которые будут переключать табы
		event.preventDefault();

		parent.find(".tabs-items-wrap .tabs-item[data-tab]").removeClass('active'); //убираем активные состояния у ссылок
		parent.find(".ready-to-create__constructor-steps .ready-to-create__constructor-step[data-tab]").removeClass('active');
		let data = $(this).data('tab');
		parent.find('.ready-to-create__constructor-steps .ready-to-create__constructor-step[data-tab=' + data + ']').addClass('active');
		parent.find('.tabs-wrap[data-tab]').removeClass("active"); //убираем активные состояния у табов
		parent.find('.tabs-wrap[data-tab=' + data + ']').addClass('active'); //если таб соответствует тому, какой data

	});
}

$(document).ready( function() {
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
	$(document).on("click", ".mfp-close", function () {
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
				}
			},
			closeOnBgClick: true,
			closeOnContentClick: false,
			closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="fa fa-close"></i></button>',
			tClose: 'Закрыть (Esc)',
		}).magnificPopup('open');
	});
	// Инициализация табов
	tabs($(".ready-to-create__constructor"));

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
			self = $(this);
		// делаем скролл к селекту
		$('html, body').stop().animate({
			scrollTop: self.parents('.select').offset().top
		}, 500);
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

$(window).resize(function() {

});

$(window).scroll(function() {

});
setTimeout(function () {
	$(".loader_inner").fadeOut();
	$(".loader").fadeOut("slow");
}, 500);
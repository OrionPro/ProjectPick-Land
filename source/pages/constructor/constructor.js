require("../../libs/jquery-ui.min");
require("../../libs/matchMedia");
require("../../libs/jquery.mCustomScrollbar.concat.min");
import './constructor.sass';

import '../../pages/constructor/constructor.pug'; //это для обновления страницы при hotreload - при npm build убрать

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

// Создаём цикл для инициализации mCustomScrollbar в нужных select
function customScrollbar() {
	$(document).find('.select .drop').each(function () {
		if ($(this).height() >= 190) {
			$(this).mCustomScrollbar({
				theme: "my-theme"
			});
		}
	});
}


$(document).ready( function() {

	tabs($(".ready-to-create__constructor"));
	// инициализация скробара в салектах
	customScrollbar();
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
		var dropBlock = $(this).parent().find('.drop');
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

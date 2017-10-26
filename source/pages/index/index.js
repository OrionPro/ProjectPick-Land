import common from '../../js/common';

require("../../libs/libs").owl_carousel();
import '../../pages/index/index.pug'; //это для обновления страницы при hotreload - при npm build убрать
import '../../pages/modal.pug'; //это для обновления страницы при hotreload - при npm build убрать
import './index.sass';

import animate from '../../js/animate';

$(document).ready(function () {
	$("body").addClass("index ink-transition");
	$(".header").sticky({
		topSpacing: 0,
		widthFromWrapper: false
	});

	// пример анимации через библиотечку animat (но лучше анимировать через GSAP)
	$('.our_advantages h2').animated("fadeInUp");
	// инициализация tooltipster
	if (window.matchMedia("(min-width: 992px)").matches) {
		$(".header__modal a").tooltipster({
			plugins: ['follower'],
			theme: 'tooltipster-shadow'
		});
	}
	//  Активация слайдера
	$(".owl-carousel").owlCarousel({
		loop: true,
		items: 1,
		dots: true,
		nav: true
	});
	// инициализация select2
	$(".select2").select2({
		//minimumResultsForSearch: -1, // выключам поле ввода поиска
		tags: false,
		width: null
	});
	$(".select2-tags").select2({
		tags: true,
		placeholder: "Выберите один или несколько тегов",
		width: null // если null то будет шириной родителя
	});
	// Инициализация маски в input
	$(".mask").mask("+38(999) 999-99-99");
});

$(window).resize(function () {

});

$(window).scroll(function () {

});

setTimeout(function () {
	$(".loader_inner").fadeOut();
	$(".loader").fadeOut("slow");
}, 500);
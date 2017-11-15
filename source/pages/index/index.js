import common from '../../js/common';

require("../../libs/owl.carousel.min");
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
		items: 2,
		video:true,
		dots: true,
		lazyLoad:true,
		center:true,
		margin: 30,
		responsiveClass:true,
		responsive:{
			0:{
				items:1,
			},
			767:{
				items:2,
			},
			991:{
				items:2,
			}
		},
		videoHeight: '100%'

	});
	// Инициализация маски в input
	$(".mask").mask("+38(999) 999-99-99");
});

$(window).resize(function () {
	$(".header").sticky({
		topSpacing: 0,
		widthFromWrapper: false
	});
});

$(window).scroll(function () {

});

setTimeout(function () {
	$(".loader_inner").fadeOut();
	$(".loader").fadeOut("slow");
}, 500);
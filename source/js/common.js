require("../libs/libs").jqueryui();
require("../libs/libs").matchMedia();
require("../libs/libs").waypoint();
require("../libs/libs").Animate_css();
require("../libs/libs").animate_modal_js();
require("../libs/libs").magnific_popup();
require("../libs/libs").tooltipster_follower();
require("../libs/libs").tooltipster();
require("../libs/libs").jqueryValidation();
require("../libs/libs").input_mask();
require("../libs/libs").sticky();
import validation from '../js/validation';
import modal from '../js/modal';

import '../sass/main.sass';
import functions from '../js/_functions.js';

// табы tabs
function tabs(obj) {
	const buttons = document.querySelectorAll(obj.btn);
	const bodyTabs = document.querySelectorAll(obj.tabsBody);

	let func = function(){
		"use strict";
		for( let i = buttons.length; i--; ){
			buttons[i].classList.remove(obj.classBtn);
			bodyTabs[i].classList.remove(obj.classBody);
		}
		this.classList.add(obj.classBtn);
		let item = [].indexOf.call(buttons,this);
		bodyTabs[item].classList.add(obj.classBody)
	};

	[].forEach.call(buttons,item => item.addEventListener('click',func));
}
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
// решаем вопрос с min-height 100% у safari до версии 11
function heightItemSafari(obj) {
	let heightItem =  $(obj.itemHeight).height();
	$(obj.item).css("min-height", heightItem);
}
//accordion
function accordion(obj) {
	let titleClick =  obj.titleClick,
		allContent = obj.allContent;

	$(titleClick).click(function() {
		let content = $(this).next();
		if (content.is(":visible")) { //если нажали на title аккордеона,
			content.slideUp(500, function() { //и если контент аккордеона видимый, то
			}); //убираем его
			$(this).children().removeClass("active"); //убираем активный класс у стрелки к примеру

		} else {
			$(allContent).slideUp("slow"); //если невидимый, прячем все скрытые
			$(titleClick).children() //убираем активный класс у стрелки к примеру
				.removeClass("active");
			content.slideToggle("200"); //открываем скрытый блок у того что нажали
			$(this).children().addClass("active"); //добавляем активный класс у стрекли к примеру
		}
	});
}
$(document).ready(function () {
	// Клик на header__nav-dropdown
	$(document).click(function (event) {
		if ($(event.target).closest(".header__nav-dropdown").length)
			return;
		$('.header__nav ul li .dropdown-menu').removeClass('active');
		event.stopPropagation();
		$('.header__nav ul li .header__nav-dropdown-item i').removeClass('active');
	});
	$('.header__nav ul li .header__nav-dropdown').click(function() {
		$('.header__nav ul li .dropdown-menu').toggleClass('active');
		$('.header__nav ul li .header__nav-dropdown-item i').toggleClass('active');
	});
	// вызов аккордеона
	accordion({
		titleClick: '.accordion .accordion_title',
		allContent: '.accordion .accordion_content'
	});
	// вызов tabs
	tabs({
		btn:'.tabs-items-wrap > .tabs-item',
		tabsBody:'.tabs-wrap',
		classBody:'active',
		classBtn: 'active'
	});
	tabs({
		btn:'.tabs-items-wrap-inner > .tabs-item',
		tabsBody:'.tabs-wrap-inner',
		classBody: 'active',
		classBtn:'active'
	});

	if (get_name_browser() == "Trident" || get_name_browser() == "Internet Explorer" || get_name_browser() == "Firefox") {
		// $(".from_what_is_seo .from_what_is_seo_bot_decor svg").css("bottom", "-217px");
		// $(".website_promotion .website_promotion_decor").css("bottom", "-177px");
		// $(".cost_of_online_store .cost_of_online_store_links_item").css("margin-right", "72px");
	}

	if (get_name_browser() == "Trident" || get_name_browser() == "Internet Explorer" || get_name_browser() == "Edge") {
		$('.check i, .radio i').css("margin-top", "2px")
	}
	if (get_name_browser() == "Google Chrome") {

	}
	if (get_name_browser() == "Safari") {
		heightItemSafari({
			itemHeight: '.unique-design__wrap .unique-design__item:not(".unique-design__wrap .unique-design__item.title") img',
			item:  '.unique-design__wrap .unique-design__item.title'
		});
	}

	// для инициализации tooltips
	// $( document ).tooltip({
	//   track: true
	// });

	// скролл по ссылке с атрибутом href
	// $(".header_nav a[href*='#']").on("click", function(e) {
	//     e.preventDefault();
	//     var anchor = $(this);
	//     $('html, body').stop().animate({
	//         scrollTop: $(anchor.attr('href')).offset().top
	//     }, 500);
	//     return false;
	// });

	// Скролл по классу .scroll_to и атрибуту data-scroll у кнопки к примеру (data-scroll="куда скроллим" в элементе куда скроллим ставим id потом впишем в куда скроллим)
	// $(".scroll_to").on("click", function(e) {
	//     e.preventDefault();
	//     var anchor = $(this);
	//     $('html, body').stop().animate({
	//         scrollTop: $("#" + anchor.data('scroll')).offset().top
	//     }, 500);
	//     return false;
	// });

	//  Активация слайдера
	// $(".owl-carousel").owlCarousel({
	//     loop: true,
	//     items: 1,
	//     dots: true
	// });

	// Кастомные кнопки управления слайдером
	// var owl = $('.owl-carousel');
	// owl.owlCarousel();
	// // Go to the next item
	// $('.customNextBtn').click(function() {
	//     owl.trigger('next.owl.carousel', [700]);
	// });
	// // Go to the previous item
	// $('.customPrevBtn').click(function() {
	//     // With optional speed parameter
	//     // Parameters has to be in square bracket '[]'
	//     owl.trigger('prev.owl.carousel', [700]);
	// });


});

$(window).resize(function () {

	if (get_name_browser() == "Safari") {
		heightItemSafari({
			itemHeight: '.unique-design__wrap .unique-design__item:not(".unique-design__wrap .unique-design__item.title") img',
			item:  '.unique-design__wrap .unique-design__item.title'
		});
	}
});

$(window).scroll(function () {

});
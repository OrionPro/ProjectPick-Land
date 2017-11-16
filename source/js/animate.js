// подключение animate.js
require("../libs/libs").greenSock();
require("../libs/libs").DrawSVG();

class Animation {
	constructor() {
		this.tl1 = new TimelineMax({repeat: -1});
	}

	description() {
		this.tl1.to('.header__cloud', 1, {
			rotation: 5,
			transformOrigin: "top center",
			ease: Power0.easeNone
		}).to('.header__cloud', 1, {
			rotation: 0,
			transformOrigin: "top center",
			ease: Power0.easeNone
		}).to('.header__cloud', 1, {
			rotation: -5,
			transformOrigin: "top center",
			ease: Power0.easeNone
		}).to('.header__cloud', 1, {
			rotation: 0,
			transformOrigin: "top center",
			ease: Power0.easeNone
		});
	}

	activeSection(section, startTop = 0, startBotton = 0) {
		section = '.' + section;
		if ($(section).offset() !== undefined) {
			var topPosition = $(section).offset().top - startTop,
				bottomPosition = $(section).offset().top + $(section).height() - startBotton;
			if (($(window).scrollTop() >= topPosition) && ($(window).scrollTop() <= bottomPosition)) {
				return true;
			}
		}
	}

	play() {

	}
}

var anim = new Animation;

$(window).scroll(function () {
	if (document.documentElement.clientWidth >= 1200) {
		anim.play();
	}
});

$(window).ready(function () {

	if (document.documentElement.clientWidth >= 1200) {
		anim.description();
		anim.play();
	}

});

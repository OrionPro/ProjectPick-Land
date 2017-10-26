
import common from '../../js/common';

import './blog.sass';

import animate from '../../js/animate_blog';

console.log('in blog.js');

$(document).ready( function() {
	$("body").addClass("blog extinguisher-transition");
});

$(window).resize(function() {

});

$(window).scroll(function() {

});


setTimeout(function () {
	$(".loader_inner").fadeOut();
	$(".loader").fadeOut("slow");
}, 500);;
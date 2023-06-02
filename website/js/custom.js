// Offset for Site Navigation
$('#siteNav').affix({
	offset: {
		top: 100
	}
})

document.addEventListener('DOMContentLoaded', function() {
	var navLinks = document.querySelectorAll('nav a');
  
	navLinks.forEach(function(link) {
	  link.addEventListener('click', function(e) {
		e.preventDefault();
		var targetId = this.getAttribute('href');
		var targetElement = document.querySelector(targetId);
		targetElement.scrollIntoView({ behavior: 'smooth' });
	  });
	});

	var buttonLink = document.querySelector('.btn');

	buttonLink.addEventListener('click', function(e) {
		e.preventDefault();
		var targetId = this.getAttribute('href');
		var targetElement = document.querySelector(targetId);
		targetElement.scrollIntoView({ behavior: 'smooth' });
	});
  });

window.addEventListener("load", function() {
	var appleIcon = document.getElementById("app-store-icon");
	var googleIcon = document.getElementById("google-play-icon");
	var titlesHomePage = document.querySelectorAll(".home-page-title");
	var buttonHomePage = document.getElementById("div-btn-home-page");

	appleIcon.classList.add("visible-element");
	googleIcon.classList.add("visible-element");
	titlesHomePage.forEach(function(title, index) {
		this.setTimeout(function() {
			title.classList.add("visible-element");
		}, 1000*( 1 + index));
	});

	this.setTimeout(function() {
		buttonHomePage.classList.add("visible-element");
	}, 3000);
	}
);
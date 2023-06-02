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
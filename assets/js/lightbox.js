/*
	Click-to-enlarge for figures and photos.

	Applies to every image in the main content of a page (e.g. the research
	figures and astrophotography), but not the home page spotlights or the
	project cards. Add class="no-zoom" to an <img> to opt it out.
	Captions come from the nearest <figcaption>, falling back to the alt text.
	Keys: Esc closes, left/right arrows step through the page's images.
*/
(function() {

	var images = Array.prototype.slice.call(
		document.querySelectorAll('#wrapper > .wrapper .inner img')
	).filter(function(img) {
		return !img.classList.contains('no-zoom') && !img.closest('.features, a');
	});

	if (!images.length)
		return;

	function captionFor(img) {
		var holder = img.closest('figure, .col-6, span.image'),
			fc = holder ? holder.querySelector('figcaption') : null;

		if (!fc && img.nextElementSibling && img.nextElementSibling.tagName === 'FIGCAPTION')
			fc = img.nextElementSibling;

		return fc ? fc.innerHTML : (img.alt || '');
	}

	// Build the overlay once.
	var box = document.createElement('div');
	box.className = 'lightbox';
	box.setAttribute('role', 'dialog');
	box.setAttribute('aria-modal', 'true');
	box.setAttribute('aria-label', 'Image viewer');
	box.innerHTML =
		'<button class="lb-close" aria-label="Close">&times;</button>' +
		'<button class="lb-prev" aria-label="Previous image">&lsaquo;</button>' +
		'<img alt="" />' +
		'<div class="caption"></div>' +
		'<button class="lb-next" aria-label="Next image">&rsaquo;</button>';
	document.body.appendChild(box);

	var boxImg = box.querySelector('img'),
		boxCaption = box.querySelector('.caption'),
		prev = box.querySelector('.lb-prev'),
		next = box.querySelector('.lb-next'),
		current = -1,
		lastFocus = null;

	if (images.length < 2) {
		prev.style.display = 'none';
		next.style.display = 'none';
	}

	function show(i) {
		current = (i + images.length) % images.length;
		var img = images[current];
		boxImg.src = img.currentSrc || img.src;
		boxImg.alt = img.alt;
		boxCaption.innerHTML = captionFor(img);
	}

	function open(i) {
		lastFocus = document.activeElement;
		show(i);
		box.classList.add('visible');
		document.body.classList.add('lightbox-open');
		box.querySelector('.lb-close').focus();
	}

	function close() {
		box.classList.remove('visible');
		document.body.classList.remove('lightbox-open');
		current = -1;
		if (lastFocus) lastFocus.focus();
	}

	images.forEach(function(img, i) {
		img.classList.add('zoomable');
		img.setAttribute('tabindex', '0');
		img.addEventListener('click', function() { open(i); });
		img.addEventListener('keydown', function(e) {
			if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
		});
	});

	box.addEventListener('click', function(e) {
		if (e.target === prev) show(current - 1);
		else if (e.target === next) show(current + 1);
		else if (e.target.tagName !== 'A') close();
	});

	document.addEventListener('keydown', function(e) {
		if (current < 0) return;
		if (e.key === 'Escape') close();
		else if (e.key === 'ArrowLeft') show(current - 1);
		else if (e.key === 'ArrowRight') show(current + 1);
	});

})();

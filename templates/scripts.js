function toggleNextBlock(e) {
	var listener = e.currentTarget;
	// toggle element defined by data-toggle-element
	document.getElementById(listener.dataset.toggleElement).classList.toggle('expanded');
	// toggle the arrow icon
	listener.querySelector('.icon').classList.toggle('is-expanded');
	// .no-animation supressed animation on load
	// removing .no-animation on first click ensures it will animate when .is-expanded is removed
	listener.querySelector('.icon').classList.remove('no-animation');
}

document.querySelectorAll('.toggler').forEach(function(el) {
	el.addEventListener('click', toggleNextBlock);
})

document.getElementById('expand-all').addEventListener('click', function() {
	document.querySelectorAll('.toggler').forEach(function(el) {
		toggleNextBlock({ currentTarget: el });
	});
});
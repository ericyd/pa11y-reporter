function toggleNextBlock(e) {
    var listener = e.currentTarget;
    // toggle element defined by data-toggle-element
    document.getElementById(listener.dataset.toggleElement).classList.toggle('expanded');
    // toggle the arrow icon
    listener.querySelector('.icon').classList.toggle('is-expanded');
}

document.querySelectorAll('.toggler').forEach(function(el) {
    el.addEventListener('click', toggleNextBlock);
})

document.getElementById('expand-all').addEventListener('click', function() {
    document.querySelectorAll('.toggler').forEach(function(el) {
        toggleNextBlock({ currentTarget: el });
    });
});
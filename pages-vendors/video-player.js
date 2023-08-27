(function () {

    jQuery(document).ready(function ($) {


        const player = document.querySelector('.player');
        const video = player.querySelector('.viewer');
        const progress = player.querySelector('.progress');
        const progressBar = player.querySelector('.progress__filled');
        const toggle = player.querySelector('.toggle');
        const skipButtons = player.querySelectorAll('[data-skip]');
        const ranges = player.querySelectorAll('.player__slider');

        /* Build out functions */
        function togglePlay() {


            $(".play__overlay").css('display', 'none');
            $(".player__controls").animate({
                opacity: 1
            }, 1000, function () {

            });
            const method = video.paused ? 'play' : 'pause';
            video[method]();
        }

        function updateButton() {

            if (video.paused) {
                toggle.innerHTML = '<svg class="SVGInline-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 7 6" style="enable-background:new 0 0 7 6;" xml:space="preserve"><path d="M0,6l7-3L0,0C0,0,0,6,0,6z"></path></svg>';

            } else {
                toggle.innerHTML = '<svg class="SVGInline-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 7 9" style="enable-background:new 0 0 7 9;" xml:space="preserve"><path d="M5,0v9h2V0H5z M0,9h2V0H0V9z"></path></svg>';
            }

        }

        function skip() {
            video.currentTime += parseFloat(this.dataset.skip);
        }

        function handleRangeUpdate() {
            video[this.name] = this.value;
        }

        function handleProgress() {
            const percent = (video.currentTime / video.duration) * 100;
            progressBar.style.width = percent + '%';
        }

        function scrub(e) {
            const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
            video.currentTime = scrubTime;
        }

        /* Hook up the event listners */
        video.addEventListener('click', togglePlay);
        video.addEventListener('play', updateButton);
        video.addEventListener('pause', updateButton);
        video.addEventListener('timeupdate', handleProgress);

        toggle.addEventListener('click', togglePlay);
        skipButtons.forEach(button => button.addEventListener('click', skip));
        ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
        ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

        let mousedown = false;
        progress.addEventListener('click', scrub);
        progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
        progress.addEventListener('mousedown', () => mousedown = true);
        progress.addEventListener('mouseup', () => mousedown = false);

    });
})();

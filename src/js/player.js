document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("video");
    const playButton = document.getElementById("play");
    const pauseButton = document.getElementById("pause");
    const stopButton = document.getElementById("stop");
    const forwardButton = document.getElementById("forward");
    const backwardButton = document.getElementById("backward");
    const loadButtons = document.querySelectorAll(".load");
    const shuffleButton = document.getElementById("shuffle");
    
    let hls;
    
    function loadVideo(url) {
        if (Hls.isSupported()) {
            if (hls) {
                hls.destroy();
            }
            hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = url;
        }
    }
    
    playButton.addEventListener("click", () => video.play());
    pauseButton.addEventListener("click", () => video.pause());
    stopButton.addEventListener("click", () => {
        video.pause();
        video.currentTime = 0;
    });
    forwardButton.addEventListener("click", () => video.currentTime += 5);
    backwardButton.addEventListener("click", () => video.currentTime -= 5);
    
    loadButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const urlInput = document.getElementById(`url${index + 1}`);
            loadVideo(urlInput.value);
        });
    });
    
    shuffleButton.addEventListener("click", () => {
        const urls = Array.from(document.querySelectorAll("input[type='text']"))
            .map(input => input.value);
        const randomUrl = urls[Math.floor(Math.random() * urls.length)];
        loadVideo(randomUrl);
    });

    // Load the first video by default
    loadVideo(document.getElementById("url1").value);
});

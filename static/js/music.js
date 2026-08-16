document.addEventListener("DOMContentLoaded", () => {


    /* =========================================
       ELEMENTS
    ========================================= */

    const audio =
        document.getElementById("audio-player");

    const albumCover =
        document.getElementById("album-cover");

    const songTitle =
        document.getElementById("song-title");

    const songArtist =
        document.getElementById("song-artist");

    const playButton =
        document.getElementById("play-button");

    const previousButton =
        document.getElementById("previous-button");

    const nextButton =
        document.getElementById("next-button");

    const progressContainer =
        document.getElementById("progress-container");

    const progressBar =
        document.getElementById("progress-bar");

    const currentTime =
        document.getElementById("current-time");

    const duration =
        document.getElementById("duration");

    const playlistItems =
        document.querySelectorAll(".playlist-item");



    /* =========================================
       STATE
    ========================================= */

    let currentIndex = 0;



    /* =========================================
       FORMAT TIME
    ========================================= */

    function formatTime(seconds) {

        if (
            !Number.isFinite(seconds)
        ) {

            return "0:00";

        }


        const minutes =
            Math.floor(seconds / 60);


        const remainingSeconds =
            Math.floor(seconds % 60);


        return (
            minutes +
            ":" +
            String(
                remainingSeconds
            ).padStart(2, "0")
        );

    }



    /* =========================================
       LOAD SONG
    ========================================= */

    function loadSong(index) {

        if (
            index < 0 ||
            index >= playlistItems.length
        ) {

            return;

        }


        const button =
            playlistItems[index];


        const title =
            button.dataset.title;


        const artist =
            button.dataset.artist;


        const file =
            button.dataset.file;


        const cover =
            button.dataset.cover;



        currentIndex = index;



        /* Song info */

        songTitle.textContent =
            title;


        songArtist.textContent =
            artist;



        /* Audio */

        audio.src =
            file;


        audio.load();



        /* Cover */

        albumCover.src =
            cover;



        /* Reset progress */

        progressBar.style.width =
            "0%";


        currentTime.textContent =
            "0:00";


        duration.textContent =
            "0:00";



        /* Active playlist item */

        playlistItems.forEach(
            item => {

                item.classList.remove(
                    "active"
                );

            }
        );


        button.classList.add(
            "active"
        );

    }



    /* =========================================
       PLAY / PAUSE
    ========================================= */

    function togglePlay() {

        if (
            !audio.src
        ) {

            loadSong(0);

        }


        if (
            audio.paused
        ) {

            audio.play();

        }

        else {

            audio.pause();

        }

    }



    /* =========================================
       PLAY EVENT
    ========================================= */

    audio.addEventListener(
        "play",
        () => {

            playButton.textContent =
                "❚❚";

        }
    );



    /* =========================================
       PAUSE EVENT
    ========================================= */

    audio.addEventListener(
        "pause",
        () => {

            playButton.textContent =
                "▶";

        }
    );



    /* =========================================
       TIME UPDATE
    ========================================= */

    audio.addEventListener(
        "timeupdate",
        () => {

            const current =
                audio.currentTime;


            const total =
                audio.duration;


            currentTime.textContent =
                formatTime(current);


            duration.textContent =
                formatTime(total);



            if (
                Number.isFinite(total) &&
                total > 0
            ) {

                const percentage =
                    (
                        current /
                        total
                    ) * 100;


                progressBar.style.width =
                    `${percentage}%`;

            }

        }
    );



    /* =========================================
       METADATA LOADED
    ========================================= */

    audio.addEventListener(
        "loadedmetadata",
        () => {

            duration.textContent =
                formatTime(
                    audio.duration
                );

        }
    );



    /* =========================================
       CLICK PROGRESS
    ========================================= */

    progressContainer.addEventListener(
        "click",
        (event) => {

            if (
                !Number.isFinite(
                    audio.duration
                )
            ) {

                return;

            }


            const rect =
                progressContainer.getBoundingClientRect();


            const clickPosition =
                event.clientX -
                rect.left;


            const percentage =
                clickPosition /
                rect.width;


            audio.currentTime =
                percentage *
                audio.duration;

        }
    );



    /* =========================================
       PLAYLIST CLICK
    ========================================= */

    playlistItems.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    loadSong(index);


                    audio.play();

                }
            );

        }
    );



    /* =========================================
       PLAY BUTTON
    ========================================= */

    playButton.addEventListener(
        "click",
        togglePlay
    );



    /* =========================================
       PREVIOUS
    ========================================= */

    previousButton.addEventListener(
        "click",
        () => {

            let newIndex =
                currentIndex - 1;


            if (
                newIndex < 0
            ) {

                newIndex =
                    playlistItems.length - 1;

            }


            loadSong(newIndex);

            audio.play();

        }
    );



    /* =========================================
       NEXT
    ========================================= */

    nextButton.addEventListener(
        "click",
        () => {

            let newIndex =
                currentIndex + 1;


            if (
                newIndex >=
                playlistItems.length
            ) {

                newIndex = 0;

            }


            loadSong(newIndex);

            audio.play();

        }
    );



    /* =========================================
       SONG ENDED
    ========================================= */

    audio.addEventListener(
        "ended",
        () => {

            let newIndex =
                currentIndex + 1;


            if (
                newIndex >=
                playlistItems.length
            ) {

                newIndex = 0;

            }


            loadSong(newIndex);

            audio.play();

        }
    );



    /* =========================================
       INITIAL SONG
    ========================================= */

    if (
        playlistItems.length > 0
    ) {

        loadSong(0);

    }

});
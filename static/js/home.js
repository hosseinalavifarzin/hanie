document.addEventListener("DOMContentLoaded", () => {

    const buttons =
        document.querySelectorAll(".cosmic-button");

    const shootingStars =
        document.getElementById("shooting-stars");


    /* =================================================
       MENU ENTRANCE
    ================================================= */

    buttons.forEach((button, index) => {

        button.style.opacity = "0";

        button.style.transform =
            "translateY(12px)";


        setTimeout(() => {

            button.style.transition =
                "opacity .7s ease, transform .7s ease";

            button.style.opacity = "1";

            button.style.transform =
                "translateY(0)";

        }, 250 + index * 100);

    });



    /* =================================================
       SHOOTING STAR
    ================================================= */

    function createShootingStar() {

        if (!shootingStars) {
            return;
        }


        const star =
            document.createElement("div");

        star.className =
            "shooting-star";


        /* =================================================
           SCREEN
        ================================================= */

        const width =
            window.innerWidth;

        const height =
            window.innerHeight;



        /* =================================================
           RANDOM START POSITION
        ================================================= */

        /*
         * بیشتر از قسمت‌های بالایی و کناری
         * صفحه شروع می‌شود.
         */

        let startX;
        let startY;


        const edge =
            Math.floor(Math.random() * 3);


        if (edge === 0) {

            // Top

            startX =
                Math.random() * width;

            startY =
                Math.random() * height * .45;

        }

        else if (edge === 1) {

            // Right

            startX =
                width * .7 +
                Math.random() * width * .3;

            startY =
                Math.random() * height * .7;

        }

        else {

            // Upper-middle

            startX =
                Math.random() * width * .8;

            startY =
                Math.random() * height * .55;
        }


        star.style.left =
            `${startX}px`;

        star.style.top =
            `${startY}px`;



        /* =================================================
           RANDOM ANGLE
        ================================================= */

        /*
         * زاویه‌ی حرکت.
         *
         * حرکت اصلی به سمت RIGHT است.
         * بنابراین HEAD همیشه سمت راست است.
         */

        const angle =
            Math.random() * 45 - 25;


        star.style.setProperty(
            "--angle",
            `${angle}deg`
        );



        /* =================================================
           RANDOM LENGTH
        ================================================= */

        const length =
            80 + Math.random() * 90;


        star.style.width =
            `${length}px`;



        /* =================================================
           MOVEMENT
        ================================================= */

        /*
         * همیشه مثبت است:
         *
         * +X = حرکت به سمت راست
         *
         * Y می‌تواند بالا یا پایین باشد.
         */

        const distance =
            320 + Math.random() * 280;


        const verticalDistance =
            Math.tan(
                angle * Math.PI / 180
            ) * distance;


        star.style.setProperty(
            "--move-x",
            `${distance}px`
        );


        star.style.setProperty(
            "--move-y",
            `${verticalDistance}px`
        );



        /* =================================================
           RANDOM SPEED
        ================================================= */

        const duration =
            1.4 + Math.random() * .8;


        star.style.setProperty(
            "--duration",
            `${duration}s`
        );



        /* =================================================
           ADD
        ================================================= */

        shootingStars.appendChild(
            star
        );



        /* =================================================
           REMOVE
        ================================================= */

        setTimeout(() => {

            star.remove();

        }, (duration + .2) * 1000);

    }



    /* =================================================
       EVERY 8 SECONDS
    ================================================= */

    setInterval(
        createShootingStar,
        8000
    );

});
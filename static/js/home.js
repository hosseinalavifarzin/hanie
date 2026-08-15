document.addEventListener("DOMContentLoaded", () => {

    const buttons =
        document.querySelectorAll(".cosmic-button");

    const shootingStars =
        document.getElementById("shooting-stars");

    const secretBrand =
        document.getElementById("secret-brand");


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

        let startX;
        let startY;


        const edge =
            Math.floor(Math.random() * 3);


        if (edge === 0) {

            // Top

            startX =
                Math.random() * width;

            startY =
                Math.random() * height * 0.45;

        }

        else if (edge === 1) {

            // Right

            startX =
                width * 0.7 +
                Math.random() * width * 0.3;

            startY =
                Math.random() * height * 0.7;

        }

        else {

            // Upper-middle

            startX =
                Math.random() * width * 0.8;

            startY =
                Math.random() * height * 0.55;

        }


        star.style.left =
            `${startX}px`;

        star.style.top =
            `${startY}px`;



        /* =================================================
           RANDOM ANGLE
        ================================================= */

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
            1.4 + Math.random() * 0.8;


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

        }, (duration + 0.2) * 1000);

    }



    /* =================================================
       EVERY 8 SECONDS
    ================================================= */

    setInterval(
        createShootingStar,
        8000
    );



    /* =================================================
       SECRET DAILY GAME
       
       Double click on HANIE
       → Daily Game
    ================================================= */

    if (secretBrand) {

        let clickCount = 0;

        let clickTimer = null;


        secretBrand.addEventListener(
            "click",
            (event) => {

                /*
                 * جلوگیری از رفتار پیش‌فرض مرورگر
                 */
                event.preventDefault();

                event.stopPropagation();


                clickCount++;


                clearTimeout(
                    clickTimer
                );


                /* -----------------------------------------
                   SECOND CLICK
                ----------------------------------------- */

                if (clickCount === 2) {

                    clickCount = 0;


                    window.location.assign(
                        "/daily-game"
                    );


                    return;
                }


                /* -----------------------------------------
                   RESET
                   
                   اگر کلیک دوم دیر انجام شود،
                   دوباره از اول شروع می‌کنیم.
                ----------------------------------------- */

                clickTimer = setTimeout(() => {

                    clickCount = 0;

                }, 800);

            }
        );

    }

});
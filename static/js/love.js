/* =========================
   LOVE NUMBER
========================= */

const loveNumber =
    document.getElementById("love-number");


if (loveNumber) {

    const target =
        Number(
            loveNumber.dataset.value
        );


    const duration = 1500;

    const startTime =
        performance.now();


    function animateNumber(currentTime) {

        const elapsed =
            currentTime - startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        const current =
            Math.floor(
                target * progress
            );


        loveNumber.textContent =
            current.toLocaleString();


        if (progress < 1) {

            requestAnimationFrame(
                animateNumber
            );

        }

    }


    requestAnimationFrame(
        animateNumber
    );

}



/* =========================
   ORIGINAL HEART
========================= */

const heartPath =
    document.getElementById(
        "heart-path"
    );


if (heartPath) {

    /*
        Same original heart animation.
    */

    const length =
        heartPath.getTotalLength();


    heartPath.style.strokeDasharray =
        length;


    heartPath.style.strokeDashoffset =
        length;


    setTimeout(() => {

        heartPath.style.transition =
            "stroke-dashoffset 2.5s ease";


        heartPath.style.strokeDashoffset =
            "0";

    }, 300);

}
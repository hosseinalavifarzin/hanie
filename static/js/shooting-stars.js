const shootingStars =
    document.getElementById("shooting-stars");


function createShootingStar() {

    if (!shootingStars) {
        return;
    }


    const star =
        document.createElement("div");

    star.className =
        "shooting-star";


    const startX =
        Math.random() * 100;


    const startY =
        Math.random() * 65;


    const angle =
        20 + Math.random() * 25;


    const length =
        80 + Math.random() * 70;


    star.style.left =
        `${startX}%`;


    star.style.top =
        `${startY}%`;


    star.style.width =
        `${length}px`;


    star.style.transform =
        `rotate(${angle}deg)`;


    shootingStars.appendChild(star);


    requestAnimationFrame(() => {

        star.classList.add(
            "shooting"
        );

    });


    setTimeout(() => {

        star.remove();

    }, 1300);

}


/* First one */

setTimeout(() => {

    createShootingStar();

}, 3000);


/* Every 8 seconds */

setInterval(() => {

    createShootingStar();

}, 8000);
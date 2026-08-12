const heartPath =
    document.getElementById("heart-path");


if (heartPath) {

    const length =
        heartPath.getTotalLength();


    heartPath.style.strokeDasharray =
        length;


    heartPath.style.strokeDashoffset =
        length;


    setTimeout(() => {

        heartPath.style.transition =
            "stroke-dashoffset 3s cubic-bezier(.65, 0, .35, 1)";


        heartPath.style.strokeDashoffset =
            "0";

    }, 500);

}
document.addEventListener(
    "DOMContentLoaded",
    () => {


        const timer =
            document.getElementById("timer");


        if (!timer) {
            return;
        }


        let remaining =
            Number(timer.textContent);


        if (isNaN(remaining)) {
            return;
        }


        const interval =
            setInterval(() => {


                remaining--;


                if (remaining <= 0) {

                    remaining = 0;

                    timer.textContent =
                        remaining;

                    clearInterval(
                        interval
                    );

                    return;
                }


                timer.textContent =
                    remaining;


            }, 1000);

    }
);
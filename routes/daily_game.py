from datetime import date

from flask import (
    Blueprint,
    render_template,
    request,
    redirect,
    url_for,
    session
)

from data.daily_game import get_daily_word


daily_game_bp = Blueprint(
    "daily_game",
    __name__
)


MAX_ATTEMPTS = 5


@daily_game_bp.route(
    "/daily-game",
    methods=["GET", "POST"]
)
def game():

    today = str(date.today())


    # اگر امروز اولین بار است که وارد بازی شده
    if session.get("game_date") != today:

        daily_word = get_daily_word()

        session["game_date"] = today

        session["daily_word"] = daily_word["word"]

        session["daily_hint"] = daily_word["hint"]

        session["attempts"] = 0

        session["game_won"] = False


    # اگر امروز قبلاً بازی را برده
    if session.get("game_won"):

        return redirect(
            url_for("home.home")
        )


    message = None


    if request.method == "POST":

        guess = request.form.get(
            "guess",
            ""
        ).strip()


        if not guess:

            message = "یه چیزی حدس بزن 😏"


        elif guess == session.get(
            "daily_word"
        ):

            session["game_won"] = True

            return redirect(
                url_for("home.home")
            )


        else:

            session["attempts"] += 1


            if session["attempts"] >= MAX_ATTEMPTS:

                message = (
                    "امروز دیگه شانست تموم شد 😭 "
                    "فردا دوباره امتحان کن."
                )

            else:

                message = "نههه 😏 این کلمه نیست!"


    return render_template(
        "daily_game.html",

        hint=session.get(
            "daily_hint",
            ""
        ),

        attempts=session.get(
            "attempts",
            0
        ),

        max_attempts=MAX_ATTEMPTS,

        message=message,

        game_over=session.get(
            "attempts",
            0
        ) >= MAX_ATTEMPTS
    )
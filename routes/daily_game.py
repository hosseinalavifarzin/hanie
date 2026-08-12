from datetime import date

from flask import (
    Blueprint,
    render_template,
    request,
    redirect,
    url_for,
    session
)

from data.daily_game import daily_game


daily_game_bp = Blueprint(
    "daily_game",
    __name__
)


MAX_ATTEMPTS = 5


@daily_game_bp.route("/daily-game", methods=["GET", "POST"])
def game():

    today = str(date.today())

    # اگر بازی مربوط به روز جدید است
    if session.get("game_date") != today:

        session["game_date"] = today
        session["attempts"] = 0
        session["game_won"] = False


    # اگر قبلاً امروز حل شده
    if session.get("game_won"):

        return redirect(url_for("home.home"))


    message = None
    hint = daily_game["hints"][session["attempts"]]


    if request.method == "POST":

        guess = request.form.get("guess", "").strip()

        if not guess:

            message = "یه چیزی حدس بزن 😏"

        elif guess == daily_game["word"]:

            session["game_won"] = True

            return redirect(url_for("home.home"))

        else:

            session["attempts"] += 1

            if session["attempts"] >= MAX_ATTEMPTS:

                message = (
                    "امروز دیگه شانست تموم شد 😭 "
                    "فردا دوباره امتحان کن."
                )

            else:

                message = "نههه 😏 این کلمه نیست!"

                hint = daily_game["hints"][
                    session["attempts"]
                ]


    return render_template(
        "daily_game.html",
        hint=hint,
        attempts=session["attempts"],
        max_attempts=MAX_ATTEMPTS,
        message=message,
        game_over=session["attempts"] >= MAX_ATTEMPTS
    )
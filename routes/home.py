from flask import (
    Blueprint,
    render_template,
    session,
    redirect,
    url_for
)


home_bp = Blueprint(
    "home",
    __name__
)


@home_bp.route("/")
def home():

    if not session.get("game_won"):

        return redirect(
            url_for("daily_game.game")
        )

    return render_template("home.html")
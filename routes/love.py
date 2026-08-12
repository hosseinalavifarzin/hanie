from datetime import date

from flask import Blueprint, render_template


love_bp = Blueprint(
    "love",
    __name__
)


@love_bp.route("/love")
def love():

    start_date = date(2026, 1, 3)

    today = date.today()

    days = (today - start_date).days + 1

    love = days ** 2

    return render_template(
        "love.html",
        days=days,
        love=love
    )
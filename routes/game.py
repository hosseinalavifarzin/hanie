import random
import time

from flask import (
    Blueprint,
    render_template,
    request,
    redirect,
    url_for,
    session
)

from data.words_repository import load_words, scramble_word


game_bp = Blueprint(
    "game",
    __name__,
    url_prefix="/game"
)


GAME_TIME = 420
MAX_MISTAKES = 3


WORDS = load_words()


def create_new_round():
    word = random.choice(WORDS)

    session["game_word"] = word
    session["scrambled_word"] = scramble_word(word)


def start_game():
    session["game_score"] = 0
    session["game_mistakes"] = 0
    session["game_start_time"] = time.time()
    session["game_over"] = False
    session["game_message"] = ""
    session["game_correct"] = False

    create_new_round()


@game_bp.route("/", methods=["GET", "POST"])
def game():

    # Start a new game if one does not exist
    if "game_word" not in session:
        start_game()

    # Calculate remaining time
    elapsed = time.time() - session["game_start_time"]

    remaining_time = max(
        0,
        GAME_TIME - int(elapsed)
    )

    # Time is over
    if remaining_time <= 0:
        session["game_over"] = True
        session["game_message"] = "Time is up."
        session["game_correct"] = False

    # Handle answer
    if request.method == "POST" and not session["game_over"]:

        guess = request.form.get(
            "guess",
            ""
        ).strip()

        correct_word = session["game_word"]

        if guess == correct_word:

            session["game_score"] += 1
            session["game_correct"] = True
            session["game_message"] = "Correct."

            create_new_round()

        else:

            session["game_mistakes"] += 1
            session["game_correct"] = False
            session["game_message"] = "Wrong."

            if session["game_mistakes"] >= MAX_MISTAKES:

                session["game_over"] = True
                session["game_message"] = "Game over."

        return redirect(
            url_for("game.game")
        )

    final_score = (
        session["game_score"]
        - session["game_mistakes"]
    )

    return render_template(
        "game.html",
        scrambled_word=session["scrambled_word"],
        score=session["game_score"],
        mistakes=session["game_mistakes"],
        final_score=final_score,
        remaining_time=remaining_time,
        message=session.get("game_message", ""),
        correct=session.get("game_correct", False),
        game_over=session["game_over"],
        max_mistakes=MAX_MISTAKES,
        game_time=GAME_TIME
    )


@game_bp.route("/restart")
def restart():

    start_game()

    return redirect(
        url_for("game.game")
    )
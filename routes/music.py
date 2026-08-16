from flask import Blueprint, render_template

from data.music import music


music_bp = Blueprint(
    "music",
    __name__
)


@music_bp.route("/music")
def music_page():

    return render_template(
        "music.html",
        music=music
    )
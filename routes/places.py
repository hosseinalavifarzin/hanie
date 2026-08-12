from flask import (
    Blueprint,
    render_template,
    request,
    redirect,
    url_for
)

from data.places import get_places, save_places


places_bp = Blueprint(
    "places",
    __name__,
    url_prefix="/places"
)


@places_bp.route("/")
def places():

    places = get_places()

    return render_template(
        "places.html",
        places=places
    )


@places_bp.route("/toggle/<int:place_id>", methods=["POST"])
def toggle_visited(place_id):

    places = get_places()

    for place in places:

        if place["id"] == place_id:

            place["visited"] = not place["visited"]

            break

    save_places(places)
 
    return redirect(
        url_for("places.places")
    )
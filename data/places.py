import json
import os


DATA_FILE = os.path.join(
    os.path.dirname(__file__),
    "places.json"
)


def get_places():

    with open(DATA_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


def save_places(places):

    with open(DATA_FILE, "w", encoding="utf-8") as file:

        json.dump(
            places,
            file,
            ensure_ascii=False,
            indent=4
        )
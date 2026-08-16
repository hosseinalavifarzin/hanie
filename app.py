from flask import Flask

from routes.home import home_bp
from routes.love import love_bp
from routes.places import places_bp
from routes.daily_game import daily_game_bp
from routes.game import game_bp
from routes.music import music_bp

app = Flask(__name__)

app.secret_key = "our-little-secret"


app.register_blueprint(home_bp)

app.register_blueprint(love_bp)

app.register_blueprint(places_bp)

app.register_blueprint(daily_game_bp)

app.register_blueprint(game_bp)

app.register_blueprint(music_bp)

if __name__ == "__main__":

    app.run(debug=True)
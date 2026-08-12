import random


def load_words():

    with open(
        "data/words.txt",
        "r",
        encoding="utf-8"
    ) as file:

        words = [
            line.strip()
            for line in file
            if line.strip()
        ]

    return words


def scramble_word(word):

    parts = word.split()

    scrambled_parts = []

    for part in parts:

        letters = list(part)

        random.shuffle(letters)

        scrambled_parts.append(
            "".join(letters)
        )

    return " ".join(scrambled_parts)
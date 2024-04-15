#!/usr/bin/env python3

# Standard library imports
import csv
from faker import Faker

# Local imports
from app_config import app, db
from models.tarotcard import TarotCard
from models.user import User


def seed_tarot_cards(csv_file):
    """Reads tarot card data from a CSV file and seeds the database."""
    print("Starting to seed tarot cards...")
    try:
        with open(csv_file, "r", newline="", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            cards_to_add = []
            for row in reader:
                new_card = TarotCard(
                    name=row.get("Name"),
                    image_url=row.get("Image_url"),
                    alt=row.get("alt"),
                )
                
                if new_card.name and new_card.image_url:
                    cards_to_add.append(new_card)
            if cards_to_add:
                db.session.add_all(cards_to_add)
                db.session.commit()
                print(f"Added {len(cards_to_add)} tarot cards to the database.")
            else:
                print("No valid tarot cards were found to add.")
    except Exception as e:
        print(f"An error occurred when seeding tarot cards: {e}")


def create_users():
    users_to_add = []
    fake = Faker()
    for _ in range(4):  # Adjust the number of users as needed
        username = fake.user_name()
        email = fake.email()
        birthday = fake.date_of_birth(minimum_age=18, maximum_age=65)
        profile_image = fake.image_url()
        about_me = fake.text(max_nb_chars=50)  # Generate random text for about me
        password = fake.password()

        # Create a new user instance
        new_user = User(
            username=username,
            email=email,
            birthday=birthday,
            profile_image=profile_image,
            about_me=about_me,
        )
        # Set the password, which hashes it via the setter
        new_user.password_hash = password

        # Add to the list
        users_to_add.append(new_user)

    db.session.add_all(users_to_add)
    db.session.commit()
    print(f"Database seeded with {len(users_to_add)} users!")


if __name__ == "__main__":
    with app.app_context():
        print("Starting seed...")
        User.query.delete()
        TarotCard.query.delete()

        # Call the function to seed tarot cards
        csv_file = "TarotData.csv"  # Set the correct CSV file path here
        seed_tarot_cards(csv_file)  # Pass the variable correctly

        # Create and seed users
        create_users()

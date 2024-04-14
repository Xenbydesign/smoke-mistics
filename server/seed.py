#!/usr/bin/env python3

# Standard library imports
import csv
from faker import Faker

# Local imports
from app_config import app, db

# from models.reading import Reading
from models.tarotcard import TarotCard
from models.user import User

def seed_tarot_cards():
    """Reads tarot card data from a CSV file and seeds the database."""
    try:
        with open('tarot_cards.csv', mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            cards_to_add = []
            for row in reader:
                new_card = TarotCard(
                    name=row.get('name'),  
                    image_url=row.get('image_url'),  
                    description=row.get('description') 
                )
                if new_card.name and new_card.image_url: 
                    cards_to_add.append(new_card)
            db.session.add_all(cards_to_add)
            db.session.commit()
    except Exception as e:
        print(f"Error seeding tarot cards: {e}")
  
if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        # Reading.query.delete()
        User.query.delete()
        TarotCard.query.delete()
        # Create a list to collect users that we want to add
        users_to_add = []
        # Generate fake data for users
        for _ in range(4):  # Adjust the number of users as needed
            username = fake.user_name()
            email = fake.email()
            birthday = fake.date_of_birth(minimum_age=18, maximum_age=65)
            profile_image = fake.image_url()
            about_me = fake.text(max_nb_chars=200)  # Generate random text for about me
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

        # Add all users to the session and commit to the database
        db.session.add_all(users_to_add)
        db.session.commit()

        print(f"Database seeded with {len(users_to_add)} users!")

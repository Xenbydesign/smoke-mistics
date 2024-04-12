#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app_config import app, db
from models.reading import Reading
from models.tarotcard import TarotCard
from models.user import User

if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        Reading.query.delete()
        User.query.delete()
        TarotCard.query.delete()
        # Create a list to collect users that we want to add
        users_to_add = []
        # Generate fake data for users
        for _ in range(4):  # Adjust the number of users as needed
            username = fake.user_name()
            email = fake.email()
            profile_image = fake.image_url()
            about_me = fake.text(max_nb_chars=200)  # Generate random text for about me
            password = fake.password()

            # Create a new user instance
            new_user = User(
                username=username,
                email=email,
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

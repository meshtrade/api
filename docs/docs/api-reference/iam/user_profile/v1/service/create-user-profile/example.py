from meshtrade.api.type.v1.address_pb2 import Address
from meshtrade.api.type.v1.contact_details_pb2 import ContactDetails
from meshtrade.iam.user_profile.v1 import (
    CreateUserProfileRequest,
    UserProfile,
    UserProfileService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = UserProfileService()

    with service:
        # Create request with user profile configuration
        request = CreateUserProfileRequest(
            user_profile=UserProfile(
                owner=service.group(),  # Current authenticated group becomes the owner
                user_name="users/01JCXYZ1234567890ABCDEFGHJK",  # Associated user resource
                display_name="Sarah Thompson",  # Required display name
                first_name="Sarah",
                last_name="Thompson",
                profile_picture_url="https://cdn.example.com/profiles/sarah.jpg",
                address=Address(
                    address_lines=["456 Oak Avenue", "Apartment 3B"],
                    city="San Francisco",
                    province="California",
                    country_code="US",
                    postal_code="94102",
                ),
                contact_details=ContactDetails(
                    email_address="sarah.thompson@company.com",
                    mobile_number="+14155551234",
                    phone_number="+14155559876",
                    linkedin="in/sarah-thompson",
                    x_twitter="sarahthompson",
                ),
            )
        )

        # Call the CreateUserProfile method
        user_profile = service.create_user_profile(request)

        # Use the newly created user profile
        print("User profile created successfully:")
        print(f"  Name: {user_profile.name}")
        print(f"  Display Name: {user_profile.display_name}")
        print(f"  User: {user_profile.user_name}")
        print(f"  Owner: {user_profile.owner}")
        print(f"  Email: {user_profile.contact_details.email_address}")
        print("User profile is ready with complete contact and address information")


if __name__ == "__main__":
    main()

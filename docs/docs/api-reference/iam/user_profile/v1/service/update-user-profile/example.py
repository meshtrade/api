from meshtrade.api.type.v1.address_pb2 import Address
from meshtrade.api.type.v1.contact_details_pb2 import ContactDetails
from meshtrade.iam.user_profile.v1 import (
    UpdateUserProfileRequest,
    UserProfile,
    UserProfileService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = UserProfileService()

    with service:
        # Update user profile with modified information
        request = UpdateUserProfileRequest(
            user_profile=UserProfile(
                name="user_profiles/01JCXYZ1234567890ABCDEFGHJK",  # Existing profile identifier
                owner=service.group(),  # Owner must match current ownership
                user_name="users/01JCXYZ1234567890ABCDEFGHJK",  # Associated user resource
                display_name="Sarah Thompson-Johnson",  # Updated display name
                first_name="Sarah",
                last_name="Thompson-Johnson",  # Updated last name
                profile_picture_url="https://cdn.example.com/profiles/sarah-new.jpg",  # New photo
                address=Address(
                    address_lines=["789 Maple Street", "Suite 2A"],  # New address
                    city="Los Angeles",
                    province="California",
                    country_code="US",
                    postal_code="90001",
                ),
                contact_details=ContactDetails(
                    email_address="sarah.t.johnson@company.com",  # Updated email
                    mobile_number="+14155559999",  # New mobile number
                    phone_number="+14155559876",
                    linkedin="in/sarah-thompson-johnson",  # Updated profile
                    x_twitter="sarahtjohnson",
                ),
            )
        )

        # Call the UpdateUserProfile method
        response = service.update_user_profile(request)
        user_profile = response.user_profile

        # Use the updated user profile
        print("User profile updated successfully:")
        print(f"  Name: {user_profile.name}")
        print(f"  Display Name: {user_profile.display_name}")
        print(f"  Email: {user_profile.contact_details.email_address}")
        print(f"  Mobile: {user_profile.contact_details.mobile_number}")
        print(f"  City: {user_profile.address.city}")
        print("User profile information updated with latest details")


if __name__ == "__main__":
    main()

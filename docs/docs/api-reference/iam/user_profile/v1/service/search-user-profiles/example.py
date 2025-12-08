from meshtrade.iam.user_profile.v1 import SearchUserProfilesRequest, UserProfileService
from meshtrade.type.v1 import SortingOrder


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = UserProfileService()

    with service:
        # Create search request with filters and sorting
        request = SearchUserProfilesRequest(
            display_name="Sarah",  # Search by display name (case-insensitive partial match)
            email="company.com",  # Search by email domain (case-insensitive partial match)
            sorting=SearchUserProfilesRequest.Sorting(
                field="display_name",  # Sort by display name
                order=SortingOrder.SORTING_ORDER_ASC,
            ),
        )

        # Call the SearchUserProfiles method
        response = service.search_user_profiles(request)

        # Process the search results
        print(f"Found {len(response.user_profiles)} matching user profiles:")
        for i, profile in enumerate(response.user_profiles):
            print(f"User Profile {i + 1}:")
            print(f"  Name: {profile.name}")
            print(f"  Display Name: {profile.display_name}")
            print(f"  User: {profile.user_name}")
            if profile.contact_details.email_address:
                print(f"  Email: {profile.contact_details.email_address}")
            print()


if __name__ == "__main__":
    main()

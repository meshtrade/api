import co.meshtrade.api.iam.user_profile.v1.UserProfileService;
import co.meshtrade.api.iam.user_profile.v1.Service.SearchUserProfilesRequest;
import co.meshtrade.api.iam.user_profile.v1.Service.SearchUserProfilesResponse;
import co.meshtrade.api.iam.user_profile.v1.UserProfile.UserProfile;
import co.meshtrade.api.type.v1.Sorting.SortingOrder;

import java.util.Optional;

public class SearchUserProfilesExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (UserProfileService service = new UserProfileService()) {
            // Create search request with filters and sorting
            SearchUserProfilesRequest request = SearchUserProfilesRequest.newBuilder()
                .setDisplayName("Sarah")        // Search by display name (case-insensitive partial match)
                .setEmail("company.com")        // Search by email domain (case-insensitive partial match)
                .setSorting(SearchUserProfilesRequest.Sorting.newBuilder()
                    .setField("display_name")   // Sort by display name
                    .setOrder(SortingOrder.SORTING_ORDER_ASC)
                    .build())
                .build();

            // Call the SearchUserProfiles method
            SearchUserProfilesResponse response = service.searchUserProfiles(request, Optional.empty());

            // Process the search results
            System.out.println("Found " + response.getUserProfilesCount() + " matching user profiles:");
            int i = 1;
            for (UserProfile profile : response.getUserProfilesList()) {
                System.out.println("User Profile " + i + ":");
                System.out.println("  Name: " + profile.getName());
                System.out.println("  Display Name: " + profile.getDisplayName());
                System.out.println("  User: " + profile.getUserName());
                if (!profile.getContactDetails().getEmailAddress().isEmpty()) {
                    System.out.println("  Email: " + profile.getContactDetails().getEmailAddress());
                }
                System.out.println();
                i++;
            }
        } catch (Exception e) {
            System.err.println("SearchUserProfiles failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
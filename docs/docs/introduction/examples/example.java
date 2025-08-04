import co.meshtrade.api.iam.api_user.v1.ApiUserService;
import co.meshtrade.api.iam.api_user.v1.Service.SearchApiUsersRequest;
import co.meshtrade.api.iam.api_user.v1.Service.SearchApiUsersResponse;

import java.util.Optional;

public class Example {
    public static void main(String[] args) {
        // 1. Construct API User Service
        try (ApiUserService service = new ApiUserService()) {

            // 2. Call Search API Users Method
            SearchApiUsersResponse response = service.searchApiUsers(
                    SearchApiUsersRequest.newBuilder().setDisplayName("New Key").build(),
                    Optional.empty());

            // 3. Use response
            System.out.println("SearchApiUsers successful: " + response);
        } catch (Exception e) {
            System.err.println("SearchApiUsers failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
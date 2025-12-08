import co.meshtrade.api.iam.user_profile.v1.UserProfileService;
import co.meshtrade.api.iam.user_profile.v1.Service.CreateUserProfileRequest;
import co.meshtrade.api.iam.user_profile.v1.UserProfile.UserProfile;
import co.meshtrade.api.type.v1.Address.Address;
import co.meshtrade.api.type.v1.ContactDetails.ContactDetails;

import java.util.Optional;

public class CreateUserProfileExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (UserProfileService service = new UserProfileService()) {
            // Create request with user profile configuration
            CreateUserProfileRequest request = CreateUserProfileRequest.newBuilder()
                .setUserProfile(UserProfile.newBuilder()
                    .setOwner(service.getGroup())  // Current authenticated group becomes the owner
                    .setUserName("users/01JCXYZ1234567890ABCDEFGHJK")  // Associated user resource
                    .setDisplayName("Sarah Thompson")  // Required display name
                    .setFirstName("Sarah")
                    .setLastName("Thompson")
                    .setProfilePictureUrl("https://cdn.example.com/profiles/sarah.jpg")
                    .setAddress(Address.newBuilder()
                        .addAddressLines("456 Oak Avenue")
                        .addAddressLines("Apartment 3B")
                        .setCity("San Francisco")
                        .setProvince("California")
                        .setCountryCode("US")
                        .setPostalCode("94102")
                        .build())
                    .setContactDetails(ContactDetails.newBuilder()
                        .setEmailAddress("sarah.thompson@company.com")
                        .setMobileNumber("+14155551234")
                        .setPhoneNumber("+14155559876")
                        .setLinkedin("in/sarah-thompson")
                        .setXTwitter("sarahthompson")
                        .build())
                    .build())
                .build();

            // Call the CreateUserProfile method
            co.meshtrade.api.iam.user_profile.v1.Service.CreateUserProfileResponse response =
                service.createUserProfile(request, Optional.empty());

            // Use the newly created user profile
            UserProfile userProfile = response.getUserProfile();
            System.out.println("User profile created successfully:");
            System.out.println("  Name: " + userProfile.getName());
            System.out.println("  Display Name: " + userProfile.getDisplayName());
            System.out.println("  User: " + userProfile.getUserName());
            System.out.println("  Owner: " + userProfile.getOwner());
            System.out.println("  Email: " + userProfile.getContactDetails().getEmailAddress());
            System.out.println("User profile is ready with complete contact and address information");
        } catch (Exception e) {
            System.err.println("CreateUserProfile failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
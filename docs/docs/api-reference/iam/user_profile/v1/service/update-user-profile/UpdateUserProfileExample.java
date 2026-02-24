import co.meshtrade.api.iam.user_profile.v1.UserProfileService;
import co.meshtrade.api.iam.user_profile.v1.Service.UpdateUserProfileRequest;
import co.meshtrade.api.iam.user_profile.v1.Service.UpdateUserProfileResponse;
import co.meshtrade.api.iam.user_profile.v1.UserProfile.UserProfile;
import co.meshtrade.api.type.v1.Address.Address;
import co.meshtrade.api.type.v1.ContactDetails.ContactDetails;

import java.util.Optional;

public class UpdateUserProfileExample {
    public static void main(String[] args) {
        // Default configuration is used and credentials come from MESH_API_CREDENTIALS
        // environment variable or default discovery methods. Zero config required
        // unless you want custom configuration.
        try (UserProfileService service = new UserProfileService()) {
            // Update user profile with modified information
            UpdateUserProfileRequest request = UpdateUserProfileRequest.newBuilder()
                .setUserProfile(UserProfile.newBuilder()
                    .setName("iam/user_profiles/01JCXYZ1234567890ABCDEFGHJK")  // Existing profile identifier
                    .setOwner(service.getGroup())  // Owner must match current ownership
                    .setUserName("users/01JCXYZ1234567890ABCDEFGHJK")  // Associated user resource
                    .setDisplayName("Sarah Thompson-Johnson")  // Updated display name
                    .setFirstName("Sarah")
                    .setLastName("Thompson-Johnson")  // Updated last name
                    .setProfilePictureUrl("https://cdn.example.com/profiles/sarah-new.jpg")  // New photo
                    .setAddress(Address.newBuilder()
                        .addAddressLines("789 Maple Street")
                        .addAddressLines("Suite 2A")  // New address
                        .setCity("Los Angeles")
                        .setProvince("California")
                        .setCountryCode("US")
                        .setPostalCode("90001")
                        .build())
                    .setContactDetails(ContactDetails.newBuilder()
                        .setEmailAddress("sarah.t.johnson@company.com")  // Updated email
                        .setMobileNumber("+14155559999")  // New mobile number
                        .setPhoneNumber("+14155559876")
                        .setLinkedin("in/sarah-thompson-johnson")  // Updated profile
                        .setXTwitter("sarahtjohnson")
                        .build())
                    .build())
                .build();

            // Call the UpdateUserProfile method
            UpdateUserProfileResponse response = service.updateUserProfile(request, Optional.empty());

            // Use the updated user profile
            UserProfile userProfile = response.getUserProfile();
            System.out.println("User profile updated successfully:");
            System.out.println("  Name: " + userProfile.getName());
            System.out.println("  Display Name: " + userProfile.getDisplayName());
            System.out.println("  Email: " + userProfile.getContactDetails().getEmailAddress());
            System.out.println("  Mobile: " + userProfile.getContactDetails().getMobileNumber());
            System.out.println("  City: " + userProfile.getAddress().getCity());
            System.out.println("User profile information updated with latest details");
        } catch (Exception e) {
            System.err.println("UpdateUserProfile failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
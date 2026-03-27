from datetime import datetime, timedelta

from google.protobuf.timestamp_pb2 import Timestamp

from meshtrade.compliance.client.v1 import (
    ClientService,
    MarkClientVerifiedRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = ClientService()

    with service:
        # Mark client as verified with next review date in one year
        next_review = Timestamp()
        next_review.FromDatetime(datetime.now() + timedelta(days=365))

        request = MarkClientVerifiedRequest(
            client="compliance/clients/01HQZXYZ9ABCDEFGHIJKLMNPQR",
            next_verification_date=next_review,
        )

        # Call the MarkClientVerified method
        client = service.mark_client_verified(request)

        print(f"Client verified, next review: {client.next_verification_date}")


if __name__ == "__main__":
    main()

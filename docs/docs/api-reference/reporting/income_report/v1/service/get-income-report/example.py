from datetime import datetime, timedelta

from google.protobuf.timestamp_pb2 import Timestamp

from meshtrade.reporting.income_report.v1 import (
    GetIncomeReportRequest,
    IncomeReportService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = IncomeReportService()

    with service:
        # Define the reporting period, for example, the last 90 days.
        to_date = datetime.now()
        from_date = to_date - timedelta(days=90)

        # Convert to protobuf timestamps
        from_timestamp = Timestamp()
        from_timestamp.FromDatetime(from_date)

        to_timestamp = Timestamp()
        to_timestamp.FromDatetime(to_date)

        # Create request with service-specific parameters
        request = GetIncomeReportRequest(
            # Replace with the target account number.
            account_num="100001",
            from_=from_timestamp,
            to=to_timestamp,
        )

        # Call the GetIncomeReport method
        print(f"Requesting income report for account {request.account_num}...")
        response = service.get_income_report(request)

        # Process the response object by printing a summary and some entry details.
        print(f"Successfully retrieved income report for client: {response.client_name}")
        print(f"Account Number: {response.account_number}")
        print(
            f"Reporting Period: {response.period.from_.ToDatetime().strftime('%Y-%m-%d')} to {response.period.to.ToDatetime().strftime('%Y-%m-%d')}"
        )
        print(f"Found {len(response.entries)} income entries.")

        # Print details for the first few entries as an example.
        for i, entry in enumerate(response.entries[:3]):  # Limit to the first 3 entries for a concise example
            print(
                f"  - Entry {i + 1}: Date={entry.date.ToDatetime().strftime('%Y-%m-%d')}, "
                f"Asset={entry.asset_name}, Description={entry.description}, "
                f"Amount={entry.amount.value.value} {entry.amount.token.code}"
            )


if __name__ == "__main__":
    main()

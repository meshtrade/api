import datetime

from google.protobuf.timestamp_pb2 import Timestamp

from meshtrade.reporting.account_report.v1 import (
    AccountReportService,
    GetAccountReportRequest,
)


def main():
    # Create a new AccountReportService client.
    # By default, the client will use the credentials from the MESH_API_CREDENTIALS
    # environment variable or other default discovery methods.
    # No specific configuration is required unless you need to customize client behavior.
    service = AccountReportService()

    # It's a good practice to close the service client when you're done with it
    # to release any underlying resources.
    with service:
        # Define the start and end dates for the report.
        # In this example, we're requesting a report for the last 30 days.
        end_date = datetime.datetime.now(datetime.UTC)
        start_date = end_date - datetime.timedelta(days=30)

        # Create Timestamps for the request
        from_timestamp = Timestamp()
        from_timestamp.FromDatetime(start_date)
        to_timestamp = Timestamp()
        to_timestamp.FromDatetime(end_date)

        # Create a new GetAccountReportRequest.
        # This request object is used to specify the parameters for the report.
        request = GetAccountReportRequest(
            # Specify the account for which to generate the report.
            # Example: "12345"
            account_num="100005",
            # Specify the start and end dates for the report period.
            # The dates are specified using the google.protobuf.Timestamp format.
            From=from_timestamp,
            to=to_timestamp,
        )

        # Call the GetAccountReport method to generate the report.
        # This method sends the request to the Mesh API and returns the generated report.
        account_report = service.get_account_report(request)

        # The response will contain the generated report data.
        # In this example, we're simply printing some of the report's metadata.
        # In a real-world application, you would likely process the entries of the report.
        print(f"Successfully generated report for account: {account_report.account_number}")
        print(f"Report generated at: {account_report.generation_date.ToDatetime()}")
        print(f"Number of income entries: {len(account_report.income_entries)}")
        print(f"Number of fee entries: {len(account_report.fee_entries)}")
        print(f"Number of trading statement entries: {len(account_report.trading_statement_entries)}")

        # You can now iterate through the entries and process them.
        # For example, to print the details of the first income entry:
        if account_report.income_entries:
            first_income = account_report.income_entries[0]
            print(f"First income entry: {first_income}")


if __name__ == "__main__":
    main()

import base64
import datetime
from google.protobuf.timestamp_pb2 import Timestamp

from meshtrade.reporting.account_report.v1 import (
    AccountReportService,
    GetExcelAccountReportRequest,
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
        start_date = datetime.datetime(2023, 1, 1, tzinfo=datetime.timezone.utc)
        end_date = datetime.datetime(2023, 12, 31, tzinfo=datetime.timezone.utc)

        # Create Timestamps for the request.
        from_timestamp = Timestamp()
        from_timestamp.FromDatetime(start_date)
        to_timestamp = Timestamp()
        to_timestamp.FromDatetime(end_date)

        # Create a request to get an Excel account report.
        # The request includes the account number and the desired date range for the report.
        request = GetExcelAccountReportRequest(
            account_num="100005",
            From=from_timestamp,
            to=to_timestamp,
        )

        # Call the GetExcelAccountReport method to retrieve the report.
        response = service.get_excel_account_report(request)

        # The response contains the Excel file content as a base64-encoded string.
        # We need to decode it before we can save it as a file.
        excel_data = base64.b64decode(response.excel_base64)

        # Define the name for the output Excel file.
        file_name = "account_report.xlsx"

        # Save the decoded Excel data to a file.
        with open(file_name, "wb") as f:
            f.write(excel_data)

        print(f"Successfully saved Excel report to {file_name}")


if __name__ == "__main__":
    main()

import base64
from datetime import datetime, timedelta

from google.protobuf.timestamp_pb2 import Timestamp

from meshtrade.reporting.income_report.v1 import (
    GetExcelIncomeReportRequest,
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
        request = GetExcelIncomeReportRequest(
            # Replace with the target account number.
            account_num="100001",
            from_=from_timestamp,
            to=to_timestamp,
        )

        # Call the GetExcelIncomeReport method
        print(f"Requesting income report for account {request.account_num}...")
        response = service.get_excel_income_report(request)

        # The response contains the Excel file as a base64 encoded string.
        # We will decode it and save it to a file.
        excel_data = base64.b64decode(response.excel_base64)

        output_filename = "income_report.xlsx"
        with open(output_filename, "wb") as f:
            f.write(excel_data)

        print(f"Successfully generated and saved income report to {output_filename}")


if __name__ == "__main__":
    main()

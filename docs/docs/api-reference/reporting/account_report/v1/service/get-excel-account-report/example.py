import base64
import datetime

from google.protobuf.timestamp_pb2 import Timestamp

from meshtrade.reporting.account_report.v1 import (
    AccountReportService,
    GetExcelAccountReportRequest,
)
from meshtrade.type.v1.ledger_pb2 import LEDGER_STELLAR
from meshtrade.type.v1.token_pb2 import Token


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
        start_date = datetime.datetime(2023, 1, 1, tzinfo=datetime.UTC)
        end_date = datetime.datetime(2023, 12, 31, tzinfo=datetime.UTC)

        # Create Timestamps for the request.
        from_timestamp = Timestamp()
        from_timestamp.FromDatetime(start_date)
        to_timestamp = Timestamp()
        to_timestamp.FromDatetime(end_date)

        # Create a request to get an Excel account report.
        # The request includes the account number and the desired date range for the report.
        request = GetExcelAccountReportRequest(
            account_number="100005",
            from_=from_timestamp,  # Note: 'from_' because 'from' is a Python keyword
            to=to_timestamp,
            # Specify the reporting currency token - all report values will be denominated in this currency.
            # This example uses mZAR (South African Rand) issued on the Stellar network.
            # Learn more: https://mzar.mesh.trade
            # Stellar Explorer: https://stellar.expert/explorer/public/asset/mZAR-GCBNWTCCMC32UHZ5OCC2PNMFDGXRVPA7MFFBFFTCVW77SX5PMRB7Q4BY
            reporting_asset_token=Token(
                code="mZAR",
                issuer="GCBNWTCCMC32UHZ5OCC2PNMFDGXRVPA7MFFBFFTCVW77SX5PMRB7Q4BY",
                ledger=LEDGER_STELLAR,
            ),
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

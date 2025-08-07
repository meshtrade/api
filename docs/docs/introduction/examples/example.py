from meshtrade.iam.api_user.v1 import (
    ApiUserService,
    SearchApiUsersRequest,
)


def main():
    # 1. Construct API User Service
    service = ApiUserService()

    # 2. Call Search API Users Method
    with service:
        response = service.search_api_users(SearchApiUsersRequest(display_name="New Key"))

        # 3. Use response
        print("SearchApiUsers successful:", response)


if __name__ == "__main__":
    main()

# Protocol Documentation
<a name="top"></a>

## Table of Contents

- [meshtrade/compliance/client/v1/company_representative_role.proto](#meshtrade_compliance_client_v1_company_representative_role-proto)
    - [CompanyRepresentativeRole](#meshtrade-compliance-client-v1-CompanyRepresentativeRole)
  
- [meshtrade/compliance/client/v1/identification_document_type.proto](#meshtrade_compliance_client_v1_identification_document_type-proto)
    - [IdentificationDocumentType](#meshtrade-compliance-client-v1-IdentificationDocumentType)
  
- [meshtrade/compliance/client/v1/pep_status.proto](#meshtrade_compliance_client_v1_pep_status-proto)
    - [PepStatus](#meshtrade-compliance-client-v1-PepStatus)
  
- [meshtrade/compliance/client/v1/source_of_income_and_wealth.proto](#meshtrade_compliance_client_v1_source_of_income_and_wealth-proto)
    - [SourceOfIncomeAndWealth](#meshtrade-compliance-client-v1-SourceOfIncomeAndWealth)
  
- [meshtrade/compliance/client/v1/tax_residency.proto](#meshtrade_compliance_client_v1_tax_residency-proto)
    - [TaxResidency](#meshtrade-compliance-client-v1-TaxResidency)
  
- [meshtrade/type/v1/address.proto](#meshtrade_type_v1_address-proto)
    - [Address](#meshtrade-type-v1-Address)
  
- [meshtrade/type/v1/contact_details.proto](#meshtrade_type_v1_contact_details-proto)
    - [ContactDetails](#meshtrade-type-v1-ContactDetails)
  
- [meshtrade/compliance/client/v1/natural_person.proto](#meshtrade_compliance_client_v1_natural_person-proto)
    - [NaturalPerson](#meshtrade-compliance-client-v1-NaturalPerson)
  
- [meshtrade/type/v1/decimal.proto](#meshtrade_type_v1_decimal-proto)
    - [Decimal](#meshtrade-type-v1-Decimal)
  
- [meshtrade/compliance/client/v1/company_representative.proto](#meshtrade_compliance_client_v1_company_representative-proto)
    - [CompanyRepresentative](#meshtrade-compliance-client-v1-CompanyRepresentative)
  
- [meshtrade/compliance/client/v1/fund.proto](#meshtrade_compliance_client_v1_fund-proto)
    - [Fund](#meshtrade-compliance-client-v1-Fund)
  
- [meshtrade/compliance/client/v1/industry_classification.proto](#meshtrade_compliance_client_v1_industry_classification-proto)
    - [IndustryClassification](#meshtrade-compliance-client-v1-IndustryClassification)
  
- [meshtrade/compliance/client/v1/trust.proto](#meshtrade_compliance_client_v1_trust-proto)
    - [Trust](#meshtrade-compliance-client-v1-Trust)
  
- [meshtrade/compliance/client/v1/company.proto](#meshtrade_compliance_client_v1_company-proto)
    - [Company](#meshtrade-compliance-client-v1-Company)
    - [ConnectedLegalPerson](#meshtrade-compliance-client-v1-ConnectedLegalPerson)
  
    - [LegalPersonConnectionType](#meshtrade-compliance-client-v1-LegalPersonConnectionType)
  
- [meshtrade/compliance/client/v1/verification_status.proto](#meshtrade_compliance_client_v1_verification_status-proto)
    - [VerificationStatus](#meshtrade-compliance-client-v1-VerificationStatus)
  
- [meshtrade/compliance/client/v1/client.proto](#meshtrade_compliance_client_v1_client-proto)
    - [Client](#meshtrade-compliance-client-v1-Client)
  
- [meshtrade/compliance/client/v1/natural_person_connection_type.proto](#meshtrade_compliance_client_v1_natural_person_connection_type-proto)
    - [NaturalPersonConnectionType](#meshtrade-compliance-client-v1-NaturalPersonConnectionType)
  
- [meshtrade/compliance/client/v1/service.proto](#meshtrade_compliance_client_v1_service-proto)
    - [GetClientRequest](#meshtrade-compliance-client-v1-GetClientRequest)
    - [ListClientsRequest](#meshtrade-compliance-client-v1-ListClientsRequest)
    - [ListClientsResponse](#meshtrade-compliance-client-v1-ListClientsResponse)
  
    - [ClientService](#meshtrade-compliance-client-v1-ClientService)
  
- [meshtrade/iam/group/v1/group.proto](#meshtrade_iam_group_v1_group-proto)
    - [Group](#meshtrade-iam-group-v1-Group)
  
- [meshtrade/iam/group/v1/service.proto](#meshtrade_iam_group_v1_service-proto)
    - [GetGroupRequest](#meshtrade-iam-group-v1-GetGroupRequest)
  
    - [GroupService](#meshtrade-iam-group-v1-GroupService)
  
- [meshtrade/issuance_hub/instrument/v1/instrument.proto](#meshtrade_issuance_hub_instrument_v1_instrument-proto)
    - [Instrument](#meshtrade-issuance_hub-instrument-v1-Instrument)
  
- [meshtrade/type/v1/ledger.proto](#meshtrade_type_v1_ledger-proto)
    - [Ledger](#meshtrade-type-v1-Ledger)
  
- [meshtrade/type/v1/token.proto](#meshtrade_type_v1_token-proto)
    - [Token](#meshtrade-type-v1-Token)
  
- [meshtrade/type/v1/amount.proto](#meshtrade_type_v1_amount-proto)
    - [Amount](#meshtrade-type-v1-Amount)
  
- [meshtrade/issuance_hub/instrument/v1/service.proto](#meshtrade_issuance_hub_instrument_v1_service-proto)
    - [BurnInstrumentRequest](#meshtrade-issuance_hub-instrument-v1-BurnInstrumentRequest)
    - [BurnInstrumentResponse](#meshtrade-issuance_hub-instrument-v1-BurnInstrumentResponse)
    - [GetInstrumentRequest](#meshtrade-issuance_hub-instrument-v1-GetInstrumentRequest)
    - [MintInstrumentRequest](#meshtrade-issuance_hub-instrument-v1-MintInstrumentRequest)
    - [MintInstrumentResponse](#meshtrade-issuance_hub-instrument-v1-MintInstrumentResponse)
  
    - [InstrumentService](#meshtrade-issuance_hub-instrument-v1-InstrumentService)
  
- [meshtrade/ledger/transaction/v1/transaction_action.proto](#meshtrade_ledger_transaction_v1_transaction_action-proto)
    - [TransactionAction](#meshtrade-ledger-transaction-v1-TransactionAction)
  
- [meshtrade/ledger/transaction/v1/transaction_state.proto](#meshtrade_ledger_transaction_v1_transaction_state-proto)
    - [TransactionState](#meshtrade-ledger-transaction-v1-TransactionState)
  
- [meshtrade/option/v1/auth.proto](#meshtrade_option_v1_auth-proto)
    - [RoleList](#meshtrade-option-v1-RoleList)
  
    - [Role](#meshtrade-option-v1-Role)
  
    - [File-level Extensions](#meshtrade_option_v1_auth-proto-extensions)
    - [File-level Extensions](#meshtrade_option_v1_auth-proto-extensions)
  
- [meshtrade/option/v1/service_type.proto](#meshtrade_option_v1_service_type-proto)
    - [ServiceType](#meshtrade-option-v1-ServiceType)
  
    - [File-level Extensions](#meshtrade_option_v1_service_type-proto-extensions)
  
- [meshtrade/trading/direct_order/v1/direct_order.proto](#meshtrade_trading_direct_order_v1_direct_order-proto)
    - [DirectOrder](#meshtrade-trading-direct_order-v1-DirectOrder)
  
- [meshtrade/trading/direct_order/v1/service.proto](#meshtrade_trading_direct_order_v1_service-proto)
    - [GetDirectOrderRequest](#meshtrade-trading-direct_order-v1-GetDirectOrderRequest)
  
    - [DirectOrderService](#meshtrade-trading-direct_order-v1-DirectOrderService)
  
- [meshtrade/trading/limit_order/v1/limit_order.proto](#meshtrade_trading_limit_order_v1_limit_order-proto)
    - [LimitOrder](#meshtrade-trading-limit_order-v1-LimitOrder)
  
- [meshtrade/trading/limit_order/v1/service.proto](#meshtrade_trading_limit_order_v1_service-proto)
    - [GetLimitOrderRequest](#meshtrade-trading-limit_order-v1-GetLimitOrderRequest)
  
    - [LimitOrderService](#meshtrade-trading-limit_order-v1-LimitOrderService)
  
- [meshtrade/trading/spot/v1/spot.proto](#meshtrade_trading_spot_v1_spot-proto)
    - [Spot](#meshtrade-trading-spot-v1-Spot)
  
- [meshtrade/trading/spot/v1/service.proto](#meshtrade_trading_spot_v1_service-proto)
    - [GetSpotRequest](#meshtrade-trading-spot-v1-GetSpotRequest)
  
    - [SpotService](#meshtrade-trading-spot-v1-SpotService)
  
- [meshtrade/type/v1/date.proto](#meshtrade_type_v1_date-proto)
    - [Date](#meshtrade-type-v1-Date)
  
- [meshtrade/type/v1/time_of_day.proto](#meshtrade_type_v1_time_of_day-proto)
    - [TimeOfDay](#meshtrade-type-v1-TimeOfDay)
  
- [meshtrade/wallet/account/v1/account.proto](#meshtrade_wallet_account_v1_account-proto)
    - [Account](#meshtrade-wallet-account-v1-Account)
  
- [meshtrade/wallet/account/v1/service.proto](#meshtrade_wallet_account_v1_service-proto)
    - [CreateAccountRequest](#meshtrade-wallet-account-v1-CreateAccountRequest)
    - [GetAccountRequest](#meshtrade-wallet-account-v1-GetAccountRequest)
    - [ListAccountsRequest](#meshtrade-wallet-account-v1-ListAccountsRequest)
    - [ListAccountsResponse](#meshtrade-wallet-account-v1-ListAccountsResponse)
    - [SearchAccountsRequest](#meshtrade-wallet-account-v1-SearchAccountsRequest)
    - [SearchAccountsResponse](#meshtrade-wallet-account-v1-SearchAccountsResponse)
  
    - [AccountService](#meshtrade-wallet-account-v1-AccountService)
  
- [Scalar Value Types](#scalar-value-types)



<a name="meshtrade_compliance_client_v1_company_representative_role-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/compliance/client/v1/company_representative_role.proto


 


<a name="meshtrade-compliance-client-v1-CompanyRepresentativeRole"></a>

### CompanyRepresentativeRole
CompanyRepresentativeRole defines the capacity in which a natural person represents a legal entity.
These roles are crucial for Know Your Business (KYB) and Anti-Money Laundering (AML) checks.

| Name | Number | Description |
| ---- | ------ | ----------- |
| COMPANY_REPRESENTATIVE_ROLE_UNSPECIFIED | 0 | Unknown or not specified. This is a default value to prevent accidental assignment and should not be used. |
| COMPANY_REPRESENTATIVE_ROLE_ULTIMATE_BENEFICIAL_OWNER | 1 | An Ultimate Beneficial Owner (UBO). A UBO is a person who ultimately owns or controls a company, often through share ownership, voting rights, or other forms of influence. The threshold for UBO status (e.g., &gt;25% ownership) is defined by local regulations. |
| COMPANY_REPRESENTATIVE_ROLE_SHAREHOLDER | 2 | A person who owns shares in the company but may not meet the threshold to be a UBO. This role is for identifying all shareholders, while UBO is for those with significant control. |
| COMPANY_REPRESENTATIVE_ROLE_SOLE_PROPRIETOR | 3 | The sole owner and operator of an unincorporated business (a sole proprietorship). This person is legally indistinct from the business itself. |
| COMPANY_REPRESENTATIVE_ROLE_PARTNER | 4 | An individual who is a co-owner of a partnership form of business. |
| COMPANY_REPRESENTATIVE_ROLE_DIRECTOR | 5 | An individual appointed to the board who directs the company&#39;s business affairs. |
| COMPANY_REPRESENTATIVE_ROLE_MANAGER | 6 | A senior employee responsible for managing the company or a specific department. This role has operational control but not necessarily ownership. |
| COMPANY_REPRESENTATIVE_ROLE_AUTHORIZED_SIGNATORY | 7 | An individual with legal authority to sign documents and act on behalf of the company. This is often a specific power granted to a director, manager, or other officer. |
| COMPANY_REPRESENTATIVE_ROLE_PRIMARY_CONTACT | 8 | A primary contact person for communication purposes who may not have legal or managerial authority. |


 

 

 



<a name="meshtrade_compliance_client_v1_identification_document_type-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/compliance/client/v1/identification_document_type.proto


 


<a name="meshtrade-compliance-client-v1-IdentificationDocumentType"></a>

### IdentificationDocumentType
IdentificationDocumentType specifies the type of official document used to
verify a client&#39;s identity.

| Name | Number | Description |
| ---- | ------ | ----------- |
| IDENTIFICATION_DOCUMENT_TYPE_UNSPECIFIED | 0 | Unknown or not specified. This is a default value to prevent accidental assignment and should not be used. |
| IDENTIFICATION_DOCUMENT_TYPE_PASSPORT | 1 | An international passport. |
| IDENTIFICATION_DOCUMENT_TYPE_NATIONAL_ID | 2 | A government-issued national identity card/book/paper. This covers documents like the South African ID, a European ID card, etc. |
| IDENTIFICATION_DOCUMENT_TYPE_DRIVERS_LICENSE | 3 | A government-issued driver&#39;s license. |
| IDENTIFICATION_DOCUMENT_TYPE_RESIDENCE_PERMIT | 4 | A residence permit or visa issued to a foreign national. |


 

 

 



<a name="meshtrade_compliance_client_v1_pep_status-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/compliance/client/v1/pep_status.proto


 


<a name="meshtrade-compliance-client-v1-PepStatus"></a>

### PepStatus
Defines the possible statuses for a Politically Exposed Person check.

| Name | Number | Description |
| ---- | ------ | ----------- |
| PEP_STATUS_UNSPECIFIED | 0 | Unknown or not specified. This is a default value to prevent accidental assignment and should not be used. |
| PEP_STATUS_IS_NOT_PEP | 1 | The client has been verified as not being a PEP. |
| PEP_STATUS_IS_PEP | 2 | The client has been identified as a Politically Exposed Person. |
| PEP_STATUS_IS_ASSOCIATE | 3 | The client is a family member or close associate of a PEP. |


 

 

 



<a name="meshtrade_compliance_client_v1_source_of_income_and_wealth-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/compliance/client/v1/source_of_income_and_wealth.proto


 


<a name="meshtrade-compliance-client-v1-SourceOfIncomeAndWealth"></a>

### SourceOfIncomeAndWealth
SourceOfIncomeAndWealth specifies the origin of a client&#39;s funds or assets.
This is used for compliance and due diligence purposes.

| Name | Number | Description |
| ---- | ------ | ----------- |
| SOURCE_OF_INCOME_AND_WEALTH_UNSPECIFIED | 0 | Unknown or not specified. This is a default value to prevent accidental assignment and should not be used. |
| SOURCE_OF_INCOME_AND_WEALTH_ALLOWANCES | 1 | Funds from allowances. |
| SOURCE_OF_INCOME_AND_WEALTH_BURSARY | 2 | Funds from a bursary or scholarship. |
| SOURCE_OF_INCOME_AND_WEALTH_COURT_ORDER | 3 | Funds received as part of a court order. |
| SOURCE_OF_INCOME_AND_WEALTH_LOAN_FINANCIAL_INSTITUTION | 4 | Funds from a loan provided by a financial institution. |
| SOURCE_OF_INCOME_AND_WEALTH_LOAN_OTHER | 5 | Funds from a loan provided by another entity or individual. |
| SOURCE_OF_INCOME_AND_WEALTH_MAINTENANCE | 6 | Funds from maintenance payments. |
| SOURCE_OF_INCOME_AND_WEALTH_MATURING_INVESTMENTS | 7 | Funds from investments that have reached maturity. |
| SOURCE_OF_INCOME_AND_WEALTH_PENSION | 8 | Funds from a pension. |
| SOURCE_OF_INCOME_AND_WEALTH_RENTAL_INCOME | 9 | Income generated from rental properties. |
| SOURCE_OF_INCOME_AND_WEALTH_COMPANY_PROFITS | 10 | Profits generated from a company. |
| SOURCE_OF_INCOME_AND_WEALTH_COMPANY_SALE | 11 | Proceeds from the sale of a company. |
| SOURCE_OF_INCOME_AND_WEALTH_DECEASED_ESTATE | 12 | Funds from a deceased estate. |
| SOURCE_OF_INCOME_AND_WEALTH_DIVORCE_SETTLEMENT | 13 | Funds received as part of a divorce settlement. |
| SOURCE_OF_INCOME_AND_WEALTH_GIFT_OR_DONATION | 14 | Funds received as a gift or donation. |
| SOURCE_OF_INCOME_AND_WEALTH_INCOME_FROM_EMPLOYMENT | 15 | Salary or wages from current employment. |
| SOURCE_OF_INCOME_AND_WEALTH_INCOME_FROM_PREVIOUS_EMPLOYMENT | 16 | Income from a previous employer, such as severance. |
| SOURCE_OF_INCOME_AND_WEALTH_INHERITANCE | 17 | Funds received as an inheritance. |
| SOURCE_OF_INCOME_AND_WEALTH_LOTTERY_WINNINGS_OR_GAMBLING | 18 | Winnings from a lottery, gambling, or other prizes. |
| SOURCE_OF_INCOME_AND_WEALTH_SALE_OF_ASSET | 19 | Proceeds from the sale of a physical or digital asset. |
| SOURCE_OF_INCOME_AND_WEALTH_SALE_OF_SHARES | 20 | Proceeds from the sale of stocks or shares. |
| SOURCE_OF_INCOME_AND_WEALTH_SAVINGS_INVESTMENT_OR_DIVIDEND | 21 | Income from savings, investments, or dividends. |
| SOURCE_OF_INCOME_AND_WEALTH_TRUST_DISTRIBUTIONS | 22 | Funds distributed from a trust. |


 

 

 



<a name="meshtrade_compliance_client_v1_tax_residency-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/compliance/client/v1/tax_residency.proto



<a name="meshtrade-compliance-client-v1-TaxResidency"></a>

### TaxResidency
Holds tax residency information for a single jurisdiction.
Note on Required Fields: Fields marked as &#39;Required&#39; are essential
for a successful compliance check, but are not mandatory for creation.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| country_code | [string](#string) |  | The ISO 3166-1 alpha-2 country code of the tax jurisdiction. This is the two-letter country code (e.g., &#34;ZA&#34; for South Africa, &#34;NL&#34; for the Netherlands). The value should be in uppercase. See https://www.iso.org/iso-3166-country-codes.html for a full list. Required for verification. |
| tin | [string](#string) |  | The Tax Identification Number (TIN) for the client in that jurisdiction. Required for verification. |





 

 

 

 



<a name="meshtrade_type_v1_address-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/type/v1/address.proto



<a name="meshtrade-type-v1-Address"></a>

### Address
Address is a physical postal address. It is designed to be flexible enough
to accommodate various international address formats.
Validation rules given are a guideline.
A conclusive set of validation rules for an address can be found with the service/type using
this entity.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address_lines | [string](#string) | repeated | The unstructured lines of the address. This typically includes the street name, house number, apartment or suite number, and building name. It is recommended to have the most specific details (e.g., apartment number) in the first lines and the more general ones (e.g., street address) in the subsequent lines. Example: address_lines: 456 Oak Avenue, Apartment 3B, 123 Main Street. Required |
| suburb | [string](#string) |  | An optional field for a neighborhood, district, or suburb within a city. The usage of this field can vary by country. Optional |
| city | [string](#string) |  | The city, town, or village of the address. Required |
| province | [string](#string) |  | The top-level administrative subdivision of a country, such as a state, province, region, or prefecture. Required |
| country_code | [string](#string) |  | The ISO 3166-1 alpha-2 country code. This is the two-letter country code (e.g. &#34;ZA&#34; for South Africa, &#34;NL&#34; for the Netherlands). The value should be in uppercase. See https://www.iso.org/iso-3166-country-codes.html for a full list. Required |
| postal_code | [string](#string) |  | The postal code or ZIP code of the address. Although optional, strongly recommended where applicable. Optional |





 

 

 

 



<a name="meshtrade_type_v1_contact_details-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/type/v1/contact_details.proto



<a name="meshtrade-type-v1-ContactDetails"></a>

### ContactDetails
A generic set of contact information for an individual or an entity.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| email_address | [string](#string) |  | Email address validated according to RFC 5322. Example: &#34;user@example.com&#34; Must be valid if provided. |
| phone_number | [string](#string) |  | Phone number in E.164 international format. This consists of a &#39;&#43;&#39; sign followed by the country code and subscriber number. Example: &#34;&#43;14155552671&#34; Must be valid if provided. |
| mobile_number | [string](#string) |  | Mobile phone number in E.164 international format. This consists of a &#39;&#43;&#39; sign followed by the country code and subscriber number. Example: &#34;&#43;14155552671&#34; Must be valid if provided. |
| website | [string](#string) |  | The domain name of the website without the protocol (http or https). Any provided protocol will be stripped by services processing this entity. Example: &#34;www.mesh.trade&#34;. |
| linkedin | [string](#string) |  | LinkedIn profile ID. This is the unique identifier found in the profile URL. Example for an individual: &#34;in/john-doe-12345678&#34; Example for a company: &#34;company/mesh-trade&#34; |
| facebook | [string](#string) |  | Facebook profile username or ID. Example: &#34;Mesh.trade&#34; |
| instagram | [string](#string) |  | Instagram handle, without the &#39;@&#39; symbol. Example: &#34;mesh.trade&#34; |
| x_twitter | [string](#string) |  | X (formerly Twitter) handle, without the &#39;@&#39; symbol. Example: &#34;mesh_trade&#34; |
| youtube | [string](#string) |  | YouTube handle, without the &#39;@&#39; symbol. Example: &#34;Mesh_Trade&#34; |





 

 

 

 



<a name="meshtrade_compliance_client_v1_natural_person-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/compliance/client/v1/natural_person.proto



<a name="meshtrade-compliance-client-v1-NaturalPerson"></a>

### NaturalPerson
NaturalPerson is the identity of an individual person.
It contains the core, verifiable components of an individual&#39;s identity. which are
verified against their passport, utility bills, government records etc. during Know Your Client (KYC) checks.
Note on Required Fields: Fields marked as &#39;Required&#39; are essential
for a successful compliance check, but are not mandatory for creation.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| full_name | [string](#string) |  | The client&#39;s full legal name, as it appears on their official identification documents. Required for verification. |
| date_of_birth | [google.type.Date](#google-type-Date) |  | The client&#39;s date of birth. Required for verification. |
| country_of_citizenship | [string](#string) |  | The ISO 3166-1 alpha-2 country code of the client&#39;s nationality/citizenship. This is the two-letter country code (e.g., &#34;ZA&#34; for South Africa, &#34;NL&#34; for the Netherlands). The value should be in uppercase. See https://www.iso.org/iso-3166-country-codes.html for a full list. Required for verification. |
| identification_number | [string](#string) |  | An identification number for the client, as found on the provided document. The format is dependent on the identification_document_type. Required for verification. |
| identification_document_type | [IdentificationDocumentType](#meshtrade-compliance-client-v1-IdentificationDocumentType) |  | The type of identification document provided to prove the correctness of the given identification_number (e.g., Passport, Driver&#39;s License). Required for verification. |
| identification_document_expiry_date | [google.type.Date](#google-type-Date) |  | The expiration date of the identification document, if applicable. Required for verification if the document has an expiry date. |
| physical_address | [meshtrade.type.v1.Address](#meshtrade-type-v1-Address) |  | The client&#39;s primary physical residential address. If `postal_address` is not provided, this address will also be used for postal mail. Required for verification. |
| postal_address | [meshtrade.type.v1.Address](#meshtrade-type-v1-Address) |  | The client&#39;s postal address, if it is different from the physical address. Optional for verification. |
| pep_status | [PepStatus](#meshtrade-compliance-client-v1-PepStatus) |  | The client&#39;s status as a Politically Exposed Person (PEP). This is a mandatory check for regulatory compliance. Required for verification. |
| contact_details | [meshtrade.type.v1.ContactDetails](#meshtrade-type-v1-ContactDetails) |  | The individual&#39;s personal contact details (personal email, personal mobile). Optional for verification. |
| sources_of_income | [SourceOfIncomeAndWealth](#meshtrade-compliance-client-v1-SourceOfIncomeAndWealth) | repeated | The primary sources of the client&#39;s regular income (e.g., employment, pension). Required for verification. |
| sources_of_wealth | [SourceOfIncomeAndWealth](#meshtrade-compliance-client-v1-SourceOfIncomeAndWealth) | repeated | The origins of the client&#39;s total net worth or assets (e.g., inheritance, investments). This is distinct from the source of income. Required for verification. |
| tax_residencies | [TaxResidency](#meshtrade-compliance-client-v1-TaxResidency) | repeated | The client&#39;s tax residency information, required for CRS/FATCA reporting. A client can be a tax resident in multiple jurisdictions. Required for verification. |





 

 

 

 



<a name="meshtrade_type_v1_decimal-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/type/v1/decimal.proto



<a name="meshtrade-type-v1-Decimal"></a>

### Decimal
Decimal is a representation of a decimal value, such as 2.5.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| value | [string](#string) |  | The decimal value, as a string. |





 

 

 

 



<a name="meshtrade_compliance_client_v1_company_representative-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/compliance/client/v1/company_representative.proto



<a name="meshtrade-compliance-client-v1-CompanyRepresentative"></a>

### CompanyRepresentative
CompanyRepresentative models an individual acting in an official capacity for a legal entity.
This person is typically subject to KYC verification as part of the overall KYB process
for the legal entity they represent.
Note on Field Requirements: Fields marked as &#39;Required for verification&#39; are essential
for a successful compliance check, but are not mandatory for creation.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| natural_person | [NaturalPerson](#meshtrade-compliance-client-v1-NaturalPerson) |  | Details of the natural person that is the company representative. This contains the core personal identity information (name, residential address, ID document, personal contact details, etc.) required for their individual KYC check. Required for verification. |
| role | [CompanyRepresentativeRole](#meshtrade-compliance-client-v1-CompanyRepresentativeRole) |  | The official role this person holds in relation to the company. Required for verification. |
| position | [string](#string) |  | The person&#39;s job title or position within the company (e.g., &#34;CEO&#34;, &#34;Managing Partner&#34;). Optional for verification. |
| ownership_percentage | [meshtrade.type.v1.Decimal](#meshtrade-type-v1-Decimal) |  | For UBOs and Shareholders, this specifies the percentage of ownership or voting rights. Should be a value between 0.0 and 100.0. Required by business logic if the role is ULTIMATE_BENEFICIAL_OWNER or SHAREHOLDER. Optional for verification. |
| professional_contact_details | [meshtrade.type.v1.ContactDetails](#meshtrade-type-v1-ContactDetails) |  | The professional contact details for the representative in their capacity at the company (e.g., work email, work phone). Optional for verification. |
| date_of_appointment | [google.type.Date](#google-type-Date) |  | The date when the person was appointed to this role. Optional for verification. |





 

 

 

 



<a name="meshtrade_compliance_client_v1_fund-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/compliance/client/v1/fund.proto



<a name="meshtrade-compliance-client-v1-Fund"></a>

### Fund
Defines a Fund as a legal entity. It contains the core, verifiable components of a fund&#39;s
identity required for Know Your Fund (KYF) compliance checks.
Fields essential for verification are noted but are not strictly mandatory for creating the record.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| registered_name | [string](#string) |  | The official, registered name of the fund as it appears in its prospectus or formation documents. Required for verification. |
| registration_number | [string](#string) |  | The unique registration or identification number assigned by a regulatory body or authority. Examples: SEC CIK number, LEI (Legal Entity Identifier). Required for verification. |
| tax_identifier | [string](#string) |  | The primary tax identifier for the fund. Example: TIN in the US. |
| country_of_domicile | [string](#string) |  | The ISO 3166-1 alpha-2 country code where the fund is domiciled (e.g., &#34;KY&#34; for Cayman Islands, &#34;LU&#34; for Luxembourg). The value must be the uppercase, two-letter code. See: https://www.iso.org/iso-3166-country-codes.html Required for verification. |
| date_of_inception | [google.type.Date](#google-type-Date) |  | The date on which the fund was established or began operations (inception date). Required for verification. |





 

 

 

 



<a name="meshtrade_compliance_client_v1_industry_classification-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/compliance/client/v1/industry_classification.proto



<a name="meshtrade-compliance-client-v1-IndustryClassification"></a>

### IndustryClassification
IndustryClassification holds the detailed industry classification for a business entity
using the GICS (Global Industry Classification Standard) hierarchy.
GICS is a four-tiered, hierarchical industry classification system. Capturing all
four levels provides a complete and precise profile for risk assessment.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| sector_code | [string](#string) |  | The 2-digit GICS Sector code, representing the highest level of the hierarchy. Example: &#34;45&#34; for the &#34;Information Technology&#34; sector. |
| sector_name | [string](#string) |  | The human-readable name of the GICS Sector. Example: &#34;Information Technology&#34; |
| industry_group_code | [string](#string) |  | The 4-digit GICS Industry Group code. Example: &#34;4510&#34; for the &#34;Software &amp; Services&#34; industry group. |
| industry_group_name | [string](#string) |  | The human-readable name of the GICS Industry Group. Example: &#34;Software &amp; Services&#34; |
| industry_code | [string](#string) |  | The 6-digit GICS Industry code. Example: &#34;451020&#34; for the &#34;IT Services&#34; industry. |
| industry_name | [string](#string) |  | The human-readable name of the GICS Industry. Example: &#34;IT Services&#34; |
| sub_industry_code | [string](#string) |  | The 8-digit GICS Sub-Industry code, representing the most granular level. Example: &#34;45102010&#34; for the &#34;IT Consulting &amp; Other Services&#34; sub-industry. |
| sub_industry_name | [string](#string) |  | The human-readable name of the GICS Sub-Industry. Example: &#34;IT Consulting &amp; Other Services&#34; |





 

 

 

 



<a name="meshtrade_compliance_client_v1_trust-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/compliance/client/v1/trust.proto



<a name="meshtrade-compliance-client-v1-Trust"></a>

### Trust
Defines a Trust as a legal entity. It contains the core, verifiable components of a trust&#39;s
identity required for Know Your Trust (KYT) compliance checks.
Fields essential for verification are noted but are not strictly mandatory for creating the record.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| registered_name | [string](#string) |  | The official, registered name of the trust as it appears in its prospectus or formation documents. Required for verification. |
| registration_number | [string](#string) |  | The unique registration or identification number assigned by a regulatory body or authority. Examples: SEC CIK number, LEI (Legal Entity Identifier). Required for verification. |
| tax_identifier | [string](#string) |  | The primary tax identifier for the trust. Example: TIN in the US. |
| country_of_domicile | [string](#string) |  | The ISO 3166-1 alpha-2 country code where the trust is domiciled (e.g., &#34;KY&#34; for Cayman Islands, &#34;LU&#34; for Luxembourg). The value must be the uppercase, two-letter code. See: https://www.iso.org/iso-3166-country-codes.html Required for verification. |
| date_of_inception | [google.type.Date](#google-type-Date) |  | The date on which the trust was established or began operations (inception date). Required for verification. |





 

 

 

 



<a name="meshtrade_compliance_client_v1_company-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/compliance/client/v1/company.proto



<a name="meshtrade-compliance-client-v1-Company"></a>

### Company
Defines a legal company entity. It contains the core, verifiable components of a company&#39;s
identity required for Know Your Business (KYB) compliance checks.
Fields essential for verification are noted but are not strictly mandatory for creating the record.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| registered_name | [string](#string) |  | The official, registered name of the company as it appears in its articles of incorporation. Required for verification. |
| registration_number | [string](#string) |  | The unique number assigned by the relevant companies registry upon incorporation. Examples: UK Companies House number, NL KVK-nummer, US EIN. Required for verification. |
| tax_identifier | [string](#string) |  | The primary tax identifier for the company. Examples: VAT number in the EU, TIN in the US. |
| country_of_incorporation | [string](#string) |  | The ISO 3166-1 alpha-2 country code where the company was incorporated (e.g., &#34;ZA&#34;, &#34;NL&#34;). The value must be the uppercase, two-letter code. See: https://www.iso.org/iso-3166-country-codes.html Required for verification. |
| date_of_incorporation | [google.type.Date](#google-type-Date) |  | The date on which the company was incorporated. Required for verification. |
| registered_address | [meshtrade.type.v1.Address](#meshtrade-type-v1-Address) |  | The official, legal address of the entity as recorded with the incorporation registry. This is the primary address used for verification. Required for verification. |
| principal_physical_address | [meshtrade.type.v1.Address](#meshtrade-type-v1-Address) |  | The main physical location where the business conducts its operations. Provide only if different from the registered address. |
| postal_address | [meshtrade.type.v1.Address](#meshtrade-type-v1-Address) |  | The address designated for receiving mail and correspondence. Provide only if different from the registered address. |
| head_office_address | [meshtrade.type.v1.Address](#meshtrade-type-v1-Address) |  | The address of the company&#39;s head office. Provide only if different from the registered and principal physical addresses. |
| company_representatives | [CompanyRepresentative](#meshtrade-compliance-client-v1-CompanyRepresentative) | repeated | A list of individuals empowered to act on behalf of the company (e.g., Directors, CEO). This field defines who has operational control and representation rights. Required for verification. |
| connected_legal_persons | [ConnectedLegalPerson](#meshtrade-compliance-client-v1-ConnectedLegalPerson) | repeated | A list of all other legal persons (companies, trusts, etc.) in the ownership structure. This is used to perform recursive KYB checks and map the full ownership hierarchy. IMPORTANT: Only add legal persons here if they are NOT already clients on the Mesh platform. Required for verification if the ownership structure includes off-platform entities. |
| industry_classification | [IndustryClassification](#meshtrade-compliance-client-v1-IndustryClassification) |  | The company&#39;s industry classification (e.g., using NACE or SIC codes), used for risk assessment. |
| listed_exchange_code | [string](#string) |  | The stock exchange where the company is listed, if applicable (e.g., &#34;NASDAQ&#34;, &#34;LSE&#34;). |
| listing_reference | [string](#string) |  | The ticker symbol for the company on the specified stock exchange (e.g., &#34;GOOGL&#34;). |






<a name="meshtrade-compliance-client-v1-ConnectedLegalPerson"></a>

### ConnectedLegalPerson
ConnectedLegalPerson is a legal person and how they are connected to the company.

Note on Field Requirements: Fields marked as &#39;Required for verification&#39; are essential
for a successful compliance check, but are not mandatory for creation.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| natural_person | [NaturalPerson](#meshtrade-compliance-client-v1-NaturalPerson) |  | Set when the legal entity is an individual human being. |
| company | [Company](#meshtrade-compliance-client-v1-Company) |  | Set when the legal entity is a company or corporation. |
| fund | [Fund](#meshtrade-compliance-client-v1-Fund) |  | Set when the legal entity is an investment fund. |
| trust | [Trust](#meshtrade-compliance-client-v1-Trust) |  | Set when the legal entity is a trust. |
| connection_types | [LegalPersonConnectionType](#meshtrade-compliance-client-v1-LegalPersonConnectionType) | repeated | The nature of the connection(s) of the legal person to the company. (e.g., Shareholder, Guarantor etc.). Required for verification. |
| ownership_percentage | [meshtrade.type.v1.Decimal](#meshtrade-type-v1-Decimal) |  | The percentage of direct or indirect ownership this person holds. e.g. a value of 25.5 represents 25.5% ownership. Required for verification (if the connection_types includes LEGAL_PERSON_CONNECTION_TYPE_SHAREHOLDER or similar ownership role) |
| voting_rights_percentage | [meshtrade.type.v1.Decimal](#meshtrade-type-v1-Decimal) |  | The percentage of voting rights this person holds, which can differ from ownership. e.g. a value of 25.5 represents 25.5% ownership. Optional for verification. |
| connection_description | [string](#string) |  | A plain text description of the relationship. Optional for verification. |





 


<a name="meshtrade-compliance-client-v1-LegalPersonConnectionType"></a>

### LegalPersonConnectionType
LegalPersonConnectionType describes how a legal person is connected to a business,
which is essential for understanding corporate ownership and control structures in KYB.

| Name | Number | Description |
| ---- | ------ | ----------- |
| LEGAL_PERSON_CONNECTION_TYPE_UNSPECIFIED | 0 | Unknown or not specified. This is a default value to prevent accidental assignment and should not be used. |
| LEGAL_PERSON_CONNECTION_TYPE_SHAREHOLDER | 1 | The legal person is a direct shareholder in the company, but may not have a controlling stake. This is a general ownership connection. |
| LEGAL_PERSON_CONNECTION_TYPE_PARENT_COMPANY | 2 | The legal person has a controlling ownership stake in the company, making the company its subsidiary. |
| LEGAL_PERSON_CONNECTION_TYPE_CORPORATE_DIRECTOR | 3 | The legal person (often a trust or specialized firm) acts as a director on the board of the company. This represents a connection of control. |
| LEGAL_PERSON_CONNECTION_TYPE_TRUST | 4 | The legal person is a trust that holds shares or has a controlling interest in the company on behalf of its beneficiaries. |
| LEGAL_PERSON_CONNECTION_TYPE_GENERAL_PARTNER | 5 | The legal person is a general partner in a partnership structure (e.g., LP/LLP), typically implying management control and unlimited liability. |
| LEGAL_PERSON_CONNECTION_TYPE_GUARANTOR | 6 | The legal person guarantees the financial obligations or performance of the company, indicating a significant financial connection. |


 

 

 



<a name="meshtrade_compliance_client_v1_verification_status-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/compliance/client/v1/verification_status.proto


 


<a name="meshtrade-compliance-client-v1-VerificationStatus"></a>

### VerificationStatus
VerificationStatus defines the possible states of a KYC/KYB verification process.

| Name | Number | Description |
| ---- | ------ | ----------- |
| VERIFICATION_STATUS_UNSPECIFIED | 0 | Unknown or not specified. This is a default value to prevent accidental assignment and should not be used. |
| VERIFICATION_STATUS_NOT_STARTED | 1 | No verification has been initiated yet, or no information has been submitted. This is the initial state for a new client. |
| VERIFICATION_STATUS_PENDING | 2 | The client has submitted their information, and it is pending review. The client should wait for the review to be completed. |
| VERIFICATION_STATUS_VERIFIED | 3 | The client&#39;s information has been successfully reviewed and verified. |
| VERIFICATION_STATUS_FAILED | 4 | The verification has failed. This could be due to invalid documents, mismatched information, or other compliance reasons. The client may need to resubmit information. |


 

 

 



<a name="meshtrade_compliance_client_v1_client-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/compliance/client/v1/client.proto



<a name="meshtrade-compliance-client-v1-Client"></a>

### Client
Client represents an authorized legal entity, which can be either an individual (KYC)
or a business (KYB). It serves as the central resource for all compliance information
and verification status related to a single party.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | The unique, immutable, and canonical name of the client resource in the format clients/{client_id}. The {client_id} is a system-generated unique identifier (e.g., UUID) that will never change. This name field will never change and should be used as the permanent primary key for this resource in all systems. System set on creation. |
| owner | [string](#string) |  | The resource name of the group that owns this client in the format groups/{group_id}. This field establishes the ownership link and can be updated if the client&#39;s ownership changes, without affecting the client&#39;s stable `name`. The executing user needs to have permission to perform client.Create in this group. Required on creation. |
| display_name | [string](#string) |  | A non-unique, user-provided name for the client, used for display purposes in user interfaces and reports. Required on creation. |
| natural_person | [NaturalPerson](#meshtrade-compliance-client-v1-NaturalPerson) |  | Set when the legal entity is an individual human being. |
| company | [Company](#meshtrade-compliance-client-v1-Company) |  | Set when the legal entity is a company or corporation. |
| fund | [Fund](#meshtrade-compliance-client-v1-Fund) |  | Set when the legal entity is an investment fund. |
| trust | [Trust](#meshtrade-compliance-client-v1-Trust) |  | Set when the legal entity is a trust. |
| verification_status | [VerificationStatus](#meshtrade-compliance-client-v1-VerificationStatus) |  | The definitive, most recent compliance status of the client (e.g., VERIFICATION_STATUS_VERIFIED, VERIFICATION_STATUS_FAILED). System controlled. |
| verification_authority | [string](#string) |  | The resource name of the client (acting as a verifier) that last set the `verification_status`. This provides an audit trail for status changes. System set when verification_status changes. |
| verification_date | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  | The timestamp when the `verification_status` was last set to a conclusive state, specifically `VERIFICATION_STATUS_VERIFIED`. System set when verification_status changes to VERIFICATION_STATUS_VERIFIED. |
| next_verification_date | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  | The timestamp indicating when the client&#39;s next periodic compliance review is due. This field drives re-verification workflows. Optional for Verification. |





 

 

 

 



<a name="meshtrade_compliance_client_v1_natural_person_connection_type-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/compliance/client/v1/natural_person_connection_type.proto


 


<a name="meshtrade-compliance-client-v1-NaturalPersonConnectionType"></a>

### NaturalPersonConnectionType
NaturalPersonConnectionType describes how a natural person is connected to a business
or to another key individual (like a PEP). It covers primary roles for KYB (ownership, control)
as well as secondary relationships for screening (familial, professional).

| Name | Number | Description |
| ---- | ------ | ----------- |
| NATURAL_PERSON_CONNECTION_TYPE_UNSPECIFIED | 0 | Unknown or not specified. This is a a default value to prevent accidental assignment and should not be used. |
| NATURAL_PERSON_CONNECTION_TYPE_ULTIMATE_BENEFICIAL_OWNER | 1 | The person is an Ultimate Beneficial Owner as defined by AML regulations (e.g., &gt;25% ownership/voting rights). This is the most critical connection type for KYB. |
| NATURAL_PERSON_CONNECTION_TYPE_SHAREHOLDER | 2 | The person owns shares but may be below the UBO threshold. |
| NATURAL_PERSON_CONNECTION_TYPE_DIRECTOR | 3 | The person is a formal Director on the company&#39;s board. |
| NATURAL_PERSON_CONNECTION_TYPE_SENIOR_MANAGEMENT | 4 | The person holds a senior management position with significant operational control (e.g., CEO, CFO, COO). |
| NATURAL_PERSON_CONNECTION_TYPE_AUTHORIZED_SIGNATORY | 5 | The person is formally authorized to sign documents and act on the company&#39;s behalf. |
| NATURAL_PERSON_CONNECTION_TYPE_FOUNDER | 6 | The person is the founder of the company. |
| NATURAL_PERSON_CONNECTION_TYPE_SPOUSE | 20 | The person is a legally married partner. |
| NATURAL_PERSON_CONNECTION_TYPE_DOMESTIC_PARTNER | 21 | The person is a partner in a long-term relationship, equivalent to a spouse. |
| NATURAL_PERSON_CONNECTION_TYPE_PARENT | 22 | The person is a mother or father. |
| NATURAL_PERSON_CONNECTION_TYPE_CHILD | 23 | The person is a son or daughter. |
| NATURAL_PERSON_CONNECTION_TYPE_SIBLING | 24 | The person is a brother or sister. |
| NATURAL_PERSON_CONNECTION_TYPE_BUSINESS_PARTNER | 30 | The person is a business partner. |
| NATURAL_PERSON_CONNECTION_TYPE_CLOSE_ASSOCIATE | 31 | A generic term for a known professional or personal associate, as defined by FATF guidelines for PEPs. |
| NATURAL_PERSON_CONNECTION_TYPE_GUARANTOR | 32 | The person is a guarantor for the company&#39;s financial obligations. |
| NATURAL_PERSON_CONNECTION_TYPE_BENEFICIARY_OF_TRUST | 33 | The person is a beneficiary of a trust that owns or controls the company. |


 

 

 



<a name="meshtrade_compliance_client_v1_service-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/compliance/client/v1/service.proto



<a name="meshtrade-compliance-client-v1-GetClientRequest"></a>

### GetClientRequest
GetClientRequest is the message used to request a single client resource.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | The unique resource name of the client to be retrieved. The name serves as the primary identifier for the client resource. Format: &#34;clients/{client_id}&#34; |






<a name="meshtrade-compliance-client-v1-ListClientsRequest"></a>

### ListClientsRequest
ListClientsRequest is the message used to request a list of client resources.






<a name="meshtrade-compliance-client-v1-ListClientsResponse"></a>

### ListClientsResponse
ListClientsResponse contains a list of client resources.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| clients | [Client](#meshtrade-compliance-client-v1-Client) | repeated | A repeated field containing the client resource objects. |





 

 

 


<a name="meshtrade-compliance-client-v1-ClientService"></a>

### ClientService
Service manages client profiles for compliance and Know Your Customer (KYC)
purposes.

The main entity managed by this service is the `Client` resource. A client can
be a natural person, company, or trust. This service allows you to retrieve
the compliance profiles for these clients.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetClient | [GetClientRequest](#meshtrade-compliance-client-v1-GetClientRequest) | [Client](#meshtrade-compliance-client-v1-Client) | GetClient retrieves a single client&#39;s compliance profile by its unique resource name.

This allows for fetching the complete compliance details of a specific client, including all associated information like identification documents, tax residencies, and company structures. |
| ListClients | [ListClientsRequest](#meshtrade-compliance-client-v1-ListClientsRequest) | [ListClientsResponse](#meshtrade-compliance-client-v1-ListClientsResponse) | ListClients retrieves a collection of client compliance profiles.

This method is useful for fetching multiple client records at once. Note: This endpoint does not currently support pagination or filtering. |

 



<a name="meshtrade_iam_group_v1_group-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/iam/group/v1/group.proto



<a name="meshtrade-iam-group-v1-Group"></a>

### Group



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  |  |





 

 

 

 



<a name="meshtrade_iam_group_v1_service-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/iam/group/v1/service.proto



<a name="meshtrade-iam-group-v1-GetGroupRequest"></a>

### GetGroupRequest






 

 

 


<a name="meshtrade-iam-group-v1-GroupService"></a>

### GroupService


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetGroup | [GetGroupRequest](#meshtrade-iam-group-v1-GetGroupRequest) | [Group](#meshtrade-iam-group-v1-Group) |  |

 



<a name="meshtrade_issuance_hub_instrument_v1_instrument-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/issuance_hub/instrument/v1/instrument.proto



<a name="meshtrade-issuance_hub-instrument-v1-Instrument"></a>

### Instrument



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| number | [string](#string) |  |  |





 

 

 

 



<a name="meshtrade_type_v1_ledger-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/type/v1/ledger.proto


 


<a name="meshtrade-type-v1-Ledger"></a>

### Ledger
Ledger represents the various distributed and centralized systems that Mesh
interacts with where value is accounted for. The term &#34;Ledger&#34; is used
inclusively to cover both blockchain and other value-tracking systems.
Note that numbering is not sequential for legacy reasons.

| Name | Number | Description |
| ---- | ------ | ----------- |
| LEDGER_UNSPECIFIED | 0 | Indicates an unknown or unspecified ledger. This default value helps prevent accidental assignment and should not be used in practice. |
| LEDGER_STELLAR | 3 | The Stellar public ledger network. See: https://stellar.org |
| LEDGER_BITCOIN | 5 | The Bitcoin public ledger network. See: https://bitcoin.org |
| LEDGER_LITECOIN | 7 | The Litecoin public ledger network. See: https://litecoin.org |
| LEDGER_ETHEREUM | 9 | The Ethereum public ledger network. See: https://ethereum.org |
| LEDGER_XRP | 11 | The XRP Ledger (formerly Ripple). See: https://xrpl.org |
| LEDGER_SA_STOCK_BROKERS | 15 | The proprietary ledger for the SA Stockbrokers platform. |
| LEDGER_NULL | 16 | A null ledger, used as a placeholder for assets that do not have an external or on-chain accounting ledger. |


 

 

 



<a name="meshtrade_type_v1_token-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/type/v1/token.proto



<a name="meshtrade-type-v1-Token"></a>

### Token
Token is Mesh&#39;s canonical model for uniquely and unambiguously identifying any
digital asset across any supported ledger. It provides a powerful abstraction
layer that resolves the complexities of multi-chain/ledger asset representation.
This allows any part of the Mesh system to work with a single, universal
concept of a token, regardless of the underlying ledger&#39;s specific
implementation.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| code | [string](#string) |  | The commonly accepted symbol, ticker, or code for the token (e.g., &#34;BTC&#34;, &#34;ETH&#34;, &#34;USDC&#34;). It is not unique without the `issuer` and `ledger`. Required field. |
| issuer | [string](#string) |  | Issuer is a reference to issuing entity of the token. For NATIVE assets on a ledger (e.g., ETH on Ethereum), the issuer is the ledger itself, represented by the reserved string __LEDGER__. For ALL other issued assets (e.g., ERC-20 tokens), this is the unique identifier of the issuing entity, such as a smart contract address on Ethereum or an issuance account public key on Stellar. Required field. |
| ledger | [Ledger](#meshtrade-type-v1-Ledger) |  | The ledger ledger on which the token exists. This field disambiguates assets that may share a code and issuer across different chains (e.g., USDC on Ethereum vs. USDC on Polygon). Required field. |





 

 

 

 



<a name="meshtrade_type_v1_amount-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/type/v1/amount.proto



<a name="meshtrade-type-v1-Amount"></a>

### Amount
A canonical structure for representing a precise quantity of a specific
digital asset.
An Amount is a self-describing monetary value, pairing a Universal Token
Identifier (the &#39;what&#39;) with a high-precision Decimal value (the &#39;how much&#39;).
This model ensures that a quantity of an asset is never ambiguous.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| token | [Token](#meshtrade-type-v1-Token) |  | Token is the unit of account. This field uses the Universal Token Identifier to define exactly WHAT asset is being quantified. |
| value | [Decimal](#meshtrade-type-v1-Decimal) |  | Value is the magnitude of the amount, representing HOW MUCH of the specified token this value holds. CRITICAL: To prevent precision errors, this decimal value MUST be truncated to the exact number of decimal places supported by the token&#39;s native ledger. |





 

 

 

 



<a name="meshtrade_issuance_hub_instrument_v1_service-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/issuance_hub/instrument/v1/service.proto



<a name="meshtrade-issuance_hub-instrument-v1-BurnInstrumentRequest"></a>

### BurnInstrumentRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| amount | [meshtrade.type.v1.Amount](#meshtrade-type-v1-Amount) |  | The quantity of the instrument to burn (denominated in token of the instrument). |
| fee_account | [string](#string) |  | The account identifier that will pay the transaction fees for the burn operation. |
| source_account | [string](#string) |  | The account from which the instrument units will be burned. This account must have a sufficient balance. |






<a name="meshtrade-issuance_hub-instrument-v1-BurnInstrumentResponse"></a>

### BurnInstrumentResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| transaction_id | [string](#string) |  | The unique identifier for the burning transaction. This ID can be used to query a transaction monitoring service to check for completion and success. |






<a name="meshtrade-issuance_hub-instrument-v1-GetInstrumentRequest"></a>

### GetInstrumentRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | The unique name of the instrument resource to fetch. |






<a name="meshtrade-issuance_hub-instrument-v1-MintInstrumentRequest"></a>

### MintInstrumentRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| amount | [meshtrade.type.v1.Amount](#meshtrade-type-v1-Amount) |  | The quantity of the instrument to mint (denominated in token of the instrument). |
| fee_account | [string](#string) |  | The account identifier that will pay the transaction fees for the mint operation. |
| destination_account | [string](#string) |  | The account identifier that will receive the newly created instrument units. |






<a name="meshtrade-issuance_hub-instrument-v1-MintInstrumentResponse"></a>

### MintInstrumentResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| transaction_id | [string](#string) |  | The unique identifier for the minting transaction. This ID can be used to query a transaction monitoring service to check for completion and success. |





 

 

 


<a name="meshtrade-issuance_hub-instrument-v1-InstrumentService"></a>

### InstrumentService
Service defines the RPC methods for interacting with the instrument resource,
such as creating, updating, minting or burning it.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetInstrument | [GetInstrumentRequest](#meshtrade-issuance_hub-instrument-v1-GetInstrumentRequest) | [Instrument](#meshtrade-issuance_hub-instrument-v1-Instrument) | Retrieve a specific instrument. |
| MintInstrument | [MintInstrumentRequest](#meshtrade-issuance_hub-instrument-v1-MintInstrumentRequest) | [MintInstrumentResponse](#meshtrade-issuance_hub-instrument-v1-MintInstrumentResponse) | Mints new units of an instrument into a given destination account. |
| BurnInstrument | [BurnInstrumentRequest](#meshtrade-issuance_hub-instrument-v1-BurnInstrumentRequest) | [BurnInstrumentResponse](#meshtrade-issuance_hub-instrument-v1-BurnInstrumentResponse) | Burns a specified amount of an instrument from a source account. |

 



<a name="meshtrade_ledger_transaction_v1_transaction_action-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/ledger/transaction/v1/transaction_action.proto


 


<a name="meshtrade-ledger-transaction-v1-TransactionAction"></a>

### TransactionAction


| Name | Number | Description |
| ---- | ------ | ----------- |
| TRANSACTION_ACTION_UNSPECIFIED | 0 | Unknown or not specified. This is a default value to prevent accidental assignment and should not be used. |
| TRANSACTION_ACTION_DO_NOTHING | 1 |  |
| TRANSACTION_ACTION_BUILD | 2 |  |
| TRANSACTION_ACTION_COMMIT | 3 |  |
| TRANSACTION_ACTION_SIGN | 4 |  |
| TRANSACTION_ACTION_MARK_PENDING | 5 |  |
| TRANSACTION_ACTION_SUBMIT | 6 |  |


 

 

 



<a name="meshtrade_ledger_transaction_v1_transaction_state-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/ledger/transaction/v1/transaction_state.proto


 


<a name="meshtrade-ledger-transaction-v1-TransactionState"></a>

### TransactionState


| Name | Number | Description |
| ---- | ------ | ----------- |
| TRANSACTION_STATE_UNSPECIFIED | 0 | Unknown or not specified. This is a default value to prevent accidental assignment and should not be used. |
| TRANSACTION_STATE_DRAFT | 1 |  |
| TRANSACTION_STATE_SIGNING_IN_PROGRESS | 2 |  |
| TRANSACTION_STATE_PENDING | 3 |  |
| TRANSACTION_STATE_SUBMISSION_IN_PROGRESS | 4 |  |
| TRANSACTION_STATE_FAILED | 5 |  |
| TRANSACTION_STATE_INDETERMINATE | 6 |  |
| TRANSACTION_STATE_SUCCESSFUL | 7 |  |


 

 

 



<a name="meshtrade_option_v1_auth-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/option/v1/auth.proto



<a name="meshtrade-option-v1-RoleList"></a>

### RoleList



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| roles | [Role](#meshtrade-option-v1-Role) | repeated |  |





 


<a name="meshtrade-option-v1-Role"></a>

### Role
Role defines a named collection of permissions.
This allows for the creation of business-level roles (e.g., &#34;AccountReader&#34;, &#34;AccountAdmin&#34;)
that group a set of granular, string-based permissions. Roles are
defined at the file level in a service&#39;s `.proto` file.

| Name | Number | Description |
| ---- | ------ | ----------- |
| ROLE_UNSPECIFIED | 0 | The default value, indicating the service type is unknown or not specified. This should be treated as an error and not be used explicitly. |
| ROLE_WALLET_ADMIN | 1 |  |
| ROLE_WALLET_VIEWER | 2 |  |


 


<a name="meshtrade_option_v1_auth-proto-extensions"></a>

### File-level Extensions
| Extension | Type | Base | Number | Description |
| --------- | ---- | ---- | ------ | ----------- |
| standard_roles | RoleList | .google.protobuf.FileOptions | 50003 |  |
| roles | RoleList | .google.protobuf.MethodOptions | 50005 |  |

 

 



<a name="meshtrade_option_v1_service_type-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/option/v1/service_type.proto


 


<a name="meshtrade-option-v1-ServiceType"></a>

### ServiceType
ServiceType indicates the access nature of an RPC method, classifying it
as either a read or a write operation.

| Name | Number | Description |
| ---- | ------ | ----------- |
| SERVICE_TYPE_UNSPECIFIED | 0 | The default value, indicating the service type is unknown or not specified. This should be treated as an error and not be used explicitly. |
| SERVICE_TYPE_READ | 1 | Indicates a safe, idempotent operation that does not change system state. |
| SERVICE_TYPE_WRITE | 2 | Indicates an operation that may change system state. |


 


<a name="meshtrade_option_v1_service_type-proto-extensions"></a>

### File-level Extensions
| Extension | Type | Base | Number | Description |
| --------- | ---- | ---- | ------ | ----------- |
| service_type | ServiceType | .google.protobuf.MethodOptions | 50004 |  |

 

 



<a name="meshtrade_trading_direct_order_v1_direct_order-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/trading/direct_order/v1/direct_order.proto



<a name="meshtrade-trading-direct_order-v1-DirectOrder"></a>

### DirectOrder



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| number | [string](#string) |  |  |





 

 

 

 



<a name="meshtrade_trading_direct_order_v1_service-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/trading/direct_order/v1/service.proto



<a name="meshtrade-trading-direct_order-v1-GetDirectOrderRequest"></a>

### GetDirectOrderRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| number | [string](#string) |  |  |





 

 

 


<a name="meshtrade-trading-direct_order-v1-DirectOrderService"></a>

### DirectOrderService


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetDirectOrder | [GetDirectOrderRequest](#meshtrade-trading-direct_order-v1-GetDirectOrderRequest) | [DirectOrder](#meshtrade-trading-direct_order-v1-DirectOrder) |  |

 



<a name="meshtrade_trading_limit_order_v1_limit_order-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/trading/limit_order/v1/limit_order.proto



<a name="meshtrade-trading-limit_order-v1-LimitOrder"></a>

### LimitOrder



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| number | [string](#string) |  |  |





 

 

 

 



<a name="meshtrade_trading_limit_order_v1_service-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/trading/limit_order/v1/service.proto



<a name="meshtrade-trading-limit_order-v1-GetLimitOrderRequest"></a>

### GetLimitOrderRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| number | [string](#string) |  |  |





 

 

 


<a name="meshtrade-trading-limit_order-v1-LimitOrderService"></a>

### LimitOrderService


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetLimitOrder | [GetLimitOrderRequest](#meshtrade-trading-limit_order-v1-GetLimitOrderRequest) | [LimitOrder](#meshtrade-trading-limit_order-v1-LimitOrder) |  |

 



<a name="meshtrade_trading_spot_v1_spot-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/trading/spot/v1/spot.proto



<a name="meshtrade-trading-spot-v1-Spot"></a>

### Spot



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| number | [string](#string) |  |  |





 

 

 

 



<a name="meshtrade_trading_spot_v1_service-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/trading/spot/v1/service.proto



<a name="meshtrade-trading-spot-v1-GetSpotRequest"></a>

### GetSpotRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| number | [string](#string) |  |  |





 

 

 


<a name="meshtrade-trading-spot-v1-SpotService"></a>

### SpotService


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetSpot | [GetSpotRequest](#meshtrade-trading-spot-v1-GetSpotRequest) | [Spot](#meshtrade-trading-spot-v1-Spot) |  |

 



<a name="meshtrade_type_v1_date-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/type/v1/date.proto



<a name="meshtrade-type-v1-Date"></a>

### Date
Represents a whole calendar date, such as a birthday. The time of
day and timezone are either specified elsewhere or are insignificant. The
date is relative to the Gregorian Calendar. This can represent only the
following:

* A full date, with non-zero year, month, and day values (e.g., 2023-12-25)

Validation Rules:
* Year: 1-9999 (must be non-zero)
* Month: 1-12 (must be non-zero)
* Day: 1-31 (must be non-zero and valid for the given month/year)
* Complete dates must be valid calendar dates (respects leap years, month lengths)

Examples:
* Full date: year=2023, month=12, day=25 → &#34;2023-12-25&#34;

Related types are [meshtrade.type.v1.TimeOfDay][meshtrade.type.v1.TimeOfDay] and
`google.protobuf.Timestamp`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| year | [int32](#int32) |  | Year of the date. Must be from 1 to 9999. |
| month | [int32](#int32) |  | Month of a year. Must be from 1 to 12. |
| day | [int32](#int32) |  | Day of a month. Must be from 1 to 31 and valid for the year and month. |





 

 

 

 



<a name="meshtrade_type_v1_time_of_day-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/type/v1/time_of_day.proto



<a name="meshtrade-type-v1-TimeOfDay"></a>

### TimeOfDay
Represents a time of day in 24-hour format. The date and time zone are either 
not significant or are specified elsewhere. This type does not support leap 
seconds and uses standard 24-hour time representation (00:00:00 to 23:59:59).

Validation Rules:
* Hours: 0-23 (24-hour format, no support for 24:00:00 end-of-day representation)
* Minutes: 0-59 
* Seconds: 0-59 (no leap seconds support)
* Nanos: 0-999,999,999 (nanosecond precision for sub-second timing)

Examples:
* Midnight: hours=0, minutes=0, seconds=0, nanos=0 → &#34;00:00:00&#34;
* Noon: hours=12, minutes=0, seconds=0, nanos=0 → &#34;12:00:00&#34;
* End of day: hours=23, minutes=59, seconds=59, nanos=999999999 → &#34;23:59:59.999999999&#34;
* High precision: hours=15, minutes=30, seconds=45, nanos=123456789 → &#34;15:30:45.123456789&#34;

Usage Notes:
* Can be combined with meshtrade.type.v1.Date to represent complete datetime
* Suitable for scheduling, timestamps, duration calculations
* Sub-second precision supports high-frequency trading and precise timing requirements

Related types are [meshtrade.type.v1.Date][meshtrade.type.v1.Date] and
`google.protobuf.Timestamp`.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| hours | [int32](#int32) |  | Hours of day in 24 hour format. Must be from 0 to 23. Does not support 24:00:00 end-of-day representation; use 23:59:59.999999999 instead. |
| minutes | [int32](#int32) |  | Minutes of hour of day. Must be from 0 to 59. |
| seconds | [int32](#int32) |  | Seconds of minutes of the time. Must be from 0 to 59. Leap seconds are not supported. |
| nanos | [int32](#int32) |  | Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999. Provides nanosecond precision for sub-second timing requirements. |





 

 

 

 



<a name="meshtrade_wallet_account_v1_account-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/wallet/account/v1/account.proto



<a name="meshtrade-wallet-account-v1-Account"></a>

### Account



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  |  |





 

 

 

 



<a name="meshtrade_wallet_account_v1_service-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/wallet/account/v1/service.proto



<a name="meshtrade-wallet-account-v1-CreateAccountRequest"></a>

### CreateAccountRequest
CreateAccountRequest contains the parameters for creating a new account.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| label | [string](#string) |  | A user-defined label for the new account, e.g., &#34;Primary Savings&#34;. |
| ledger | [meshtrade.type.v1.Ledger](#meshtrade-type-v1-Ledger) |  | The ledger upon which the account should be created. |
| open | [bool](#bool) |  | If true, the account will be opened immediately after creation, which may result in a transaction. |






<a name="meshtrade-wallet-account-v1-GetAccountRequest"></a>

### GetAccountRequest
GetAccountRequest specifies which account to retrieve.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| number | [string](#string) |  | The unique account number to retrieve. |






<a name="meshtrade-wallet-account-v1-ListAccountsRequest"></a>

### ListAccountsRequest
ListAccountsRequest requires no parameters to list accounts for the caller.






<a name="meshtrade-wallet-account-v1-ListAccountsResponse"></a>

### ListAccountsResponse
ListAccountsResponse contains a list of accounts.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| accounts | [Account](#meshtrade-wallet-account-v1-Account) | repeated | A list of accounts owned by the authenticated principal. |






<a name="meshtrade-wallet-account-v1-SearchAccountsRequest"></a>

### SearchAccountsRequest
SearchAccountsRequest specifies the query for finding accounts.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| label | [string](#string) |  | A substring to search for within account labels. |






<a name="meshtrade-wallet-account-v1-SearchAccountsResponse"></a>

### SearchAccountsResponse
SearchAccountsResponse contains the accounts that matched the search query.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| accounts | [Account](#meshtrade-wallet-account-v1-Account) | repeated | A list of accounts that matched the label search query. |





 

 

 


<a name="meshtrade-wallet-account-v1-AccountService"></a>

### AccountService
AccountService provides access to and management of wallet accounts.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| CreateAccount | [CreateAccountRequest](#meshtrade-wallet-account-v1-CreateAccountRequest) | [Account](#meshtrade-wallet-account-v1-Account) | Creates a new wallet account. This is a write operation restricted to administrative roles. |
| GetAccount | [GetAccountRequest](#meshtrade-wallet-account-v1-GetAccountRequest) | [Account](#meshtrade-wallet-account-v1-Account) | Retrieves a single wallet account by its unique number. |
| ListAccounts | [ListAccountsRequest](#meshtrade-wallet-account-v1-ListAccountsRequest) | [ListAccountsResponse](#meshtrade-wallet-account-v1-ListAccountsResponse) | Retrieves a list of all accounts for the authenticated principal. |
| SearchAccounts | [SearchAccountsRequest](#meshtrade-wallet-account-v1-SearchAccountsRequest) | [SearchAccountsResponse](#meshtrade-wallet-account-v1-SearchAccountsResponse) | Searches for accounts based on a partial label match. |

 



## Scalar Value Types

| .proto Type | Notes | C++ | Java | Python | Go | C# | PHP | Ruby |
| ----------- | ----- | --- | ---- | ------ | -- | -- | --- | ---- |
| <a name="double" /> double |  | double | double | float | float64 | double | float | Float |
| <a name="float" /> float |  | float | float | float | float32 | float | float | Float |
| <a name="int32" /> int32 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint32 instead. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="int64" /> int64 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint64 instead. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="uint32" /> uint32 | Uses variable-length encoding. | uint32 | int | int/long | uint32 | uint | integer | Bignum or Fixnum (as required) |
| <a name="uint64" /> uint64 | Uses variable-length encoding. | uint64 | long | int/long | uint64 | ulong | integer/string | Bignum or Fixnum (as required) |
| <a name="sint32" /> sint32 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int32s. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="sint64" /> sint64 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int64s. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="fixed32" /> fixed32 | Always four bytes. More efficient than uint32 if values are often greater than 2^28. | uint32 | int | int | uint32 | uint | integer | Bignum or Fixnum (as required) |
| <a name="fixed64" /> fixed64 | Always eight bytes. More efficient than uint64 if values are often greater than 2^56. | uint64 | long | int/long | uint64 | ulong | integer/string | Bignum |
| <a name="sfixed32" /> sfixed32 | Always four bytes. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="sfixed64" /> sfixed64 | Always eight bytes. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="bool" /> bool |  | bool | boolean | boolean | bool | bool | boolean | TrueClass/FalseClass |
| <a name="string" /> string | A string must always contain UTF-8 encoded or 7-bit ASCII text. | string | String | str/unicode | string | string | string | String (UTF-8) |
| <a name="bytes" /> bytes | May contain any arbitrary sequence of bytes. | string | ByteString | str | []byte | ByteString | string | String (ASCII-8BIT) |


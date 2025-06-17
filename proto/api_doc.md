# Protocol Documentation
<a name="top"></a>

## Table of Contents

- [meshtrade/compliance/client/v1/company_representative_role.proto](#meshtrade_compliance_client_v1_company_representative_role-proto)
    - [CompanyRepresentativeRole](#meshtrade-compliance-client-v1-CompanyRepresentativeRole)
  
- [meshtrade/compliance/client/v1/identification_document_type.proto](#meshtrade_compliance_client_v1_identification_document_type-proto)
    - [IdentificationDocumentType](#meshtrade-compliance-client-v1-IdentificationDocumentType)
  
- [meshtrade/compliance/client/v1/pep_status.proto](#meshtrade_compliance_client_v1_pep_status-proto)
    - [PepStatus](#meshtrade-compliance-client-v1-PepStatus)
  
- [meshtrade/type/v1/address.proto](#meshtrade_type_v1_address-proto)
    - [Address](#meshtrade-type-v1-Address)
  
- [meshtrade/type/v1/contact_details.proto](#meshtrade_type_v1_contact_details-proto)
    - [ContactDetails](#meshtrade-type-v1-ContactDetails)
  
- [meshtrade/compliance/client/v1/natural_person.proto](#meshtrade_compliance_client_v1_natural_person-proto)
    - [NaturalPerson](#meshtrade-compliance-client-v1-NaturalPerson)
  
- [meshtrade/compliance/client/v1/company_representative.proto](#meshtrade_compliance_client_v1_company_representative-proto)
    - [CompanyRepresentative](#meshtrade-compliance-client-v1-CompanyRepresentative)
  
- [meshtrade/compliance/client/v1/legal_person_form.proto](#meshtrade_compliance_client_v1_legal_person_form-proto)
    - [LegalPersonForm](#meshtrade-compliance-client-v1-LegalPersonForm)
  
- [meshtrade/compliance/client/v1/legal_person.proto](#meshtrade_compliance_client_v1_legal_person-proto)
    - [LegalPerson](#meshtrade-compliance-client-v1-LegalPerson)
  
- [meshtrade/compliance/client/v1/legal_person_connection_type.proto](#meshtrade_compliance_client_v1_legal_person_connection_type-proto)
    - [LegalPersonConnectionType](#meshtrade-compliance-client-v1-LegalPersonConnectionType)
  
- [meshtrade/compliance/client/v1/connected_legal_person.proto](#meshtrade_compliance_client_v1_connected_legal_person-proto)
    - [ConnectedLegalPerson](#meshtrade-compliance-client-v1-ConnectedLegalPerson)
  
- [meshtrade/compliance/client/v1/natural_person_connection_type.proto](#meshtrade_compliance_client_v1_natural_person_connection_type-proto)
    - [NaturalPersonConnectionType](#meshtrade-compliance-client-v1-NaturalPersonConnectionType)
  
- [meshtrade/compliance/client/v1/connected_natural_person.proto](#meshtrade_compliance_client_v1_connected_natural_person-proto)
    - [ConnectedNaturalPerson](#meshtrade-compliance-client-v1-ConnectedNaturalPerson)
  
- [meshtrade/compliance/client/v1/industry_classification.proto](#meshtrade_compliance_client_v1_industry_classification-proto)
    - [IndustryClassification](#meshtrade-compliance-client-v1-IndustryClassification)
  
- [meshtrade/compliance/client/v1/kyb_info.proto](#meshtrade_compliance_client_v1_kyb_info-proto)
    - [KYBInfo](#meshtrade-compliance-client-v1-KYBInfo)
  
- [meshtrade/compliance/client/v1/source_of_income_and_wealth.proto](#meshtrade_compliance_client_v1_source_of_income_and_wealth-proto)
    - [SourceOfIncomeAndWealth](#meshtrade-compliance-client-v1-SourceOfIncomeAndWealth)
  
- [meshtrade/compliance/client/v1/tax_residency.proto](#meshtrade_compliance_client_v1_tax_residency-proto)
    - [TaxResidency](#meshtrade-compliance-client-v1-TaxResidency)
  
- [meshtrade/compliance/client/v1/kyc_info.proto](#meshtrade_compliance_client_v1_kyc_info-proto)
    - [KYCInfo](#meshtrade-compliance-client-v1-KYCInfo)
  
- [meshtrade/compliance/client/v1/verification_status.proto](#meshtrade_compliance_client_v1_verification_status-proto)
    - [VerificationStatus](#meshtrade-compliance-client-v1-VerificationStatus)
  
- [meshtrade/compliance/client/v1/client.proto](#meshtrade_compliance_client_v1_client-proto)
    - [Client](#meshtrade-compliance-client-v1-Client)
  
- [meshtrade/compliance/client/v1/service.proto](#meshtrade_compliance_client_v1_service-proto)
    - [GetRequest](#meshtrade-compliance-client-v1-GetRequest)
    - [GetResponse](#meshtrade-compliance-client-v1-GetResponse)
  
    - [Service](#meshtrade-compliance-client-v1-Service)
  
- [meshtrade/type/v1/decimal.proto](#meshtrade_type_v1_decimal-proto)
    - [Decimal](#meshtrade-type-v1-Decimal)
  
- [meshtrade/type/v1/ledger.proto](#meshtrade_type_v1_ledger-proto)
    - [Ledger](#meshtrade-type-v1-Ledger)
  
- [meshtrade/type/v1/token.proto](#meshtrade_type_v1_token-proto)
    - [Token](#meshtrade-type-v1-Token)
  
- [meshtrade/type/v1/amount.proto](#meshtrade_type_v1_amount-proto)
    - [Amount](#meshtrade-type-v1-Amount)
  
- [meshtrade/fee/instrument_fee/v1/data_amount.proto](#meshtrade_fee_instrument_fee_v1_data_amount-proto)
    - [AmountData](#meshtrade-fee-instrument_fee-v1-AmountData)
  
- [meshtrade/fee/instrument_fee/v1/data_per_unit.proto](#meshtrade_fee_instrument_fee_v1_data_per_unit-proto)
    - [PerUnitData](#meshtrade-fee-instrument_fee-v1-PerUnitData)
  
- [meshtrade/fee/instrument_fee/v1/data_rate.proto](#meshtrade_fee_instrument_fee_v1_data_rate-proto)
    - [RateData](#meshtrade-fee-instrument_fee-v1-RateData)
  
- [meshtrade/fee/instrument_fee/v1/instrument_fee.proto](#meshtrade_fee_instrument_fee_v1_instrument_fee-proto)
    - [InstrumentFee](#meshtrade-fee-instrument_fee-v1-InstrumentFee)
  
    - [Category](#meshtrade-fee-instrument_fee-v1-Category)
    - [State](#meshtrade-fee-instrument_fee-v1-State)
  
- [meshtrade/fee/instrument_fee_profile/v1/lifecycle_event_category.proto](#meshtrade_fee_instrument_fee_profile_v1_lifecycle_event_category-proto)
    - [LifecycleEventCategory](#meshtrade-fee-instrument_fee_profile-v1-LifecycleEventCategory)
  
- [meshtrade/fee/instrument_fee/v1/service.proto](#meshtrade_fee_instrument_fee_v1_service-proto)
    - [CalculateBurningFeesRequest](#meshtrade-fee-instrument_fee-v1-CalculateBurningFeesRequest)
    - [CalculateBurningFeesResponse](#meshtrade-fee-instrument_fee-v1-CalculateBurningFeesResponse)
    - [CalculateLifecycleFeesRequest](#meshtrade-fee-instrument_fee-v1-CalculateLifecycleFeesRequest)
    - [CalculateLifecycleFeesResponse](#meshtrade-fee-instrument_fee-v1-CalculateLifecycleFeesResponse)
    - [CalculateMintingFeesRequest](#meshtrade-fee-instrument_fee-v1-CalculateMintingFeesRequest)
    - [CalculateMintingFeesResponse](#meshtrade-fee-instrument_fee-v1-CalculateMintingFeesResponse)
    - [FullUpdateRequest](#meshtrade-fee-instrument_fee-v1-FullUpdateRequest)
    - [FullUpdateResponse](#meshtrade-fee-instrument_fee-v1-FullUpdateResponse)
    - [ListRequest](#meshtrade-fee-instrument_fee-v1-ListRequest)
    - [ListResponse](#meshtrade-fee-instrument_fee-v1-ListResponse)
  
    - [Service](#meshtrade-fee-instrument_fee-v1-Service)
  
- [meshtrade/fee/instrument_fee_profile/v1/aum.proto](#meshtrade_fee_instrument_fee_profile_v1_aum-proto)
    - [AUM](#meshtrade-fee-instrument_fee_profile-v1-AUM)
  
- [meshtrade/fee/instrument_fee_profile/v1/lifecycle_event_calculation_config_amount.proto](#meshtrade_fee_instrument_fee_profile_v1_lifecycle_event_calculation_config_amount-proto)
    - [AmountLifecycleEventCalculationConfig](#meshtrade-fee-instrument_fee_profile-v1-AmountLifecycleEventCalculationConfig)
  
- [meshtrade/fee/instrument_fee_profile/v1/lifecycle_event_calculation_config_rate.proto](#meshtrade_fee_instrument_fee_profile_v1_lifecycle_event_calculation_config_rate-proto)
    - [RateLifecycleEventCalculationConfig](#meshtrade-fee-instrument_fee_profile-v1-RateLifecycleEventCalculationConfig)
  
- [meshtrade/fee/instrument_fee_profile/v1/lifecycle_event.proto](#meshtrade_fee_instrument_fee_profile_v1_lifecycle_event-proto)
    - [LifecycleEvent](#meshtrade-fee-instrument_fee_profile-v1-LifecycleEvent)
  
- [meshtrade/fee/instrument_fee_profile/v1/tokenisation.proto](#meshtrade_fee_instrument_fee_profile_v1_tokenisation-proto)
    - [Tokenisation](#meshtrade-fee-instrument_fee_profile-v1-Tokenisation)
  
- [meshtrade/fee/instrument_fee_profile/v1/fee_profile.proto](#meshtrade_fee_instrument_fee_profile_v1_fee_profile-proto)
    - [FeeProfile](#meshtrade-fee-instrument_fee_profile-v1-FeeProfile)
  
- [meshtrade/fee/instrument_fee_profile/v1/lifecycle_event_calculation_config_type.proto](#meshtrade_fee_instrument_fee_profile_v1_lifecycle_event_calculation_config_type-proto)
    - [LifecycleEventCalculationConfigType](#meshtrade-fee-instrument_fee_profile-v1-LifecycleEventCalculationConfigType)
  
- [meshtrade/fee/instrument_fee_profile/v1/service.proto](#meshtrade_fee_instrument_fee_profile_v1_service-proto)
    - [CreateRequest](#meshtrade-fee-instrument_fee_profile-v1-CreateRequest)
    - [CreateResponse](#meshtrade-fee-instrument_fee_profile-v1-CreateResponse)
    - [GetRequest](#meshtrade-fee-instrument_fee_profile-v1-GetRequest)
    - [GetResponse](#meshtrade-fee-instrument_fee_profile-v1-GetResponse)
    - [ListRequest](#meshtrade-fee-instrument_fee_profile-v1-ListRequest)
    - [ListResponse](#meshtrade-fee-instrument_fee_profile-v1-ListResponse)
    - [UpdateRequest](#meshtrade-fee-instrument_fee_profile-v1-UpdateRequest)
    - [UpdateResponse](#meshtrade-fee-instrument_fee_profile-v1-UpdateResponse)
  
    - [Service](#meshtrade-fee-instrument_fee_profile-v1-Service)
  
- [meshtrade/iam/group/v1/group.proto](#meshtrade_iam_group_v1_group-proto)
    - [Group](#meshtrade-iam-group-v1-Group)
  
- [meshtrade/iam/group/v1/service.proto](#meshtrade_iam_group_v1_service-proto)
    - [GetRequest](#meshtrade-iam-group-v1-GetRequest)
    - [GetResponse](#meshtrade-iam-group-v1-GetResponse)
  
    - [GroupService](#meshtrade-iam-group-v1-GroupService)
  
- [meshtrade/iam/role/v1/permission.proto](#meshtrade_iam_role_v1_permission-proto)
    - [Permission](#meshtrade-iam-role-v1-Permission)
  
- [meshtrade/iam/role/v1/role.proto](#meshtrade_iam_role_v1_role-proto)
    - [Role](#meshtrade-iam-role-v1-Role)
  
- [meshtrade/iam/role/v1/service.proto](#meshtrade_iam_role_v1_service-proto)
    - [GetRequest](#meshtrade-iam-role-v1-GetRequest)
    - [GetResponse](#meshtrade-iam-role-v1-GetResponse)
  
    - [Service](#meshtrade-iam-role-v1-Service)
  
- [meshtrade/ledger/transaction/v1/transaction_action.proto](#meshtrade_ledger_transaction_v1_transaction_action-proto)
    - [TransactionAction](#meshtrade-ledger-transaction-v1-TransactionAction)
  
- [meshtrade/ledger/transaction/v1/transaction_state.proto](#meshtrade_ledger_transaction_v1_transaction_state-proto)
    - [TransactionState](#meshtrade-ledger-transaction-v1-TransactionState)
  
- [meshtrade/trading/direct_order/v1/direct_order.proto](#meshtrade_trading_direct_order_v1_direct_order-proto)
    - [DirectOrder](#meshtrade-trading-direct_order-v1-DirectOrder)
  
- [meshtrade/trading/direct_order/v1/service.proto](#meshtrade_trading_direct_order_v1_service-proto)
    - [GetRequest](#meshtrade-trading-direct_order-v1-GetRequest)
    - [GetResponse](#meshtrade-trading-direct_order-v1-GetResponse)
  
    - [Service](#meshtrade-trading-direct_order-v1-Service)
  
- [meshtrade/trading/limit_order/v1/limit_order.proto](#meshtrade_trading_limit_order_v1_limit_order-proto)
    - [LimitOrder](#meshtrade-trading-limit_order-v1-LimitOrder)
  
- [meshtrade/trading/limit_order/v1/service.proto](#meshtrade_trading_limit_order_v1_service-proto)
    - [GetRequest](#meshtrade-trading-limit_order-v1-GetRequest)
    - [GetResponse](#meshtrade-trading-limit_order-v1-GetResponse)
  
    - [Service](#meshtrade-trading-limit_order-v1-Service)
  
- [meshtrade/trading/spot/v1/spot.proto](#meshtrade_trading_spot_v1_spot-proto)
    - [Spot](#meshtrade-trading-spot-v1-Spot)
  
- [meshtrade/trading/spot/v1/service.proto](#meshtrade_trading_spot_v1_service-proto)
    - [GetRequest](#meshtrade-trading-spot-v1-GetRequest)
    - [GetResponse](#meshtrade-trading-spot-v1-GetResponse)
  
    - [Service](#meshtrade-trading-spot-v1-Service)
  
- [meshtrade/wallet/account/v1/account.proto](#meshtrade_wallet_account_v1_account-proto)
    - [Account](#meshtrade-wallet-account-v1-Account)
  
- [meshtrade/wallet/account/v1/service.proto](#meshtrade_wallet_account_v1_service-proto)
    - [GetRequest](#meshtrade-wallet-account-v1-GetRequest)
    - [GetResponse](#meshtrade-wallet-account-v1-GetResponse)
  
    - [Service](#meshtrade-wallet-account-v1-Service)
  
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
| ownership_percentage | [float](#float) |  | For UBOs and Shareholders, this specifies the percentage of ownership or voting rights. Should be a value between 0.0 and 100.0. Required by business logic if the role is ULTIMATE_BENEFICIAL_OWNER or SHAREHOLDER. Optional for verification. |
| professional_contact_details | [meshtrade.type.v1.ContactDetails](#meshtrade-type-v1-ContactDetails) |  | The professional contact details for the representative in their capacity at the company (e.g., work email, work phone). Optional for verification. |
| date_of_appointment | [google.type.Date](#google-type-Date) |  | The date when the person was appointed to this role. Optional for verification. |





 

 

 

 



<a name="meshtrade_compliance_client_v1_legal_person_form-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/compliance/client/v1/legal_person_form.proto


 


<a name="meshtrade-compliance-client-v1-LegalPersonForm"></a>

### LegalPersonForm
LegalPersonForm defines the legal structure of the entity.

| Name | Number | Description |
| ---- | ------ | ----------- |
| LEGAL_PERSON_FORM_UNSPECIFIED | 0 | Unknown or not specified. This is a default value to prevent accidental assignment and should not be used. |
| LEGAL_PERSON_FORM_SOLE_PROPRIETORSHIP | 1 | A business owned and run by one individual. |
| LEGAL_PERSON_FORM_PRIVATE_COMPANY | 2 | A privately held company (e.g., Ltd., GmbH, BV). |
| LEGAL_PERSON_FORM_PUBLICLY_LISTED_COMPANY | 3 | A company whose shares are traded on a public stock exchange. |
| LEGAL_PERSON_FORM_PARTNERSHIP | 4 | A business structure where two or more individuals own a business together. |
| LEGAL_PERSON_FORM_TRUST | 5 | A legal arrangement where a trustee holds assets on behalf of beneficiaries. |
| LEGAL_PERSON_FORM_NON_PROFIT_ORGANIZATION | 6 | A non-profit organization. |
| LEGAL_PERSON_FORM_GOVERNMENT_ENTITY | 7 | A government entity or agency. |
| LEGAL_PERSON_FORM_OTHER | 8 | Any other legal form not covered by the above categories. |


 

 

 



<a name="meshtrade_compliance_client_v1_legal_person-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/compliance/client/v1/legal_person.proto



<a name="meshtrade-compliance-client-v1-LegalPerson"></a>

### LegalPerson
LegalPerson represents the identity of a business, trust, or other non-individual entity.
It contains the core, verifiable components of the entity&#39;s identity used during
Know Your Business (KYB) checks.
Note on Field Requirements: Fields marked as &#39;Required for verification&#39; are essential
for a successful compliance check, but are not mandatory for creation.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| registered_name | [string](#string) |  | The official, registered name of the legal person (e.g., the company or trust name as specified in its articles of incorporation). Required for verification. |
| legal_form | [LegalPersonForm](#meshtrade-compliance-client-v1-LegalPersonForm) |  | The legal form of the entity (e.g., LTD, PLC, BV). Required for verification. |
| registration_number | [string](#string) | optional | The official registration number assigned by the relevant companies registry. e.g., UK Companies House number, NL KVK-nummer, US EIN, or ZA CIPC Company Registration Number (e.g., 2024/123456/07). Conditionally required for verification, especially for corporate entities. |
| tax_identifier | [string](#string) | optional | The primary tax identifier for the legal person. e.g., VAT number in the EU, TIN in the US, or ZA SARS Income Tax Reference Number (e.g., 9123456789). Optional for verification. |
| country_of_incorporation | [string](#string) |  | The ISO 3166-1 alpha-2 country code of incorporation. This is the two-letter country code (e.g., &#34;ZA&#34; for South Africa, &#34;NL&#34; for the Netherlands). The value should be in uppercase. See https://www.iso.org/iso-3166-country-codes.html for a full list. Required for verification. |
| date_of_incorporation | [google.type.Date](#google-type-Date) |  | The date of incorporation or registration of the legal person. Required for verification. |
| registered_address | [meshtrade.type.v1.Address](#meshtrade-type-v1-Address) |  | The official, legal address of the entity as recorded with the incorporation registry. This is the most critical address for verification purposes. Required for verification. |
| principal_physical_address | [meshtrade.type.v1.Address](#meshtrade-type-v1-Address) | optional | The principal physical location where the business operates from (principal place of business). Provide this if it is different from the registered address. |
| postal_address | [meshtrade.type.v1.Address](#meshtrade-type-v1-Address) | optional | The preferred address for receiving mail and correspondence. Provide this if it is different from the registered address. |
| head_office_address | [meshtrade.type.v1.Address](#meshtrade-type-v1-Address) | optional | The address of the head office of a business. Provide this if it is different from the registered address. |





 

 

 

 



<a name="meshtrade_compliance_client_v1_legal_person_connection_type-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/compliance/client/v1/legal_person_connection_type.proto


 


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


 

 

 



<a name="meshtrade_compliance_client_v1_connected_legal_person-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/compliance/client/v1/connected_legal_person.proto



<a name="meshtrade-compliance-client-v1-ConnectedLegalPerson"></a>

### ConnectedLegalPerson
ConnectedLegalPerson is a legal person and how they are connected to the company.

Note on Field Requirements: Fields marked as &#39;Required for verification&#39; are essential
for a successful compliance check, but are not mandatory for creation.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| legal_person | [LegalPerson](#meshtrade-compliance-client-v1-LegalPerson) |  | The core identity of the connected legal person. Required for verification. |
| connection_types | [LegalPersonConnectionType](#meshtrade-compliance-client-v1-LegalPersonConnectionType) | repeated | The nature of the connection(s) of the legal person to the company. (e.g., Shareholder, Guarantor etc.). Required for verification. |
| ownership_percentage | [float](#float) | optional | The percentage of direct or indirect ownership this person holds. e.g. a value of 25.5 represents 25.5% ownership. Required for verification (if the connection_types includes LEGAL_PERSON_CONNECTION_TYPE_SHAREHOLDER or similar ownership role) |
| voting_rights_percentage | [float](#float) | optional | The percentage of voting rights this person holds, which can differ from ownership. e.g. a value of 25.5 represents 25.5% ownership. Optional for verification. |
| connection_description | [string](#string) |  | A plain text description of the relationship. Optional for verification. |





 

 

 

 



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


 

 

 



<a name="meshtrade_compliance_client_v1_connected_natural_person-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/compliance/client/v1/connected_natural_person.proto



<a name="meshtrade-compliance-client-v1-ConnectedNaturalPerson"></a>

### ConnectedNaturalPerson
ConnectedNaturalPerson is a natural person and how they are connected to the company.

Note on Field Requirements: Fields marked as &#39;Required for verification&#39; are essential
for a successful compliance check, but are not mandatory for creation.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| natural_person | [NaturalPerson](#meshtrade-compliance-client-v1-NaturalPerson) |  | The core identity of the connected natural person. Required for verification. |
| connection_types | [NaturalPersonConnectionType](#meshtrade-compliance-client-v1-NaturalPersonConnectionType) | repeated | The nature of the connection(s) of the natural person to the company. (e.g., Shareholder, Beneficial Owner, Partner etc.). Required for verification. |
| ownership_percentage | [float](#float) | optional | The percentage of direct or indirect ownership this person holds. e.g. a value of 25.5 represents 25.5% ownership. Required for verification (if connection types includes NATURAL_PERSON_CONNECTION_TYPE_SHAREHOLDER or similar ownership role) |
| voting_rights_percentage | [float](#float) | optional | The percentage of voting rights this person holds, which can differ from ownership. e.g. a value of 25.5 represents 25.5% ownership. Optional |





 

 

 

 



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





 

 

 

 



<a name="meshtrade_compliance_client_v1_kyb_info-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/compliance/client/v1/kyb_info.proto



<a name="meshtrade-compliance-client-v1-KYBInfo"></a>

### KYBInfo
KYBInfo is the Know Your Customer (KYB) information for an business client.
This message is used to collect and verify the identity and financial profile a business.
Note on Field Requirements: Fields marked as &#39;Required for verification&#39; are essential
for a successful compliance check, but are not mandatory for creation.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| legal_person | [LegalPerson](#meshtrade-compliance-client-v1-LegalPerson) |  | The core identity of the legal person being onboarded. Required for verification. |
| company_representatives | [CompanyRepresentative](#meshtrade-compliance-client-v1-CompanyRepresentative) | repeated | Company Representatives (The &#34;Actors&#34;). Represents individuals with a formal, appointed role who are empowered to act on behalf of the company (e.g., Directors, CEO, Authorized Signatories). This list answers the regulatory question: &#34;Who can legally bind this company?&#34; It is focused on operational control and representation. Required for verification. |
| connected_natural_persons | [ConnectedNaturalPerson](#meshtrade-compliance-client-v1-ConnectedNaturalPerson) | repeated | Connected Natural Persons (The &#34;Beneficiaries&#34;). Represents the Ultimate Beneficial Owners (UBOs) – the individuals who ultimately own or profit from the company, especially those without a formal representative title. This list is the result of the &#34;look-through&#34; due diligence process and answers the question: &#34;Who ultimately benefits from and controls this company?&#34; Required for verification. |
| connected_legal_persons | [ConnectedLegalPerson](#meshtrade-compliance-client-v1-ConnectedLegalPerson) | repeated | Connected Legal Persons (The &#34;Corporate Structure&#34;). Represents all non-human entities in the ownership chain (e.g., parent companies, holding companies, trusts). Each entity here requires its own recursive KYB check to map the full ownership structure. This list answers the question: &#34;What other companies own this company?&#34; NOTE: it is only necessary to connect other company details here if they do not form part of the hierarchy of clients on the Mesh platform. Required for verification (if the ownership structure includes other companies that are not present on Mesh). |
| industry_classification | [IndustryClassification](#meshtrade-compliance-client-v1-IndustryClassification) |  | The industry classification of the business (e.g., using NACE, SIC codes). This is critical for risk assessment. Optional for verification. |
| listed_exchange_code | [string](#string) |  | The stock exchange where the company is listed (e.g., &#34;NASDAQ&#34;, &#34;LSE&#34;). Optional for verification. |
| listing_reference | [string](#string) |  | The reference/ticker symbol for the company on the exchange (e.g., &#34;GOOGL&#34;). Optional for verification. |





 

 

 

 



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





 

 

 

 



<a name="meshtrade_compliance_client_v1_kyc_info-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/compliance/client/v1/kyc_info.proto



<a name="meshtrade-compliance-client-v1-KYCInfo"></a>

### KYCInfo
KYCInfo represents the Know Your Customer (KYC) information for an individual client.
This message is used to collect and verify the identity and financial profile of a person.
Note on Field Requirements: Fields marked as &#39;Required for verification&#39; are essential
for a successful compliance check, but are not mandatory for creation.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| natural_person | [NaturalPerson](#meshtrade-compliance-client-v1-NaturalPerson) |  | Details of the natural person represented by this kyc profile. This contains the core identity information (name, DOB, address, identity document etc.). Required for verification. |
| sources_of_income | [SourceOfIncomeAndWealth](#meshtrade-compliance-client-v1-SourceOfIncomeAndWealth) | repeated | The primary sources of the client&#39;s regular income (e.g., employment, pension). Required for verification. |
| sources_of_wealth | [SourceOfIncomeAndWealth](#meshtrade-compliance-client-v1-SourceOfIncomeAndWealth) | repeated | The origins of the client&#39;s total net worth or assets (e.g., inheritance, investments). This is distinct from the source of income. Required for verification. |
| tax_residencies | [TaxResidency](#meshtrade-compliance-client-v1-TaxResidency) | repeated | The client&#39;s tax residency information, required for CRS/FATCA reporting. A client can be a tax resident in multiple jurisdictions. Required for verification. |





 

 

 

 



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
| owner_group | [string](#string) |  | The resource name of the group that owns this client in the format groups/{group_id}. This field establishes the ownership link and can be updated if the client&#39;s ownership changes, without affecting the client&#39;s stable `name`. The executing user needs to have permission to perform client.Create in this group. Required on creation. |
| display_name | [string](#string) |  | A non-unique, user-provided name for the client, used for display purposes in user interfaces and reports. Required on creation. |
| kyc_info | [KYCInfo](#meshtrade-compliance-client-v1-KYCInfo) |  |  |
| kyb_info | [KYBInfo](#meshtrade-compliance-client-v1-KYBInfo) |  |  |
| verification_status | [VerificationStatus](#meshtrade-compliance-client-v1-VerificationStatus) |  | The definitive, most recent compliance status of the client (e.g., VERIFICATION_STATUS_VERIFIED, VERIFICATION_STATUS_FAILED). System controlled. |
| verification_authority_name | [string](#string) |  | The resource name of the client (acting as a verifier) that last set the `verification_status`. This provides an audit trail for status changes. System set when verification_status changes. |
| verification_date | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  | The timestamp when the `verification_status` was last set to a conclusive state, specifically `VERIFICATION_STATUS_VERIFIED`. System set when verification_status changes to VERIFICATION_STATUS_VERIFIED. |
| next_verification_date | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  | The timestamp indicating when the client&#39;s next periodic compliance review is due. This field drives re-verification workflows. Optional for Verification. |





 

 

 

 



<a name="meshtrade_compliance_client_v1_service-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/compliance/client/v1/service.proto



<a name="meshtrade-compliance-client-v1-GetRequest"></a>

### GetRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| number | [string](#string) |  |  |






<a name="meshtrade-compliance-client-v1-GetResponse"></a>

### GetResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| client | [Client](#meshtrade-compliance-client-v1-Client) |  |  |





 

 

 


<a name="meshtrade-compliance-client-v1-Service"></a>

### Service


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| Get | [GetRequest](#meshtrade-compliance-client-v1-GetRequest) | [GetResponse](#meshtrade-compliance-client-v1-GetResponse) |  |

 



<a name="meshtrade_type_v1_decimal-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/type/v1/decimal.proto



<a name="meshtrade-type-v1-Decimal"></a>

### Decimal
Decimal is a representation of a decimal value, such as 2.5.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| value | [string](#string) |  | The decimal value, as a string. |





 

 

 

 



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





 

 

 

 



<a name="meshtrade_fee_instrument_fee_v1_data_amount-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/fee/instrument_fee/v1/data_amount.proto



<a name="meshtrade-fee-instrument_fee-v1-AmountData"></a>

### AmountData
AmountData is the additional calculation data for a Fee
of a fixed amount.
This is used for flat fees that do not depend on a variable
base amount and percentage for calculation.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| amount_excl_vat | [meshtrade.type.v1.Amount](#meshtrade-type-v1-Amount) |  | AmountExclVAT is the VAT exclusive amount used to calculate Fee.VatAmount and the resulting Fee.AmountInclVAT. |
| vat_rate | [meshtrade.type.v1.Decimal](#meshtrade-type-v1-Decimal) |  | VATRate is the rate used to calculate Fee.VatAmount. |





 

 

 

 



<a name="meshtrade_fee_instrument_fee_v1_data_per_unit-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/fee/instrument_fee/v1/data_per_unit.proto



<a name="meshtrade-fee-instrument_fee-v1-PerUnitData"></a>

### PerUnitData
PerUnitData is the additional calculation data for a Fee
calculated using a variable amount of tokens and a set
amount per token.
For example, this is used for minting and burning fees where
the Fee amount depends on the number of tokens minted
or burned, and the fee amount per token minted or burned.
@bson-marshalled


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| no_units | [meshtrade.type.v1.Decimal](#meshtrade-type-v1-Decimal) |  | NoUnits is the number of tokens for which a set fee amount is charged and is used to calculate the AmountExclVAT. |
| per_unit_amount | [meshtrade.type.v1.Amount](#meshtrade-type-v1-Amount) |  | PerUnitAmount is the fee amount per token that gets multiplied with the NoUnits to calculate the AmountExclVAT. |
| amount_excl_vat | [meshtrade.type.v1.Amount](#meshtrade-type-v1-Amount) |  | AmountExclVAT is the VAT exclusive amount used to calculate Fee.VatAmount and the resulting Fee.AmountInclVAT. |
| vat_rate | [meshtrade.type.v1.Decimal](#meshtrade-type-v1-Decimal) |  | VATRate is the rate used to calculate Fee.VatAmount. |





 

 

 

 



<a name="meshtrade_fee_instrument_fee_v1_data_rate-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/fee/instrument_fee/v1/data_rate.proto



<a name="meshtrade-fee-instrument_fee-v1-RateData"></a>

### RateData
RateData is the additional calculation data for a Fee
calculated using a percentage rate and a variable base
amount.
This is used for fees that depend on a base amount like the
primary market settlement amount or subscription order book
target raise, not yet known with certainty at the time of
setting up the Instrument&#39;s FeeProfile.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| rate | [meshtrade.type.v1.Decimal](#meshtrade-type-v1-Decimal) |  | Rate is the rate applied to the BaseAmount to calculate the resulting AmountExclVAT. |
| base_amount | [meshtrade.type.v1.Amount](#meshtrade-type-v1-Amount) |  | BaseAmount is the variable amount that gets multiplied with the Rate to calculate the AmountExclVAT. For example, this might be the primary market settlement amount or subscription order book target raise. |
| amount_excl_vat | [meshtrade.type.v1.Amount](#meshtrade-type-v1-Amount) |  | AmountExclVAT is the VAT exclusive amount used to calculate Fee.VatAmount and the resulting Fee.AmountInclVAT. |
| vat_rate | [meshtrade.type.v1.Decimal](#meshtrade-type-v1-Decimal) |  | VATRate is the rate used to calculate Fee.VatAmount. |





 

 

 

 



<a name="meshtrade_fee_instrument_fee_v1_instrument_fee-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/fee/instrument_fee/v1/instrument_fee.proto



<a name="meshtrade-fee-instrument_fee-v1-InstrumentFee"></a>

### InstrumentFee
InstrumentFee represents a financial charge associated with an Instrument,
imposed on the Instrument Issuer.
A Fee is generated using a FeeProfile, which determines its amount
and other related fields.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | ID is a universally unique identifier set in the application layer. |
| instrument_name | [string](#string) |  | InstrumentName refers to the instrument against which this Fee applied. |
| state | [State](#meshtrade-fee-instrument_fee-v1-State) |  | State is the fee status. |
| description | [string](#string) |  | Description is the description of this Fee. It explains the purpose and context behind the charge. |
| amount_incl_vat | [meshtrade.type.v1.Amount](#meshtrade-type-v1-Amount) |  | AmountInclVAT is the total amount charged, inclusive of VAT. This field captures the gross charge that the instrument issuer must pay. |
| vat_amount | [meshtrade.type.v1.Amount](#meshtrade-type-v1-Amount) |  | VATAmount is the portion of the AmountInclVAT that constitutes VAT. |
| category | [Category](#meshtrade-fee-instrument_fee-v1-Category) |  | Category is the type of Fee being applied. It categorises fees based on their purpose and the services they correspond to. Supported categories include: - Tokenisation: Fee for tokenizing assets. - Listing: Fee for listing the instrument on a platform. - PrimaryMarketSettlement: Fee related to primary market transaction settlements. - AUM: Assets Under Management fee. |
| payment_date | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  | PaymentDate is the date on which the Fee was paid. |
| amount_data | [AmountData](#meshtrade-fee-instrument_fee-v1-AmountData) |  |  |
| rate_data | [RateData](#meshtrade-fee-instrument_fee-v1-RateData) |  |  |
| per_unit_data | [PerUnitData](#meshtrade-fee-instrument_fee-v1-PerUnitData) |  |  |





 


<a name="meshtrade-fee-instrument_fee-v1-Category"></a>

### Category
Category defines the different types of Fees that can be applied to an instrument.

| Name | Number | Description |
| ---- | ------ | ----------- |
| CATEGORY_UNSPECIFIED | 0 | Unknown or not specified. This is a a default value to prevent accidental assignment and should not be used. |
| CATEGORY_TOKENISATION | 1 |  |
| CATEGORY_LISTING | 2 |  |
| CATEGORY_PRIMARY_MARKET_SETTLEMENT | 3 |  |
| CATEGORY_AUM | 4 |  |



<a name="meshtrade-fee-instrument_fee-v1-State"></a>

### State
State is the state of an instrument Fee in its state diagram.

| Name | Number | Description |
| ---- | ------ | ----------- |
| STATE_UNSPECIFIED | 0 | Unknown or not specified. This is a a default value to prevent accidental assignment and should not be used. |
| STATE_UPCOMING | 1 |  |
| STATE_DUE | 2 |  |
| STATE_PAYMENT_IN_PROGRESS | 3 |  |
| STATE_FAILED | 4 |  |
| STATE_CANCELLED | 5 |  |
| STATE_PAID | 6 |  |


 

 

 



<a name="meshtrade_fee_instrument_fee_profile_v1_lifecycle_event_category-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/fee/instrument_fee_profile/v1/lifecycle_event_category.proto


 


<a name="meshtrade-fee-instrument_fee_profile-v1-LifecycleEventCategory"></a>

### LifecycleEventCategory
LifecycleEventCategory defines the different types of lifecycle events that can trigger a Fee.

| Name | Number | Description |
| ---- | ------ | ----------- |
| LIFECYCLE_EVENT_CATEGORY_UNSPECIFIED | 0 | Unknown or not specified. This is a a default value to prevent accidental assignment and should not be used. |
| LIFECYCLE_EVENT_CATEGORY_LISTING | 1 |  |
| LIFECYCLE_EVENT_CATEGORY_PRIMARY_MARKET_SETTLEMENT | 2 |  |


 

 

 



<a name="meshtrade_fee_instrument_fee_v1_service-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/fee/instrument_fee/v1/service.proto



<a name="meshtrade-fee-instrument_fee-v1-CalculateBurningFeesRequest"></a>

### CalculateBurningFeesRequest
CalculateBurningFeesRequest is the CalculateBurningFees method request on the Fee Service.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| amount | [meshtrade.type.v1.Amount](#meshtrade-type-v1-Amount) |  | Amount is the burn Amount for which fees are calculated. |






<a name="meshtrade-fee-instrument_fee-v1-CalculateBurningFeesResponse"></a>

### CalculateBurningFeesResponse
CalculateBurningFeesResponse is the CalculateBurningFees method response on the Fee Service.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| fees | [InstrumentFee](#meshtrade-fee-instrument_fee-v1-InstrumentFee) | repeated | Fees are the fees calculated for the requested burn amount. |






<a name="meshtrade-fee-instrument_fee-v1-CalculateLifecycleFeesRequest"></a>

### CalculateLifecycleFeesRequest
CalculateLifecycleFeesRequest is the CalculateLifecycleFees method request on the Fee Service.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| instrument_id | [string](#string) |  | InstrumentID is the id of the instrument for which lifecycle fees are calculated. |
| lifecycle_event_category | [meshtrade.fee.instrument_fee_profile.v1.LifecycleEventCategory](#meshtrade-fee-instrument_fee_profile-v1-LifecycleEventCategory) |  | LifecycleEventCategory is the category of lifecycle events for which lifecycle fees are calculated |






<a name="meshtrade-fee-instrument_fee-v1-CalculateLifecycleFeesResponse"></a>

### CalculateLifecycleFeesResponse
CalculateLifecycleFeesResponse is the CalculateLifecycleFees method response on the Fee Service.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| fees | [InstrumentFee](#meshtrade-fee-instrument_fee-v1-InstrumentFee) | repeated | Fees are the fees calculated for the requested instrument. |






<a name="meshtrade-fee-instrument_fee-v1-CalculateMintingFeesRequest"></a>

### CalculateMintingFeesRequest
CalculateMintingFeesRequest is the CalculateMintingFees method request on the Fee Service.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| amount | [meshtrade.type.v1.Amount](#meshtrade-type-v1-Amount) |  | Amount is the mint Amount for which fees are calculated. |






<a name="meshtrade-fee-instrument_fee-v1-CalculateMintingFeesResponse"></a>

### CalculateMintingFeesResponse
CalculateMintingFeesResponse is the CalculateMintingFees method response on the Fee Service.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| fees | [InstrumentFee](#meshtrade-fee-instrument_fee-v1-InstrumentFee) | repeated | Fees are the fees calculated for the requested mint amount. |






<a name="meshtrade-fee-instrument_fee-v1-FullUpdateRequest"></a>

### FullUpdateRequest
FullUpdateRequest is the empty FullUpdate method request on the Fee Service.






<a name="meshtrade-fee-instrument_fee-v1-FullUpdateResponse"></a>

### FullUpdateResponse
FullUpdateResponse is the empty FullUpdate method response on the Fee Service.






<a name="meshtrade-fee-instrument_fee-v1-ListRequest"></a>

### ListRequest
ListRequest is the List method request on the Fee Service.






<a name="meshtrade-fee-instrument_fee-v1-ListResponse"></a>

### ListResponse
ListResponse is the List method response on the Fee Service.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| fees | [InstrumentFee](#meshtrade-fee-instrument_fee-v1-InstrumentFee) | repeated | Fees are the list of fees that were retrieved. |





 

 

 


<a name="meshtrade-fee-instrument_fee-v1-Service"></a>

### Service
Service is the Fee Service.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| List | [ListRequest](#meshtrade-fee-instrument_fee-v1-ListRequest) | [ListResponse](#meshtrade-fee-instrument_fee-v1-ListResponse) |  |
| CalculateMintingFees | [CalculateMintingFeesRequest](#meshtrade-fee-instrument_fee-v1-CalculateMintingFeesRequest) | [CalculateMintingFeesResponse](#meshtrade-fee-instrument_fee-v1-CalculateMintingFeesResponse) |  |
| CalculateBurningFees | [CalculateBurningFeesRequest](#meshtrade-fee-instrument_fee-v1-CalculateBurningFeesRequest) | [CalculateBurningFeesResponse](#meshtrade-fee-instrument_fee-v1-CalculateBurningFeesResponse) |  |
| CalculateLifecycleFees | [CalculateLifecycleFeesRequest](#meshtrade-fee-instrument_fee-v1-CalculateLifecycleFeesRequest) | [CalculateLifecycleFeesResponse](#meshtrade-fee-instrument_fee-v1-CalculateLifecycleFeesResponse) |  |
| FullUpdate | [FullUpdateRequest](#meshtrade-fee-instrument_fee-v1-FullUpdateRequest) | [FullUpdateResponse](#meshtrade-fee-instrument_fee-v1-FullUpdateResponse) |  |

 



<a name="meshtrade_fee_instrument_fee_profile_v1_aum-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/fee/instrument_fee_profile/v1/aum.proto



<a name="meshtrade-fee-instrument_fee_profile-v1-AUM"></a>

### AUM
NOT COMPLETE
AUM (Assets Under Management) configures the fees related to the
management of the Instrument on Mesh.
These fees are typically based on the total value of assets being
managed on Mesh, or a flat amount.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| rate | [meshtrade.type.v1.Decimal](#meshtrade-type-v1-Decimal) |  | Rate is fee rate applied to the total value of assets on Mesh to calculate the Fee.AmountExclVAT. |





 

 

 

 



<a name="meshtrade_fee_instrument_fee_profile_v1_lifecycle_event_calculation_config_amount-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/fee/instrument_fee_profile/v1/lifecycle_event_calculation_config_amount.proto



<a name="meshtrade-fee-instrument_fee_profile-v1-AmountLifecycleEventCalculationConfig"></a>

### AmountLifecycleEventCalculationConfig
AmountLifecycleEventCalculationConfig is the calculation data for a
lifecycle Fee with a fixed amount.
This is used for flat lifecycle event fees that do not depend on a
variable base amount and percentage for calculation.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| amount | [meshtrade.type.v1.Amount](#meshtrade-type-v1-Amount) |  | Amount is the fixed (pre-tax) fee amount charged on the lifecycle event. |





 

 

 

 



<a name="meshtrade_fee_instrument_fee_profile_v1_lifecycle_event_calculation_config_rate-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/fee/instrument_fee_profile/v1/lifecycle_event_calculation_config_rate.proto



<a name="meshtrade-fee-instrument_fee_profile-v1-RateLifecycleEventCalculationConfig"></a>

### RateLifecycleEventCalculationConfig
RateLifecycleEventCalculationConfig is the calculation configuration for a Fee
calculated using a percentage rate and a variable base
amount.
This is used for fees that depend on base amount like the
primary market settlement amount or subscription order book
target raise not yet known with certainty at the time of
setting up the Instrument&#39;s FeeProfile.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| rate | [meshtrade.type.v1.Decimal](#meshtrade-type-v1-Decimal) |  | Rate is the rate used to calculate Fee amount when mulitplied to a base amount specific to the lifecycle event. The base amount used is typically one of the following: - Subscription order book target raise amount - Primary market settlement amount |





 

 

 

 



<a name="meshtrade_fee_instrument_fee_profile_v1_lifecycle_event-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/fee/instrument_fee_profile/v1/lifecycle_event.proto



<a name="meshtrade-fee-instrument_fee_profile-v1-LifecycleEvent"></a>

### LifecycleEvent
LifecycleEvents configures the fees associated with various stages in the
Instrument&#39;s lifecycle.
Lifecycle events are significant milestones or actions that may incur
fees, such as:
- Listing: Fees for listing the Instrument on Mesh.
- Primary Market Settlement: Fees related to the settlement of
transactions in the primary market.
Multiple lifecycle events can be configured and managed within a single
FeeProfile.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| description | [string](#string) |  | Description is the description of the Fee charged on this LifecycleEvent. The description must be unique is the sense that the same description cannot be used more than once for a single trigger. |
| category | [LifecycleEventCategory](#meshtrade-fee-instrument_fee_profile-v1-LifecycleEventCategory) |  | Category is the Instrument lifecycle event type that leads to a Fee being charged. |
| amount_lifecycle_event_calculation_config | [AmountLifecycleEventCalculationConfig](#meshtrade-fee-instrument_fee_profile-v1-AmountLifecycleEventCalculationConfig) |  |  |
| rate_lifecycle_event_calculation_config | [RateLifecycleEventCalculationConfig](#meshtrade-fee-instrument_fee_profile-v1-RateLifecycleEventCalculationConfig) |  |  |





 

 

 

 



<a name="meshtrade_fee_instrument_fee_profile_v1_tokenisation-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/fee/instrument_fee_profile/v1/tokenisation.proto



<a name="meshtrade-fee-instrument_fee_profile-v1-Tokenisation"></a>

### Tokenisation
Tokenisation configures the fees related to the tokenisation
processes of the Instrument.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| first_time_minting_amount | [meshtrade.type.v1.Amount](#meshtrade-type-v1-Amount) |  | FirstTimeMintingAmount is the fee amount charged when minting tokens of the Instrument for the first time. |
| minting_amount | [meshtrade.type.v1.Amount](#meshtrade-type-v1-Amount) |  | MintingAmount is minting fee charged per token minted. |
| burning_amount | [meshtrade.type.v1.Amount](#meshtrade-type-v1-Amount) |  | BurningAmount is minting fee charged per token burned. |





 

 

 

 



<a name="meshtrade_fee_instrument_fee_profile_v1_fee_profile-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/fee/instrument_fee_profile/v1/fee_profile.proto



<a name="meshtrade-fee-instrument_fee_profile-v1-FeeProfile"></a>

### FeeProfile
FeeProfile defines the fee structure associated with a specific
Instrument.
It determines the types of fees applicable, the conditions under
which they are generated, and the schedule for charging these fees
to the Issuer.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| instrument_id | [string](#string) |  | InstrumentID references the instrument against which this FeeProfile is applied. |
| tokenisation | [Tokenisation](#meshtrade-fee-instrument_fee_profile-v1-Tokenisation) |  | Tokenisation configures the fees related to the tokenisation processes of the Instrument. Tokenisation involves converting the Instrument into digital tokens, which may include actions like: - Minting: The creation of new tokens representing the Instrument. - Burning: The destruction of existing tokens, reducing the total supply. |
| lifecycle_events | [LifecycleEvent](#meshtrade-fee-instrument_fee_profile-v1-LifecycleEvent) | repeated | LifecycleEvents configures the fees associated with various stages in the Instrument&#39;s lifecycle. Lifecycle events are significant milestones or actions that may incur fees, such as: - Listing: Fees for listing the Instrument on Mesh. - Primary Market Settlement: Fees related to the settlement of transactions in the primary market.

Multiple lifecycle events can be configured and managed within a single FeeProfile. |
| aum | [AUM](#meshtrade-fee-instrument_fee_profile-v1-AUM) |  | AUM (Assets Under Management) configures the fees related to the management of the Instrument on Mesh. These fees are typically based on the total value of assets being managed on Mesh, or a flat amount. |





 

 

 

 



<a name="meshtrade_fee_instrument_fee_profile_v1_lifecycle_event_calculation_config_type-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/fee/instrument_fee_profile/v1/lifecycle_event_calculation_config_type.proto


 


<a name="meshtrade-fee-instrument_fee_profile-v1-LifecycleEventCalculationConfigType"></a>

### LifecycleEventCalculationConfigType
LifecycleEventCalculationConfigType is a convenience enum that lists all possible calculation configuration types.

| Name | Number | Description |
| ---- | ------ | ----------- |
| LIFECYCLE_EVENT_CALCULATION_CONFIG_TYPE_UNSPECIFIED | 0 | Unknown or not specified. This is a a default value to prevent accidental assignment and should not be used. |
| LIFECYCLE_EVENT_CALCULATION_CONFIG_TYPE_AMOUNT | 1 |  |
| LIFECYCLE_EVENT_CALCULATION_CONFIG_TYPE_RATE | 2 |  |


 

 

 



<a name="meshtrade_fee_instrument_fee_profile_v1_service-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/fee/instrument_fee_profile/v1/service.proto



<a name="meshtrade-fee-instrument_fee_profile-v1-CreateRequest"></a>

### CreateRequest
CreateRequest is the Create method request on the Fee Profile Service.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| fee_profile | [FeeProfile](#meshtrade-fee-instrument_fee_profile-v1-FeeProfile) |  | FeeProfile is the FeeProfile to be created. |






<a name="meshtrade-fee-instrument_fee_profile-v1-CreateResponse"></a>

### CreateResponse
CreateResponse is the Create method response on the Fee Profile Service.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| fee_profile | [FeeProfile](#meshtrade-fee-instrument_fee_profile-v1-FeeProfile) |  | FeeProfile is the FeeProfile that was created. |






<a name="meshtrade-fee-instrument_fee_profile-v1-GetRequest"></a>

### GetRequest
GetRequest is the Get method request on the Fee Profile Service.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| instrument_id | [string](#string) |  | InstrumentID of the fee profile to retrieve. |






<a name="meshtrade-fee-instrument_fee_profile-v1-GetResponse"></a>

### GetResponse
GetResponse is the Get method response on the Fee Profile Service.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| fee_profile | [FeeProfile](#meshtrade-fee-instrument_fee_profile-v1-FeeProfile) |  | FeeProfile are the is the fee profile that was retrieved. |






<a name="meshtrade-fee-instrument_fee_profile-v1-ListRequest"></a>

### ListRequest
ListRequest is the List method request on the Fee Profile Service.






<a name="meshtrade-fee-instrument_fee_profile-v1-ListResponse"></a>

### ListResponse
ListResponse is the List method response on the Fee Profile Service.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| fee_profiles | [FeeProfile](#meshtrade-fee-instrument_fee_profile-v1-FeeProfile) | repeated | FeeProfiles are the list of fee profiles that were retrieved. |






<a name="meshtrade-fee-instrument_fee_profile-v1-UpdateRequest"></a>

### UpdateRequest
UpdateRequest is the Update method request on the Fee Profile Service.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| fee_profile | [FeeProfile](#meshtrade-fee-instrument_fee_profile-v1-FeeProfile) |  | FeeProfile is the FeeProfile to be updated. |






<a name="meshtrade-fee-instrument_fee_profile-v1-UpdateResponse"></a>

### UpdateResponse
UpdateResponse is the Update method response on the Fee Profile Service.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| fee_profile | [FeeProfile](#meshtrade-fee-instrument_fee_profile-v1-FeeProfile) |  | FeeProfile is the FeeProfile that was updated. |





 

 

 


<a name="meshtrade-fee-instrument_fee_profile-v1-Service"></a>

### Service
Service is the Fee Profile Service.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| Create | [CreateRequest](#meshtrade-fee-instrument_fee_profile-v1-CreateRequest) | [CreateResponse](#meshtrade-fee-instrument_fee_profile-v1-CreateResponse) |  |
| Update | [UpdateRequest](#meshtrade-fee-instrument_fee_profile-v1-UpdateRequest) | [UpdateResponse](#meshtrade-fee-instrument_fee_profile-v1-UpdateResponse) |  |
| List | [ListRequest](#meshtrade-fee-instrument_fee_profile-v1-ListRequest) | [ListResponse](#meshtrade-fee-instrument_fee_profile-v1-ListResponse) |  |
| Get | [GetRequest](#meshtrade-fee-instrument_fee_profile-v1-GetRequest) | [GetResponse](#meshtrade-fee-instrument_fee_profile-v1-GetResponse) |  |

 



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



<a name="meshtrade-iam-group-v1-GetRequest"></a>

### GetRequest







<a name="meshtrade-iam-group-v1-GetResponse"></a>

### GetResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group | [Group](#meshtrade-iam-group-v1-Group) |  |  |





 

 

 


<a name="meshtrade-iam-group-v1-GroupService"></a>

### GroupService


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| Get | [GetRequest](#meshtrade-iam-group-v1-GetRequest) | [GetResponse](#meshtrade-iam-group-v1-GetResponse) |  |

 



<a name="meshtrade_iam_role_v1_permission-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/iam/role/v1/permission.proto



<a name="meshtrade-iam-role-v1-Permission"></a>

### Permission
Permission is the ability to perform an activity in the system.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| service_provider | [string](#string) |  | ServiceProvider is the name of the Service Provider that provides Service. |
| service | [string](#string) |  | Service is the name of the Service on ServiceProvider that this Permission grants access to. |
| description | [string](#string) |  | Description describes the purpose of this permission. |





 

 

 

 



<a name="meshtrade_iam_role_v1_role-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/iam/role/v1/role.proto



<a name="meshtrade-iam-role-v1-Role"></a>

### Role
Role is a collection of permissions.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | Name is the name of the Role. |
| permissions | [Permission](#meshtrade-iam-role-v1-Permission) | repeated | Permissions are the permissions on this role. |





 

 

 

 



<a name="meshtrade_iam_role_v1_service-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/iam/role/v1/service.proto



<a name="meshtrade-iam-role-v1-GetRequest"></a>

### GetRequest







<a name="meshtrade-iam-role-v1-GetResponse"></a>

### GetResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| role | [Role](#meshtrade-iam-role-v1-Role) |  |  |





 

 

 


<a name="meshtrade-iam-role-v1-Service"></a>

### Service


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| Get | [GetRequest](#meshtrade-iam-role-v1-GetRequest) | [GetResponse](#meshtrade-iam-role-v1-GetResponse) |  |

 



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



<a name="meshtrade-trading-direct_order-v1-GetRequest"></a>

### GetRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| number | [string](#string) |  |  |






<a name="meshtrade-trading-direct_order-v1-GetResponse"></a>

### GetResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| directorder | [DirectOrder](#meshtrade-trading-direct_order-v1-DirectOrder) |  |  |





 

 

 


<a name="meshtrade-trading-direct_order-v1-Service"></a>

### Service


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| Get | [GetRequest](#meshtrade-trading-direct_order-v1-GetRequest) | [GetResponse](#meshtrade-trading-direct_order-v1-GetResponse) |  |

 



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



<a name="meshtrade-trading-limit_order-v1-GetRequest"></a>

### GetRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| number | [string](#string) |  |  |






<a name="meshtrade-trading-limit_order-v1-GetResponse"></a>

### GetResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| limitorder | [LimitOrder](#meshtrade-trading-limit_order-v1-LimitOrder) |  |  |





 

 

 


<a name="meshtrade-trading-limit_order-v1-Service"></a>

### Service


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| Get | [GetRequest](#meshtrade-trading-limit_order-v1-GetRequest) | [GetResponse](#meshtrade-trading-limit_order-v1-GetResponse) |  |

 



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



<a name="meshtrade-trading-spot-v1-GetRequest"></a>

### GetRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| number | [string](#string) |  |  |






<a name="meshtrade-trading-spot-v1-GetResponse"></a>

### GetResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| spot | [Spot](#meshtrade-trading-spot-v1-Spot) |  |  |





 

 

 


<a name="meshtrade-trading-spot-v1-Service"></a>

### Service


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| Get | [GetRequest](#meshtrade-trading-spot-v1-GetRequest) | [GetResponse](#meshtrade-trading-spot-v1-GetResponse) |  |

 



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



<a name="meshtrade-wallet-account-v1-GetRequest"></a>

### GetRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| number | [string](#string) |  |  |






<a name="meshtrade-wallet-account-v1-GetResponse"></a>

### GetResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| account | [Account](#meshtrade-wallet-account-v1-Account) |  |  |





 

 

 


<a name="meshtrade-wallet-account-v1-Service"></a>

### Service


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| Get | [GetRequest](#meshtrade-wallet-account-v1-GetRequest) | [GetResponse](#meshtrade-wallet-account-v1-GetResponse) |  |

 



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


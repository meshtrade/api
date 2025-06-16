# Protocol Documentation
<a name="top"></a>

## Table of Contents

- [meshtrade/compliance/client/v1/client.proto](#meshtrade_compliance_client_v1_client-proto)
    - [Client](#meshtrade-compliance-client-v1-Client)
  
- [meshtrade/compliance/client/v1/kyc_info.proto](#meshtrade_compliance_client_v1_kyc_info-proto)
    - [KYCInfo](#meshtrade-compliance-client-v1-KYCInfo)
  
- [meshtrade/compliance/client/v1/service.proto](#meshtrade_compliance_client_v1_service-proto)
    - [GetRequest](#meshtrade-compliance-client-v1-GetRequest)
    - [GetResponse](#meshtrade-compliance-client-v1-GetResponse)
  
    - [Service](#meshtrade-compliance-client-v1-Service)
  
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
  
- [meshtrade/type/v1/address.proto](#meshtrade_type_v1_address-proto)
    - [PostalAddress](#meshtrade-type-v1-PostalAddress)
  
- [meshtrade/type/v1/decimal.proto](#meshtrade_type_v1_decimal-proto)
    - [Decimal](#meshtrade-type-v1-Decimal)
  
- [meshtrade/wallet/account/v1/account.proto](#meshtrade_wallet_account_v1_account-proto)
    - [Account](#meshtrade-wallet-account-v1-Account)
  
- [meshtrade/wallet/account/v1/service.proto](#meshtrade_wallet_account_v1_service-proto)
    - [GetRequest](#meshtrade-wallet-account-v1-GetRequest)
    - [GetResponse](#meshtrade-wallet-account-v1-GetResponse)
  
    - [Service](#meshtrade-wallet-account-v1-Service)
  
- [Scalar Value Types](#scalar-value-types)



<a name="meshtrade_compliance_client_v1_client-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/compliance/client/v1/client.proto



<a name="meshtrade-compliance-client-v1-Client"></a>

### Client
Client is an authorised legal entity, individual or business (company, trust etc.).
Clients resources (accounts, instruments etc.) are owned by an associated group
hierarchy containing at least 1 group (the default &#39;top level&#39; group of the client).


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | Name the unique name of the client resource and takes on the format: clients/&lt;&lt;owner_group_id&gt;&gt;/&lt;client_id&gt;

FIXME: consider if it is fine for this to be able to change if the group owner changes. An external system my have stored this as a unique reference in their system!! It is not reasonable to consider that they would have ownly stored the last bit of this string. |
| display_name | [string](#string) |  | Display name is a non-unique name field. |





 

 

 

 



<a name="meshtrade_compliance_client_v1_kyc_info-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/compliance/client/v1/kyc_info.proto



<a name="meshtrade-compliance-client-v1-KYCInfo"></a>

### KYCInfo



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| full_name | [string](#string) |  |  |
| verification_date | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  | The date on which the verification status went good! |





 

 

 

 



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

 



<a name="meshtrade_type_v1_address-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/type/v1/address.proto



<a name="meshtrade-type-v1-PostalAddress"></a>

### PostalAddress
Represents a postal address, e.g. for postal delivery or payments addresses.
Given a postal address, a postal service can deliver items to a premise, P.O.
Box or similar.
It is not intended to model geographical locations (roads, towns,
mountains).

In typical usage an address would be created via user input or from importing
existing data, depending on the type of process.

Advice on address input / editing:
 - Use an i18n-ready address widget such as
   https://github.com/google/libaddressinput)
- Users should not be presented with UI elements for input or editing of
  fields outside countries where that field is used.

For more guidance on how to use this schema, please see:
https://support.google.com/business/answer/6397478


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| address_lines | [string](#string) | repeated | Unstructured address lines describing the address. --&gt; Required |
| suburb | [string](#string) |  | Suburb of the address. --&gt; Optional |
| city | [string](#string) |  | City of the address. --&gt; Required |
| province | [string](#string) |  | Province or state of the address --&gt; Required |
| country_code | [string](#string) |  | Country code of the address in ISO format. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See http://cldr.unicode.org/ and http://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: &#34;CH&#34; for Switzerland. --&gt; Required. |
| postal_code | [string](#string) |  | Postal code of the address. --&gt; Optional |





 

 

 

 



<a name="meshtrade_type_v1_decimal-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## meshtrade/type/v1/decimal.proto



<a name="meshtrade-type-v1-Decimal"></a>

### Decimal
Decimal is a representation of a decimal value, such as 2.5.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| value | [string](#string) |  | The decimal value, as a string. |





 

 

 

 



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


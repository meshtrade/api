// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.33.0
// 	protoc        v5.28.0
// source: api/proto/legal/company/company.proto

package company

import (
	client "github.com/meshtrade/api/go/client"
	legal "github.com/meshtrade/api/go/legal"
	location "github.com/meshtrade/api/go/location"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	_ "google.golang.org/protobuf/types/known/timestamppb"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type Company struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Registered name of the company (required field)
	RegisteredName string `protobuf:"bytes,1,opt,name=registeredName,proto3" json:"registeredName,omitempty"`
	// Tax reference number of the company
	TaxReferenceNumber string `protobuf:"bytes,2,opt,name=taxReferenceNumber,proto3" json:"taxReferenceNumber,omitempty"`
	// Registration number of the company
	RegistrationNumber string `protobuf:"bytes,3,opt,name=registrationNumber,proto3" json:"registrationNumber,omitempty"`
	// VAT (Value-Added Tax) registration number of the company
	VatRegistrationNumber string `protobuf:"bytes,4,opt,name=vatRegistrationNumber,proto3" json:"vatRegistrationNumber,omitempty"`
	// Public contact information of the company
	PublicContactInfo *legal.CompanyPublicContactInfo `protobuf:"bytes,5,opt,name=public_contact_info,json=publicContactInfo,proto3" json:"public_contact_info,omitempty"`
	// Details of the company representative
	CompanyRepresentative *legal.CompanyRepresentative `protobuf:"bytes,6,opt,name=companyRepresentative,proto3" json:"companyRepresentative,omitempty"`
	// Industry classification of the company
	IndustryClassification *IndustryClassification `protobuf:"bytes,7,opt,name=industryClassification,proto3" json:"industryClassification,omitempty"`
	// Stock exchange where the company is listed
	ListedExchange string `protobuf:"bytes,8,opt,name=listed_exchange,json=listedExchange,proto3" json:"listed_exchange,omitempty"`
	// Listing reference number for the stock exchange
	ListingReference string `protobuf:"bytes,9,opt,name=listing_reference,json=listingReference,proto3" json:"listing_reference,omitempty"`
	// Country code representing the country of incorporation
	CountryOfIncorporation string `protobuf:"bytes,10,opt,name=countryOfIncorporation,proto3" json:"countryOfIncorporation,omitempty"`
	// Legal form of the company (e.g., Proprietorship, Corporation)
	FormOfIncorporation legal.LegalForm `protobuf:"varint,11,opt,name=formOfIncorporation,proto3,enum=api.legal.LegalForm" json:"formOfIncorporation,omitempty"`
	// The company's registered address
	RegisteredAddress *location.Address `protobuf:"bytes,12,opt,name=registeredAddress,proto3" json:"registeredAddress,omitempty"`
	// The company's business address
	BusinessAddress *location.Address `protobuf:"bytes,13,opt,name=businessAddress,proto3" json:"businessAddress,omitempty"`
	// The company's head office address
	HeadOfficeAddress *location.Address `protobuf:"bytes,14,opt,name=headOfficeAddress,proto3" json:"headOfficeAddress,omitempty"`
	// List of individuals connected to the company, such as directors or stakeholders
	ConnectedIndividuals []*legal.ConnectedIndividual `protobuf:"bytes,15,rep,name=connectedIndividuals,proto3" json:"connectedIndividuals,omitempty"`
	// List of companies connected to the company
	ConnectedCompanies []*legal.ConnectedCompany `protobuf:"bytes,16,rep,name=connectedCompanies,proto3" json:"connectedCompanies,omitempty"`
	ClientType         []client.ClientType       `protobuf:"varint,17,rep,packed,name=clientType,proto3,enum=api.client.ClientType" json:"clientType,omitempty"`
}

func (x *Company) Reset() {
	*x = Company{}
	if protoimpl.UnsafeEnabled {
		mi := &file_api_proto_legal_company_company_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Company) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Company) ProtoMessage() {}

func (x *Company) ProtoReflect() protoreflect.Message {
	mi := &file_api_proto_legal_company_company_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Company.ProtoReflect.Descriptor instead.
func (*Company) Descriptor() ([]byte, []int) {
	return file_api_proto_legal_company_company_proto_rawDescGZIP(), []int{0}
}

func (x *Company) GetRegisteredName() string {
	if x != nil {
		return x.RegisteredName
	}
	return ""
}

func (x *Company) GetTaxReferenceNumber() string {
	if x != nil {
		return x.TaxReferenceNumber
	}
	return ""
}

func (x *Company) GetRegistrationNumber() string {
	if x != nil {
		return x.RegistrationNumber
	}
	return ""
}

func (x *Company) GetVatRegistrationNumber() string {
	if x != nil {
		return x.VatRegistrationNumber
	}
	return ""
}

func (x *Company) GetPublicContactInfo() *legal.CompanyPublicContactInfo {
	if x != nil {
		return x.PublicContactInfo
	}
	return nil
}

func (x *Company) GetCompanyRepresentative() *legal.CompanyRepresentative {
	if x != nil {
		return x.CompanyRepresentative
	}
	return nil
}

func (x *Company) GetIndustryClassification() *IndustryClassification {
	if x != nil {
		return x.IndustryClassification
	}
	return nil
}

func (x *Company) GetListedExchange() string {
	if x != nil {
		return x.ListedExchange
	}
	return ""
}

func (x *Company) GetListingReference() string {
	if x != nil {
		return x.ListingReference
	}
	return ""
}

func (x *Company) GetCountryOfIncorporation() string {
	if x != nil {
		return x.CountryOfIncorporation
	}
	return ""
}

func (x *Company) GetFormOfIncorporation() legal.LegalForm {
	if x != nil {
		return x.FormOfIncorporation
	}
	return legal.LegalForm(0)
}

func (x *Company) GetRegisteredAddress() *location.Address {
	if x != nil {
		return x.RegisteredAddress
	}
	return nil
}

func (x *Company) GetBusinessAddress() *location.Address {
	if x != nil {
		return x.BusinessAddress
	}
	return nil
}

func (x *Company) GetHeadOfficeAddress() *location.Address {
	if x != nil {
		return x.HeadOfficeAddress
	}
	return nil
}

func (x *Company) GetConnectedIndividuals() []*legal.ConnectedIndividual {
	if x != nil {
		return x.ConnectedIndividuals
	}
	return nil
}

func (x *Company) GetConnectedCompanies() []*legal.ConnectedCompany {
	if x != nil {
		return x.ConnectedCompanies
	}
	return nil
}

func (x *Company) GetClientType() []client.ClientType {
	if x != nil {
		return x.ClientType
	}
	return nil
}

var File_api_proto_legal_company_company_proto protoreflect.FileDescriptor

var file_api_proto_legal_company_company_proto_rawDesc = []byte{
	0x0a, 0x25, 0x61, 0x70, 0x69, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x6c, 0x65, 0x67, 0x61,
	0x6c, 0x2f, 0x63, 0x6f, 0x6d, 0x70, 0x61, 0x6e, 0x79, 0x2f, 0x63, 0x6f, 0x6d, 0x70, 0x61, 0x6e,
	0x79, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x11, 0x61, 0x70, 0x69, 0x2e, 0x6c, 0x65, 0x67,
	0x61, 0x6c, 0x2e, 0x63, 0x6f, 0x6d, 0x70, 0x61, 0x6e, 0x79, 0x1a, 0x1f, 0x67, 0x6f, 0x6f, 0x67,
	0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f, 0x74, 0x69, 0x6d, 0x65,
	0x73, 0x74, 0x61, 0x6d, 0x70, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x20, 0x61, 0x70, 0x69,
	0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x6c, 0x6f, 0x63, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x2f,
	0x61, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x2e, 0x61,
	0x70, 0x69, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x6c, 0x65, 0x67, 0x61, 0x6c, 0x2f, 0x63,
	0x6f, 0x6d, 0x70, 0x61, 0x6e, 0x79, 0x50, 0x75, 0x62, 0x6c, 0x69, 0x63, 0x43, 0x6f, 0x6e, 0x74,
	0x61, 0x63, 0x74, 0x49, 0x6e, 0x66, 0x6f, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x2b, 0x61,
	0x70, 0x69, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x6c, 0x65, 0x67, 0x61, 0x6c, 0x2f, 0x63,
	0x6f, 0x6d, 0x70, 0x61, 0x6e, 0x79, 0x52, 0x65, 0x70, 0x72, 0x65, 0x73, 0x65, 0x6e, 0x74, 0x61,
	0x74, 0x69, 0x76, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x26, 0x61, 0x70, 0x69, 0x2f,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x6c, 0x65, 0x67, 0x61, 0x6c, 0x2f, 0x63, 0x6f, 0x6e, 0x6e,
	0x65, 0x63, 0x74, 0x65, 0x64, 0x43, 0x6f, 0x6d, 0x70, 0x61, 0x6e, 0x79, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x1a, 0x29, 0x61, 0x70, 0x69, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x6c, 0x65,
	0x67, 0x61, 0x6c, 0x2f, 0x63, 0x6f, 0x6e, 0x6e, 0x65, 0x63, 0x74, 0x65, 0x64, 0x49, 0x6e, 0x64,
	0x69, 0x76, 0x69, 0x64, 0x75, 0x61, 0x6c, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x34, 0x61,
	0x70, 0x69, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x6c, 0x65, 0x67, 0x61, 0x6c, 0x2f, 0x63,
	0x6f, 0x6d, 0x70, 0x61, 0x6e, 0x79, 0x2f, 0x69, 0x6e, 0x64, 0x75, 0x73, 0x74, 0x72, 0x79, 0x43,
	0x6c, 0x61, 0x73, 0x73, 0x69, 0x66, 0x69, 0x63, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x1a, 0x1f, 0x61, 0x70, 0x69, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x6c,
	0x65, 0x67, 0x61, 0x6c, 0x2f, 0x6c, 0x65, 0x67, 0x61, 0x6c, 0x66, 0x6f, 0x72, 0x6d, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x21, 0x61, 0x70, 0x69, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f,
	0x63, 0x6c, 0x69, 0x65, 0x6e, 0x74, 0x2f, 0x63, 0x6c, 0x69, 0x65, 0x6e, 0x74, 0x54, 0x79, 0x70,
	0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0xd1, 0x08, 0x0a, 0x07, 0x43, 0x6f, 0x6d, 0x70,
	0x61, 0x6e, 0x79, 0x12, 0x26, 0x0a, 0x0e, 0x72, 0x65, 0x67, 0x69, 0x73, 0x74, 0x65, 0x72, 0x65,
	0x64, 0x4e, 0x61, 0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0e, 0x72, 0x65, 0x67,
	0x69, 0x73, 0x74, 0x65, 0x72, 0x65, 0x64, 0x4e, 0x61, 0x6d, 0x65, 0x12, 0x2e, 0x0a, 0x12, 0x74,
	0x61, 0x78, 0x52, 0x65, 0x66, 0x65, 0x72, 0x65, 0x6e, 0x63, 0x65, 0x4e, 0x75, 0x6d, 0x62, 0x65,
	0x72, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x12, 0x74, 0x61, 0x78, 0x52, 0x65, 0x66, 0x65,
	0x72, 0x65, 0x6e, 0x63, 0x65, 0x4e, 0x75, 0x6d, 0x62, 0x65, 0x72, 0x12, 0x2e, 0x0a, 0x12, 0x72,
	0x65, 0x67, 0x69, 0x73, 0x74, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x4e, 0x75, 0x6d, 0x62, 0x65,
	0x72, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x12, 0x72, 0x65, 0x67, 0x69, 0x73, 0x74, 0x72,
	0x61, 0x74, 0x69, 0x6f, 0x6e, 0x4e, 0x75, 0x6d, 0x62, 0x65, 0x72, 0x12, 0x34, 0x0a, 0x15, 0x76,
	0x61, 0x74, 0x52, 0x65, 0x67, 0x69, 0x73, 0x74, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x4e, 0x75,
	0x6d, 0x62, 0x65, 0x72, 0x18, 0x04, 0x20, 0x01, 0x28, 0x09, 0x52, 0x15, 0x76, 0x61, 0x74, 0x52,
	0x65, 0x67, 0x69, 0x73, 0x74, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x4e, 0x75, 0x6d, 0x62, 0x65,
	0x72, 0x12, 0x53, 0x0a, 0x13, 0x70, 0x75, 0x62, 0x6c, 0x69, 0x63, 0x5f, 0x63, 0x6f, 0x6e, 0x74,
	0x61, 0x63, 0x74, 0x5f, 0x69, 0x6e, 0x66, 0x6f, 0x18, 0x05, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x23,
	0x2e, 0x61, 0x70, 0x69, 0x2e, 0x6c, 0x65, 0x67, 0x61, 0x6c, 0x2e, 0x43, 0x6f, 0x6d, 0x70, 0x61,
	0x6e, 0x79, 0x50, 0x75, 0x62, 0x6c, 0x69, 0x63, 0x43, 0x6f, 0x6e, 0x74, 0x61, 0x63, 0x74, 0x49,
	0x6e, 0x66, 0x6f, 0x52, 0x11, 0x70, 0x75, 0x62, 0x6c, 0x69, 0x63, 0x43, 0x6f, 0x6e, 0x74, 0x61,
	0x63, 0x74, 0x49, 0x6e, 0x66, 0x6f, 0x12, 0x56, 0x0a, 0x15, 0x63, 0x6f, 0x6d, 0x70, 0x61, 0x6e,
	0x79, 0x52, 0x65, 0x70, 0x72, 0x65, 0x73, 0x65, 0x6e, 0x74, 0x61, 0x74, 0x69, 0x76, 0x65, 0x18,
	0x06, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x20, 0x2e, 0x61, 0x70, 0x69, 0x2e, 0x6c, 0x65, 0x67, 0x61,
	0x6c, 0x2e, 0x43, 0x6f, 0x6d, 0x70, 0x61, 0x6e, 0x79, 0x52, 0x65, 0x70, 0x72, 0x65, 0x73, 0x65,
	0x6e, 0x74, 0x61, 0x74, 0x69, 0x76, 0x65, 0x52, 0x15, 0x63, 0x6f, 0x6d, 0x70, 0x61, 0x6e, 0x79,
	0x52, 0x65, 0x70, 0x72, 0x65, 0x73, 0x65, 0x6e, 0x74, 0x61, 0x74, 0x69, 0x76, 0x65, 0x12, 0x61,
	0x0a, 0x16, 0x69, 0x6e, 0x64, 0x75, 0x73, 0x74, 0x72, 0x79, 0x43, 0x6c, 0x61, 0x73, 0x73, 0x69,
	0x66, 0x69, 0x63, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x07, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x29,
	0x2e, 0x61, 0x70, 0x69, 0x2e, 0x6c, 0x65, 0x67, 0x61, 0x6c, 0x2e, 0x63, 0x6f, 0x6d, 0x70, 0x61,
	0x6e, 0x79, 0x2e, 0x49, 0x6e, 0x64, 0x75, 0x73, 0x74, 0x72, 0x79, 0x43, 0x6c, 0x61, 0x73, 0x73,
	0x69, 0x66, 0x69, 0x63, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x52, 0x16, 0x69, 0x6e, 0x64, 0x75, 0x73,
	0x74, 0x72, 0x79, 0x43, 0x6c, 0x61, 0x73, 0x73, 0x69, 0x66, 0x69, 0x63, 0x61, 0x74, 0x69, 0x6f,
	0x6e, 0x12, 0x27, 0x0a, 0x0f, 0x6c, 0x69, 0x73, 0x74, 0x65, 0x64, 0x5f, 0x65, 0x78, 0x63, 0x68,
	0x61, 0x6e, 0x67, 0x65, 0x18, 0x08, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0e, 0x6c, 0x69, 0x73, 0x74,
	0x65, 0x64, 0x45, 0x78, 0x63, 0x68, 0x61, 0x6e, 0x67, 0x65, 0x12, 0x2b, 0x0a, 0x11, 0x6c, 0x69,
	0x73, 0x74, 0x69, 0x6e, 0x67, 0x5f, 0x72, 0x65, 0x66, 0x65, 0x72, 0x65, 0x6e, 0x63, 0x65, 0x18,
	0x09, 0x20, 0x01, 0x28, 0x09, 0x52, 0x10, 0x6c, 0x69, 0x73, 0x74, 0x69, 0x6e, 0x67, 0x52, 0x65,
	0x66, 0x65, 0x72, 0x65, 0x6e, 0x63, 0x65, 0x12, 0x36, 0x0a, 0x16, 0x63, 0x6f, 0x75, 0x6e, 0x74,
	0x72, 0x79, 0x4f, 0x66, 0x49, 0x6e, 0x63, 0x6f, 0x72, 0x70, 0x6f, 0x72, 0x61, 0x74, 0x69, 0x6f,
	0x6e, 0x18, 0x0a, 0x20, 0x01, 0x28, 0x09, 0x52, 0x16, 0x63, 0x6f, 0x75, 0x6e, 0x74, 0x72, 0x79,
	0x4f, 0x66, 0x49, 0x6e, 0x63, 0x6f, 0x72, 0x70, 0x6f, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x12,
	0x46, 0x0a, 0x13, 0x66, 0x6f, 0x72, 0x6d, 0x4f, 0x66, 0x49, 0x6e, 0x63, 0x6f, 0x72, 0x70, 0x6f,
	0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x0b, 0x20, 0x01, 0x28, 0x0e, 0x32, 0x14, 0x2e, 0x61,
	0x70, 0x69, 0x2e, 0x6c, 0x65, 0x67, 0x61, 0x6c, 0x2e, 0x4c, 0x65, 0x67, 0x61, 0x6c, 0x46, 0x6f,
	0x72, 0x6d, 0x52, 0x13, 0x66, 0x6f, 0x72, 0x6d, 0x4f, 0x66, 0x49, 0x6e, 0x63, 0x6f, 0x72, 0x70,
	0x6f, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x12, 0x43, 0x0a, 0x11, 0x72, 0x65, 0x67, 0x69, 0x73,
	0x74, 0x65, 0x72, 0x65, 0x64, 0x41, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73, 0x18, 0x0c, 0x20, 0x01,
	0x28, 0x0b, 0x32, 0x15, 0x2e, 0x61, 0x70, 0x69, 0x2e, 0x6c, 0x6f, 0x63, 0x61, 0x74, 0x69, 0x6f,
	0x6e, 0x2e, 0x41, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73, 0x52, 0x11, 0x72, 0x65, 0x67, 0x69, 0x73,
	0x74, 0x65, 0x72, 0x65, 0x64, 0x41, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73, 0x12, 0x3f, 0x0a, 0x0f,
	0x62, 0x75, 0x73, 0x69, 0x6e, 0x65, 0x73, 0x73, 0x41, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73, 0x18,
	0x0d, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x15, 0x2e, 0x61, 0x70, 0x69, 0x2e, 0x6c, 0x6f, 0x63, 0x61,
	0x74, 0x69, 0x6f, 0x6e, 0x2e, 0x41, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73, 0x52, 0x0f, 0x62, 0x75,
	0x73, 0x69, 0x6e, 0x65, 0x73, 0x73, 0x41, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73, 0x12, 0x43, 0x0a,
	0x11, 0x68, 0x65, 0x61, 0x64, 0x4f, 0x66, 0x66, 0x69, 0x63, 0x65, 0x41, 0x64, 0x64, 0x72, 0x65,
	0x73, 0x73, 0x18, 0x0e, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x15, 0x2e, 0x61, 0x70, 0x69, 0x2e, 0x6c,
	0x6f, 0x63, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x2e, 0x41, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73, 0x52,
	0x11, 0x68, 0x65, 0x61, 0x64, 0x4f, 0x66, 0x66, 0x69, 0x63, 0x65, 0x41, 0x64, 0x64, 0x72, 0x65,
	0x73, 0x73, 0x12, 0x52, 0x0a, 0x14, 0x63, 0x6f, 0x6e, 0x6e, 0x65, 0x63, 0x74, 0x65, 0x64, 0x49,
	0x6e, 0x64, 0x69, 0x76, 0x69, 0x64, 0x75, 0x61, 0x6c, 0x73, 0x18, 0x0f, 0x20, 0x03, 0x28, 0x0b,
	0x32, 0x1e, 0x2e, 0x61, 0x70, 0x69, 0x2e, 0x6c, 0x65, 0x67, 0x61, 0x6c, 0x2e, 0x43, 0x6f, 0x6e,
	0x6e, 0x65, 0x63, 0x74, 0x65, 0x64, 0x49, 0x6e, 0x64, 0x69, 0x76, 0x69, 0x64, 0x75, 0x61, 0x6c,
	0x52, 0x14, 0x63, 0x6f, 0x6e, 0x6e, 0x65, 0x63, 0x74, 0x65, 0x64, 0x49, 0x6e, 0x64, 0x69, 0x76,
	0x69, 0x64, 0x75, 0x61, 0x6c, 0x73, 0x12, 0x4b, 0x0a, 0x12, 0x63, 0x6f, 0x6e, 0x6e, 0x65, 0x63,
	0x74, 0x65, 0x64, 0x43, 0x6f, 0x6d, 0x70, 0x61, 0x6e, 0x69, 0x65, 0x73, 0x18, 0x10, 0x20, 0x03,
	0x28, 0x0b, 0x32, 0x1b, 0x2e, 0x61, 0x70, 0x69, 0x2e, 0x6c, 0x65, 0x67, 0x61, 0x6c, 0x2e, 0x43,
	0x6f, 0x6e, 0x6e, 0x65, 0x63, 0x74, 0x65, 0x64, 0x43, 0x6f, 0x6d, 0x70, 0x61, 0x6e, 0x79, 0x52,
	0x12, 0x63, 0x6f, 0x6e, 0x6e, 0x65, 0x63, 0x74, 0x65, 0x64, 0x43, 0x6f, 0x6d, 0x70, 0x61, 0x6e,
	0x69, 0x65, 0x73, 0x12, 0x36, 0x0a, 0x0a, 0x63, 0x6c, 0x69, 0x65, 0x6e, 0x74, 0x54, 0x79, 0x70,
	0x65, 0x18, 0x11, 0x20, 0x03, 0x28, 0x0e, 0x32, 0x16, 0x2e, 0x61, 0x70, 0x69, 0x2e, 0x63, 0x6c,
	0x69, 0x65, 0x6e, 0x74, 0x2e, 0x43, 0x6c, 0x69, 0x65, 0x6e, 0x74, 0x54, 0x79, 0x70, 0x65, 0x52,
	0x0a, 0x63, 0x6c, 0x69, 0x65, 0x6e, 0x74, 0x54, 0x79, 0x70, 0x65, 0x42, 0x2b, 0x5a, 0x29, 0x67,
	0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x6d, 0x65, 0x73, 0x68, 0x74, 0x72,
	0x61, 0x64, 0x65, 0x2f, 0x61, 0x70, 0x69, 0x2f, 0x67, 0x6f, 0x2f, 0x6c, 0x65, 0x67, 0x61, 0x6c,
	0x2f, 0x63, 0x6f, 0x6d, 0x70, 0x61, 0x6e, 0x79, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_api_proto_legal_company_company_proto_rawDescOnce sync.Once
	file_api_proto_legal_company_company_proto_rawDescData = file_api_proto_legal_company_company_proto_rawDesc
)

func file_api_proto_legal_company_company_proto_rawDescGZIP() []byte {
	file_api_proto_legal_company_company_proto_rawDescOnce.Do(func() {
		file_api_proto_legal_company_company_proto_rawDescData = protoimpl.X.CompressGZIP(file_api_proto_legal_company_company_proto_rawDescData)
	})
	return file_api_proto_legal_company_company_proto_rawDescData
}

var file_api_proto_legal_company_company_proto_msgTypes = make([]protoimpl.MessageInfo, 1)
var file_api_proto_legal_company_company_proto_goTypes = []interface{}{
	(*Company)(nil),                        // 0: api.legal.company.Company
	(*legal.CompanyPublicContactInfo)(nil), // 1: api.legal.CompanyPublicContactInfo
	(*legal.CompanyRepresentative)(nil),    // 2: api.legal.CompanyRepresentative
	(*IndustryClassification)(nil),         // 3: api.legal.company.IndustryClassification
	(legal.LegalForm)(0),                   // 4: api.legal.LegalForm
	(*location.Address)(nil),               // 5: api.location.Address
	(*legal.ConnectedIndividual)(nil),      // 6: api.legal.ConnectedIndividual
	(*legal.ConnectedCompany)(nil),         // 7: api.legal.ConnectedCompany
	(client.ClientType)(0),                 // 8: api.client.ClientType
}
var file_api_proto_legal_company_company_proto_depIdxs = []int32{
	1,  // 0: api.legal.company.Company.public_contact_info:type_name -> api.legal.CompanyPublicContactInfo
	2,  // 1: api.legal.company.Company.companyRepresentative:type_name -> api.legal.CompanyRepresentative
	3,  // 2: api.legal.company.Company.industryClassification:type_name -> api.legal.company.IndustryClassification
	4,  // 3: api.legal.company.Company.formOfIncorporation:type_name -> api.legal.LegalForm
	5,  // 4: api.legal.company.Company.registeredAddress:type_name -> api.location.Address
	5,  // 5: api.legal.company.Company.businessAddress:type_name -> api.location.Address
	5,  // 6: api.legal.company.Company.headOfficeAddress:type_name -> api.location.Address
	6,  // 7: api.legal.company.Company.connectedIndividuals:type_name -> api.legal.ConnectedIndividual
	7,  // 8: api.legal.company.Company.connectedCompanies:type_name -> api.legal.ConnectedCompany
	8,  // 9: api.legal.company.Company.clientType:type_name -> api.client.ClientType
	10, // [10:10] is the sub-list for method output_type
	10, // [10:10] is the sub-list for method input_type
	10, // [10:10] is the sub-list for extension type_name
	10, // [10:10] is the sub-list for extension extendee
	0,  // [0:10] is the sub-list for field type_name
}

func init() { file_api_proto_legal_company_company_proto_init() }
func file_api_proto_legal_company_company_proto_init() {
	if File_api_proto_legal_company_company_proto != nil {
		return
	}
	file_api_proto_legal_company_industryClassification_proto_init()
	if !protoimpl.UnsafeEnabled {
		file_api_proto_legal_company_company_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Company); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_api_proto_legal_company_company_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   1,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_api_proto_legal_company_company_proto_goTypes,
		DependencyIndexes: file_api_proto_legal_company_company_proto_depIdxs,
		MessageInfos:      file_api_proto_legal_company_company_proto_msgTypes,
	}.Build()
	File_api_proto_legal_company_company_proto = out.File
	file_api_proto_legal_company_company_proto_rawDesc = nil
	file_api_proto_legal_company_company_proto_goTypes = nil
	file_api_proto_legal_company_company_proto_depIdxs = nil
}

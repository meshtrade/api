// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.33.0
// 	protoc        v5.28.0
// source: api/proto/legal/connectedCompany.proto

package legal

import (
	location "github.com/meshtrade/api/go/location"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type ConnectedCompany struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Unique identifier for the connected company
	Id string `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	// The business name of the connected company
	BusinessName string `protobuf:"bytes,2,opt,name=businessName,proto3" json:"businessName,omitempty"`
	// Legal form of the connected company (e.g., Corporation, Partnership)
	LegalForm LegalForm `protobuf:"varint,3,opt,name=legalForm,proto3,enum=api.legal.LegalForm" json:"legalForm,omitempty"`
	// Registered name of the connected company
	RegisteredName string `protobuf:"bytes,4,opt,name=registeredName,proto3" json:"registeredName,omitempty"`
	// Registration number of the connected company
	RegistrationNumber string `protobuf:"bytes,5,opt,name=registrationNumber,proto3" json:"registrationNumber,omitempty"`
	// Registered address of the connected company
	RegisteredAddress *location.Address `protobuf:"bytes,6,opt,name=registeredAddress,proto3" json:"registeredAddress,omitempty"`
	// Business address of the connected company
	BusinessAddress *location.Address `protobuf:"bytes,7,opt,name=businessAddress,proto3" json:"businessAddress,omitempty"`
	// Head office address of the connected company
	HeadOfficeAddress *location.Address `protobuf:"bytes,8,opt,name=headOfficeAddress,proto3" json:"headOfficeAddress,omitempty"`
	// Representative information for the connected company
	CompanyRepresentative *CompanyRepresentative `protobuf:"bytes,9,opt,name=companyRepresentative,proto3" json:"companyRepresentative,omitempty"`
}

func (x *ConnectedCompany) Reset() {
	*x = ConnectedCompany{}
	if protoimpl.UnsafeEnabled {
		mi := &file_api_proto_legal_connectedCompany_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ConnectedCompany) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ConnectedCompany) ProtoMessage() {}

func (x *ConnectedCompany) ProtoReflect() protoreflect.Message {
	mi := &file_api_proto_legal_connectedCompany_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ConnectedCompany.ProtoReflect.Descriptor instead.
func (*ConnectedCompany) Descriptor() ([]byte, []int) {
	return file_api_proto_legal_connectedCompany_proto_rawDescGZIP(), []int{0}
}

func (x *ConnectedCompany) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *ConnectedCompany) GetBusinessName() string {
	if x != nil {
		return x.BusinessName
	}
	return ""
}

func (x *ConnectedCompany) GetLegalForm() LegalForm {
	if x != nil {
		return x.LegalForm
	}
	return LegalForm_UNDEFINED_LEGAL_FORM
}

func (x *ConnectedCompany) GetRegisteredName() string {
	if x != nil {
		return x.RegisteredName
	}
	return ""
}

func (x *ConnectedCompany) GetRegistrationNumber() string {
	if x != nil {
		return x.RegistrationNumber
	}
	return ""
}

func (x *ConnectedCompany) GetRegisteredAddress() *location.Address {
	if x != nil {
		return x.RegisteredAddress
	}
	return nil
}

func (x *ConnectedCompany) GetBusinessAddress() *location.Address {
	if x != nil {
		return x.BusinessAddress
	}
	return nil
}

func (x *ConnectedCompany) GetHeadOfficeAddress() *location.Address {
	if x != nil {
		return x.HeadOfficeAddress
	}
	return nil
}

func (x *ConnectedCompany) GetCompanyRepresentative() *CompanyRepresentative {
	if x != nil {
		return x.CompanyRepresentative
	}
	return nil
}

var File_api_proto_legal_connectedCompany_proto protoreflect.FileDescriptor

var file_api_proto_legal_connectedCompany_proto_rawDesc = []byte{
	0x0a, 0x26, 0x61, 0x70, 0x69, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x6c, 0x65, 0x67, 0x61,
	0x6c, 0x2f, 0x63, 0x6f, 0x6e, 0x6e, 0x65, 0x63, 0x74, 0x65, 0x64, 0x43, 0x6f, 0x6d, 0x70, 0x61,
	0x6e, 0x79, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x09, 0x61, 0x70, 0x69, 0x2e, 0x6c, 0x65,
	0x67, 0x61, 0x6c, 0x1a, 0x20, 0x61, 0x70, 0x69, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x6c,
	0x6f, 0x63, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x2f, 0x61, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73, 0x2e,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x2b, 0x61, 0x70, 0x69, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x2f, 0x6c, 0x65, 0x67, 0x61, 0x6c, 0x2f, 0x63, 0x6f, 0x6d, 0x70, 0x61, 0x6e, 0x79, 0x52, 0x65,
	0x70, 0x72, 0x65, 0x73, 0x65, 0x6e, 0x74, 0x61, 0x74, 0x69, 0x76, 0x65, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x1a, 0x1f, 0x61, 0x70, 0x69, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x6c, 0x65,
	0x67, 0x61, 0x6c, 0x2f, 0x6c, 0x65, 0x67, 0x61, 0x6c, 0x66, 0x6f, 0x72, 0x6d, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x22, 0xf5, 0x03, 0x0a, 0x10, 0x43, 0x6f, 0x6e, 0x6e, 0x65, 0x63, 0x74, 0x65,
	0x64, 0x43, 0x6f, 0x6d, 0x70, 0x61, 0x6e, 0x79, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x02, 0x69, 0x64, 0x12, 0x22, 0x0a, 0x0c, 0x62, 0x75, 0x73, 0x69,
	0x6e, 0x65, 0x73, 0x73, 0x4e, 0x61, 0x6d, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0c,
	0x62, 0x75, 0x73, 0x69, 0x6e, 0x65, 0x73, 0x73, 0x4e, 0x61, 0x6d, 0x65, 0x12, 0x32, 0x0a, 0x09,
	0x6c, 0x65, 0x67, 0x61, 0x6c, 0x46, 0x6f, 0x72, 0x6d, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0e, 0x32,
	0x14, 0x2e, 0x61, 0x70, 0x69, 0x2e, 0x6c, 0x65, 0x67, 0x61, 0x6c, 0x2e, 0x4c, 0x65, 0x67, 0x61,
	0x6c, 0x46, 0x6f, 0x72, 0x6d, 0x52, 0x09, 0x6c, 0x65, 0x67, 0x61, 0x6c, 0x46, 0x6f, 0x72, 0x6d,
	0x12, 0x26, 0x0a, 0x0e, 0x72, 0x65, 0x67, 0x69, 0x73, 0x74, 0x65, 0x72, 0x65, 0x64, 0x4e, 0x61,
	0x6d, 0x65, 0x18, 0x04, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0e, 0x72, 0x65, 0x67, 0x69, 0x73, 0x74,
	0x65, 0x72, 0x65, 0x64, 0x4e, 0x61, 0x6d, 0x65, 0x12, 0x2e, 0x0a, 0x12, 0x72, 0x65, 0x67, 0x69,
	0x73, 0x74, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x4e, 0x75, 0x6d, 0x62, 0x65, 0x72, 0x18, 0x05,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x12, 0x72, 0x65, 0x67, 0x69, 0x73, 0x74, 0x72, 0x61, 0x74, 0x69,
	0x6f, 0x6e, 0x4e, 0x75, 0x6d, 0x62, 0x65, 0x72, 0x12, 0x43, 0x0a, 0x11, 0x72, 0x65, 0x67, 0x69,
	0x73, 0x74, 0x65, 0x72, 0x65, 0x64, 0x41, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73, 0x18, 0x06, 0x20,
	0x01, 0x28, 0x0b, 0x32, 0x15, 0x2e, 0x61, 0x70, 0x69, 0x2e, 0x6c, 0x6f, 0x63, 0x61, 0x74, 0x69,
	0x6f, 0x6e, 0x2e, 0x41, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73, 0x52, 0x11, 0x72, 0x65, 0x67, 0x69,
	0x73, 0x74, 0x65, 0x72, 0x65, 0x64, 0x41, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73, 0x12, 0x3f, 0x0a,
	0x0f, 0x62, 0x75, 0x73, 0x69, 0x6e, 0x65, 0x73, 0x73, 0x41, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73,
	0x18, 0x07, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x15, 0x2e, 0x61, 0x70, 0x69, 0x2e, 0x6c, 0x6f, 0x63,
	0x61, 0x74, 0x69, 0x6f, 0x6e, 0x2e, 0x41, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73, 0x52, 0x0f, 0x62,
	0x75, 0x73, 0x69, 0x6e, 0x65, 0x73, 0x73, 0x41, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73, 0x12, 0x43,
	0x0a, 0x11, 0x68, 0x65, 0x61, 0x64, 0x4f, 0x66, 0x66, 0x69, 0x63, 0x65, 0x41, 0x64, 0x64, 0x72,
	0x65, 0x73, 0x73, 0x18, 0x08, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x15, 0x2e, 0x61, 0x70, 0x69, 0x2e,
	0x6c, 0x6f, 0x63, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x2e, 0x41, 0x64, 0x64, 0x72, 0x65, 0x73, 0x73,
	0x52, 0x11, 0x68, 0x65, 0x61, 0x64, 0x4f, 0x66, 0x66, 0x69, 0x63, 0x65, 0x41, 0x64, 0x64, 0x72,
	0x65, 0x73, 0x73, 0x12, 0x56, 0x0a, 0x15, 0x63, 0x6f, 0x6d, 0x70, 0x61, 0x6e, 0x79, 0x52, 0x65,
	0x70, 0x72, 0x65, 0x73, 0x65, 0x6e, 0x74, 0x61, 0x74, 0x69, 0x76, 0x65, 0x18, 0x09, 0x20, 0x01,
	0x28, 0x0b, 0x32, 0x20, 0x2e, 0x61, 0x70, 0x69, 0x2e, 0x6c, 0x65, 0x67, 0x61, 0x6c, 0x2e, 0x43,
	0x6f, 0x6d, 0x70, 0x61, 0x6e, 0x79, 0x52, 0x65, 0x70, 0x72, 0x65, 0x73, 0x65, 0x6e, 0x74, 0x61,
	0x74, 0x69, 0x76, 0x65, 0x52, 0x15, 0x63, 0x6f, 0x6d, 0x70, 0x61, 0x6e, 0x79, 0x52, 0x65, 0x70,
	0x72, 0x65, 0x73, 0x65, 0x6e, 0x74, 0x61, 0x74, 0x69, 0x76, 0x65, 0x42, 0x23, 0x5a, 0x21, 0x67,
	0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x6d, 0x65, 0x73, 0x68, 0x74, 0x72,
	0x61, 0x64, 0x65, 0x2f, 0x61, 0x70, 0x69, 0x2f, 0x67, 0x6f, 0x2f, 0x6c, 0x65, 0x67, 0x61, 0x6c,
	0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_api_proto_legal_connectedCompany_proto_rawDescOnce sync.Once
	file_api_proto_legal_connectedCompany_proto_rawDescData = file_api_proto_legal_connectedCompany_proto_rawDesc
)

func file_api_proto_legal_connectedCompany_proto_rawDescGZIP() []byte {
	file_api_proto_legal_connectedCompany_proto_rawDescOnce.Do(func() {
		file_api_proto_legal_connectedCompany_proto_rawDescData = protoimpl.X.CompressGZIP(file_api_proto_legal_connectedCompany_proto_rawDescData)
	})
	return file_api_proto_legal_connectedCompany_proto_rawDescData
}

var file_api_proto_legal_connectedCompany_proto_msgTypes = make([]protoimpl.MessageInfo, 1)
var file_api_proto_legal_connectedCompany_proto_goTypes = []interface{}{
	(*ConnectedCompany)(nil),      // 0: api.legal.ConnectedCompany
	(LegalForm)(0),                // 1: api.legal.LegalForm
	(*location.Address)(nil),      // 2: api.location.Address
	(*CompanyRepresentative)(nil), // 3: api.legal.CompanyRepresentative
}
var file_api_proto_legal_connectedCompany_proto_depIdxs = []int32{
	1, // 0: api.legal.ConnectedCompany.legalForm:type_name -> api.legal.LegalForm
	2, // 1: api.legal.ConnectedCompany.registeredAddress:type_name -> api.location.Address
	2, // 2: api.legal.ConnectedCompany.businessAddress:type_name -> api.location.Address
	2, // 3: api.legal.ConnectedCompany.headOfficeAddress:type_name -> api.location.Address
	3, // 4: api.legal.ConnectedCompany.companyRepresentative:type_name -> api.legal.CompanyRepresentative
	5, // [5:5] is the sub-list for method output_type
	5, // [5:5] is the sub-list for method input_type
	5, // [5:5] is the sub-list for extension type_name
	5, // [5:5] is the sub-list for extension extendee
	0, // [0:5] is the sub-list for field type_name
}

func init() { file_api_proto_legal_connectedCompany_proto_init() }
func file_api_proto_legal_connectedCompany_proto_init() {
	if File_api_proto_legal_connectedCompany_proto != nil {
		return
	}
	file_api_proto_legal_companyRepresentative_proto_init()
	file_api_proto_legal_legalform_proto_init()
	if !protoimpl.UnsafeEnabled {
		file_api_proto_legal_connectedCompany_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ConnectedCompany); i {
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
			RawDescriptor: file_api_proto_legal_connectedCompany_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   1,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_api_proto_legal_connectedCompany_proto_goTypes,
		DependencyIndexes: file_api_proto_legal_connectedCompany_proto_depIdxs,
		MessageInfos:      file_api_proto_legal_connectedCompany_proto_msgTypes,
	}.Build()
	File_api_proto_legal_connectedCompany_proto = out.File
	file_api_proto_legal_connectedCompany_proto_rawDesc = nil
	file_api_proto_legal_connectedCompany_proto_goTypes = nil
	file_api_proto_legal_connectedCompany_proto_depIdxs = nil
}

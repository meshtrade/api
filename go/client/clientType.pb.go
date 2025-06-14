// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.33.0
// 	protoc        v5.28.0
// source: api/proto/client/clientType.proto

package client

import (
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

type ClientType int32

const (
	ClientType_UNDEFINED_COMPANY_CLIENT_TYPE ClientType = 0
	ClientType_ISSUER_COMPANY_CLIENT_TYPE    ClientType = 1
	ClientType_INVESTOR_COMPANY_CLIENT_TYPE  ClientType = 2
	ClientType_MANAGING_COMPANY_CLIENT_TYPE  ClientType = 3
)

// Enum value maps for ClientType.
var (
	ClientType_name = map[int32]string{
		0: "UNDEFINED_COMPANY_CLIENT_TYPE",
		1: "ISSUER_COMPANY_CLIENT_TYPE",
		2: "INVESTOR_COMPANY_CLIENT_TYPE",
		3: "MANAGING_COMPANY_CLIENT_TYPE",
	}
	ClientType_value = map[string]int32{
		"UNDEFINED_COMPANY_CLIENT_TYPE": 0,
		"ISSUER_COMPANY_CLIENT_TYPE":    1,
		"INVESTOR_COMPANY_CLIENT_TYPE":  2,
		"MANAGING_COMPANY_CLIENT_TYPE":  3,
	}
)

func (x ClientType) Enum() *ClientType {
	p := new(ClientType)
	*p = x
	return p
}

func (x ClientType) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (ClientType) Descriptor() protoreflect.EnumDescriptor {
	return file_api_proto_client_clientType_proto_enumTypes[0].Descriptor()
}

func (ClientType) Type() protoreflect.EnumType {
	return &file_api_proto_client_clientType_proto_enumTypes[0]
}

func (x ClientType) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use ClientType.Descriptor instead.
func (ClientType) EnumDescriptor() ([]byte, []int) {
	return file_api_proto_client_clientType_proto_rawDescGZIP(), []int{0}
}

var File_api_proto_client_clientType_proto protoreflect.FileDescriptor

var file_api_proto_client_clientType_proto_rawDesc = []byte{
	0x0a, 0x21, 0x61, 0x70, 0x69, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x63, 0x6c, 0x69, 0x65,
	0x6e, 0x74, 0x2f, 0x63, 0x6c, 0x69, 0x65, 0x6e, 0x74, 0x54, 0x79, 0x70, 0x65, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x12, 0x0a, 0x61, 0x70, 0x69, 0x2e, 0x63, 0x6c, 0x69, 0x65, 0x6e, 0x74, 0x2a,
	0x93, 0x01, 0x0a, 0x0a, 0x43, 0x6c, 0x69, 0x65, 0x6e, 0x74, 0x54, 0x79, 0x70, 0x65, 0x12, 0x21,
	0x0a, 0x1d, 0x55, 0x4e, 0x44, 0x45, 0x46, 0x49, 0x4e, 0x45, 0x44, 0x5f, 0x43, 0x4f, 0x4d, 0x50,
	0x41, 0x4e, 0x59, 0x5f, 0x43, 0x4c, 0x49, 0x45, 0x4e, 0x54, 0x5f, 0x54, 0x59, 0x50, 0x45, 0x10,
	0x00, 0x12, 0x1e, 0x0a, 0x1a, 0x49, 0x53, 0x53, 0x55, 0x45, 0x52, 0x5f, 0x43, 0x4f, 0x4d, 0x50,
	0x41, 0x4e, 0x59, 0x5f, 0x43, 0x4c, 0x49, 0x45, 0x4e, 0x54, 0x5f, 0x54, 0x59, 0x50, 0x45, 0x10,
	0x01, 0x12, 0x20, 0x0a, 0x1c, 0x49, 0x4e, 0x56, 0x45, 0x53, 0x54, 0x4f, 0x52, 0x5f, 0x43, 0x4f,
	0x4d, 0x50, 0x41, 0x4e, 0x59, 0x5f, 0x43, 0x4c, 0x49, 0x45, 0x4e, 0x54, 0x5f, 0x54, 0x59, 0x50,
	0x45, 0x10, 0x02, 0x12, 0x20, 0x0a, 0x1c, 0x4d, 0x41, 0x4e, 0x41, 0x47, 0x49, 0x4e, 0x47, 0x5f,
	0x43, 0x4f, 0x4d, 0x50, 0x41, 0x4e, 0x59, 0x5f, 0x43, 0x4c, 0x49, 0x45, 0x4e, 0x54, 0x5f, 0x54,
	0x59, 0x50, 0x45, 0x10, 0x03, 0x42, 0x24, 0x5a, 0x22, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e,
	0x63, 0x6f, 0x6d, 0x2f, 0x6d, 0x65, 0x73, 0x68, 0x74, 0x72, 0x61, 0x64, 0x65, 0x2f, 0x61, 0x70,
	0x69, 0x2f, 0x67, 0x6f, 0x2f, 0x63, 0x6c, 0x69, 0x65, 0x6e, 0x74, 0x62, 0x06, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x33,
}

var (
	file_api_proto_client_clientType_proto_rawDescOnce sync.Once
	file_api_proto_client_clientType_proto_rawDescData = file_api_proto_client_clientType_proto_rawDesc
)

func file_api_proto_client_clientType_proto_rawDescGZIP() []byte {
	file_api_proto_client_clientType_proto_rawDescOnce.Do(func() {
		file_api_proto_client_clientType_proto_rawDescData = protoimpl.X.CompressGZIP(file_api_proto_client_clientType_proto_rawDescData)
	})
	return file_api_proto_client_clientType_proto_rawDescData
}

var file_api_proto_client_clientType_proto_enumTypes = make([]protoimpl.EnumInfo, 1)
var file_api_proto_client_clientType_proto_goTypes = []interface{}{
	(ClientType)(0), // 0: api.client.ClientType
}
var file_api_proto_client_clientType_proto_depIdxs = []int32{
	0, // [0:0] is the sub-list for method output_type
	0, // [0:0] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_api_proto_client_clientType_proto_init() }
func file_api_proto_client_clientType_proto_init() {
	if File_api_proto_client_clientType_proto != nil {
		return
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_api_proto_client_clientType_proto_rawDesc,
			NumEnums:      1,
			NumMessages:   0,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_api_proto_client_clientType_proto_goTypes,
		DependencyIndexes: file_api_proto_client_clientType_proto_depIdxs,
		EnumInfos:         file_api_proto_client_clientType_proto_enumTypes,
	}.Build()
	File_api_proto_client_clientType_proto = out.File
	file_api_proto_client_clientType_proto_rawDesc = nil
	file_api_proto_client_clientType_proto_goTypes = nil
	file_api_proto_client_clientType_proto_depIdxs = nil
}

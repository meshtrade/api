// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.33.0
// 	protoc        v5.28.0
// source: api/proto/legal/company/industryClassification.proto

package company

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

type IndustryClassification struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Industry code using the GICS standard (Global Industry Classification Standard)
	IndustryCode int64 `protobuf:"varint,1,opt,name=industryCode,proto3" json:"industryCode,omitempty"`
	// Name/description of the industry based on the GICS code
	IndustryName string `protobuf:"bytes,2,opt,name=industryName,proto3" json:"industryName,omitempty"`
	// Sub-industry code under the main industry using GICS classification
	SubIndustryCode int64 `protobuf:"varint,3,opt,name=subIndustryCode,proto3" json:"subIndustryCode,omitempty"`
	// Name/description of the sub-industry based on the GICS sub-industry code
	SubIndustryName string `protobuf:"bytes,4,opt,name=subIndustryName,proto3" json:"subIndustryName,omitempty"`
}

func (x *IndustryClassification) Reset() {
	*x = IndustryClassification{}
	if protoimpl.UnsafeEnabled {
		mi := &file_api_proto_legal_company_industryClassification_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *IndustryClassification) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*IndustryClassification) ProtoMessage() {}

func (x *IndustryClassification) ProtoReflect() protoreflect.Message {
	mi := &file_api_proto_legal_company_industryClassification_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use IndustryClassification.ProtoReflect.Descriptor instead.
func (*IndustryClassification) Descriptor() ([]byte, []int) {
	return file_api_proto_legal_company_industryClassification_proto_rawDescGZIP(), []int{0}
}

func (x *IndustryClassification) GetIndustryCode() int64 {
	if x != nil {
		return x.IndustryCode
	}
	return 0
}

func (x *IndustryClassification) GetIndustryName() string {
	if x != nil {
		return x.IndustryName
	}
	return ""
}

func (x *IndustryClassification) GetSubIndustryCode() int64 {
	if x != nil {
		return x.SubIndustryCode
	}
	return 0
}

func (x *IndustryClassification) GetSubIndustryName() string {
	if x != nil {
		return x.SubIndustryName
	}
	return ""
}

var File_api_proto_legal_company_industryClassification_proto protoreflect.FileDescriptor

var file_api_proto_legal_company_industryClassification_proto_rawDesc = []byte{
	0x0a, 0x34, 0x61, 0x70, 0x69, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x6c, 0x65, 0x67, 0x61,
	0x6c, 0x2f, 0x63, 0x6f, 0x6d, 0x70, 0x61, 0x6e, 0x79, 0x2f, 0x69, 0x6e, 0x64, 0x75, 0x73, 0x74,
	0x72, 0x79, 0x43, 0x6c, 0x61, 0x73, 0x73, 0x69, 0x66, 0x69, 0x63, 0x61, 0x74, 0x69, 0x6f, 0x6e,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x11, 0x61, 0x70, 0x69, 0x2e, 0x6c, 0x65, 0x67, 0x61,
	0x6c, 0x2e, 0x63, 0x6f, 0x6d, 0x70, 0x61, 0x6e, 0x79, 0x22, 0xb4, 0x01, 0x0a, 0x16, 0x49, 0x6e,
	0x64, 0x75, 0x73, 0x74, 0x72, 0x79, 0x43, 0x6c, 0x61, 0x73, 0x73, 0x69, 0x66, 0x69, 0x63, 0x61,
	0x74, 0x69, 0x6f, 0x6e, 0x12, 0x22, 0x0a, 0x0c, 0x69, 0x6e, 0x64, 0x75, 0x73, 0x74, 0x72, 0x79,
	0x43, 0x6f, 0x64, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x03, 0x52, 0x0c, 0x69, 0x6e, 0x64, 0x75,
	0x73, 0x74, 0x72, 0x79, 0x43, 0x6f, 0x64, 0x65, 0x12, 0x22, 0x0a, 0x0c, 0x69, 0x6e, 0x64, 0x75,
	0x73, 0x74, 0x72, 0x79, 0x4e, 0x61, 0x6d, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0c,
	0x69, 0x6e, 0x64, 0x75, 0x73, 0x74, 0x72, 0x79, 0x4e, 0x61, 0x6d, 0x65, 0x12, 0x28, 0x0a, 0x0f,
	0x73, 0x75, 0x62, 0x49, 0x6e, 0x64, 0x75, 0x73, 0x74, 0x72, 0x79, 0x43, 0x6f, 0x64, 0x65, 0x18,
	0x03, 0x20, 0x01, 0x28, 0x03, 0x52, 0x0f, 0x73, 0x75, 0x62, 0x49, 0x6e, 0x64, 0x75, 0x73, 0x74,
	0x72, 0x79, 0x43, 0x6f, 0x64, 0x65, 0x12, 0x28, 0x0a, 0x0f, 0x73, 0x75, 0x62, 0x49, 0x6e, 0x64,
	0x75, 0x73, 0x74, 0x72, 0x79, 0x4e, 0x61, 0x6d, 0x65, 0x18, 0x04, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x0f, 0x73, 0x75, 0x62, 0x49, 0x6e, 0x64, 0x75, 0x73, 0x74, 0x72, 0x79, 0x4e, 0x61, 0x6d, 0x65,
	0x42, 0x2b, 0x5a, 0x29, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x6d,
	0x65, 0x73, 0x68, 0x74, 0x72, 0x61, 0x64, 0x65, 0x2f, 0x61, 0x70, 0x69, 0x2f, 0x67, 0x6f, 0x2f,
	0x6c, 0x65, 0x67, 0x61, 0x6c, 0x2f, 0x63, 0x6f, 0x6d, 0x70, 0x61, 0x6e, 0x79, 0x62, 0x06, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_api_proto_legal_company_industryClassification_proto_rawDescOnce sync.Once
	file_api_proto_legal_company_industryClassification_proto_rawDescData = file_api_proto_legal_company_industryClassification_proto_rawDesc
)

func file_api_proto_legal_company_industryClassification_proto_rawDescGZIP() []byte {
	file_api_proto_legal_company_industryClassification_proto_rawDescOnce.Do(func() {
		file_api_proto_legal_company_industryClassification_proto_rawDescData = protoimpl.X.CompressGZIP(file_api_proto_legal_company_industryClassification_proto_rawDescData)
	})
	return file_api_proto_legal_company_industryClassification_proto_rawDescData
}

var file_api_proto_legal_company_industryClassification_proto_msgTypes = make([]protoimpl.MessageInfo, 1)
var file_api_proto_legal_company_industryClassification_proto_goTypes = []interface{}{
	(*IndustryClassification)(nil), // 0: api.legal.company.IndustryClassification
}
var file_api_proto_legal_company_industryClassification_proto_depIdxs = []int32{
	0, // [0:0] is the sub-list for method output_type
	0, // [0:0] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_api_proto_legal_company_industryClassification_proto_init() }
func file_api_proto_legal_company_industryClassification_proto_init() {
	if File_api_proto_legal_company_industryClassification_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_api_proto_legal_company_industryClassification_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*IndustryClassification); i {
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
			RawDescriptor: file_api_proto_legal_company_industryClassification_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   1,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_api_proto_legal_company_industryClassification_proto_goTypes,
		DependencyIndexes: file_api_proto_legal_company_industryClassification_proto_depIdxs,
		MessageInfos:      file_api_proto_legal_company_industryClassification_proto_msgTypes,
	}.Build()
	File_api_proto_legal_company_industryClassification_proto = out.File
	file_api_proto_legal_company_industryClassification_proto_rawDesc = nil
	file_api_proto_legal_company_industryClassification_proto_goTypes = nil
	file_api_proto_legal_company_industryClassification_proto_depIdxs = nil
}

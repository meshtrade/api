// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.36.6
// 	protoc        (unknown)
// source: meshtrade/compliance/client/v1/industry_classification.proto

package clientv1

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
	unsafe "unsafe"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

// IndustryClassification holds the detailed industry classification for a business entity
// using the GICS (Global Industry Classification Standard) hierarchy.
// GICS is a four-tiered, hierarchical industry classification system. Capturing all
// four levels provides a complete and precise profile for risk assessment.
type IndustryClassification struct {
	state protoimpl.MessageState `protogen:"open.v1"`
	// The 2-digit GICS Sector code, representing the highest level of the hierarchy.
	// Example: "45" for the "Information Technology" sector.
	SectorCode string `protobuf:"bytes,1,opt,name=sector_code,json=sectorCode,proto3" json:"sector_code,omitempty"`
	// The human-readable name of the GICS Sector.
	// Example: "Information Technology"
	SectorName string `protobuf:"bytes,2,opt,name=sector_name,json=sectorName,proto3" json:"sector_name,omitempty"`
	// The 4-digit GICS Industry Group code.
	// Example: "4510" for the "Software & Services" industry group.
	IndustryGroupCode string `protobuf:"bytes,3,opt,name=industry_group_code,json=industryGroupCode,proto3" json:"industry_group_code,omitempty"`
	// The human-readable name of the GICS Industry Group.
	// Example: "Software & Services"
	IndustryGroupName string `protobuf:"bytes,4,opt,name=industry_group_name,json=industryGroupName,proto3" json:"industry_group_name,omitempty"`
	// The 6-digit GICS Industry code.
	// Example: "451020" for the "IT Services" industry.
	IndustryCode string `protobuf:"bytes,5,opt,name=industry_code,json=industryCode,proto3" json:"industry_code,omitempty"`
	// The human-readable name of the GICS Industry.
	// Example: "IT Services"
	IndustryName string `protobuf:"bytes,6,opt,name=industry_name,json=industryName,proto3" json:"industry_name,omitempty"`
	// The 8-digit GICS Sub-Industry code, representing the most granular level.
	// Example: "45102010" for the "IT Consulting & Other Services" sub-industry.
	SubIndustryCode string `protobuf:"bytes,7,opt,name=sub_industry_code,json=subIndustryCode,proto3" json:"sub_industry_code,omitempty"`
	// The human-readable name of the GICS Sub-Industry.
	// Example: "IT Consulting & Other Services"
	SubIndustryName string `protobuf:"bytes,8,opt,name=sub_industry_name,json=subIndustryName,proto3" json:"sub_industry_name,omitempty"`
	unknownFields   protoimpl.UnknownFields
	sizeCache       protoimpl.SizeCache
}

func (x *IndustryClassification) Reset() {
	*x = IndustryClassification{}
	mi := &file_meshtrade_compliance_client_v1_industry_classification_proto_msgTypes[0]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *IndustryClassification) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*IndustryClassification) ProtoMessage() {}

func (x *IndustryClassification) ProtoReflect() protoreflect.Message {
	mi := &file_meshtrade_compliance_client_v1_industry_classification_proto_msgTypes[0]
	if x != nil {
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
	return file_meshtrade_compliance_client_v1_industry_classification_proto_rawDescGZIP(), []int{0}
}

func (x *IndustryClassification) GetSectorCode() string {
	if x != nil {
		return x.SectorCode
	}
	return ""
}

func (x *IndustryClassification) GetSectorName() string {
	if x != nil {
		return x.SectorName
	}
	return ""
}

func (x *IndustryClassification) GetIndustryGroupCode() string {
	if x != nil {
		return x.IndustryGroupCode
	}
	return ""
}

func (x *IndustryClassification) GetIndustryGroupName() string {
	if x != nil {
		return x.IndustryGroupName
	}
	return ""
}

func (x *IndustryClassification) GetIndustryCode() string {
	if x != nil {
		return x.IndustryCode
	}
	return ""
}

func (x *IndustryClassification) GetIndustryName() string {
	if x != nil {
		return x.IndustryName
	}
	return ""
}

func (x *IndustryClassification) GetSubIndustryCode() string {
	if x != nil {
		return x.SubIndustryCode
	}
	return ""
}

func (x *IndustryClassification) GetSubIndustryName() string {
	if x != nil {
		return x.SubIndustryName
	}
	return ""
}

var File_meshtrade_compliance_client_v1_industry_classification_proto protoreflect.FileDescriptor

const file_meshtrade_compliance_client_v1_industry_classification_proto_rawDesc = "" +
	"\n" +
	"<meshtrade/compliance/client/v1/industry_classification.proto\x12\x1emeshtrade.compliance.client.v1\"\xdc\x02\n" +
	"\x16IndustryClassification\x12\x1f\n" +
	"\vsector_code\x18\x01 \x01(\tR\n" +
	"sectorCode\x12\x1f\n" +
	"\vsector_name\x18\x02 \x01(\tR\n" +
	"sectorName\x12.\n" +
	"\x13industry_group_code\x18\x03 \x01(\tR\x11industryGroupCode\x12.\n" +
	"\x13industry_group_name\x18\x04 \x01(\tR\x11industryGroupName\x12#\n" +
	"\rindustry_code\x18\x05 \x01(\tR\findustryCode\x12#\n" +
	"\rindustry_name\x18\x06 \x01(\tR\findustryName\x12*\n" +
	"\x11sub_industry_code\x18\a \x01(\tR\x0fsubIndustryCode\x12*\n" +
	"\x11sub_industry_name\x18\b \x01(\tR\x0fsubIndustryNameB;Z9github.com/meshtrade/api/go/compliance/client/v1;clientv1b\x06proto3"

var (
	file_meshtrade_compliance_client_v1_industry_classification_proto_rawDescOnce sync.Once
	file_meshtrade_compliance_client_v1_industry_classification_proto_rawDescData []byte
)

func file_meshtrade_compliance_client_v1_industry_classification_proto_rawDescGZIP() []byte {
	file_meshtrade_compliance_client_v1_industry_classification_proto_rawDescOnce.Do(func() {
		file_meshtrade_compliance_client_v1_industry_classification_proto_rawDescData = protoimpl.X.CompressGZIP(unsafe.Slice(unsafe.StringData(file_meshtrade_compliance_client_v1_industry_classification_proto_rawDesc), len(file_meshtrade_compliance_client_v1_industry_classification_proto_rawDesc)))
	})
	return file_meshtrade_compliance_client_v1_industry_classification_proto_rawDescData
}

var file_meshtrade_compliance_client_v1_industry_classification_proto_msgTypes = make([]protoimpl.MessageInfo, 1)
var file_meshtrade_compliance_client_v1_industry_classification_proto_goTypes = []any{
	(*IndustryClassification)(nil), // 0: meshtrade.compliance.client.v1.IndustryClassification
}
var file_meshtrade_compliance_client_v1_industry_classification_proto_depIdxs = []int32{
	0, // [0:0] is the sub-list for method output_type
	0, // [0:0] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_meshtrade_compliance_client_v1_industry_classification_proto_init() }
func file_meshtrade_compliance_client_v1_industry_classification_proto_init() {
	if File_meshtrade_compliance_client_v1_industry_classification_proto != nil {
		return
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: unsafe.Slice(unsafe.StringData(file_meshtrade_compliance_client_v1_industry_classification_proto_rawDesc), len(file_meshtrade_compliance_client_v1_industry_classification_proto_rawDesc)),
			NumEnums:      0,
			NumMessages:   1,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_meshtrade_compliance_client_v1_industry_classification_proto_goTypes,
		DependencyIndexes: file_meshtrade_compliance_client_v1_industry_classification_proto_depIdxs,
		MessageInfos:      file_meshtrade_compliance_client_v1_industry_classification_proto_msgTypes,
	}.Build()
	File_meshtrade_compliance_client_v1_industry_classification_proto = out.File
	file_meshtrade_compliance_client_v1_industry_classification_proto_goTypes = nil
	file_meshtrade_compliance_client_v1_industry_classification_proto_depIdxs = nil
}

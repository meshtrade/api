// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.33.0
// 	protoc        v5.28.0
// source: api/proto/instrument/feeprofile/lifecycleEvent.proto

package feeprofile

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

// LifecycleEvents configures the fees associated with various stages in the
// Instrument's lifecycle.
// Lifecycle events are significant milestones or actions that may incur
// fees, such as:
// - Listing: Fees for listing the Instrument on Mesh.
// - Primary Market Settlement: Fees related to the settlement of
// transactions in the primary market.
//
// Multiple lifecycle events can be configured and managed within a single
// FeeProfile.
type LifecycleEvent struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Description is the description of the Fee charged on this LifecycleEvent.
	// The description must be unique is the sense that the same description
	// cannot be used more than once for a single trigger.
	Description string `protobuf:"bytes,1,opt,name=description,proto3" json:"description,omitempty"`
	// Category is the Instrument lifecycle event type that leads to a Fee being charged.
	Category LifecycleEventCategory `protobuf:"varint,2,opt,name=category,proto3,enum=api.instrument.feeprofile.LifecycleEventCategory" json:"category,omitempty"`
	// CalculationConfig defines how the Fee on this lifecycle event is calculated.
	// Implementations include:
	// - Amount: The Fee amount is fixed and pre-determined.
	// - Rate: The Fee amount is variable are calculated as a percentage of a
	// base amount. The base amount used is contextual to the lifecycle event.
	CalculationConfig *LifecycleEventCalculationConfig `protobuf:"bytes,3,opt,name=calculationConfig,proto3" json:"calculationConfig,omitempty"`
}

func (x *LifecycleEvent) Reset() {
	*x = LifecycleEvent{}
	if protoimpl.UnsafeEnabled {
		mi := &file_api_proto_instrument_feeprofile_lifecycleEvent_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *LifecycleEvent) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*LifecycleEvent) ProtoMessage() {}

func (x *LifecycleEvent) ProtoReflect() protoreflect.Message {
	mi := &file_api_proto_instrument_feeprofile_lifecycleEvent_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use LifecycleEvent.ProtoReflect.Descriptor instead.
func (*LifecycleEvent) Descriptor() ([]byte, []int) {
	return file_api_proto_instrument_feeprofile_lifecycleEvent_proto_rawDescGZIP(), []int{0}
}

func (x *LifecycleEvent) GetDescription() string {
	if x != nil {
		return x.Description
	}
	return ""
}

func (x *LifecycleEvent) GetCategory() LifecycleEventCategory {
	if x != nil {
		return x.Category
	}
	return LifecycleEventCategory_UNDEFINED_LIFECYCLE_EVENT_CATEGORY
}

func (x *LifecycleEvent) GetCalculationConfig() *LifecycleEventCalculationConfig {
	if x != nil {
		return x.CalculationConfig
	}
	return nil
}

var File_api_proto_instrument_feeprofile_lifecycleEvent_proto protoreflect.FileDescriptor

var file_api_proto_instrument_feeprofile_lifecycleEvent_proto_rawDesc = []byte{
	0x0a, 0x34, 0x61, 0x70, 0x69, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x69, 0x6e, 0x73, 0x74,
	0x72, 0x75, 0x6d, 0x65, 0x6e, 0x74, 0x2f, 0x66, 0x65, 0x65, 0x70, 0x72, 0x6f, 0x66, 0x69, 0x6c,
	0x65, 0x2f, 0x6c, 0x69, 0x66, 0x65, 0x63, 0x79, 0x63, 0x6c, 0x65, 0x45, 0x76, 0x65, 0x6e, 0x74,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x19, 0x61, 0x70, 0x69, 0x2e, 0x69, 0x6e, 0x73, 0x74,
	0x72, 0x75, 0x6d, 0x65, 0x6e, 0x74, 0x2e, 0x66, 0x65, 0x65, 0x70, 0x72, 0x6f, 0x66, 0x69, 0x6c,
	0x65, 0x1a, 0x3c, 0x61, 0x70, 0x69, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x69, 0x6e, 0x73,
	0x74, 0x72, 0x75, 0x6d, 0x65, 0x6e, 0x74, 0x2f, 0x66, 0x65, 0x65, 0x70, 0x72, 0x6f, 0x66, 0x69,
	0x6c, 0x65, 0x2f, 0x6c, 0x69, 0x66, 0x65, 0x63, 0x79, 0x63, 0x6c, 0x65, 0x45, 0x76, 0x65, 0x6e,
	0x74, 0x43, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a,
	0x45, 0x61, 0x70, 0x69, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x69, 0x6e, 0x73, 0x74, 0x72,
	0x75, 0x6d, 0x65, 0x6e, 0x74, 0x2f, 0x66, 0x65, 0x65, 0x70, 0x72, 0x6f, 0x66, 0x69, 0x6c, 0x65,
	0x2f, 0x6c, 0x69, 0x66, 0x65, 0x63, 0x79, 0x63, 0x6c, 0x65, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x43,
	0x61, 0x6c, 0x63, 0x75, 0x6c, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x43, 0x6f, 0x6e, 0x66, 0x69, 0x67,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0xeb, 0x01, 0x0a, 0x0e, 0x4c, 0x69, 0x66, 0x65, 0x63,
	0x79, 0x63, 0x6c, 0x65, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x12, 0x20, 0x0a, 0x0b, 0x64, 0x65, 0x73,
	0x63, 0x72, 0x69, 0x70, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0b,
	0x64, 0x65, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74, 0x69, 0x6f, 0x6e, 0x12, 0x4d, 0x0a, 0x08, 0x63,
	0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0e, 0x32, 0x31, 0x2e,
	0x61, 0x70, 0x69, 0x2e, 0x69, 0x6e, 0x73, 0x74, 0x72, 0x75, 0x6d, 0x65, 0x6e, 0x74, 0x2e, 0x66,
	0x65, 0x65, 0x70, 0x72, 0x6f, 0x66, 0x69, 0x6c, 0x65, 0x2e, 0x4c, 0x69, 0x66, 0x65, 0x63, 0x79,
	0x63, 0x6c, 0x65, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x43, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79,
	0x52, 0x08, 0x63, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x12, 0x68, 0x0a, 0x11, 0x63, 0x61,
	0x6c, 0x63, 0x75, 0x6c, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x43, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x18,
	0x03, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x3a, 0x2e, 0x61, 0x70, 0x69, 0x2e, 0x69, 0x6e, 0x73, 0x74,
	0x72, 0x75, 0x6d, 0x65, 0x6e, 0x74, 0x2e, 0x66, 0x65, 0x65, 0x70, 0x72, 0x6f, 0x66, 0x69, 0x6c,
	0x65, 0x2e, 0x4c, 0x69, 0x66, 0x65, 0x63, 0x79, 0x63, 0x6c, 0x65, 0x45, 0x76, 0x65, 0x6e, 0x74,
	0x43, 0x61, 0x6c, 0x63, 0x75, 0x6c, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x43, 0x6f, 0x6e, 0x66, 0x69,
	0x67, 0x52, 0x11, 0x63, 0x61, 0x6c, 0x63, 0x75, 0x6c, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x43, 0x6f,
	0x6e, 0x66, 0x69, 0x67, 0x42, 0x33, 0x5a, 0x31, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63,
	0x6f, 0x6d, 0x2f, 0x6d, 0x65, 0x73, 0x68, 0x74, 0x72, 0x61, 0x64, 0x65, 0x2f, 0x61, 0x70, 0x69,
	0x2f, 0x67, 0x6f, 0x2f, 0x69, 0x6e, 0x73, 0x74, 0x72, 0x75, 0x6d, 0x65, 0x6e, 0x74, 0x2f, 0x66,
	0x65, 0x65, 0x70, 0x72, 0x6f, 0x66, 0x69, 0x6c, 0x65, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x33,
}

var (
	file_api_proto_instrument_feeprofile_lifecycleEvent_proto_rawDescOnce sync.Once
	file_api_proto_instrument_feeprofile_lifecycleEvent_proto_rawDescData = file_api_proto_instrument_feeprofile_lifecycleEvent_proto_rawDesc
)

func file_api_proto_instrument_feeprofile_lifecycleEvent_proto_rawDescGZIP() []byte {
	file_api_proto_instrument_feeprofile_lifecycleEvent_proto_rawDescOnce.Do(func() {
		file_api_proto_instrument_feeprofile_lifecycleEvent_proto_rawDescData = protoimpl.X.CompressGZIP(file_api_proto_instrument_feeprofile_lifecycleEvent_proto_rawDescData)
	})
	return file_api_proto_instrument_feeprofile_lifecycleEvent_proto_rawDescData
}

var file_api_proto_instrument_feeprofile_lifecycleEvent_proto_msgTypes = make([]protoimpl.MessageInfo, 1)
var file_api_proto_instrument_feeprofile_lifecycleEvent_proto_goTypes = []interface{}{
	(*LifecycleEvent)(nil),                  // 0: api.instrument.feeprofile.LifecycleEvent
	(LifecycleEventCategory)(0),             // 1: api.instrument.feeprofile.LifecycleEventCategory
	(*LifecycleEventCalculationConfig)(nil), // 2: api.instrument.feeprofile.LifecycleEventCalculationConfig
}
var file_api_proto_instrument_feeprofile_lifecycleEvent_proto_depIdxs = []int32{
	1, // 0: api.instrument.feeprofile.LifecycleEvent.category:type_name -> api.instrument.feeprofile.LifecycleEventCategory
	2, // 1: api.instrument.feeprofile.LifecycleEvent.calculationConfig:type_name -> api.instrument.feeprofile.LifecycleEventCalculationConfig
	2, // [2:2] is the sub-list for method output_type
	2, // [2:2] is the sub-list for method input_type
	2, // [2:2] is the sub-list for extension type_name
	2, // [2:2] is the sub-list for extension extendee
	0, // [0:2] is the sub-list for field type_name
}

func init() { file_api_proto_instrument_feeprofile_lifecycleEvent_proto_init() }
func file_api_proto_instrument_feeprofile_lifecycleEvent_proto_init() {
	if File_api_proto_instrument_feeprofile_lifecycleEvent_proto != nil {
		return
	}
	file_api_proto_instrument_feeprofile_lifecycleEventCategory_proto_init()
	file_api_proto_instrument_feeprofile_lifecycleEventCalculationConfig_proto_init()
	if !protoimpl.UnsafeEnabled {
		file_api_proto_instrument_feeprofile_lifecycleEvent_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*LifecycleEvent); i {
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
			RawDescriptor: file_api_proto_instrument_feeprofile_lifecycleEvent_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   1,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_api_proto_instrument_feeprofile_lifecycleEvent_proto_goTypes,
		DependencyIndexes: file_api_proto_instrument_feeprofile_lifecycleEvent_proto_depIdxs,
		MessageInfos:      file_api_proto_instrument_feeprofile_lifecycleEvent_proto_msgTypes,
	}.Build()
	File_api_proto_instrument_feeprofile_lifecycleEvent_proto = out.File
	file_api_proto_instrument_feeprofile_lifecycleEvent_proto_rawDesc = nil
	file_api_proto_instrument_feeprofile_lifecycleEvent_proto_goTypes = nil
	file_api_proto_instrument_feeprofile_lifecycleEvent_proto_depIdxs = nil
}

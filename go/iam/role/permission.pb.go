// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.33.0
// 	protoc        v5.28.0
// source: iam/role/permission.proto

package role

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

// Permission is the ability to perform an activity in the system.
type Permission struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// ServiceProvider is the name of the Service Provider that provides Service.
	ServiceProvider string `protobuf:"bytes,1,opt,name=serviceProvider,proto3" json:"serviceProvider,omitempty"`
	// Service is the name of the Service on ServiceProvider that this Permission grants access to.
	Service string `protobuf:"bytes,2,opt,name=service,proto3" json:"service,omitempty"`
	// Description describes the purpose of this permission.
	Description string `protobuf:"bytes,3,opt,name=description,proto3" json:"description,omitempty"`
}

func (x *Permission) Reset() {
	*x = Permission{}
	if protoimpl.UnsafeEnabled {
		mi := &file_iam_role_permission_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Permission) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Permission) ProtoMessage() {}

func (x *Permission) ProtoReflect() protoreflect.Message {
	mi := &file_iam_role_permission_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Permission.ProtoReflect.Descriptor instead.
func (*Permission) Descriptor() ([]byte, []int) {
	return file_iam_role_permission_proto_rawDescGZIP(), []int{0}
}

func (x *Permission) GetServiceProvider() string {
	if x != nil {
		return x.ServiceProvider
	}
	return ""
}

func (x *Permission) GetService() string {
	if x != nil {
		return x.Service
	}
	return ""
}

func (x *Permission) GetDescription() string {
	if x != nil {
		return x.Description
	}
	return ""
}

var File_iam_role_permission_proto protoreflect.FileDescriptor

var file_iam_role_permission_proto_rawDesc = []byte{
	0x0a, 0x19, 0x69, 0x61, 0x6d, 0x2f, 0x72, 0x6f, 0x6c, 0x65, 0x2f, 0x70, 0x65, 0x72, 0x6d, 0x69,
	0x73, 0x73, 0x69, 0x6f, 0x6e, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x04, 0x72, 0x6f, 0x6c,
	0x65, 0x22, 0x72, 0x0a, 0x0a, 0x50, 0x65, 0x72, 0x6d, 0x69, 0x73, 0x73, 0x69, 0x6f, 0x6e, 0x12,
	0x28, 0x0a, 0x0f, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x50, 0x72, 0x6f, 0x76, 0x69, 0x64,
	0x65, 0x72, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0f, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63,
	0x65, 0x50, 0x72, 0x6f, 0x76, 0x69, 0x64, 0x65, 0x72, 0x12, 0x18, 0x0a, 0x07, 0x73, 0x65, 0x72,
	0x76, 0x69, 0x63, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x73, 0x65, 0x72, 0x76,
	0x69, 0x63, 0x65, 0x12, 0x20, 0x0a, 0x0b, 0x64, 0x65, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74, 0x69,
	0x6f, 0x6e, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0b, 0x64, 0x65, 0x73, 0x63, 0x72, 0x69,
	0x70, 0x74, 0x69, 0x6f, 0x6e, 0x42, 0x26, 0x5a, 0x24, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e,
	0x63, 0x6f, 0x6d, 0x2f, 0x6d, 0x65, 0x73, 0x68, 0x74, 0x72, 0x61, 0x64, 0x65, 0x2f, 0x61, 0x70,
	0x69, 0x2f, 0x67, 0x6f, 0x2f, 0x69, 0x61, 0x6d, 0x2f, 0x72, 0x6f, 0x6c, 0x65, 0x62, 0x06, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_iam_role_permission_proto_rawDescOnce sync.Once
	file_iam_role_permission_proto_rawDescData = file_iam_role_permission_proto_rawDesc
)

func file_iam_role_permission_proto_rawDescGZIP() []byte {
	file_iam_role_permission_proto_rawDescOnce.Do(func() {
		file_iam_role_permission_proto_rawDescData = protoimpl.X.CompressGZIP(file_iam_role_permission_proto_rawDescData)
	})
	return file_iam_role_permission_proto_rawDescData
}

var file_iam_role_permission_proto_msgTypes = make([]protoimpl.MessageInfo, 1)
var file_iam_role_permission_proto_goTypes = []interface{}{
	(*Permission)(nil), // 0: role.Permission
}
var file_iam_role_permission_proto_depIdxs = []int32{
	0, // [0:0] is the sub-list for method output_type
	0, // [0:0] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_iam_role_permission_proto_init() }
func file_iam_role_permission_proto_init() {
	if File_iam_role_permission_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_iam_role_permission_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Permission); i {
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
			RawDescriptor: file_iam_role_permission_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   1,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_iam_role_permission_proto_goTypes,
		DependencyIndexes: file_iam_role_permission_proto_depIdxs,
		MessageInfos:      file_iam_role_permission_proto_msgTypes,
	}.Build()
	File_iam_role_permission_proto = out.File
	file_iam_role_permission_proto_rawDesc = nil
	file_iam_role_permission_proto_goTypes = nil
	file_iam_role_permission_proto_depIdxs = nil
}

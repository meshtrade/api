// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.36.6
// 	protoc        (unknown)
// source: meshtrade/type/v1/decimal.proto

package typev1

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

// Decimal is a representation of a decimal value, such as 2.5.
type Decimal struct {
	state protoimpl.MessageState `protogen:"open.v1"`
	// The decimal value, as a string.
	Value         string `protobuf:"bytes,1,opt,name=value,proto3" json:"value,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *Decimal) Reset() {
	*x = Decimal{}
	mi := &file_meshtrade_type_v1_decimal_proto_msgTypes[0]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *Decimal) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Decimal) ProtoMessage() {}

func (x *Decimal) ProtoReflect() protoreflect.Message {
	mi := &file_meshtrade_type_v1_decimal_proto_msgTypes[0]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Decimal.ProtoReflect.Descriptor instead.
func (*Decimal) Descriptor() ([]byte, []int) {
	return file_meshtrade_type_v1_decimal_proto_rawDescGZIP(), []int{0}
}

func (x *Decimal) GetValue() string {
	if x != nil {
		return x.Value
	}
	return ""
}

var File_meshtrade_type_v1_decimal_proto protoreflect.FileDescriptor

const file_meshtrade_type_v1_decimal_proto_rawDesc = "" +
	"\n" +
	"\x1fmeshtrade/type/v1/decimal.proto\x12\x11meshtrade.type.v1\"\x1f\n" +
	"\aDecimal\x12\x14\n" +
	"\x05value\x18\x01 \x01(\tR\x05valueB,Z*github.com/meshtrade/api/go/type/v1;typev1b\x06proto3"

var (
	file_meshtrade_type_v1_decimal_proto_rawDescOnce sync.Once
	file_meshtrade_type_v1_decimal_proto_rawDescData []byte
)

func file_meshtrade_type_v1_decimal_proto_rawDescGZIP() []byte {
	file_meshtrade_type_v1_decimal_proto_rawDescOnce.Do(func() {
		file_meshtrade_type_v1_decimal_proto_rawDescData = protoimpl.X.CompressGZIP(unsafe.Slice(unsafe.StringData(file_meshtrade_type_v1_decimal_proto_rawDesc), len(file_meshtrade_type_v1_decimal_proto_rawDesc)))
	})
	return file_meshtrade_type_v1_decimal_proto_rawDescData
}

var file_meshtrade_type_v1_decimal_proto_msgTypes = make([]protoimpl.MessageInfo, 1)
var file_meshtrade_type_v1_decimal_proto_goTypes = []any{
	(*Decimal)(nil), // 0: meshtrade.type.v1.Decimal
}
var file_meshtrade_type_v1_decimal_proto_depIdxs = []int32{
	0, // [0:0] is the sub-list for method output_type
	0, // [0:0] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_meshtrade_type_v1_decimal_proto_init() }
func file_meshtrade_type_v1_decimal_proto_init() {
	if File_meshtrade_type_v1_decimal_proto != nil {
		return
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: unsafe.Slice(unsafe.StringData(file_meshtrade_type_v1_decimal_proto_rawDesc), len(file_meshtrade_type_v1_decimal_proto_rawDesc)),
			NumEnums:      0,
			NumMessages:   1,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_meshtrade_type_v1_decimal_proto_goTypes,
		DependencyIndexes: file_meshtrade_type_v1_decimal_proto_depIdxs,
		MessageInfos:      file_meshtrade_type_v1_decimal_proto_msgTypes,
	}.Build()
	File_meshtrade_type_v1_decimal_proto = out.File
	file_meshtrade_type_v1_decimal_proto_goTypes = nil
	file_meshtrade_type_v1_decimal_proto_depIdxs = nil
}

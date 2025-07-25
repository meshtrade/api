// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.36.6
// 	protoc        (unknown)
// source: meshtrade/type/v1/amount.proto

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

// A canonical structure for representing a precise quantity of a specific
// digital asset.
// An Amount is a self-describing monetary value, pairing a Universal Token
// Identifier (the 'what') with a high-precision Decimal value (the 'how much').
// This model ensures that a quantity of an asset is never ambiguous.
type Amount struct {
	state protoimpl.MessageState `protogen:"open.v1"`
	// Token is the unit of account. This field uses the Universal Token Identifier to
	// define exactly WHAT asset is being quantified.
	Token *Token `protobuf:"bytes,1,opt,name=token,proto3" json:"token,omitempty"`
	// Value is the magnitude of the amount, representing HOW MUCH of the specified
	// token this value holds.
	// CRITICAL: To prevent precision errors, this decimal value MUST be
	// truncated to the exact number of decimal places supported by the
	// token's native ledger.
	Value         *Decimal `protobuf:"bytes,2,opt,name=value,proto3" json:"value,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *Amount) Reset() {
	*x = Amount{}
	mi := &file_meshtrade_type_v1_amount_proto_msgTypes[0]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *Amount) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Amount) ProtoMessage() {}

func (x *Amount) ProtoReflect() protoreflect.Message {
	mi := &file_meshtrade_type_v1_amount_proto_msgTypes[0]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Amount.ProtoReflect.Descriptor instead.
func (*Amount) Descriptor() ([]byte, []int) {
	return file_meshtrade_type_v1_amount_proto_rawDescGZIP(), []int{0}
}

func (x *Amount) GetToken() *Token {
	if x != nil {
		return x.Token
	}
	return nil
}

func (x *Amount) GetValue() *Decimal {
	if x != nil {
		return x.Value
	}
	return nil
}

var File_meshtrade_type_v1_amount_proto protoreflect.FileDescriptor

const file_meshtrade_type_v1_amount_proto_rawDesc = "" +
	"\n" +
	"\x1emeshtrade/type/v1/amount.proto\x12\x11meshtrade.type.v1\x1a\x1fmeshtrade/type/v1/decimal.proto\x1a\x1dmeshtrade/type/v1/token.proto\"j\n" +
	"\x06Amount\x12.\n" +
	"\x05token\x18\x01 \x01(\v2\x18.meshtrade.type.v1.TokenR\x05token\x120\n" +
	"\x05value\x18\x02 \x01(\v2\x1a.meshtrade.type.v1.DecimalR\x05valueB,Z*github.com/meshtrade/api/go/type/v1;typev1b\x06proto3"

var (
	file_meshtrade_type_v1_amount_proto_rawDescOnce sync.Once
	file_meshtrade_type_v1_amount_proto_rawDescData []byte
)

func file_meshtrade_type_v1_amount_proto_rawDescGZIP() []byte {
	file_meshtrade_type_v1_amount_proto_rawDescOnce.Do(func() {
		file_meshtrade_type_v1_amount_proto_rawDescData = protoimpl.X.CompressGZIP(unsafe.Slice(unsafe.StringData(file_meshtrade_type_v1_amount_proto_rawDesc), len(file_meshtrade_type_v1_amount_proto_rawDesc)))
	})
	return file_meshtrade_type_v1_amount_proto_rawDescData
}

var file_meshtrade_type_v1_amount_proto_msgTypes = make([]protoimpl.MessageInfo, 1)
var file_meshtrade_type_v1_amount_proto_goTypes = []any{
	(*Amount)(nil),  // 0: meshtrade.type.v1.Amount
	(*Token)(nil),   // 1: meshtrade.type.v1.Token
	(*Decimal)(nil), // 2: meshtrade.type.v1.Decimal
}
var file_meshtrade_type_v1_amount_proto_depIdxs = []int32{
	1, // 0: meshtrade.type.v1.Amount.token:type_name -> meshtrade.type.v1.Token
	2, // 1: meshtrade.type.v1.Amount.value:type_name -> meshtrade.type.v1.Decimal
	2, // [2:2] is the sub-list for method output_type
	2, // [2:2] is the sub-list for method input_type
	2, // [2:2] is the sub-list for extension type_name
	2, // [2:2] is the sub-list for extension extendee
	0, // [0:2] is the sub-list for field type_name
}

func init() { file_meshtrade_type_v1_amount_proto_init() }
func file_meshtrade_type_v1_amount_proto_init() {
	if File_meshtrade_type_v1_amount_proto != nil {
		return
	}
	file_meshtrade_type_v1_decimal_proto_init()
	file_meshtrade_type_v1_token_proto_init()
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: unsafe.Slice(unsafe.StringData(file_meshtrade_type_v1_amount_proto_rawDesc), len(file_meshtrade_type_v1_amount_proto_rawDesc)),
			NumEnums:      0,
			NumMessages:   1,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_meshtrade_type_v1_amount_proto_goTypes,
		DependencyIndexes: file_meshtrade_type_v1_amount_proto_depIdxs,
		MessageInfos:      file_meshtrade_type_v1_amount_proto_msgTypes,
	}.Build()
	File_meshtrade_type_v1_amount_proto = out.File
	file_meshtrade_type_v1_amount_proto_goTypes = nil
	file_meshtrade_type_v1_amount_proto_depIdxs = nil
}

// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.33.0
// 	protoc        v5.28.0
// source: api/proto/instrument/fee/dataAmount.proto

package fee

import (
	ledger "github.com/meshtrade/api/go/ledger"
	num "github.com/meshtrade/api/go/num"
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

// AmountData is the additional calculation data for a Fee
// of a fixed amount.
// This is used for flat fees that do not depend on a variable
// base amount and percentage for calculation.
//
// @bson-marshalled
type AmountData struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// AmountExclVAT is the VAT exclusive amount used to calculate
	// Fee.VatAmount and the resulting Fee.AmountInclVAT.
	AmountExclVAT *ledger.Amount `protobuf:"bytes,1,opt,name=amountExclVAT,proto3" json:"amountExclVAT,omitempty"`
	// VATRate is the rate used to calculate Fee.VatAmount.
	VatRate *num.Decimal `protobuf:"bytes,2,opt,name=vatRate,proto3" json:"vatRate,omitempty"`
}

func (x *AmountData) Reset() {
	*x = AmountData{}
	if protoimpl.UnsafeEnabled {
		mi := &file_api_proto_instrument_fee_dataAmount_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AmountData) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AmountData) ProtoMessage() {}

func (x *AmountData) ProtoReflect() protoreflect.Message {
	mi := &file_api_proto_instrument_fee_dataAmount_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AmountData.ProtoReflect.Descriptor instead.
func (*AmountData) Descriptor() ([]byte, []int) {
	return file_api_proto_instrument_fee_dataAmount_proto_rawDescGZIP(), []int{0}
}

func (x *AmountData) GetAmountExclVAT() *ledger.Amount {
	if x != nil {
		return x.AmountExclVAT
	}
	return nil
}

func (x *AmountData) GetVatRate() *num.Decimal {
	if x != nil {
		return x.VatRate
	}
	return nil
}

var File_api_proto_instrument_fee_dataAmount_proto protoreflect.FileDescriptor

var file_api_proto_instrument_fee_dataAmount_proto_rawDesc = []byte{
	0x0a, 0x29, 0x61, 0x70, 0x69, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x69, 0x6e, 0x73, 0x74,
	0x72, 0x75, 0x6d, 0x65, 0x6e, 0x74, 0x2f, 0x66, 0x65, 0x65, 0x2f, 0x64, 0x61, 0x74, 0x61, 0x41,
	0x6d, 0x6f, 0x75, 0x6e, 0x74, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x12, 0x61, 0x70, 0x69,
	0x2e, 0x69, 0x6e, 0x73, 0x74, 0x72, 0x75, 0x6d, 0x65, 0x6e, 0x74, 0x2e, 0x66, 0x65, 0x65, 0x1a,
	0x1d, 0x61, 0x70, 0x69, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x6c, 0x65, 0x64, 0x67, 0x65,
	0x72, 0x2f, 0x61, 0x6d, 0x6f, 0x75, 0x6e, 0x74, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x1b,
	0x61, 0x70, 0x69, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x6e, 0x75, 0x6d, 0x2f, 0x64, 0x65,
	0x63, 0x69, 0x6d, 0x61, 0x6c, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0x72, 0x0a, 0x0a, 0x41,
	0x6d, 0x6f, 0x75, 0x6e, 0x74, 0x44, 0x61, 0x74, 0x61, 0x12, 0x38, 0x0a, 0x0d, 0x61, 0x6d, 0x6f,
	0x75, 0x6e, 0x74, 0x45, 0x78, 0x63, 0x6c, 0x56, 0x41, 0x54, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b,
	0x32, 0x12, 0x2e, 0x61, 0x70, 0x69, 0x2e, 0x6c, 0x65, 0x64, 0x67, 0x65, 0x72, 0x2e, 0x41, 0x6d,
	0x6f, 0x75, 0x6e, 0x74, 0x52, 0x0d, 0x61, 0x6d, 0x6f, 0x75, 0x6e, 0x74, 0x45, 0x78, 0x63, 0x6c,
	0x56, 0x41, 0x54, 0x12, 0x2a, 0x0a, 0x07, 0x76, 0x61, 0x74, 0x52, 0x61, 0x74, 0x65, 0x18, 0x02,
	0x20, 0x01, 0x28, 0x0b, 0x32, 0x10, 0x2e, 0x61, 0x70, 0x69, 0x2e, 0x6e, 0x75, 0x6d, 0x2e, 0x44,
	0x65, 0x63, 0x69, 0x6d, 0x61, 0x6c, 0x52, 0x07, 0x76, 0x61, 0x74, 0x52, 0x61, 0x74, 0x65, 0x42,
	0x2c, 0x5a, 0x2a, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x6d, 0x65,
	0x73, 0x68, 0x74, 0x72, 0x61, 0x64, 0x65, 0x2f, 0x61, 0x70, 0x69, 0x2f, 0x67, 0x6f, 0x2f, 0x69,
	0x6e, 0x73, 0x74, 0x72, 0x75, 0x6d, 0x65, 0x6e, 0x74, 0x2f, 0x66, 0x65, 0x65, 0x62, 0x06, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_api_proto_instrument_fee_dataAmount_proto_rawDescOnce sync.Once
	file_api_proto_instrument_fee_dataAmount_proto_rawDescData = file_api_proto_instrument_fee_dataAmount_proto_rawDesc
)

func file_api_proto_instrument_fee_dataAmount_proto_rawDescGZIP() []byte {
	file_api_proto_instrument_fee_dataAmount_proto_rawDescOnce.Do(func() {
		file_api_proto_instrument_fee_dataAmount_proto_rawDescData = protoimpl.X.CompressGZIP(file_api_proto_instrument_fee_dataAmount_proto_rawDescData)
	})
	return file_api_proto_instrument_fee_dataAmount_proto_rawDescData
}

var file_api_proto_instrument_fee_dataAmount_proto_msgTypes = make([]protoimpl.MessageInfo, 1)
var file_api_proto_instrument_fee_dataAmount_proto_goTypes = []interface{}{
	(*AmountData)(nil),    // 0: api.instrument.fee.AmountData
	(*ledger.Amount)(nil), // 1: api.ledger.Amount
	(*num.Decimal)(nil),   // 2: api.num.Decimal
}
var file_api_proto_instrument_fee_dataAmount_proto_depIdxs = []int32{
	1, // 0: api.instrument.fee.AmountData.amountExclVAT:type_name -> api.ledger.Amount
	2, // 1: api.instrument.fee.AmountData.vatRate:type_name -> api.num.Decimal
	2, // [2:2] is the sub-list for method output_type
	2, // [2:2] is the sub-list for method input_type
	2, // [2:2] is the sub-list for extension type_name
	2, // [2:2] is the sub-list for extension extendee
	0, // [0:2] is the sub-list for field type_name
}

func init() { file_api_proto_instrument_fee_dataAmount_proto_init() }
func file_api_proto_instrument_fee_dataAmount_proto_init() {
	if File_api_proto_instrument_fee_dataAmount_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_api_proto_instrument_fee_dataAmount_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AmountData); i {
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
			RawDescriptor: file_api_proto_instrument_fee_dataAmount_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   1,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_api_proto_instrument_fee_dataAmount_proto_goTypes,
		DependencyIndexes: file_api_proto_instrument_fee_dataAmount_proto_depIdxs,
		MessageInfos:      file_api_proto_instrument_fee_dataAmount_proto_msgTypes,
	}.Build()
	File_api_proto_instrument_fee_dataAmount_proto = out.File
	file_api_proto_instrument_fee_dataAmount_proto_rawDesc = nil
	file_api_proto_instrument_fee_dataAmount_proto_goTypes = nil
	file_api_proto_instrument_fee_dataAmount_proto_depIdxs = nil
}

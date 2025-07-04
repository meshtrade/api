// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.36.6
// 	protoc        (unknown)
// source: meshtrade/ledger/transaction/v1/transaction_state.proto

package transactionv1

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

type TransactionState int32

const (
	// Unknown or not specified.
	// This is a default value to prevent accidental assignment and should not be used.
	TransactionState_TRANSACTION_STATE_UNSPECIFIED            TransactionState = 0
	TransactionState_TRANSACTION_STATE_DRAFT                  TransactionState = 1
	TransactionState_TRANSACTION_STATE_SIGNING_IN_PROGRESS    TransactionState = 2
	TransactionState_TRANSACTION_STATE_PENDING                TransactionState = 3
	TransactionState_TRANSACTION_STATE_SUBMISSION_IN_PROGRESS TransactionState = 4
	TransactionState_TRANSACTION_STATE_FAILED                 TransactionState = 5
	TransactionState_TRANSACTION_STATE_INDETERMINATE          TransactionState = 6
	TransactionState_TRANSACTION_STATE_SUCCESSFUL             TransactionState = 7
)

// Enum value maps for TransactionState.
var (
	TransactionState_name = map[int32]string{
		0: "TRANSACTION_STATE_UNSPECIFIED",
		1: "TRANSACTION_STATE_DRAFT",
		2: "TRANSACTION_STATE_SIGNING_IN_PROGRESS",
		3: "TRANSACTION_STATE_PENDING",
		4: "TRANSACTION_STATE_SUBMISSION_IN_PROGRESS",
		5: "TRANSACTION_STATE_FAILED",
		6: "TRANSACTION_STATE_INDETERMINATE",
		7: "TRANSACTION_STATE_SUCCESSFUL",
	}
	TransactionState_value = map[string]int32{
		"TRANSACTION_STATE_UNSPECIFIED":            0,
		"TRANSACTION_STATE_DRAFT":                  1,
		"TRANSACTION_STATE_SIGNING_IN_PROGRESS":    2,
		"TRANSACTION_STATE_PENDING":                3,
		"TRANSACTION_STATE_SUBMISSION_IN_PROGRESS": 4,
		"TRANSACTION_STATE_FAILED":                 5,
		"TRANSACTION_STATE_INDETERMINATE":          6,
		"TRANSACTION_STATE_SUCCESSFUL":             7,
	}
)

func (x TransactionState) Enum() *TransactionState {
	p := new(TransactionState)
	*p = x
	return p
}

func (x TransactionState) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (TransactionState) Descriptor() protoreflect.EnumDescriptor {
	return file_meshtrade_ledger_transaction_v1_transaction_state_proto_enumTypes[0].Descriptor()
}

func (TransactionState) Type() protoreflect.EnumType {
	return &file_meshtrade_ledger_transaction_v1_transaction_state_proto_enumTypes[0]
}

func (x TransactionState) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use TransactionState.Descriptor instead.
func (TransactionState) EnumDescriptor() ([]byte, []int) {
	return file_meshtrade_ledger_transaction_v1_transaction_state_proto_rawDescGZIP(), []int{0}
}

var File_meshtrade_ledger_transaction_v1_transaction_state_proto protoreflect.FileDescriptor

const file_meshtrade_ledger_transaction_v1_transaction_state_proto_rawDesc = "" +
	"\n" +
	"7meshtrade/ledger/transaction/v1/transaction_state.proto\x12\x1fmeshtrade.ledger.transaction.v1*\xaf\x02\n" +
	"\x10TransactionState\x12!\n" +
	"\x1dTRANSACTION_STATE_UNSPECIFIED\x10\x00\x12\x1b\n" +
	"\x17TRANSACTION_STATE_DRAFT\x10\x01\x12)\n" +
	"%TRANSACTION_STATE_SIGNING_IN_PROGRESS\x10\x02\x12\x1d\n" +
	"\x19TRANSACTION_STATE_PENDING\x10\x03\x12,\n" +
	"(TRANSACTION_STATE_SUBMISSION_IN_PROGRESS\x10\x04\x12\x1c\n" +
	"\x18TRANSACTION_STATE_FAILED\x10\x05\x12#\n" +
	"\x1fTRANSACTION_STATE_INDETERMINATE\x10\x06\x12 \n" +
	"\x1cTRANSACTION_STATE_SUCCESSFUL\x10\aBAZ?github.com/meshtrade/api/go/ledger/transaction/v1;transactionv1b\x06proto3"

var (
	file_meshtrade_ledger_transaction_v1_transaction_state_proto_rawDescOnce sync.Once
	file_meshtrade_ledger_transaction_v1_transaction_state_proto_rawDescData []byte
)

func file_meshtrade_ledger_transaction_v1_transaction_state_proto_rawDescGZIP() []byte {
	file_meshtrade_ledger_transaction_v1_transaction_state_proto_rawDescOnce.Do(func() {
		file_meshtrade_ledger_transaction_v1_transaction_state_proto_rawDescData = protoimpl.X.CompressGZIP(unsafe.Slice(unsafe.StringData(file_meshtrade_ledger_transaction_v1_transaction_state_proto_rawDesc), len(file_meshtrade_ledger_transaction_v1_transaction_state_proto_rawDesc)))
	})
	return file_meshtrade_ledger_transaction_v1_transaction_state_proto_rawDescData
}

var file_meshtrade_ledger_transaction_v1_transaction_state_proto_enumTypes = make([]protoimpl.EnumInfo, 1)
var file_meshtrade_ledger_transaction_v1_transaction_state_proto_goTypes = []any{
	(TransactionState)(0), // 0: meshtrade.ledger.transaction.v1.TransactionState
}
var file_meshtrade_ledger_transaction_v1_transaction_state_proto_depIdxs = []int32{
	0, // [0:0] is the sub-list for method output_type
	0, // [0:0] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_meshtrade_ledger_transaction_v1_transaction_state_proto_init() }
func file_meshtrade_ledger_transaction_v1_transaction_state_proto_init() {
	if File_meshtrade_ledger_transaction_v1_transaction_state_proto != nil {
		return
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: unsafe.Slice(unsafe.StringData(file_meshtrade_ledger_transaction_v1_transaction_state_proto_rawDesc), len(file_meshtrade_ledger_transaction_v1_transaction_state_proto_rawDesc)),
			NumEnums:      1,
			NumMessages:   0,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_meshtrade_ledger_transaction_v1_transaction_state_proto_goTypes,
		DependencyIndexes: file_meshtrade_ledger_transaction_v1_transaction_state_proto_depIdxs,
		EnumInfos:         file_meshtrade_ledger_transaction_v1_transaction_state_proto_enumTypes,
	}.Build()
	File_meshtrade_ledger_transaction_v1_transaction_state_proto = out.File
	file_meshtrade_ledger_transaction_v1_transaction_state_proto_goTypes = nil
	file_meshtrade_ledger_transaction_v1_transaction_state_proto_depIdxs = nil
}

// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.36.6
// 	protoc        (unknown)
// source: meshtrade/compliance/client/v1/verification_status.proto

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

// VerificationStatus defines the possible states of a KYC/KYB verification process.
type VerificationStatus int32

const (
	// Unknown or not specified.
	// This is a default value to prevent accidental assignment and should not be used.
	VerificationStatus_VERIFICATION_STATUS_UNSPECIFIED VerificationStatus = 0
	// No verification has been initiated yet, or no information has been submitted.
	// This is the initial state for a new client.
	VerificationStatus_VERIFICATION_STATUS_NOT_STARTED VerificationStatus = 1
	// The client has submitted their information, and it is pending review.
	// The client should wait for the review to be completed.
	VerificationStatus_VERIFICATION_STATUS_PENDING VerificationStatus = 2
	// The client's information has been successfully reviewed and verified.
	VerificationStatus_VERIFICATION_STATUS_VERIFIED VerificationStatus = 3
	// The verification has failed. This could be due to invalid documents,
	// mismatched information, or other compliance reasons. The client may need
	// to resubmit information.
	VerificationStatus_VERIFICATION_STATUS_FAILED VerificationStatus = 4
)

// Enum value maps for VerificationStatus.
var (
	VerificationStatus_name = map[int32]string{
		0: "VERIFICATION_STATUS_UNSPECIFIED",
		1: "VERIFICATION_STATUS_NOT_STARTED",
		2: "VERIFICATION_STATUS_PENDING",
		3: "VERIFICATION_STATUS_VERIFIED",
		4: "VERIFICATION_STATUS_FAILED",
	}
	VerificationStatus_value = map[string]int32{
		"VERIFICATION_STATUS_UNSPECIFIED": 0,
		"VERIFICATION_STATUS_NOT_STARTED": 1,
		"VERIFICATION_STATUS_PENDING":     2,
		"VERIFICATION_STATUS_VERIFIED":    3,
		"VERIFICATION_STATUS_FAILED":      4,
	}
)

func (x VerificationStatus) Enum() *VerificationStatus {
	p := new(VerificationStatus)
	*p = x
	return p
}

func (x VerificationStatus) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (VerificationStatus) Descriptor() protoreflect.EnumDescriptor {
	return file_meshtrade_compliance_client_v1_verification_status_proto_enumTypes[0].Descriptor()
}

func (VerificationStatus) Type() protoreflect.EnumType {
	return &file_meshtrade_compliance_client_v1_verification_status_proto_enumTypes[0]
}

func (x VerificationStatus) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use VerificationStatus.Descriptor instead.
func (VerificationStatus) EnumDescriptor() ([]byte, []int) {
	return file_meshtrade_compliance_client_v1_verification_status_proto_rawDescGZIP(), []int{0}
}

var File_meshtrade_compliance_client_v1_verification_status_proto protoreflect.FileDescriptor

const file_meshtrade_compliance_client_v1_verification_status_proto_rawDesc = "" +
	"\n" +
	"8meshtrade/compliance/client/v1/verification_status.proto\x12\x1emeshtrade.compliance.client.v1*\xc1\x01\n" +
	"\x12VerificationStatus\x12#\n" +
	"\x1fVERIFICATION_STATUS_UNSPECIFIED\x10\x00\x12#\n" +
	"\x1fVERIFICATION_STATUS_NOT_STARTED\x10\x01\x12\x1f\n" +
	"\x1bVERIFICATION_STATUS_PENDING\x10\x02\x12 \n" +
	"\x1cVERIFICATION_STATUS_VERIFIED\x10\x03\x12\x1e\n" +
	"\x1aVERIFICATION_STATUS_FAILED\x10\x04B;Z9github.com/meshtrade/api/go/compliance/client/v1;clientv1b\x06proto3"

var (
	file_meshtrade_compliance_client_v1_verification_status_proto_rawDescOnce sync.Once
	file_meshtrade_compliance_client_v1_verification_status_proto_rawDescData []byte
)

func file_meshtrade_compliance_client_v1_verification_status_proto_rawDescGZIP() []byte {
	file_meshtrade_compliance_client_v1_verification_status_proto_rawDescOnce.Do(func() {
		file_meshtrade_compliance_client_v1_verification_status_proto_rawDescData = protoimpl.X.CompressGZIP(unsafe.Slice(unsafe.StringData(file_meshtrade_compliance_client_v1_verification_status_proto_rawDesc), len(file_meshtrade_compliance_client_v1_verification_status_proto_rawDesc)))
	})
	return file_meshtrade_compliance_client_v1_verification_status_proto_rawDescData
}

var file_meshtrade_compliance_client_v1_verification_status_proto_enumTypes = make([]protoimpl.EnumInfo, 1)
var file_meshtrade_compliance_client_v1_verification_status_proto_goTypes = []any{
	(VerificationStatus)(0), // 0: meshtrade.compliance.client.v1.VerificationStatus
}
var file_meshtrade_compliance_client_v1_verification_status_proto_depIdxs = []int32{
	0, // [0:0] is the sub-list for method output_type
	0, // [0:0] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_meshtrade_compliance_client_v1_verification_status_proto_init() }
func file_meshtrade_compliance_client_v1_verification_status_proto_init() {
	if File_meshtrade_compliance_client_v1_verification_status_proto != nil {
		return
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: unsafe.Slice(unsafe.StringData(file_meshtrade_compliance_client_v1_verification_status_proto_rawDesc), len(file_meshtrade_compliance_client_v1_verification_status_proto_rawDesc)),
			NumEnums:      1,
			NumMessages:   0,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_meshtrade_compliance_client_v1_verification_status_proto_goTypes,
		DependencyIndexes: file_meshtrade_compliance_client_v1_verification_status_proto_depIdxs,
		EnumInfos:         file_meshtrade_compliance_client_v1_verification_status_proto_enumTypes,
	}.Build()
	File_meshtrade_compliance_client_v1_verification_status_proto = out.File
	file_meshtrade_compliance_client_v1_verification_status_proto_goTypes = nil
	file_meshtrade_compliance_client_v1_verification_status_proto_depIdxs = nil
}

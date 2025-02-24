// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.33.0
// 	protoc        v5.28.0
// source: instrument/fee/service.proto

package fee

import (
	ledger "github.com/meshtrade/api/go/ledger"
	search "github.com/meshtrade/api/go/search"
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

// GetRequest is the Get method request on the Fee Service.
type GetRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Criteria is the search criteria that specifies which Fee to retrieve.
	Criteria []*search.Criterion `protobuf:"bytes,1,rep,name=criteria,proto3" json:"criteria,omitempty"`
}

func (x *GetRequest) Reset() {
	*x = GetRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_instrument_fee_service_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetRequest) ProtoMessage() {}

func (x *GetRequest) ProtoReflect() protoreflect.Message {
	mi := &file_instrument_fee_service_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetRequest.ProtoReflect.Descriptor instead.
func (*GetRequest) Descriptor() ([]byte, []int) {
	return file_instrument_fee_service_proto_rawDescGZIP(), []int{0}
}

func (x *GetRequest) GetCriteria() []*search.Criterion {
	if x != nil {
		return x.Criteria
	}
	return nil
}

// GetResponse is the Get method response on the Fee Service.
type GetResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Fee is the Fee that was retrieved.
	Fee *Fee `protobuf:"bytes,1,opt,name=fee,proto3" json:"fee,omitempty"`
}

func (x *GetResponse) Reset() {
	*x = GetResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_instrument_fee_service_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetResponse) ProtoMessage() {}

func (x *GetResponse) ProtoReflect() protoreflect.Message {
	mi := &file_instrument_fee_service_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetResponse.ProtoReflect.Descriptor instead.
func (*GetResponse) Descriptor() ([]byte, []int) {
	return file_instrument_fee_service_proto_rawDescGZIP(), []int{1}
}

func (x *GetResponse) GetFee() *Fee {
	if x != nil {
		return x.Fee
	}
	return nil
}

// ListRequest is the List method request on the Fee Service.
type ListRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Criteria is the search criteria that specifies which fees to retrieve.
	Criteria []*search.Criterion `protobuf:"bytes,1,rep,name=criteria,proto3" json:"criteria,omitempty"`
}

func (x *ListRequest) Reset() {
	*x = ListRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_instrument_fee_service_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ListRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ListRequest) ProtoMessage() {}

func (x *ListRequest) ProtoReflect() protoreflect.Message {
	mi := &file_instrument_fee_service_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ListRequest.ProtoReflect.Descriptor instead.
func (*ListRequest) Descriptor() ([]byte, []int) {
	return file_instrument_fee_service_proto_rawDescGZIP(), []int{2}
}

func (x *ListRequest) GetCriteria() []*search.Criterion {
	if x != nil {
		return x.Criteria
	}
	return nil
}

// ListResponse is the List method response on the Fee Service.
type ListResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Fees are the list of fees that were retrieved.
	Fees []*Fee `protobuf:"bytes,1,rep,name=fees,proto3" json:"fees,omitempty"`
}

func (x *ListResponse) Reset() {
	*x = ListResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_instrument_fee_service_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ListResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ListResponse) ProtoMessage() {}

func (x *ListResponse) ProtoReflect() protoreflect.Message {
	mi := &file_instrument_fee_service_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ListResponse.ProtoReflect.Descriptor instead.
func (*ListResponse) Descriptor() ([]byte, []int) {
	return file_instrument_fee_service_proto_rawDescGZIP(), []int{3}
}

func (x *ListResponse) GetFees() []*Fee {
	if x != nil {
		return x.Fees
	}
	return nil
}

// CalculateMintingFeesRequest is the CalculateMintingFees method request on the Fee Service.
type CalculateMintingFeesRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Amount is the mint Amount for which fees are calculated.
	Amount *ledger.Amount `protobuf:"bytes,1,opt,name=Amount,proto3" json:"Amount,omitempty"`
}

func (x *CalculateMintingFeesRequest) Reset() {
	*x = CalculateMintingFeesRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_instrument_fee_service_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CalculateMintingFeesRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CalculateMintingFeesRequest) ProtoMessage() {}

func (x *CalculateMintingFeesRequest) ProtoReflect() protoreflect.Message {
	mi := &file_instrument_fee_service_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CalculateMintingFeesRequest.ProtoReflect.Descriptor instead.
func (*CalculateMintingFeesRequest) Descriptor() ([]byte, []int) {
	return file_instrument_fee_service_proto_rawDescGZIP(), []int{4}
}

func (x *CalculateMintingFeesRequest) GetAmount() *ledger.Amount {
	if x != nil {
		return x.Amount
	}
	return nil
}

// CalculateMintingFeesResponse is the CalculateMintingFees method response on the Fee Service.
type CalculateMintingFeesResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Fees are the fees calculated for the requested mint amount.
	Fees []*Fee `protobuf:"bytes,1,rep,name=Fees,proto3" json:"Fees,omitempty"`
}

func (x *CalculateMintingFeesResponse) Reset() {
	*x = CalculateMintingFeesResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_instrument_fee_service_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CalculateMintingFeesResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CalculateMintingFeesResponse) ProtoMessage() {}

func (x *CalculateMintingFeesResponse) ProtoReflect() protoreflect.Message {
	mi := &file_instrument_fee_service_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CalculateMintingFeesResponse.ProtoReflect.Descriptor instead.
func (*CalculateMintingFeesResponse) Descriptor() ([]byte, []int) {
	return file_instrument_fee_service_proto_rawDescGZIP(), []int{5}
}

func (x *CalculateMintingFeesResponse) GetFees() []*Fee {
	if x != nil {
		return x.Fees
	}
	return nil
}

// CalculateBurningFeesRequest is the CalculateBurningFees method request on the Fee Service.
type CalculateBurningFeesRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Amount is the burn Amount for which fees are calculated.
	Amount *ledger.Amount `protobuf:"bytes,1,opt,name=Amount,proto3" json:"Amount,omitempty"`
}

func (x *CalculateBurningFeesRequest) Reset() {
	*x = CalculateBurningFeesRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_instrument_fee_service_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CalculateBurningFeesRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CalculateBurningFeesRequest) ProtoMessage() {}

func (x *CalculateBurningFeesRequest) ProtoReflect() protoreflect.Message {
	mi := &file_instrument_fee_service_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CalculateBurningFeesRequest.ProtoReflect.Descriptor instead.
func (*CalculateBurningFeesRequest) Descriptor() ([]byte, []int) {
	return file_instrument_fee_service_proto_rawDescGZIP(), []int{6}
}

func (x *CalculateBurningFeesRequest) GetAmount() *ledger.Amount {
	if x != nil {
		return x.Amount
	}
	return nil
}

// CalculateBurningFeesResponse is the CalculateBurningFees method response on the Fee Service.
type CalculateBurningFeesResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Fees are the fees calculated for the requested burn amount.
	Fees []*Fee `protobuf:"bytes,1,rep,name=Fees,proto3" json:"Fees,omitempty"`
}

func (x *CalculateBurningFeesResponse) Reset() {
	*x = CalculateBurningFeesResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_instrument_fee_service_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CalculateBurningFeesResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CalculateBurningFeesResponse) ProtoMessage() {}

func (x *CalculateBurningFeesResponse) ProtoReflect() protoreflect.Message {
	mi := &file_instrument_fee_service_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CalculateBurningFeesResponse.ProtoReflect.Descriptor instead.
func (*CalculateBurningFeesResponse) Descriptor() ([]byte, []int) {
	return file_instrument_fee_service_proto_rawDescGZIP(), []int{7}
}

func (x *CalculateBurningFeesResponse) GetFees() []*Fee {
	if x != nil {
		return x.Fees
	}
	return nil
}

var File_instrument_fee_service_proto protoreflect.FileDescriptor

var file_instrument_fee_service_proto_rawDesc = []byte{
	0x0a, 0x1c, 0x69, 0x6e, 0x73, 0x74, 0x72, 0x75, 0x6d, 0x65, 0x6e, 0x74, 0x2f, 0x66, 0x65, 0x65,
	0x2f, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x03,
	0x66, 0x65, 0x65, 0x1a, 0x18, 0x69, 0x6e, 0x73, 0x74, 0x72, 0x75, 0x6d, 0x65, 0x6e, 0x74, 0x2f,
	0x66, 0x65, 0x65, 0x2f, 0x66, 0x65, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x13, 0x6c,
	0x65, 0x64, 0x67, 0x65, 0x72, 0x2f, 0x61, 0x6d, 0x6f, 0x75, 0x6e, 0x74, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x1a, 0x16, 0x73, 0x65, 0x61, 0x72, 0x63, 0x68, 0x2f, 0x63, 0x72, 0x69, 0x74, 0x65,
	0x72, 0x69, 0x6f, 0x6e, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0x3b, 0x0a, 0x0a, 0x47, 0x65,
	0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x2d, 0x0a, 0x08, 0x63, 0x72, 0x69, 0x74,
	0x65, 0x72, 0x69, 0x61, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x11, 0x2e, 0x73, 0x65, 0x61,
	0x72, 0x63, 0x68, 0x2e, 0x43, 0x72, 0x69, 0x74, 0x65, 0x72, 0x69, 0x6f, 0x6e, 0x52, 0x08, 0x63,
	0x72, 0x69, 0x74, 0x65, 0x72, 0x69, 0x61, 0x22, 0x29, 0x0a, 0x0b, 0x47, 0x65, 0x74, 0x52, 0x65,
	0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x1a, 0x0a, 0x03, 0x66, 0x65, 0x65, 0x18, 0x01, 0x20,
	0x01, 0x28, 0x0b, 0x32, 0x08, 0x2e, 0x66, 0x65, 0x65, 0x2e, 0x46, 0x65, 0x65, 0x52, 0x03, 0x66,
	0x65, 0x65, 0x22, 0x3c, 0x0a, 0x0b, 0x4c, 0x69, 0x73, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x12, 0x2d, 0x0a, 0x08, 0x63, 0x72, 0x69, 0x74, 0x65, 0x72, 0x69, 0x61, 0x18, 0x01, 0x20,
	0x03, 0x28, 0x0b, 0x32, 0x11, 0x2e, 0x73, 0x65, 0x61, 0x72, 0x63, 0x68, 0x2e, 0x43, 0x72, 0x69,
	0x74, 0x65, 0x72, 0x69, 0x6f, 0x6e, 0x52, 0x08, 0x63, 0x72, 0x69, 0x74, 0x65, 0x72, 0x69, 0x61,
	0x22, 0x2c, 0x0a, 0x0c, 0x4c, 0x69, 0x73, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65,
	0x12, 0x1c, 0x0a, 0x04, 0x66, 0x65, 0x65, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x08,
	0x2e, 0x66, 0x65, 0x65, 0x2e, 0x46, 0x65, 0x65, 0x52, 0x04, 0x66, 0x65, 0x65, 0x73, 0x22, 0x45,
	0x0a, 0x1b, 0x43, 0x61, 0x6c, 0x63, 0x75, 0x6c, 0x61, 0x74, 0x65, 0x4d, 0x69, 0x6e, 0x74, 0x69,
	0x6e, 0x67, 0x46, 0x65, 0x65, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x26, 0x0a,
	0x06, 0x41, 0x6d, 0x6f, 0x75, 0x6e, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0e, 0x2e,
	0x6c, 0x65, 0x64, 0x67, 0x65, 0x72, 0x2e, 0x41, 0x6d, 0x6f, 0x75, 0x6e, 0x74, 0x52, 0x06, 0x41,
	0x6d, 0x6f, 0x75, 0x6e, 0x74, 0x22, 0x3c, 0x0a, 0x1c, 0x43, 0x61, 0x6c, 0x63, 0x75, 0x6c, 0x61,
	0x74, 0x65, 0x4d, 0x69, 0x6e, 0x74, 0x69, 0x6e, 0x67, 0x46, 0x65, 0x65, 0x73, 0x52, 0x65, 0x73,
	0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x1c, 0x0a, 0x04, 0x46, 0x65, 0x65, 0x73, 0x18, 0x01, 0x20,
	0x03, 0x28, 0x0b, 0x32, 0x08, 0x2e, 0x66, 0x65, 0x65, 0x2e, 0x46, 0x65, 0x65, 0x52, 0x04, 0x46,
	0x65, 0x65, 0x73, 0x22, 0x45, 0x0a, 0x1b, 0x43, 0x61, 0x6c, 0x63, 0x75, 0x6c, 0x61, 0x74, 0x65,
	0x42, 0x75, 0x72, 0x6e, 0x69, 0x6e, 0x67, 0x46, 0x65, 0x65, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65,
	0x73, 0x74, 0x12, 0x26, 0x0a, 0x06, 0x41, 0x6d, 0x6f, 0x75, 0x6e, 0x74, 0x18, 0x01, 0x20, 0x01,
	0x28, 0x0b, 0x32, 0x0e, 0x2e, 0x6c, 0x65, 0x64, 0x67, 0x65, 0x72, 0x2e, 0x41, 0x6d, 0x6f, 0x75,
	0x6e, 0x74, 0x52, 0x06, 0x41, 0x6d, 0x6f, 0x75, 0x6e, 0x74, 0x22, 0x3c, 0x0a, 0x1c, 0x43, 0x61,
	0x6c, 0x63, 0x75, 0x6c, 0x61, 0x74, 0x65, 0x42, 0x75, 0x72, 0x6e, 0x69, 0x6e, 0x67, 0x46, 0x65,
	0x65, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x1c, 0x0a, 0x04, 0x46, 0x65,
	0x65, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x08, 0x2e, 0x66, 0x65, 0x65, 0x2e, 0x46,
	0x65, 0x65, 0x52, 0x04, 0x46, 0x65, 0x65, 0x73, 0x32, 0x9a, 0x02, 0x0a, 0x07, 0x53, 0x65, 0x72,
	0x76, 0x69, 0x63, 0x65, 0x12, 0x28, 0x0a, 0x03, 0x47, 0x65, 0x74, 0x12, 0x0f, 0x2e, 0x66, 0x65,
	0x65, 0x2e, 0x47, 0x65, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x10, 0x2e, 0x66,
	0x65, 0x65, 0x2e, 0x47, 0x65, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x2b,
	0x0a, 0x04, 0x4c, 0x69, 0x73, 0x74, 0x12, 0x10, 0x2e, 0x66, 0x65, 0x65, 0x2e, 0x4c, 0x69, 0x73,
	0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x11, 0x2e, 0x66, 0x65, 0x65, 0x2e, 0x4c,
	0x69, 0x73, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x5b, 0x0a, 0x14, 0x43,
	0x61, 0x6c, 0x63, 0x75, 0x6c, 0x61, 0x74, 0x65, 0x4d, 0x69, 0x6e, 0x74, 0x69, 0x6e, 0x67, 0x46,
	0x65, 0x65, 0x73, 0x12, 0x20, 0x2e, 0x66, 0x65, 0x65, 0x2e, 0x43, 0x61, 0x6c, 0x63, 0x75, 0x6c,
	0x61, 0x74, 0x65, 0x4d, 0x69, 0x6e, 0x74, 0x69, 0x6e, 0x67, 0x46, 0x65, 0x65, 0x73, 0x52, 0x65,
	0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x21, 0x2e, 0x66, 0x65, 0x65, 0x2e, 0x43, 0x61, 0x6c, 0x63,
	0x75, 0x6c, 0x61, 0x74, 0x65, 0x4d, 0x69, 0x6e, 0x74, 0x69, 0x6e, 0x67, 0x46, 0x65, 0x65, 0x73,
	0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x5b, 0x0a, 0x14, 0x43, 0x61, 0x6c, 0x63,
	0x75, 0x6c, 0x61, 0x74, 0x65, 0x42, 0x75, 0x72, 0x6e, 0x69, 0x6e, 0x67, 0x46, 0x65, 0x65, 0x73,
	0x12, 0x20, 0x2e, 0x66, 0x65, 0x65, 0x2e, 0x43, 0x61, 0x6c, 0x63, 0x75, 0x6c, 0x61, 0x74, 0x65,
	0x42, 0x75, 0x72, 0x6e, 0x69, 0x6e, 0x67, 0x46, 0x65, 0x65, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65,
	0x73, 0x74, 0x1a, 0x21, 0x2e, 0x66, 0x65, 0x65, 0x2e, 0x43, 0x61, 0x6c, 0x63, 0x75, 0x6c, 0x61,
	0x74, 0x65, 0x42, 0x75, 0x72, 0x6e, 0x69, 0x6e, 0x67, 0x46, 0x65, 0x65, 0x73, 0x52, 0x65, 0x73,
	0x70, 0x6f, 0x6e, 0x73, 0x65, 0x42, 0x2c, 0x5a, 0x2a, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e,
	0x63, 0x6f, 0x6d, 0x2f, 0x6d, 0x65, 0x73, 0x68, 0x74, 0x72, 0x61, 0x64, 0x65, 0x2f, 0x61, 0x70,
	0x69, 0x2f, 0x67, 0x6f, 0x2f, 0x69, 0x6e, 0x73, 0x74, 0x72, 0x75, 0x6d, 0x65, 0x6e, 0x74, 0x2f,
	0x66, 0x65, 0x65, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_instrument_fee_service_proto_rawDescOnce sync.Once
	file_instrument_fee_service_proto_rawDescData = file_instrument_fee_service_proto_rawDesc
)

func file_instrument_fee_service_proto_rawDescGZIP() []byte {
	file_instrument_fee_service_proto_rawDescOnce.Do(func() {
		file_instrument_fee_service_proto_rawDescData = protoimpl.X.CompressGZIP(file_instrument_fee_service_proto_rawDescData)
	})
	return file_instrument_fee_service_proto_rawDescData
}

var file_instrument_fee_service_proto_msgTypes = make([]protoimpl.MessageInfo, 8)
var file_instrument_fee_service_proto_goTypes = []interface{}{
	(*GetRequest)(nil),                   // 0: fee.GetRequest
	(*GetResponse)(nil),                  // 1: fee.GetResponse
	(*ListRequest)(nil),                  // 2: fee.ListRequest
	(*ListResponse)(nil),                 // 3: fee.ListResponse
	(*CalculateMintingFeesRequest)(nil),  // 4: fee.CalculateMintingFeesRequest
	(*CalculateMintingFeesResponse)(nil), // 5: fee.CalculateMintingFeesResponse
	(*CalculateBurningFeesRequest)(nil),  // 6: fee.CalculateBurningFeesRequest
	(*CalculateBurningFeesResponse)(nil), // 7: fee.CalculateBurningFeesResponse
	(*search.Criterion)(nil),             // 8: search.Criterion
	(*Fee)(nil),                          // 9: fee.Fee
	(*ledger.Amount)(nil),                // 10: ledger.Amount
}
var file_instrument_fee_service_proto_depIdxs = []int32{
	8,  // 0: fee.GetRequest.criteria:type_name -> search.Criterion
	9,  // 1: fee.GetResponse.fee:type_name -> fee.Fee
	8,  // 2: fee.ListRequest.criteria:type_name -> search.Criterion
	9,  // 3: fee.ListResponse.fees:type_name -> fee.Fee
	10, // 4: fee.CalculateMintingFeesRequest.Amount:type_name -> ledger.Amount
	9,  // 5: fee.CalculateMintingFeesResponse.Fees:type_name -> fee.Fee
	10, // 6: fee.CalculateBurningFeesRequest.Amount:type_name -> ledger.Amount
	9,  // 7: fee.CalculateBurningFeesResponse.Fees:type_name -> fee.Fee
	0,  // 8: fee.Service.Get:input_type -> fee.GetRequest
	2,  // 9: fee.Service.List:input_type -> fee.ListRequest
	4,  // 10: fee.Service.CalculateMintingFees:input_type -> fee.CalculateMintingFeesRequest
	6,  // 11: fee.Service.CalculateBurningFees:input_type -> fee.CalculateBurningFeesRequest
	1,  // 12: fee.Service.Get:output_type -> fee.GetResponse
	3,  // 13: fee.Service.List:output_type -> fee.ListResponse
	5,  // 14: fee.Service.CalculateMintingFees:output_type -> fee.CalculateMintingFeesResponse
	7,  // 15: fee.Service.CalculateBurningFees:output_type -> fee.CalculateBurningFeesResponse
	12, // [12:16] is the sub-list for method output_type
	8,  // [8:12] is the sub-list for method input_type
	8,  // [8:8] is the sub-list for extension type_name
	8,  // [8:8] is the sub-list for extension extendee
	0,  // [0:8] is the sub-list for field type_name
}

func init() { file_instrument_fee_service_proto_init() }
func file_instrument_fee_service_proto_init() {
	if File_instrument_fee_service_proto != nil {
		return
	}
	file_instrument_fee_fee_proto_init()
	if !protoimpl.UnsafeEnabled {
		file_instrument_fee_service_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetRequest); i {
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
		file_instrument_fee_service_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetResponse); i {
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
		file_instrument_fee_service_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ListRequest); i {
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
		file_instrument_fee_service_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ListResponse); i {
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
		file_instrument_fee_service_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CalculateMintingFeesRequest); i {
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
		file_instrument_fee_service_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CalculateMintingFeesResponse); i {
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
		file_instrument_fee_service_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CalculateBurningFeesRequest); i {
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
		file_instrument_fee_service_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CalculateBurningFeesResponse); i {
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
			RawDescriptor: file_instrument_fee_service_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   8,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_instrument_fee_service_proto_goTypes,
		DependencyIndexes: file_instrument_fee_service_proto_depIdxs,
		MessageInfos:      file_instrument_fee_service_proto_msgTypes,
	}.Build()
	File_instrument_fee_service_proto = out.File
	file_instrument_fee_service_proto_rawDesc = nil
	file_instrument_fee_service_proto_goTypes = nil
	file_instrument_fee_service_proto_depIdxs = nil
}

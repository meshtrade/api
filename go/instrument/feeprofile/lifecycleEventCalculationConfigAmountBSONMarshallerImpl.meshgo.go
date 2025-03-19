// Code generated by protoc-gen-meshgo. DO NOT EDIT.
// source: api/proto/instrument/feeprofile/lifecycleEventCalculationConfigAmount.proto
package feeprofile

import (
	fmt "fmt"
	bson "go.mongodb.org/mongo-driver/bson"
	bsontype "go.mongodb.org/mongo-driver/bson/bsontype"
)

// amountLifecycleEventCalculationConfigBSONAtTypeName is the annotation used when marshalling a AmountLifecycleEventCalculationConfig to BSON for mongo db persistence
const amountLifecycleEventCalculationConfigBSONAtTypeName = "mesh::feeprofile/AmountLifecycleEventCalculationConfig"

// Ensure that AmountLifecycleEventCalculationConfig implements the bson.Marshaler interface
var _ bson.Marshaler = &AmountLifecycleEventCalculationConfig{}

// MarshalBSONValue is called to marshal AmountLifecycleEventCalculationConfig when it is embedded as a field in another struct.
// This behaviour is overridden to get desired nil behaviour.
func (a *AmountLifecycleEventCalculationConfig) MarshalBSONValue() (bsontype.Type, []byte, error) {
	// if this AmountLifecycleEventCalculationConfig is nil then return the bson null type and no data
	if a == nil {
		return bson.TypeNull, nil, nil
	}

	// otherwise call the MarshalBSON method to get data and a possible error
	bsonData, err := a.MarshalBSON()

	// then return the bson embedded document type along with the associated data and error
	return bson.TypeEmbeddedDocument, bsonData, err
}

// MarshalBSON controls the marshalling of a AmountLifecycleEventCalculationConfig to BSON for persistence to mongo db
func (a *AmountLifecycleEventCalculationConfig) MarshalBSON() ([]byte, error) {
	type Alias AmountLifecycleEventCalculationConfig
	return bson.Marshal(struct {
		AtType string `bson:"@type"`
		Alias  `bson:"inline"`
	}{
		AtType: amountLifecycleEventCalculationConfigBSONAtTypeName,
		Alias:  Alias(*a),
	})
}

// Ensure that AmountLifecycleEventCalculationConfig implements the bson.Unmarshaler interface
var _ bson.Unmarshaler = &AmountLifecycleEventCalculationConfig{}

// MarshalBSON controls the unmarshalling of a AmountLifecycleEventCalculationConfig from BSON
func (a *AmountLifecycleEventCalculationConfig) UnmarshalBSON(data []byte) error {
	// prepare marshalled type to unmarshall into
	type Alias AmountLifecycleEventCalculationConfig
	var marshalled = struct {
		Alias `bson:"inline"`
	}{}

	// perform unmarshal
	if err := bson.Unmarshal(data, &marshalled); err != nil {
		return fmt.Errorf("error unmarshalling AmountLifecycleEventCalculationConfig: %w", err)
	}

	// set alias fields
	*a = AmountLifecycleEventCalculationConfig(marshalled.Alias)

	// set overridden fields

	return nil
}

// Code generated by protoc-gen-meshgo. DO NOT EDIT.
// source: api/proto/instrument/feeprofile/lifecycleEventCalculationConfigRate.proto
package feeprofile

import (
	fmt "fmt"
	bson "go.mongodb.org/mongo-driver/bson"
	bsontype "go.mongodb.org/mongo-driver/bson/bsontype"
)

// rateLifecycleEventCalculationConfigBSONAtTypeName is the annotation used when marshalling a RateLifecycleEventCalculationConfig to BSON for mongo db persistence
const rateLifecycleEventCalculationConfigBSONAtTypeName = "mesh::feeprofile/RateLifecycleEventCalculationConfig"

// Ensure that RateLifecycleEventCalculationConfig implements the bson.Marshaler interface
var _ bson.Marshaler = &RateLifecycleEventCalculationConfig{}

// MarshalBSONValue is called to marshal RateLifecycleEventCalculationConfig when it is embedded as a field in another struct.
// This behaviour is overridden to get desired nil behaviour.
func (r *RateLifecycleEventCalculationConfig) MarshalBSONValue() (bsontype.Type, []byte, error) {
	// if this RateLifecycleEventCalculationConfig is nil then return the bson null type and no data
	if r == nil {
		return bsontype.Null, nil, nil
	}

	// otherwise call the MarshalBSON method to get data and a possible error
	bsonData, err := r.MarshalBSON()

	// then return the bson embedded document type along with the associated data and error
	return bsontype.EmbeddedDocument, bsonData, err
}

// MarshalBSON controls the marshalling of a RateLifecycleEventCalculationConfig to BSON for persistence to mongo db
func (r *RateLifecycleEventCalculationConfig) MarshalBSON() ([]byte, error) {
	type Alias RateLifecycleEventCalculationConfig
	return bson.Marshal(struct {
		AtType string `bson:"@type"`
		Alias  `bson:"inline"`
	}{
		AtType: rateLifecycleEventCalculationConfigBSONAtTypeName,
		Alias:  Alias(*r),
	})
}

// Ensure that RateLifecycleEventCalculationConfig implements the bson.Unmarshaler interface
var _ bson.Unmarshaler = &RateLifecycleEventCalculationConfig{}

// MarshalBSON controls the unmarshalling of a RateLifecycleEventCalculationConfig from BSON
func (r *RateLifecycleEventCalculationConfig) UnmarshalBSON(data []byte) error {
	// prepare marshalled type to unmarshall into
	type Alias RateLifecycleEventCalculationConfig
	var marshalled = struct {
		Alias `bson:"inline"`
	}{}

	// perform unmarshal
	if err := bson.Unmarshal(data, &marshalled); err != nil {
		return fmt.Errorf("error unmarshalling RateLifecycleEventCalculationConfig: %w", err)
	}

	// set alias fields
	*r = RateLifecycleEventCalculationConfig(marshalled.Alias)

	// set overridden fields

	return nil
}

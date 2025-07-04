package generate

import (
	"fmt"
	"strings"
	"unicode"

	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/reflect/protoreflect"
)

func FirstLetterToLowercase(input string) string {
	if len(input) == 0 {
		return input
	}

	r := []rune(input)
	r[0] = unicode.ToLower(r[0])

	return string(r)
}

func FirstLetterToUppercase(input string) string {
	if len(input) == 0 {
		return input
	}

	r := []rune(input)
	r[0] = unicode.ToUpper(r[0])

	return string(r)
}

func ChangeProtoPathToGoPath(inputPath string) string {
	return strings.ReplaceAll(
		inputPath,
		"api/proto",
		"api/go",
	)
}

// IsInterfaceFieldType returns if this field type is an interface
func IsInterfaceFieldType(field *protogen.Field) bool {
	// This field is an interface if:
	// The field is of a Message type AND
	return field.Message != nil &&
		// The message type has 1 OneOf field AND
		len(field.Message.Oneofs) == 1 &&
		// The number of fields in the message is equal to the number of fields in the OneOf (i.e. no other fields)
		len(field.Message.Oneofs[0].Fields) == len(field.Message.Fields)
}

// IsInterfaceFieldType returns if this field type is an interface
func IsInterfaceMessageType(message *protogen.Message) bool {
	// This message is an interface if:
	// The message contains OneOf fields
	return len(message.Oneofs) == 1 && // AND
		// The number of fields in the message is equal to the number of fields in the OneOf (i.e. no other fields)
		len(message.Oneofs[0].Fields) == len(message.Fields)
}

// FieldGoType determines the Go type for a given Protobuf field.
// It handles different kinds of fields: scalar, enum, message, repeated (list), and map.
// Returns the Go type as a string and an error if the field type is unexpected or unsupported.
func FieldGoType(field *protogen.Field, g *protogen.GeneratedFile) (string, protogen.GoIdent, error) {
	// Handle map fields. Maps in Protobuf are represented as repeated message fields
	// with specific constraints. Here, we extract the key and value types of the map.
	if field.Desc.IsMap() {
		keyField := field.Message.Fields[0]   // The key field of the map
		valueField := field.Message.Fields[1] // The value field of the map

		// Determine the Go type for the key, which should be a scalar type.
		keyType, err := scalarGoType(keyField)
		if err != nil {
			return "",
				protogen.GoIdent{},
				fmt.Errorf("error getting scalar type of map key: %w", err)
		}

		// Recursively determine the Go type for the value field.
		valueType, goIdent, err := FieldGoType(valueField, g)
		if err != nil {
			return "",
				protogen.GoIdent{},
				fmt.Errorf("error getting type of map value: %w", err)
		}

		// construct and return the go map type, with the goIdent for the value type
		return fmt.Sprintf("map[%s]%s", keyType, valueType), goIdent, nil
	}

	// Handle repeated (list) fields. This case uses recursion to support
	// repeated fields of any type (e.g., repeated enums, messages, scalars).
	if field.Desc.IsList() {
		var elementType string
		var err error

		if field.Desc.Kind() == protoreflect.MessageKind {
			// FIXME: does this work?
			// If the elements are messages
			//elementType, err = FieldGoType(&protogen.Field{
			//	Message: field.Message,
			//}, g)
			elementType = string(field.Message.Desc.FullName())
		} else if field.Desc.Kind() == protoreflect.EnumKind {
			elementType = "Enum"
		} else {
			// For scalar types within a list
			elementType, err = scalarGoType(field)
		}
		if err != nil {
			return "", protogen.GoIdent{}, err
		}

		return "[]" + elementType, protogen.GoIdent{}, nil
	}

	// Handle enum fields. Simply use the Go identifier for the enum.
	if field.Enum != nil {
		return field.Enum.GoIdent.GoName, protogen.GoIdent{}, nil
	}

	// Handle message fields, including well-known types like google.protobuf.Timestamp.
	if field.Message != nil {
		fullName := string(field.Message.Desc.FullName())
		switch fullName {
		case "google.protobuf.Timestamp":
			return fullName, TimestampPackage.Ident("Timestamp"), nil

		default:
			return fullName, protogen.GoIdent{}, nil
		}
	}

	// if execution reaches here then it is assumed that the field type is a scalar
	scalarType, err := scalarGoType(field)
	if err != nil {
		return "", protogen.GoIdent{}, err
	}
	return scalarType, protogen.GoIdent{}, nil
}

// scalarGoType determines the Go type for a scalar Protobuf field.
// It maps Protobuf scalar kinds to corresponding Go types.
// Returns the Go type as a string and an error for unsupported kinds.
func scalarGoType(field *protogen.Field) (string, error) {
	switch field.Desc.Kind() {
	case protoreflect.BoolKind:
		return "bool", nil
	case protoreflect.Int32Kind, protoreflect.Sint32Kind, protoreflect.Uint32Kind:
		return "int32", nil
	case protoreflect.Int64Kind, protoreflect.Sint64Kind, protoreflect.Uint64Kind:
		return "int64", nil
	case protoreflect.FloatKind:
		return "float32", nil
	case protoreflect.DoubleKind:
		return "float64", nil
	case protoreflect.StringKind:
		return "string", nil
	case protoreflect.BytesKind:
		return "[]byte", nil
	// Add cases for other scalar types as needed
	default:
		// Return an error for any unsupported or unexpected scalar kind
		return "", fmt.Errorf("unexpected scalar field kind '%v'", field.Desc.Kind())
	}
}

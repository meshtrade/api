package main

import (
	"fmt"
	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/reflect/protoreflect"
)

func testExtraction(method *protogen.Method) {
	methodOpts := method.Desc.Options()
	if methodOpts == nil {
		fmt.Println("No method options")
		return
	}

	methodDesc := methodOpts.ProtoReflect()
	fmt.Printf("Method options type: %v\n", methodDesc.Descriptor().FullName())
	
	// List all fields
	methodDesc.Range(func(fd protoreflect.FieldDescriptor, v protoreflect.Value) bool {
		fmt.Printf("Field: %v (number=%d, isExtension=%v, fullName=%v)\n", 
			fd.Name(), fd.Number(), fd.IsExtension(), fd.FullName())
		return true
	})
}

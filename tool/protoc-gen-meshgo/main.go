package main

import (
	"fmt"

	"github.com/meshtrade/api/tool/protoc-gen-meshgo/pkg/generate/grpc"
	"github.com/meshtrade/api/tool/protoc-gen-meshgo/pkg/generate/serviceProvider"
	"google.golang.org/protobuf/compiler/protogen"
)

func main() {
	protogen.Options{}.Run(func(p *protogen.Plugin) error {
		return Generate(p)
	})
}

func Generate(p *protogen.Plugin) error {
	for _, f := range p.Files {
		// confirm that file is not to be skipped
		if !f.Generate {
			continue
		}

		// if the file contains services then perform service related code generation
		if len(f.Services) != 0 {
			// confirm that file contains no more than 1 service
			if len(f.Services) > 1 {
				return fmt.Errorf("file '%s' contains more than 1 service", f.Desc.Path())
			}

			// get the 1 service in the file
			svc := f.Services[0]

			// generate the interface file
			if err := serviceProvider.Interface(p, f, svc); err != nil {
				return fmt.Errorf("error generating service provider interface: %w", err)
			}

			// generate the mock implementation
			if err := serviceProvider.Mock(p, f, svc); err != nil {
				return fmt.Errorf("error generating service provider mock: %w", err)
			}

			// generate gRPC client
			if err := grpc.Client(p, f, svc); err != nil {
				return fmt.Errorf("error generating service provider mock gRPC client: %w", err)
			}
		}
	}

	return nil
}

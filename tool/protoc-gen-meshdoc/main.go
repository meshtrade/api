package main

import (
	"fmt"

	"github.com/meshtrade/api/tool/protoc-gen-meshdoc/pkg/generate"
	"google.golang.org/protobuf/compiler/protogen"
)

func main() {
	protogen.Options{}.Run(func(p *protogen.Plugin) error {
		return Generate(p)
	})
}

func Generate(p *protogen.Plugin) error {
	// Track processed packages to avoid duplicate type index generation
	processedPackages := make(map[string]*generate.PackageTypeInfo)
	var allServiceInfos []*generate.ServiceInfo

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
			service := f.Services[0]

			// parse service information
			serviceInfo, err := generate.ParseService(f, service)
			if err != nil {
				return fmt.Errorf("error parsing service in file '%s': %w", f.Desc.Path(), err)
			}

			// generate service documentation
			if err := generate.GenerateServiceDocs(p, serviceInfo); err != nil {
				return fmt.Errorf("error generating service docs for file '%s': %w", f.Desc.Path(), err)
			}

			// collect for navigation generation
			allServiceInfos = append(allServiceInfos, serviceInfo)
		}

		// if the file contains messages or enums then collect type information
		if len(f.Messages) != 0 || len(f.Enums) != 0 {
			// parse package type information
			packageInfo, err := generate.ParsePackageTypes(f)
			if err != nil {
				return fmt.Errorf("error parsing types in file '%s': %w", f.Desc.Path(), err)
			}

			// merge with existing package info or create new
			packageKey := packageInfo.Package
			if existing, exists := processedPackages[packageKey]; exists {
				// merge types from this file into existing package
				existing.Types = append(existing.Types, packageInfo.Types...)
			} else {
				// first time seeing this package
				processedPackages[packageKey] = packageInfo
			}
		}
	}

	// Generate type documentation for each unique package
	for _, packageInfo := range processedPackages {
		if len(packageInfo.Types) > 0 {
			if err := generate.GenerateTypeDocs(p, packageInfo); err != nil {
				return fmt.Errorf("error generating type docs for package %s: %w", packageInfo.Package, err)
			}
		}
	}

	// Generate navigation sidebar
	if err := generate.GenerateNavigation(p, allServiceInfos, processedPackages); err != nil {
		return fmt.Errorf("error generating navigation: %w", err)
	}

	return nil
}
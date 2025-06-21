package generate

import "strings"

// GenerateFilename converts a .proto file name into a new name to be used when generating go files from the proto file
// - @filename should be the path description/name of the proto file (f.Desc.Path())
// - @suffix should be the suffix to add to the filename, i.e. Mock, GRPCClient, etc. Leave empty for no suffix
func GenerateFilename(filename, suffix string) string {
	// remove .proto from filename
	filename = strings.TrimSuffix(filename, ".proto")

	// remove _meshproto from filename
	filename = strings.TrimSuffix(filename, "_meshproto")

	return strings.ReplaceAll(filename, "meshtrade/internal/", "") + suffix + ".meshgo.go"
}

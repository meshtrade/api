module github.com/meshtrade/api/tool/protoc-gen-meshdoc

go 1.24.3

require (
	buf.build/gen/go/bufbuild/protovalidate/protocolbuffers/go v1.36.6-20250613105001-9f2d3c737feb.1
	google.golang.org/protobuf v1.36.6
)

replace github.com/meshtrade/api => ../..

package generate

import "google.golang.org/protobuf/compiler/protogen"

const (
	// Go core packages
	ContextPkg        = protogen.GoImportPath("context")
	IOPkg             = protogen.GoImportPath("io")
	SyncPkg           = protogen.GoImportPath("sync")
	TestingPkg        = protogen.GoImportPath("testing")
	TimePackage       = protogen.GoImportPath("time")
	CryptoRandPackage = protogen.GoImportPath("crypto/rand")
	FmtPackage        = protogen.GoImportPath("fmt")
	ErrorsPackage     = protogen.GoImportPath("errors")
	ReflectPackage    = protogen.GoImportPath("reflect")
	StringsPackage    = protogen.GoImportPath("strings")
	SlogPackage       = protogen.GoImportPath("log/slog")
	Base64Package     = protogen.GoImportPath("encoding/base64")
	// External packages
	TracingPkg         = protogen.GoImportPath("go.opentelemetry.io/otel/trace")
	TracingNoopPkg     = protogen.GoImportPath("go.opentelemetry.io/otel/trace/noop")
	GRPCPkg            = protogen.GoImportPath("google.golang.org/grpc")
	GRPCCredentialsPkg = protogen.GoImportPath("google.golang.org/grpc/credentials")
	GRPCInsecurePkg    = protogen.GoImportPath("google.golang.org/grpc/credentials/insecure")
	GRPCMetadataPkg    = protogen.GoImportPath("google.golang.org/grpc/metadata")
	// Meshtrade API packages
	GRPCClientPkg     = protogen.GoImportPath("github.com/meshtrade/api/go/grpc")
	GRPCConfigPkg     = protogen.GoImportPath("github.com/meshtrade/api/go/grpc/config")
	AuthPkg           = protogen.GoImportPath("github.com/meshtrade/api/go/auth")
	APICredentialsPkg = protogen.GoImportPath("github.com/meshtrade/api/go/iam/api_user/v1")
	// Other packages
	ULIDPackage        = protogen.GoImportPath("github.com/oklog/ulid/v2")
	ZeroLogPackage     = protogen.GoImportPath("github.com/rs/zerolog/log")
	MongoDriverPackage = protogen.GoImportPath("go.mongodb.org/mongo-driver/mongo")
	ErrGroupPackage    = protogen.GoImportPath("golang.org/x/sync/errgroup")
	BSONPackage        = protogen.GoImportPath("go.mongodb.org/mongo-driver/bson")
	JSONPackage        = protogen.GoImportPath("encoding/json")
	TimestampPackage   = protogen.GoImportPath("google.golang.org/protobuf/types/known/timestamppb")
	ProtoPackage       = protogen.GoImportPath("google.golang.org/protobuf/proto")
	ProtoImplPackage   = protogen.GoImportPath("google.golang.org/protobuf/runtime/protoimpl")
	BSONTypePackage    = protogen.GoImportPath("go.mongodb.org/mongo-driver/bson/bsontype")
	// Validation packages
	ProtoValidatePkg   = protogen.GoImportPath("buf.build/go/protovalidate")
)

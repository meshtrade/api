package api_userv1

// options to configure the apiUserServiceGRPCClient
type apiUserServiceGRPCClientOption interface {
	apply(*apiUserServiceGRPCClient) *apiUserServiceGRPCClient
}

// withTLS option
type withTLS struct{ tls bool }

func WithTLS(tls bool) apiUserServiceGRPCClientOption {
	return &withTLS{tls: tls}
}

var _ apiUserServiceGRPCClientOption = &withTLS{}

func (w *withTLS) apply(client *apiUserServiceGRPCClient) *apiUserServiceGRPCClient {
	client.tls = w.tls
	return client
}

// withAccessTokenCookie option
type withAccessTokenCookie struct{ accessTokenCookie string }

func WithAccessTokenCookie(accessTokenCookie string) apiUserServiceGRPCClientOption {
	return &withAccessTokenCookie{accessTokenCookie: accessTokenCookie}
}

var _ apiUserServiceGRPCClientOption = &withAccessTokenCookie{}

func (w *withAccessTokenCookie) apply(client *apiUserServiceGRPCClient) *apiUserServiceGRPCClient {
	client.accessTokenCookie = w.accessTokenCookie
	return client
}

// withAPIKey option
type withAPIKey struct{ apiKey string }

func WithAPIKey(apiKey string) apiUserServiceGRPCClientOption {
	return &withAPIKey{apiKey: apiKey}
}

var _ apiUserServiceGRPCClientOption = &withAPIKey{}

func (w *withAPIKey) apply(client *apiUserServiceGRPCClient) *apiUserServiceGRPCClient {
	client.apiKey = w.apiKey
	return client
}

// withURL option
type withURL struct{ url string }

func WithURL(url string) apiUserServiceGRPCClientOption {
	return &withURL{url: url}
}

var _ apiUserServiceGRPCClientOption = &withURL{}

func (w *withURL) apply(client *apiUserServiceGRPCClient) *apiUserServiceGRPCClient {
	client.url = w.url
	return client
}

// withPort option
type withPort struct{ port int }

func WithPort(port int) apiUserServiceGRPCClientOption {
	return &withPort{port: port}
}

var _ apiUserServiceGRPCClientOption = &withPort{}

func (w *withPort) apply(client *apiUserServiceGRPCClient) *apiUserServiceGRPCClient {
	client.port = w.port
	return client
}

package server

import (
	"context"
	"net/http"

	"cryptobeats.xyz/service/playlist"
	"cryptobeats.xyz/service/user"

	"cryptobeats.xyz/pkg/config"
	"cryptobeats.xyz/pkg/logger"
	"github.com/gorilla/mux"
	"github.com/sirupsen/logrus"
	"go.uber.org/fx"
)

type AppServer struct {
	config     *config.Config
	logger     *logrus.Logger
	httpServer *http.Server
}

func NewAppServer(
	lc fx.Lifecycle,
	config *config.Config,
	playlistService *playlist.Service,
	userService *user.Service,
) *AppServer {
	address := "localhost:8080"
	router := mux.NewRouter()

	// health check
	router.HandleFunc("/", healthCheck)

	apiRouter := router.PathPrefix("/api").Subrouter()
	//apiRouter.Use(csrfMiddleware.Handle, contextMiddleware.GetAuthenticatedRequestContext)
	apiRouter.HandleFunc("/login", userService.HandleSignInOrSignUp).Methods(http.MethodPost)
	apiRouter.HandleFunc("/playlist", playlistService.HandleGetPlaylist).Methods(http.MethodGet)
	apiRouter.HandleFunc("/playlist", playlistService.HandlePostPlaylist).Methods(http.MethodPost)
	apiRouter.HandleFunc("/playlist", playlistService.HandlePutPlaylist).Methods(http.MethodPut)

	server := &AppServer{
		config: config,
		logger: logger.GetDefaultLogger(),
		httpServer: &http.Server{
			Addr:    address,
			Handler: router,
		},
	}

	lc.Append(fx.Hook{
		OnStart: func(ctx context.Context) error {
			go server.Start()
			return nil
		},
		OnStop: func(ctx context.Context) error {
			return server.Stop(ctx)
		},
	})
	return server
}

func (server *AppServer) Start() {
	server.logger.Infof("Listening on http://localhost:8080")
	server.logger.Fatal(server.httpServer.ListenAndServe())
}

func (server *AppServer) Stop(
	ctx context.Context,
) error {
	return server.httpServer.Shutdown(ctx)
}

func healthCheck(w http.ResponseWriter, r *http.Request) {
	_, _ = w.Write([]byte("Welcome to https://www.cryptobeats.xyz"))
}

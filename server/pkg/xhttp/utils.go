package xhttp

import (
	"encoding/json"
	"net/http"
)

type WithHTTPResponseFunc func() (interface{}, error)

type ErrorResponse struct {
	message string `json:"message"`
}

func WithHTTPResponse(
	w http.ResponseWriter, withHTTP WithHTTPResponseFunc,
) {
	response, err := withHTTP()
	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		_ = json.NewEncoder(w).Encode(ErrorResponse{message: err.Error()})
	} else {
		_ = json.NewEncoder(w).Encode(response)
	}
}

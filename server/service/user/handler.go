package user

import (
	"encoding/json"
	"net/http"

	"cryptobeats.xyz/pkg/xhttp"
)

func (service *Service) HandleSignInOrSignUp(
	w http.ResponseWriter, r *http.Request,
) {
	xhttp.WithHTTPResponse(w, func() (interface{}, error) {
		var input SignUpOrSignInInput
		decoder := json.NewDecoder(r.Body)
		if err := decoder.Decode(&input); err != nil {
			return nil, err
		}
		return service.SignInOrSignUp(&input)
	})
}

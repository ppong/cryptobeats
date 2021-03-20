package playlist

import "net/http"

func (service *Service) HandleGetDefaultPlaylist(
	w http.ResponseWriter, r *http.Request,
) {
	// get default playlist and all collectibles in it
}

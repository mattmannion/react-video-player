package middleware

import (
	"log"
	"net/http"

	"github.com/fatih/color"
	"github.com/gin-gonic/gin"
)

func Logger(c *gin.Context) {

	var method string

	get := color.New(color.FgBlack).Add(color.BgBlue).SprintfFunc()
	post := color.New(color.FgBlack).Add(color.BgGreen).SprintfFunc()
	put := color.New(color.FgBlack).Add(color.BgYellow).SprintfFunc()
	patch := color.New(color.FgBlack).Add(color.BgMagenta).SprintfFunc()
	delete := color.New(color.FgBlack).Add(color.BgRed).SprintfFunc()

	switch c.Request.Method {
	case http.MethodGet:
		method = get("   %s   ", http.MethodGet)
	case http.MethodPost:
		method = post("  %s   ", http.MethodPost)
	case http.MethodPut:
		method = put("   %s   ", http.MethodPut)
	case http.MethodPatch:
		method = patch("  %s  ", http.MethodPatch)
	case http.MethodDelete:
		method = delete(" %s  ", http.MethodDelete)
	default:
		method = ""
	}

	log.Printf("%s - %s", method, c.Request.URL)

	c.Next()
}

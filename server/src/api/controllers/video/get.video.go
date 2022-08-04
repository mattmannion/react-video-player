package video

import (
	"fmt"
	"net/http"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

func GetVideo(c *gin.Context) {
	f, err := filepath.Abs("../../../videos/lol.mp4")
	if err != nil {
		fmt.Println(err)
	}
	http.ServeFile(c.Writer, c.Request, f)
}

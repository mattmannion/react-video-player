package routers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type router struct {
	eng *gin.RouterGroup
}

func Routers(eng *gin.Engine) {
	r := &router{eng: eng.Group("api/")}
	{
		r.AdminRouter()
		r.UserRouter()
		r.AuthRouter()
		r.eng.StaticFS("/videos", http.Dir("./videos"))
	}
}

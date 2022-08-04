package routers

import (
	"root/src/api/controllers/admin"
	"root/src/api/middleware"
)

func (r *router) AdminRouter() {

	a := r.eng.Group("/admin")
	a.Use(middleware.Auth)
	a.Use(middleware.Admin)
	{
		a.GET("/check", admin.GetAdmin)
		a.POST("/user", admin.PostAdmin)
		a.DELETE("/sessions", admin.DeleteSessionAdmin)
	}
}

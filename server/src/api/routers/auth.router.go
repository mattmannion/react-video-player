package routers

import (
	"root/src/api/controllers/auth"
	"root/src/api/middleware"
)

func (r *router) AuthRouter() {

	a := r.eng.Group("/auth")
	{
		a.POST("", auth.PostAuth)
		a.DELETE("", auth.DeleteAuth)

		a_auth := a.Group("")
		a_auth.Use(middleware.Auth)
		{
			a_auth.GET("", auth.GetAuth)
		}
	}
}

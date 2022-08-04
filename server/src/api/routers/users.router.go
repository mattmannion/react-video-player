package routers

import (
	"root/src/api/controllers/users"
	"root/src/api/middleware"
)

func (r *router) UserRouter() {

	usrs := r.eng.Group("/users")
	{
		usrs.GET("", users.GetUsers)
		usrs.POST("", users.PostUser)

		usrs_auth := usrs.Group("")
		usrs_auth.Use(middleware.Auth)
		{
			usrs_auth.PUT("", users.UpdateUser)
			usrs_auth.PATCH("", users.UpdateUser)
			usrs_auth.DELETE("", users.DeleteUser)
		}
	}
}

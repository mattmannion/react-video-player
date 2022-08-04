package middleware

import (
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func Auth(c *gin.Context) {
	session := sessions.Default(c)

	username := session.Get("username")

	if username == nil {
		c.JSON(http.StatusNotFound, gin.H{
			"status":  "failure",
			"message": "Please login",
		})

		c.Abort()
		return
	}
	c.Next()
}

package middleware

import (
	"fmt"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func Admin(c *gin.Context) {
	session := sessions.Default(c)

	permissions := fmt.Sprint(session.Get("permissions"))

	if permissions != "admin" {
		c.JSON(http.StatusNotAcceptable, gin.H{
			"status":  "failure",
			"message": "Not Authorized",
		})

		c.Abort()
		return
	}
	c.Next()
}

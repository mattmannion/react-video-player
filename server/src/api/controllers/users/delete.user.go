package users

import (
	"fmt"
	"net/http"
	"root/src/db"
	"root/src/db/models"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func DeleteUser(c *gin.Context) {
	session := sessions.Default(c)
	username := fmt.Sprint(session.Get("username"))
	id := session.Get("id")

	var user models.Users

	db.DB.First(&user, &models.Users{Username: username})

	db.DB.Delete(&user)

	db.Redis.Do("del", id)

	c.JSON(http.StatusOK, gin.H{
		"status":  "Success",
		"message": "User " + username + " deleted",
	})
}

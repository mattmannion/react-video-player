package users

import (
	"fmt"
	"net/http"
	"root/src/db"
	"root/src/db/models"
	"root/src/util"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func UpdateUser(c *gin.Context) {
	session := sessions.Default(c)
	username := fmt.Sprint(session.Get("username"))

	body := models.Users{}

	err := c.BindJSON(&body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "failure",
			"message": fmt.Sprintf("%s...", err),
		})
		return
	}

	var user models.Users

	db.DB.First(&user, &models.Users{Username: username})

	if body.Firstname != "" {
		user.Firstname = body.Firstname
	}

	if body.Lastname != "" {
		user.Lastname = body.Lastname
	}

	if body.Password != "" {
		user.Password = util.Hash(body.Password)
	}

	db.DB.Save(&user)

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"user": models.JsonUser{
			ID:        user.ID,
			Firstname: user.Firstname,
			Lastname:  user.Lastname,
			Email:     user.Email,
			Username:  user.Username,
		},
	})
}

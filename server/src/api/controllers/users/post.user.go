package users

import (
	"fmt"
	"net/http"
	"root/src/db"
	"root/src/db/models"
	"root/src/util"

	"github.com/gin-gonic/gin"
)

func PostUser(c *gin.Context) {
	body := models.Users{}

	err := c.BindJSON(&body)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"status":  "failure",
			"message": fmt.Sprintf("%s...", err),
		})
		return
	}

	if body.Firstname == "" ||
		body.Lastname == "" ||
		body.Email == "" ||
		body.Username == "" ||
		body.Password == "" {
		c.JSON(http.StatusNotFound, gin.H{
			"status":  "failure",
			"message": "Please enter the following: Firstname, Lastname, Email, Username, and Password and try again",
		})
		return
	}

	var user models.Users

	db.DB.Find(&user, &models.Users{Email: body.Email})
	if user.Email == body.Email {
		c.JSON(http.StatusNotFound, gin.H{
			"status":  "failure",
			"message": fmt.Sprintf("Email %s is already registered", body.Email),
		})
		c.Abort()
		return
	}

	db.DB.Find(&user, &models.Users{Username: body.Username})
	if user.Username == body.Username {
		c.JSON(http.StatusNotFound, gin.H{
			"status":  "failure",
			"message": fmt.Sprintf("Username %s is already taken", body.Username),
		})
		c.Abort()
		return
	}

	user.ID = body.ID
	user.Firstname = body.Firstname
	user.Lastname = body.Lastname
	user.Email = body.Email
	user.Username = body.Username
	user.Password = util.Hash(body.Password)
	user.Permissions = "user"

	res := db.DB.Create(&user)
	if res.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"status":  "failure",
			"message": fmt.Sprintf("%s...", res.Error),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
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

package main

import (
	"fmt"
	"root/src/api/routers"
	"root/src/db"
	"root/src/env"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func main() {
	cfg := env.LoadConfig()

	gin.SetMode(gin.ReleaseMode)

	s := gin.New()

	// custom logger i made
	// s.Use(middleware.Logger)

	s.Use(gin.Logger())
	s.Use(gin.Recovery())

	s.SetTrustedProxies([]string{""})

	session_store := db.Init(cfg)

	gc := cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		AllowHeaders:     []string{"X-Requested-With", "Authorization", "Origin", "Content-Length", "Content-Type"},
		AllowCredentials: false,
		MaxAge:           12 * time.Hour,
	}

	s.Use(cors.New(gc))

	s.Use(sessions.Sessions(cfg.Session_Name, session_store))

	routers.Routers(s)

	fmt.Println("live @ http://localhost" + cfg.Port)
	s.Run(cfg.Port)
}

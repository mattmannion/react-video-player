package env

import (
	"fmt"

	"github.com/gin-contrib/sessions"
	"github.com/spf13/viper"
)

type Cfg struct {
	Env          string `mapstructure:"ENV"`
	Port         string `mapstructure:"PORT"`
	DSN          string `mapstructure:"DSN"`
	Session_Name string `mapstructure:"SESSION_NAME"`
	Redis_Addr   string `mapstructure:"REDIS_ADDR"`
	Redis_Secret string `mapstructure:"REDIS_SECRET"`
}

var CFG Cfg

func LoadConfig() Cfg {
	viper.SetConfigFile("./.env")

	err := viper.ReadInConfig()
	if err != nil {
		fmt.Println(err)
	}

	err = viper.Unmarshal(&CFG)

	if err != nil {
		fmt.Println(err)
	}

	return CFG
}

type Cookies struct {
	Set_Cookie sessions.Options
	Del_Cookie sessions.Options
}

func Cookie() Cookies {
	dev := false
	if CFG.Env == "dev" {
		dev = false
	} else {
		dev = true
	}

	return Cookies{
		Set_Cookie: sessions.Options{Secure: dev, HttpOnly: dev, MaxAge: 604800},
		Del_Cookie: sessions.Options{MaxAge: 0},
	}
}

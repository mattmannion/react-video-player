package db

import (
	"fmt"
	"log"
	"root/src/db/models"
	"root/src/db/sql"
	"root/src/env"
	"root/src/util"

	rds "github.com/gin-contrib/sessions/redis"
	"github.com/gomodule/redigo/redis"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB
var Redis redis.Conn

func Init(cfg env.Cfg) rds.Store {
	session_store, err := rds.NewStore(10, "tcp", cfg.Redis_Addr, "", []byte(cfg.Redis_Secret))
	rdb, _ := redis.Dial("tcp", ":6379")
	Redis = rdb

	session_store.Options(env.Cookie().Set_Cookie)

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("redis connected")

	DB, err = gorm.Open(postgres.Open(cfg.DSN), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Silent),
	})

	if err != nil {
		log.Fatalln(err)
	}

	err = DB.AutoMigrate(&models.Users{})

	if err != nil {
		log.Fatalln(err)
	}

	fmt.Println("db connected")

	// flushes redis and seeds dbs
	if cfg.Env == "dev" {

		_, err := rdb.Do("flushall")
		if err != nil {
			fmt.Println("flush err:", err)
		} else {
			SeedUsers(DB)
			fmt.Println("dbs seeded and reset")
		}

	}

	return session_store
}

func SeedUsers(db *gorm.DB) {
	pws := []string{"mm", "mgr", "kr"}

	for i, p := range pws {
		pws[i] = util.WeakHash(p)
	}

	db.Exec(sql.Util_truncate_users_query)
	db.Exec(sql.Util_reset_users_id_query)
	db.Exec(sql.Util_insert_default_users_query,
		map[string]interface{}{
			"pw1": pws[0], "pw2": pws[1], "pw3": pws[2],
		})
}

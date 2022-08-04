package models

type Users struct {
	ID          uint   `gorm:"primarykey" json:"id"`
	Firstname   string `gorm:"column:firstname" json:"firstname"`
	Lastname    string `gorm:"column:lastname" json:"lastname"`
	Email       string `gorm:"column:email; unique" json:"email"`
	Username    string `gorm:"column:username; unique" json:"username"`
	Password    string `gorm:"column:password" json:"password"`
	Permissions string `gorm:"column:permissions" json:"permissions"`
}

type JsonUser struct {
	ID        uint   `json:"id"`
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
	Email     string `json:"email"`
	Username  string `json:"username"`
}

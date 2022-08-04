package sql

const Util_truncate_users_query string = `truncate users;`

const Util_reset_users_id_query string = `alter sequence users_id_seq restart;`

const Util_insert_default_users_query string = `
insert into users(firstname, lastname, email, username, password, permissions)
	values
	('matt', 'mannion', 'mm@mm.com', 'mm', @pw1, 'admin'),
	('mack', 'gr', 'mgr@mgr.com', 'mgr', @pw2, 'admin'),
	('khris', 'rhodes', 'kr@kr.com', 'kr', @pw3, 'user');
`

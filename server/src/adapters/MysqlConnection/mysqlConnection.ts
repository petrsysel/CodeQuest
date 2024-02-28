import mysql from 'mysql2'
import getConfig from './mysqlConfig'

export default function getConnection(){
	const config = getConfig()
	return mysql.createConnection({
		host: config.host,
		user: config.user,
		password: config.password,
		database: config.database,
		port: config.port
	})
} 
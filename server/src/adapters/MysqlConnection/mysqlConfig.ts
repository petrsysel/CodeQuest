export default function getConfig(){
	return {
		host: process.env.DATABASE_HOST || "localhost",
		user: process.env.DATABASE_USER || "cq",
		password: process.env.DATABASE_PASSWORD || "cq",
		database: process.env.DATABASE_DATABASE || "cq",
		port: +(process.env.DATABASE_PORT || 3306),
	}
}
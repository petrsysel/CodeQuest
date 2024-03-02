import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import { Server } from "./core/Server"
import { IUserRepository } from "./core/IUserRepository"
import { IPuzzleRepository } from "./core/IPuzzleRepository"
import { ISessionManager } from "./core/ISessionManager"
import { SessionManager } from "./adapters/SessionManager"
import dbConnection from "./adapters/MysqlConnection/mysqlConnection"
import { MysqlUserRepository } from "./adapters/MysqlUserRepo/MysqlUserRepository"
import { MysqlPuzzleRepository } from "./adapters/MysqlPuzzleRepo/MysqlPuzzleRepository"

dotenv.config()

const api: Express = express()

const connection = dbConnection()

const userRepository = new MysqlUserRepository(connection)
const puzzleRepository = new MysqlPuzzleRepository(connection)
const sessionManager = new SessionManager()

new Server(
  userRepository,
  puzzleRepository,
  sessionManager,
  api
)
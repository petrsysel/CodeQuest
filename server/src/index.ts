import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import { Server } from "./core/Server"
import { IUserRepository } from "./core/IUserRepository"
import { IPuzzleRepository } from "./core/IPuzzleRepository"
import { ISessionManager } from "./core/ISessionManager"

dotenv.config()

const api: Express = express()

const userRepository = {} as IUserRepository
const puzzleRepository = {} as IPuzzleRepository
const sessionManager = {} as ISessionManager

new Server(
  userRepository,
  puzzleRepository,
  sessionManager,
  api
)
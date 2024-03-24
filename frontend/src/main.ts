import { Navbar } from "./platform/adapters/navbar/Navbar"
import { LoginDialogue } from "./platform/adapters/dialogues/LoginDialogue"
import { RegisterDialogue } from "./platform/adapters/dialogues/RegisterDialogue"
import { INavBar } from "./platform/core/INavBar"
import { IPuzzleListUI } from "./platform/core/IPuzzleListUI"
import { ISidebar } from "./platform/core/ISidebar"
import { Platform } from "./platform/core/Platform"
import { MockServerAPI } from "./platform/mocks/MockServerAPI"
import { IDialogue } from "./shared/dialogue/core/IDialogue"
import { Sidebar } from "./platform/adapters/sidebar/Sidebar"
import { InsetCodeDialogue } from "./platform/adapters/dialogues/InsertCodeDialogue"
import { PuzzleListUI } from "./platform/adapters/puzzleList/PuzzleListUI"
import { ServerApi } from "./platform/ServerApi"
import { ClientIdManager } from "./platform/adapters/ClientIdManager"
import { NotificationUI } from "./shared/notification/adapters/NotificationUI"

function main(){
    const serverApi = new ServerApi()
    const sideBar = new Sidebar('platform-sidebar')
    const navBar = new Navbar('platform-navbar')
    const puzzleList = new PuzzleListUI('platform-puzzle-list')
    const loginForm = new LoginDialogue()
    const registerForm = new RegisterDialogue()
    const insertPuzzleCodeForm = new InsetCodeDialogue()
    const clientIdManager = new ClientIdManager()
    const notification = new NotificationUI()
    
    new Platform(
        serverApi,
        sideBar,
        navBar,
        puzzleList,
        loginForm,
        registerForm,
        insertPuzzleCodeForm,
        clientIdManager,
        notification
    )
}

window.onload = main
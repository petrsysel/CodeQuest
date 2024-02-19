import { Navbar } from "./platform/adapters/Navbar"
import { LoginDialogue } from "./platform/adapters/dialogues/LoginDialogue"
import { INavBar } from "./platform/core/INavBar"
import { IPuzzleListUI } from "./platform/core/IPuzzleListUI"
import { ISidebar } from "./platform/core/ISidebar"
import { Platform } from "./platform/core/Platform"
import { MockServerAPI } from "./platform/mocks/MockServerAPI"

function main(){
    const serverApi = new MockServerAPI()
    const sideBar = {} as ISidebar
    const navBar = new Navbar('platform-navbar')
    const puzzleList = {} as IPuzzleListUI
    const loginForm = new LoginDialogue()
    const registerForm = {} as INotificationUI
    const insertPuzzleCodeForm = {} as INotificationUI
    
    new Platform(
        serverApi,
        sideBar,
        navBar,
        puzzleList,
        loginForm,
        registerForm,
        insertPuzzleCodeForm
    )
}

window.onload = main
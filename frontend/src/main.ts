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

function main(){
    const serverApi = new MockServerAPI()
    const sideBar = new Sidebar('platform-sidebar')
    const navBar = new Navbar('platform-navbar')
    const puzzleList = {} as IPuzzleListUI
    const loginForm = new LoginDialogue()
    const registerForm = new RegisterDialogue()
    const insertPuzzleCodeForm = new InsetCodeDialogue()
    
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
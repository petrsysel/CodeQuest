import { IDialogue } from "../../shared/dialogue/core/IDialogue";
import { INavBar } from "./INavBar";
import { IPuzzleListUI } from "./IPuzzleListUI";
import { IServerAPI, LoginData, RegisterData } from "./IServerAPI";
import { ISidebar } from "./ISidebar";

export class Platform{
    constructor(
        serverApi: IServerAPI,
        sideBar: ISidebar,
        navBar: INavBar,
        puzzleList: IPuzzleListUI,
        loginForm: IDialogue<LoginData>,
        registerForm: IDialogue<RegisterData>,
        insertPuzzleCode: IDialogue<string>,
        
    ){


        serverApi.isLogged('mock-client-id').then(user => {
            const logged = user != undefined
            navBar.render({
                loggedUser: logged,
                user: user
            })
        })

        navBar.on('log-in-request', () => {
            loginForm.show()
        })

        navBar.on('register-request', () => {
            registerForm.show("Hesla se neshodují")
        })
    }
}
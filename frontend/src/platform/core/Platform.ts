import { IDialogue } from "../../shared/dialogue/core/IDialogue";
import { INavBar } from "./INavBar";
import { IPuzzleListUI } from "./IPuzzleListUI";
import { IServerAPI, LoginData } from "./IServerAPI";
import { ISidebar } from "./ISidebar";

export class Platform{
    constructor(
        serverApi: IServerAPI,
        sideBar: ISidebar,
        navBar: INavBar,
        puzzleList: IPuzzleListUI,
        loginForm: IDialogue<LoginData>,
        registerForm: INotificationUI,
        insertPuzzleCode: INotificationUI,
        
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
    }
}
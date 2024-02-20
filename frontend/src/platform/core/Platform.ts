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

        navBar.on('register-request', async () => {
            async function showRegisterDialogueRec(error?: string, preFill?: RegisterData){
                const response = await registerForm.show(error, preFill)
                if(!response) return
                const validationResponse = registerForm.validate(response)
                if(!validationResponse.isValid) showRegisterDialogueRec(validationResponse.error, response)
                else {
                    console.log("Registration form is valid")
                    serverApi.registerRequest(
                        'afjwefiojwa',
                        {
                            email: response.email,
                            fullname: response.fullname,
                            username: response.username
                        },
                        response.password
                    )
                }
            }
            showRegisterDialogueRec()
        })
    }
}
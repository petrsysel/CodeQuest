import { IDialogue } from "../../shared/dialogue/core/IDialogue";
import { IClientIdManager } from "./IClientIdManager";
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
        clientIdManager: IClientIdManager
    ){
        const clientId = clientIdManager.get()

        navBar.render({loggedUser: false})
        sideBar.render({loggedUser: false})

        serverApi.isLogged(clientId).then(user => {
            const logged = user != undefined
            navBar.render({
                loggedUser: logged,
                user: user
            })
            sideBar.render({
                loggedUser: logged
            })
        })

        navBar.on('log-in-request', async () => {
            async function showLoginForm(error?: string){
                const data = await loginForm.show(error)
                if(!data) return 
                const apiResponse = await serverApi.loginRequest(clientId, data.username, data.password)
                if(apiResponse.error) showLoginForm(apiResponse.error)
                else location.reload()
            }
            showLoginForm()
        })
        navBar.on('log-out-request', async () => {
            const result = await serverApi.logOut(clientId)
            location.reload()
        })

        navBar.on('register-request', async () => {
            async function showRegisterDialogueRec(error?: string, preFill?: RegisterData){
                const response = await registerForm.show(error, preFill)
                console.log("REGISTRATION FORM")
                console.log(response)
                if(!response) return
                const validationResponse = registerForm.validate(response)
                if(!validationResponse.isValid) showRegisterDialogueRec(validationResponse.error, response)
                else {
                    console.log("Registration form is valid")
                    const serverResponse = await serverApi.registerRequest(
                        clientId,
                        {
                            email: response.email,
                            fullname: response.fullname,
                            username: response.username
                        },
                        response.password
                    )
                    if(serverResponse.error){
                        showRegisterDialogueRec(serverResponse.error)
                    }
                    else{
                        const loginResponse = await serverApi.loginRequest(clientId, response.username, response.password)

                        location.reload()
                    }
                }
            }
            showRegisterDialogueRec()
        })

        sideBar.on('insert-code-request', async () => {
            const response = await insertPuzzleCode.show()
        })
    }
}
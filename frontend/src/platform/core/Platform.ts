import { IDialogue } from "../../shared/dialogue/core/IDialogue";
import { INotificationUI } from "../../shared/notification/ports/INotificationUI";
import { Puzzle } from "../../shared/puzzle-lib/core/Puzzle";
import { getQuestionMarkImg } from "../mocks/getQuestionmarkImg";
import { IAppStateManager } from "./IAppStateManager";
import { IClientIdManager } from "./IClientIdManager";
import { INavBar } from "./INavBar";
import { IPuzzleListUI } from "./IPuzzleListUI";
import { IServerAPI, LoginData, PuzzleAccess, RegisterData, ServerAction } from "./IServerAPI";
import { ISidebar, PuzzleListMode } from "./ISidebar";
import { User } from "./User";

export class Platform{
    private loggedUser: User | undefined

    constructor(
        serverApi: IServerAPI,
        sideBar: ISidebar,
        navBar: INavBar,
        puzzleList: IPuzzleListUI,
        loginForm: IDialogue<LoginData>,
        registerForm: IDialogue<RegisterData>,
        insertPuzzleCode: IDialogue<string>,
        clientIdManager: IClientIdManager,
        yesNoDialogue: INotificationUI,
        stateManager: IAppStateManager
    ){
        const clientId = clientIdManager.get()

        const openEditor = (puzzleId: string) => {
            window.open(`editor.html?puzzleid=${puzzleId}`)
        }
        const openGame = (puzzleId: string) => {
            window.open(`game.html?puzzleid=${puzzleId}`)
        }
        let listOffset = 0

        navBar.render({loggedUser: false})
        sideBar.render({
            loggedUser: false,
            renderMode: "public"
        })

        serverApi.isLogged(clientId).then(user => {
            this.loggedUser = user
            const logged = user != undefined

            const lastState = stateManager.loadLastState()
            let mode: PuzzleListMode = lastState === 'public-puzzles' ? 'public' : 'custom'
            let access: PuzzleAccess = lastState === 'public-puzzles' ? 'public' : 'private'

            if(!logged){
                mode = 'public'
                access = 'public'
            }

            navBar.render({
                loggedUser: logged,
                user: user
            })
            sideBar.render({
                loggedUser: logged,
                renderMode: mode
            })
            puzzleList.render([], {
                mode: mode,
                loggedUser: this.loggedUser != undefined,
                append: false,
                limit: 10
            })
            serverApi.fetchPuzzles(clientId, access, 10, 0).then(result => {
                
                puzzleList.render(result, {
                    mode: mode,
                    loggedUser: this.loggedUser != undefined,
                    append: false,
                    limit: 10
                })
                listOffset = 10
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
                if(!response) return
                const validationResponse = registerForm.validate(response)
                if(!validationResponse.isValid) showRegisterDialogueRec(validationResponse.error, response)
                else {
                    const serverResponse = await serverApi.registerRequest(
                        clientId,
                        {
                            email: response.email,
                            fullname: response.fullname,
                            username: response.username,
                            id: '---'
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
            if(!response) return
            const puzzleInfo = await serverApi.findByCode(response)
            if(!puzzleInfo){
                const response = await yesNoDialogue.notify("Úloha s tímto kódem neexistuje")
                return
            }
            else openGame(puzzleInfo.id)
        })

        sideBar.on('custom-puzzles-request', () => {
            stateManager.saveState('custom-puzzles')
            sideBar.render({
                loggedUser: this.loggedUser != undefined,
                renderMode: "custom"
            })
            serverApi.fetchPuzzles(clientId, "private", 10, 0).then((result) => {
                puzzleList.render(result, {
                    mode: "custom",
                    loggedUser: this.loggedUser != undefined,
                    append: false,
                    limit: 10
                })
                listOffset = 10
            })
            
        })
        sideBar.on('public-puzzles-request', () => {
            stateManager.saveState('public-puzzles')
            sideBar.render({
                loggedUser: this.loggedUser != undefined,
                renderMode: "public"
            })
            serverApi.fetchPuzzles(clientId, "public", 10, 0).then(result => {
                puzzleList.render(result, {
                    mode: "public",
                    loggedUser: this.loggedUser != undefined,
                    append: false,
                    limit: 10
                })
                listOffset = 10
            })
        })

        puzzleList.on('load-more', data => {
            const access: PuzzleAccess = data.mode === "custom"? "private" : "public"
            serverApi.fetchPuzzles(clientId, access, 10, listOffset).then((result) => {
                puzzleList.render(result, {
                    mode: data.mode!,
                    loggedUser: this.loggedUser != undefined,
                    append: true,
                    limit: 10
                })
                listOffset += 10
            })
        })

        puzzleList.on('create-puzzle-request', () => {
            const puzzle = new Puzzle()
            if(!this.loggedUser) return
            serverApi.savePuzzle(clientId, puzzle, this.loggedUser, getQuestionMarkImg(), null).then(result => {
                if(result.success) window.open(`editor.html?puzzleid=${puzzle.getId()}`)
                else console.error(result.error)
            })
        })

        puzzleList.on('edit-request', data => {
            openEditor(data.puzzleId!)
        })
        puzzleList.on('play-puzzle', data => {
            openGame(data.puzzleId!)
        })
        puzzleList.on('duplicate-puzzle', async data => {
            const original = new Puzzle()
            const response = await serverApi.getContent(clientId, data.puzzleId!)
            if(!response.error){
                original.loadFromString(response.response!)
                const duplicate = original.duplicate()
                const result = await serverApi.savePuzzle(clientId, duplicate, this.loggedUser!, getQuestionMarkImg(), null)
                window.location.reload()
            }
            else console.error(response.error)
        })

        puzzleList.on('publish-request', async data => {
            const original = new Puzzle()
            const response = await serverApi.publish(clientId, data.puzzleId!, true)
            window.location.reload()
        })
        puzzleList.on('unpublish-request', async data => {
            const original = new Puzzle()
            const response = await serverApi.publish(clientId, data.puzzleId!, false)
            
            window.location.reload()
        })
        puzzleList.on('remove-puzzle',async data => {
            const response = await yesNoDialogue.dialogue("Opravdu chceš odstranit úlohu?")
            if(response === "yes"){
                const result = await serverApi.remove(clientId, data.puzzleId!)
                window.location.reload()
            }
        })

        puzzleList.on('search-request', async data => {
            const id = data.mode! === "custom" ? clientId : '-'
            const result = await serverApi.findPuzzles(id, data.query!)
            puzzleList.render(result, {
                mode: data.mode!,
                loggedUser: this.loggedUser != undefined,
                limit: 10,
                append: false
            })
        })
    }
}
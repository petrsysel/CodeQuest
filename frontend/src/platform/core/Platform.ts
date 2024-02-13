import { INavBar } from "./INavBar";
import { IPuzzleListUI } from "./IPuzzleListUI";
import { IServerAPI } from "./IServerAPI";
import { ISidebar } from "./ISidebar";

export class Platforms{
    constructor(
        serverApi: IServerAPI,
        sideBar: ISidebar,
        navBar: INavBar,
        puzzleList: IPuzzleListUI
    ){

    }
}
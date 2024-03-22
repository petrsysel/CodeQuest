import { PuzzleObjectId } from "../../../shared/puzzle-lib/core/PuzzleTypes";
import { FunctionAction } from "./Actions/functions/FunctionAction";

type FunctionData = {
	action: FunctionAction,
	wasReturned: boolean,
	returnedValue: any,
	on: (event: "returned", callback: () => void) => void
	emit: (event: "returned") => void
}
export class SharedData {
	private variables: Map<string, any>
	private functions: Map<string, FunctionData>
	private functionListeners: Map<string, () => void>

	constructor(){
		this.variables = new Map()
		this.functions = new Map()
		this.functionListeners = new Map()
	}

	setVariable(objectId: PuzzleObjectId, variableId: string, value: any){
		this.variables.set(`${objectId}.${variableId}`, value)
	}
	getVariable(objectId: PuzzleObjectId, variableId: string): any | undefined{
		const data = this.variables.get(`${objectId}.${variableId}`)
		console.log("SHARED DATA GET")
		console.log(data)
		return data
	}
	changeVariable(objectId: PuzzleObjectId, variableId: string, increment: any){
		let actualValue = this.getVariable(objectId, variableId)
		if(actualValue == undefined) actualValue = 0
		this.setVariable(objectId, variableId, actualValue + increment)
	}
	registerFunction(objectId: PuzzleObjectId, functionAction: FunctionAction){
		const on = (event: "returned", listener: () => void) => {
			this.functionListeners.set(this.toId(objectId, functionAction.getName()), listener)
		}
		const emit = (event: "returned") => {
			const callback = this.functionListeners.get(this.toId(objectId, functionAction.getName()))
			if(callback) callback()
		}
		this.functions.set(this.toId(objectId, functionAction.getName()), {
			action: functionAction,
			wasReturned: false,
			returnedValue: null,
			on: on,
			emit: emit
		})
	}
	private resetFunction(objectId: PuzzleObjectId, functionName: string){
		const original = this.functions.get(this.toId(objectId, functionName))
		if(original) this.registerFunction(objectId, original.action)
	}
	toId(objectId: PuzzleObjectId, name: string){
		return `${objectId}.${name}`
	}
	private setFunctionValue(objectId: PuzzleObjectId, functionName: string, value: any){
		const original = this.functions.get(this.toId(objectId, functionName))
		if(original){
			this.functions.set(this.toId(objectId, functionName), {
				action: original.action,
				wasReturned: true,
				returnedValue: value,
				on: original.on,
				emit: original.emit
			})
		}
	}
	getFunction(objectId: PuzzleObjectId, functionName: string){
		const func = this.functions.get(this.toId(objectId, functionName))
		if(func) this.resetFunction(objectId, func.action.getName())
		return func
	}
	wasFunctionReturned(objectId: PuzzleObjectId, functionName: string){
		const func = this.functions.get(this.toId(objectId, functionName))
		if(!func) return false
		return func.wasReturned
	}
	returnFuntion(objectId: PuzzleObjectId, functionName: string, value?: any){
		console.log(`RETURNING VALUE: ${value}`)
		this.setFunctionValue(objectId, functionName, value)
	}
}
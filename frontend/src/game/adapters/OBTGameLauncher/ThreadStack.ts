import { Signal } from "easybox"
import { ThreadController } from "./ThreadController"

export type ThreadStackEvent = 'empty' | 'added'
export class ThreadStack{
	private threads: ThreadController[]
	private signal: Signal<ThreadStackEvent, null>

	constructor(){
		this.threads = []
		this.signal = new Signal()
	}

	on(event: ThreadStackEvent, callback: () => void){
		this.signal.on(event, callback)
	}

	add(thread: ThreadController){
		this.threads.push(thread)
		this.signal.emit('added', null)
	}
	read(): ThreadController | undefined{
		return this.threads[this.threads.length - 1]
	}
	pop(){
		this.threads.splice(this.threads.length - 1, 1)[0]
		if(this.threads.length === 0) this.signal.emit('empty', null)
	}

	clearEvents(){
		this.threads.forEach(t => {
			if(t.type === 'event') this.threads.splice(this.threads.indexOf(t),1)
		})
	}
}
export class SingleSignal<E, P>{
	signals: Map<E, (data: P) => void>

	constructor(){
		this.signals = new Map()
	}

	emit(event: E, data: P){
		const clb = this.signals.get(event)
		if(clb) clb(data)
	}

	on(event: E, callback: (data: P) => void){
		this.signals.set(event, callback)
	}
}
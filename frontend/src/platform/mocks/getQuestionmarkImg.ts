export function getQuestionMarkImg(){
	return ` data:image/png;base64,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`
}
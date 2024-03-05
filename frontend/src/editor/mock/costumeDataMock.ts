import { CostumeData } from "../../shared/puzzle-lib/core/PuzzleTypes";

export function getMockCostumes(): CostumeData[]{
	return [
		{
			name: "Kouzelník s klíčem",
			path: "/costumes/Kouzelník s klíčem.png",
			tags: ["fantasy", "kouzelník", "klíč"]
		},
		{
			name: "Kouzelník s plamenem",
			path: "/costumes/Kouzelník s plamenem.png",
			tags: ["fantasy", "kouzelník", "oheň", "plamen"]
		},
		{
			name: "Kouzelník",
			path: "/costumes/Kouzelník.png",
			tags: ["fantasy", "kouzelník"]
		},
		{
			name: "Modrý klíč",
			path: "/costumes/Modrý klíč.png",
			tags: ["klíč"]
		},
		{
			name: "Keř 1",
			path: "/costumes/Keř 1.png",
			tags: ["keř", "prostředí", "příroda"]
		},
		{
			name: "Keř 2",
			path: "/costumes/Keř 2.png",
			tags: ["keř", "prostředí", "příroda"]
		}
	]
}
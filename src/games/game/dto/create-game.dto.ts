import {GameCategory} from "@/games/entities/game.entity";

export class CreateGameDto {
    name: string;
    description: string;
    minPlayers: number;
    maxPlayers: number;
    category: GameCategory;
    created_By: number; // User ID of the creator
}

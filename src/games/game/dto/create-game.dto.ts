import {GameCategory} from "@/games/entities/game.entity";

export class CreateGameDto {
    name: string;
    description: string;
    minPlayers: number;
    maxPlayers: number;
    category: GameCategory;
    created_by: number; // User ID of the creator
}

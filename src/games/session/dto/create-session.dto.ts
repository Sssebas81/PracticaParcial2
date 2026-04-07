import { SessionStatus } from "@/games/entities/session.entity";

export class CreateSessionDto {
  gameId: number
  hostId: number
  status?: SessionStatus
  notes?: string
}
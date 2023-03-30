import { Publication } from "./publication";
import { User } from "./user";

export class Favorite {
    id!: number;
    author!: User;
    publication!: Publication;
}
import { Publication } from "./publication";
import { User } from "./user";

export class Comment {
    id!: number;
    comment!: string;
    author!: User;
    publication!: Publication;
}
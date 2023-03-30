import { Publication_Status } from "./publication_status";
import { Publication_Topics } from "./publication_topics";
import { User } from "./user";

export class Publication {
    id!: number;
    title!: string;
    content!: string;
    author!: User;
    created_on!: string;
    status!: Publication_Status;
    topic!: Publication_Topics;
}
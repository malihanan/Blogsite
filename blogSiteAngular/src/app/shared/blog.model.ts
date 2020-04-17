export class Blog {
    _id: string;
    user_id: string;
    title: string;
    content: string;
    tags: Array<string>;
    likes: Array<string>;
    comments: Array<{_id: string; user_id: string; comment: string}>;
    date: Date;
}

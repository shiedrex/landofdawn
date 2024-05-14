export interface simpleBlogCard {
    name: string;
    bio: string;
    slug: string;
    imageUrl: string;
    _id: string;
}

export interface article {
    name: string;
    bio: string;
    slug: string;
    imageUrl: string;
    _id: string;
    content: any;
    roles: { name: string; imageUrl: string }[];
}

export interface roles {
    name: string;
}
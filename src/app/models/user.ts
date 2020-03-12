import { IUserData } from "src/api/types";
import { permission } from "../../api/types";
export class User implements IUserData {
    id: number;
    username: string;
    password: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    introduction: string;
    roles: string[];
    language: string;
    permissions: permission[];
}

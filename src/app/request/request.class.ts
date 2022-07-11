
import { Requestline } from "../requestline/requestline.class";
import { User } from "../user/user.class";

export class UserRequest {
    constructor(
        public id: number=0,
        public description: string="",
        public justification: string="",
        public rejectionReason: string="",
        public deliveryMode: string="Pickup",
        public status: string="New",
        public total: number=0,
        public userId: number=0,
        public user : User,
        public requestLines : Requestline[]
    ){}
}

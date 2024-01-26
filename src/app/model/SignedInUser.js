import { User } from "./User";

export class SignedInUser{
    /**@type {User} */
    static user = new User({
        companyID:'companyXYZ',
        employeedID:'fake-employee-id',
        firstName:'fake-first-name',
        lastName:'fake-last-name',
        userID:'user111',
        username:'sam_wilson'
    })
}

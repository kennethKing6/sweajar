import { User } from "./User";

export class SignedInUser{
    /**@type {User} */
    static user = new User({
        companyID:'fake-company-id',
        employeedID:'fake-employee-id',
        firstName:'fake-first-name',
        lastName:'fake-last-name',
        userID:'fake-user-id',
        username:'fake-username'
    })
}

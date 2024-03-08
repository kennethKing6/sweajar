export class User {
  constructor(user) {
    if (!user["teamID"]) throw new Error("teamID required");
    this.teamID = user.teamID || "";

    if (!user["firstName"]) throw new Error("firstName required");
    this.firstName = user.firstName;

    if (!user["lastName"]) throw new Error("lastName required");
    this.lastName = user.lastName;

    if (!user["userID"]) throw new Error("lastName required");
    this.userID = user.userID;

    if (!user["email"]) throw new Error("lastName required");
    this.email = user.email;
    try {
      this.profilePicture =
        user.profilePicture ||
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    } catch (err) {}
  }
}

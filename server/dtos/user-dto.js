module.exports = class UserDto{
    email;
    username;
    id;
    isActivated;
    photo;
    name;
    bio;
    role;
    constructor(model) {
        this.email = model.email;
        this.username = model.username;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.photo = model.photo;
        this.name = model.name;
        this.bio = model.bio;
        this.role = model.role;
    }
}
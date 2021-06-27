module.exports = class UserDto {
    email;
    id;
    isActicated;

    constructor(model) {
        this.email = model.email
        this.id = model._id // специфика Mongo
        this.isActicated = model.isActicated 
    }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
var users_1 = require("../data/users");
function createUser(user) {
    users_1.users.push(user);
    return user;
}
function getUserById(id) {
    var user = users_1.users.find(function (u) { return u.id === id; });
    return user !== null && user !== void 0 ? user : null;
}
function updateUser(id, data) {
    var user = getUserById(id);
    if (!user)
        return null;
    Object.assign(user, data);
    return user;
}
function deleteUser(id) {
    var index = users_1.users.findIndex(function (u) { return u.id === id; });
    if (index === -1)
        return false;
    users_1.users.splice(index, 1);
    return true;
}

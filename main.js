"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userService_1 = require("./src/services/userService");
var roles_1 = require("./src/enums/roles");
var user1 = (0, userService_1.createUser)({
    id: 1,
    name: 'Elbek_hacker',
    email: 'elbekhacker@gmail.com',
    role: roles_1.Roles.ADMIN,
    isActive: true
});
console.log('Yangi foydalanuvchi:', user1);
var foundUser = (0, userService_1.getUserById)(1);
console.log('Topilgan user:', foundUser);
var updatedUser = (0, userService_1.updateUser)(1, { name: 'Elbek_updated', isActive: false });
console.log('Yangilangan user:', updatedUser);
var deleted = (0, userService_1.deleteUser)(1);
console.log("Foydalanuvchi o'chirildi?", deleted);
var notFoundUser = (0, userService_1.getUserById)(1);
console.log('Foydalanuvchi topilmaydi:', notFoundUser);

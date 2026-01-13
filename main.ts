import { createUser, getUserById, updateUser, deleteUser } from "./src/services/userService";
import { IUser } from "./src/interfaces/user";
import { Roles } from "./src/enums/roles";

const user1: IUser = createUser({
  id: 1,
  name: 'Elbek_hacker',
  email: 'elbekhacker@gmail.com',
  role: Roles.ADMIN,
  isActive: true
});

console.log('Yangi foydalanuvchi:', user1);

const foundUser = getUserById(1);
console.log('Topilgan user:', foundUser);

const updatedUser = updateUser(1, { name: 'Elbek_updated', isActive: false });
console.log('Yangilangan user:', updatedUser);

const deleted = deleteUser(1);
console.log(`Foydalanuvchi o'chirildi?`, deleted);

const notFoundUser = getUserById(1);
console.log('Foydalanuvchi topilmaydi:', notFoundUser);

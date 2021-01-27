import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("adminPassword", 10),
    isAdmin: true,
  },
  {
    name: "First User",
    email: "first@example.com",
    password: bcrypt.hashSync("firstPassword", 10),
  },
  {
    name: "Second User",
    email: "second@example.com",
    password: bcrypt.hashSync("secondPassword", 10),
  },
];

export default users;

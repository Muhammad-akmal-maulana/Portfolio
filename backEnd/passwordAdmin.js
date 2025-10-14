import bcrypt from "bcryptjs";

const password = "1234"; // ganti dengan password admin
const passwordAdmin = async () => {
  const hash = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hash);
};

passwordAdmin();
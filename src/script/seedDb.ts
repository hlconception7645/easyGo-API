const { hashPassword } = require("../lib/authLib");
const Insurance = require("../models/InsuranceForfait.model");
const User = require("../models/User.model")

const data: any[] = [
  {
    name: 'Medium',
    price: 1000,
    desc: "Toutes les assurances du forfait basic Protection contre la crevaison Protection conte Lorem ipsum dolor sit amet.",
    icon: 'mediation',
  },
  {
    name: 'Premium',
    price: 3000,
    desc: "Toutes les assurances du forfait basic Protection contre la crevaison Protection conte Lorem ipsum dolor sit amet.",
    icon: 'shield',
  }
];

const admin = {
  name: "MBAYI ADMIN",
  email: "alvin@gmail.com",
  firstName: "Alvin",
  password: "12345"
}

const addForfaits = async () => {
  await Promise.all(data.map((f: any) => {
    const newF = new Insurance({
      name: f.name,
      desc: f.desc,
      price: f.price,
      icon: f.icon,
    });

    return newF.save();
  }));
}

const createAdmin = async () => {
  const { email, name, firstName, password } = admin;
  const hashedPswd = await hashPassword(password);

  const user = new User({
    email: email,
    firstName,
    name,
    password: hashedPswd,
    role: "ADMIN",
  });

  const result = await user.save();
}

(async () => {
  await addForfaits();
})();

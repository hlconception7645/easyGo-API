import { body } from "express-validator";

const common = [
  body("email")
    .isEmail()
    .withMessage("veuillez saisir une addresse mail valide !"),
];

export const loginVaidator = [
  ...common,
  body("password").notEmpty().withMessage("ce champ ne peut etre vide."),
];

export const updateProfilValdiator = [
  ...common,
  body("name").notEmpty().withMessage("Ce est requis"),
  body("firstName").notEmpty().withMessage("Ce champ est requis"),
];

export const signinValidator = [
  ...common,
  body("firstName")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Veuillez saisir au moins trois caractères"),
  body("name")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Veuillez saisir au moins trois caractères"),
  body("password").notEmpty().withMessage("ce champ ne peut etre vide."),
];

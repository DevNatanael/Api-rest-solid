import express, { Router } from "express";
import generalUserController from "../controllers/Users/generalUserController";

const router: Router = express.Router();

// retorna todos os usuários
router.get("/", generalUserController.getUsers);

// cria usuário
router.post("/", generalUserController.createUsers);

//atualiza usuário
router.patch("/update/:id", generalUserController.updateUser);

//deleta usuário
router.delete("/delete/:id", generalUserController.deleteUser);

export default router;

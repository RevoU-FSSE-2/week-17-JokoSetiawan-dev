import { Request, Response } from "express";
import { db } from "../config/db.connection";

const findAll = async (req: Request, res: Response) => {
    try {
      const [result] = await db.promise().query("SELECT * FROM transaction_table");
  
      res.status(200).json({
        success: true,
        message: "get transaction!",
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
  
  const post = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const result: any = await db.promise().query(
        `insert into transaction_table (user_id, type, amount)
      values (?,?,?)`,
        [body.user_id, body.type, body.amount]
      );
      const id = result[0].insertId;
      const getId: any = await db.promise().query(
        `select * from transaction_table where id =` + id
      );
      console.log(getId);
      res.status(200).json({
        id: id,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
  
  const put = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const body = req.body;
  
      const result: any = await db.promise().query(
        `UPDATE transaction_table
         SET type = ?, amount = ?, user_id = ?
         WHERE id = ?`,
        [body.type, body.amount, body.user_id, id]
      );
  
      res.status(200).json({
        id: id,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
  
  const deleteTransaction = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const result: any = await db.promise().query(
        `delete from transaction_table where id = ?`,
        id
      );
  
      res.status(200).json({
        id: id,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
  
  const transactionController = { findAll, post, deleteTransaction, put };
  export default transactionController;
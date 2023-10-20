import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

interface TransactionValue {
  user_id: number;
  type: string;
  amount: number;
}

const TransactionSchema = Yup.object().shape({
  user_id: Yup.number().required("Input user id"),
  type: Yup.string().required("Input type"),
  amount: Yup.number().required("Input amount"),
});

const NewTransaction: React.FC = () => {
  const navigate = useNavigate();

  const handleAddTransaction = async (values: TransactionValue) => {
    const apiUrl = "https://week-15-jokosetiawan-dev-production.up.railway.app/";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json", // Specify the content type
        },
      });
      const data = await response.json();
      console.log(data);
      navigate("/");
    } catch (error) {
      console.error(error); // Use console.error for errors
    }
  };

  return (
    <div
      className="row justify-content-center align-items-center"
      style={{ minHeight: "100vh", maxWidth: "50vh" }}
    >
      <Formik
        initialValues={{
          user_id: 1,
          type: "",
          amount: 1,
        }}
        validationSchema={TransactionSchema}
        onSubmit={handleAddTransaction}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="user_id" className="form-label">
              User id
            </label>
            <Field name="user_id" type="number" className="form-control" />
            <ErrorMessage name="user_id" />
          </div>
          <div className="mb-3">
            <label htmlFor="type" className="form-label">
              Type
            </label>
            <Field name="type" type="text" className="form-control" />
            <ErrorMessage name="type" />
          </div>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <Field name="amount" type="number" className="form-control" />
            <ErrorMessage name="amount" />
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-primary" type="submit">
              Add
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default NewTransaction;

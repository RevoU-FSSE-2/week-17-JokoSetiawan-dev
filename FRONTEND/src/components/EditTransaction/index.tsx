import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

interface TransactionValue {
  user_id: number;
  type: string;
  amount: number;
}

const TransactionSchema = Yup.object().shape({
  user_id: Yup.number().required("Input user_id"),
  type: Yup.string().required("Input type"),
  amount: Yup.number().required("Input amount"),
});

const EditTransaction: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState<TransactionValue>({
    user_id: 1,
    type: "",
    amount: 1,
  });

  useEffect(() => {
    // Fetch the existing category data using categoryId and populate initialValues.
    const apiUrl = `https://week-15-jokosetiawan-dev-production.up.railway.app/${id}`;

    fetch(apiUrl, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setInitialValues({ user_id: data.user_id ,type: data.type, amount: data.amount});
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleEditTransaction = async (values: TransactionValue) => {
    const apiUrl = `https://week-15-jokosetiawan-dev-production.up.railway.app/${id}`;

    try {
      const response = await fetch(apiUrl, {
        method: "PUT", // Use PUT or PATCH for updating data.
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.log("Failed to update transaction.");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div
      className="row justify-content-center align-items-center"
      style={{ minHeight: "100vh", maxWidth: "50vh" }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={TransactionSchema}
        onSubmit={handleEditTransaction}
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
              Update
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default EditTransaction;

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Accessories = () => {
  const navigate = useNavigate();

  const initial = {
    name: "",
    price: "",
    modelnumber: "",
    uniquenumber: Math.floor(1000 + Math.random() * 9000),
  };
  const validation = yup.object({
    name: yup.string().required(),
    price: yup.number().required(),
    modelnumber: yup.number().required(),
    uniquenumber: yup.number().required(),
  });

  const submit = (value) => {
    value.intrested = ''
    axios.post("http://localhost:3002/accessories", value).then((res) => {
      toast.success("Data Added Sucessfully !", {
        position: toast.POSITION.TOP_CENTER,
      });
    });
    navigate("/table");
  };

  return (
    <>
      <Formik
        initialValues={initial}
        validationSchema={validation}
        onSubmit={(value, { resetForm }) => {
          submit(value);

          resetForm({ value: "" });
        }}
      >
        <Form>
          <div className="d-flex justify-content-center align-items-center w-100vw vh-100">
            <div className="w-50 bg-white border shadow">
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <h3> Add Accessories </h3>

                  <label htmlFor="">Accessory Name:</label>
                  <Field type="text" name="name" className="form-control" />
                  <ErrorMessage
                    name="name"
                    render={(msg) => <div className="text-danger">{msg}</div>}
                  />

                  <label htmlFor="">Price :</label>
                  <Field type="number" name="price" className="form-control" />
                  <ErrorMessage
                    name="price"
                    render={(msg) => <div className="text-danger">{msg}</div>}
                  />

                  <label htmlFor="">Model Number :</label>
                  <Field
                    type="number"
                    name="modelnumber"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="modelnumber"
                    render={(msg) => <div className="text-danger">{msg}</div>}
                  />

                  <label htmlFor="">Unique Accessories Number :</label>
                  <Field
                    type="number"
                    name="uniquenumber"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="uniquenumber"
                    render={(msg) => <div className="text-danger">{msg}</div>}
                  />

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default Accessories;

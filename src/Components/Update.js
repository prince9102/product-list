import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  let user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!localStorage.getItem("user")) {
        navigate('/login')
    }else{
        user?.role != "Admin" &&  navigate("/usertable") 
    }
  }, []);
  
  const initial = {
    name: "",
    price: "",
    modelnumber: "",
    uniquenumber: "",
    intrested: "",
  };
  const validation = yup.object({
    name: yup.string().required(),
    price: yup.number().required(),
    modelnumber: yup.number().required(),
    uniquenumber: yup.number().required(),
  });

  useEffect(() => {
    axios
      .get("http://localhost:3002/accessories/" + id)

      .then((res) => {
        setData(res.data);
        initial.name = res?.data?.name;
        initial.price = res?.data?.price;
        initial.modelnumber = res?.data?.modelnumber;
        initial.uniquenumber = res?.data?.uniquenumber;
        initial.intrested = res?.data?.intrested;

        console.log(initial, "initial");
      })
      .catch((error) => console.log(error));
  }, []);

  const submit = (value) => {
    axios.put("http://localhost:3002/accessories/" + id, value).then((res) => {
      console.log(res.data);

      toast.success("Data Updated Sucessfully !", {
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

export default Update;

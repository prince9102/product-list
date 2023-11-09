import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Table } from "react-bootstrap";
import { ClipLoader } from "react-spinners";

export const Tables = () => {
  const [data, setData] = useState([]);
  const [state, setState] = useState();
  const navigate = useNavigate();
  const [loading , setloading] = useState(false)

  useEffect(() => {
    getData();
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!localStorage.getItem("user")) {
        navigate('/login')
    }else{
        user?.role != "Admin" &&  navigate("/usertable") 
    }
  }, []);

  const getData = () => {
    setloading(true)
    axios
      .get("http://localhost:3002/accessories")
      .then((res) => {
        setData(res.data);
        setloading(false)
        console.log(res.data);
      })

      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are You Sure to Delete")) {
      axios.delete(`http://localhost:3002/accessories/${id}`).then((res) => {
        if (res) {
          getData();
        }
      });
    }
  };




  return (
    <>
      <Table bordered striped>
        <thead>
          <tr>
            <th scope="col"> Accessory Name</th>
            <th scope="col">Price</th>
            <th scope="col">Model NO. </th>
            <th scope="col">Unique No.</th>
            {user?.role == "Admin" && <th scope="col">Intrested User.</th>}
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {!loading ? data &&
            data?.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item?.name}</td>
                  <td>{item?.price}</td>
                  <td>{item?.modelnumber}</td>
                  <td>{item?.uniquenumber}</td>
                  <td>{item?.intrested ? item?.intrested : "- -"}</td>

                  <td>
                    <Link to={`/update/${item?.id}`} className="btn btn-info">
                      Update
                    </Link>
                  </td>
                  <td>
                    <Link
                      onClick={(e) => handleDelete(item?.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </Link>
                  </td>

              
                </tr>
              );
            })
            :
            <tr>
                <td colSpan={5}>
                    <div style={{display:'flex', justifyContent:'center' , alignItems:'center'}}>
                        <ClipLoader
                        color="red"
                        loading={true}
                        size={180}
                        aria-label="Loading Spinner"
                        data-test id="loader"
                        />
                    </div>
                </td>
            </tr>}

        </tbody>
      </Table>
    </>
  );
};

export default Tables;

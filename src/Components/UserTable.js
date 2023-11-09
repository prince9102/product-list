import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const UserTable = () => {
  const [data, setData] = useState([]);
  const [search , setsearch] = useState('')
  

  let user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3002/accessories")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })

      .catch((error) => console.log(error));
  }, []);


  const handleIntrested = (e) => {
    console.log(e , 'eee');
    let user = JSON.parse(localStorage.getItem("user"));
    let payload = {
      name: e.name,
      price: e.price,
      modelnumber: e.modelnumber,
      uniquenumber: e.uniquenumber,
    
      intrested: user.name,
    };

    axios
      .put("http://localhost:3002/accessories/" + e.id, payload)
      .then((res) => {
        toast.success(`User intrested in ${e.name}`, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };


  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, []);

  return (
    <>
    <div className="col-md-5">
        <lable >Search here :</lable>
        <input type="text" placeholder="search by accessory name" className="form-control" onChange={(e)=>setsearch(e.target.value)}/>
    </div>
      <Table bordered striped>
        <thead>
          <tr>
            <th scope="col"> Accessory Name</th>
            <th scope="col">Price</th>
            <th scope="col">Model NO. </th>
            <th scope="col">Unique No.</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data?.filter((item)=>{
                if(search=='' || item.name.toLowerCase().includes(search.toLowerCase())){
                    return item;
                }
            }).map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item?.name}</td>
                  <td>{item?.price}</td>
                  <td>{item?.modelnumber}</td>
                  <td>{item?.uniquenumber}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => {
                        handleIntrested(item)
                    }}> Interested</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default UserTable;

import {useEffect, useState} from "react";
import {useLoginMutation} from "../state/authApiSlice.js";
import {useNavigate} from "react-router-dom";
import Email from "./Components/EmailInput.jsx";
import Error from "../Components/Feedbacks/Error.jsx";
import Password from "./Components/PasswordInput.jsx";
import {setTitle} from "../state/titleSlice.js";
import {useDispatch} from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitle("Log in"));
  }, []);
  
  const [apiLogin] = useLoginMutation();
  const navigate = useNavigate();
  const [logdata, setLogdata] = useState({email: "", password: ""});
  const [error, setError] = useState(null);

  const handelChange = target => {
    setLogdata({...logdata, [target.name]: target.value});
  };

  function handelSubmit(e) {
    e.preventDefault();
    apiLogin({
      body: logdata,
    }).then(resp => {
      resp.data ? navigate("/") : setError("Authentication failed. Try again!");
    });
  }

  return (
    <form action="" className="bg-primary size-fit p-5 rounded form-control gap-2 ">
      <Error message={error} closeFunction={() => setError("")} />
      <Email data={logdata} handelChange={handelChange} />
      <Password data={logdata} handelChange={handelChange} />
      <button onClick={e => handelSubmit(e)}>Login</button>
    </form>
  );
}

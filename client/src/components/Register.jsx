import React, {useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import cine from 'C:/Users/Abhilash/Downloads/pern-login-master/client/src/assets/1.png';
import coll from 'C:/Users/Abhilash/Downloads/pern-login-master/client/src/assets/gandr-collage2.jpg';

const url = "http://localhost:5000/auth"

const Register = ({setAuth}) => {
    const navigate = useNavigate();
    const [ name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCpassword] = useState("")
    const [error, setError] = useState("")
    const [postResponse, setPostResponse] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password !== cpassword){
            setError("Invalid Passwords")
            toast(error, {type: "error", theme: "dark"})
        }else if(name == "" && name.length < 4){
            setError("Invalid Name")
            toast(error, {type: "error", theme: "dark"})
        }else if(email == ""){
            setError("Invalid Email")
            toast(error, {type: "error", theme: "dark"})
        }
        else{
            const data = { 
                name, 
                email,
                password,
                cpassword
            }
            axios.post(`${url}/addUser`, data).then((response) => {
                console.log(response)
                if(response.status == 200){
                    setPostResponse("Saved Successfully")
                    const token = response.data.token
                    if(token){
                        localStorage.setItem("token", token);
                        setAuth(true);
                        toast.success(postResponse);
                    }else{
                        setAuth(false)
                        toast.error("Register Failed")
                    }
                }
            })
        }

    }

    const handleClick = () =>{
        navigate(`/login`);
    }

    const mainStyles = {
        width: '43%',
        height: '80%',
        backgroundImage: `url(${coll})`,
        boxShadow: '-7px 9px 21.9px 15px rgba(0, 0, 0, 0.25)',
        backgroundSize: '869px',
        marginLeft: '75px',
        objectPosition: '25% 25% 25% 25%',
        borderRadius: '40px',
        opacity: 1,
        flexShrink: 0,
      };
    
      const containerStyles = {
        position: 'relative',
        height: '90%',
        width: '60%',
        marginTop: '2%',
        marginLeft: '16%',
        padding: '16px',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '40px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      };
    
      const inputStyles = {
        width: '75%',
        marginLeft: '9%',
        marginBottom: '8%',
        border: '2px solid black',
        padding: '15px',
        borderRadius: '10px',
        fontFamily: '"Libre Franklin"',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: 400,
      };
    
      const buttonStyles = {
        backgroundColor: 'black',
        width: '60%',
        height: '10%',
        borderRadius: '30px',
        marginLeft: '20%',
        border: 'none',
        marginTop: '50px',
        cursor: 'pointer',
        fontFamily: 'Inter',
        fontSize: '36px',
        fontStyle: 'normal',
        fontWeight: 900,
        lineHeight: 'normal',
        color: 'white',
        transition: '0.7s',
      };
    
      const radioStyles = {
        display: 'flex',
        justifyContent: 'center',
      };
    
      const radioLabelStyles = {
        marginLeft: '10px',
      };
    
      return (
        <body style={{ backgroundColor: 'black',background: 'radial-gradient(130.64% 55.78% at 21.64% 69.44%, #000 0%, #892727 35.38%, #F00 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100vw', height: '100vh', margin: '0%' }}>
          <div style={mainStyles}>
            <form className="container" style={containerStyles} onSubmit={handleSubmit}>
              <h1 style={{ color: '#000', fontFamily: 'Inter', fontSize: '36px', fontStyle: 'normal', fontWeight: 900, textAlign: 'center', marginBottom: '20px' }}>
                REGISTER
              </h1>
              <input type="text" placeholder="E-mail" name="email" required style={inputStyles} id="e-mail" onChange={(e) => setEmail(e.target.value)}/>
              <input type="text" placeholder="Username" name="username" required style={inputStyles} id="name" onChange={(e) => setName(e.target.value)}/>
              <input type="password" placeholder="Password" name="password" required style={inputStyles} id="passwd" onChange={(e) => setPassword(e.target.value)}/>
              <input type="password" placeholder="Confirm Password" name="cpassword" required style={inputStyles} id="cpasswd" onChange={(e) => setCpassword(e.target.value)}/>
              {/* <div className="radio" style={radioStyles}>
                <p style={radioLabelStyles}>Choose user type : </p>
                <div style={radioStyles}>
                  <input type="radio" id="critic" name="type" value="Critic" required />
                  <label htmlFor="critic" style={radioLabelStyles}>Critic</label>
                  <input type="radio" id="audience" name="type" value="Audience" required />
                  <label htmlFor="audience" style={radioLabelStyles}>Audience</label>
                </div>
              </div> */}
              <button type="submit" className="button" style={buttonStyles} >
                REGISTER
              </button>
            </form>
          </div>
    <img className="cine-img" src={cine} style={{ height: '100vh' }} />
        </body>

    // <div>
    //     <h2 className="mt-5 text-center">Register Page</h2>
    //     <form onSubmit={handleSubmit}>
    //         <div className="mb-3">
    //             <label htmlFor="name" className="form-label">Full Name</label>
    //             <input type="text" value={name} className="form-control my-3" id="name" placeholder="Baboon Emefiele" onChange={(e) => setName(e.target.value)} />
    //         </div>
    //         <div className="mb-3">
    //             <label htmlFor="email" className="form-label">Email address</label>
    //             <input type="email" value={email} className="form-control my-3" id="email" placeholder="emefiele@inec.com" onChange={(e) => setEmail(e.target.value)}/>
    //         </div>
    //         <div className="mb-3">
    //             <label htmlFor="password" className="form-label">Password</label>
    //             <input type="password" value={password} className="form-control my-3" id="password" placeholder="*******"  onChange={(e) => setPassword(e.target.value)}/>
    //         </div>
    //         <div className="mb-3">
    //             <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    //             <input type="password" value={cpassword} className="form-control my-3" id="cpassword" placeholder="*******" onChange={(e) => setCpassword(e.target.value)}/>
    //         </div>
    //         <button type="submit" className="btn btn-success">Register</button>
    //     </form>
    // </div>
  )
}

export default Register
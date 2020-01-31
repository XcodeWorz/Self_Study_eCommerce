import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link, Redirect } from 'react-router-dom'
import { read, update, updateUser } from './ApiUser'


const Profile = ({match}) => {

  const [values, setValues] = useState({
    name: '',
    email: '',
    password:'',
    error:'',
    error:'',
    success:false
  })
  const {name, email, password, error, success} = values

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const init = (userId) =>{
    read(userId, token).then(data=>{
      if(data.error){
        setValues({...values, error: true})
      }else{
        setValues({...values,
        name: data.name,
      email: data.email})
      }
    })
  }

  const handleChange = name => e =>{
    setValues({...values, error: false, [name]:e.target.value})
  }

  const redirectUser = (success) =>{
    if(success){
      return <Redirect to="/cart"/>
    }
  }

  const clickSubmit = (e) =>{
    e.preventDefault()
    update(userId, token, { name, email, password }).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        updateUser(data, () => {
          setValues({
            ...values,
            name: data.name,
            email: data.email,
            success: true
          });
        });
      }
    });
  }
  const profileUpdate = (name, email, password) =>{
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            onChange={handleChange("name")}
            className="form-control"
            value={name}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            type="email"
            onChange={handleChange("email")}
            className="form-control"
            value={email}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            type="password"
            onChange={handleChange("password")}
            className="form-control"
            value={password}
          />
        </div>
        <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
      </form>
    );
  }

  useEffect (()=>{
    init(userId)
    console.log('match user id: ', match)
  }, [])

  return (
    <Layout
      title="Profile Update"
      description="Update your profile"
      className="container-fluid"
    >
      <h2 className="mb-4">Profile Update</h2>
      <div className="row">
        {profileUpdate(name, email, password)}
        {redirectUser(success)}
      </div>
    </Layout>
  );
}

export default Profile; 
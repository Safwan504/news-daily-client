import React, { useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import glogo from '../../images/google.png';
import { Link } from 'react-router-dom';

initializeApp(firebaseConfig);

// function start

const GoogleLogin = () => {
  const [createUser, setCreateUser] = useState(false);
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  })

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const foundUser = JSON.parse(localUser);
      setUser(foundUser);
      setLoggedInUser(foundUser);
      history.replace(from);
    }
  }, []);

  const googleProvider = new GoogleAuthProvider();
  const handleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const { displayName, photoURL, email } = result.user;
        const googleUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(googleUser)
        setLoggedInUser(googleUser);
        history.replace(from);
        localStorage.setItem('user', JSON.stringify(googleUser))
        // console.log(googleUser)
      })
      .catch((error) => {
        const errorMessage = error.message;
      });
  }

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then((res) => {
      const signedOutuser = {
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
      }
      localStorage.clear();
      setUser(signedOutuser)
    }).catch((error) => {
      // An error happened.
    });
  }

  // email login
  const handleOnBlur = (e) => {
    let isFormValid = true;
    if (e.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      isFormValid = e.target.value.length > 4;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    console.log(user.email, user.password)
    if (createUser && user.email && user.password) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          const newUserInfo = { ...user }
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUser(user.name)
          // const newUser = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorMessage = error.message;
          const newUserInfo = { ...user };
          newUserInfo.error = errorMessage;
          newUserInfo.success = false;

          setUser(newUserInfo)

        });
    }
    if (!createUser && user.email && user.password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          const newUserInfo = { ...user }
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          localStorage.setItem('user', JSON.stringify(newUserInfo))
        })
        .catch((error) => {
          const errorMessage = error.message;
          const newUserInfo = { ...user };
          newUserInfo.error = errorMessage;
          newUserInfo.success = false;
          setUser(newUserInfo)
        });
    }
    e.preventDefault();
  }

  const updateUser = (name) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      console.log('update successful')
      // ...
    }).catch((error) => {
      console.log(error)
      // ...
    });
  }
  return (
    <div>
      {/* email login */}<br />

      <form className="mt-5" onSubmit={handleSubmit}>
        {createUser && <input type="text" name="name" onBlur={handleOnBlur} placeholder="Your Name" required />}
        <br />
        <input className="mt-2" type="text" name="email" onBlur={handleOnBlur} placeholder="Your Email" required />
        <br />
        <input className="mt-2" type="password" name="password" onBlur={handleOnBlur} placeholder="Your Password" required />
        <br />
        <input className="mt-2" type="submit" value={createUser ? "Sign Up" : "Log in"} />
      </form>
      <p className="text-danger">{user.error}</p>
      {
        user.success && <a href="/login"><button className="btn btn-success">User {createUser ? 'Created' : 'Logged in'} Successfully, Go to Login Page</button></a>
      }
      <br />
      <button className="btn btn-primary" onClick={handleSignIn}><img width='20px' src={glogo} alt="G" /> Sign in with Google</button> <br />
      <label className="mt-3 me-1" htmlFor="createUser">Sign up for new account </label>
      <input type="checkbox" onChange={() => setCreateUser(!createUser)} name="createUser" id="" />

    </div>
  );
};

export default GoogleLogin;
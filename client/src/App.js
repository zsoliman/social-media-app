import './App.css';
import { useState, useEffect, useRef } from 'react'
import store from './store';
import { connect } from 'react-redux'
import Navbar from './Navbar'

function App() {
  const [posts, setPosts] = useState([])
  const form = useRef()

  useEffect(() => {
    const getPosts = async () => {
      try { //attempt this code block
        let req = await fetch('http://localhost:3100/posts')
        let res = await req.json()
        if (req.ok) {
          setPosts(res)
        } else {
          alert('Posts could not be loaded')
        }

      } catch (error) { //run this code block if the above block fails
        alert(error.message)
      }
    }
    getPosts()
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(form.current)
    let req = await fetch('http://localhost:3100/login', {
      method: 'POST',
      body: data
    })

    let res = await req.json()
    if (req.ok) {
      console.log('User', res)
      store.dispatch({ type: 'user/login', user: res })
    } else {
      alert('Invalid email or password')
    }
  }



  const [email, setEmail] = useState('')

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    let req = await fetch('http://localhost:3100/forgot_password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email })
    })
    if (req.ok) {
      let res = await req.json()
      let securityQuestion = window.confirm("Is it really u tho? Say 'ok' if it is you. Don't lie :/")
      if (securityQuestion) {
        alert(`Ok cool your password is: ${res.password}`)
      } else {
        alert("Ok quit playing please")
      }
    }
  }

  const addValue = () => {
    store.dispatch({ type: 'counter/incremented' })
  }

  const removeValue = () => {
    store.dispatch({ type: 'counter/decremented' })
  }

  return (
    <div className="App">
      <Navbar />
      <h2>News Feed</h2>
      {
        posts.map((post) => {
          return (
            <div key={post.id}>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </div>
          )
        })
      }


      <hr />
      <h2>Log In</h2>
      <form onSubmit={handleSubmit} ref={form}>
        <input name='email' type='email' placeholder='email...' /><br />
        <input name='password' type='password' placeholder='password...' /><br />
        <input type='submit' />
      </form>

      <h2>Forgot your password?</h2>
      <p>
        Fill out the form and complete the security questions
        to recover your account!
      </p>
      <form onSubmit={handleForgotPassword}>
        <input type='email' placeholder='Enter your email...' onChange={(e) => { setEmail(e.target.value) }} />
        <input type='submit' />
      </form>

      <hr />
      <h4>Global Count Is: {store.getState().value}</h4>
      <button onClick={addValue}>ADD VALUE</button>
      <button onClick={removeValue}>REMOVE VALUE</button>

    </div>
  );
}

const mapStateToProps = state => {
  // tells the component which values in redux to subscribe to
  return { value: state.value }
}
export default connect(mapStateToProps)(App)
// export default App;

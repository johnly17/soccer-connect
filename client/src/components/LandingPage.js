import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

function LandingPage({ user }) {
  return (
    <div className='landing-page'>
      <div className='welcome-banner'>
      <h1 className="text-center" style={{paddingTop: '20px'}}>
        Hello, World!
      </h1>
      <h2 className="text-center">This is Soccer Connect, a platform where users come together to play soccer!</h2>
      </div>

      <h3 className="text-center" style={{paddingTop: '20px'}}>
        Log in or sign up to start registering for events!
      </h3>
      <div className='text-center'>
        <Button href='/login' style={{marginRight: '10px'}}>Log In</Button>
        <Button href='/signup'>Sign Up</Button>
      </div>
    </div>
  );
}

export default LandingPage;

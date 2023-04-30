import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const RegisterForm = ({ onChange, onSubmit }) => {
  return (
    <Form onSubmit={onSubmit} className="user_forms register_form">
      <h4 className="user_forms_header">Register a New Account</h4>
      <Form.Group className="mb-3" controlId="1">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          placeholder="Username"
          onChange={onChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="2">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="name@example.com"
          onChange={onChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
        <Form.Label>Password Confirmation</Form.Label>
        <Form.Control
          type="password"
          name="password_confirmation"
          placeholder="Password"
          onChange={onChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="3">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="First Name"
          name="first_name"
          onChange={onChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="4">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Last Name"
          name="last_name"
          onChange={onChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="bio1">
        <Form.Label>Profile Bio</Form.Label>
        <Form.Control
          as="textarea"
          type="text"
          name="bio"
          rows={3}
          placeholder="Details about you"
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Profile Picture</Form.Label>
        <Form.Control type="file" name="profile_photo" onChange={onChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default RegisterForm;

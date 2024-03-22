const LoginForm = () => {
  return (
    <form action="">
      <div className="form-input-wrapper">
        <label htmlFor="email">Email address</label>
        <input type="email" id="email" className="form-input" />
      </div>
      <div className="form-input-wrapper">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" className="form-input" />
      </div>
      <button className="button button-primary">Sign in</button>
    </form>
  );
};

export default LoginForm;

import Signup from "../../components/signup/Signup";

import "./auth.scss";

const SignupPage = () => {
  return (
    <main className="auth">
      <div className="auth__wrapper">
        <div className="auth__inner">
          <Signup />
        </div>
      </div>
    </main>
  );
};

export default SignupPage;

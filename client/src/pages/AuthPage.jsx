import LogIn from "../components/logIn/LogIn";
import SignUp from "../components/signUp/SignUp";

const AuthPage = () => {
  return (
    <main className="auth">
      <div className="auth__wrapper">
        <SignUp />
        {/* <LogIn /> */}
      </div>
    </main>
  );
};

export default AuthPage;

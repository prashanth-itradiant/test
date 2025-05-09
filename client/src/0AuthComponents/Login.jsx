import React from "react";

const Login = () => {
  const handleGoogleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const handleGithubLogin = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };

  const handleFacebookLogin = () => {
    window.open("http://localhost:5000/auth/facebook", "_self");
  };

  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-sm flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Login</h1>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 transition-all duration-200 w-full py-3 rounded-lg font-semibold shadow-sm mb-4"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
            className="w-5 h-5 mr-2"
          />
          Login with Google
        </button>

        <button
          onClick={handleGithubLogin}
          className="flex items-center justify-center bg-black text-white hover:bg-gray-900 transition-all duration-200 w-full py-3 rounded-lg font-semibold shadow-sm"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.2-1.3-1.5-1.3-1.5-1-.7.1-.7.1-.7 1.1.1 1.6 1.1 1.6 1.1 1 .1 1.6-.7 1.6-.7.1-.6.4-1 .7-1.3-2.5-.3-5-1.2-5-5.3 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.5.1-3.1 0 0 .9-.3 3 .9.9-.3 1.9-.5 2.8-.5.9 0 1.9.2 2.8.5 2.1-1.2 3-.9 3-.9.6 1.6.2 2.8.1 3.1.7.8 1.1 1.8 1.1 2.9 0 4.2-2.5 5-5 5.3.4.3.8 1 .8 2v2.9c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
          </svg>
          Login with GitHub
        </button>
        <button
          onClick={handleFacebookLogin} // ✅ fixed
          className="flex items-center justify-center bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 transition-all duration-200 w-full py-3 rounded-lg font-semibold shadow-sm mt-4"
        >
          <img
            src="https://www.svgrepo.com/show/475647/facebook-color.svg"
            alt="Facebook logo"
            className="w-5 h-5 mr-2"
          />
          Login with Facebook
        </button>
      </div>
    </div>
  );
};

export default Login;

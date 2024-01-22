"use client";

const Register: React.FC = () => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Register");
  };

  return (
    <div className="flex items-center justify-center bg-neutral-900 px-4 py-8 sm:py-40">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-center text-3xl font-bold text-neutral-900">
          Register
        </h1>
        <form action="" onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="text-sm text-neutral-900">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full rounded border border-gray-400 p-2 text-neutral-900"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-sm text-neutral-900">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded border border-gray-400 p-2 text-neutral-900"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-sm text-neutral-900">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full rounded border border-gray-400 p-2 text-neutral-900"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="repeatpassword"
              className="text-sm text-neutral-900"
            >
              Repeat Password
            </label>
            <input
              id="repeatpassword"
              type="password"
              className="w-full rounded border border-gray-400 p-2 text-neutral-900"
            />
          </div>
          <button
            type="submit"
            className="hover:bg-custom-amber-700 mt-4 w-full rounded bg-custom-amber-800 p-2 text-white"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

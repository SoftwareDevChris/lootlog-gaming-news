import { SignIn } from "@clerk/nextjs";

const Login: React.FC = () => {
  return (
    <div className="flex w-full items-center justify-center p-4 sm:p-8">
      <SignIn />
    </div>
  );

  // return (
  //   <div className="flex items-center justify-center bg-neutral-900 px-4 py-8 sm:py-40">
  //     <div className="rounded-lg bg-white p-8 shadow-lg">
  //       <h1 className="mb-8 text-center text-3xl font-bold text-neutral-900">
  //         Login
  //       </h1>
  //       <form action="" onSubmit={onSubmit}>
  //         <div className="mb-4">
  //           <label htmlFor="email" className="text-sm text-neutral-900">
  //             Email
  //           </label>
  //           <input
  //             id="email"
  //             type="email"
  //             className="w-full rounded border border-gray-400 p-2 text-neutral-900"
  //           />
  //         </div>
  //         <div className="mb-4">
  //           <label htmlFor="password" className="text-sm text-neutral-900">
  //             Password
  //           </label>
  //           <input
  //             id="password"
  //             type="password"
  //             className="w-full rounded border border-gray-400 p-2 text-neutral-900"
  //           />
  //         </div>
  //         <button
  //           type="submit"
  //           className="hover:bg-custom-amber-700 mt-4 w-full rounded bg-custom-amber-800 p-2 text-white"
  //         >
  //           Login
  //         </button>
  //       </form>
  //     </div>
  //   </div>
  // );
};

export default Login;

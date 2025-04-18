'use client';

import LoginForm from "@/app/components/LoginForm";

const Login = () => {

    interface User {
        _id: number;
        username: string;
        password: string;
    }

    const handleAddUser = (newUser:User) => {
        console.log(`Username: ${newUser.username} | Password: ${newUser.password} logged in.
            This is a placeholder function for until we implement MongoDB connection.`);
    }

    return (
        <div className="flex grow-0 shrink-1 basis-0 items-center justify-center w-full min-h-full">
            <div className="FormBox RegisterLogin">
                <h1 className="text-2xl dark:text-white light:text-black mt-4 mb-8">Login</h1>
                <p className="mb-8">Don't have an account? <a className="link underline" href="/register">Register</a></p>
                <LoginForm onLogin={handleAddUser}/>
            </div>
        </div>
    )
}

export default Login;
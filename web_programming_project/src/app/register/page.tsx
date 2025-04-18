'use client';

import RegisterForm from "@/app/components/RegisterForm";

const Register = () => {

    interface User {
        _id: number;
        username: string;
        password: string;
    }

    const handleAddUser = (newUser:User) => {
        console.log(`Username: ${newUser.username} | Password: ${newUser.password} added.
            This is a placeholder function for until we implement MongoDB connection.`);
    }

    return (
        <div className="flex grow-0 shrink-1 basis-0 items-center justify-center w-full min-h-full">
            <div className="RegisterLogin">
                <h1 className="text-2xl text-text mt-4 mb-8">Register</h1>
                <p className="mb-8">Already have an account? <a className="link underline" href="/login">Login</a></p>
                <RegisterForm onRegister={handleAddUser}/>
            </div>
        </div>
    )
}

export default Register;
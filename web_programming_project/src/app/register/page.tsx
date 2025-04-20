'use client';

import RegisterForm from "@/components/RegisterForm";

const Register = () => {

    interface User {
        _id: number;
        username: string;
        password: string;
    }

    const handleAddUser = async (newUser: User) => {
        try {
          const response = await fetch("/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: newUser.username,
              password: newUser.password
            })
          });
    
          const data = await response.json();
    
          if (response.ok) {
            alert("Registration successful!");
          } else {
            alert(`Registration failed: ${data.message}`);
          }
        } catch (error) {
          console.error("Registration error:", error);
          alert("Something went wrong during registration.");
        }
      };

    return (
        <div className="flex grow-0 shrink-1 basis-0 items-center justify-center w-full min-h-full">
            <div className="FormBox RegisterLogin">
                <h1 className="text-2xl text-text mt-4 mb-8">Register</h1>
                <p className="mb-8">Already have an account? <a className="link underline" href="/login">Login</a></p>
                <RegisterForm onRegister={handleAddUser}/>
            </div>
        </div>
    )
}

export default Register;
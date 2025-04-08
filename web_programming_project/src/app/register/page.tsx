const Register = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-accent-background p-10 rounded-lg w-full max-w-md text-center">
                <h1 className="text-2xl dark:text-white light:text-black">Register</h1>
                <p>Already have an account? <a className="link underline" href="/Login">Login</a></p>
                {/* add a form and ensure css styling is correct. Next, add /Login */}
            </div>
        </div>
    )
}

export default Register;
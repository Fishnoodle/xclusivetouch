import { Button } from "@material-tailwind/react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

export default function ConfirmPassword() {
    const router = useRouter();
    const { id } = router.query;

    // Usestates
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    async function confirm(event) {
        event.preventDefault();

        if (!id) {
            toast.error('Invalid request: ID is missing');
            return;
        }

        const response = await fetch(`https://api.xclusivetouch.ca/api/confirmreset/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password,
                confirmPassword: confirmPassword
            })
        });

        const data = await response.json();
        console.log(data);

        if (!data.error) {
            toast.success('Password reset successful! You can now login');
            window.location.href = '/login';
        } else {
            console.log('err');
            toast.error('Password reset failed: ' + data.error);
        }
    }

    return (
        <>
            <Toaster />
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                <div className='sm-mx-auto sm:w-full sm:max-w-sm'>
                    <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                        Confirm your new password
                    </h2>
                </div>

                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <form className='space-y-6' action='#' method='POST'>
                        <div>
                            <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
                                New Password
                            </label>
                            <div className='mt-2'>
                                <div className='relative'>
                                    <input
                                        id='password'
                                        name='password'
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete='current-password'
                                        required
                                        className='block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge='end'
                                        style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor='confirmPassword' className='block text-sm font-medium leading-6 text-gray-900'>
                                Confirm New Password
                            </label>
                            <div className='mt-2'>
                                <div className='relative'>
                                    <input
                                        id='confirmPassword'
                                        name='confirmPassword'
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        autoComplete='confirm-password'
                                        required
                                        className='block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        edge='end'
                                        style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Button
                                buttonType='filled'
                                size='regular'
                                rounded={false}
                                block={false}
                                iconOnly={false}
                                ripple='light'
                                onClick={confirm}
                            >
                                Confirm Password
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
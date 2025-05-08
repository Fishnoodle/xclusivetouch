import Button from "@material-tailwind/react/components/Button"
import { React, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import Link from 'next/link';

export default function ResetPasswordSection() {
    // Usestates
    const [email, setEmail] = useState('');
    const [buttonText, setButtonText] = useState('Reset Password');

    async function reset(event) {
        event.preventDefault();
        setButtonText('Resetting Password');

        const response = await fetch('https://api.xclusivetouch.ca/api/forgotpassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        });

        const data = await response.json()

        if (!data.error) {
            toast.success('Password reset email sent! Check your inbox')
        } else {
            console.log('err')
            toast.error('Password reset failed: ' + data.error)
            setButtonText('Reset Password')
        }
    }

    return (
        <>
            <Toaster />
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                        Reset your password
                    </h2>
                </div>

                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <form className='space-y-6' action='#' method='POST'>
                        <div>
                            <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                                Email address
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='email'
                                    name='email'
                                    type='email'
                                    required
                                    className='block w-full px-4 py-2 text-base leading-6 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
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
                                onClick={reset}
                            >
                                {buttonText}
                            </Button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Got your password?{' '}
                        <Link href='/login' className="font-semibold leading-6 text-[#D4AF37]">
                        Back to login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
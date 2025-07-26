import React from 'react';
import { LoginForm } from '@/components/LoginForm';

export default function LoginPage() {
    return (
        <div className="w-[1440px] h-[839px] flex">
            {/* Left side - Login Form */}
            <div className="flex-1 flex items-center justify-center">
                <div className="w-[720px] h-[304px] flex justify-center items-center">
                    <div className='flex flex-col w-[576px] h-[304px] gap-[20px] rounded-[8px] gap-5'>
                        <div className="h-[25px] gap-[10px] ">
                            <h2 className="font-inter font-bold text-[20px] leading-[25px] tracking-normal text-gray-900">Welcome back</h2>
                        </div>

                        <LoginForm />

                        <footer className="fixed bottom-0 left-0 w-[720px] h-[117px] flex justify-center items-center py-[12px]">
                            <p className="font-normal text-[14px] leading-[21px] tracking-normal text-gray-500">&copy; 2024 tentwenty</p>
                        </footer>
                    </div>
                </div>
            </div>

            {/* Right side - Branding */}
            <div className="hidden lg:block flex-1 bg-blue-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col gap-3 w-[576px] h-[178px] text-white">
                        <h1 className="font-semibold text-[40px] leading-[60px] tracking-normal align-middle h-[60px]">ticktock</h1>
                        <p className="font-normal text-[16px] leading-[24px] tracking-normal text-gray-200 h-[96px]">
                            Introducing ticktock, our cutting-edge timesheet web application designed
                            to revolutionize how you manage employee work hours. With ticktock, you
                            can effortlessly track and monitor employee attendance and productivity
                            from anywhere, anytime, using any internet-connected device.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

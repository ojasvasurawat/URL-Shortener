import { LogIn } from 'lucide-react';
import { Link } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

export default function Landing(){
    return(
        <>
            <div className="bg-[#0B101B] w-screen h-screen ">
                <nav className="
                    py-4 lg:py-8
                    flex

                ">
                    <div className="
                        ml-5 lg:ml-10
                        grow
                    ">
                        <name className="
                            bg-gradient-to-r from-[#EB568E] to-[#144EE3]
                            bg-clip-text
                            text-transparent
                            font-(SF Pro Display) font-bold font-xl
                            text-xl lg:text-3xl
                        ">
                            Url Shortener    
                        </name>
                    </div>
                    <button className="
                        text-white text-sm
                        font-(SF Pro Display)
                        px-3 lg:px-5 py-2 lg:py-3
                        border-gray-500 border-1 rounded-3xl
                        bg-gray-800
                        flex gap-2
                        mx-1 lg:mx-3
                    ">
                        Login <LogIn size={17} className='self-center'/>
                    </button>
                    <button className="
                        text-white text-sm
                        font-(SF Pro Display)
                        px-3 lg:px-5 py-2 lg:py-3
                        border-blue-600 border-1 rounded-3xl
                        bg-blue-600
                        lg:hover:shadow-lg/30 shadow-blue-400
                        flex-none
                        mr-5 lg:mr-10
                    ">
                        Register Now
                    </button>
                </nav>
                <hero>
                    <div className="flex justify-center">
                        <tagline className="
                            bg-gradient-to-r from-[#144EE3] via-[#EB568E] to-[#144EE3]
                            bg-clip-text
                            text-transparent
                            font-(SF Pro Display) font-bold font-xl
                            text-4xl lg:text-6xl
                            mt-10 lg:mt-20
                            p-3 lg:p-5
                            text-center
                            w-2/3 lg:w-1/2
                        ">
                            Shorten Your Looong Links :)
                        </tagline>
                    </div>
                    <div className="flex justify-center">
                        <div className="
                            text-[#C9CED6] text-center
                            w-2/3 lg:w-1/3
                            mt-2
                        ">
                            Url Shortener is an efficient and easy-to-use URL shortening service that streamlines your online experience
                        </div>
                    </div>
                    <div className="
                        flex
                        border-gray-500 border-2 rounded-full
                        h-15 lg:h-17
                        mt-10
                        w-4/5 lg:w-2/5
                        mx-auto
                    ">
                        <div className="
                            flex
                            text-white
                            m-5
                        ">
                            <Link className='self-center'/>
                        </div>
                        <input 
                            type='text'
                            placeholder='Enter the link here'
                            className='text-white grow'
                        />
                        <button className="
                            hidden lg:block
                            lg:flex-none
                            lg:bg-blue-600
                            lg:text-white
                            lg:rounded-full
                            lg:m-1
                            lg:px-7
                        ">
                            Shorten Now
                        </button>
                        <button className="
                            block lg:hidden
                            flex-none
                            bg-blue-600
                            ext-white
                            rounded-full
                            m-1
                            p-4
                        ">
                            <ArrowRight size={20} className='text-white'/>
                        </button>
                    </div>
                </hero>
                
            </div>
        </>
    )
}
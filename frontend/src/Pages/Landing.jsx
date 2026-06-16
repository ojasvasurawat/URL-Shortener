import { LogIn, Link, ArrowRight, Copy, Loader } from 'lucide-react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function Landing(){
    const [originalUrl, setOriginalUrl] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);
    const [shortUrl, setShortUrl] = useState("");

    const shortener = async ()=>{
        setButtonLoading(true);
        if (originalUrl === "") {
            toast.warning("Please fill required field.");
            setButtonLoading(false);
            return;
        }

        try{
            const response = await axios.post(`${backendUrl}/shortUrl`,{
                longUrl: originalUrl
            })

            // console.log(response.data);
            if(response.data){
                toast.success("url shortened successfully")
                setShortUrl(backendUrl+"/"+response.data.shortUrl);
            }
            else{
                toast.error("Process failed")
            }
            setButtonLoading(false);
        }catch(error){
            console.error("Process failed:", error);
            if (error.response?.data) {
                setButtonLoading(false)
                toast.error(`Process failed: ${error.response.data}`);
            } else {
                setButtonLoading(false)
                toast.error("Process failed: Unknown error occurred");
            }
        }
    }


    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            console.log("Copied!");
            toast.success("Copied!")
        } catch (err) {
            console.error("Failed to copy:", err);
            toast.error("Failed to copy")
        }
    };


    return(
        <>
            <div className="bg-[#0B101B] w-screen min-h-screen ">
                <ToastContainer/>
                <nav className="
                    py-4 lg:py-8
                    flex

                ">
                    <div className="
                        ml-5 lg:ml-10
                        
                    ">{/* grow will come here when you have auth */}
                        
                        <div className="
                            bg-gradient-to-r from-[#EB568E] to-[#144EE3]
                            bg-clip-text
                            text-transparent
                            font-(SF Pro Display) font-bold font-xl
                            text-xl lg:text-3xl
                        ">
                            Url Shortener    
                        </div>
                    </div>
                    {/* <button className="
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
                    </button> */}
                </nav>
                <div>
                    <div className="flex justify-center">
                        <div className="
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
                        </div>
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
                        w-17/20 lg:w-2/5
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
                            className='
                                text-white grow 
                                overflow-hidden
                                text-ellipsis
                                whitespace-nowrap
                                w-7/10
                            '
                            onChange={(e) => {setOriginalUrl(e.target.value)}}
                        />
                        <button className="
                            hidden lg:block
                            lg:flex-none
                            lg:bg-blue-600
                            lg:text-white
                            lg:rounded-full
                            lg:m-1
                            lg:px-7
                        "
                        onClick={shortener}
                        disabled={buttonLoading}
                        >
                            { buttonLoading ? "Shortening..." : "Shorten Now"}
                        </button>
                        <button className="
                            block lg:hidden
                            flex-none
                            bg-blue-600
                            ext-white
                            rounded-full
                            m-1
                            p-4
                        "
                        onClick={shortener}
                        disabled={buttonLoading}
                        >
                            { buttonLoading ? <Loader size={20} className='text-white'/> : <ArrowRight size={20} className='text-white'/>}
                        </button>
                    </div>
                    <div className="
                            flex
                            bg-gradient-to-r from-[#144EE3] via-[#EB568E] to-[#144EE3]
                            bg-clip-text
                            text-transparent
                            font-(SF Pro Display) font-bold font-xl
                            text-xl lg:text-2xl
                            text-center
                            w-2/3 lg:w-1/3
                            my-5
                            mx-auto
                        ">
                        Shortened url
                    </div>
                    <div className="
                        flex
                        border-gray-500 border-2 rounded-full
                        h-15 lg:h-17
                        w-17/20 lg:w-2/5
                        my-2
                        mx-auto
                    ">
                        <div className="
                            flex
                            text-white
                            m-5
                        ">
                            <Link className='self-center'/>
                        </div>
                        <div className={`
                            ${ shortUrl ? "text-white" : "text-slate-400 text-sm"}
                            grow
                            my-auto
                            overflow-hidden
                            text-ellipsis
                            whitespace-nowrap
                        `}>
                            {shortUrl || "Short URL appears here"}
                        </div>
                        <button className="
                            hidden lg:block
                            lg:flex-none
                            lg:bg-blue-600
                            lg:text-white
                            lg:rounded-full
                            lg:m-1
                            lg:px-7
                        "
                        onClick={copyToClipboard}
                        >
                            Copy
                        </button>
                        <button className="
                            block lg:hidden
                            flex-none
                            bg-blue-600
                            ext-white
                            rounded-full
                            m-1
                            p-4
                        "
                        onClick={copyToClipboard}
                        >
                            <Copy size={20} className='text-white'/>
                        </button>

                    </div>
                </div>
                
            </div>
        </>
    )
}
import Image from 'next/image'
import { collection, } from 'firebase/firestore'
import Form from './components/Form'

export default function Home() {
  return (
<main className="relative flex flex-col items-center max-w-[1024px] mx-auto bg-white pb-20">
    
        <div className="w-full flex justify-center">
        <Image
          src="images/WHxMessina_Microsite-V2_DT-Header.png"
          alt="Westinghouse x Messina Header Image"
          width={1024}
          height={500}
          layout='responsive'
          className='w-full mx-auto max-w-[1024px]'
          priority
        />
       </div>
       <div>
      <h1>Buy a participating Westinghouse Fridge to win a year’s worth of Gelato Messina!</h1>
      <p>Enter your details and upload a valid purchase receipt between 15th January and 16th February 2024 for your chance to win.</p>
    </div>
    <div className="relative flex place-items-center pt-4 mx-auto w-full">
        <Form />
    </div>
    <footer className="absolute bottom-0 w-full bg-white text-black flex justify-between px-4 py-2">
   
      <div className="text-left">
        ™ Westinghouse Electric Corporation © 2023 Electrolux Home Products Pty. Ltd. All Rights Reserved
      </div>
      <div className="text-right">
        <a href="/terms-and-conditions" className="text-black underline">Terms and Conditions</a>
        <a href="/privacy-policy" className="text-black underline ml-4">Privacy Policy</a>
      </div>
    </footer>
  </main>
  )
}

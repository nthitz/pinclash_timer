import { XIcon } from '@heroicons/react/solid'
import venmo from './media/venmo.jpg'
import { Link } from 'react-router-dom'
export default function TOC(props) {
  return (
    <div>
    <Link to='/'><XIcon className="absolute top-10 right-10 cursor-pointer h-10 w-10 text-black-500 hover:text-blue-500" /></Link>
      <p className='my-2'>Terms and Conditions</p>
      <p className='max-w-2xl mx-auto my-2'>
        The Pinclash Timer and all subsequent features (the product) is provided without warranty and with no guarentees of reliability. Data may be wiped at any time.
      </p>
      <p>
        This product is unaffialiated with Pinclash. Do not consider anything you see here as official.
      </p>
      <p className='max-w-2xl mx-auto my-2'>
        The product is provided free of charge to users who are not in the IFPA Top 100 as of May 1st 2021. Users ranked in the IFPA Top 100 must venmo @Nick-Yahnke $50 before they are authorized to use this product. By using this product, you agree that you are either not in the IFPA Top 100 or you have sent $50 to @Nick-Yahnke. Failure to abide by these Terms may result in a revocation of services at any time.
      </p>
      <p className='max-w-2xl mx-auto my-2 italic'>
        [Seriously? Eh yeah, kinda, sure why not. I'm ranked much worse than most competitors. I know IFPA Rank is just a number, but odds are slim I see any of my entry fee back. And yeah the money doesn't matter, I'm just happy and honored to compete and am going to have fun. But if you find this tool useful and you have the means, toss me a few bones!]
      </p>
      <p className='max-w-2xl center mx-auto my-2'>
        <a href="https://venmo.com/code?user_id=1687076701470720776"><img className='mx-auto w-56' src={venmo} alt='venmo qr code' /></a>
      </p>
      <Link to='/'><button className='cursor-pointer'>Back</button></Link>
    </div>
  )
}
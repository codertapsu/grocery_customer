import { shortenAddress } from '@helpers/shorten-address';
import { useWallet } from '@hooks/use-wallet';
import { Button } from './button';

export default function Header() {
  const { address, connect: connectWallet } = useWallet();

  return (
    <header className='sticky top-0 z-50 bg-white'>
      <div className='layout flex h-14 items-center justify-between'>
        {/* <UnstyledLink href='/' className='font-bold hover:text-gray-600'>
          Home
        </UnstyledLink> */}
        {/* <nav>
          <ul className='flex items-center justify-between space-x-4'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink href={href} className='hover:text-gray-600'>
                  {label}
                </UnstyledLink>
              </li>
            ))}
          </ul>
        </nav> */}
        <Button variant='primary'>Primary Variant</Button>
        
        {!address && (
                <>
                  <button
                    type="button"
                    onClick={connectWallet}
                    className="inline-flex items-center justify-center h-12 px-6 border-2 text-btnText font-semibold rounded-full border-btnBorder bg-transparent transition-all ease-linear delay-75 group hover:cursor-pointer hover:text-slate-200 hover:border-btnHover"
                  >
                    Connect Wallet
                  </button>
                  {/* <button type="button" onClick={connectWallet}>
                    <a class="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-4 px-5 py-2 font-medium text-btnText shadow-xl transition duration-300 ease-out">
                      <span class="absolute inset-0 h-full w-full bg-gradient-to-br from-btnBorder via-neutral-800 to-btnBorder"></span>
                      <span class="ease absolute bottom-0 right-0 mb-32 mr-4 block h-64 w-64 origin-bottom-left translate-x-20 rotate-45 transform rounded-full bg-btnHover opacity-30 transition duration-500 group-hover:rotate-90"></span>
                      <span class="relative text-white">Connect Wallet</span>
                    </a>
                  </button> */}
                </>
              )}
        
        {address && (
                <>
                  <a
                    href={`https://ropsten.etherscan.io/address/${address}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button
                      type="button"
                      className="inline-flex items-center justify-center h-12 px-6 border-2 rounded-full border-btnBorder bg-transparent transition-all ease-linear delay-75 group hover:cursor-pointer hover:border-btnHover"
                    >
                      <p className="text-btnText font-raj font-semibold uppercase transition-all ease-linear delay-75 group-hover:text-slate-200">
                        {shortenAddress(address)}
                      </p>
                    </button>
                  </a>
                </>
              )}
      </div>
    </header>
  );
}

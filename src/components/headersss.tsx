import { useAuth } from '@contexts/auth';
import { useWallet } from '@contexts/wallet';
import { shortenAddress } from '@helpers/shorten-address';

// import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button } from './button';

export const Header = () => {
  const router = useRouter();
  // const { data: session, status } = useSession();
  const { user, logout } = useAuth();
  const { address, connect: connectWallet, disconnect: disconnectWallet } = useWallet();

  // const loading = status === 'loading';

  const onSignInClickHandler = () => {
    router.push({
      pathname: '/auth/signin',
      query: {
        returnUrl: window.encodeURIComponent(router.pathname),
      },
    });
    // signIn();
  };

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
        {!user && (
          <>
            <span>You are not signed in</span>
            <button onClick={onSignInClickHandler}>Login</button>
          </>
        )}
        {user && (
          <>
            {/* {session.user.image && <span style={{ backgroundImage: `url('${session.user.image}')` }} />} */}
            <span>
              <small>Signed in as</small>
              <br />
              <strong>{user.email ?? user.name}</strong>
            </span>
            <button onClick={logout}>Logout</button>
            {/* <a
              href={`/api/auth/signout`}
              onClick={(e) => {
                e.preventDefault();
                // signOut();
              }}
            >
              Sign out
            </a> */}
          </>
        )}

        {!address && (
          <>
            <button
              type='button'
              onClick={connectWallet}
              className='text-btnText border-btnBorder hover:border-btnHover group inline-flex h-12 items-center justify-center rounded-full border-2 bg-transparent px-6 font-semibold transition-all delay-75 ease-linear hover:cursor-pointer hover:text-slate-200'
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
            <button
              type='button'
              onClick={disconnectWallet}
              className='text-btnText border-btnBorder hover:border-btnHover group inline-flex h-12 items-center justify-center rounded-full border-2 bg-transparent px-6 font-semibold transition-all delay-75 ease-linear hover:cursor-pointer hover:text-slate-200'
            >
              {shortenAddress(address)}
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

        {/* {address && (
          <>
            <a href={`https://ropsten.etherscan.io/address/${address}`} target='_blank' rel='noreferrer'>
              <button
                type='button'
                className='border-btnBorder hover:border-btnHover group inline-flex h-12 items-center justify-center rounded-full border-2 bg-transparent px-6 transition-all delay-75 ease-linear hover:cursor-pointer'
              >
                <p className='text-btnText font-raj font-semibold uppercase transition-all delay-75 ease-linear group-hover:text-slate-200'>
                  {shortenAddress(address)}
                </p>
              </button>
            </a>
          </>
        )} */}
      </div>
    </header>
  );
};

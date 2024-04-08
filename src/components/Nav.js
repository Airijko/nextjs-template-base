"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setupProviders();
  }, []);

  return (
    <div className="text-n-7 sticky top-0 w-full z-50">
      <div className="flex md:font-bold items-center px-5 md:px-7.5 xl:px-10 py-3 gap-5">
        <a className="flex items-center w-[12rem] md:mr-8" href="/">
          <Image src="/assets/images/Webever_icon.png" alt="Logo" width={40} height={40} />
          <span className="hidden md:block font-code text-n-7 text-2xl uppercase md:text-md md:font-bold px-4 whitespace-nowrap">
            NextJS Template
          </span>
        </a>

        <nav
          className={`${openNavigation ? "flex" : "hidden"
            } fixed inset-0 md:static md:flex md:mx-auto w-full bg-n-1 `}
        >
          <div className="relative z-2 flex flex-col items-center m-auto md:flex-row gap-[50px]">
            <a
              href='/'
              className={`block relative font-code text-2xl text-n-7 transition-colors hover:text-color-1 md:-mr-0.25 md:text-sm`}
              onClick={() => setOpenNavigation(false)}
            >
              Home
            </a>
            <a
              href='/courses'
              className={`block relative font-code text-2xl text-n-7 transition-colors hover:text-color-1 md:-mr-0.25 md:text-sm`}
              onClick={() => setOpenNavigation(false)}
            >
              Courses
            </a>
            <a
              href='/about'
              className={`block relative font-code text-2xl text-n-7 transition-colors hover:text-color-1 md:-mr-0.25 md:text-sm`}
              onClick={() => setOpenNavigation(false)}
            >
              About
            </a>
          </div>
        </nav>
        <div className="flex justify-end w-full">
          {session?.user ? (
            <div className="flex text-end justify-end gap-3 md:gap-5">
              <Link href="/create-prompt" className="black_btn">
                Create Post
              </Link>
              <button
                type="button"
                onClick={() => {
                  setToggleDropDown(false);
                  signOut();
                }}
                className="text-sm whitespace-nowrap"
              >
                Sign Out
              </button>
              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="profile"
                />
              </Link>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="text-sm whitespace-nowrap"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
        <div className="relative flex justify-end items-center md:hidden">
          <button
            className="flex items-center justify-center w-10 h-10"
            onClick={() => setOpenNavigation(!openNavigation)}
          >
            <Image src="/assets/images/menu.svg" alt="Menu" width={40} height={40}></Image>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;

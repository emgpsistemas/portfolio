"use client";

import { Fragment, useContext, useEffect, useState } from "react";

import Image from "next/image";
import { Link as LinkRS } from "react-scroll";

import logo from "../../assets/logo.svg";

import { IsMobileContext } from "@/contexts/isMobile";
import { useLinks } from "@/hooks/useLinks";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { List, X } from "phosphor-react";

function Header() {
  const [isIconHovering, setIsIconHovering] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const links = useLinks();
  const { isMobile } = useContext(IsMobileContext);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledHeight = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrolledHeight >= windowHeight) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Popover
      className={clsx(
        "fixed top-0 z-50 mx-auto flex h-32 items-center bg-transparent transition-all duration-500",
        {
          "backdrop-blur-md": scrolled,
        },
        {
          "backdrop-blur-md": isMobile && pathname !== "/",
        }
      )}
    >
      <header className="mx-auto w-screen px-10">
        <div className="flex items-center justify-between py-6">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <LinkRS
              id="logo-link"
              alt="Logo da EMGP Sistemas"
              href="/"
              activeClass="active"
              to={"home"}
              spy={true}
              smooth={true}
              duration={700}
            >
              {isMobile && !scrolled ? null : (
                <Image
                  id="logo-image"
                  src={logo}
                  alt="Logo da EMGP Sistemas"
                  width={isMobile ? 44 : 80}
                  height={isMobile ? 44 : 80}
                  className="cursor-pointer"
                />
              )}
            </LinkRS>
          </div>
          <div className="-my-2 -mr-2 lg:hidden">
            <Popover.Button
              id="menu-button"
              className="focus:ring-offset-background focus:primary-blue-500 flex items-center rounded-xl px-2 py-2 transition-all hover:bg-primary-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
              onMouseEnter={() => setIsIconHovering(true)}
              onMouseLeave={() => setIsIconHovering(false)}
            >
              <List
                size={32}
                color={
                  isIconHovering ? "#FFFFFF" : scrolled ? "#191938" : "#FFFFFF"
                }
                weight="bold"
                aria-hidden="true"
              />
            </Popover.Button>
          </div>
          <nav className="hidden space-x-10 lg:flex">
            {links.map((link) =>
              link.label === "Home" ? null : (
                <LinkRS
                  href={link.href}
                  key={link.href}
                  activeClass="active"
                  to={link.href}
                  spy={true}
                  smooth={true}
                  duration={700}
                  className={clsx(
                    "cursor-pointer text-lg font-semibold transition-all duration-500",
                    {
                      "underline-red-500 underline decoration-primary-red-500 decoration-4 underline-offset-8":
                        pathname === link.href,
                    },

                    {
                      "text-black hover:text-zinc-700": isMobile || scrolled,
                    },
                    {
                      "text-white hover:text-zinc-300": isMobile && !scrolled,
                    },
                    {
                      "text-white hover:text-zinc-300": !isMobile && !scrolled,
                    }
                  )}
                >
                  {link.label.toUpperCase()}
                </LinkRS>
              )
            )}
          </nav>
        </div>
      </header>

      <Transition
        as={Fragment}
        enter="duration-300 ease-out"
        enterFrom="opacity-0 scale-90"
        enterTo="opacity-100 scale-100"
        leave="duration-200 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-90"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 origin-top-right transform rounded-b-xl bg-black bg-opacity-30 p-0 backdrop-blur-md transition lg:hidden"
        >
          <div className="bg-background divide-y-2 divide-gray-50 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-7 py-8">
              <div className="flex items-center justify-end">
                <div className="">
                  <Popover.Button
                    id="close-menu-button"
                    className="focus:ring-offset-background focus:primary-blue-500 flex items-center rounded-xl px-2 py-2 transition-all hover:bg-primary-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    onMouseEnter={() => setIsIconHovering(true)}
                    onMouseLeave={() => setIsIconHovering(false)}
                  >
                    <X
                      size={32}
                      color={"#FFFFFF"}
                      weight="bold"
                      aria-hidden="true"
                    />
                  </Popover.Button>
                </div>
              </div>
              <nav className="mt-6 flex flex-col items-end gap-y-3">
                {links.map((link) => (
                  <LinkRS
                    href={link.href}
                    key={link.href}
                    activeClass="active"
                    to={link.href}
                    spy={true}
                    smooth={true}
                    duration={700}
                    className={clsx(
                      "flex min-w-[180px] flex-row items-center justify-end gap-4 rounded-xl px-6 py-4 transition-all ",
                      {
                        "bg-primary-blue-500 hover:bg-primary-blue-600":
                          pathname === link.href,
                      },
                      {
                        "bg-white hover:bg-slate-200": pathname !== link.href,
                      }
                    )}
                  >
                    <span
                      className={clsx(
                        "text-lg font-semibold text-black",
                        {
                          "text-white": pathname === link.href,
                        },
                        {
                          "text-black": pathname !== link.href,
                        }
                      )}
                    >
                      {link.label}
                    </span>
                    {link.icon}
                  </LinkRS>
                ))}
              </nav>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default Header;

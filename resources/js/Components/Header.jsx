import React from "react";
import LogoSvg from "./LogoSvg";
import { Link } from "@inertiajs/react";
import LinkCustom from "./LinkCustom";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";

const Header = ({ auth }) => {
    return (
        <header className="sticky top-0 flex items-center w-screen px-4 py-2 transition-all duration-500 sm:px-10 bg-primary h-14">
            <nav
                id="header"
                className="flex flex-wrap items-center justify-between w-full mx-auto mt-0 "
            >
                {/* logo */}
                <div className="flex items-center">
                    <Link
                        className="flex items-center gap-2 text-2xl font-bold no-underline text-light hover:no-underline lg:text-3xl"
                        href="#"
                    >
                        <LogoSvg className=" fill-light" />
                        MySeriesList
                    </Link>

                    <nav className="ml-10 ">
                        <ul className="flex gap-4 ">
                            <li>
                                <LinkCustom
                                    href={route("series.index")}
                                    styles={"  hover:text-kiwi text-light "}
                                >
                                    Series
                                </LinkCustom>
                            </li>
                            <li>
                                <LinkCustom
                                    href={route("dashboard")}
                                    styles={" hover:text-kiwi text-light "}
                                >
                                    Peliculas
                                </LinkCustom>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Hamburger */}
                <div className="block pr-4 sm:hidden">
                    <button className="inline-flex items-center justify-center p-2 text-white transition duration-150 ease-in-out rounded-md toggleColour ">
                        <svg
                            className="w-6 h-6"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                className="inline-flex"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                {/* link right */}
                <div
                    className="z-20 hidden w-full p-0 mt-2 text-black sm:flex sm:items-center sm:w-auto sm:mt-0 sm:bg-transparent "
                    id="nav-content"
                >
                    <ul>
                        <li className="flex gap-2">
                            {auth?.user ? (
                                <div className="hidden sm:flex sm:items-center sm:ml-6">
                                    <div className="relative ml-3">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 text-base font-medium leading-4 transition duration-150 ease-in-out text-kiwi bg-secundary hover:text-light "
                                                    >
                                                        {auth.user.name}
                                                        <svg
                                                            className="ml-2 -mr-0.5 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href={route("profile.edit")}
                                                >
                                                    Profile
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route("logout")}
                                                    method="post"
                                                    as="button"
                                                >
                                                    Log Out
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <LinkCustom
                                        href={route("login")}
                                        styles={
                                            " hover:bg-kiwi hover:text-secundary text-light px-6 py-2"
                                        }
                                    >
                                        Iniciar sesion
                                    </LinkCustom>
                                    <LinkCustom
                                        href={route("register")}
                                        styles={
                                            " hover:bg-light hover:text-secundary text-light px-6 py-2"
                                        }
                                    >
                                        Registro
                                    </LinkCustom>
                                </>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;

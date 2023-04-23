import React, { useState } from "react";
import LogoSvg from "./svg/LogoSvg";
import { Link } from "@inertiajs/react";
import { Turn as Hamburger } from "hamburger-react";
import LinkCustom from "./LinkCustom";
import BurgerMenu from "./BurgerMenu";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import UserIcon from "./svg/UserIcon";
import ListIcon from "./svg/ListIcon";

const Header = ({ auth }) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-10 flex items-center w-full h-16 px-4 py-2 transition-all duration-500 border-b-2 bg-secundary border-kiwi">
            <nav
                id="header"
                className="flex items-center justify-between w-full "
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
                                <NavLink
                                    href={route("series.index")}
                                    active={route().current("series.index")}
                                >
                                    Series
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    href={route("movies.index")}
                                    active={route().current("movies.index")}
                                >
                                    Peliculas
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Hamburger */}
                <div className=" md:hidden">
                    <Hamburger
                        color="#7ddb29"
                        toggled={isOpen}
                        toggle={setOpen}
                        size="20"
                    />
                </div>
                <div
                    className={`absolute md:hidden duration-300 transition-all  h-screen px-10 py-10 top-0 bg-secundary shadow-[1px_0px_0px_0px_#7ddb29] ${
                        isOpen ? "left-0" : "-left-full"
                    }`}
                >
                    <nav className="flex flex-col gap-10 ">
                        <ul className="flex flex-col items-center">
                            <li>
                                <NavLink
                                    href={route("series.index")}
                                    active={route().current("series.index")}
                                >
                                    Series
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Peliculas
                                </NavLink>
                            </li>
                        </ul>

                        <div className="flex flex-col items-center text-light">
                            {auth?.user ? (
                                <div className="flex sm:items-center sm:ml-6">
                                    <div className="">
                                        <div className="flex items-center ">
                                            <UserIcon />
                                            <p
                                                type="button"
                                                className="px-3 py-2 text-base font-bold leading-4 bg-secundary hover:text-light"
                                            >
                                                {auth.user.name}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-center ">
                                            <a href={route("profile.edit")}>
                                                Profile
                                            </a>
                                            <a
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <LinkCustom
                                        href={route("login")}
                                        styles={
                                            " hover:bg-kiwi hover:text-secundary text-light px-6 py-2 mb-2"
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
                        </div>
                    </nav>
                </div>
                <div className="flex items-center">
                    {/* Lists */}
                    <NavLink
                        className="flex items-center"
                        href={route("series.index")}
                        active={route().current("series.index")}
                    >
                        <ListIcon
                            className="inline-block w-6 h-6 mr-2 "
                            strokeWidth={2}
                        />
                        Mis Listas
                    </NavLink>

                    {/* link right */}
                    <div className="hidden text-black md:flex" id="nav-content">
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
                                                        href={route(
                                                            "profile.edit"
                                                        )}
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
                </div>
            </nav>
        </header>
    );
};

export default Header;

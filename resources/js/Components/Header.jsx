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
import Avatar from "./Avatar";
import TvIcon from "./svg/TvIcon";
import MovieIcon from "./svg/MovieIcon";
import LogoutIcon from "./svg/LogoutIcon";

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
                {/* Side Menu */}
                <div
                    className={`absolute md:hidden duration-300 transition-all  h-screen px-6 py-10 top-0 bg-secundary shadow-[1px_0px_0px_0px_#7ddb29] ${
                        isOpen ? "left-0" : "-left-full"
                    }`}
                >
                    <nav className="flex flex-col justify-between h-full gap-10 ">
                        <ul className="flex flex-col gap-2 ">
                            <li>
                                <NavLink
                                    href={route("series.index")}
                                    active={route().current("series.index")}
                                >
                                    <TvIcon
                                        className="inline-block w-6 h-6 mr-2 "
                                        strokeWidth={2}
                                    />
                                    Series
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href={route("movies.index")}
                                    active={route().current("movies.index")}
                                >
                                    <MovieIcon
                                        className="inline-block w-6 h-6 mr-2 "
                                        strokeWidth={2}
                                    />
                                    Peliculas
                                </NavLink>
                            </li>
                            {auth?.user ? (
                                <li>
                                    <NavLink
                                        href={route("mylist.show", {
                                            username: auth.user.username,
                                        })}
                                        active={route().current("mylist.show")}
                                    >
                                        <ListIcon
                                            className="inline-block w-6 h-6 mr-2 "
                                            strokeWidth={2}
                                        />
                                        Mis Listas
                                    </NavLink>
                                </li>
                            ) : null}
                        </ul>

                        <div className="flex flex-col text-light">
                            {auth?.user ? (
                                <div>
                                    <a
                                        href={route("profile.edit")}
                                        className="block hover:text-kiwi"
                                    >
                                        <UserIcon className="inline-block w-6 h-6 mb-2 mr-2 " />
                                        Profile
                                    </a>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        type="button"
                                        className="hover:text-kiwi"
                                    >
                                        <LogoutIcon className="inline-block w-6 h-6 mr-2 " />
                                        Cerrar sesion
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <LinkCustom
                                        href={route("login")}
                                        styles={
                                            " hover:bg-kiwi hover:text-secundary text-light px-2 py-1 mb-2 "
                                        }
                                    >
                                        Iniciar sesion
                                    </LinkCustom>
                                    <LinkCustom
                                        href={route("register")}
                                        styles={
                                            " hover:bg-light hover:text-secundary text-light px-2 py-1"
                                        }
                                    >
                                        Registro
                                    </LinkCustom>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
                <div className="items-center hidden md:flex">
                    {/* link right */}
                    <div className="flex text-black " id="nav-content">
                        {/* Lists */}
                        {auth.user ? (
                            <NavLink
                                className="flex items-center"
                                href={route("mylist.show", {
                                    username: auth.user.username,
                                })}
                                active={route().current("mylist.show")}
                            >
                                <ListIcon
                                    className="inline-block w-6 h-6 mr-2 "
                                    strokeWidth={2}
                                />
                                Mis Listas
                            </NavLink>
                        ) : null}
                        <ul>
                            <li className="flex gap-2">
                                {auth?.user ? (
                                    <div className="flex sm:items-center ">
                                        <div className="relative ml-3">
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <span className="inline-flex rounded-md">
                                                        <button
                                                            type="button"
                                                            className="inline-flex items-center px-3 py-2 text-lg font-bold leading-4 transition duration-150 ease-in-out text-kiwi hover:text-light "
                                                        >
                                                            <Avatar
                                                                className="w-8 h-8 mr-2"
                                                                src={`/storage/${auth.user.profile_photo_path}`}
                                                                alt={`Foto de perfil de ${auth.user.name}`}
                                                            />
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
                                                        Cerrar sesion
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

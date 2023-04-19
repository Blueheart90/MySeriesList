import { Turn as Hamburger } from "hamburger-react";
import { useState } from "react";

const BurgerMenu = () => {
    const [isOpen, setOpen] = useState(false);

    return (
        <Hamburger
            color="#33CCCC"
            toggled={isOpen}
            toggle={setOpen}
            size="20"
        />
    );
};

export default BurgerMenu;

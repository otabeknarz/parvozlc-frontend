import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";

import { ThemeSwitch } from "@/components/theme-switch";

export const Navbar = () => {
  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-52">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <img alt="Logo" className="dark:hidden" src="/logo.png" />
            <img alt="Logo" className="hidden dark:block" src="/logo-dark.png" />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch className="hidden" />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden basis-1 pl-4" justify="end">
        <ThemeSwitch className="hidden" />
      </NavbarContent>
    </HeroUINavbar>
  );
};

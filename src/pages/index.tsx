import { Button } from "@heroui/button";
// import {
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownTrigger,
// } from "@heroui/dropdown";
import { useNavigate } from "react-router-dom";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <section className="flex flex-col h-full items-center justify-center">
        <div className="inline-block text-center justify-center max-w-4xl">
          <span className={title()}>Recieve support from&nbsp;</span>
          <span className={title({ color: "blue" })}>professionals&nbsp;</span>
          <span className={title()}>
            for your college application through&nbsp;
          </span>
          <span className={title({ color: "blue" })}>
            an individual approach
          </span>
          <div className="flex flex-row gap-4 justify-center align-center mt-8">
            <Button 
              color="primary"
              onClick={() => navigate('/program')}
            >
              <span className="text-white text-sm sm:text-xl font-bold">
                Join the "Portfolio Accelerator" program
              </span>
            </Button>
            {/* <Dropdown backdrop="transparent" className="bg-blue-500">
              <DropdownTrigger>
                <Button color="primary" size="lg">
                  <span className="text-lg sm:text-2xl font-bold">
                    Portfolio accelerator
                  </span>
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Portfolio accelerator"
                className="w-full"
              >
                <DropdownItem key="program" onClick={() => navigate('/program')}>
                  <span className="font-bold text-white dark:text-gray-300">
                    Program
                  </span>
                </DropdownItem>
                <DropdownItem key="consultation" onClick={() => navigate('/consultation')}>
                  <span className="font-bold text-white dark:text-gray-300">
                    Consultation
                  </span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

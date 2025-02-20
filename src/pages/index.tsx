import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <section className="flex flex-col h-full items-center justify-center relative px-4">
        {/* Background gradient */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-400/10 via-violet-400/10 to-pink-400/10 dark:from-blue-500/20 dark:via-violet-500/20 dark:to-pink-500/20 blur-[140px]"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="inline-block text-center justify-center max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h1 className="leading-tight tracking-tight">
              <span className={title({ className: "text-4xl sm:text-5xl lg:text-6xl font-medium" })}>
                Receive support from&nbsp;
              </span>
              <span className={title({ color: "blue", className: "text-4xl sm:text-5xl lg:text-6xl font-medium bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 dark:from-blue-400 dark:via-violet-400 dark:to-pink-400 bg-clip-text text-transparent" })}>
                professionals&nbsp;
              </span>
            </h1>
            <h1 className="leading-tight tracking-tight">
              <span className={title({ className: "text-4xl sm:text-5xl lg:text-6xl font-medium" })}>
                for your college application through&nbsp;
              </span>
              <span className={title({ color: "blue", className: "text-4xl sm:text-5xl lg:text-6xl font-medium bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 dark:from-blue-400 dark:via-violet-400 dark:to-pink-400 bg-clip-text text-transparent" })}>
                an individual approach
              </span>
            </h1>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-8 justify-center items-center mt-16 w-full sm:w-auto px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {[
              {
                text: "Portfolio Accelerator consultation",
                path: "/consultation"
              },
              {
                text: "Portfolio Accelerator program",
                path: "/program"
              }
            ].map((item, index) => (
              <Button 
                key={index}
                className="group relative py-5 sm:px-14 sm:py-6 bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm w-full sm:w-auto"
                onClick={() => navigate(item.path)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-violet-600/80 to-pink-600/80 dark:from-blue-500/90 dark:via-violet-500/90 dark:to-pink-500/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/0 to-white/20"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <span className="relative z-10 text-gray-800 dark:text-gray-200 group-hover:text-white text-lg sm:text-xl font-medium tracking-wide transition-colors duration-300 whitespace-nowrap">
                  {item.text}
                </span>
              </Button>
            ))}
          </motion.div>
        </div>
      </section>
    </DefaultLayout>
  );
}

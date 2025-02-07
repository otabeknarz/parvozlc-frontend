import { motion, useAnimation, useScroll, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Button } from "@nextui-org/react";

import { title, subtitle } from "@/components/primitives.ts";
import DefaultLayout from "@/layouts/default";

export const FadeInWhenVisible: React.FC<{
  children: React.ReactNode;
  variant?: "fade" | "slideUp" | "slideDown" | "scale";
  delay?: number;
  className?: string;
}> = ({ children, variant = "fade", delay = 0, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.5,
          delay,
        },
      },
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay,
        },
      },
    },
    slideDown: {
      hidden: { opacity: 0, y: -50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay,
        },
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.5,
          delay,
        },
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      className={className}
      initial="hidden"
      variants={variants[variant]}
    >
      {children}
    </motion.div>
  );
};

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 transform origin-left z-50"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)",
        boxShadow:
          "0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3), 0 0 30px rgba(236, 72, 153, 0.2)",
      }}
    />
  );
};

export default function ProgramPage() {
  return (
    <DefaultLayout>
      <ScrollProgressBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Blur Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-[30px] sm:left-[20%] w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] rounded-full bg-blue-400/30 dark:bg-blue-500/30 blur-[40px] sm:blur-[100px]"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-[40%] right-[5%] sm:left-[20%] w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] rounded-full bg-blue-400/30 dark:bg-blue-500/30 blur-[40px] sm:blur-[100px]"
            animate={{
              x: [0, -40, 0],
              y: [0, 30, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-[20%] left-[20%] w-[350px] h-[350px] rounded-full bg-cyan-400/20 dark:bg-cyan-500/20 blur-[90px]"
            animate={{
              x: [0, 30, 0],
              y: [0, -40, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <section className="flex flex-col items-center justify-center gap-16 sm:gap-24 lg:gap-32 py-12 sm:py-16 lg:py-24 relative">
          {/* Logos */}
          <div className="flex flex-col items-center justify-center gap-16 w-full">
            <div className="flex items-center justify-center gap-4 sm:gap-8 sm:gap-12">
              {[
                {
                  src: "/freshman-logo-blue.png",
                  className: "dark:hidden w-32 lg:w-48",
                },
                { src: "/x.png", className: "dark:hidden w-12 sm:w-20" },
                { src: "/logo.png", className: "dark:hidden w-32 lg:w-48" },
                {
                  src: "/freshman-logo-white.png",
                  className: "hidden dark:block w-32 lg:w-48",
                  href: "https://freshman.academy/",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  as: "a",
                },
                { src: "/x.png", className: "hidden dark:block w-12 sm:w-20" },
                {
                  src: "/logo-dark.png",
                  className: "hidden dark:block w-32 lg:w-48",
                },
              ].map((logo, index) => (
                logo.href ? (
                  <motion.a
                    key={index}
                    href={logo.href}
                    target={logo.target}
                    rel={logo.rel}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.img
                      alt="Logo"
                      className={logo.className}
                      src={logo.src}
                    />
                  </motion.a>
                ) : (
                  <motion.img
                    key={index}
                    alt="Logo"
                    className={logo.className}
                    src={logo.src}
                    whileHover={{ scale: 1.05 }}
                  />
                )
              ))}
            </div>

            {/* Program Title */}
            <div className="text-center space-y-8">
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-6"
                initial={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.img
                  alt="Rocket icon"
                  className="w-12 sm:w-16 lg:w-20"
                  src="/rocket.png"
                  whileHover={{ scale: 1.1 }}
                />
                <h1
                  className={title({
                    color: "blue",
                    className:
                      "text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight",
                  })}
                >
                  &#34;Portfolio Accelerator&#34; program
                </h1>
              </motion.div>
              <motion.p
                animate={{ opacity: 1 }}
                className={subtitle({
                  className:
                    "text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 font-normal tracking-wide",
                })}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Build Ivy-level extracurriculars and honors
              </motion.p>
            </div>
          </div>

          {/* Program details */}
          <FadeInWhenVisible variant="slideUp">
            <div className="flex flex-col sm:flex-row w-full items-center justify-between gap-8 sm:gap-16 bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-6 sm:p-8 lg:p-16 mt-12 sm:mt-16 lg:mt-24">
              <motion.img
                alt="Graduate"
                className="w-36 sm:w-48 lg:w-72"
                src="/graduate.png"
                animate={{
                  scale: [1, 1.08, 0.95, 1.08, 1],
                  rotate: [0, 3, -3, 3, 0],
                  y: [0, -8, 0, -8, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ 
                  scale: 1.15,
                  rotate: [0, 5, -5, 5, 0],
                  transition: { duration: 0.3 }
                }}
              />
              <div className="flex flex-col gap-8 items-center text-center sm:text-left max-w-2xl">
                <h2
                  className={title({
                    color: "cyan",
                    className: "text-3xl sm:text-5xl lg:text-6xl font-medium",
                  })}
                >
                  "Portfolio Accelerator"
                </h2>
                <p
                  className={subtitle({
                    className:
                      "text-lg sm:text-xl lg:text-2xl leading-relaxed font-normal",
                  })}
                >
                  The program is aimed at helping Ivy-bound high school and gap
                  year students through an individual approach with them for two
                  months to prepare their extracurriculars and honors to an
                  Ivy-level application
                </p>
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Mentors Section */}
          <div className="space-y-24 sm:space-y-32 lg:space-y-48 mt-16 sm:mt-24 lg:mt-32">
            {/* Main Mentor */}
            <FadeInWhenVisible variant="slideUp">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-16 w-full">
                <div className="flex flex-col gap-8 items-center text-center lg:w-1/3">
                  <h2
                    className={title({
                      color: "blue",
                      className:
                        "text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-wide",
                    })}
                  >
                    Main Mentor
                  </h2>
                  <motion.div
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      alt="Mentor"
                      className="w-full sm:w-56 lg:w-72 object-cover rounded-2xl shadow-lg"
                      src="/azizbek-no-background.png"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                  <h3
                    className={subtitle({
                      className:
                        "text-2xl sm:text-3xl lg:text-4xl font-semibold",
                    })}
                  >
                    Azizbek Zaylobiddinov
                  </h3>
                  <span
                    className={title({
                      className:
                        "text-amber-600 text-xl sm:text-2xl lg:text-3xl font-medium tracking-wide",
                    })}
                  >
                    HARVARD class of 2029
                  </span>
                </div>

                <div className="flex flex-col gap-8 lg:w-2/3">
                  <div className="space-y-6">
                    {[
                      "Holds valuable expertise in building and scaling projects, activities, and honors",
                      "Manager of 'Ibrat Debate'",
                      "Worked in Executive Management positions in:",
                      "Conducted academic research Landed internships at government and non-government agencies",
                    ].map((text, index) => (
                      <FadeInWhenVisible
                        key={index}
                        delay={index * 0.1}
                        variant="fade"
                      >
                        <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                          <h4
                            className={title({
                              size: "sm",
                              className:
                                "text-lg sm:text-xl lg:text-2xl mb-3 font-medium tracking-wide",
                            })}
                          >
                            {text}
                          </h4>
                          {index === 1 && (
                            <p
                              className={subtitle({
                                className:
                                  "text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 font-normal leading-relaxed",
                              })}
                            >
                              Uzbekistan's biggest debate network leads 100+
                              volunteers in the team. engaged 2000+ youth in
                              nearly 100 debates across 14 regions.
                            </p>
                          )}
                          {index === 2 && (
                            <p
                              className={subtitle({
                                className:
                                  "text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 font-normal leading-relaxed",
                              })}
                            >
                              Swap Up, TEDxFerPSYouth, Young Writers Society
                              many other successful projects
                            </p>
                          )}
                        </div>
                      </FadeInWhenVisible>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>

            {/* Guide Mentor */}
            <FadeInWhenVisible>
              <div className="flex flex-col-reverse lg:flex-row items-start justify-between gap-16 w-full">
                <div className="flex flex-col gap-8 lg:w-2/3">
                  <div className="space-y-6">
                    <FadeInWhenVisible delay={0.1} variant="fade">
                      <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <h4
                          className={title({
                            size: "sm",
                            className:
                              "text-lg sm:text-xl lg:text-2xl mb-3 font-medium tracking-wide",
                          })}
                        >
                          graduate of Yale-NUS
                        </h4>
                      </div>
                    </FadeInWhenVisible>
                    <FadeInWhenVisible delay={0.2} variant="fade">
                      <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <h4
                          className={title({
                            size: "sm",
                            className:
                              "text-lg sm:text-xl lg:text-2xl mb-3 font-medium tracking-wide",
                          })}
                        >
                          Founder and CEO of &#34;Freshman Academy&#34;
                        </h4>
                        <p
                          className={subtitle({
                            className:
                              "text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 font-normal leading-relaxed",
                          })}
                        >
                          9 years in the admissions field 75% of Uzbek
                          undergraduate Ivy-league admits studied at Freshman
                          Academy About 4,000,000 $ of active Ivy League active
                          scholarships Students at Harvard, Yale, Princeton,
                          Stanford, Cornell, etc.
                        </p>
                      </div>
                    </FadeInWhenVisible>
                  </div>
                </div>

                <div className="flex flex-col gap-8 items-center text-center lg:w-1/3">
                  <h2
                    className={title({
                      color: "blue",
                      className:
                        "text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-wide",
                    })}
                  >
                    Guide Mentor
                  </h2>
                  <motion.div
                    className="relative group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      alt="Mentor"
                      className="w-full sm:w-56 lg:w-72 object-cover rounded-2xl shadow-lg"
                      src="/valera.jpg"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                  <h3
                    className={subtitle({
                      className:
                        "text-2xl sm:text-3xl lg:text-4xl font-semibold",
                    })}
                  >
                    Valera Arakelyan
                  </h3>
                  <span
                    className={title({
                      className:
                        "text-blue-500 text-xl sm:text-2xl lg:text-3xl font-medium tracking-wide",
                    })}
                  >
                    Founder of "Freshman Academy"
                  </span>
                </div>
              </div>
            </FadeInWhenVisible>

            {/* Program Content */}
            <FadeInWhenVisible variant="scale">
              <div className="flex flex-col w-full mt-16 sm:mt-24 lg:mt-32">
                <h2
                  className={title({
                    color: "violet",
                    className:
                      "text-center text-4xl sm:text-5xl lg:text-6xl mb-16 sm:mb-24 font-medium tracking-tight letter-spacing-[-0.02em]",
                  })}
                >
                  Program Content
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {[
                    {
                      icon: "/light.webp",
                      text: "1. Start and/or Expand a passion project",
                    },
                    {
                      icon: "/briefcase.webp",
                      text: "2. Land an internship and/or research position",
                    },
                    {
                      icon: "/color-palette.webp",
                      text: "3. Turn your hobbies into meaningful activities",
                    },
                    {
                      icon: "/globe.webp",
                      text: "4. Apply to an international program",
                    },
                    {
                      icon: "/cert.png",
                      text: "5. Build a solid plan to develop your portfolio",
                    },
                  ].map((item, index) => (
                    <FadeInWhenVisible
                      key={index}
                      delay={index * 0.1}
                      variant="fade"
                    >
                      <div className="flex flex-col items-center justify-center gap-8 group">
                        <motion.div
                          className="relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-8"
                          animate={{
                            boxShadow: [
                              "0 0 0 rgba(0,0,0,0.2)",
                              "0 0 25px rgba(59,130,246,0.6)",
                              "0 0 0 rgba(0,0,0,0.2)",
                            ],
                          }}
                          transition={{
                            boxShadow: {
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                          }}
                          whileHover={{ 
                            scale: 1.08,
                            transition: { duration: 0.3 }
                          }}
                        >
                          <motion.img
                            alt={`Icon ${index + 1}`}
                            animate={{
                              rotate: [0, 8, -8, 8, 0],
                              scale: [1, 1.15, 0.95, 1.15, 1],
                              y: [0, -10, 5, -10, 0]
                            }}
                            className="w-40 h-40 object-contain"
                            src={item.icon}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: index * 0.15,
                            }}
                            whileHover={{ 
                              scale: 1.2,
                              rotate: [0, 10, -10, 10, 0],
                              transition: { duration: 0.3 }
                            }}
                          />
                        </motion.div>
                        <p className="font-normal text-xl w-[80%] text-gray-700 dark:text-gray-200 text-center tracking-wide">
                          {item.text}
                        </p>
                      </div>
                    </FadeInWhenVisible>
                  ))}
                </div>
              </div>
            </FadeInWhenVisible>

            {/* Reserve spot button after content */}
            <div className="flex justify-center text-center mt-16">
              <motion.div
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Button
                  as="a"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSd6AWKN7TyfWaPFtU1XsfyhcuNghMJ-UDEF7vZMBvoMZwvjIw/viewform?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  radius="lg"
                  className="text-xl px-16 py-8 font-medium bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 text-white hover:opacity-90 relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-violet-400/20 to-blue-400/20"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <span className="relative z-10">Reserve a spot</span>
                </Button>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: 0.5,
                    type: "spring",
                    stiffness: 90
                  }}
                  className="flex justify-center items-center w-full mt-8"
                >
                  <div className="w-full max-w-2xl">
                    <motion.div
                      className="text-center p-6 sm:p-8 bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 rounded-2xl shadow-xl"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.7,
                        type: "spring",
                        stiffness: 100
                      }}
                    >
                      <p className="text-xl sm:text-2xl font-bold text-red-800 dark:text-red-300 tracking-tight flex items-center justify-center">
                        <span className="text-3xl mr-4">⏰</span>
                        Deadline to Apply
                      </p>
                      <p className="text-2xl sm:text-3xl font-extrabold text-red-900 dark:text-red-200 mt-3 tracking-wide">
                        9th February 22:00
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Program Workload */}
            <FadeInWhenVisible>
              <div className="flex flex-col w-full mt-16 sm:mt-24 lg:mt-32">
                <h2
                  className={title({
                    color: "cyan",
                    className:
                      "text-center w-full text-4xl sm:text-5xl lg:text-6xl mb-16 sm:mb-24 font-medium tracking-tight letter-spacing-[-0.02em]",
                  })}
                >
                  Program Workload
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {[
                    {
                      icon: "/1.png",
                      text: "three individual meetings with Azizbek each week for two months",
                    },
                    {
                      icon: "/2.png",
                      text: "three individual meetings with Valera during the program",
                    },
                    {
                      icon: "/3.png",
                      text: "group meetings with guests from TOP universities",
                    },
                    {
                      icon: "/4.png",
                      text: "24/7 support from Azizbek",
                    },
                  ].map((item, index) => (
                    <FadeInWhenVisible
                      key={index}
                      delay={index * 0.1}
                      variant="fade"
                    >
                      <div className="flex items-center gap-8 group">
                        <motion.img
                          alt={`Number ${index + 1}`}
                          className="w-32 h-32 object-contain"
                          src={item.icon}
                          animate={{
                            scale: [1, 1.12, 0.95, 1.12, 1],
                            rotate: [0, 5, -5, 5, 0],
                            y: [0, -8, 4, -8, 0]
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.2
                          }}
                          whileHover={{ 
                            scale: 1.2,
                            rotate: [0, 8, -8, 8, 0],
                            transition: { duration: 0.3 }
                          }}
                        />
                        <p className="font-normal text-xl text-gray-700 dark:text-gray-200 tracking-wide">
                          {item.text}
                        </p>
                      </div>
                    </FadeInWhenVisible>
                  ))}
                </div>
              </div>
            </FadeInWhenVisible>

            {/* Wanna join? */}
            <FadeInWhenVisible>
              <div className="flex flex-col w-full mt-16 sm:mt-24 lg:mt-32">
                <h2
                  className={title({
                    color: "blue",
                    className:
                      "text-center text-4xl sm:text-5xl lg:text-6xl mb-16 sm:mb-24 font-medium tracking-tight letter-spacing-[-0.02em] relative"
                  })}
                >
                  Wanna join?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 w-full">
                  {[
                    {
                      icon: "/lighting.png",
                      title: "Program cost",
                      price: null,
                    },
                    {
                      icon: "/lighting.png",
                      title: "1200$ for two months",
                      subtitle: "(600$ per month)",
                    },
                  ].map((item, index) => (
                    <FadeInWhenVisible
                      key={index}
                      delay={index * 0.1}
                      variant="fade"
                    >
                      <div className="flex items-center gap-6 sm:gap-8 group bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all relative overflow-hidden">
                        <motion.div
                          className="relative z-10"
                          animate={{
                            rotate: [0, 10, -10, 10, 0],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.2
                          }}
                        >
                          <motion.img
                            alt={`Icon ${index + 1}`}
                            animate={{
                              scale: [1, 1.15, 0.95, 1.15, 1],
                              y: [0, -4, 2, -4, 0]
                            }}
                            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain"
                            src={item.icon}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: index * 0.15
                            }}
                          />
                        </motion.div>
                        <div className="flex flex-col gap-2">
                          <h3 className="font-medium text-xl sm:text-2xl lg:text-3xl text-gray-700 dark:text-gray-200 tracking-wide">
                            {item.title}
                          </h3>
                          {item.subtitle && (
                            <p
                              className={subtitle({
                                className: item.price
                                  ? "line-through font-normal text-base sm:text-lg lg:text-xl"
                                  : "font-normal text-base sm:text-lg lg:text-xl",
                              })}
                            >
                            {item.subtitle}
                          </p>
                          )}
                        </div>
                        <motion.div
                          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/10 to-violet-500/10 dark:from-blue-500/10 dark:to-violet-500/10 opacity-70"
                          animate={{
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.2
                          }}
                        />
                      </div>
                    </FadeInWhenVisible>
                  ))}
                </div>

                {/* Final Note */}
                <div className="flex flex-wrap items-center justify-center gap-8 mt-24 bg-gradient-to-r from-pink-100/50 to-violet-100/50 dark:from-pink-900/20 dark:to-violet-900/20 rounded-3xl p-8 sm:p-12">
                  <motion.img
                    alt="Exclamation Mark"
                    className="h-20 sm:h-24 lg:h-32"
                    src="/exclamation.png"
                    animate={{
                      scale: [1, 1.15, 0.95, 1.15, 1],
                      x: [0, -10, 10, 0],
                      y: [0, -8, 4, -8, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{ scale: 1.1 }}
                  />
                  <motion.p
                    animate={{ opacity: 1 }}
                    className={title({
                      size: "sm",
                      color: "pink",
                      className:
                        "font-medium text-xl sm:text-2xl lg:text-3xl tracking-wide max-w-xl text-center",
                    })}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    P.s: There are 5 spots available in the program and already 2 are sold. So, hurry up!
                  </motion.p>
                  <motion.div
                    animate={{
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Button
                      as="a"
                      href="https://docs.google.com/forms/d/e/1FAIpQLSd6AWKN7TyfWaPFtU1XsfyhcuNghMJ-UDEF7vZMBvoMZwvjIw/viewform?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      size="lg"
                      radius="lg"
                      className="text-xl px-16 py-8 font-medium bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 text-white hover:opacity-90 relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-violet-400/20 to-blue-400/20"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <span className="relative z-10">Reserve a spot</span>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
          <div className="max-w-2xl">
            <motion.div
              className="text-center p-6 sm:p-8 bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 rounded-2xl shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.7,
                type: "spring",
                stiffness: 100
              }}
            >
              <p className="text-xl sm:text-2xl font-bold text-red-800 dark:text-red-300 tracking-tight flex items-center justify-center">
                <span className="text-3xl mr-4">⏰</span>
                Deadline to Apply
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-red-900 dark:text-red-200 mt-3 tracking-wide">
                9th February 22:00
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}

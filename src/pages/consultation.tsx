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

export default function ConsultationPage() {
  return (
    <DefaultLayout>
      <ScrollProgressBar />
      <div className="max-w-9xl mx-auto px-6 lg:px-8 relative overflow-hidden">
        {/* Background Blur Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-[30px] sm:left-[20%] w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full bg-gradient-to-br from-blue-400/20 via-violet-400/20 to-pink-400/20 dark:from-blue-500/20 dark:via-violet-500/20 dark:to-pink-500/20 blur-[60px] sm:blur-[120px]"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
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

        <section className="flex flex-col items-center justify-center gap-20 sm:gap-28 lg:gap-36 py-16 sm:py-20 lg:py-28 relative">
          {/* Logos */}
          <div className="flex flex-col items-center justify-center gap-16 w-full mt-20 sm:mt-40">
            {/* Program Title */}
            <div className="text-center space-y-8">
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-8"
                initial={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7 }}
              >
                <h1
                  className={title({
                    color: "blue",
                    className:
                      "text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 dark:from-blue-400 dark:via-violet-400 dark:to-pink-400 bg-clip-text text-transparent",
                  })}
                >
                  &#34;Portfolio Accelerator&#34; consultations
                </h1>
                <motion.p
                  animate={{ opacity: 1 }}
                  className={subtitle({
                    className:
                      "text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 font-normal tracking-wide max-w-4xl",
                  })}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Expert advice on building Ivy-level extracurriculars and honors by Azizbek (Harvard class of 2029)
                </motion.p>
              </motion.div>
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
                  Consultations are for high school and gap year students who are planning to apply to TOP US universities. Meetings are aimed at advising the students on how to prepare their portfolio to a top-notch level.
                </p>
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Consultant */}
          <div className="space-y-24 sm:space-y-32 lg:space-y-48 mt-16 sm:mt-24 lg:mt-32">
            {/* Consultant */}
            <FadeInWhenVisible variant="slideUp">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-16 w-full">
                <div className="flex flex-col gap-8 items-center text-center lg:w-1/3">
                  <h2
                    className={title({
                      color: "blue",
                      className:
                        "text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-wide bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 dark:from-blue-400 dark:via-violet-400 dark:to-pink-400 bg-clip-text text-transparent",
                    })}
                  >
                    Consultant
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
                        "text-2xl sm:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent",
                    })}
                  >
                    Azizbek Zaylobiddinov
                  </h3>
                  <span
                    className={title({
                      className:
                        "text-amber-600 dark:text-amber-400 text-xl sm:text-2xl lg:text-3xl font-medium tracking-wide",
                    })}
                  >
                    HARVARD class of 2029
                  </span>
                </div>

                <div className="flex flex-col gap-8 lg:w-2/3">
                  <div className="space-y-6">
                    {[
                      {
                        title: "Portfolio Development Expert",
                        description: "Holds valuable expertise in building and scaling projects, activities, and honors that stand out in college applications"
                      },
                      {
                        title: "Leadership Experience",
                        description: "Manager of 'Ibrat Debate' - Uzbekistan's biggest debate network, leading 100+ volunteers and engaging 2000+ youth in nearly 100 debates across 14 regions"
                      },
                      {
                        title: "Project Management",
                        description: "Worked in Executive Management positions at Swap Up, TEDxFerPSYouth, Young Writers Society, and many other successful projects"
                      },
                      {
                        title: "Research & Internships",
                        description: "Conducted academic research and landed internships at government and non-government agencies, building a comprehensive portfolio"
                      }
                    ].map((item, index) => (
                      <FadeInWhenVisible
                        key={index}
                        delay={index * 0.1}
                        variant="fade"
                      >
                        <motion.div 
                          className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/90 via-white/95 to-white/90 dark:from-gray-800/90 dark:via-gray-800/95 dark:to-gray-800/90 p-8 sm:p-10 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-500 shadow-lg hover:shadow-xl"
                          whileHover={{ 
                            scale: 1.02,
                            transition: { duration: 0.4 }
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] via-violet-500/[0.02] to-pink-500/[0.02] dark:from-blue-500/[0.05] dark:via-violet-500/[0.05] dark:to-pink-500/[0.05]" />
                          
                          <div className="relative space-y-4">
                            <h3 className="font-medium text-xl sm:text-2xl text-gray-800 dark:text-gray-100 tracking-wide">
                              {item.title}
                            </h3>
                            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 tracking-wide leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          {/* Elegant corner accents */}
                          <div className="absolute top-0 left-0 w-16 h-16">
                            <div className="absolute top-0 left-0 w-px h-8 bg-gradient-to-b from-blue-500/20 to-transparent" />
                            <div className="absolute top-0 left-0 w-8 h-px bg-gradient-to-r from-blue-500/20 to-transparent" />
                          </div>
                          <div className="absolute top-0 right-0 w-16 h-16 rotate-90">
                            <div className="absolute top-0 left-0 w-px h-8 bg-gradient-to-b from-blue-500/20 to-transparent" />
                            <div className="absolute top-0 left-0 w-8 h-px bg-gradient-to-r from-blue-500/20 to-transparent" />
                          </div>
                          <div className="absolute bottom-0 left-0 w-16 h-16 -rotate-90">
                            <div className="absolute top-0 left-0 w-px h-8 bg-gradient-to-b from-violet-500/20 to-transparent" />
                            <div className="absolute top-0 left-0 w-8 h-px bg-gradient-to-r from-violet-500/20 to-transparent" />
                          </div>
                          <div className="absolute bottom-0 right-0 w-16 h-16 rotate-180">
                            <div className="absolute top-0 left-0 w-px h-8 bg-gradient-to-b from-violet-500/20 to-transparent" />
                            <div className="absolute top-0 left-0 w-8 h-px bg-gradient-to-r from-violet-500/20 to-transparent" />
                          </div>
                        </motion.div>
                      </FadeInWhenVisible>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>

            {/* Before consultation section */}
            <FadeInWhenVisible variant="scale">
              <div className="flex flex-col w-full mt-16 sm:mt-24 lg:mt-32">
                <h2
                  className={title({
                    color: "violet",
                    className:
                      "text-center text-4xl sm:text-5xl lg:text-6xl mb-16 sm:mb-24 font-medium tracking-tight bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 dark:from-blue-400 dark:via-violet-400 dark:to-pink-400 bg-clip-text text-transparent",
                  })}
                >
                  Before consultation
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {[
                    {
                      icon: "/docs.webp",
                      title: "Portfolio Analyzer Sheet",
                      description: "Fill out a detailed form covering your current activities, achievements, and future aspirations to help us understand your profile better"
                    },
                    {
                      icon: "/idea-lamp.webp",
                      title: "Personalized Review",
                      description: "Azizbek thoroughly analyzes your sheet and prepares tailored suggestions to maximize the impact of your portfolio"
                    },
                  ].map((item, index) => (
                    <FadeInWhenVisible
                      key={index}
                      delay={index * 0.1}
                      variant="fade"
                    >
                      <motion.div 
                        className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/90 via-white/95 to-white/90 dark:from-gray-800/90 dark:via-gray-800/95 dark:to-gray-800/90 p-10 sm:p-12 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-500 shadow-lg hover:shadow-xl"
                        whileHover={{ 
                          scale: 1.02,
                          transition: { duration: 0.4 }
                        }}
                      >
                        {/* Enhanced gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] via-violet-500/[0.02] to-pink-500/[0.02] dark:from-blue-500/[0.05] dark:via-violet-500/[0.05] dark:to-pink-500/[0.05]" />
                        
                        <div className="relative flex flex-col items-center gap-10 flex-1">
                          {/* Icon container */}
                          <motion.div
                            className="relative"
                            animate={{
                              y: [0, -8, 0],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <motion.img
                              alt={`Icon ${index + 1}`}
                              className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
                              src={item.icon}
                              whileHover={{ 
                                scale: 1.1,
                                rotate: [-5, 5, -5, 0],
                                transition: { duration: 0.4 }
                              }}
                            />
                            
                            {/* Subtle glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-violet-500/10 dark:from-blue-500/20 dark:to-violet-500/20 blur-2xl -z-10" />
                          </motion.div>

                          {/* Text content */}
                          <div className="text-center space-y-4 z-10">
                            <h3 className="font-medium text-2xl sm:text-3xl text-gray-800 dark:text-gray-100 tracking-wide">
                              {item.title}
                            </h3>
                            <p className="font-normal text-lg sm:text-xl text-gray-600 dark:text-gray-300 tracking-wide max-w-md mx-auto">
                              {item.description}
                            </p>
                          </div>

                          {/* Elegant corner accents */}
                          <div className="absolute top-0 left-0 w-20 h-20">
                            <div className="absolute top-0 left-0 w-px h-12 bg-gradient-to-b from-blue-500/20 to-transparent" />
                            <div className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-blue-500/20 to-transparent" />
                          </div>
                          <div className="absolute top-0 right-0 w-20 h-20 rotate-90">
                            <div className="absolute top-0 left-0 w-px h-12 bg-gradient-to-b from-blue-500/20 to-transparent" />
                            <div className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-blue-500/20 to-transparent" />
                          </div>
                          <div className="absolute bottom-0 left-0 w-20 h-20 -rotate-90">
                            <div className="absolute top-0 left-0 w-px h-12 bg-gradient-to-b from-violet-500/20 to-transparent" />
                            <div className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-violet-500/20 to-transparent" />
                          </div>
                          <div className="absolute bottom-0 right-0 w-20 h-20 rotate-180">
                            <div className="absolute top-0 left-0 w-px h-12 bg-gradient-to-b from-violet-500/20 to-transparent" />
                            <div className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-violet-500/20 to-transparent" />
                          </div>
                        </div>
                      </motion.div>
                    </FadeInWhenVisible>
                  ))}
                </div>
              </div>
            </FadeInWhenVisible>

            {/* During consultation section */}
            <FadeInWhenVisible variant="scale">
              <div className="flex flex-col w-full mt-16 sm:mt-24 lg:mt-32">
                <h2
                  className={title({
                    color: "violet",
                    className:
                      "text-center text-4xl sm:text-5xl lg:text-6xl mb-16 sm:mb-24 font-medium tracking-tight bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 dark:from-blue-400 dark:via-violet-400 dark:to-pink-400 bg-clip-text text-transparent",
                  })}
                >
                  During consultation
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 h-full">
                  {[
                    {
                      icon: "/online-meeting.webp",
                      title: "Portfolio Review",
                      description: "In-depth analysis of your current activities with specific recommendations for improvements and additions to strengthen your profile"
                    },
                    {
                      icon: "/qa.webp",
                      title: "Interactive Q&A",
                      description: "Comprehensive discussion addressing all your questions about portfolio development, extracurriculars, and application strategy"
                    },
                    {
                      icon: "/todo.webp",
                      title: "Action Plan Creation",
                      description: "Collaborate with Azizbek to develop a detailed roadmap of actionable steps to enhance your portfolio based on the consultation"
                    },
                  ].map((item, index) => (
                    <FadeInWhenVisible
                      key={index}
                      delay={index * 0.1}
                      variant="fade"
                      className="h-full"
                    >
                      <motion.div 
                        className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/90 via-white/95 to-white/90 dark:from-gray-800/90 dark:via-gray-800/95 dark:to-gray-800/90 p-10 sm:p-12 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-500 shadow-lg hover:shadow-xl h-full flex"
                        whileHover={{ 
                          scale: 1.02,
                          transition: { duration: 0.4 }
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] via-violet-500/[0.02] to-pink-500/[0.02] dark:from-blue-500/[0.05] dark:via-violet-500/[0.05] dark:to-pink-500/[0.05]" />
                        
                        <div className="relative flex flex-col items-center gap-10 flex-1">
                          {/* Icon container */}
                          <motion.div
                            className="relative"
                            animate={{
                              y: [0, -8, 0],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <motion.img
                              alt={`Icon ${index + 1}`}
                              className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
                              src={item.icon}
                              whileHover={{ 
                                scale: 1.1,
                                rotate: [-5, 5, -5, 0],
                                transition: { duration: 0.4 }
                              }}
                            />
                            
                            {/* Subtle glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-violet-500/10 dark:from-blue-500/20 dark:to-violet-500/20 blur-2xl -z-10" />
                          </motion.div>

                          {/* Text content */}
                          <div className="text-center space-y-4 z-10">
                            <h3 className="font-medium text-2xl sm:text-3xl text-gray-800 dark:text-gray-100 tracking-wide">
                              {item.title}
                            </h3>
                            <p className="font-normal text-lg sm:text-xl text-gray-600 dark:text-gray-300 tracking-wide max-w-md mx-auto">
                              {item.description}
                            </p>
                          </div>

                          {/* Elegant corner accents */}
                          <div className="absolute top-0 left-0 w-20 h-20">
                            <div className="absolute top-0 left-0 w-px h-12 bg-gradient-to-b from-blue-500/20 to-transparent" />
                            <div className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-blue-500/20 to-transparent" />
                          </div>
                          <div className="absolute top-0 right-0 w-20 h-20 rotate-90">
                            <div className="absolute top-0 left-0 w-px h-12 bg-gradient-to-b from-blue-500/20 to-transparent" />
                            <div className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-blue-500/20 to-transparent" />
                          </div>
                          <div className="absolute bottom-0 left-0 w-20 h-20 -rotate-90">
                            <div className="absolute top-0 left-0 w-px h-12 bg-gradient-to-b from-violet-500/20 to-transparent" />
                            <div className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-violet-500/20 to-transparent" />
                          </div>
                          <div className="absolute bottom-0 right-0 w-20 h-20 rotate-180">
                            <div className="absolute top-0 left-0 w-px h-12 bg-gradient-to-b from-violet-500/20 to-transparent" />
                            <div className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-violet-500/20 to-transparent" />
                          </div>
                        </div>
                      </motion.div>
                    </FadeInWhenVisible>
                  ))}
                </div>
              </div>
            </FadeInWhenVisible>

            {/* After consultation section - Updated with improved styling */}
            <FadeInWhenVisible variant="scale">
              <div className="flex flex-col w-full mt-16 sm:mt-24 lg:mt-32">
                <h2
                  className={title({
                    color: "violet",
                    className:
                      "text-center text-4xl sm:text-5xl lg:text-6xl mb-16 sm:mb-24 font-medium tracking-tight bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 dark:from-blue-400 dark:via-violet-400 dark:to-pink-400 bg-clip-text text-transparent",
                  })}
                >
                  After consultation
                </h2>
                <div className="flex justify-center">
                  <FadeInWhenVisible
                    delay={0.1}
                    variant="fade"
                  >
                    <motion.div 
                      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/90 via-white/95 to-white/90 dark:from-gray-800/90 dark:via-gray-800/95 dark:to-gray-800/90 p-10 sm:p-12 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-500 shadow-lg hover:shadow-xl"
                      whileHover={{ 
                        scale: 1.02,
                        transition: { duration: 0.4 }
                      }}
                    >
                      {/* Enhanced gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] via-violet-500/[0.02] to-pink-500/[0.02] dark:from-blue-500/[0.05] dark:via-violet-500/[0.05] dark:to-pink-500/[0.05]" />
                      
                      <div className="relative flex flex-col items-center gap-12 max-w-4xl mx-auto">
                        {/* Icon container */}
                        <motion.div
                          className="relative w-full"
                          animate={{
                            y: [0, -8, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <motion.img
                            alt="Group of people"
                            className="w-full h-auto max-w-3xl mx-auto object-contain"
                            src="/group-of-people.png"
                            whileHover={{ 
                              scale: 1.05,
                              transition: { duration: 0.4 }
                            }}
                          />
                          
                          {/* Subtle glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-violet-500/10 dark:from-blue-500/20 dark:to-violet-500/20 blur-2xl -z-10" />
                        </motion.div>

                        {/* Text content with improved formatting */}
                        <div className="text-center space-y-6 z-10">
                          <h3 className="font-medium text-2xl sm:text-3xl text-gray-800 dark:text-gray-100 tracking-wide">
                            Join the "Parvoz Student" Community
                          </h3>
                          <div className="space-y-4">
                            <p className="font-normal text-xl sm:text-2xl text-gray-600 dark:text-gray-300 tracking-wide max-w-2xl mx-auto leading-relaxed">
                              Get exclusive access to the "Parvoz Student" group where:
                            </p>
                            <ul className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 space-y-3 max-w-2xl mx-auto">
                              <li className="flex items-center justify-center gap-2">
                                <span className="text-blue-500 dark:text-blue-400">•</span>
                                Azizbek provides ongoing support and answers your questions
                              </li>
                              <li className="flex items-center justify-center gap-2">
                                <span className="text-blue-500 dark:text-blue-400">•</span>
                                New opportunities to enhance your portfolio are regularly shared
                              </li>
                              <li className="flex items-center justify-center gap-2">
                                <span className="text-blue-500 dark:text-blue-400">•</span>
                                Connect with like-minded students on similar journeys
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* Elegant corner accents */}
                        <div className="absolute top-0 left-0 w-20 h-20">
                          <div className="absolute top-0 left-0 w-px h-12 bg-gradient-to-b from-blue-500/20 to-transparent" />
                          <div className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-blue-500/20 to-transparent" />
                        </div>
                        <div className="absolute top-0 right-0 w-20 h-20 rotate-90">
                          <div className="absolute top-0 left-0 w-px h-12 bg-gradient-to-b from-blue-500/20 to-transparent" />
                          <div className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-blue-500/20 to-transparent" />
                        </div>
                        <div className="absolute bottom-0 left-0 w-20 h-20 -rotate-90">
                          <div className="absolute top-0 left-0 w-px h-12 bg-gradient-to-b from-violet-500/20 to-transparent" />
                          <div className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-violet-500/20 to-transparent" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-20 h-20 rotate-180">
                          <div className="absolute top-0 left-0 w-px h-12 bg-gradient-to-b from-violet-500/20 to-transparent" />
                          <div className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-violet-500/20 to-transparent" />
                        </div>
                      </div>
                    </motion.div>
                  </FadeInWhenVisible>
                </div>
              </div>
            </FadeInWhenVisible>

            {/* Rates section */}
            

            {/* Wanna join? section - Updated with new pricing */}
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
                      title: "a 50-minute consultation",
                      description: "One-on-one session with personalized guidance",
                    },
                    {
                      icon: "/lighting.png",
                      title: "33$",
                      description: "Investment in your future success",
                    },
                  ].map((item, index) => (
                    <FadeInWhenVisible
                      key={index}
                      delay={index * 0.1}
                      variant="fade"
                    >
                      <motion.div 
                        className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/90 via-white/95 to-white/90 dark:from-gray-800/90 dark:via-gray-800/95 dark:to-gray-800/90 p-10 sm:p-12 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-500 shadow-lg hover:shadow-xl h-full"
                        whileHover={{ 
                          scale: 1.02,
                          transition: { duration: 0.4 }
                        }}
                      >
                        {/* Enhanced gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] via-violet-500/[0.02] to-pink-500/[0.02] dark:from-blue-500/[0.05] dark:via-violet-500/[0.05] dark:to-pink-500/[0.05]" />
                        
                        <div className="relative flex items-center gap-8 h-full">
                          <motion.div
                            className="relative flex-shrink-0"
                            animate={{
                              rotate: [0, 5, -5, 5, 0],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <motion.img
                              alt={`Icon ${index + 1}`}
                              animate={{
                                scale: [1, 1.1, 0.95, 1.1, 1],
                                y: [0, -4, 2, -4, 0]
                              }}
                              className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                              src={item.icon}
                              transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                            
                            {/* Subtle glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-violet-500/10 dark:from-blue-500/20 dark:to-violet-500/20 blur-xl -z-10" />
                          </motion.div>

                          <div className="flex flex-col gap-2 flex-1">
                            <h3 className="font-medium text-2xl sm:text-3xl text-gray-800 dark:text-gray-100 tracking-wide">
                              {item.title}
                            </h3>
                            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 tracking-wide">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {/* Elegant corner accents */}
                        <div className="absolute top-0 left-0 w-16 h-16">
                          <div className="absolute top-0 left-0 w-px h-8 bg-gradient-to-b from-blue-500/20 to-transparent" />
                          <div className="absolute top-0 left-0 w-8 h-px bg-gradient-to-r from-blue-500/20 to-transparent" />
                        </div>
                        <div className="absolute top-0 right-0 w-16 h-16 rotate-90">
                          <div className="absolute top-0 left-0 w-px h-8 bg-gradient-to-b from-blue-500/20 to-transparent" />
                          <div className="absolute top-0 left-0 w-8 h-px bg-gradient-to-r from-blue-500/20 to-transparent" />
                        </div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 -rotate-90">
                          <div className="absolute top-0 left-0 w-px h-8 bg-gradient-to-b from-violet-500/20 to-transparent" />
                          <div className="absolute top-0 left-0 w-8 h-px bg-gradient-to-r from-violet-500/20 to-transparent" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-16 h-16 rotate-180">
                          <div className="absolute top-0 left-0 w-px h-8 bg-gradient-to-b from-violet-500/20 to-transparent" />
                          <div className="absolute top-0 left-0 w-8 h-px bg-gradient-to-r from-violet-500/20 to-transparent" />
                        </div>
                      </motion.div>
                    </FadeInWhenVisible>
                  ))}
                </div>
              </div>
              {/* Final Note - Updated with reddish theme */}
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-24 bg-gradient-to-br from-red-50/90 to-red-100/90 dark:from-red-900/30 dark:to-red-800/30 rounded-3xl p-6 sm:p-12 md:p-16 backdrop-blur-sm border-2 border-red-200/50 dark:border-red-700/30 shadow-xl">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 w-full">
                  <motion.img
                    alt="Exclamation Mark"
                    className="h-16 sm:h-20 md:h-24 lg:h-28 my-auto"
                    src="/exclamation.png"
                    animate={{
                      scale: [1, 1.1, 0.95, 1.1, 1],
                      y: [0, -5, 2, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="flex flex-col items-center gap-4 sm:gap-6 flex-1 w-full">
                    <motion.p
                      animate={{ opacity: 1 }}
                      className={title({
                        size: "sm",
                        className:
                          "font-medium text-lg sm:text-xl md:text-2xl text-red-800 dark:text-red-200 tracking-wide max-w-2xl text-center leading-relaxed px-4",
                      })}
                      initial={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      There are only 3-5 spots for consultations each weekend. Thus, hurry up to reserve your spot
                    </motion.p>

                    <Button
                      as="a"
                      href="https://forms.gle/rvf6kDWXqUD1Z5CG7"
                      target="_blank"
                      rel="noopener noreferrer"
                      size="lg"
                      radius="full"
                      className="text-lg sm:text-xl md:text-2xl px-8 sm:px-12 md:px-16 py-6 sm:py-7 md:py-8 font-medium bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white hover:opacity-90 relative overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl w-full sm:w-auto"
                      onPress={() => {
                        // Track the click event with Plausible
                        if (window.plausible) {
                          window.plausible('Reserve Spot Click', {
                            props: {
                              location: 'Consultation Page',
                              destination: 'Final Note section - Google Form'
                            }
                          });
                        }
                      }}
                    >
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
                      <span className="relative z-10">Reserve a spot</span>
                    </Button>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}

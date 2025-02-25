import { motion, useAnimation, useScroll, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Button } from "@nextui-org/react";

import { title, subtitle } from "@/components/primitives.ts";
import DefaultLayout from "@/layouts/default";

interface Student {
  name: string;
  score: string;
  img: string;
  testimonial: string;
}

interface Program {
  title: string;
  img: string;
}

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

const LogoSection = () => (
  <div className="flex flex-col items-center justify-center gap-4 w-full">
    <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
      {[
        { src: "/logo.png", className: "dark:hidden  w-24 sm:w-48" },
        { src: "/x.png", className: "dark:hidden w-16 sm:w-24 rounded-full" },
        {
          src: "/satashkent-logo.jpg",
          className: "dark:hidden w-16 sm:w-24 rounded-full",
        },
        { src: "/logo-dark.png", className: "hidden dark:block w-24 sm:w-48" },
        {
          src: "/x.png",
          className: "hidden dark:block w-16 sm:w-24 rounded-full",
        },
        {
          src: "/satashkent-logo.jpg",
          className: "hidden dark:block w-16 sm:w-24 rounded-full",
        },
      ].map((logo, index) => (
        <motion.img
          key={index}
          alt="Logo"
          className={`${logo.className} hover:shadow-xl transition-all duration-300`}
          src={logo.src}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
      ))}
    </div>
  </div>
);

const MainTitle = () => (
  <div className="text-center space-y-8 px-4 max-w-5xl mx-auto relative">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative"
    >
      {/* Animated background element */}
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-pink-500/10 rounded-xl blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <h1
        className={title({
          color: "blue",
          className:
            "text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight relative",
        })}
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          SAT Accelerator
        </motion.span>{" "}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600"
        >
          by Parvoz & SATASHKENT
        </motion.span>
      </h1>
    </motion.div>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className={subtitle({
        className:
          "text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 relative",
      })}
    >
      Boost Your SAT Score with Expert Guidance
    </motion.p>
  </div>
);

const ProgramDetails = () => (
  <FadeInWhenVisible variant="slideUp">
    <div
      className="bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/50 dark:to-gray-900/50 
                    backdrop-blur-lg rounded-3xl p-6 sm:p-12 shadow-lg hover:shadow-xl 
                    transition-all duration-300 mx-4"
    >
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 max-w-6xl mx-auto">
        <motion.img
          alt="Graduate"
          className="w-32 sm:w-48 lg:w-64 drop-shadow-2xl"
          src="/graduate.png"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <h2
            className={title({
              color: "cyan",
              className: "text-2xl sm:text-3xl lg:text-4xl font-bold",
            })}
          >
            Course Overview
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Our intensive 3-month SAT Accelerator Program combines expert
            guidance, personalized attention, and proven strategies to help you
            achieve your target score.
          </p>
        </div>
      </div>
    </div>
  </FadeInWhenVisible>
);

const StudentCard = ({
  student,
  index,
}: {
  student: Student;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden 
                 shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={student.img}
          alt={`${student.name}'s SAT Result`}
          className="w-full h-full object-contain"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onError={(e) => {
            e.currentTarget.src = "/default-result.jpg";
          }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <motion.div
        className="p-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-3">
          <motion.h3
            className="font-semibold text-lg text-gray-800 dark:text-gray-100"
            whileHover={{ x: 5 }}
          >
            {student.name}
          </motion.h3>
          <motion.span
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.1 }}
          >
            {student.score}
          </motion.span>
        </div>
        <motion.p
          className="text-gray-600 dark:text-gray-400 text-sm italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          "{student.testimonial}"
        </motion.p>
      </motion.div>
    </motion.div>
  </motion.div>
);

const StudentResults = () => (
  <section className="py-16 px-4">
    <div className="max-w-7xl mx-auto text-center">
      <h2 className={`${title({ color: "blue" })}`}>
        Our Student Success Stories
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-16 sm:mb-24 mt-8 text-lg max-w-3xl mx-auto">
        Meet our students who achieved exceptional SAT scores through dedication
        and our guidance
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            name: "Ulug'bek Abdumutalov",
            score: "1510",
            img: "/sat-result-1.jpg",
            testimonial: "The program helped me achieve my target score!",
          },
          {
            name: "Gulyoraxon Xaydarova",
            score: "1550",
            img: "/sat-result-2.jpg",
            testimonial: "Incredible support from the teachers!",
          },
          {
            name: "Shavkatbek Aslonov",
            score: "1500",
            img: "/sat-result-3.jpg",
            testimonial: "Great study materials and practice tests",
          },
          {
            name: "Azizbek Sheripboev",
            score: "1560",
            img: "/sat-result-4.jpg",
            testimonial: "The strategies I learned were invaluable",
          },
          {
            name: "Ruxshona Usmonova",
            score: "1520",
            img: "/sat-result-5.jpg",
            testimonial: "Excellent preparation for the actual test",
          },
          {
            name: "Muslima Rustamova",
            score: "1500",
            img: "/sat-result-6.jpg",
            testimonial: "Very structured and effective program",
          },
        ].map((student, index) => (
          <StudentCard key={index} student={student} index={index} />
        ))}
      </div>

      {/* Stats Summary - Updated design */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { number: "1450", label: "Median Score" },
          { number: "95%", label: "Success Rate" },
          { number: "400+", label: "Students Helped" },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white/50 to-white/10 dark:from-gray-800/50 dark:to-gray-900/50 
                       backdrop-blur-md rounded-2xl p-8 text-center 
                       shadow-lg hover:shadow-xl transition-all duration-300
                       border border-gray-200/20"
          >
            <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-2">
              {stat.number}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const RegisterButton = () => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="relative group"
  >
    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
    <Button
      as="a"
      href="https://forms.gle/vng3wKubHz9GDWHB9"
      target="_blank"
      rel="noopener noreferrer"
      size="lg"
      className="relative p-12 bg-black dark:bg-white text-white dark:text-black text-lg font-medium rounded-3xl"
    >
      <span className="text-2xl">Reserve Your Spot</span>
    </Button>
  </motion.div>
);

const ProgramCard = ({
  program,
  index,
}: {
  program: Program;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
  >
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="flex flex-col items-center gap-6 p-8 rounded-2xl
                 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm
                 border border-gray-200/20 shadow-lg hover:shadow-xl
                 transition-all duration-300"
    >
      <motion.div
        className="relative w-full aspect-square rounded-xl overflow-hidden
                   bg-gradient-to-br from-blue-100/50 to-violet-100/50
                   dark:from-blue-900/30 dark:to-violet-900/30 p-6"
        whileHover={{ scale: 1.05 }}
      >
        <motion.img
          src={program.img}
          className="w-full h-full object-contain"
          alt={program.title}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
          }}
        />
      </motion.div>

      <motion.h3
        className="text-xl font-semibold text-gray-800 dark:text-gray-100 text-center"
        whileHover={{ scale: 1.05 }}
      >
        {program.title}
      </motion.h3>
    </motion.div>
  </motion.div>
);

const ProgramOfferings = () => (
  <div className="flex flex-col items-center justify-center gap-8 py-12">
    <h2 className={title({ color: "blue", className: "text-center mb-8" })}>
      What programs we offer
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { title: "SAT 1500+ [Offline]", img: "/offline-3d-icon.png" },
        { title: "SAT 1500+ [Online]", img: "/online-3d-icon.png" },
        { title: "Premier PSAT [Offline]", img: "/offline-3d-icon.png" },
      ].map((program, index) => (
        <ProgramCard key={index} program={program} index={index} />
      ))}
    </div>
  </div>
);

const PartnerSection = () => (
  <div className="w-full max-w-4xl mx-auto px-4">
    <div
      className="bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm
                    rounded-2xl p-8 border border-gray-200/20 shadow-lg
                    transform hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
        <motion.img
          src="/satashkent-logo.jpg"
          alt="SATashkent"
          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg"
          whileHover={{ scale: 1.05 }}
        />
        <div className="flex-1">
          <h2 className={title({ color: "pink", className: "mb-4" })}>
            Our Partner - SATashkent
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Partnering with the No. 1 SAT Education Center in Uzbekistan to
            deliver excellence in education
          </p>
        </div>
      </div>
    </div>
  </div>
);

const FinalCTA = () => (
  <div className="w-full max-w-5xl mx-auto px-4 py-8">
    <div className="relative overflow-hidden">
      {/* Background gradient with blur */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-violet-50/30 to-pink-50/30 
                      dark:from-blue-900/10 dark:via-violet-900/10 dark:to-pink-900/10 
                      backdrop-blur-sm rounded-3xl"
      />

      <div className="relative p-8 sm:p-12 flex flex-col items-center">
        {/* Main content */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2
              className={title({
                color: "blue",
                className: "text-3xl sm:text-4xl font-bold mb-6",
              })}
            >
              Limited Spots Available
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
              Join our elite SAT preparation program today. Only{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                15 spots
              </span>{" "}
              available per program.
            </p>
          </motion.div>
        </div>

        {/* Action elements */}
        <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
          {/* Register button with enhanced styling */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              as="a"
              href="https://forms.gle/vng3wKubHz9GDWHB9"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="relative group px-8 py-6 bg-gradient-to-r from-blue-600 to-violet-600 
                         hover:from-blue-500 hover:to-violet-500
                         text-white text-lg font-medium rounded-xl
                         transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                Reserve Your Spot
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </motion.svg>
              </span>
            </Button>
          </motion.div>

          {/* Decorative element */}
          <motion.div
            className="flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-300"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
            <span>Spots filling quickly</span>
          </motion.div>
        </div>
      </div>
    </div>
  </div>
);

export default function SAT() {
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
              ease: "easeInOut",
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
              ease: "easeInOut",
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
              ease: "easeInOut",
            }}
          />
        </div>

        <section className="flex flex-col items-center justify-center gap-16 sm:gap-24 pb-16 relative">
          {/* Logos */}
          <LogoSection />

          {/* Program Title */}
          <MainTitle />

          {/* Program details */}
          <ProgramDetails />

          {/* Our partner section */}
          <PartnerSection />

          {/* Program offerings */}
          <ProgramOfferings />

          {/* Student results */}
          <StudentResults />

          {/* Register button */}
          <div className="flex justify-center mt-16">
            <RegisterButton />
          </div>

          {/* Program Workload */}
          <FadeInWhenVisible>
            <div className="flex flex-col w-full mt-32 mb-32">
              <div className="text-center max-w-4xl mx-auto mb-20">
                <h2
                  className={title({
                    color: "cyan",
                    className:
                      "text-4xl sm:text-5xl lg:text-6xl font-bold mb-8",
                  })}
                >
                  What we offer apart from SAT?
                </h2>
                <p
                  className={subtitle({
                    className:
                      "text-xl sm:text-2xl text-gray-600 dark:text-gray-300",
                  })}
                >
                  Additional benefits to enhance your learning experience
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {[
                  {
                    icon: "/1.png",
                    title: "Harvard Consultations",
                    text: "Monthly individual consultations with Harvard admits for top 3 performers",
                  },
                  {
                    icon: "/2.png",
                    title: "Guest Speakers",
                    text: "Weekly sessions with FLEX, UWC, and top university representatives",
                  },
                  {
                    icon: "/3.png",
                    title: "Community Events",
                    text: "Weekly 'Choy' community gatherings with Azizbek (Harvard '29)",
                  },
                ].map((item, index) => (
                  <FadeInWhenVisible
                    key={index}
                    delay={index * 0.1}
                    variant="fade"
                  >
                    <div
                      className="flex items-start gap-6 p-8 rounded-2xl
                                   bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm
                                   border border-gray-200/20 hover:shadow-lg
                                   transition-all duration-300"
                    >
                      <div className="flex-shrink-0">
                        <motion.div
                          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-violet-100 
                                    dark:from-blue-900/50 dark:to-violet-900/50 
                                    flex items-center justify-center p-3"
                          whileHover={{ scale: 1.05 }}
                        >
                          <motion.img
                            alt={item.title}
                            className="w-full h-full object-contain"
                            src={item.icon}
                            animate={{
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, 0],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: index * 0.2,
                            }}
                          />
                        </motion.div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </FadeInWhenVisible>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Wanna join? */}
          <FinalCTA />
        </section>
      </div>
    </DefaultLayout>
  );
}

import { motion, useAnimation, useScroll, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Avatar, Button } from "@nextui-org/react";

import { title, subtitle } from "@/components/primitives.ts";
import DefaultLayout from "@/layouts/default";

// Define testimonial data outside the component
interface Testimonial {
  name: string;
  location: string;
  rating: number;
  comment: string;
  messageLink: string;
  image?: string;
}

const testimonialData: Testimonial[] = [
  {
    name: "Sevinch Elmuradova",
    location: "Bukhara, Uzbekistan",
    rating: 5,
    comment:
      "The consultation is definitely worth investing your money in! honestly, i got a lot information and ideas to accelerate my portfolio, thanks to mr. Azizbek's personalized approach. it really did exceed my expectations. thank u!",
    messageLink: "https://t.me/pafeedback/3",
    image: "/sevinch.jpg",
  },
  {
    name: "Nuriddinov Abdulhamid",
    location: "Sirdaryo, Uzbekistan",
    rating: 5,
    comment:
      "Thank you very much for such an amazing consultation. At the beginning, I was stressed that 50 minutes wouldn't be enough. However, because you took notes beforehand and managed the time very efficiently, I got answers to all of my questions for which I'm very thankful. Although it was not a problem in my case, I noticed that you speak faster than the average human can understand, so my only suggestion is to ask the person if they are comfortable with your speed and language. Again, thank you for your support!",
    messageLink: "https://t.me/pafeedback/4",
    image: "/abdulhamid.jpg",
  },
  {
    name: "Laziza Ikromova",
    location: "Tashkent, Uzbekistan",
    rating: 5,
    comment:
      "Thank you very much for the consultation. this is worth buying , because it was obvious that you were prepared and took notes. The session gave me ideas on how to improve my portfolio. Thanks again for your support and help",
    messageLink: "https://t.me/pafeedback/6",
    image: "/laziza.jpg",
  },
  {
    name: "Rustamboyov Behruz",
    location: "Tashkent, Uzbekistan",
    rating: 5,
    comment:
      "Aziz aka I really appreciate the work you've done. While talking with you I even didn't notice how time has passed. I'm really grateful to have bought your consultation, which is affordable and superior to the other ones. You showed me the true path that can lead me to achieve my goals and build strong portfolio. Frankly, I can't express the feelings I've procured from the consultation, just ineffable. Further, you gave an exceptional motivation for me. Thank you so much. Glad to meet you!",
    messageLink: "https://t.me/pafeedback/7",
    image: "/behruz.jpg",
  },
  {
    name: "Qudratova Muyassar",
    location: "Tashkent, Uzbekistan",
    rating: 5,
    comment:
      "I just wanted to thank you so much for all your help in improving my portfolio for my college application. Your advice and expertise truly made a difference, and I’m beyond grateful for the time and effort you dedicated to guiding me. The impact you’ve had on my work is huge, and I couldn’t have done it without you. Wishing you all the best as you begin your studies at Harvard.) I’m sure you’ll do amazing things there, and I’m excited to see where your journey takes you. 🥹Thanks again for everything! Your consultation is THE BEST✨✨✨✨✨✨✨✨✨✨",
    messageLink: "https://t.me/pafeedback/8",
    image: "/muyassar.jpg",
  },
  {
    name: "Ravshanbekov Jamshidbek",
    location: "Namangan, Uzbekistan",
    rating: 5,
    comment:
      "Wow. That was amazing. I got all the useful insights, ideas. Thank you very much for sparing time to give advice and guide me. I wish all the best for you, your team, your family. You helped a lot!! 👍",
    messageLink: "https://t.me/pafeedback/10",
    image: "/jamshidbek.jpg",
  },
  {
    name: "Abdulahad Ne'matjonov",
    location: "Fergana, Uzbekistan",
    rating: 5,
    comment: `I really appreciate the feedback you gave during the consultation. I got new insights about extracurricular activities and honors. 

It's my 2nd gap year already and I would've missed so many opportunities if I did not take this consultation. I got all of the answers for my questions.

Great tip I got about activities is giving the following questions:
— Do I love it?
— Do I learn from it?
— Does it impact others?

Really loved it and looking forward to working with Azizbek in the near future`,
    messageLink: "https://t.me/pafeedback/12",
    image: "/abdulahad.jpg",
  },
  {
    name: "Feruza Sa'dullayeva",
    location: "Bukhara, Uzbekistan",
    rating: 5,
    comment:
      "Hi I am so glad that I took a lot of information in the consultation .I would really recommend this to others who also wanna get into ivy s and have no idea about what to do. Moreover, I got solid answers to all of my questions. I am sure it will definitely come handy .Thanks a lot ❤️‍🔥",
    messageLink: "https://t.me/pafeedback/15",
    image: "/feruza.jpg",
  },
  {
    name: "Bobomurod, Fazliddinov",
    location: "Samarkand, Uzbekistan",
    rating: 5,
    comment:
      "I liked all the advice you gave and the discussions we had. Basically, I draw a whole map for my next year. Initially, I was unsure what to do for the next year since I am nearly done with IELTS and SAT. Yet, after all the discussions, I made up my mind to create all the projects step by step, and took notes of where to start and what to do. Even, I am opening myself to new skills that I didn't come up with before. I appreciate the time you allocated to our chat. Thank you 🫡",
    messageLink: "https://t.me/pafeedback/17",
    image: "/bobomurod.jpg",
  },
  {
    name: "Ibrohim Ismailov",
    location: "Tashkent, Uzbekistan",
    rating: 5,
    comment:
      "Assalomu aleykum everyone honestly it was first time  I participated in this kind of consultattion  and  it is just IMPRRESSIVE .why? because everytime you spend Here or every piece of advice canʼt be find on the internet.Everything suited to you,every suggestion is the best for your situtation even for leadership  instead of 'Common and Basic advice'  dont expext that something Brings me to Ivy league Everything depends your hardcore and maximising your every aspect Thanks to Azizbek  after this consultation my mindset completly changed.",
    messageLink: "https://t.me/pafeedback/18",
    image: "/ibrohim.jpg",
  },
  {
    name: "Raxmatullayeva Madinabonu",
    location: "Tashkent, Uzbekistan",
    rating: 5,
    comment:
      "I wanted to express my gratitude for the guidance you provided during our consultation session. It was incredibly insightful and helped me address many of the questions I had about building a strong extracurricular portfolio.Your detailed approach to analyzing each of my activities and suggesting ways to make them impactful and unique was exactly what I needed. I truly appreciate how you took the time to focus on each aspect, offering practical and creative ideas to help me stand out. The session has given me a clear understanding of my responsibilities and a well-defined to-do list, which includes the most important tasks for achieving my goals.Additionally, I found it valuable to learn about new programs and opportunities I had not known about before. This broadened my perspective and gave me fresh ideas on how I can further enhance my profile.Thanks to your advice, I now feel more confident and motivated to move forward with my plans. I greatly value the time and expertise you shared, and I'm excited to implement the suggestions you provided. Once again, thank you for your support—it was a pleasure working with you!",
    messageLink: "https://t.me/pafeedback/2",
  },
  {
    name: "Azizbek Burkhanov ",
    location: "Tashkent, Uzbekistan",
    rating: 5,
    comment:
      "i'm glad for the consultation and the ideas you provided me to develop my ECs and Honours. Before the cons i didn't even think to look at my ECs at all larger scale and develop them into a bigger activities. Thank you for your help and time!!",
    messageLink: "https://t.me/pafeedback/5",
  },
  {
    name: "Atabekov Amirbek",
    location: "Tashkent, Uzbekistan",
    rating: 5,
    comment:
      "I really appreciate our consultation - it was incredibly helpful! You showed me a clear way to make my college portfolio stand out, and your insights about my passion project and the research program allowed me to take a fresh look at the situation. Your recommendations really inspired me, and now I feel much more confident in my approach. I am grateful for your guidance and will try my best to get into uni. And you are the person that inspires me to keep going.",
    messageLink: "https://t.me/pafeedback/9",
  },
  {
    name: "Rajabova Bibinur",
    location: "Khorezm, Uzbekistan",
    rating: 5,
    comment:
      "I really want to thank you for the meeting. That was really helpful for boosting my portfolio. I got really valuable insights, especially about doing research, internships, and launching my passion project. I was a bit confused about how to manage everything at the same time because I am a gap year student.I hope I can do amazing extracurriculars by the guide you gave me. I appreciate it. Good luck with your future!",
    messageLink: "https://t.me/pafeedback/11",
  },
  {
    name: "Saydullayeva Irodabonu",
    location: "Surkhondaryo, Uzbekistan",
    rating: 5,
    comment:
      "Mr.Azizbek! I just wanted to say a huge thank you for your incredible guidance during our consultation. Your insights truly helped me see my portfolio and application from a new perspective, and I now feel much more confident in my direction. I really appreciate your thoughtful advice and the way you broke things down so clearly. Your support means a lot, and I’m grateful for the time and effort you put into helping me. Looking forward to putting your advice into action!",
    messageLink: "https://t.me/pafeedback/13",
  },
  {
    name: "Mirsaidov Mirsaid",
    location: "Tashkent, Uzbekistan",
    rating: 5,
    comment:
      "This consultation helped me boost my confidence regarding university applications and motivated me to keep improving my portfolio in all aspects. I really appreciate how realistically you assess each student’s situation and provide valuable advice on enhancing their portfolio and achievements. Even though I’m in 9th grade, your consultation helped me understand the strengths and weaknesses of my portfolio. I highly recommend your consultations, especially for 10th and 11th graders who need an objective evaluation of their university portfolio. I am truly grateful to you for your motivation and support!",
    messageLink: "https://t.me/pafeedback/16",
  },
];

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

// Define the TestimonialSection component before it's used
interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  testimonials,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const initialCount = 3; // Number of testimonials to show initially

  const displayedTestimonials = isExpanded
    ? testimonials
    : testimonials.slice(0, initialCount);

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
        {displayedTestimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
            }}
          >
            <a
              href={testimonial.messageLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <motion.div
                className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-3 sm:p-4 shadow-sm hover:shadow transition-shadow duration-200 group h-full flex flex-col"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <Avatar
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="overflow-hidden">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base truncate">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                          {testimonial.location}
                        </p>
                      </div>
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <p className="mt-2 sm:mt-3 flex-grow text-gray-600 dark:text-gray-300 line-clamp-3 sm:line-clamp-4 text-xs sm:text-sm">
                  {testimonial.comment.slice(0, 150)}...
                </p>

                <div className="mt-2 sm:mt-3 flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-0.5 sm:gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <svg
                        key={i}
                        className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-blue-500 whitespace-nowrap">
                    <svg
                      className="w-3 h-3 mr-1 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm1.25 17.5v-4.75h-2.5v4.75h-3.75l5-5 5 5h-3.75zm0-11v4.75h2.5V6.5h3.75l-5-5-5 5h3.75z" />
                    </svg>
                    <span className="hidden sm:inline">See on</span> Telegram
                  </div>
                </div>
              </motion.div>
            </a>
          </motion.div>
        ))}
      </div>

      {testimonials.length > initialCount && (
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-8 flex flex-col items-center justify-center focus:outline-none group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
            {isExpanded ? "Show Less" : "Show More"}
          </span>
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-md group-hover:shadow-lg transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-5 h-5 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </motion.button>
      )}
    </div>
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
                  Expert advice on building Ivy-level extracurriculars and
                  honors by Azizbek (Harvard class of 2029)
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
                  y: [0, -8, 0, -8, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.15,
                  rotate: [0, 5, -5, 5, 0],
                  transition: { duration: 0.3 },
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
                  Consultations are for high school and gap year students who
                  are planning to apply to TOP US universities. Meetings are
                  aimed at advising the students on how to prepare their
                  portfolio to a top-notch level.
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
                        description:
                          "Holds valuable expertise in building and scaling projects, activities, and honors that stand out in college applications",
                      },
                      {
                        title: "Leadership Experience",
                        description:
                          "Manager of 'Ibrat Debate' - Uzbekistan's biggest debate network, leading 100+ volunteers and engaging 2000+ youth in nearly 100 debates across 14 regions",
                      },
                      {
                        title: "Project Management",
                        description:
                          "Worked in Executive Management positions at Swap Up, TEDxFerPSYouth, Young Writers Society, and many other successful projects",
                      },
                      {
                        title: "Research & Internships",
                        description:
                          "Conducted academic research and landed internships at government and non-government agencies, building a comprehensive portfolio",
                      },
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
                            transition: { duration: 0.4 },
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
                      description:
                        "Fill out a detailed form covering your current activities, achievements, and future aspirations to help us understand your profile better",
                    },
                    {
                      icon: "/idea-lamp.webp",
                      title: "Personalized Review",
                      description:
                        "Azizbek thoroughly analyzes your sheet and prepares tailored suggestions to maximize the impact of your portfolio",
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
                          transition: { duration: 0.4 },
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
                                transition: { duration: 0.4 },
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
                      description:
                        "In-depth analysis of your current activities with specific recommendations for improvements and additions to strengthen your profile",
                    },
                    {
                      icon: "/qa.webp",
                      title: "Interactive Q&A",
                      description:
                        "Comprehensive discussion addressing all your questions about portfolio development, extracurriculars, and application strategy",
                    },
                    {
                      icon: "/todo.webp",
                      title: "Action Plan Creation",
                      description:
                        "Collaborate with Azizbek to develop a detailed roadmap of actionable steps to enhance your portfolio based on the consultation",
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
                          transition: { duration: 0.4 },
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
                                transition: { duration: 0.4 },
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
                  <FadeInWhenVisible delay={0.1} variant="fade">
                    <motion.div
                      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/90 via-white/95 to-white/90 dark:from-gray-800/90 dark:via-gray-800/95 dark:to-gray-800/90 p-10 sm:p-12 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-500 shadow-lg hover:shadow-xl"
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.4 },
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
                              transition: { duration: 0.4 },
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
                              Get exclusive access to the "Parvoz Student" group
                              where:
                            </p>
                            <ul className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 space-y-3 max-w-2xl mx-auto">
                              <li className="flex items-center justify-center gap-2">
                                <span className="text-blue-500 dark:text-blue-400">
                                  •
                                </span>
                                Azizbek provides ongoing support and answers
                                your questions
                              </li>
                              <li className="flex items-center justify-center gap-2">
                                <span className="text-blue-500 dark:text-blue-400">
                                  •
                                </span>
                                New opportunities to enhance your portfolio are
                                regularly shared
                              </li>
                              <li className="flex items-center justify-center gap-2">
                                <span className="text-blue-500 dark:text-blue-400">
                                  •
                                </span>
                                Connect with like-minded students on similar
                                journeys
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

            {/* What students say section */}
            <FadeInWhenVisible variant="scale">
              <div className="flex flex-col w-full mt-16 sm:mt-24 lg:mt-32">
                <h2
                  className={title({
                    color: "violet",
                    className:
                      "text-center text-3xl sm:text-4xl lg:text-5xl mb-6 sm:mb-12 lg:mb-16 font-medium tracking-tight bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 dark:from-blue-400 dark:via-violet-400 dark:to-pink-400 bg-clip-text text-transparent",
                  })}
                >
                  What students say
                </h2>

                <div className="px-2 sm:px-4 w-full">
                  <TestimonialSection testimonials={testimonialData} />
                </div>
              </div>
            </FadeInWhenVisible>

            {/* Wanna join? section - Updated with new pricing */}
            <FadeInWhenVisible>
              <div className="flex flex-col w-full mt-16 sm:mt-24 lg:mt-32">
                <h2
                  className={title({
                    color: "blue",
                    className:
                      "text-center text-4xl sm:text-5xl lg:text-6xl mb-16 sm:mb-24 font-medium tracking-tight letter-spacing-[-0.02em] relative",
                  })}
                >
                  Wanna join?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 w-full">
                  {[
                    {
                      icon: "/lighting.png",
                      title: "a 50-minute consultation",
                      description:
                        "One-on-one session with personalized guidance",
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
                          transition: { duration: 0.4 },
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
                                y: [0, -4, 2, -4, 0],
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
                      There are only 3-5 spots for consultations each weekend.
                      Thus, hurry up to reserve your spot
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
                          window.plausible("Reserve Spot Click", {
                            props: {
                              location: "Consultation Page",
                              destination: "Final Note section - Google Form",
                            },
                          });
                        }
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/0 to-white/20"
                        animate={{
                          x: ["-200%", "200%"],
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

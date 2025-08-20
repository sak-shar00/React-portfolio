import { ReactLenis } from "lenis/react";
import { useTransform, motion, useScroll } from "framer-motion";
import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const projects = [
  {
    title: "CodeToCuisine 🍴",
    description:
      "QR-code based digital menu system with customizable filters and notifications. Built with PHP, MySQL, HTML, CSS, and JS.",
    src: "https://cms.menutiger.com/wp-content/uploads/2023/04/How-to-Create-QR-Code-for-Food-Menu-copy-1024x522.jpg",
    link: "https://cms.menutiger.com/wp-content/uploads/2023/04/How-to-Create-QR-Code-for-Food-Menu-copy-1024x522.jpg",
    color: "#ff7f50",
    githubLink: "https://github.com/RachitRawat09/Minnor_Project-",
    liveLink: "https://lnkd.in/gKMFKfxZ",
  },
  {
    title: "GreenCart 🛒",
    description:
      "An online grocery shopping platform with user authentication, cart management, and real-time product updates. Built with MERN stack (MongoDB, Express, React, Node.js).",
    src: "https://www.shutterstock.com/image-photo/woman-pushing-shopping-cart-full-260nw-2400207181.jpg",
    link: "https://www.shutterstock.com/image-photo/woman-pushing-shopping-cart-full-260nw-2400207181.jpg",
    color: "#32cd32",
    githubLink: "https://github.com/sak-shar00/Green-Cart",
    liveLink: "https://green-cart-frontend-0p3u.onrender.com/",
  },
  {
    title: "Portfolio 🌟",
    description:
      "A sleek portfolio built with React and Tailwind CSS to showcase skills, projects, and experience in a modern design.",
    src: "https://i.postimg.cc/J75CKyrs/Annotation-2025-04-01-203959.png",
    link: "https://i.postimg.cc/J75CKyrs/Annotation-2025-04-01-203959.png",
    color: "#8f89ff",
    githubLink: "https://github.com/seraprogrammer/portfolio",
    liveLink: "https://codervai.vercel.app",
  },
  {
    title: "Gemini Clone 🤖",
    description:
      "An AI chatbot platform clone built with React. Features include interactive chat, real-time responses, and sleek UI design.",
    src: "https://external-preview.redd.it/i-created-google-gemini-clone-using-react-v0-bGdqZW41djllYWVkMZ-1hQ5SM3B2IS1s16LCdDpldIneC4iVFyhsO-s4Fwn.png?width=1080&crop=smart&format=pjpg&auto=webp&s=2d58919eb7ac75de62855e465fc19a5f9c471dde",
    link: "https://external-preview.redd.it/i-created-google-gemini-clone-using-react-v0-bGdqZW41djllYWVkMZ-1hQ5SM3B2IS1s16LCdDpldIneC4iVFyhsO-s4Fwn.png?width=1080&crop=smart&format=pjpg&auto=webp&s=2d58919eb7ac75de62855e465fc19a5f9c471dde",
    color: "#4cafef",
    githubLink: "https://github.com/sak-shar00/Gemini-Clone",
    liveLink: "#",
  },
  {
    title: "Todo App ✅",
    description:
      "A full-stack MERN Todo application with user authentication, CRUD operations, and real-time updates.",
    src: "https://media.geeksforgeeks.org/wp-content/uploads/20250121172354286891/Screenshot-2025-01-21-172254.png",
    link: "https://media.geeksforgeeks.org/wp-content/uploads/20250121172354286891/Screenshot-2025-01-21-172254.png",
    color: "#34c759",
    githubLink: "https://github.com/sak-shar00/todo-frontend",
    liveLink: "#",
  },
];

export default function Projects() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @media screen and (width: 1366px) and (height: 768px),
             screen and (width: 1367px) and (height: 768px),
             screen and (width: 1368px) and (height: 769px) {
        .project-card {
          scale: 0.85;
          margin-top: -5vh;
        }
        .project-container {
          height: 90vh;
        }
      }
    `;
    document.head.appendChild(style);

    const checkResolution = () => {
      const isTargetResolution =
        window.innerWidth >= 1360 &&
        window.innerWidth <= 1370 &&
        window.innerHeight >= 760 &&
        window.innerHeight <= 775;

      if (isTargetResolution) {
        document.documentElement.style.setProperty("--project-scale", "0.85");
        document.documentElement.style.setProperty("--project-margin", "-5vh");
      } else {
        document.documentElement.style.setProperty("--project-scale", "1");
        document.documentElement.style.setProperty("--project-margin", "0");
      }
    };

    checkResolution();
    window.addEventListener("resize", checkResolution);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener("resize", checkResolution);
    };
  }, []);

  return (
    <ReactLenis root>
      <main className="bg-black" ref={container}>
        <section className="text-white w-full bg-slate-950">
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                url={project.src}  // ✅ fixed
                title={project.title}
                color={project.color}
                description={project.description}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
                githubLink={project.githubLink}
                liveLink={project.liveLink}
              />
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
}

function Card({
  i,
  title,
  description,
  url,
  color,
  progress,
  range,
  targetScale,
  githubLink,
  liveLink,
}) {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0 project-container"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
          transform: `scale(var(--project-scale, 1))`,
          marginTop: "var(--project-margin, 0)",
        }}
        className="relative -top-[25%] h-auto w-[90%] md:w-[85%] lg:w-[75%] xl:w-[65%] origin-top project-card"
        whileHover={{
          y: -8,
          transition: { duration: 0.3 },
        }}
      >
        <div className="w-full flex flex-col md:flex-row bg-zinc-900 rounded-2xl overflow-hidden shadow-xl">
          <div className="w-full md:w-[55%] h-[250px] md:h-[400px] lg:h-[450px] relative overflow-hidden">
            <motion.img
              src={url}
              alt={title}
              className="w-full h-full object-cover"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: color, mixBlendMode: "overlay" }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-black/50 backdrop-blur-md text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
              Project {i + 1}
            </div>
          </div>

          <div className="w-full md:w-[45%] p-6 md:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div
                  className="w-2 h-2 md:w-3 md:h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <div className="h-[1px] w-12 md:w-20 bg-gray-600" />
              </div>

              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-4">
                {title}
              </h2>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed line-clamp-3 md:line-clamp-none max-w-md">
                {description}
              </p>
            </div>

            <div className="mt-4 md:mt-auto pt-4">
              <div className="w-full h-[1px] bg-gray-800 mb-4 md:mb-6" />
              <div className="flex items-center gap-4">
                <motion.a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="text-xs md:text-sm font-medium" style={{ color }}>
                    Code
                  </span>
                </motion.a>

                <motion.a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="text-xs md:text-sm font-medium" style={{ color }}>
                    Live
                  </span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

Card.propTypes = {
  i: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  progress: PropTypes.object.isRequired,
  range: PropTypes.array.isRequired,
  targetScale: PropTypes.number.isRequired,
  githubLink: PropTypes.string.isRequired,
  liveLink: PropTypes.string.isRequired,
};

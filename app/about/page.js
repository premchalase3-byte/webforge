import {
  User,
  Target,
  Eye,
  Rocket,
  Code2,
  Cpu,
  ShieldCheck,
  Phone,
  Github,
  Globe,
} from "lucide-react";

export default function AboutPage() {
  const techStack = [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Convex",
    "Clerk Authentication",
    "Groq AI",
    "Sandpack",
    "JavaScript",
    "Git & GitHub",
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white relative overflow-hidden">

      {/* Background */}

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:22px_22px]" />

      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[1000px] h-[500px] bg-cyan-500/20 blur-[170px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-24">

        {/* Hero */}

        <div className="text-center">

          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500/10 border border-cyan-400/20 backdrop-blur-xl">

            <User className="text-cyan-400 h-5 w-5" />

            <span className="text-cyan-300 font-semibold">
              About Me
            </span>

          </div>

          <h1 className="mt-8 text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">

            Passionate AI Developer.
            <br />
            Building Intelligent Solutions.

          </h1>

          <p className="mt-8 text-xl text-gray-300 max-w-4xl mx-auto leading-9">

            Hello! I'm <span className="text-cyan-400 font-semibold">Prem Chalase</span>,
            a passionate Full Stack Developer with a strong interest in
            Artificial Intelligence, Web Development, and modern software
            engineering. I enjoy creating innovative applications that solve
            real-world problems using the latest technologies.

          </p>

        </div>

        {/* Mission & Vision */}

        <div className="grid lg:grid-cols-2 gap-8 mt-24">

          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10">

            <Target className="text-cyan-400 h-10 w-10 mb-6" />

            <h2 className="text-3xl font-bold mb-5">
              My Mission
            </h2>

            <p className="text-gray-300 leading-8">

              My mission is to leverage Artificial Intelligence to simplify
              software development and build tools that enable users to create
              high-quality applications faster and more efficiently.

            </p>

          </div>

          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10">

            <Eye className="text-blue-400 h-10 w-10 mb-6" />

            <h2 className="text-3xl font-bold mb-5">
              My Vision
            </h2>

            <p className="text-gray-300 leading-8">

              I aspire to become a skilled AI and Full Stack Developer,
              building impactful software solutions that combine innovation,
              automation, and excellent user experiences.

            </p>

          </div>

        </div>

        {/* Journey */}

        <div className="mt-24 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10">

          <Rocket className="text-purple-400 h-10 w-10 mb-6" />

          <h2 className="text-4xl font-bold mb-6">
            My Journey
          </h2>

          <p className="text-gray-300 leading-9 text-lg">

            WebForge was developed as my major academic project to explore the
            capabilities of Generative AI in website development. I independently
            designed and implemented the application's architecture, integrated
            AI models using the Groq API, developed secure authentication with
            Clerk, connected the Convex database, implemented Screenshot-to-Code,
            Prompt Enhancement, Live Preview using Sandpack, multi-page website
            generation, responsive UI, and project download functionality.

            This project reflects my passion for AI-powered software development
            and my commitment to learning modern technologies.

          </p>

        </div>

        {/* Developer */}

        <div className="mt-24">

          <div className="text-center mb-12">

            <h2 className="text-5xl font-bold">
              Developer
            </h2>

          </div>

          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-3xl border border-white/10 rounded-3xl p-10">

            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-4xl font-bold mb-6">
              P
            </div>

            <h3 className="text-4xl font-bold">
              Prem Chalase
            </h3>

            <span className="inline-block mt-4 px-5 py-2 rounded-full bg-cyan-500/20 text-cyan-300">
              Full Stack AI Developer
            </span>

            <p className="mt-8 text-gray-300 leading-8 text-lg">

              I designed and developed WebForge from end to end, including
              frontend development, backend integration, AI-powered code
              generation, authentication, database management, prompt
              enhancement, screenshot analysis, responsive design, live code
              preview, and deployment.

            </p>

          </div>

        </div>
        {/* Contact */}

        <div className="mt-24 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-10">

          <h2 className="text-4xl font-bold mb-10 text-center">
            Contact Information
          </h2>

          <div className="space-y-8">

            <div className="flex items-center gap-4">

              <div className="p-3 rounded-xl bg-cyan-500/10">
                <Phone className="text-cyan-400 h-6 w-6" />
              </div>

              <div>
                <p className="text-cyan-400 font-semibold">
                  Contact Number
                </p>

                <p className="text-gray-300 text-lg">
                  7760973219
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="p-3 rounded-xl bg-cyan-500/10">
                <Github className="text-cyan-400 h-6 w-6" />
              </div>

              <div>

                <p className="text-cyan-400 font-semibold">
                  GitHub
                </p>

                <a
                  href="https://github.com/premchalase3-byte"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-cyan-300 transition"
                >
                  github.com/premchalase3-byte
                </a>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="p-3 rounded-xl bg-cyan-500/10">
                <Globe className="text-cyan-400 h-6 w-6" />
              </div>

              <div>

                <p className="text-cyan-400 font-semibold">
                  Portfolio
                </p>

                <a
                  href="https://prems-portfolio-eight.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-cyan-300 transition"
                >
                  prems-portfolio-eight.vercel.app
                </a>

              </div>

            </div>

          </div>

        </div>

        {/* Technologies */}

        <div className="mt-24">

          <div className="flex items-center justify-center gap-3 mb-12">

            <Cpu className="text-cyan-400 h-9 w-9" />

            <h2 className="text-5xl font-bold">
              Technologies I Used
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {techStack.map((tech, index) => (

              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl py-6 text-center text-lg font-semibold hover:border-cyan-400/30 transition"
              >

                <Code2 className="mx-auto mb-3 text-cyan-400" />

                {tech}

              </div>

            ))}

          </div>

        </div>

        {/* Footer */}

        <div className="mt-24 text-center">

          <ShieldCheck className="mx-auto h-12 w-12 text-cyan-400 mb-5" />

          <h2 className="text-4xl font-bold">
            Thank You for Visiting
          </h2>

          <p className="mt-6 text-gray-400 max-w-3xl mx-auto text-lg leading-8">

            Thank you for taking the time to learn about me and my project.
            WebForge represents my passion for Artificial Intelligence,
            Full Stack Development, and creating innovative software
            solutions. I look forward to building even more impactful
            applications in the future.

          </p>

        </div>

      </div>

    </div>
  );
}
import {
  Users,
  Target,
  Eye,
  Rocket,
  GraduationCap,
  Code2,
  Cpu,
  ShieldCheck,
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

            <Users className="text-cyan-400 h-5 w-5" />

            <span className="text-cyan-300 font-semibold">

              About Us

            </span>

          </div>

          <h1 className="mt-8 text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">

            Passionate Developers.
            <br />
            Intelligent Solutions.

          </h1>

          <p className="mt-8 text-xl text-gray-300 max-w-4xl mx-auto leading-9">

            We are passionate software developers dedicated to building
            innovative AI-powered applications that simplify website
            development. WebForge was created as an intelligent platform
            capable of transforming simple ideas and screenshots into
            complete, responsive web applications within seconds.

          </p>

        </div>

        {/* Mission & Vision */}

        <div className="grid lg:grid-cols-2 gap-8 mt-24">

          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10">

            <Target className="text-cyan-400 h-10 w-10 mb-6" />

            <h2 className="text-3xl font-bold mb-5">

              Our Mission

            </h2>

            <p className="text-gray-300 leading-8">

              Our mission is to make website development accessible,
              faster and more efficient using Artificial Intelligence.
              We aim to reduce development time while maintaining
              high-quality modern web experiences.

            </p>

          </div>

          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10">

            <Eye className="text-blue-400 h-10 w-10 mb-6" />

            <h2 className="text-3xl font-bold mb-5">

              Our Vision

            </h2>

            <p className="text-gray-300 leading-8">

              To become a next-generation AI development platform where
              anyone can build beautiful, responsive and production-ready
              websites without requiring advanced programming knowledge.

            </p>

          </div>

        </div>

        {/* Journey */}

        <div className="mt-24 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10">

          <Rocket className="text-purple-400 h-10 w-10 mb-6" />

          <h2 className="text-4xl font-bold mb-6">

            Our Journey

          </h2>

          <p className="text-gray-300 leading-9 text-lg">

            WebForge started as an academic project with the objective of
            exploring Generative AI in modern web development.
            Throughout development, several advanced features were
            implemented including AI Website Generation, Screenshot-to-Code,
            Prompt Enhancement, Live Preview, Authentication, and Project
            Download capabilities.

            The project continuously evolves as new AI technologies become
            available.

          </p>

        </div>

        {/* Developer */}

        <div className="mt-24 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-3xl border border-white/10 rounded-3xl p-10">

          <GraduationCap className="text-cyan-400 h-10 w-10 mb-6" />

          <h2 className="text-4xl font-bold mb-4">

            Developed By

          </h2>

          <h3 className="text-2xl font-semibold text-cyan-300">

            Prem

          </h3>

          <p className="mt-4 text-gray-300 leading-8">

            Student Developer passionate about Artificial Intelligence,
            Full Stack Web Development and modern UI/UX design.
            WebForge reflects the combination of AI technologies and
            modern frontend engineering to create intelligent software
            solutions.

          </p>

        </div>
        {/* Team */}

<div className="mt-24">

  <div className="text-center mb-12">

    <h2 className="text-5xl font-bold">
      Meet Our Team
    </h2>

    <p className="text-gray-400 mt-4 text-lg">
      The minds behind WebForge
    </p>

  </div>

  <div className="grid lg:grid-cols-2 gap-8">

    {/* Prem */}

    <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-3xl border border-white/10 rounded-3xl p-10">

      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-3xl font-bold mb-6">
        P
      </div>

      <h3 className="text-3xl font-bold">
        Prem Chalase
      </h3>

      <span className="inline-block mt-3 px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300">
        Major Developer • AI & Full Stack
      </span>

      <p className="mt-6 text-gray-300 leading-8">
        Responsible for the overall architecture, AI integration,
        backend development, authentication, Convex database,
        Groq integration, screenshot-to-code pipeline,
        prompt enhancement, multi-page generation,
        live preview system and deployment.
      </p>

    </div>

    {/* Nagalaxmi */}

    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-3xl border border-white/10 rounded-3xl p-10">

      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center text-3xl font-bold mb-6">
        N
      </div>

      <h3 className="text-3xl font-bold">
        Nagalaxmi Katta
      </h3>

      <span className="inline-block mt-3 px-4 py-2 rounded-full bg-purple-500/20 text-purple-300">
        UI  Developer
      </span>

      <p className="mt-6 text-gray-300 leading-8">
        Responsible for designing intuitive user interfaces,
        improving user experience, implementing modern layouts,
        glassmorphism-inspired styling, responsive design,
        and ensuring a visually appealing experience
        throughout the application.
      </p>

    </div>

  </div>

</div>

{/* Contact */}

<div className="mt-24 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-10">

  <h2 className="text-4xl font-bold mb-8 text-center">
    Contact Information
  </h2>

  <div className="space-y-5 text-lg">

    <div>
      <span className="font-semibold text-cyan-400">
        Contact Number:
      </span>
      <p className="text-gray-300">
        7760973219
      </p>
    </div>

    <div>
      <span className="font-semibold text-cyan-400">
        GitHub:
      </span>
      <a
        href="https://github.com/premchalase3-byte"
        target="_blank"
        rel="noopener noreferrer"
        className="block text-blue-400 hover:text-cyan-300 transition"
      >
        github.com/premchalase3-byte
      </a>
    </div>

    <div>
      <span className="font-semibold text-cyan-400">
        Portfolio:
      </span>
      <a
        href="https://prems-portfolio-eight.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="block text-blue-400 hover:text-cyan-300 transition"
      >
        prems-portfolio-eight.vercel.app
      </a>
    </div>

  </div>

</div>
        {/* Technology */}

        <div className="mt-24">

          <div className="flex items-center justify-center gap-3 mb-12">

            <Cpu className="text-cyan-400 h-9 w-9" />

            <h2 className="text-5xl font-bold">

              Technologies We Use

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

          <p className="mt-6 text-gray-400 max-w-3xl mx-auto text-lg">

            We believe Artificial Intelligence is transforming software
            development, and WebForge is our contribution towards that
            future. Thank you for exploring our project.

          </p>

        </div>

      </div>

    </div>
  );
}
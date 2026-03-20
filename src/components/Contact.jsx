import React, { useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Send,
  Twitter,
} from "lucide-react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:gabokekeemmanuel@gmail.com?subject=${encodeURIComponent(
      formData.subject || "Contact from Portfolio"
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "gabokekeemmanuel@gmail.com",
      href: "mailto:gabokekeemmanuel@gmail.com",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "emmanuel-gabokeke",
      href: "https://www.linkedin.com/in/emmanuel-gabokeke",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "codesbycj",
      href: "https://github.com/codesbycj",
    },
    {
      icon: Twitter,
      label: "Twitter / X",
      value: "@codesbycj",
      href: "https://x.com/codesbycj",
    },
  ];

  return (
    <section id="contact" className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-20">
          <p className="text-[#FFFFF] font-semibold text-sm sm:text-base mb-2 sm:mb-3">
            CONTACT
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            Let's Build Together
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? I'd love to hear
            from you. Fill out the form below or reach out through any of my
            socials.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-16">
          {/* Contact Info - Left Side */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                Contact Info
              </h2>
              <div className="space-y-4 sm:space-y-5">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-gray-800 hover:border-gray-600 hover:bg-gray-800/50 transition-all group"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-gray-700 transition-colors">
                      <info.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-gray-500">
                        {info.label}
                      </p>
                      <p className="font-medium text-sm sm:text-base truncate">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Badge */}
            <div className="p-4 sm:p-6 rounded-2xl border border-gray-800 bg-gray-900/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <p className="font-semibold text-sm sm:text-base">
                  Available for work
                </p>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm">
                I'm currently open to freelance projects, full-time
                opportunities, and collaborations. Let's create something
                impactful together.
              </p>
            </div>
          </div>

          {/* Contact Form - Right Side */}
          <div className="lg:col-span-3">
            <div className="p-5 sm:p-8 lg:p-10 rounded-2xl border border-gray-800 bg-gray-900/30">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5 sm:mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#A374FF] focus:ring-1 focus:ring-[#A374FF] transition-colors text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5 sm:mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#A374FF] focus:ring-1 focus:ring-[#A374FF] transition-colors text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5 sm:mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Project Inquiry"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#A374FF] focus:ring-1 focus:ring-[#A374FF] transition-colors text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5 sm:mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#A374FF] focus:ring-1 focus:ring-[#A374FF] transition-colors resize-none text-sm sm:text-base"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 bg-white text-black px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base hover:bg-gray-200 transition-colors"
                >
                  {submitted ? (
                    "Opening Mail Client..."
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import { useState } from "react";
import { Fade, Slide, Zoom } from "react-awesome-reveal"; // Import animation components
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  Route,
  BrowserRouter as Router,
  Link as RouterLink,
  Routes,
} from "react-router-dom";
import { Link as ScrollLink } from "react-scroll"; // Import ScrollLink and scroller
import Dashboard from "./assets/Dashboard.png";
import Report from "./assets/Report.png";
import Ticket from "./assets/Ticket.png";
import Tickets from "./assets/Tickets.png";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">
        <Header />
        <main className="">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <HowItWorks />
                </>
              }
            />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function Header() {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 animate-fade-in-down">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <RouterLink
          to="/"
          className="text-3xl font-bold text-indigo-800 tracking-tight transform hover:scale-105 transition duration-300 ease-in-out"
        >
          ITR Desk
        </RouterLink>
        <nav className="space-x-6 text-sm font-medium">
          <RouterLink
            to="/"
            className="hover:text-indigo-600 transition duration-200"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/features"
            className="hover:text-indigo-600 transition duration-200"
          >
            Features
          </RouterLink>
          <RouterLink
            to="/pricing"
            className="hover:text-indigo-600 transition duration-200"
          >
            Pricing
          </RouterLink>
          <RouterLink
            to="/about"
            className="hover:text-indigo-600 transition duration-200"
          >
            About
          </RouterLink>
          <RouterLink
            to="/contact"
            className="hover:text-indigo-600 transition duration-200"
          >
            Contact
          </RouterLink>
          <a
            href="https://desk.itradiant.in/"
            className="text-indigo-600 font-semibold hover:text-indigo-800 transition duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            Login
          </a>
          <a
            href="https://desk.itradiant.in/"
            className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white px-5 py-2.5 rounded-full shadow-lg hover:from-indigo-600 hover:to-indigo-800 transition duration-300 transform hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sign Up
          </a>
        </nav>
      </div>
    </header>
  );
}

function Home() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>{" "}
      {/* Subtle background pattern */}
      <div className="max-w-6xl mx-auto text-center space-y-12 relative z-10">
        <Fade triggerOnce direction="down">
          <div className="space-y-6">
            <h1 className="text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Simplify Customer Support <br />{" "}
              <span className="text-indigo-600">Like Never Before</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              ITR Desk helps you manage customer issues with ease. Stay
              organized, collaborate better, and resolve tickets faster — all
              from one clean interface.
            </p>
            <div className="space-x-4">
              <a
                href="https://desk.itradiant.in/"
                className="inline-block bg-indigo-600 text-white px-10 py-5 rounded-full text-lg font-semibold shadow-xl hover:bg-indigo-700 transition duration-300 transform hover:-translate-y-1 hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started Free
              </a>
              <ScrollLink
                to="features-section" // Target the Features section
                smooth={true}
                duration={500}
                className="text-indigo-600 text-lg font-semibold underline hover:text-indigo-800 transition duration-200 cursor-pointer"
              >
                See Features
              </ScrollLink>
            </div>
          </div>
        </Fade>

        <Zoom triggerOnce delay={200}>
          <Carousel
            showThumbs={false}
            autoPlay
            infiniteLoop
            showStatus={false}
            showIndicators={true}
            interval={3000}
            className="rounded-2xl overflow-hidden max-w-4xl mx-auto shadow-2xl border-4 border-indigo-100"
          >
            <div>
              <img
                src={Dashboard}
                alt="Dashboard View"
                className="rounded-xl"
              />
              <p className="legend">Intuitive Dashboard</p>
            </div>
            <div>
              <img src={Tickets} alt="Tickets View" className="rounded-xl" />
              <p className="legend">Effortless Ticket Management</p>
            </div>
            <div>
              <img src={Ticket} alt="Ticket Details" className="rounded-xl" />
              <p className="legend">Detailed Ticket Views</p>
            </div>
            <div>
              <img src={Report} alt="Report View" className="rounded-xl" />
              <p className="legend">Comprehensive Reporting</p>
            </div>
          </Carousel>
        </Zoom>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, i) => (
            <Slide
              triggerOnce
              direction={i % 2 === 0 ? "left" : "right"}
              delay={i * 100}
              key={i}
            >
              <div className="bg-white shadow-xl rounded-2xl p-8 text-left border border-gray-100 hover:shadow-2xl hover:border-indigo-200 transition duration-300 transform hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-indigo-700 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Slide>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section
      id="features-section"
      className="max-w-5xl mx-auto space-y-16 py-16"
    >
      <Fade triggerOnce direction="down">
        <h2 className="text-5xl font-extrabold text-gray-900 text-center">
          Comprehensive <span className="text-indigo-600">Features</span>
        </h2>
      </Fade>
      {fullFeatures.map((feature, i) => (
        <Slide
          triggerOnce
          direction={i % 2 === 0 ? "right" : "left"}
          delay={i * 50}
          key={i}
        >
          <div
            key={i}
            className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:border-indigo-200 transition duration-300 transform hover:scale-[1.01]"
          >
            <h3 className="text-3xl font-bold text-indigo-700 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-700 mt-2 text-lg leading-relaxed">
              {feature.description}
            </p>
          </div>
        </Slide>
      ))}
    </section>
  );
}

function Pricing() {
  return (
    <section className="max-w-6xl mx-auto space-y-16 py-16">
      <Fade triggerOnce direction="down">
        <h2 className="text-5xl font-extrabold text-center text-gray-900">
          Choose a Plan{" "}
          <span className="text-indigo-600">That Works for You</span>
        </h2>
      </Fade>
      <div className="grid md:grid-cols-3 gap-10">
        {plans.map((plan, i) => (
          <Zoom triggerOnce delay={i * 150} key={i}>
            <div className="bg-white p-10 shadow-2xl rounded-3xl text-center border-4 border-transparent hover:border-indigo-400 transition duration-300 transform hover:-translate-y-2 relative overflow-hidden group">
              {plan.name === "Pro" && (
                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold uppercase py-1 px-3 rounded-bl-lg">
                  Popular
                </div>
              )}
              <h3 className="text-3xl font-bold text-indigo-800 mb-4">
                {plan.name}
              </h3>
              <p className="text-4xl mt-3 font-extrabold text-gray-900">
                {plan.price}
              </p>
              <ul className="text-left mt-8 space-y-4">
                {plan.features.map((f, idx) => (
                  <li
                    key={idx}
                    className="text-gray-700 text-lg flex items-center"
                  >
                    <svg
                      className="w-6 h-6 text-green-500 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://desk.itradiant.in/"
                className="inline-block mt-10 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:from-indigo-700 hover:to-indigo-900 transition duration-300 transform hover:scale-105 group-hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
              >
                {plan.name === "Enterprise" ? "Contact Us" : "Start Free Trial"}
              </a>
            </div>
          </Zoom>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="max-w-4xl mx-auto space-y-10 text-center py-20 px-4">
      <Fade triggerOnce direction="down">
        <h2 className="text-5xl font-extrabold text-gray-900">
          About <span className="text-indigo-600">ITR Desk</span>
        </h2>
      </Fade>

      <Slide triggerOnce direction="up" delay={100}>
        <p className="text-gray-700 text-xl leading-relaxed">
          ITR Desk is on a mission to redefine how internal ticketing and
          support systems work — with speed, simplicity, and scalability at its
          core. Our platform is designed to help organizations streamline issue
          reporting, assignment, and resolution without the complexity of
          traditional ITSM tools.
        </p>
      </Slide>

      <Slide triggerOnce direction="up" delay={200}>
        <p className="text-gray-700 text-xl leading-relaxed">
          Since our founding in 2025, we've focused on building a tool that's
          not only intuitive for users but also powerful enough to support large
          teams and complex workflows. Whether it's creating workspaces,
          managing departments, or automating SLAs — ITR Desk keeps everything
          organized and actionable.
        </p>
      </Slide>

      <Slide triggerOnce direction="up" delay={300}>
        <p className="text-gray-700 text-xl leading-relaxed">
          From support teams and HR departments to admin staff and service
          providers, we serve a diverse set of industries looking to move away
          from scattered email threads and toward centralized, trackable
          support. Our platform supports ticket lifecycles, role-based
          assignments, real-time notifications, email-to-ticket conversion, and
          insightful analytics.
        </p>
      </Slide>

      <Slide triggerOnce direction="up" delay={400}>
        <p className="text-gray-700 text-xl leading-relaxed">
          We're a passionate team of developers and designers committed to
          solving real-world problems with clean UX, scalable architecture, and
          thoughtful automation. At ITR Desk, we believe good support starts
          with the right tools — and we're here to build them.
        </p>
      </Slide>
    </section>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="max-w-2xl mx-auto space-y-10 py-16">
      <Fade triggerOnce direction="down">
        <h2 className="text-5xl font-extrabold text-center text-gray-900">
          Get in <span className="text-indigo-600">Touch</span>
        </h2>
      </Fade>
      <Slide triggerOnce direction="up">
        <form
          className="space-y-7 bg-white p-10 rounded-2xl shadow-xl border border-gray-100"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
            // In a real application, you'd send this data to a backend
            setTimeout(() => setSubmitted(false), 3000); // Reset after 3 seconds
          }}
        >
          <input
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition duration-200 text-lg"
            placeholder="Your Name"
            required
          />
          <input
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition duration-200 text-lg"
            placeholder="Your Email"
            type="email"
            required
          />
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition duration-200 text-lg"
            placeholder="Your Message"
            rows={6}
            required
          ></textarea>
          <button className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:from-indigo-700 hover:to-indigo-900 transition duration-300 transform hover:scale-105">
            Send Message
          </button>
          {submitted && (
            <p className="text-green-600 font-semibold text-center mt-4 animate-fade-in">
              Message sent successfully! We'll get back to you shortly.
            </p>
          )}
        </form>
      </Slide>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="max-w-5xl mx-auto py-20 space-y-16 text-center">
      <Fade triggerOnce direction="down">
        <h2 className="text-5xl font-extrabold text-gray-900">
          How <span className="text-indigo-600">ITR Desk</span> Works
        </h2>
      </Fade>
      <Slide triggerOnce direction="up">
        <p className="text-gray-700 text-xl leading-relaxed max-w-3xl mx-auto">
          ITR Desk is designed to streamline support and task management across
          your organization. Here's how the platform works end-to-end:
        </p>
      </Slide>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
        {howItWorksSteps.map((step, i) => (
          <Fade triggerOnce delay={i * 100} key={i}>
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:border-indigo-200 transition duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center bg-indigo-100 rounded-full w-14 h-14 mb-4 text-indigo-700 font-bold text-2xl flex-shrink-0">
                {step.number}
              </div>
              <h3 className="text-2xl font-bold text-indigo-700 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 mt-2 text-base">{step.description}</p>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 mt-20 py-12 text-center text-sm text-gray-400">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-white text-lg font-semibold">
          &copy; 2025 ITR Desk. All rights reserved.
        </p>
        <div className="mt-6 space-x-6">
          <RouterLink
            to="/privacy"
            className="hover:underline text-gray-300 transition duration-200"
          >
            Privacy Policy
          </RouterLink>
          <RouterLink
            to="/terms"
            className="hover:underline text-gray-300 transition duration-200"
          >
            Terms of Service
          </RouterLink>
          <a
            href="mailto:support@yourdomain.com"
            className="hover:underline text-gray-300 transition duration-200"
          >
            support@yourdomain.com
          </a>
        </div>
        <div className="mt-8 flex justify-center space-x-6">
          {/* Social Media Icons (placeholders) */}
          <a
            href="#"
            className="text-gray-400 hover:text-white transition duration-200"
          >
            <svg
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition duration-200"
          >
            <svg
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition duration-200"
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition duration-200"
          >
            <svg
              fill="currentColor"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0"
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path
                stroke="none"
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
              ></path>
              <circle cx="4" cy="4" r="2" stroke="none"></circle>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

const features = [
  {
    title: "Create & Track Tickets",
    description:
      "Easily log and monitor issues in real time with comprehensive status updates and timelines.",
  },
  {
    title: "Assign to Team Members",
    description:
      "Delegate tickets to specific users, departments, or teams effortlessly, ensuring clear ownership.",
  },
  {
    title: "Status & Priority Management",
    description:
      "Track ticket progress with real-time status updates and dynamic priority settings to manage urgency.",
  },
];

const fullFeatures = [
  {
    title: "Ticket Lifecycle Management",
    description:
      "From creation to resolution, manage every stage of a ticket's journey, including assignment, escalation, and closure, with a full audit trail.",
  },
  {
    title: "Team Grouping & Role-Based Access",
    description:
      "Organize employees, managers, and clients into custom groups with granular role-based permissions, ensuring data security and proper access.",
  },
  {
    title: "SLA & Priority Rules Automation",
    description:
      "Define Service Level Agreement (SLA) response and resolution deadlines based on ticket type (incidents, service requests, issues), and automate escalations if deadlines are missed.",
  },
  {
    title: "Smart Email Integration",
    description:
      "Seamlessly convert incoming emails into actionable tickets, and configure intelligent routing rules to trigger department-wise notifications and assignments.",
  },
  {
    title: "Real-Time Alerts & Notifications",
    description:
      "Receive instant updates on all critical ticket actions, including status changes, assignments, escalations, and SLA breaches, via email or in-app notifications.",
  },
  {
    title: "Secure File Attachments & Media Support",
    description:
      "Allow users to upload and attach documents, screenshots, videos, or logs directly to tickets, providing crucial context for faster resolution.",
  },
  {
    title: "Customizable Fields & Workflows",
    description:
      "Tailor your ticketing system by adding dynamic custom fields to collect information specific to your unique processes and design custom workflows.",
  },
  {
    title: "Comprehensive Analytics Dashboard",
    description:
      "Gain deep insights into team performance, average ticket resolution time, SLA adherence, and identify key trends over time with an intuitive and powerful analytics dashboard.",
  },
];

const plans = [
  {
    name: "Free",
    price: "₹0/month",
    features: [
      "Up to 3 members",
      "Unlimited tickets",
      "Basic notifications",
      "Standard email support",
      "Community forum access",
    ],
  },
  {
    name: "Pro",
    price: "₹999/month",
    features: [
      "Up to 20 employees",
      "Advanced ticket assignment",
      "Full SLA & priority rules",
      "Email integration",
      "Real-time alerts",
      "File attachments",
      "Dedicated email support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom Pricing",
    features: [
      "Unlimited employees",
      "White-labeled platform",
      "Custom workflows & automations",
      "API access & integrations",
      "Single Sign-On (SSO)",
      "Premium 24/7 dedicated support",
      "On-premise deployment option",
    ],
  },
];

const howItWorksSteps = [
  {
    number: 1,
    title: "Create Workspaces",
    description:
      "Start by setting up isolated workspaces for your company, specific departments, or client accounts.",
  },
  {
    number: 2,
    title: "Add Projects & Teams",
    description:
      "Within each workspace, define projects and assign relevant employees, managers, and clients to them.",
  },
  {
    number: 3,
    title: "Effortless Ticket Submission",
    description:
      "Anyone with access can easily raise tickets by selecting the relevant project, department, and sub-department.",
  },
  {
    number: 4,
    title: "Automated Notifications & Routing",
    description:
      "Email notifications are automatically triggered and tickets are intelligently routed based on predefined department mappings.",
  },
  {
    number: 5,
    title: "Flexible Assignment Options",
    description:
      "Tickets can be assigned manually by managers, auto-assigned based on rules, or self-assigned by available employees.",
  },
  {
    number: 6,
    title: "Robust SLA Monitoring",
    description:
      "Service Level Agreement (SLA) rules are strictly enforced based on ticket type (Incident/Service) and automatically escalate if overdue.",
  },
  {
    number: 7,
    title: "Resolve & Analyze Performance",
    description:
      "Resolve tickets efficiently, maintain detailed activity logs, and use the powerful dashboard to analyze team performance and trends.",
  },
];

export default App;

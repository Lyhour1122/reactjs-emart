function Footer() {
  return (
    <footer className="bg-blue-600">
      <div className="container mx-auto px-5 py-4 flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4 text-white">
          <span className="text-xl font-bold">E-mart</span>
          <span className="text-sm opacity-80">
            © {new Date().getFullYear()} emart — @emart
          </span>
        </div>

        {/* Right side - Social icons */}
        <div className="flex items-center space-x-4 text-white">
          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-200 transition"
          >
            <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-200 transition"
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
            </svg>
          </a>

          {/* Email */}
          <a
            href="mailto:support@emart.com"
            className="hover:text-blue-200 transition"
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path d="M4 4h16v16H4z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

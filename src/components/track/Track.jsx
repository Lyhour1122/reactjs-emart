const FEATURES = [
  {
    title: "Premium T-Shirts",
    desc: "Our T-Shirts are 100% made of cotton.",
    icon: (
      <svg
        className="w-12 h-12"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-16.548 0C4.095 4.01 3.25 4.973 3.25 6.108v9.142A2.25 2.25 0 005.5 17.5h2.25m10.5 0h-10.5m10.5 0v3.375c0 .621-.504 1.125-1.125 1.125h-7.25c-.621 0-1.125-.504-1.125-1.125V17.5m10.5 0h-10.5"
        />
      </svg>
    ),
  },
  {
    title: "Fast Delivery",
    desc: "Quick shipping with real-time tracking.",
    icon: (
      <svg
        className="w-12 h-12"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 18.75a1.5 1.5 0 003 0m7.5 0a1.5 1.5 0 003 0M3 18.75V6.75A2.25 2.25 0 015.25 4.5h8.5A2.25 2.25 0 0116 6.75v12M16 9h3.19a2.25 2.25 0 011.99 1.2l1.32 2.64c.16.33.24.7.24 1.07v4.84"
        />
      </svg>
    ),
  },
  {
    title: "Easy Returns",
    desc: "Hassle-free returns within 7 days.",
    icon: (
      <svg
        className="w-12 h-12"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 9.75L19.5 12l-3 2.25M19.5 12H10.5m6-7.5H9A4.5 4.5 0 004.5 9v6A4.5 4.5 0 009 19.5h7.5"
        />
      </svg>
    ),
  },
];

const Track = () => {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {FEATURES.map((item) => (
          <div key={item.title} className="h-full">
            <div
              className="h-full rounded-xl border border-blue-200 bg-blue-50
                         px-5 py-6 text-center
                         shadow-[inset_0_0_2px_rgba(0,0,0,0.35)]
                         flex flex-col items-center justify-center"
            >
              <div className="text-blue-600 mb-3">{item.icon}</div>
              <h2 className="font-semibold text-lg text-gray-900">
                {item.title}
              </h2>
              <p className="text-sm text-gray-600 mt-1 max-w-[28ch]">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Track;

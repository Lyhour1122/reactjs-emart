const Track = () => {
  return (
    <section className="container mx-auto px-5 py-10 md:py-14">
      {/* main */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
        {/* Card 1 */}
        <div className="h-full">
          <div
            className="h-full border-2 border-blue-200 bg-blue-50
                          shadow-[inset_0_0_2px_rgba(0,0,0,0.6)]
                          px-4 py-6 rounded-lg
                          flex flex-col items-center justify-center"
          >
            <svg
              className="text-blue-600 w-12 h-12 mb-3"
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
            <h2 className="font-medium text-lg text-gray-900">
              Premium Tshirts
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Our T-Shirts are 100% made of cotton.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="h-full">
          <div
            className="h-full border-2 border-blue-200 bg-blue-50
                          shadow-[inset_0_0_2px_rgba(0,0,0,0.6)]
                          px-4 py-6 rounded-lg
                          flex flex-col items-center justify-center"
          >
            <svg
              className="text-blue-600 w-12 h-12 mb-3"
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
            <h2 className="font-medium text-lg text-gray-900">
              Premium Tshirts
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Our T-Shirts are 100% made of cotton.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="h-full">
          <div
            className="h-full border-2 border-blue-200 bg-blue-50
                          shadow-[inset_0_0_2px_rgba(0,0,0,0.6)]
                          px-4 py-6 rounded-lg
                          flex flex-col items-center justify-center"
          >
            <svg
              className="text-blue-600 w-12 h-12 mb-3"
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
            <h2 className="font-medium text-lg text-gray-900">
              Premium Tshirts
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Our T-Shirts are 100% made of cotton.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Track;

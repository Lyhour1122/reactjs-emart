function Testimonial() {
  return (
    <section className="text-gray-600 body-font bg-blue-50">
      <div className="container px-5 py-14 mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-blood text-blue-800">Testimonials</h1>
          <h2 className="text-center text-2xl font-bold mt-2">
            What our <span className="text-blue-600">Customer</span> are saying
          </h2>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap -m-4">
          {/* 1 */}
          <div className="p-4 md:w-1/3 w-full">
            <div className="h-full bg-white px-8 py-10 rounded-xl shadow-sm border border-blue-100 text-center hover:shadow-md transition">
              <img
                alt="testimonial"
                className="w-20 h-20 mb-6 object-cover object-center rounded-full inline-block border-2 border-blue-200"
                src="https://randomuser.me/api/portraits/men/32.jpg"
              />

              <p className="leading-relaxed text-gray-600">
                Edison bulb retro cloud bread echo park, helvetica stumptown
                taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee
                ennui shaman taiyaki vape DIY tote bag drinking vinegar.
              </p>

              {/* small line */}
              <span className="inline-block h-1 w-10 rounded bg-blue-500 mt-6 mb-4"></span>

              <h3 className="text-gray-900 font-semibold tracking-wider uppercase text-sm">
                KAMAL NAYAN UPADHYAY
              </h3>
              <p className="text-gray-500 text-sm">Senior Product Designer</p>
            </div>
          </div>

          {/* 2 */}
          <div className="p-4 md:w-1/3 w-full">
            <div className="h-full bg-white px-8 py-10 rounded-xl shadow-sm border border-blue-100 text-center hover:shadow-md transition">
              <img
                alt="testimonial"
                className="w-20 h-20 mb-6 object-cover object-center rounded-full inline-block border-2 border-blue-200"
                src="https://randomuser.me/api/portraits/women/44.jpg"
              />

              <p className="leading-relaxed text-gray-600">
                Great quality and fast delivery. The product looks exactly like
                the photos. I will definitely order again!
              </p>

              <span className="inline-block h-1 w-10 rounded bg-blue-500 mt-6 mb-4"></span>

              <h3 className="text-gray-900 font-semibold tracking-wider uppercase text-sm">
                SREYNEANG
              </h3>
              <p className="text-gray-500 text-sm">Happy Customer</p>
            </div>
          </div>

          {/* 3 */}
          <div className="p-4 md:w-1/3 w-full">
            <div className="h-full bg-white px-8 py-10 rounded-xl shadow-sm border border-blue-100 text-center hover:shadow-md transition">
              <img
                alt="testimonial"
                className="w-20 h-20 mb-6 object-cover object-center rounded-full inline-block border-2 border-blue-200"
                src="https://randomuser.me/api/portraits/men/76.jpg"
              />

              <p className="leading-relaxed text-gray-600">
                Customer service is super friendly and helpful. The material is
                soft and comfortable.
              </p>

              <span className="inline-block h-1 w-10 rounded bg-blue-500 mt-6 mb-4"></span>

              <h3 className="text-gray-900 font-semibold tracking-wider uppercase text-sm">
                SOKHA
              </h3>
              <p className="text-gray-500 text-sm">Verified Buyer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;

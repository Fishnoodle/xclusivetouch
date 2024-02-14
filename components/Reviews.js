import Image from "next/image";

const reviews = [
  [
    {
      content:
        "Having a digital business card is very handy and efficient, good way to spread your business without having to pull out a stack of business cards. HIGHLY RECOMMEND!!",
      link: "https://g.co/kgs/5veFFfv",
      author: {
        name: "Aryan Naidu",
        role: "",
        image: "/g.jpg",
      },
    },
  ],
  [
    {
      content:
        "I bought a couple of these NFC card for my business in the shop and one on me.  I can honestly say this was the best investment i have made.  The best thing about these type of business cards are that you will never run out, and updating is simple as a few clicks.  I would honestly recommend these cards to anyone that is tired of replacing business cards.  Its truly a one time investment😊",
      link: "https://g.co/kgs/z9e6rUz",
      author: {
        name: "Roneal Lingam",
        role: "",
        image: "/fawaz.jpg",
      },
    },
  ],
  [
    {
      content:
        "Great service ! Highly recommend it. Owner is super friendly and helpful.",
      link: "https://g.co/kgs/Sj9SWqS",
      author: {
        name: "Shirley Brunetta",
        role: "",
        image: "/himanil.jpg",
      },
    },
  ],
];

export function Reviews() {
  return (
    <section
      id="reviews"
      aria-label="What our customers are saying"
      className="container mx-auto py-10"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto md:text-center">
          <p className="text-3xl lg:text-5xl font-semibold text-black  mt-3">
            Loved by many worldwide.
          </p>
          <p className="text-base lg:text-xl font-medium text-[#D4AF37] uppercase mt-5">
            See what our users are saying about our cards.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-16 lg:max-w-none lg:grid-cols-3"
        >
          {reviews.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                {column.map((testimonial, testimonialIndex) => (
                  <li
                    key={testimonialIndex}
                    className="hover:scale-105 transition duration-300 ease-in-out"
                  >
                    <a href={testimonial.link} target="_blank" rel="noreferrer">
                      <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                        <blockquote className="relative">
                          <p className="text-lg tracking-tight text-slate-900">
                            {testimonial.content}
                          </p>
                        </blockquote>
                        <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                          <div>
                            <div className="font-display text-base text-slate-900">
                              {testimonial.author.name}
                            </div>
                            {/* <div className="mt-1 text-sm text-slate-500">
                              {testimonial.author.role}
                            </div> */}
                          </div>
                          <div className="overflow-hidden rounded-full bg-slate-50">
                            {/* <Image
                              className="h-14 w-14 object-cover"
                              src={testimonial.author.image}
                              alt="picture of the testimonial author"
                              width={56}
                              height={56}
                            /> */}
                          </div>
                        </figcaption>
                      </figure>
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
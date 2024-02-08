import Image from "next/image";

const reviews = [
  [
    {
      content:
        "XclusiveTouch's NFC business cards are a game-changer! They streamline networking and impress clients effortlessly.",
      link: "https://twitter.com/rauchg/status/1612233034622984192",
      author: {
        name: "Samantha Hayes",
        role: "CEO at Vercel",
        image: "/g.jpg",
      },
    },
    {
      content:
        "As a designer, presentation matters. XclusiveTouch's NFC cards add a touch of innovation to my networking arsenal.",
      link: "https://twitter.com/cramforce/status/1612496954218672128",
      author: {
        name: "Michael Chen",
        role: "CTO at Vercel",
        image: "/malte.jpg",
      },
    },
  ],
  [
    {
      content:
        "With XclusiveTouch's NFC business cards, sharing my contact info is as easy as a tap. Clients love the convenience!",
      link: "https://twitter.com/phar_whaz/status/1612498030627852309",
      author: {
        name: "Emily Johnson",
        role: "Software Engineer",
        image: "/fawaz.jpg",
      },
    },
    {
      content:
        "Impressive technology! XclusiveTouch's NFC cards elevate professionalism and make a lasting impression on potential partners.",
      link: "https://twitter.com/sergvind/status/1612610058369515521",
      author: {
        name: "David Thompson",
        role: "CPO at Treeum",
        image: "/sergei.jpg",
      },
    },
  ],
  [
    {
      content:
        "I've seen firsthand how XclusiveTouch's NFC cards enhance networking at our events. Attendees love the futuristic touch!",
      link: "https://twitter.com/Himanil_Gole/status/1612510385504157697",
      author: {
        name: "Rachet Patel",
        role: "Designer & Founder at CBREX",
        image: "/himanil.jpg",
      },
    },
    {
      content:
        "In the fast-paced world of startups, every second counts. XclusiveTouch's NFC business cards save time and leave a memorable mark on investors.",
      link: "https://twitter.com/rod_ellison/status/1612513333302775809",
      author: {
        name: "Alex Rodriguez",
        role: "Software Engineer",
        image: "/rod.jpg",
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
                    {/* <a href={testimonial.link} target="_blank" rel="noreferrer"> */}
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
                    {/* </a> */}
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
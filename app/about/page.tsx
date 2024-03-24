import Link from "next/link";

export default function About() {
  return (
    <main className="">
      <div className="mx-auto max-w-1300 py-14 text-neutral-100 sm:py-28">
        {/* Logo */}
        <div className="p-4 text-center sm:p-8">
          <span className="font-PressStart text-4xl font-normal uppercase">
            Loot
            <span className="text-custom-amber-800">Log</span>
          </span>
        </div>

        {/* About us */}
        <div className="p-4 sm:p-8">
          <h1 className="text-lg underline">About Us</h1>
          <p className="text-sm">
            Welcome to our gaming website! We are passionate about gaming and
            strive to provide you with the latest news, reviews, and insights
            from the gaming world.
          </p>
        </div>

        <div className="p-4 sm:p-8">
          <h2 className="text-lg underline">Our Mission</h2>
          <p className="text-sm">
            Our mission is to create a community where gamers can come together
            to share their experiences, discover new games, and stay updated
            with the latest trends in the gaming industry.
          </p>
        </div>

        <div className="p-4 sm:p-8">
          <h2 className="text-lg underline">Our Team</h2>
          <p className="text-sm">
            We have a dedicated team of gaming enthusiasts who are committed to
            delivering high-quality content to our readers. Meet our team of
            writers, editors, and developers who make this website possible.
          </p>
        </div>

        <div className="p-4 sm:p-8">
          <h2 className="text-lg underline">Contact Us</h2>
          <p className="text-sm">
            If you have any questions, suggestions, or feedback, feel free to
            reach out to us. We would love to hear from you!
          </p>
          <p className="text-sm">Email: contact@gamingwebsite.com</p>
          <p className="text-sm">Phone: 123-456-7890</p>
        </div>

        <div className="p-4 sm:p-8">
          <p>
            <Link className="underline" href="terms-and-conditions">
              Terms and Conditions
            </Link>
          </p>

          <p>
            <Link className="underline" href="privacy-policy">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

import { useState } from "react";

const emptyForm = {
  name: "",
  email: "",
  message: "",
};

const ContactUs = () => {
  const [form, setForm] = useState(emptyForm);
  const [sent, setSent] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
    setForm(emptyForm);
  };

  return (
    <main className="mx-auto max-w-[1400px] px-8 py-8">
      <h1 className="mb-2 text-3xl font-bold">Contact Us</h1>
      <p className="mb-6 text-gray-700">Send a message and we will get back to you.</p>

      {sent ? (
        <p className="mb-4 rounded-md bg-green-100 px-4 py-3 text-green-800">
          Thanks. Your message was received.
        </p>
      ) : null}

      <form className="max-w-lg" onSubmit={handleSubmit}>
        <label className="mb-4 block" htmlFor="name">
          Name
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-3 focus:border-blue-300 focus:outline-none focus:ring"
          />
        </label>

        <label className="mb-4 block" htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-3 focus:border-blue-300 focus:outline-none focus:ring"
          />
        </label>

        <label className="mb-4 block" htmlFor="message">
          Message
          <textarea
            id="message"
            name="message"
            required
            rows="5"
            value={form.message}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-3 focus:border-blue-300 focus:outline-none focus:ring"
          />
        </label>

        <button
          className="cursor-pointer rounded-md bg-blue-500 px-5 py-3 font-bold text-white hover:bg-blue-700"
          type="submit"
        >
          Send
        </button>
      </form>
    </main>
  );
};

export default ContactUs;

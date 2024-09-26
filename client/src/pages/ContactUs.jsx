import React, { useState } from 'react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          message: ''
        }); // Clear the form after submission
      } else {
        setStatusMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setStatusMessage('There was an error sending your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-5 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact EduCode</h1>
          <p className="text-xl mb-8">
            Have any questions? We're here to help you on your coding journey!
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto py-20 px-5">
        <h2 className="text-3xl font-bold text-center mb-10">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form className="bg-white p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Send Us a Message</h3>

            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-600 mb-2">Your Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-green-500"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 mb-2">Your Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-green-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-600 mb-2">Your Message</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-green-500"
                placeholder="Enter your message"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {/* Status Message */}
            {statusMessage && (
              <p className="text-green-700 mt-5">{statusMessage}</p>
            )}
          </form>

          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Contact Information</h3>
            <ul className="text-gray-600">
              <li className="mb-4">
                <i className="fas fa-envelope mr-2"></i>
                <strong>Email:</strong> contact@educode.com
              </li>
              <li className="mb-4">
                <i className="fas fa-phone mr-2"></i>
                <strong>Phone:</strong> +1 (234) 567-8900
              </li>
              <li className="mb-4">
                <i className="fas fa-map-marker-alt mr-2"></i>
                <strong>Address:</strong> 123 Coding Street, Tech City, USA
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Optional Map Section */}
      <section className="bg-gray-200 py-20">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-3xl font-bold mb-6">Find Us on the Map</h2>
          <iframe
            className="w-full h-64 md:h-96"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31686.64950429343!2d79.95685583717757!3d6.914787775601566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2509e6697b437%3A0x789b1eebd58930a2!2sSLIIT%20Main%20Campus!5e0!3m2!1sen!2slk!4v1695845554815!5m2!1sen!2slk"
            allowFullScreen=""
            loading="lazy"
            title="EduCode Location at SLIIT"
          ></iframe>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-600 text-white py-6 text-center">
        <p>&copy; 2024 EduCode. Empowering the next generation of coders.</p>
      </footer>
    </div>
  );
}

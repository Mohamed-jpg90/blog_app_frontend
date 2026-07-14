"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import contactImg from "../../image/contactimg.png";
import Button from "@/components/shared/Button";
import "./contact.css";
import toast from "react-hot-toast";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {
    try {
    console.log(data);

    // await fetch(...)

    toast.success("Your message has been sent successfully.");
    reset();
  } catch (error) {
    toast.error("Failed to send your message.");
  }
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-left">
        <div className="contact-form-box">
          <h1 className="contact-title">Get in touch</h1>
          <p className="contact-subtitle">
            Have a question or feedback? Send a message and I&apos;ll get
            back to you.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="firstName">
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  className={`form-input ${
                    errors.firstName ? "input-error" : ""
                  }`}
                  {...register("firstName", {
                    required: "First name is required",
                    minLength: { value: 2, message: "Too short" },
                  })}
                />
                {errors.firstName && (
                  <p className="form-error">{errors.firstName.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="lastName">
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  className={`form-input ${
                    errors.lastName ? "input-error" : ""
                  }`}
                  {...register("lastName", {
                    required: "Last name is required",
                    minLength: { value: 2, message: "Too short" },
                  })}
                />
                {errors.lastName && (
                  <p className="form-error">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={`form-input ${errors.email ? "input-error" : ""}`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="form-error">{errors.email.message}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="subject">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="What's this about?"
                className={`form-input ${
                  errors.subject ? "input-error" : ""
                }`}
                {...register("subject", {
                  required: "Subject is required",
                  minLength: { value: 4, message: "Too short" },
                })}
              />
              {errors.subject && (
                <p className="form-error">{errors.subject.message}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Write your message..."
                className={`form-input form-textarea ${
                  errors.message ? "input-error" : ""
                }`}
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Message should be at least 10 characters",
                  },
                })}
              />
              {errors.message && (
                <p className="form-error">{errors.message.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              className="form-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send message"}
            </Button>

            {/* {isSubmitSuccessful && (
              <p className="form-success">
                Your message has been sent successfully.
              </p>
            )} */}
          </form>
        </div>
      </div>

      <div className="contact-right">
        <Image
          src={contactImg}
          alt="Contact"
          fill
          className="contact-image"
          sizes="50vw"
          priority
        />
      </div>
    </div>
  );
}
"use client";

import { useForm } from "react-hook-form";
import Button from "@/components/shared/Button";
import "./profile.css";

export default function ChangePasswordPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    console.log("Change password:", data);
    // await fetch("/api/user/change-password", { method: "PUT", body: JSON.stringify(data) });
  };

  return (
    <div className="editProfile-wrapper">
      <div className="editProfile-box">
        <h1 className="editProfile-title">Change password</h1>
        <p className="editProfile-subtitle">
          Choose a strong password to keep your account secure
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="currentPassword">
              Current password
            </label>
            <input
              id="currentPassword"
              type="password"
              placeholder="••••••••"
              className={`form-input ${
                errors.currentPassword ? "input-error" : ""
              }`}
              {...register("currentPassword", {
                required: "Current password is required",
              })}
            />
            {errors.currentPassword && (
              <p className="form-error">{errors.currentPassword.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="newPassword">
              New password
            </label>
            <input
              id="newPassword"
              type="password"
              placeholder="••••••••"
              className={`form-input ${
                errors.newPassword ? "input-error" : ""
              }`}
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                  message: "Must include upper, lower case and a number",
                },
              })}
            />
            {errors.newPassword && (
              <p className="form-error">{errors.newPassword.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">
              Confirm new password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className={`form-input ${
                errors.confirmPassword ? "input-error" : ""
              }`}
              {...register("confirmPassword", {
                required: "Please confirm your new password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="form-error">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            className="form-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update password"}
          </Button>

          {isSubmitSuccessful && (
            <p className="form-success">Your password has been updated.</p>
          )}
        </form>
      </div>
    </div>
  );
}
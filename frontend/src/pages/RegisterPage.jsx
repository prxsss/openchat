import { useState } from 'react';
import { Link } from 'react-router';
import useSignup from '../hooks/useSignup';

import { HiArrowRight } from 'react-icons/hi2';

const RegisterPage = () => {
  const { signup, loading } = useSignup();

  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 2) {
      // Handle form submission for step 2
      const formData = {
        firstName,
        lastName,
        gender,
        email,
        password,
        confirmPassword,
      };

      await signup(formData);

      return;
    }

    setStep(step + 1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex h-screen max-w-3xl flex-col p-4"
    >
      <div className="flex-1 px-4">
        <h1 className="py-8 text-3xl font-semibold text-primary">Sign Up</h1>
        <div className="space-y-4">
          {step === 1 && (
            <div>
              <div>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">First name</span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    className="input w-full rounded-full bg-base-200"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Last name (optional)</span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    className="input w-full rounded-full bg-base-200"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <select
                    className="select rounded-full bg-base-200"
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option disabled></option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <div>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Email</span>
                  </div>
                  <input
                    type="email"
                    placeholder=""
                    className="input w-full rounded-full bg-base-200"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Password</span>
                  </div>
                  <input
                    type="password"
                    placeholder=""
                    className="input w-full rounded-full bg-base-200"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Confirm password</span>
                  </div>
                  <input
                    type="password"
                    placeholder=""
                    className="input w-full rounded-full bg-base-200"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-2">
        <Link to="/login" className="btn btn-ghost">
          Login
        </Link>
        <button type="submit" className="btn btn-circle btn-primary">
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <HiArrowRight className="text-base-100" size={21} />
          )}
        </button>
      </div>
    </form>
  );
};
export default RegisterPage;

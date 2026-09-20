import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, clearError } from '../store/authSlice';
import '../admin.css';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  React.useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(formData));
    if (!result.error) {
      // Redirect based on role
      const user = result.payload;
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            <i className="fa fa-shopping-bag"></i> SuperShop
          </Link>
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="auth-form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>
      </div>

      <style>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0f172a 0%, #1a1a2e 50%, #16213e 100%);
          padding: 20px;
        }
        .auth-card {
          background: white;
          border-radius: 16px;
          padding: 48px;
          width: 100%;
          max-width: 440px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        .auth-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .auth-logo {
          font-size: 28px;
          font-weight: 800;
          color: #0f172a;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
        }
        .auth-logo i {
          color: #ff7e5f;
        }
        .auth-header h2 {
          font-size: 26px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
        }
        .auth-header p {
          color: #64748b;
          font-size: 15px;
        }
        .auth-error {
          background: #fee2e2;
          color: #dc2626;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
          font-weight: 500;
        }
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .auth-form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .auth-form-group label {
          font-size: 14px;
          font-weight: 600;
          color: #334155;
        }
        .auth-form-group input {
          padding: 14px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 15px;
          transition: 0.2s;
        }
        .auth-form-group input:focus {
          outline: none;
          border-color: #ff7e5f;
        }
        .auth-btn {
          background: #ff7e5f;
          color: white;
          padding: 14px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          margin-top: 8px;
          transition: 0.2s;
        }
        .auth-btn:hover:not(:disabled) {
          background: #e06c50;
        }
        .auth-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .auth-footer {
          text-align: center;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #e2e8f0;
        }
        .auth-footer p {
          color: #64748b;
          font-size: 14px;
        }
        .auth-footer a {
          color: #ff7e5f;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
import React, { useState } from 'react';
import './admin.css';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Sample data for dashboard
  const stats = [
    { icon: 'fa-shopping-bag', label: 'Total Orders', value: '2,847', change: '+12.5%', positive: true, color: 'blue' },
    { icon: 'fa-dollar-sign', label: 'Total Revenue', value: '$124,580', change: '+8.2%', positive: true, color: 'green' },
    { icon: 'fa-boxes', label: 'Products', value: '1,240', change: '+3.1%', positive: true, color: 'purple' },
    { icon: 'fa-users', label: 'Customers', value: '3,521', change: '+15.3%', positive: true, color: 'orange' },
  ];

  const recentOrders = [
    { id: '#ORD-2847', customer: 'John Doe', product: 'ProMax X15 Smartphone', amount: '$549.99', status: 'Delivered' },
    { id: '#ORD-2846', customer: 'Jane Smith', product: 'UltraBook Pro 16"', amount: '$1,299.00', status: 'Processing' },
    { id: '#ORD-2845', customer: 'Michael Kim', product: 'SoundPro Headphones', amount: '$139.99', status: 'Shipped' },
    { id: '#ORD-2844', customer: 'Sarah Robinson', product: 'SmartWatch Series 9', amount: '$299.00', status: 'Pending' },
    { id: '#ORD-2843', customer: 'Alex Johnson', product: 'Premium Espresso Machine', amount: '$349.00', status: 'Delivered' },
  ];

  const products = [
    { id: 1, name: 'ProMax X15 Smartphone', category: 'Electronics', price: '$549.99', stock: 45, status: 'In Stock' },
    { id: 2, name: 'UltraBook Pro 16"', category: 'Electronics', price: '$1,299.00', stock: 12, status: 'Low Stock' },
    { id: 3, name: 'SoundPro Wireless Headphones', category: 'Electronics', price: '$139.99', stock: 234, status: 'In Stock' },
    { id: 4, name: 'SmartWatch Series 9', category: 'Electronics', price: '$299.00', stock: 89, status: 'In Stock' },
    { id: 5, name: 'Air Comfort Sneakers', category: 'Fashion', price: '$89.99', stock: 0, status: 'Out of Stock' },
  ];

  const users = [
    { id: 1, name: 'Admin User', email: 'admin@supershop.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 4, name: 'Michael Kim', email: 'michael@example.com', role: 'User', status: 'Inactive' },
  ];

  const getStatusBadgeClass = (status) => {
    if (status === 'Delivered') return 'badge-delivered';
    if (status === 'Processing') return 'badge-processing';
    if (status === 'Shipped') return 'badge-processing';
    if (status === 'Pending') return 'badge-pending';
    if (status === 'Cancelled') return 'badge-cancelled';
    if (status === 'In Stock') return 'badge-instock';
    if (status === 'Low Stock') return 'badge-lowstock';
    if (status === 'Out of Stock') return 'badge-cancelled';
    if (status === 'Admin') return 'badge-admin';
    return 'badge-user';
  };

  const handleBackToWebsite = () => {
    window.location.href = '/';
  };

  return (
    <div className="admin-container">
      {/* ========== SIDEBAR ========== */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <i className="fa fa-chart-line"></i>
          <span>Admin</span>
        </div>

        <nav className="admin-sidebar__nav">
          <button
            className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <i className="fa fa-home"></i>
            Dashboard
          </button>
          <button
            className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <i className="fa fa-boxes"></i>
            Products
          </button>
          <button
            className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <i className="fa fa-receipt"></i>
            Orders
          </button>
          <button
            className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <i className="fa fa-users"></i>
            Users
          </button>
          <button
            className={`admin-nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <i className="fa fa-chart-bar"></i>
            Analytics
          </button>
        </nav>

        <div className="admin-sidebar__footer">
          <button className="admin-btn-back" onClick={handleBackToWebsite}>
            <i className="fa fa-arrow-left"></i>
            Back to Shop
          </button>
        </div>
      </aside>

      {/* ========== MAIN CONTENT ========== */}
      <main className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div className="admin-header__title">
            <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
            <p>Manage and monitor your SuperShop business</p>
          </div>
          <div className="admin-header__actions">
            <div className="admin-profile">
              <div className="admin-avatar">AD</div>
              <div className="admin-profile-info">
                <strong>Admin User</strong>
                <span><i className="fa fa-circle" style={{ fontSize: '6px' }}></i> Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="admin-content">
          {/* ========== DASHBOARD TAB ========== */}
          {activeTab === 'dashboard' && (
            <>
              {/* Stats Cards */}
              <div className="admin-stats-grid">
                {stats.map((stat, idx) => (
                  <div key={idx} className="admin-stat-card">
                    <div className="admin-stat-info">
                      <span>{stat.label}</span>
                      <h3>{stat.value}</h3>
                      <span className="admin-stat-badge positive">
                        <i className="fa fa-arrow-up"></i> {stat.change}
                      </span>
                    </div>
                    <div className={`admin-stat-icon icon-${stat.color}`}>
                      <i className={`fa ${stat.icon}`}></i>
                    </div>
                  </div>
                ))}
              </div>

              {/* System Health */}
              <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>System Health</h3>
              <div className="system-health-grid">
                <div className="system-card">
                  <i className="fa fa-database" style={{ color: '#3b82f6' }}></i>
                  <div className="system-card-info">
                    <h4>MongoDB</h4>
                    <p>✓ Connected - 2.4GB used</p>
                  </div>
                </div>
                <div className="system-card">
                  <i className="fa fa-server" style={{ color: '#10b981' }}></i>
                  <div className="system-card-info">
                    <h4>Backend Server</h4>
                    <p>✓ Running on Port 5001</p>
                  </div>
                </div>
                <div className="system-card">
                  <i className="fa fa-check-circle" style={{ color: '#a855f7' }}></i>
                  <div className="system-card-info">
                    <h4>All Systems</h4>
                    <p>✓ Operational & Healthy</p>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="admin-card" style={{ marginTop: '32px' }}>
                <div className="admin-card__header">
                  <h3>Recent Orders</h3>
                  <a href="#orders" onClick={() => setActiveTab('orders')} className="admin-btn admin-btn-primary">
                    <i className="fa fa-arrow-right"></i> View All
                  </a>
                </div>
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id}>
                          <td><strong>{order.id}</strong></td>
                          <td>{order.customer}</td>
                          <td>{order.product}</td>
                          <td><strong>{order.amount}</strong></td>
                          <td><span className={`admin-badge ${getStatusBadgeClass(order.status)}`}>{order.status}</span></td>
                          <td>
                            <div className="admin-actions">
                              <button className="admin-icon-btn" title="View">
                                <i className="fa fa-eye"></i>
                              </button>
                              <button className="admin-icon-btn" title="Edit">
                                <i className="fa fa-edit"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ========== PRODUCTS TAB ========== */}
          {activeTab === 'products' && (
            <div className="admin-card">
              <div className="admin-card__header">
                <h3>Product Management</h3>
                <button className="admin-btn admin-btn-primary" onClick={() => setShowProductModal(true)}>
                  <i className="fa fa-plus"></i> Add Product
                </button>
              </div>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <div className="admin-table-prod">
                            <div className="admin-prod-thumb" style={{ background: '#ff7e5f' }}>
                              <i className="fa fa-box"></i>
                            </div>
                            <strong>{product.name}</strong>
                          </div>
                        </td>
                        <td>{product.category}</td>
                        <td><strong>{product.price}</strong></td>
                        <td>{product.stock} units</td>
                        <td><span className={`admin-badge ${getStatusBadgeClass(product.status)}`}>{product.status}</span></td>
                        <td>
                          <div className="admin-actions">
                            <button className="admin-icon-btn" title="Edit">
                              <i className="fa fa-edit"></i>
                            </button>
                            <button className="admin-icon-btn delete" title="Delete">
                              <i className="fa fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========== ORDERS TAB ========== */}
          {activeTab === 'orders' && (
            <div className="admin-card">
              <div className="admin-card__header">
                <h3>Order Management</h3>
                <div>
                  <select className="admin-select">
                    <option>All Orders</option>
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                </div>
              </div>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Product</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td><strong>{order.id}</strong></td>
                        <td>{order.customer}</td>
                        <td>{order.product}</td>
                        <td><strong>{order.amount}</strong></td>
                        <td>
                          <select className="admin-select" defaultValue={order.status}>
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td>
                          <div className="admin-actions">
                            <button className="admin-icon-btn" title="View Details" onClick={() => { setSelectedOrder(order); setShowOrderModal(true); }}>
                              <i className="fa fa-eye"></i>
                            </button>
                            <button className="admin-icon-btn" title="Print">
                              <i className="fa fa-print"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========== USERS TAB ========== */}
          {activeTab === 'users' && (
            <div className="admin-card">
              <div className="admin-card__header">
                <h3>User Management</h3>
                <input type="text" placeholder="Search users..." style={{ padding: '9px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', width: '200px' }} />
              </div>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td><strong>{user.name}</strong></td>
                        <td>{user.email}</td>
                        <td><span className={`admin-badge ${getStatusBadgeClass(user.role)}`}>{user.role}</span></td>
                        <td><span className={`admin-badge ${user.status === 'Active' ? 'badge-instock' : 'badge-cancelled'}`}>{user.status}</span></td>
                        <td>
                          <div className="admin-actions">
                            <button className="admin-icon-btn" title="Edit">
                              <i className="fa fa-edit"></i>
                            </button>
                            <button className="admin-icon-btn delete" title="Suspend">
                              <i className="fa fa-ban"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========== ANALYTICS TAB ========== */}
          {activeTab === 'analytics' && (
            <div className="admin-card">
              <div className="admin-card__header">
                <h3>Analytics & Reports</h3>
              </div>
              <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                <i className="fa fa-chart-pie" style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}></i>
                <p style={{ fontSize: '16px', fontWeight: 600 }}>Detailed analytics dashboard coming soon!</p>
                <p style={{ fontSize: '13px', marginTop: '8px' }}>Track sales trends, customer behavior, and more.</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ========== MODALS ========== */}
      {showProductModal && (
        <div className="admin-modal-overlay" onClick={() => setShowProductModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h3>Add New Product</h3>
              <span className="admin-modal__close" onClick={() => setShowProductModal(false)}>✕</span>
            </div>
            <div className="admin-modal__form">
              <div className="admin-form-group">
                <label>Product Name *</label>
                <input type="text" placeholder="e.g., ProMax X15 Smartphone" />
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Category *</label>
                  <select>
                    <option>Electronics</option>
                    <option>Fashion</option>
                    <option>Home & Garden</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label>Price *</label>
                  <input type="number" placeholder="0.00" />
                </div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Stock Quantity *</label>
                  <input type="number" placeholder="0" />
                </div>
                <div className="admin-form-group">
                  <label>Image URL</label>
                  <input type="url" placeholder="https://..." />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Description</label>
                <textarea rows="4" placeholder="Product description..."></textarea>
              </div>
            </div>
            <div className="admin-modal__footer">
              <button className="admin-btn" style={{ background: '#e2e8f0', color: '#334155' }} onClick={() => setShowProductModal(false)}>Cancel</button>
              <button className="admin-btn admin-btn-primary">Add Product</button>
            </div>
          </div>
        </div>
      )}

      {showOrderModal && selectedOrder && (
        <div className="admin-modal-overlay" onClick={() => setShowOrderModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h3>Order Details - {selectedOrder.id}</h3>
              <span className="admin-modal__close" onClick={() => setShowOrderModal(false)}>✕</span>
            </div>
            <div className="admin-modal__form" style={{ gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>CUSTOMER</span>
                  <p style={{ fontSize: '16px', fontWeight: 600, marginTop: '4px' }}>{selectedOrder.customer}</p>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>AMOUNT</span>
                  <p style={{ fontSize: '16px', fontWeight: 600, marginTop: '4px', color: '#ff7e5f' }}>{selectedOrder.amount}</p>
                </div>
              </div>
              <div>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>PRODUCT</span>
                <p style={{ fontSize: '14px', marginTop: '4px' }}>{selectedOrder.product}</p>
              </div>
              <div>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>UPDATE STATUS</span>
                <select className="admin-select" style={{ marginTop: '6px', width: '100%' }} defaultValue={selectedOrder.status}>
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>
            <div className="admin-modal__footer">
              <button className="admin-btn" style={{ background: '#e2e8f0', color: '#334155' }} onClick={() => setShowOrderModal(false)}>Close</button>
              <button className="admin-btn admin-btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

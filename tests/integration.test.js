/**
 * Basic Integration Tests for E-Commerce Backend
 * 
 * Note: These tests require MongoDB to be running.
 * Run with: node tests/integration.test.js
 */

const http = require('http');

// Test configuration
const BASE_URL = 'http://localhost:5000';
let authToken = '';
let adminToken = '';
let productId = '';
let userId = '';

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m'
};

// Helper function to make HTTP requests
function makeRequest(method, path, data = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(url, options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const response = {
            status: res.statusCode,
            data: body ? JSON.parse(body) : null
          };
          resolve(response);
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Test cases
const tests = [
  {
    name: 'Server Health Check',
    run: async () => {
      const res = await makeRequest('GET', '/');
      return res.status === 200 && res.data.message.includes('E-Commerce');
    }
  },
  {
    name: 'Register New User',
    run: async () => {
      const res = await makeRequest('POST', '/api/users/register', {
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'password123'
      });
      if (res.status === 201 && res.data.token) {
        authToken = res.data.token;
        userId = res.data._id;
        return true;
      }
      return false;
    }
  },
  {
    name: 'Login Admin User',
    run: async () => {
      const res = await makeRequest('POST', '/api/users/login', {
        email: 'admin@example.com',
        password: 'admin123'
      });
      if (res.status === 200 && res.data.token) {
        adminToken = res.data.token;
        return true;
      }
      return false;
    }
  },
  {
    name: 'Get User Profile',
    run: async () => {
      const res = await makeRequest('GET', '/api/users/profile', null, authToken);
      return res.status === 200 && res.data.email;
    }
  },
  {
    name: 'Get Products (Public)',
    run: async () => {
      const res = await makeRequest('GET', '/api/products');
      return res.status === 200 && Array.isArray(res.data.products);
    }
  },
  {
    name: 'Create Product (Admin)',
    run: async () => {
      const res = await makeRequest('POST', '/api/products', {
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        category: 'electronics',
        stock: 10,
        brand: 'TestBrand'
      }, adminToken);
      
      if (res.status === 201 && res.data._id) {
        productId = res.data._id;
        return true;
      }
      return false;
    }
  },
  {
    name: 'Get Single Product',
    run: async () => {
      const res = await makeRequest('GET', `/api/products/${productId}`);
      return res.status === 200 && res.data.name === 'Test Product';
    }
  },
  {
    name: 'Add to Cart',
    run: async () => {
      const res = await makeRequest('POST', '/api/cart', {
        productId: productId,
        quantity: 2
      }, authToken);
      return res.status === 200 && res.data.items.length > 0;
    }
  },
  {
    name: 'Get Cart',
    run: async () => {
      const res = await makeRequest('GET', '/api/cart', null, authToken);
      return res.status === 200 && res.data.items;
    }
  },
  {
    name: 'Update Cart Item',
    run: async () => {
      const res = await makeRequest('PUT', `/api/cart/${productId}`, {
        quantity: 3
      }, authToken);
      return res.status === 200;
    }
  },
  {
    name: 'Remove from Cart',
    run: async () => {
      const res = await makeRequest('DELETE', `/api/cart/${productId}`, null, authToken);
      return res.status === 200;
    }
  }
];

// Run all tests
async function runTests() {
  console.log(`${colors.blue}🧪 Running E-Commerce Backend Tests${colors.reset}\n`);
  
  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      const result = await test.run();
      if (result) {
        console.log(`${colors.green}✓${colors.reset} ${test.name}`);
        passed++;
      } else {
        console.log(`${colors.red}✗${colors.reset} ${test.name}`);
        failed++;
      }
    } catch (error) {
      console.log(`${colors.red}✗${colors.reset} ${test.name} - ${error.message}`);
      failed++;
    }
  }

  console.log(`\n${colors.blue}Test Results:${colors.reset}`);
  console.log(`${colors.green}Passed: ${passed}${colors.reset}`);
  console.log(`${colors.red}Failed: ${failed}${colors.reset}`);
  console.log(`Total: ${passed + failed}\n`);

  process.exit(failed > 0 ? 1 : 0);
}

// Check if server is running before starting tests
async function checkServer() {
  try {
    await makeRequest('GET', '/');
    console.log(`${colors.green}✓${colors.reset} Server is running\n`);
    runTests();
  } catch (error) {
    console.log(`${colors.red}✗ Server is not running${colors.reset}`);
    console.log(`${colors.yellow}Please start the server with: npm run dev${colors.reset}\n`);
    process.exit(1);
  }
}

checkServer();

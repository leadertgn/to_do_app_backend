// test-security.js - Tests de sécurité
const axios = require('axios');
const port = 1000;
async function testSecurity() {
  const baseURL = `http://localhost:${port}/api`;
  
  console.log('🧪 Tests de sécurité en cours...\n');

  // Test 1: Headers de sécurité
  console.log('1. Test des headers de sécurité...');
  const response = await axios.get(`${baseURL}/`);
  const securityHeaders = response.headers;
  
  const expectedHeaders = [
    'x-content-type-options',
    'x-frame-options', 
    'strict-transport-security'
  ];
  
  expectedHeaders.forEach(header => {
    if (securityHeaders[header]) {
      console.log(`✅ ${header}: ${securityHeaders[header]}`);
    } else {
      console.log(`❌ ${header}: MANQUANT`);
    }
  });

  // Test 2: Rate limiting
  console.log('\n2. Test du rate limiting...');
  try {
    const requests = Array(6).fill().map(() => 
      axios.post(`${baseURL}/api/auth/login`, {
        email: 'test@test.com',
        password: 'wrong'
      }).catch(err => err)
    );
    
    const results = await Promise.all(requests);
    const blocked = results.filter(r => r.response?.status === 429);
    console.log(`✅ ${blocked.length} requêtes bloquées sur 6 tentatives`);
  } catch (error) {
    console.log('❌ Test rate limiting échoué');
  }

  // Test 3: Injection NoSQL
  console.log('\n3. Test injection NoSQL...');
  try {
    await axios.post(`${baseURL}/api/auth/login`, {
      email: { '$ne': 'invalid' },
      password: { '$ne': 'invalid' }
    });
    console.log('❌ Injection NoSQL non bloquée');
  } catch (error) {
    console.log('✅ Injection NoSQL bloquée');
  }
}

testSecurity();
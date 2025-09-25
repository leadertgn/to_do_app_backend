// test-api.js
const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testAPI() {
  try {
    console.log('🚀 Début des tests API...\n');

    // Test 1: Route racine
    console.log('1. Testing route racine...');
    const rootResponse = await axios.get('http://localhost:5000/');
    console.log('✅ Route racine:', rootResponse.data);

    // Test 2: Inscription
    console.log('\n2. Testing inscription...');
    const registerResponse = await axios.post(`${API_BASE}/auth/register`, {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('✅ Inscription réussie');
    const token = registerResponse.data.token;

    // Test 3: Profil
    console.log('\n3. Testing profil...');
    const profileResponse = await axios.get(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Profil:', profileResponse.data);

    // Test 4: Créer tâche
    console.log('\n4. Testing création tâche...');
    const taskResponse = await axios.post(`${API_BASE}/tasks`, {
      title: 'Tâche de test',
      description: 'Description test'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Tâche créée:', taskResponse.data);

    console.log('\n🎉 Tous les tests passent !');

  } catch (error) {
    console.error('❌ Erreur:', error.response?.data || error.message);
  }
}

testAPI();
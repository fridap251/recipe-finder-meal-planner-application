// netlify/functions/gitlab-oauth.js
exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { code, state } = JSON.parse(event.body);
    
    // Validate required parameters
    if (!code) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Authorization code is required' }),
      };
    }

    // Use your updated secret and the deployed site URL
    const clientSecret = 'gloas-c56147f3adeba0d6c2a400f17f14c810352ceaa09b67103bd8c51b854dc5d704';
    const clientId = '1d28de9d8a7bcbfb1c41cbc05b6133ac1a08f5891a7f4116a4df4f207a128312';
    const redirectUri = 'https://stellar-puffpuff-768d8a.netlify.app/auth/callback';

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://gitlab.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('GitLab token exchange failed:', errorData);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Failed to exchange code for token',
          details: errorData 
        }),
      };
    }

    const tokenData = await tokenResponse.json();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        access_token: tokenData.access_token,
        token_type: tokenData.token_type,
        expires_in: tokenData.expires_in,
      }),
    };
  } catch (error) {
    console.error('OAuth function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
    };
  }
};
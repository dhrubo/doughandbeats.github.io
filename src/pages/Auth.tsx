import React, { useEffect, useState } from 'react';

const Auth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');
      setAccessToken(token);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Instagram Authentication</h1>
      {accessToken ? (
        <div>
          <p className="text-lg mb-4">Successfully authenticated!</p>
          <p className="text-md mb-2">Your Access Token is:</p>
          <pre className="bg-gray-100 p-4 rounded-lg text-left overflow-x-auto">
            <code>{accessToken}</code>
          </pre>
        </div>
      ) : (
        <p className="text-lg">Waiting for authentication redirect...</p>
      )}
    </div>
  );
};

export default Auth;

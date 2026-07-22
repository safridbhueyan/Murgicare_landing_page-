/**
 * BDApps API Service
 * Handles communications for subscription and verification.
 */

const getApiUrl = (endpoint) => {
  if (import.meta.env.DEV) {
    return `/api/NADB26115/${endpoint}`;
  }
  const origin = window.location.origin;
  if (origin.includes('bdappsdigitalapps.com')) {
    return `./${endpoint}`;
  }
  return `https://www.bdappsdigitalapps.com/NADB26115/${endpoint}`;
};

/**
 * Sends a POST request encoded as application/x-www-form-urlencoded.
 * @param {string} endpoint - The target endpoint (e.g. 'send_otp.php')
 * @param {Object} data - Key-value pairs for the body
 */
async function postForm(endpoint, data) {
  const url = getApiUrl(endpoint);
  
  const formBody = Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
  }

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    // If server response isn't JSON, return as text
    return { status: text.trim(), rawResponse: text };
  }
}

/**
 * Initiates subscription by sending an OTP to the user's mobile.
 * @param {string} userMobile - Mobile number
 */
export async function sendOtp(userMobile) {
  return postForm('send_otp.php', { user_mobile: userMobile });
}

/**
 * Verifies OTP and completes subscription.
 * @param {string} otp - The 6-digit OTP code
 * @param {string} referenceNo - The reference number from sendOtp
 */
export async function verifyOtp(otp, referenceNo) {
  return postForm('verify_otp.php', { Otp: otp, referenceNo });
}

/**
 * Checks whether a subscriber is currently REGISTERED.
 * @param {string} userMobile - Mobile number
 */
export async function checkSubscription(userMobile) {
  return postForm('check_subscription.php', { user_mobile: userMobile });
}

/**
 * Unsubscribes a user from the service.
 * @param {string} userMobile - Mobile number
 */
export async function unsubscribe(userMobile) {
  return postForm('unsubscribe.php', { 
    user_mobile: userMobile,
    subscriberId: `tel:${userMobile}`
  });
}

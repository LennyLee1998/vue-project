let BASE_URL = "";
// export const BASE_URL = "http://codercba.com:8000"
if (import.meta.env.DEV) {
  BASE_URL = "http://codercba.com:5000";
} else {
  BASE_URL = "http://codercba.com:5000";
}

export { BASE_URL };

export const TIME_OUT = 10000;

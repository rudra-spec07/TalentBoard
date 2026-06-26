import api from '../../../api/axios';

let activeAbortController = null;

/**
 * Query the backend search engine.
 * Automatically cancels any pending search requests to prevent out-of-order responses.
 */
export const searchListings = async (searchParams) => {
  if (activeAbortController) {
    activeAbortController.abort();
  }

  activeAbortController = new AbortController();

  try {
    const response = await api.get('/v1/jobs/search', {
      params: searchParams,
      signal: activeAbortController.signal
    });
    return response.data;
  } catch (error) {
    // If request was explicitly aborted, bypass standard error bubble-ups
    if (error.name === 'CanceledError' || error.message === 'canceled') {
      return new Promise(() => {}); // Return a pending promise that never resolves
    }
    throw error;
  }
};

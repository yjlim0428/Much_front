export const useBroadcast = (bcName) => {
  const bc = new BroadcastChannel(bcName);

  function postMessage(message) {
    bc.postMessage(message);
  }

  async function listenMessage(callback) {
    bc.onmessage = async (e) => {
      await callback(e);
    };
  }

  return { postMessage, listenMessage };
};

export default function swDev() {
  function determineApServerKey() {
    var vapidPublicKey =
      "BDhDbSTERsQ86ioWV1cd34yNvc5uRsbALx10U26NnF-F78rN0re6N5gmd0CJk1KOYg8VY5JKD1f_VfaP1VPJmTI";
    return urlBase64ToUint8Array(vapidPublicKey);
  }
  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  navigator.serviceWorker.register(swUrl).then((response) => {
    console.warn("response", response);
    return response.pushManager.getSubscription().then(function (subscription) {
      return response.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: determineApServerKey(),
      });
    });
  });
}

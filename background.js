// Background service worker
// Handles extension lifecycle and any background tasks

chrome.runtime.onInstalled.addListener(function() {
  console.log('Website to Markdown extension installed');
});

// Handle any background tasks here if needed
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Handle any background message processing
  return true;
}); 
// Content script that runs on web pages
// The main conversion logic is now handled in popup.js using chrome.scripting.executeScript
// This file can be used for any page-specific enhancements if needed in the future

console.log('Website to Markdown extension loaded');

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'convertToMarkdown') {
    const markdown = convertPageToMarkdown();
    sendResponse({ markdown: markdown });
  }
});

function convertPageToMarkdown() {
  // Basic conversion - will be replaced with Turndown
  const title = document.title;
  const body = document.body.innerText;
  
  return `# ${title}\n\n${body}`;
} 
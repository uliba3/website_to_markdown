// Get markdown content from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const markdown = urlParams.get('content');

if (markdown) {
  try {
    // Parse the markdown content
    const html = marked.parse(markdown);
    
    // Extract title and source info if available
    const titleMatch = markdown.match(/^# (.+)$/m);
    const sourceMatch = markdown.match(/\*\*Source:\*\* (.+)$/m);
    
    let contentHtml = '';
    
    // Add source info if available
    if (sourceMatch) {
      contentHtml += `<div class="source-info">
        <strong>Source:</strong> <a href="${sourceMatch[1]}" target="_blank">${sourceMatch[1]}</a>
      </div>`;
    }
    
    // Add the main content
    contentHtml += html;
    
    // Set up the content structure for both preview and markdown views
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `<div class="preview-content">${contentHtml}</div>`;
    
    // Set up the markdown source view
    const markdownSourceDiv = document.getElementById('markdownSource');
    markdownSourceDiv.textContent = markdown;
    
    // Update page title if available
    if (titleMatch) {
      document.title = titleMatch[1] + ' - Markdown Preview';
    }
    
    // Add event listeners for buttons
    document.getElementById('copyBtn').addEventListener('click', function() {
      copyToClipboard(markdown);
      showMessage('copyMessage');
    });
    
    document.getElementById('downloadBtn').addEventListener('click', function() {
      downloadMarkdown(markdown, titleMatch ? titleMatch[1] : 'markdown');
      showMessage('downloadMessage');
    });
    
    // Add toggle functionality
    const toggleBtn = document.getElementById('toggleBtn');
    const previewContent = document.querySelector('.preview-content');
    const markdownSource = document.getElementById('markdownSource');
    
    toggleBtn.addEventListener('click', function() {
      const isShowingMarkdown = markdownSource.classList.contains('show');
      
      if (isShowingMarkdown) {
        // Switch to preview mode
        markdownSource.classList.remove('show');
        previewContent.classList.remove('hide');
        toggleBtn.textContent = 'Show Markdown';
        toggleBtn.classList.remove('active');
      } else {
        // Switch to markdown mode
        markdownSource.classList.add('show');
        previewContent.classList.add('hide');
        toggleBtn.textContent = 'Show Preview';
        toggleBtn.classList.add('active');
      }
    });
    
  } catch (error) {
    document.getElementById('content').innerHTML = `
      <div class="error">
        <strong>Error rendering preview:</strong> ${error.message}
      </div>
    `;
  }
} else {
  document.getElementById('content').innerHTML = `
    <div class="error">
      <strong>No content provided.</strong> Please convert a webpage first.
    </div>
  `;
}

// Function to copy text to clipboard
function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    // Use the modern clipboard API
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      fallbackCopyTextToClipboard(text);
    });
  } else {
    // Fallback for older browsers
    fallbackCopyTextToClipboard(text);
  }
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      console.log('Text copied to clipboard using fallback method');
    } else {
      console.error('Fallback copy command failed');
    }
  } catch (err) {
    console.error('Fallback copy failed: ', err);
  }
  
  document.body.removeChild(textArea);
}

// Function to download markdown as file
function downloadMarkdown(content, filename) {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Function to show success message
function showMessage(messageId) {
  const message = document.getElementById(messageId);
  message.classList.add('show');
  setTimeout(() => {
    message.classList.remove('show');
  }, 2000);
} 
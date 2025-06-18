# TODO Plan

## Webpage to Markdown Chrome Extension

### 1. Set Up Project Structure
- [ ] Create basic Chrome extension folder structure
- [ ] Set up manifest, background, content scripts, popup

### 2. Manifest File
- [ ] Create minimal `manifest.json` (v3)
- [ ] Add required permissions (activeTab, scripting)

### 3. Integrate Turndown
- [ ] Add Turndown library to extension
- [ ] Configure Turndown options for optimal conversion

### 4. Content Script
- [ ] Write content script to extract page HTML
- [ ] Implement Markdown conversion using Turndown
- [ ] Handle different page structures

### 5. Popup UI
- [ ] Create minimal popup interface
- [ ] Add convert button
- [ ] Display/copy Markdown output

### 6. Permissions
- [ ] Review and minimize required permissions
- [ ] Ensure only necessary access is requested

### 7. Testing
- [ ] Test on various webpage types
- [ ] Verify Markdown output quality
- [ ] Test on different content structures

### 8. Polish & Minimize
- [ ] Remove unnecessary code/UI
- [ ] Optimize for minimal footprint
- [ ] Clean up any unused dependencies

### 9. Documentation
- [ ] Update README with installation guide
- [ ] Add usage instructions
- [ ] Document any configuration options 
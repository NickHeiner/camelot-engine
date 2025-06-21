# Dev notes
1. Install the browsertools extension unpacked from `vendor/`
1. Run `npx @agentdeskai/browser-tools-server@latest`
1. Add this to `~/.cursor/mcp.json`:
  ```json
  {
    "mcpServers": {
      "browsertools": {
        // This path is unique to my machine.
        "command": "~/.volta/bin/npx",
        "args": ["-y", "@agentdeskai/browser-tools-mcp@latest"]
      }
    }
  }
  ```
1. Open the devtools in the browser
1. Go to the BrowserToolsMCP tab
1. "Test connection" to make sure that everything is working

### Issues
* The model is able to use BrowserToolsMCP to take a screenshot, but it's only able to view that screenshot for that 
particular agent turn. If you ask a follow-up question, it will not be able to see the screenshot, and may lie about
what it sees.
# Add Screenshots Workflow

You are adding or updating screenshots for Turbot Guardrails documentation.

## Reference Context

Review `../context/style.md` for screenshot requirements and Chrome DevTools MCP usage.

## Critical Requirements

**MUST follow these rules:**

1. **Resize viewport FIRST** - Before taking ANY screenshot:
   ```
   mcp__chrome-devtools__resize_page:
     width: 1280
     height: 640  (or taller if content needs it)
   ```

2. **Image format:**
   - PNG only
   - 1280px width (never vary)
   - Height: 640px or taller if needed
   - Light mode only

3. **File location:**
   - Save in same directory as the markdown file
   - Use kebab-case names: `prevention-dashboard-overview.png`

4. **Markdown syntax:**
   - Use `![descriptive alt text](./image-name.png)`
   - NOT `<img>` tags (except when size specification needed)

## Workflow Steps

### 1. Identify What to Capture

Ask the user:
- Which page needs screenshots?
- What specific views or features to capture?
- Are there any specific states to show? (expanded menus, filled forms, etc.)

### 2. Navigate to the Page

```
mcp__chrome-devtools__navigate_page:
  type: url
  url: https://demo.cloud.turbot-dev.com/apollo/[path]
```

Wait for page to fully load using `wait_for` if needed.

### 3. Prepare the Viewport

**CRITICAL STEP - Do this before EVERY screenshot:**

```
mcp__chrome-devtools__resize_page:
  width: 1280
  height: 640
```

**Adjust height if needed:**
- If content is tall, use height: 800, 1000, or higher
- ALWAYS keep width at 1280px
- Taller screenshots are fine when necessary

### 4. Set Up the View

- Scroll to show relevant content
- Expand sections if needed (`click` tool)
- Wait for animations/loading (`wait_for` tool)
- Ensure meaningful content is visible (not empty states)

### 5. Take the Screenshot

```
mcp__chrome-devtools__take_screenshot:
  filePath: /Users/jsmyth/src/guardrails-docs/docs/[section]/[page]/[name].png
  format: png
```

**File path examples:**
- `/Users/jsmyth/src/guardrails-docs/docs/prevention/dashboard/dashboard-overview.png`
- `/Users/jsmyth/src/guardrails-docs/docs/prevention/objectives/benchmarks/benchmarks-list.png`

### 6. Add to Documentation

Insert the image in the markdown file using relative path:

```markdown
![Descriptive alt text explaining what the image shows](./image-name.png)
```

**Alt text guidelines:**
- Describe what's shown: "Prevention Dashboard showing overall scores and account list"
- Not: "Screenshot" or "Image of dashboard"
- Be specific and helpful for screen readers

### 7. Repeat for Additional Screenshots

For each new screenshot:
1. Navigate/scroll to new view
2. **Resize viewport again** (width: 1280, appropriate height)
3. Take screenshot
4. Add to documentation

### 8. Verify

Check:
- [ ] All screenshots are 1280px wide
- [ ] Screenshots show meaningful content
- [ ] Saved in same directory as markdown file
- [ ] Use relative paths `./image.png`
- [ ] Use markdown syntax `![alt](./image.png)`
- [ ] Alt text is descriptive and specific
- [ ] Light mode used for all screenshots
- [ ] File names use kebab-case

## Common Scenarios

### Full-Page Screenshot
```
# Resize viewport
resize_page: width 1280, height 640

# Capture
take_screenshot: fullPage false (captures viewport)
```

### Tall Content
```
# Resize viewport with more height
resize_page: width 1280, height 1200

# Capture
take_screenshot: fullPage false
```

### Specific Element (Modal/Dialog)
```
# Resize viewport
resize_page: width 1280, height 640

# Find element and capture just that
take_screenshot: uid [element-uid]
```

### Multiple Views (Tabs/States)
```
# For each view:
1. Navigate/click to show view
2. Resize viewport (1280 width)
3. Take screenshot
4. Add to docs with descriptive alt text
```

## Troubleshooting

**Screenshots wrong size:**
- Did you resize viewport BEFORE taking screenshot?
- Did you use width: 1280?
- Did you resize AGAIN after navigating to new page?

**Content cut off:**
- Increase height: 800, 1000, 1200, etc.
- Keep width at 1280px
- Take multiple screenshots if needed

**Image not showing in docs:**
- Check file path is relative: `./image.png` not absolute
- Verify image is in same directory as markdown file
- Check file name uses kebab-case with .png extension

## Example Complete Flow

```
1. User: "Add screenshots to the simulator page"

2. Navigate to simulator:
   navigate_page: url https://demo.cloud.turbot-dev.com/apollo/prevention/simulator

3. Resize viewport:
   resize_page: width 1280, height 640

4. Take overview screenshot:
   take_screenshot: /Users/jsmyth/src/guardrails-docs/docs/prevention/simulator/simulator-overview.png

5. Click to show SCP templates:
   click: uid [templates-button]

6. Resize again for new view:
   resize_page: width 1280, height 800

7. Take templates screenshot:
   take_screenshot: /Users/jsmyth/src/guardrails-docs/docs/prevention/simulator/scp-templates.png

8. Add to markdown:
   ![Simulator overview showing organization hierarchy](./simulator-overview.png)
   ...
   ![SCP template library showing pre-built policies](./scp-templates.png)
```

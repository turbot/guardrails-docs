// Export a custom markdownlint rule object
module.exports = {
  names: ["TG002", "Turbot-Guide-Structure"],
  description: "Validate markdown structure and title casing for Guardrails installation guides",
  tags: ["structure", "title-case", "next-steps-order", "guardrails"],

  function: function(params, onError) {
    const text = params.lines.join("\n");

    // Define basic structural checks
    const checks = [
      {
        name: "YAML frontmatter",
        regex: /^---[\s\S]*?---/,
        message: "Missing or incorrect YAML frontmatter"
      },
      {
        name: "Main title",
        regex: /^#\s+.+/,
        message: "Missing '# Title' header"
      },
      {
        name: "Prerequisites section",
        regex: /##\s+Prerequisites/,
        message: "Missing '## Prerequisites' section"
      },
      {
        name: "Step headers",
        regex: /##\s+Step\s+\d+:\s+.+/,
        message: "No '## Step X:' formatted headers found"
      },
      {
        name: "Next Steps section",
        regex: /##\s+Next\s+Steps/,
        message: "Missing '## Next Steps' section"
      },
      {
        name: "Troubleshooting section",
        regex: /##\s+Troubleshooting/,
        message: "Missing '## Troubleshooting' section"
      }
    ];

    // Execute structural checks
    checks.forEach(check => {
      if (!check.regex.test(text)) {
        onError({
          lineNumber: 1,
          detail: check.message
        });
      }
    });

    // New: Validate Title Case for all headers (# and ##)
    params.tokens.forEach(token => {
      if (token.type === 'heading_open') {
        const headerLine = params.lines[token.line + 1]; // header content follows 'heading_open'

        // Check if header exists
        if (headerLine) {
          // Regex to match "bad casing" — lowercase start of major words
          const badCase = /\b[a-z][a-z]+\b/;

          // Allowed minor words that can stay lowercase (optional, but we ignore for now)
          if (badCase.test(headerLine)) {
            onError({
              lineNumber: token.line + 2,
              detail: "Header not in Title Case: '" + headerLine.trim() + "'"
            });
          }
        }
      }
    });

    // New: Check that ## Next Steps appears before ## Troubleshooting
    const nextStepsIndex = text.indexOf("## Next Steps");
    const troubleshootingIndex = text.indexOf("## Troubleshooting");

    if (troubleshootingIndex !== -1 && nextStepsIndex !== -1 && troubleshootingIndex < nextStepsIndex) {
      onError({
        lineNumber: 1,
        detail: "'## Troubleshooting' appears before '## Next Steps' — should be after."
      });
    }
  }
};
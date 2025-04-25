// Export a markdownlint custom rule object
module.exports = {
  // Unique ID and name for the rule
  names: ["TG002", "Turbot-Guide-Structure"],
  description: "Validate markdown structure for Guardrails installation guides",
  tags: ["structure", "guide", "guardrails"],

  function: function(params, onError) {
    const text = params.lines.join("\n");

    // List of structural validations for the guide format
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

    // Run all checks and flag the document if any are missing
    checks.forEach(check => {
      if (!check.regex.test(text)) {
        onError({
          lineNumber: 1, // Conservative reporting; could be improved to detect actual lines
          detail: check.message
        });
      }
    });
  }
};
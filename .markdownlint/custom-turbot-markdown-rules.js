// Export a custom markdownlint rule object
module.exports = {
  // Unique rule identifier and a friendly name
  names: ["TG002", "Turbot-Guide-Structure"],

  // A short description of what the rule checks for
  description: "Validate markdown structure for Guardrails installation guides",

  // Tags help categorize or group related rules
  tags: ["structure", "guide", "guardrails"],

  // The main validation logic
  function: function(params, onError) {
    // Join all lines into a single string to apply regex checks on full text
    const text = params.lines.join("\n");

    // Define a list of structural checks to apply
    const checks = [
      {
        // Check that the guide starts with valid YAML frontmatter (between --- and ---)
        name: "YAML frontmatter",
        regex: /^---[\s\S]*?---/,
        message: "Missing or incorrect YAML frontmatter"
      },
      {
        // Check for a single top-level title using markdown header syntax
        // Example: # Install TED
        name: "Main title",
        regex: /^#\s+.+/,
        message: "Missing '# Title' header"
      },
      {
        // Look for a section called '## Prerequisites'
        // Helps ensure users know what to set up before proceeding
        name: "Prerequisites",
        regex: /##\s+Prerequisites/,
        message: "Missing '## Prerequisites' section"
      },
      {
        // Validate that at least one step is present using the format:
        // ## Step X: Description
        name: "Step headers",
        regex: /##\s+Step\s+\d+:\s+.+/,
        message: "No '## Step X:' formatted headers found"
      }
    ];

    // Loop through each check
    checks.forEach(check => {
      // If the expected pattern is not found in the markdown,
      // report an error using markdownlint's onError handler
      if (!check.regex.test(text)) {
        onError({
          lineNumber: 1, // Simplified — we flag line 1 even though the issue could be anywhere
          detail: check.message // Custom message defined per rule
        });
      }
    });
  }
};
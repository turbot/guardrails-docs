module.exports = {
  names: ["TG002", "Turbot-Guide-Structure"],
  description: "Validate markdown structure for Guardrails installation guides",
  tags: ["structure", "guide", "guardrails"],
  function: function(params, onError) {
    const text = params.lines.join("\n");

    const checks = [
      { name: "YAML frontmatter", regex: /^---[\s\S]*?---/, message: "Missing or incorrect YAML frontmatter" },
      { name: "Main title", regex: /^#\s+.+/, message: "Missing '# Title' header" },
      { name: "Prerequisites", regex: /##\s+Prerequisites/, message: "Missing '## Prerequisites' section" },
      { name: "Step headers", regex: /##\s+Step\s+\d+:\s+.+/, message: "No '## Step X:' formatted headers found" }
    ];

    checks.forEach(check => {
      if (!check.regex.test(text)) {
        onError({ lineNumber: 1, detail: check.message });
      }
    });
  }
};
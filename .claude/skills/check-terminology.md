# Documentation Terminology Consistency Checker

When invoked, analyze documentation for terminology conflicts where the same word is used with different meanings in different contexts.

## Process

1. Identify domain-specific terms that may conflict with product-specific features
2. Search for all uses of potentially ambiguous terms
3. Categorize uses into:
   - Product-specific technical terms (should be preserved)
   - Generic uses (candidates for replacement)
   - Contextual uses (need case-by-case evaluation)
4. Propose alternative terminology with pros/cons
5. Present findings in a structured format with:
   - Current usage patterns
   - Potential confusion points
   - Recommended alternatives
   - Implementation strategy (hybrid, wholesale replacement, etc.)

## Example Scenarios

- "Policy" used for both Guardrails Policies and generic security policies
- "Resource" used for both Guardrails Resources and cloud resources
- "Control" used for both Guardrails Controls and generic security controls
- "Rule" used for both specific enforcement rules and generic guidelines

## Output Format

Provide a structured analysis with:
- Term being analyzed
- Distinct contexts where it appears
- Frequency in each context
- Recommended approach (preserve, replace, hybrid)
- Specific replacement suggestions with rationale

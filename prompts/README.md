# Prompts Directory - DEPRECATED

**⚠️ This directory is deprecated and maintained for reference only.**

The prompt files in this directory have been migrated to Claude Code's skill system.

## Migration

The documentation guidance has moved to:

```
.claude/skills/docs/
├── skill.md              (main skill with routing logic)
├── context/
│   ├── style.md         (formerly style-llm.md)
│   └── prevention.md    (unchanged)
└── workflows/
    ├── new-page.md          (create new documentation pages)
    ├── add-screenshots.md   (add/update screenshots)
    ├── fix-links.md         (fix link formatting)
    └── review.md            (review for style compliance)
```

## Why Skills Instead of Prompts?

Based on best practices from [danielmiessler.com/blog/when-to-use-skills-vs-commands-vs-agents](https://danielmiessler.com/blog/when-to-use-skills-vs-commands-vs-agents):

1. **Better Organization**: Skills act as domain containers, grouping related documentation capabilities together

2. **Reusable Workflows**: Common tasks (writing pages, adding screenshots) are now discrete workflows that can be invoked individually or through the main skill

3. **Context Management**: Style and prevention guidelines are in the `context/` directory where workflows can reference them

4. **Discoverability**: The skill structure makes it clear what documentation capabilities are available

5. **Intent-Based Routing**: The main skill detects what you want to do and routes to the appropriate workflow

## Using the Documentation Skill

Instead of relying on these prompt files, Claude Code will now automatically use the documentation skill when you:

- Work on files in the `docs/` directory
- Ask to write or update documentation
- Request screenshots to be added
- Want to review docs for compliance
- Ask about documentation standards

You can also explicitly invoke workflows:
- "Write a new page about X" → triggers new-page workflow
- "Add screenshots to Y" → triggers add-screenshots workflow
- "Fix the links in Z" → triggers fix-links workflow
- "Review this documentation" → triggers review workflow

## Keeping These Files

We're keeping these files temporarily for:
- Reference during the transition
- Backup in case we need to revert
- Comparison to ensure nothing was lost in migration

## Future

Once we confirm the skill system works well, this directory can be removed entirely.

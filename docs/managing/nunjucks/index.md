---
title: Nunjucks
sidebar_label: Nunjucks
---

# Nunjucks Best Practices and Tips

Nunjucks is a core principal when creating and updating
[Calculated policies](concepts/policies/calculated-faq). Basic nunjuck template
documentation can be found over on
[Mozilla's github page](https://mozilla.github.io/nunjucks/templating.html).

## White Spaces

White space management is critical when building good nunjuck templates. If your
calculated policy is not behaving as expected, be sure to review the template
for any extra or missing white spaces.

- Do use white spaces consistently.
- Create balance by allowing white spaces before a block, but not after it. For
  example:

  - `{% ... -%} ... {% ... -%}`

- Do not leave spaces at the end of lines.
- Do not create blank lines with only spaces in them.
- Do not accidentally combine lines together by removing white spaces.

## Arrays

Turbot Guardrails GraphQL responses are either individual key value pairs or an array of
dictionaries that contain keys and values. In the latter case, an incorrect
attempt to output the array will result in `[object Object]` (and will repeat
for the amount of objects in the array, if applicable).

![](/images/docs/guardrails/object-object.png)

In order to display actual values, it is necessary to go one step further. For
this example, check out this query:

![](/images/docs/guardrails/tags.png)

If we request the output of the tags using the method in the first screenshot,
we get the multi `[object Object]` response. Instead, what can be done is
requesting the specific index of the tag in the array. Keep in mind that with a
graphql response like above, each key value tag pair _is its own dictionary
object_. This means to get a specific tag key or value, we need to call the
corresponding index in the query result:

![](/images/docs/guardrails/tag1.png)

If we want to output all tags associated with the resource, we can easily use a
for loop to pull out all values:

![](/images/docs/guardrails/multi-tag.png)

This concept applies to any attribute stored as an array. Further, this for loop
can be used to do things like check a resource for the existence of a specific
tag, and if it does not exist, the resource is deemed `Not approved`. In this
example we are checking for the existence of a tag with the key **test**:

![](/images/docs/guardrails/approve.png)

A tag with the key **test** does in fact exist, so this AMI is approved!

Alternatively, one can use the following query to get a different type of
response:

![](/images/docs/guardrails/turbot-tag.png)

Using this method, it is trivial to output the tag value:

![](/images/docs/guardrails/tag-value.png)

This does NOT work if the tag has a hyphen, however. Attempting to change the
template from `{{ $.resource.turbot.tags.test }}` to
`{{ $.resource.turbot.tags.test-tag }}` results in a `NaN` value. Instead, we
can use the syntax `{{ $.resource.turbot.tags['test-tag'] }}`.

![](/images/docs/guardrails/test-tag-hyphen.png)

Note that the turbot guardrails query results in a dictionary, so the
`{{ $.resource.turbot.tags['key'] }}` syntax can be used for values that do not
have a hyphen in the key.

## RegEx

Guardrails calculated policies support the use of [RegEx](https://regexr.com/) to
create
[filters within the template logic](https://mozilla.github.io/nunjucks/templating.html#regular-expressions).

This enables administrators to do things like requiring a specific tag to be in
email format or check the names of resources based off specific patterns.

For example, let's assume that we want to ensure that the tag **Owner** has a
value that is in email format, or anything@example.com, where `@example.com`
must exist as well as any number of characters prior to the `@` symbol.

First, query for the tags.

![](/images/docs/guardrails/regex1.png)

Using the template, add a Regex statement. Refer to one of the many regex
testers found online for more information, such as
[https://regexr.com/](https://regexr.com/). In this case, the statement says any
string may occur prior to the `@` symbol - upper and lower case letters as well
as numbers, and the characters `.`, `_`, `-`, and `+`. The string `@example.com`
must follow the initial string.

![](/images/docs/guardrails/regex2.png)

If valid, the template will simply return the tag key and existing value. If it
is not valid, the template outputs a new tag asking the user to add a valid
email.

![](/images/docs/guardrails/regex3.png)

## Common Errors

The Calculated Policy Builder gives real time feedback into the query and
template entered. While it is often recommended to create policies via
Terraform, the builder can be invaluable in testing policies to ensure they do
what you think they do.

### Template Output Errors

![](/images/docs/guardrails/error1.png)

This occurs when the template is missing a closing or opening bracket for a
variable. Variables in Nunjucks must be passed with the format
`{{ $variableName }}`.

![](/images/docs/guardrails/error2.png)

The template has an if statement but it has not been properly closed. Refer to
the official
[Nunjucks documentation](https://mozilla.github.io/nunjucks/templating.html#if)
for more information on if statements.

![](/images/docs/guardrails/error3.png)

Very similar to the previous error, this occurs when a for statement has not
been properly closed. Refer to the official
[Nunjucks documentation](https://mozilla.github.io/nunjucks/templating.html#for)
for more information on for statements.

These are just a few of the most common errors when creating calculated
policies.

### Query Output Errors

While not directly Nunjucks, knowing what GraphQL errors mean can significantly
reduce trouble shooting time. The GraphQL query window is a bit more friendly
with respect to errors, as extra or "rogue" brackets will be highlighted with
the red underline. This manifests itself in two different error messages:

![](/images/docs/guardrails/error4.png)

![](/images/docs/guardrails/error5.png)

Review your query to ensure all opening brackets have an associated closing
bracket.

Queries do have a defined schema. If that schema is broken in the GraphQL input,
the following error will be displayed.

![](/images/docs/guardrails/error6.png)

This error is more specific and will often offer guidance on what to try next.
Check out our [7 minute GraphQL lab](7-minute-labs/graphql) for a primer on
GraphQL queries.

---
title: install
template: Documentation
nav:
  order: 10
---

# Command: install [mod[@\<version\>|\<version range\>]]

This command installs either all dependencies of a mod, or specific dependencies as determined by the arguments you provide.

`turbot install` saves any packages into the `turbot_mods` subdirectory by default.

> Dependency installation is atomic is nature. If the installation of one dependency fails, the entire operation is aborted.

## Usage

```shell
turbot install [mod[@<version>|<version_range>]] [options]
````

Typically, the output looks like:

```
Installing dependencies for tmod:@turbot/test-mod from turbot.com registry

Dependency      Version                
--------------  -----------------------
@turbot/aws     5.0.1-5.2.3 || >=v5.5.3
@turbot/turbot  5.0.1

Installing Dependencies.

* Installing @turbot/aws version 5.7.0
* Upgrading @turbot/turbot from 5.0.0 to 5.0.1

Installed 1 header to /path/to/mod/directory/turbot_mods
Done
```

The `turbot install` command downloads mod header files for all dependencies and installs in `turbot-mods` folder.

The `--dir` argument specifies the directory of the root module to use. If a path is not specified, the current working directory is used.

The supported options are:

- `--dir or -d` : Path to the Guardrails mod that you want to run the `turbot install` in, and it defaults to `"."`.
- `--pre-build` : Pre-build shell script.
- `--peer-path` : Path to install the peer-dependencies.
- `--help` : Shows help.
- `--username` : Turbot Guardrails mod registry username. If a username is not specified, cached credentials (from `turbot login`) will be used.  If no cached credentials exist, `turbot login` will be run interactively to log you in.
- `--password` : Turbot Guardrails mod registry password.  If a password is not specified, cached credentials (from `turbot login`) will be used.  If no cached credentials exist, `turbot login` will be run interactively to log you in.
- `--registry` : The registry from which to download the mod. The default is `turbot.com`
- `--latest` : Force installation of latest dependencies, even if there is a major version upgrade *(Use with caution)*.

The command can be used in various forms, each with different outcomes.

### `turbot install`

If the command is run without any arguments in the `mod` directory, it will find the listed dependencies in the `src/turbot.yml` file of the *mod* and install all dependencies from the registry.

### `turbot install mod`
When the command is run with a `mod` as argument, it will install the **recommended** version of the `mod` from the registry.

Example:
```shell
turbot install @turbot/aws
```

### `turbot install mod@version`
When a version is specified, the command will look for and install the specified `version` from the registry. If the specified `version` cannot be located in the registry, the installation is aborted.

> [!NOTE]
> More information about `version` is given below in the [Version](#Version) section

Example:
```shell
turbot install @turbot/aws@5.4.1
```

### `turbot install mod@version_range`
When you specify a version range, the command attempts to install the latest stable version of the `mod` which satisfies the version range you have given.

Note that most version ranges must be put in quotes so that your shell will treat it as a single argument.

Example:
```shell
turbot install @turbot/aws@>=5.0.2
```
or
```shell
turbot install "@turbot/aws@>=5.0.2 <5.4.0"
```

> [!NOTE]
> More information about `version_range` is given below in the [Version Ranges](#version-ranges) section.

### Using in combination

You may combine multiple dependencies, and even multiple types of dependencies.

Example:
```shell
turbot install @turbot/aws @turbot/aws-acm@5.4.0 "@turbot/aws-ec2@>=5.0.0 <5.7.0"
```

## Version
A `version` is described by the `v2.0.0` specification found at
<https://semver.org/>.

A leading `"="` or `"v"` character is stripped off and ignored.

## Version Ranges
A `version range` is a set of `comparators` which specify versions
that satisfy the range.

For further reading on `SemVer` ranges, we recommend the [SemVer cheatsheet](https://devhints.io/semver) at [DevHints](https://devhints.io/).

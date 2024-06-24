---
title: completion
template: Documentation
nav:
  order: 10
---

# Command: completion

The `turbot completion` command will output a script for bash. This allows you
to use auto-completion on the command line with the tab key.

You'll be able to type in `turbot` then hit the `tab` key to see the available completions.
```shell
$ turbot \t
completion compose configure download graph graphql init inspect install
login pack publish template test up vcr
```


`turbot completion` will print the completion script to STDOUT. Execute the shell command in the `Installation` section
to complete installation. You may need to restart your shell to get the new completion options. 

```bash
$ turbot completion
###-begin-turbot-completions-###
#
# yargs command completion script
#
# Installation: /usr/local/bin/turbot completion >> ~/.bashrc
#    or /usr/local/bin/turbot completion >> ~/.bash_profile on OSX.
#
_yargs_completions()
{
    local cur_word args type_list

    cur_word="${COMP_WORDS[COMP_CWORD]}"
    args=("${COMP_WORDS[@]}")

    # ask yargs to generate completions.
    type_list=$(/usr/local/bin/turbot --get-yargs-completions "${args[@]}")

    COMPREPLY=( $(compgen -W "${type_list}" -- ${cur_word}) )

    # if no match was found, fall back to filename completion
    if [ ${#COMPREPLY[@]} -eq 0 ]; then
      COMPREPLY=()
    fi

    return 0
}
complete -o default -F _yargs_completions turbot
###-end-turbot-completions-###
```

## Usage

**Usage: `turbot completion`**

To enable command completion, add the output of the `turbot completion` command
to your .bashrc or .bash_profile:

```bash
/usr/local/bin/turbot completion >> ~/.bashrc
```

or

```bash
 /usr/local/bin/turbot completion >> ~/.bash_profile
```

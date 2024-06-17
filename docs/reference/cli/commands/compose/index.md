---
title: compose
template: Documentation
nav:
  order: 10
---

# Command: compose


The `turbot compose` command will compose a mod. Resolve all inclusion directives starting from 'package.source', output to 'package.main.

Mod definitions may be split into multiple files. 'Directives' may be used define how to 'compose' a mod.

For example, turbot.yml could look as follows:

    ---
    $id: "tmod:@turbot/aws-s3"
    
    title: "@turbot/aws-s3"
    
    author: Turbot HQ Inc
    
    version: 5.0.0-beta.7
    
    license: "For LICENSE see https://turbot.com/license"
    
    peerDependencies:
      "@turbot/aws": ">=v5.0.0-alpha.1"
      "@turbot/turbot": ">=v5.0.0-alpha.1"
      "@turbot/turbot-iam": ">=v5.0.0-alpha.1"
      "@turbot/aws-iam": ">=v5.0.0-alpha.1"
    
    scripts:
      prepack: ./build.sh
    
    data:
      +array: permissions.csv
    
    +object:
      - s3/**
      - bucket/**

The +object fields will be replaced by an object constructed from the file or files matching the property value, which is a [glob](https://en.wikipedia.org/wiki/Glob_(programming)). 

## Syntax

The following directives are supported:

    * +object
    * +string
    * +array

The value of each of these directives may be a single glob or an array of globs.

The +raw directive may be used as one of the array values to include raw data alongside the parsed data.

### +object

#### Filetypes supported

yaml, yml, json

#### Combine action

If the directive value is an array of globs, the resulting parsed objects are merged together.

#### Example 1 - simple inclusion

    +object: "f1.yml"

Parse the file f1.yml into an object.

#### Example 2 - wildcard

    +object: "folder1/**"

Parse all yaml and json files returned by the glob folder/** and merge together into a object.

NOTE: the folder structure of the files will be used to define the property structure of the resulting object. So given following folder structure:

    folder1
        a
          f1.yml
        b
          c
            f2.yml

and the following file contents:

    # f1.yml
    p1: 1

    # f2.yml
    p2: 2

The directive

    +object: "folder1/**"

would return

    a:
      p1: 1
    b:
      c:
        p2:2

NOTE the [parent folder](https://www.npmjs.com/package/glob-parent) of the glob (folder1 in this case) is used as the root for the derived property path so is not included in the property tree.
This allows the following to work without repeating the policy property:

    policy:
      +object: "policy/**"

#### Example 3 - array of globs

    +object:
      - "f1.yml"
      - "f2.json"

Parse the files f1.yml and f2.json into objects and merge together, returning a single object.

#### Example 4 - array of directives

    propertyName:
      - +object: "f1.yml"
      - +object: "f2.json"

Parse the files f1.yml and f2.json into objects and form an array of objects under propertyName.

#### Example 5 - raw data

    +object:
      - "f1.yml"
      -
        +raw:
          a:
            b: 1

Parse the file f1.yml into an object and merge with the object {a: {b: 1}}

### +array

#### Filetypes supported

yaml, yml, json, csv
(yaml or json files containing non-array data are ignored)

#### Combine action

If the directive value is an array of globs, the resulting parsed value are concatenated together.
(todo add details of mixed arrays with arrays and values)

#### Example 1 - simple inclusion

    +array: "f1.csv"

Parse the csv file filename into an an array of objects and insert at same level

#### Example 2- simple inclusion with options

    p1:
      +csv:
        path: "p1.csv"
        ignoreColumns: /C1|C2/
    p2:
      +csv:
        path: "p2.csv"
        includeColumns: /C1|C2/

See here for other supported parameters (https://www.npmjs.com/package/csvtojson#parameters)

### +string



## Usage

**Usage: `turbot compose [options]`**

The supported options are:
- `--dir or -d` : Path to the Turbot Guardrails mod that you want to run the `turbot compose` in.
- `--force` : Force creation of output file even if it exists and there are no changes to source.
- `--help` : Show help.


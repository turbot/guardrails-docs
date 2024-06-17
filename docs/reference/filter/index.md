---
title: Filters
template: Documentation
nav:
  order: 30
---

# Filter Syntax

Turbot Guardrails provides a number of ways to filter, sort and limit results of data stored in the Guardrails CMDB.

|                                                                       |                                                                                                                                                                                                                                                                            |
|-----------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Full Text Search](#full-text-search)                                 | Guardrails can use full text search against all the objects in the search scope.                                                                                                                                                                                           |
| [Filtering on Specific Properties](#filtering-on-specific-properties) | Guardrails allows searching and filtering on specific properties of an object, such as [Text Filters](#text-filters), [Numeric Filters](#numeric-filters), [IP/CIDR Filters](#ipcidr-filters), [Date/Time Filters](#datetime-filters) and [Tag Filters](#tag-filters) etc. |
| [Checking for null or undefined](#checking-for-null-or-undefined)     | The keywords `null` and `undefined` can be used in filters to look for missing keys or values.                                                                                                                                                                             |
| [Standard Guardrails Properties](#standard-turbot-properties)         | The standard Guardrails metadata properties are searchable.                                                                                                                                                                                                                |
| [Hierarchical Filter Scopes](#hierarchical-filter-scopes)             | Guardrails lists are used to display resources from multiple levels of the resource hierarchy.                                                                                                                                                                             |
| [Sorting](#sorting)                                                   | Most Guardrails lists support sorting by appropriate fields.                                                                                                                                                                                                               |
| [Limiting Results](#limiting-results)                                 | We can limit the number of items that Guardrails returns using the limit keyword.                                                                                                                                                                                          |

## Full Text Search

If no property or attribute is specified in a filter, Guardrails will use full text search against all the objects in the
search scope.

- The filter will search ALL properties of the objects
- The search is case-insensitive
- If no `sort` is specified, it will return the results in ranked order:
    - matches in title and AKA rank higher
    - items are then ranked by frequency of the search term
- If multiple search terms are specified in the filter, the filtered list will contain only the items that match BOTH
  terms - whitespace separated items are treated as "AND" conditions.

The `search` keyword may also be explicitly to specify a full text search. In addition to the full text filtering
behavior described previously,  `search` allows you to specify "OR" conditions using a comma separated list of terms

A filter condition can be negated with the `!` character.

| Aim                      | Filter text      
|--------------------------|------------------
| Require foo              | 	`foo`           
| Exclude foo              | `!foo`           
| Require "foo" and "bar"	 | `foo bar`        
| Require "foo bar"	       | `"foo bar"`      
| Exclude "foo bar"	       | `!"foo bar"`     
| Require foo or bar	      | `search:foo,bar` 

Regular Expressions are also supported. Note that unqualified regular expressions will search the title only.

| Aim                                      | Filter text 
|------------------------------------------|-------------
| starts with "foo"                        | `/^foo/`    
| contains "foo", case insensitive         | `/foo/i`    
| does not contain "foo", case insensitive | `!/foo/i`   

## Filtering on Specific Properties

Guardrails supports searching and filtering on specific properties of an object.

- The general format of a condition is: `{property}:{operator}{value}`
    - The `{property}` may be a [standard Guardrails property](#standard-turbot-properties) or any field using the `$.`
      syntax
    - The `{operator}` that may be used depends on the data type of the property being searched.
    - The `{operator}` is optional, and the default behavior depends on the data type of the property being searched.
    - The condition can be negated by preceding the operator with `!`
    - Multiple `{values}` can be joined with a comma to specify an "OR" condition
- Multiple whitespace separated conditions are joined as "AND" conditions

### Text Filters

Text filters provide the simplest way to filter lists in Guardrails, with simple string matching against the specified
field. Simple text filters on properties behave differently than full text search filters:

- They only match against a single property
- They are case-sensitive
- They must match EXACTLY - `title:foo` means the title is exactly foo, not that the title contains foo

For more complex string searching, regular expressions may be used.

- Regular expressions are delimited with '/' characters
- The standard `/i` switch is supported to make a regular expression case insensitive

| Aim                                            | Filter text                
|------------------------------------------------|----------------------------
| Title is foo                                   | 	`title:foo`               
| Title is foo or bar                            | 	`title:foo,bar`           
| Title is not foo                               | 	`title:!foo`              
| Title contains foo                             | 	`title:/foo/`             
| Title contains foo, case insensitive           | 	`title:/foo/i`            
| Title does not contain "foo", case insensitive | `title:!/foo/i`            
| Title contains foo or bar                      | 	`title:/foo/,/bar/`       
| Title contains foo and bar                     | 	`title:/foo/ title:/bar/` 
| Title start with foo                           | 	`title:/^foo/`            
| Title start with foo and ends with bar         | 	`title:/^foo.*bar$/`      

### Numeric Filters

Fields that contain numeric data can be filtered with numeric operators. Guardrails will do automatic type coercion,
allowing to look for items less than, greater than, or equal to a given numeric value even if they are stored as
strings.

| Aim                                                  | Filter text                                     
|------------------------------------------------------|-------------------------------------------------
| Iops is exactly 100                                  | `$.Iops:100`                                    
| more than 100 Iops                                   | `$.Iops:>100`                                   
| Iops greater than or equal to 100                    | `$.Iops:>=100`                                  
| Size is not greater than 30                          | `$.Size:!>30`                                   
| Provisioned Read Capacity is less than 10            | `$.ProvisionedThroughput.ReadCapacityUnits:<10` 
| Size is less than or equal to 30                     | `$.Size:<=30`                                   
| Size is greater than 30 and Iops is greater than 100 | `$.Iops:>100 $.Size:>30`                        
| VolumeSize tag is greater than 1024                  | `$.turbot.tags.Volumesize:>1024`                

### IP/CIDR Filters

Guardrails can search and filter based on IP addresses and other properties that use CIDR notation. This allows for
advanced
capabilities such as filtering for instances that reside in a given subnet, or finding subnets within a larger supernet.

#### IP Address Filters

| Aim                                                      | Filter text                                       
|----------------------------------------------------------|---------------------------------------------------
| Private IP is exactly 172.31.40.226                      | `$.PrivateIpAddress:172.31.40.226`                
| Private IP is greater than 172.31.30.35                  | `$.PrivateIpAddress:>172.31.30.35`                
| Private IP is less than 172.31.30.35                     | `$.PrivateIpAddress:<172.31.30.35`                
| Private is IP in-between 172.31.30.35 and <172.31.36.200 | `$.PrivateIpAddress:>172.31.30.35,<172.31.36.200` 
| Private IP is not 172.31.40.226                          | `$.PrivateIpAddress:!172.31.40.226`               

#### CIDR Filters

| Aim                                                                     | Filter text                           
|-------------------------------------------------------------------------|---------------------------------------
| Private IP is in the 172.31.47.250/8 network                            | `$.PrivateIpAddress:172.31.47.250/8`  
| Private IP is not in the 172.31.47.250/8 network                        | `$.PrivateIpAddress:!172.31.47.250/8` 
| CidrBlock is contained entirely within 10.0.0.0/24, but not equal to it | `$.CidrBlock:<10.0.0.0/24`            
| CidrBlock is contained entirely within, or equal to 10.0.0.0/24         | `$.CidrBlock:<=10.0.0.0/24`           
| CidrBlock is outisde the 10.0.0.0/24 address space                      | `$.CidrBlock:>10.0.0.0/24`            

### Date/Time Filters

Date/Time filters allow querying Guardrails timestamps and filtering by date range. This allows you to limit search
results
based on the time the items were created, updated or deleted.

You can specify the time in ISO datetime format, reserved keywords, or a relative datetime expression.

##### ISO Datetime Formats

- `2019-03-26T16:12:16.110Z`
- `2019-03-26T16:12:16.110`
- `2019-03-26T16:12:16`
- `2019-03-26T16:12`
- `2019-03-26`

##### Reserved Keywords

- `now`
- `yesterday` - 24 hours ago
- `tomorrow` - 24 hours from now

##### Relative Datetime Expression

- Format: `T{operator}{n}{units}`
- Operators: plus (`+`) or minus (`-`)
- units:
    - `w` - weeks
    - `d` - days
    - `h` - hours
    - `m` - minutes
    - `s` - seconds
    - `ms` - milliseconds


- Examples:
    - in 3 days: `T+3d`
    - 2 weeks ago: `T-2w`
    - an hour ago: `T-1h`

| Aim                                                                     | Filter text                                                
|-------------------------------------------------------------------------|------------------------------------------------------------
| Resources created in the last 24 hours                                  | `createTimestamp:>yesterday`                               
| Resources updated within 1 hour                                         | `updateTimestamp:<T-1h`                                    
| Resources deleted on April 20th                                         | `deleteTimestamp:>=2019-04-20 deleteTimestamp:<2019-04-21` 
| Resources created, updated, modified, or delete in the last 10  minutes | `timestamp:<T-10m`                                         

### Tag Filters

Most resources in Guardrails support applying and searching by tags. Tags can be assigned to native Guardrails
resources, such as Files and Folders.
Native tagging features for AWS tags, Azure tags, and Google labels are also searchable via the same mechanism. This
allows you to filter results based on tag keys or values across ALL your Guardrails resources in a consistent way.

| Aim                                              | Filter text                                       
|--------------------------------------------------|---------------------------------------------------
| Has tag foo with value bar (exactly)             | `tags:foo=bar`                                    
| Has tag foo with value bar (exactly), as a regex | `tags:foo=/^bar$/`                                
| Has tag foo with value bar, case insensitive     | `tags:foo=/bar/i`                                 
| Has tag foo with empty value                     | `tags:foo=''`                                     
| Has tag foo with any value                       | `$.turbot.tags.foo:!undefined` or `tags:foo=/.*/` 
| Does not have a tag named foo                    | `$.turbot.tags.foo:undefined` or `tags:foo=null`  
| Has tag foo with any value but not null          | `!tags:foo=null`                                  

## Checking for null or undefined

The reserved keywords `null` and `undefined` can be used in filters to look for missing keys or values.

- `undefined`: The item does not contain the property at all
- `null`: The item either does not contain the property, or the property has a null value

| Aim	                                                   | Filter text          
|--------------------------------------------------------|----------------------
| Has no title property, or title with a null value      | `$.title:null`       
| Has a title property with a defined (non-null) value   | `$.title:!null`      
| Has no title property                                  | `$.title:undefined`  
| Has no title property with any value, including `null` | `$.title:!undefined` 

## Standard Turbot Guardrails Properties

The following standard Guardrails metadata properties are searchable for all types:

- `id` - The Guardrails resource id of the resource - eg `208149840507523`
- `title` - the title of the resource - eg `i-09b1336b7d371b655`
- `versionId` - the current version id for a resource
- `createTimestamp` - the time the resource was created in (or discovered by) Turbot and added to the CMDB
- `updateTimestamp` - the time the resource was last updated in the Turbot CMDB
- `timestamp` - the time the resource was last created or updated
- `processId` - the Turbot process id of the last create or update event
- `actorIdentityId` - The ID of the profile who last updated or created the resource

## Hierarchical Filter Scopes

Many lists in the Guardrails console display resources from multiple levels of the resource hierarchy. For
example, it is possible to show all Control alarms for a specific cloud account, or to show all the alarms for itself
and its descendants.

- `resourceId` - Allows you to specify where in the resource hierarchy the filter should apply. The combination
  of `resource` and `level` performs the initial filtering of the resources. The `resource` can be specified using the
  internal Guardrails Id or a full `aka`. Note that when searching or filtering in the Turbot Guardrails Console, the
  scope of the search is set implicitly - your search/filter will be scoped in relation to the resource to which you
  have navigated (as appears at the top of the page).

- `level` - Determines the scope of the filter search, in relation to the `resource`. The default level
  is `level:self,descendant` if no `level` is specified. The `level` is relative to the `resource` filter

| Aim	                            | Filter text              
|---------------------------------|--------------------------
| Self only                       | 	`level:self`            
| Descendants only	               | `level:descendant`       
| Immediate children only         | `level:children`         
| Ancestors only	                 | `level:ancestor`         
| Self or Descendants             | 	`level:self,descendant` 
| Self or Descendants (alternate) | `level:all`              

There are similar scopes that enable you to scope your filter through the type and categories as well. They behave
similarly:

- They have a search base keyword to specify where in the hierarchy the filter should apply. This will be an id or aka.
  Note that if an aka is specified, the filters will perform a partial match (will match if the aka *contains* the
  string specified in the filter)
- They have a level keyword to determine the scope of the filter search, in relation to the search base. If not
  specified, this defaults to the same value as resource `levels`
- The available scope keywords depend on the type of list query.

| Keyword                  | Value                                                | Example                                                                  
|--------------------------|------------------------------------------------------|--------------------------------------------------------------------------
| `resource`               | aka/id of a **Resource**                             | `resource:tmod:@turbot/turbot#/`                                         
| `level`                  | standard level for the **Resource**                  | `level:ancestor,self,descendant`                                         
| `resourceType`           | aka/id of a **Resource Type**                        | `resourceType:'tmod:@turbot/aws-s3#/resource/types/s3Account'`           
| `resourceTypeId`         | aka/id of a **Resource Type**                        | `resourceTypeId:'tmod:@turbot/aws-s3#/resource/types/bucket'`            
| `resourceTypeLevel`      | standard level for the **Resource Type**             | `resourceTypeLevel:self,descendant`                                      
| `resourceCategory`       | aka/id of a **Resource Category**                    | `resourceCategory:'tmod:@turbot/turbot#/resource/categories/compute'`    
| `resourceCategoryId`     | aka/id of a **Resource Category**                    | `resourceCategoryId:'tmod:@turbot/turbot#/resource/categories/compute'`  
| `resourceCategoryLevel`  | standard level for the **Resource Category**         | `resourceCategoryLevel:self,descendant`                                  
| `controlType`            | aka/id of a **Control Type** (Approved, Active, etc) | `controlType:'tmod:@turbot/aws-s3#/control/types/bucketDiscovery'`       
| `controlTypeId`          | aka/id of a **Control Type** (Approved, Active, etc) | `controlTypeId:'tmod:@turbot/aws-s3#/control/types/bucketActive'`        
| `controlTypeLevel`       | standard level for the **Control Type**              | `controlTypeLevel:self,descendant`                                       
| `controlCategory`        | aka/id of a **Control Category**                     | `controlCategory:'tmod:@turbot/turbot#/control/categories/security'`     
| `controlCategoryId`      | aka/id of a **Control Category**                     | `controlCategoryId:'tmod:@turbot/turbot#/control/categories/security'`   
| `controlCategoryLevel`   | standard level for the **Control Category**          | `controlCategoryLevel:self,descendant`                                   
| `policyType`             | aka/id of a **Policy Type**                          | `policyType:'tmod:@turbot/aws-s3#/policy/types/bucketApproved'`          
| `policyTypeId`           | aka/id of a **Policy Type**                          | `policyTypeId:'tmod:@turbot/aws-s3#/policy/types/bucketEncrytionAtRest'` 
| `policyTypeLevel`        | standard level for the **Policy Type**               | `policyTypeLevel:self,descendant`                                        
| `descendantResourceType` | aka/id of a **Resource Type**                        | `descendantResourceType:'tmod:@turbot/aws-s3#/resource/types/s3Account'` 
| `descendantInterface`    | aka/id of a **Resource Type Interface**              | `descendantInterface:'tmod:@turbot/turbot#/resource/interfaces/grants'`  

## Sorting

Most Guardrails lists support sorting by appropriate fields. Common examples would include title, urn, timestamp.

| Aim	                                                       | Filter text                 
|------------------------------------------------------------|-----------------------------
| Sort by field title	                                       | sort:title                  
| Reverse sort by field title	                               | sort:-title                 
| Sort by field title then createTimestamp	                  | sort:title,createTimestamp  
| Sort by field title, then reverse sort by createTimestamp	 | sort:title,-createTimestamp 

## Limiting Results

You can limit the number of items that Guardrails returns using the `limit` keyword. The default `limit` is `20`.

| Aim	               | Filter text 
|--------------------|-------------
| return 10 results  | limit:10    
| return 100 results | limit:100   

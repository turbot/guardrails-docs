#!/bin/bash

# Loop through all PNG files in the current directory
for file in *.png; do
    # Replace underscores with hyphens in the filename
    new_file=$(echo "$file" | tr '_' '-')
    
    # Rename the file if the new name is different
    if [ "$file" != "$new_file" ]; then
        mv "$file" "$new_file"
        echo "Renamed: $file -> $new_file"
    fi
done

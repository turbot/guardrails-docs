# Docs export with version


1. Modify the doc export to be able to add version to the doc export archive

2. The version should be a semver version

3. The version should match the branch, this is the branching convention that we will use
    - main (development) -> should always be fixed to v5.57.x - this is legacy so therefore we have a fixed v5.57.x
    - v5_58_x branches -> these are the release branches, archive generated from this branch must follow the v5.58.0, v5.58.1 version and so on

4. Tag the repo when we create archives


# Contributing

Any contribution in our repositories always starts with an issue. Wether you're experiencing a bug, have an idea or want to suggest a feature, opening an issue is the very first thing to do. This will allow you to gather feedback from others and is the perfect entry gate to how we automate GitOps here.
Note that as we have a code of conduct, please follow it in all your interactions with the project.

## Trunk based development

This repository follows the guidelines of [Trunk based development](https://trunkbaseddevelopment.com/). We use the 'scalable' approach of branching off and merging into master using issues and pull requests (details on this can be found in the section below). Since we use yarn for script automation, here's a short list of common commands you should use instead of the regular git commands. They enforce a common git development style and mitigate problems. In particular, **never rebase or squash**, as the former breaks other peoples local development on your feature branch and both do not keep a clean history of where commits in master originated from. With these premade scripts, there will never be a need to rebase/squash and merging will work just fine:

-   `yarn sync`: Stashes any uncommited changes, pulls remote changes from all branches, and adds remote branch tracking to untracked local branches, then pops uncommited changes back
-   `yarn commit`: Commits all changes made with a [conventional commit](https://github.com/commitizen/cz-cli) message using [commitizen](https://github.com/commitizen/cz-cli)
-   `yarn push`: Push local commits to the repository
-   `yarn master`: Merge any changes from master into the current branch, using a conventional commit message. This is only needed when hotfixes or dependent features from master need to be applied to the current branch. Note that updating the current branch just for the associated pull request to pass is done automatically.

## It starts with an issue

1. First, check if an existing issue already addresses what you came for. You can use the GitHub issues search bar for this; don't forget to remove the `is:open` filter to also see closed issues from the past.
2. We do not accept support questions in the issue section. They will be closed automatically and will not be read.
3. You can now open an issue. You will be presented with a handful of templates to choose from. Please fill them out as good as you can, as this will save time later.
4. You can now wait for feedback. Bots will take care of classifying your issue, and the issue will automatically appears in its respective project board as a card.
5. Once a contributor feels like he wants to tackle the issue, he can assign himself to it. This will automatically create an issue branch in the form of `issue-<ISSUE-NUMBER>-<ISSUE-SUBJECT>`, ready to be pushed to.
6. Once the assigned contributor pushes to the created branch, a draft pull request should be opened manually in order to allow others to follow the progress. It will be sorted into the right project board automatically.
7. The pull request might become out-of-date with master. **Do not manually update the branch**. A bot will take care of this when merging.
8. Once the PR is ready to be merged, consider adding reviewers. Then convert the draft pull request into a regular pull request by clicking on "Ready for review".
9. A bot will automatically update the branch and merge it into master, assuming all tests have passed.
10. If the PR has been merged, the issue is closed. If the PR has been closed, the issue remains open.

## Code of Conduct

### Our Pledge

In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment include:

-   Using welcoming and inclusive language
-   Being respectful of differing viewpoints and experiences
-   Gracefully accepting constructive criticism
-   Focusing on what is best for the community
-   Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

-   The use of sexualized language or imagery and unwelcome sexual attention or advances
-   Trolling, insulting/derogatory comments, and personal or political attacks
-   Public or private harassment
-   Publishing others' private information, such as a physical or electronic address, without explicit permission
-   Other conduct which could reasonably be considered inappropriate in a professional setting

### Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action in response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, or to ban temporarily or permanently any contributor for other behaviors that they deem inappropriate, threatening, offensive, or harmful.

### Scope

This Code of Conduct applies both within project spaces and in public spaces when an individual is representing the project or its community. Examples of representing a project or community include using an official project e-mail address, posting via an official social media account, or acting as an appointed representative at an online or offline event. Representation of a project may be further defined and clarified by project maintainers.

### Enforcement

Project maintainers who do not follow or enforce the Code of Conduct in good faith may face temporary or permanent repercussions as determined by other members of the project's leadership.

<hr />

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4, available at [http://contributor-covenant.org/version/1/4][version]

[homepage]: http://contributor-covenant.org
[version]: http://contributor-covenant.org/version/1/4/

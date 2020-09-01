#!/bin/sh
echo "Syncing with remote 'origin'"
# Check if there are uncommited changes
STASHED=false
if git diff --name-only > /dev/null 2>&1; then # there are uncommited changes
	STASHED=true
	read -p "There are uncommited changes. If you continue, these changes will be stashed and have to manually be pop-ed after syncing. Continue? (Y/n) " -n1 -r CONFIRMATION
	if ! echo $CONFIRMATION | grep -E '^[Yy](?:es)?$'; then
		echo "Exiting..."
		exit 1
	fi
	git stash -u
fi
git branch -r | grep -v '\->' | while read remote; do git branch --track "${remote#origin/}" "$remote"; done
git fetch --prune --all
git pull --all --rebase
if $STASHED; then
	echo "Your uncommited changes have been stashed. Remember to pop them back using 'git stash pop'"
fi
echo "Done. Exiting..."

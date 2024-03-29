# Jira Server Epic Story Points

A Google Chrome and Firefox extension for viewing Story Points when viewing an Epic in Jira Server.

## Description

This adds a column to the "Issues in epic" table which displays the value of the
"Story Points" field for each story when viewing an Epic.

## Installation

### Google Chrome
1. Download and extract the files
1. In Google Chrome, navigate to `chrome://extensions`
1. Enable [Developer Mode](https://developer.chrome.com/docs/extensions/mv3/faq/#faq-dev-01)
1. Click "Load Unpacked"
1. Select the folder containing the extracted files
1. Optionally, disable Developer Mode

### Firefox
1. Download and extract the files
1. In Firefox, navigate to `about:addons`
1. Next to Manage Your Extensions, click the gear icon and select "Install Add-on From File..."
1. Select the `.xpi` file located in `web-ext-artifacts`

## Configuration

At this time, configuration is hard-coded to the below values.

|Key|Value|Description|
|---|---|---|
|`JIRA_URL`|`https://jira.wellspring.com`|The Jira Server instance URL|
|`STORY_POINTS_FIELD_NAME`|`customfield_10106`|The key of the custom Issue field which represents Story Points|
|`POINTS_PLACEHOLDER`|`--`|The value to display in the event that the Story Points cannot be found due to an error|
|`COLUMN_INDEX`|`6`|The (zero-based) index at which the column should be positioned in the table|
|`TOTAL_STORY_POINTS_LABEL`|`Total`|The label displayed to the left of the Story Points total at the bottom of the table|
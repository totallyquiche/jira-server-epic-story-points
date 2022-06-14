const JIRA_URL = 'https://jira.wellspring.com';
const STORY_POINTS_FIELD_NAME = 'customfield_10106';
const POINTS_PLACEHOLDER = '--';
const COLUMN_INDEX = 3;

const EPIC_ISSUE_KEY = document.querySelector('#ghx-epic-key').innerText;
const JIRA_API_ENDPOINT = JIRA_URL + '/rest/api/2/search?maxResults=1000&jql=%22Epic%20Link%22%20=%20' + EPIC_ISSUE_KEY;

fetch(JIRA_API_ENDPOINT)
    .then(response => response.json())
    .then(data => {
        const ISSUES = Array.from(data.issues);
        const ISSUE_ROWS = Array.from(document.querySelectorAll('#ghx-issues-in-epic-table > tbody > tr'));

        ISSUE_ROWS.forEach(row => {
            const ISSUE = ISSUES.filter(issue => issue.key == row.dataset.issuekey)[0];
            const POINTS = ISSUE ? ISSUE.fields[STORY_POINTS_FIELD_NAME] : POINTS_PLACEHOLDER;
            const POINTS_CELL = document.createElement('td');

            POINTS_CELL.classList.add('nav');
            POINTS_CELL.innerText = POINTS;

            row.insertBefore(POINTS_CELL, row.children[COLUMN_INDEX]);
        });
    });
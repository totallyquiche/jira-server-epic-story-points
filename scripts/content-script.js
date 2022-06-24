const JIRA_URL = 'https://jira.wellspring.com';
const STORY_POINTS_FIELD_NAME = 'customfield_10106';
const POINTS_PLACEHOLDER = '--';
const COLUMN_INDEX = 6;
const TOTAL_STORY_POINTS_LABEL = 'Total';

const MAX_RESULTS = 1000;
const EPIC_ISSUE_KEY = document.querySelector('#ghx-epic-key').innerText;
const JIRA_API_ENDPOINT = JIRA_URL + '/rest/api/2/search?maxResults=' + MAX_RESULTS + '&jql=%22Epic%20Link%22%20=%20' + EPIC_ISSUE_KEY;
const TOTAL_STORY_POINTS_ROW_ID = 'jira-server-epic-story-points-total-story-points-row';

let updating = false;
let over_max_results = false;

const UPDATE_POINTS = function () {
    updating = true;

    fetch(JIRA_API_ENDPOINT)
        .then(response => response.json())
        .then(data => {
            if (data.total > MAX_RESULTS) {
                over_max_results = true;
            } else {
                const ISSUES = Array.from(data.issues);
                const ISSUES_TABLE = document.querySelector('#ghx-issues-in-epic-table > tbody');
                const ISSUE_ROWS = Array.from(ISSUES_TABLE.querySelectorAll('tr'));
    
                total_story_points = 0;
    
                ISSUE_ROWS.forEach(row => {
                    const ISSUE = ISSUES.filter(issue => issue.key == row.dataset.issuekey)[0];
                    const POINTS = ISSUE ? ISSUE.fields[STORY_POINTS_FIELD_NAME] : 0;
                    const POINTS_CELL = document.createElement('td');
    
                    POINTS_CELL.classList.add('nav');
                    POINTS_CELL.style.textAlign = 'right';
                    POINTS_CELL.innerText = (ISSUE ? POINTS : POINTS_PLACEHOLDER);
    
                    row.insertBefore(POINTS_CELL, row.children[COLUMN_INDEX]);
    
                    total_story_points += POINTS;
                });
    
                const TOTAL_POINTS_ROW = document.createElement('tr');
    
                TOTAL_POINTS_ROW.id = TOTAL_STORY_POINTS_ROW_ID;
    
                for (let i = 0; i < 8; i++) {
                    const CELL = document.createElement('td');

                    CELL.style.textAlign = 'right';
                    CELL.style.fontWeight = 'bold';
    
                    switch (i) {
                        case (COLUMN_INDEX - 1):
                            CELL.innerText = TOTAL_STORY_POINTS_LABEL + ':';
                            break;
                        case COLUMN_INDEX:
                            CELL.innerText = total_story_points;
                            break;
                    }
    
                    TOTAL_POINTS_ROW.appendChild(CELL);
                }
    
                ISSUES_TABLE.appendChild(TOTAL_POINTS_ROW);
    
                updating = false;
            }
        });   
}

const INTERVAL = setInterval(() => {
    if (over_max_results) {
        clearInterval(INTERVAL);
    } else if (!document.querySelector('#' + TOTAL_STORY_POINTS_ROW_ID) && !updating) {
        UPDATE_POINTS();
    }
});
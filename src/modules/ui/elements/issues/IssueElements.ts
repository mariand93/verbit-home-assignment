export const IssueElements = {


    issueTitle: '[data-testid="issue-title"]',
    issueState: '[data-testid="header-state"]',
    issueBody: '[data-testid="issue-body"]',
    
    // Elements for issue operations
    closeIssueButton: 'button:has-text("Close issue")',
    deleteIssueButton: 'button:has-text("Delete issue")',
    confirmCloseButton: 'button[type="submit"]:has-text("Close issue")',
    reopenIssueButton: 'button:has-text("Reopen Issue")',

    // Verify issue state
    openStateLabel: 'span[data-testid="header-state"]:has-text("Open")',
    closedStateLabel: 'span[data-testid="header-state"]:has-text("Closed")',
    moreOptionsMenu: '[aria-label="Show options"]'

};
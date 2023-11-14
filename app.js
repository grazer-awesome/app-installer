const express = require('express');
const { Octokit } = require("@octokit/core");
const app = express();

app.use(express.json()); // Middleware to parse JSON

app.post('/webhook', (req, res) => {
    // Handle the webhook event here
    console.log('Webhook received:', req.body);

    // Example: Respond to a new issue event
    if (req.body.action === 'opened' && req.body.issue) {
        const octokit = new Octokit({ auth: `YOUR_GITHUB_TOKEN` });

        octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
            owner: 'your-repo-owner',
            repo: 'your-repo-name',
            issue_number: req.body.issue.number,
            body: 'Thank you for opening an issue!'
        });
    }

    res.status(200).send('Event received');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

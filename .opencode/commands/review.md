Perform a comprehensive code review by launching specialized subagents to analyze the codebase.

## Steps

1. Launch the **code-review** agent to review code quality, best practices, and adherence to project conventions.
2. Launch the **security-audit** agent to identify potential security vulnerabilities and issues.

Use the Task tool to invoke each agent with the following prompts:

### Code Review Agent
```
Please perform a thorough code review of this codebase. Focus on:
- Code quality and best practices
- Adherence to project conventions (ESLint rules, TypeScript strict mode, path aliases)
- React Native and Expo best practices
- Component structure and reusability
- Proper use of hooks and data fetching patterns
- Type safety and proper typing

Provide a summary of findings with file paths and line numbers where applicable.
```

### Security Audit Agent
```
Please perform a security audit of this codebase. Focus on:
- Exposed secrets, API keys, or credentials
- Insecure data handling or storage
- Input validation and sanitization
- Network security (API calls, headers)
- Authentication and authorization patterns
- Dependencies with known vulnerabilities
- Platform-specific security concerns

Provide a detailed report of any security issues found with severity levels and recommendations.
```

Launch both agents in parallel for optimal performance, then summarize the combined findings for the user.

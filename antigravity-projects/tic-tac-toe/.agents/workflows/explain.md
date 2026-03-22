---
description: Explain a specific file or provide an overview of the current workspace
---
# Explain Workflow

This workflow is designed to analyze and explain the purpose of a specific file or the overall project context.

## Steps

1. **Check for arguments**: Determine if the user has provided a file path as an argument to the workflow.

2. **If a file path IS provided**:
   - Read the file content using the appropriate tool (`view_file`).
   - Use search tools (e.g. `grep_search` or `find_by_name`) to find references to this file across the project directory to understand how it's integrated with other components.
   - Provide a comprehensive and clear explanation to the user covering:
     - **Purpose of the file**: A high-level summary of why the file exists.
     - **What it does**: A detailed description of the logic, components, or configuration within the file.
     - **Interactions**: An explanation of how the file interacts with other parts of the project (e.g., dependencies it uses, or other files that depend on it).

3. **If NO file path IS provided**:
   - Read the structure of the current workspace (using `list_dir` on the project root).
   - Read the contents of global configuration files or `README.md` if they exist to gather context.
   - Display a high-level, comprehensive explanation of the current workspace to the user, highlighting its main architecture, goal, and the significance of key files and directories.

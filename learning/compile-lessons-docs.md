---
title: Deno Pandoc Markdown to HTML Converter
author: Patrick Hall
---

This Deno script automates the conversion of Markdown files to HTML using Pandoc, featuring recursive file search within a specified directory and CSS styling for the HTML output.

## Requirements

To run this script, ensure you have the following:

- Deno runtime
- Pandoc installed and accessible in your system's PATH
- Permissions for reading, writing, and running subprocesses in Deno

The required permissions are:

- `--allow-run`: Needed to execute Pandoc commands.
- `--allow-read`: Required for reading directories and Markdown files.
- `--allow-write`: Necessary for writing the converted HTML files.

## Usage

1. **Set the Root Directory**: The root directory for the Markdown files is set to `"./"` by default. Modify the `rootDir` constant at the beginning of the script to change the root directory.

2. **Run the Script**: Execute the script using Deno with the required permissions. Example command:

```sh
deno run --allow-run --allow-read --allow-write deno-pandoc-md-to-html.js
```

## Using deno tasks

This document outlines the configuration for a Deno project, detailing the tasks defined in the `deno.json` configuration file and the code formatting settings.

## Tasks

The configuration file defines several tasks that automate common operations such as building, cleaning, and deploying the project. These tasks can be executed using the `deno task` command followed by the task name.

### Build

Compiles the project files, preparing them for deployment or local testing.

- **Command**: `deno run --allow-read --allow-write --allow-run compile-lessons.js`
- **Permissions**:
  - `--allow-read`: Required for reading project files.
  - `--allow-write`: Necessary for writing outputs or modifications.
  - `--allow-run`: Needed to execute subprocesses, such as compilers or external tools.

### Rebuild

Performs a clean operation to remove any previous builds or temporary files before running the build task again. This ensures that the build starts from a clean state.

- **Command**: `deno task clean; deno task build`
- **Sequence**:
  1. Executes the `clean` task.
  2. Executes the `build` task.

### Clean

Removes generated files and cleans up the project directory.

- **Command**: `deno run --allow-read --allow-write clean.js`
- **Permissions**:
  - `--allow-read`: Required to identify files for removal.
  - `--allow-write`: Necessary to delete files and clean the directory.

### Deploy

Runs a shell script to deploy the project to a specified environment. This could involve copying files to a server, publishing to a web service, or any other deployment-related tasks.

- **Command**: `sh deploy.sh`
- **Note**: This task might require additional permissions or configurations depending on the deployment process defined in `deploy.sh`.

## Formatting (fmt)

Specifies preferences for code formatting. These settings are used by Deno's formatter to ensure consistent code style throughout the project.

### SemiColons

Defines whether semicolons should be used at the end of statements.

- **semiColons**: `false`
- **Effect**: Instructs the formatter not to add semicolons at the end of statements, adhering to a style that omits them.

## Using Tasks

To run any of the defined tasks, use the `deno task` command followed by the task name. For example, to build the project, you would run:

```sh
deno task build
```

Ensure you have the necessary permissions and environment setup to execute each task successfully. 

## Functions

### `convertMdToHtml(filePath)`

Converts a single Markdown file to HTML using Pandoc.

- **Parameters**: `filePath` - The path to the Markdown file to be converted.
- **Output**: The HTML file will be generated in the same directory as the Markdown file, with the same name but an `.html` extension.

### `findAndConvertMdFiles(startDir)`

Recursively finds all Markdown files in the specified directory and converts them to HTML.

- **Parameters**: `startDir` - The directory to start the recursive search and conversion process.

## Implementation Details

- **CSS Styling**: The script includes a CSS file (`../css/lessons.css`) in the converted HTML files for styling.
- **Header Template**: An HTML header template (`templates/header.template.html`) is included before the body of each converted HTML file.
- **Pandoc Command**: Uses Deno's `Command` API to run Pandoc with specified arguments for file conversion.

## Contributing

For contributions and improvements, please fork the repository and submit a pull request with your proposed changes.

## License

This script is provided "as is", without warranty of any kind. Feel free to use and modify it as needed for your projects.

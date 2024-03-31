# Reviewers, Please Note

*This is an anonymized version for review.
The history of this project has been rewritten, and changes to the repository are only pushed occasionally.
The full repository will be opened after the review period.*

# Code-centric Code Generation (CCG) Example for MODELS 2024

This repository contains the example for the paper "Code-centric Code Generation" submitted to MODELS 2024.
It recreates the example from the paper. Please feel free to try it out and follow the instructions below to get used to the CCG workflow.

If you encounter any problems while trying out this example, please feel free to post them in the issue tracker of this repository. We will try to help you by replying with our anonymized account.

## Prerequisites

This example requires you to use the following:

- VS Code (tested with 1.87.2)
- Node.js (tested with 18.19.1)
- npm (10.2.4)

Instead of installing Node.js and npm, you can also use the provided Devcontainer.
To do this, you must have Docker running on your machine.
However, opening the generated result may be less convenient with it. Please see the step-by-step instructions below.

## Step-by-step

1. **Open the project in VS Code**
2. **Install the provided CCG extension.** \
You can find it at `.devcontainer/ccg-0.0.1.vsix`.
Right click on the VSIX and select "Install Extension VSIX".
You should now see a notification in the bottom right corner that the extension has been successfully installed.
The notification will also offer to reload the window to activate the extension.
If you miss the notification, you can reload the window by opening the Command Palette (`Ctrl + Shift + P` or `CMD + Shift + P`) and selecting `Developer: Reload Window`.
3. **Open `index.html.ccg` and `app.js.ccg` and generate the templates from them.** \
To do this, simply double-click on them and they will open in the tree view provided by the CCG extension.
If you want to open the code view, just right click on the CCG file, select `Open With...` and choose the view you want.
From any view, you can generate the template by clicking the "Generate" button located in the bottom right corner of each CCG view.
The templates will be generated in the `generators` directory.
4. **Install generator dependencies.** \
Our prepared generator needs a dependency to be installed.
Please open the terminal (``Ctrl + ` `` or ``Ctrl + Shift + ` `` on MacOS) and go to the generators folder (`cd generators`).
In this folder, install the dependencies by running `npm ci` to install from our provided lock file.
5. **Run the generator that calls the generated templates.** \
We have prepared a generator that calls the templates with the appropriate parameters and generates the week planner from the example of the paper.
Please run `npm run generate` in the `generators` directory to call the `main-generator.js`.
The resulting weekplanner application can now be found in the `output` folder.
6. **Open the generated week planner.** \
Open `output/index.html` in a browser of your choice. You should now see the generated week planner and be able to use it. \
If you are using a devcontainer, please open the file on your host machine, as there may be no browser available in your devcontainer environment.
